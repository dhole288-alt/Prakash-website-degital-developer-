import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedSolutionsSection } from './components/FeaturedSolutionsSection';
import { ServicesSection } from './components/ServicesSection';
import { AiSolutionsSection } from './components/AiSolutionsSection';
import { TechArsenalSection } from './components/TechArsenalSection';
import { ClientsSection } from './components/ClientsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomerQuestionnaireModal } from './components/CustomerQuestionnaireModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminCRM } from './components/AdminCRM';
import { Lead, LeadStatus, AnalyticsSummary, NotificationLog, AdminUser } from './types';
import { Bell, FileSpreadsheet } from 'lucide-react';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { FloatingContactButtons } from './components/FloatingContactButtons';

export default function App() {
  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);

  // Auth & Modal States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | undefined>(undefined);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isGlobalSheetsModalOpen, setIsGlobalSheetsModalOpen] = useState(false);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch all CRM data from Express backend with LocalStorage fallback
  const fetchCrmData = async () => {
    try {
      const [leadsRes, analyticsRes, logsRes] = await Promise.all([
        fetch('/api/leads').catch(() => null),
        fetch('/api/analytics').catch(() => null),
        fetch('/api/notifications/logs').catch(() => null)
      ]);

      if (leadsRes && leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success && Array.isArray(leadsData.leads)) {
          // Merge with localStorage leads if any
          const localRaw = localStorage.getItem('prakash_leads');
          const localLeads: Lead[] = localRaw ? JSON.parse(localRaw) : [];
          const existingIds = new Set(leadsData.leads.map((l: Lead) => l.id));
          const uniqueLocal = localLeads.filter(l => !existingIds.has(l.id));
          setLeads([...uniqueLocal, ...leadsData.leads]);
        }
      } else {
        const localRaw = localStorage.getItem('prakash_leads');
        if (localRaw) setLeads(JSON.parse(localRaw));
      }

      if (analyticsRes && analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        if (analyticsData.success) setAnalytics(analyticsData.analytics);
      }

      if (logsRes && logsRes.ok) {
        const logsData = await logsRes.json();
        if (logsData.success) setNotificationLogs(logsData.logs);
      }
    } catch (err) {
      console.warn('Backend API offline, using LocalStorage fallback:', err);
      const localRaw = localStorage.getItem('prakash_leads');
      if (localRaw) setLeads(JSON.parse(localRaw));
    }
  };

  useEffect(() => {
    // Ping visitor count
    fetch('/api/visitor/ping', { method: 'POST' }).catch(() => {});
    fetchCrmData();
  }, []);

  const handleOpenQuestionnaire = (serviceName?: string) => {
    setSelectedServiceForModal(serviceName);
    setIsQuestionnaireOpen(true);
  };

  const handleLeadSuccessSubmit = (newLead: Lead) => {
    showToast(`🎉 Lead Saved to CRM: ${newLead.name} (${newLead.service})`);
    fetchCrmData();
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const response = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        showToast(`Lead status updated to "${newStatus}"`);
        fetchCrmData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleAddNote = async (leadId: string, noteText: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: noteText,
          author: adminUser?.name || 'Prakash Dhole (Admin)'
        })
      });

      const data = await response.json();
      if (data.success) {
        showToast('Internal note saved!');
        fetchCrmData();
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        showToast('Lead record deleted.');
        fetchCrmData();
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAdminLoggedIn(true);
    setActiveView('admin');
    showToast(`Welcome back, ${user.name}! Admin session active.`);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setActiveView('public');
    showToast('Logged out of Admin CRM.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Bell className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenQuestionnaire={handleOpenQuestionnaire}
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setActiveView(activeView === 'admin' ? 'public' : 'admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        activeView={activeView}
        setActiveView={setActiveView}
        totalLeadsCount={leads.length}
      />

      {/* VIEW SWITCHING: Public Site vs Admin CRM */}
      {activeView === 'admin' && isAdminLoggedIn && adminUser ? (
        <AdminCRM
          adminUser={adminUser}
          leads={leads}
          analytics={analytics}
          notificationLogs={notificationLogs}
          onLogout={handleLogout}
          onRefreshData={fetchCrmData}
          onUpdateStatus={handleUpdateStatus}
          onAddNote={handleAddNote}
          onDeleteLead={handleDeleteLead}
        />
      ) : (
        <main>
          <HeroSection
            onOpenQuestionnaire={handleOpenQuestionnaire}
            onSuccessSubmit={handleLeadSuccessSubmit}
          />
          <FeaturedSolutionsSection
            onOpenQuestionnaire={handleOpenQuestionnaire}
          />
          <AboutSection />
          <ServicesSection
            onOpenQuestionnaire={handleOpenQuestionnaire}
          />
          <AiSolutionsSection
            onOpenQuestionnaire={handleOpenQuestionnaire}
          />
          <TechArsenalSection />
          <ClientsSection />
          <PortfolioSection
            onOpenQuestionnaire={handleOpenQuestionnaire}
          />
          <PricingSection
            onOpenQuestionnaire={handleOpenQuestionnaire}
          />
          <FaqSection />
          <ContactSection
            onSuccessSubmit={handleLeadSuccessSubmit}
          />
          <Footer
            onOpenAdmin={() => {
              if (isAdminLoggedIn) {
                setActiveView('admin');
              } else {
                setIsAdminLoginOpen(true);
              }
            }}
            onOpenQuestionnaire={handleOpenQuestionnaire}
          />
        </main>
      )}

      {/* Customer Questionnaire Scope Modal */}
      <CustomerQuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onSuccessSubmit={handleLeadSuccessSubmit}
        initialService={selectedServiceForModal}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={isGlobalSheetsModalOpen}
        onClose={() => setIsGlobalSheetsModalOpen(false)}
      />

      {/* Floating Action Button Bar */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => {
            if (isAdminLoggedIn) {
              setActiveView(activeView === 'admin' ? 'public' : 'admin');
            } else {
              setIsAdminLoginOpen(true);
            }
          }}
          className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isAdminLoggedIn ? (activeView === 'admin' ? 'View Public Website' : 'View CRM Dashboard') : 'CRM Admin Login'}</span>
        </button>

        <button
          onClick={() => setIsGlobalSheetsModalOpen(true)}
          className="bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur flex items-center gap-1.5 cursor-pointer"
          title="Configure Google Sheet Auto-Sync & Paste Web App URL"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google Sheets Sync</span>
        </button>
      </div>

      {/* Floating WhatsApp & Direct Call Widget */}
      <FloatingContactButtons />

    </div>
  );
}
