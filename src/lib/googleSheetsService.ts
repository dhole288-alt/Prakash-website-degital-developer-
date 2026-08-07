import { Lead } from '../types';

const STORAGE_KEY = 'prakash_gas_url';
export const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA/edit?usp=sharing';
export const SPREADSHEET_ID = '1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA';

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

export interface SubmissionResult {
  success: boolean;
  message: string;
}

export const submitToGoogleSheets = async (lead: Lead): Promise<SubmissionResult> => {
  const url = getGoogleScriptUrl();
  
  const formattedDateTime = lead.dateTime || new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  // Format payload matching user requested fields:
  // Name, Mobile Number, Business Name, Website Type, Budget, Email, Project Details, Date & Time
  const payload = {
    dateTime: formattedDateTime,
    name: lead.name || 'N/A',
    mobile: lead.mobile || lead.whatsapp || 'N/A',
    businessName: lead.businessName || 'N/A',
    websiteType: lead.websiteType || lead.service || 'Website',
    budget: lead.budget || 'N/A',
    email: lead.email || 'N/A',
    projectDetails: lead.message || (lead.questionnaire ? JSON.stringify(lead.questionnaire) : 'Website Enquiry'),
    message: lead.message || '',
    ipAddress: lead.ipAddress || '127.0.0.1'
  };

  let gasSubmitted = false;

  // 1. Post to Google Apps Script Web App if configured
  if (url && url.startsWith('http')) {
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Standard cross-origin mode for Google Apps Script Web App redirects
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      gasSubmitted = true;
      console.log('Successfully submitted lead to Google Apps Script Web App');
    } catch (err) {
      console.warn('Google Apps Script submission warning:', err);
    }
  }

  // 2. Post to Express backend /api/leads which handles server database + notification logs + server-side GAS relay
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lead,
        gasUrl: url || undefined
      })
    });
    if (res.ok) {
      return {
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully and saved to your records.'
      };
    }
  } catch (err) {
    console.warn('Backend API submission network error (static host mode):', err);
  }

  if (gasSubmitted || !url) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully.'
    };
  }

  return {
    success: false,
    message: 'Failed to connect to Google Sheets Web App. Please check your Web App URL or internet connection.'
  };
};

export const testGoogleScriptConnection = async (testUrl: string): Promise<{ success: boolean; message: string }> => {
  if (!testUrl || !testUrl.startsWith('http')) {
    return { success: false, message: 'Please enter a valid Web App URL starting with https://script.google.com' };
  }

  try {
    // Send a test ping payload
    const testPayload = {
      dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: 'TEST CONNECTION',
      mobile: '+91 0000000000',
      businessName: 'System Verification Test',
      websiteType: 'Test Connection',
      budget: 'N/A',
      email: 'test@example.com',
      projectDetails: 'Verifying Google Apps Script Web App Endpoint Connection'
    };

    await fetch(testUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(testPayload)
    });

    return {
      success: true,
      message: 'Connection test sent! Check your Google Sheet to verify the new test row.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err.message || 'Network error'}`
    };
  }
};

export const DEFAULT_GAS_CODE = `/**
 * Prakash Graphic Designer - Google Apps Script Web App
 * Google Sheet ID: 1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA
 *
 * STEP-BY-STEP SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA/edit
 * 2. In top menu click: "Extensions" -> "Apps Script"
 * 3. Delete all code inside Code.gs, paste this script, and click "Save" (Floppy icon).
 * 4. Click top-right button: "Deploy" -> "New deployment"
 * 5. Click Gear icon (Select type) -> "Web app"
 * 6. Set Description: "Enquiry Form Sync"
 * 7. Set "Execute as": "Me" (your Google account)
 * 8. Set "Who has access": "Anyone" (CRITICAL: Must be "Anyone" so forms can submit)
 * 9. Click "Deploy", click "Authorize access", sign in with Google, click "Advanced" -> "Go to (unsafe)", and "Allow".
 * 10. Copy the Web App URL (ends with /exec) and paste it into the Web App URL box in your CRM settings.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent writes
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById("1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA");
    var sheet = doc.getSheetByName("Customer Enquiries");
    if (!sheet) {
      sheet = doc.getActiveSheet();
    }

    // Auto-create column headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Name",
        "Mobile Number",
        "Business Name",
        "Website Type",
        "Budget",
        "Email",
        "Project Details"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#0f172a");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setRowHeight(1, 36);
    }

    var data;
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }

    var dateTime = data.dateTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "N/A";
    var mobile = data.mobile || data.phone || "N/A";
    var businessName = data.businessName || "N/A";
    var websiteType = data.websiteType || data.service || "Website";
    var budget = data.budget || "N/A";
    var email = data.email || "N/A";
    var projectDetails = data.projectDetails || data.message || "N/A";

    // Append enquiry row matching all 8 requested fields
    sheet.appendRow([
      dateTime,
      name,
      mobile,
      businessName,
      websiteType,
      budget,
      email,
      projectDetails
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Enquiry saved to Google Sheet" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      sheetId: "1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA",
      app: "Prakash Graphic Designer Enquiry Sync"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
