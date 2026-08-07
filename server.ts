import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initialLeads } from './src/lib/initialLeads';
import { Lead, LeadStatus, NotificationLog } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// File-based persistence setup
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const LOGS_FILE = path.join(DATA_DIR, 'notification_logs.json');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory caching with JSON file backup
let leadsStore: Lead[] = [];
let logsStore: NotificationLog[] = [];
let visitorCount = 1420;

try {
  if (fs.existsSync(LEADS_FILE)) {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    leadsStore = JSON.parse(raw);
  } else {
    leadsStore = [...initialLeads];
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsStore, null, 2));
  }
} catch (e) {
  leadsStore = [...initialLeads];
}

try {
  if (fs.existsSync(LOGS_FILE)) {
    const raw = fs.readFileSync(LOGS_FILE, 'utf-8');
    logsStore = JSON.parse(raw);
  }
} catch (e) {
  logsStore = [];
}

try {
  if (fs.existsSync(STATS_FILE)) {
    const raw = fs.readFileSync(STATS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    visitorCount = parsed.visitorCount || 1420;
  }
} catch (e) {
  visitorCount = 1420;
}

function saveLeads() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsStore, null, 2));
  } catch (err) {
    console.error('Error saving leads:', err);
  }
}

function saveLogs() {
  try {
    fs.writeFileSync(LOGS_FILE, JSON.stringify(logsStore, null, 2));
  } catch (err) {
    console.error('Error saving logs:', err);
  }
}

function saveStats() {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify({ visitorCount }, null, 2));
  } catch (err) {
    console.error('Error saving stats:', err);
  }
}

// Track visitor ping
app.post('/api/visitor/ping', (req, res) => {
  visitorCount += 1;
  saveStats();
  res.json({ success: true, totalVisitors: visitorCount });
});

// Admin Login Route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if ((email === 'prakashdhole965@gmail.com' || email === 'admin@agency.com' || email === 'prakash') && (password === 'admin123' || password === '123456')) {
    res.json({
      success: true,
      user: {
        email: 'prakashdhole965@gmail.com',
        name: 'Prakash Dhole',
        role: 'admin',
        token: 'adm_session_' + Date.now()
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials! Use prakashdhole965@gmail.com / admin123' });
  }
});

// GET All Leads with filters
app.get('/api/leads', (req, res) => {
  let filtered = [...leadsStore];
  const { search, service, status, source, startDate, endDate } = req.query;

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.mobile.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.businessName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
    );
  }

  if (service && typeof service === 'string' && service !== 'All') {
    filtered = filtered.filter(l => l.service.toLowerCase() === service.toLowerCase());
  }

  if (status && typeof status === 'string' && status !== 'All') {
    filtered = filtered.filter(l => l.status === status);
  }

  if (source && typeof source === 'string' && source !== 'All') {
    filtered = filtered.filter(l => l.source.toLowerCase() === source.toLowerCase());
  }

  if (startDate && typeof startDate === 'string' && startDate !== '') {
    filtered = filtered.filter(l => new Date(l.dateTime) >= new Date(startDate));
  }

  if (endDate && typeof endDate === 'string' && endDate !== '') {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    filtered = filtered.filter(l => new Date(l.dateTime) <= end);
  }

  res.json({ success: true, count: filtered.length, leads: filtered });
});

// GET Lead By ID
app.get('/api/leads/:id', (req, res) => {
  const lead = leadsStore.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }
  res.json({ success: true, lead });
});

