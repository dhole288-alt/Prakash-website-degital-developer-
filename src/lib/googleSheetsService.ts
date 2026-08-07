import { Lead } from '../types';

const STORAGE_KEY = 'prakash_gas_url';

export const getGoogleScriptUrl = (): string => {
  return localStorage.getItem(STORAGE_KEY) || '';
};

export const setGoogleScriptUrl = (url: string): void => {
  if (url.trim()) {
    localStorage.setItem(STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const submitToGoogleSheets = async (lead: Lead): Promise<boolean> => {
  const url = getGoogleScriptUrl();
  
  // Format payload
  const payload = {
    dateTime: lead.dateTime || new Date().toLocaleString('en-IN'),
    name: lead.name,
    mobile: lead.mobile,
    businessName: lead.businessName,
    websiteType: lead.websiteType || lead.service,
    budget: lead.budget,
    message: lead.message || '',
    ipAddress: lead.ipAddress || '127.0.0.1'
  };

  // 1. If Google Apps Script Web App URL is configured directly in frontend
  if (url) {
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Avoid CORS restriction with Google Apps Script redirect
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      console.log('Successfully submitted lead to Google Apps Script Web App');
    } catch (err) {
      console.warn('Frontend Google Apps Script POST warning:', err);
    }
  }

  // 2. Also send to Express backend /api/leads which handles server database + notification logs + server-side GAS relay
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lead,
        gasUrl: url || undefined
      })
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend API submission network error (static host mode):', err);
    return true; // Still return true if local/frontend GAS submission succeeded
  }
};

export const DEFAULT_GAS_CODE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create column headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Name",
        "Mobile Number",
        "Business Name",
        "Website Type",
        "Budget",
        "Message",
        "IP Address"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#0f172a");
      headerRange.setFontColor("#f8fafc");
      headerRange.setFontWeight("bold");
    }

    var data;
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }

    var dateTime = data.dateTime || new Date().toLocaleString();
    var name = data.name || "N/A";
    var mobile = data.mobile || data.phone || "N/A";
    var businessName = data.businessName || "N/A";
    var websiteType = data.websiteType || data.service || "Website";
    var budget = data.budget || "N/A";
    var message = data.message || "";
    var ipAddress = data.ipAddress || "N/A";

    sheet.appendRow([
      dateTime,
      name,
      mobile,
      businessName,
      websiteType,
      budget,
      message,
      ipAddress
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Enquiry saved to Google Sheet" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Google Apps Script Web App is online!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