// POST New Lead (Enquiry Form & Questionnaire submission)
app.post('/api/leads', (req, res) => {
  const {
    name,
    mobile,
    whatsapp,
    email,
    businessName,
    businessCategory,
    city,
    service,
    websiteType,
    pagesCount,
    budget,
    deliveryDate,
    message,
    source,
    questionnaire,
    recaptchaToken
  } = req.body;

  if (!name || !mobile) {
    return res.status(400).json({ success: false, message: 'Full Name and Mobile Number are required fields.' });
  }

  // Get visitor IP address
  const ipAddress =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const formattedDate = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const newLead: Lead = {
    id: 'lead-' + Date.now(),
    name,
    mobile,
    whatsapp: whatsapp || mobile,
    email,
    businessName: businessName || 'N/A',
    businessCategory: businessCategory || 'General Business',
    city: city || 'Nashik',
    service: service || websiteType || 'Business Website',
    websiteType: websiteType || service || 'Business Website',
    pagesCount: pagesCount || '1-5 Pages',
    budget: budget || '₹10,000 - ₹25,000',
    deliveryDate: deliveryDate || 'Flexible',
    message: message || '',
    dateTime: formattedDate,
    ipAddress,
    source: source || 'Public Website Form',
    status: 'New',
    notes: [
      {
        id: 'note-' + Date.now(),
        text: `Lead captured automatically via ${source || 'Website Enquiry Form'}.`,
        createdAt: formattedDate,
        author: 'System'
      }
    ],
    questionnaire: questionnaire || undefined
  };

  leadsStore.unshift(newLead);
  saveLeads();

  // Create notification logs
  const adminEmailLog: NotificationLog = {
    id: 'notif-' + Date.now() + '-1',
    leadId: newLead.id,
    type: 'admin_email',
    recipient: 'prakashdhole965@gmail.com',
    subject: `🚨 New Web Enquiry: ${newLead.name} (${newLead.businessName || 'Client'})`,
    sentAt: formattedDate,
    status: 'sent',
    preview: `Lead: ${newLead.name} | Mobile: ${newLead.mobile} | Type: ${newLead.websiteType} | Budget: ${newLead.budget} | City: ${newLead.city}`
  };

  const adminWhatsappLog: NotificationLog = {
    id: 'notif-' + Date.now() + '-2',
    leadId: newLead.id,
    type: 'admin_whatsapp',
    recipient: '+91 8055239252 (Prakash Dhole)',
    subject: `WhatsApp Alert: New Enquiry from ${newLead.name}`,
    sentAt: formattedDate,
    status: 'sent',
    preview: `New Lead Alert: ${newLead.name} (${newLead.mobile}) for ${newLead.websiteType} in ${newLead.city}`
  };

  const clientThankyouLog: NotificationLog = {
    id: 'notif-' + Date.now() + '-3',
    leadId: newLead.id,
    type: 'client_thankyou',
    recipient: newLead.email,
    subject: `Thank you for contacting Prakash Graphic Designer, ${newLead.name}!`,
    sentAt: formattedDate,
    status: 'sent',
    preview: `Dear ${newLead.name}, thank you for inquiring about ${newLead.websiteType}. Prakash Graphic Designer team will review your requirements and get back to you within 2 hours.`
  };

  // Forward to Google Apps Script if URL provided
  const targetGasUrl = req.body.gasUrl || process.env.GOOGLE_APPS_SCRIPT_URL;
  if (targetGasUrl && typeof targetGasUrl === 'string' && targetGasUrl.startsWith('http')) {
    fetch(targetGasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateTime: formattedDate,
        name: newLead.name,
        mobile: newLead.mobile,
        businessName: newLead.businessName,
        websiteType: newLead.websiteType,
        budget: newLead.budget,
        message: newLead.message,
        ipAddress: newLead.ipAddress
      })
    }).catch(err => {
      console.warn('Server-side Google Apps Script forward notice:', err.message);
    });
  }

  logsStore.unshift(adminEmailLog, adminWhatsappLog, clientThankyouLog);
  saveLogs();

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted and automatically saved into CRM!',
    lead: newLead,
    notificationsSent: [adminEmailLog, adminWhatsappLog, clientThankyouLog]
  });
});

// PUT Update Lead Status
app.put('/api/leads/:id/status', (req, res) => {
  const { status } = req.body as { status: LeadStatus };
  const leadIndex = leadsStore.findIndex(l => l.id === req.params.id);

  if (leadIndex === -1) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  const validStatuses: LeadStatus[] = ['New', 'Contacted', 'Follow Up', 'Converted', 'Closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid lead status.' });
  }

  leadsStore[leadIndex].status = status;
  const now = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  leadsStore[leadIndex].notes.unshift({
    id: 'note-' + Date.now(),
    text: `Status changed to "${status}".`,
    createdAt: now,
    author: 'Admin'
  });

  saveLeads();
  res.json({ success: true, lead: leadsStore[leadIndex] });
});

// POST Add Note to Lead
app.post('/api/leads/:id/notes', (req, res) => {
  const { text, author } = req.body;
  const lead = leadsStore.find(l => l.id === req.params.id);

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  if (!text || text.trim() === '') {
    return res.status(400).json({ success: false, message: 'Note text cannot be empty.' });
  }

  const now = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  const newNote = {
    id: 'note-' + Date.now(),
    text: text.trim(),
    createdAt: now,
    author: author || 'Admin'
  };

  lead.notes.unshift(newNote);
  saveLeads();
  res.status(201).json({ success: true, lead });
});

// DELETE Lead
app.delete('/api/leads/:id', (req, res) => {
  const index = leadsStore.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  leadsStore.splice(index, 1);
  saveLeads();
  res.json({ success: true, message: 'Lead deleted successfully' });
});

// POST Import Leads
app.post('/api/leads/import', (req, res) => {
  const { leads } = req.body as { leads: Partial<Lead>[] };

  if (!Array.isArray(leads) || leads.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid or empty leads dataset.' });
  }

  let importedCount = 0;
  const formattedDate = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  leads.forEach(item => {
    if (item.name && (item.mobile || item.email)) {
      const newLead: Lead = {
        id: 'lead-imp-' + Math.random().toString(36).substr(2, 9),
        name: String(item.name).trim(),
        mobile: String(item.mobile || 'N/A').trim(),
        whatsapp: String(item.whatsapp || item.mobile || 'N/A').trim(),
        email: String(item.email || 'N/A').trim(),
        businessName: String(item.businessName || 'N/A').trim(),
        businessCategory: String(item.businessCategory || 'General Business').trim(),
        city: String(item.city || 'Nashik').trim(),
        service: String(item.service || 'Business Website').trim(),
        websiteType: String(item.websiteType || item.service || 'Business Website').trim(),
        pagesCount: String(item.pagesCount || '1-5 Pages').trim(),
        budget: String(item.budget || 'Not Specified').trim(),
        deliveryDate: String(item.deliveryDate || 'Flexible').trim(),
        message: String(item.message || '').trim(),
        dateTime: item.dateTime || formattedDate,
        ipAddress: item.ipAddress || 'Imported via Excel/CSV',
        source: item.source || 'Excel Import',
        status: (item.status as LeadStatus) || 'New',
        notes: item.notes || [
          {
            id: 'note-imp-' + Date.now(),
            text: 'Imported from Excel/CSV report.',
            createdAt: formattedDate,
            author: 'Excel Import Tool'
          }
        ],
        questionnaire: item.questionnaire || undefined
      };
      leadsStore.unshift(newLead);
      importedCount++;
    }
  });

  saveLeads();
  res.json({ success: true, message: `Successfully imported ${importedCount} leads into the system!`, importedCount });
});

// GET Analytics Data
app.get('/api/analytics', (req, res) => {
  const totalLeads = leadsStore.length;
  const conversionRate = visitorCount > 0 ? ((totalLeads / visitorCount) * 100).toFixed(1) : 0;

  // Status Counts
  const statusCounts: Record<LeadStatus, number> = {
    New: 0,
    Contacted: 0,
    'Follow Up': 0,
    Converted: 0,
    Closed: 0
  };

  const serviceMap: Record<string, number> = {};
  const sourceMap: Record<string, number> = {};
  const budgetMap: Record<string, number> = {};

  leadsStore.forEach(lead => {
    if (statusCounts[lead.status] !== undefined) {
      statusCounts[lead.status]++;
    }

    const s = lead.service || 'General Website Enquiry';
    serviceMap[s] = (serviceMap[s] || 0) + 1;

    const src = lead.source || 'Direct Website Form';
    sourceMap[src] = (sourceMap[src] || 0) + 1;

    const b = lead.budget || 'Unspecified';
    budgetMap[b] = (budgetMap[b] || 0) + 1;
  });

  const serviceDistribution = Object.keys(serviceMap).map(k => ({ name: k, count: serviceMap[k] }));
  const sourceDistribution = Object.keys(sourceMap).map(k => ({ name: k, count: sourceMap[k] }));
  const budgetDistribution = Object.keys(budgetMap).map(k => ({ name: k, count: budgetMap[k] }));

  // Sample Daily Trend
  const dailyTrend = [
    { date: 'Aug 01', leads: 3, visitors: 180 },
    { date: 'Aug 02', leads: 5, visitors: 220 },
    { date: 'Aug 03', leads: 8, visitors: 290 },
    { date: 'Aug 04', leads: 6, visitors: 240 },
    { date: 'Aug 05', leads: 10, visitors: 310 },
    { date: 'Aug 06', leads: totalLeads, visitors: visitorCount }
  ];

  res.json({
    success: true,
    analytics: {
      totalVisitors: visitorCount,
      totalLeads,
      conversionRate: Number(conversionRate),
      statusCounts,
      dailyTrend,
      serviceDistribution,
      sourceDistribution,
      budgetDistribution
    }
  });
});

// GET Notification Logs
app.get('/api/notifications/logs', (req, res) => {
  res.json({ success: true, logs: logsStore });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
