import * as XLSX from 'xlsx';
import { Lead } from '../types';

export function exportLeadsToExcel(leads: Lead[], filename = 'Agency_Leads_Report.xlsx') {
  const data = leads.map((lead, index) => ({
    'S.No': index + 1,
    'Lead ID': lead.id,
    'Full Name': lead.name,
    'Mobile Number': lead.mobile,
    'Email Address': lead.email,
    'Business Name': lead.businessName,
    'City': lead.city,
    'Service Required': lead.service,
    'Budget Range': lead.budget,
    'Status': lead.status,
    'Lead Source': lead.source,
    'Date & Time': lead.dateTime,
    'IP Address': lead.ipAddress,
    'Message': lead.message,
    'Business Type': lead.questionnaire?.businessType || 'N/A',
    'Website Type': lead.questionnaire?.websiteType || 'N/A',
    'Number of Pages': lead.questionnaire?.pagesCount || 'N/A',
    'Need Domain': lead.questionnaire?.needDomain || 'N/A',
    'Need Hosting': lead.questionnaire?.needHosting || 'N/A',
    'Need Logo': lead.questionnaire?.needLogo || 'N/A',
    'Expected Delivery Date': lead.questionnaire?.expectedDelivery || 'N/A',
    'Additional Requirements': lead.questionnaire?.additionalReqs || 'N/A',
    'Latest Internal Note': lead.notes?.[0]?.text || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Auto-fit columns
  const max_widths = Object.keys(data[0] || {}).map(key => ({
    wch: Math.max(key.length + 3, 15)
  }));
  worksheet['!cols'] = max_widths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'All Leads');
  XLSX.writeFile(workbook, filename);
}

export function exportLeadsToCSV(leads: Lead[], filename = 'Agency_Leads_Export.csv') {
  const data = leads.map((lead, index) => ({
    'S.No': index + 1,
    'Lead ID': lead.id,
    'Full Name': lead.name,
    'Mobile Number': lead.mobile,
    'Email Address': lead.email,
    'Business Name': lead.businessName,
    'City': lead.city,
    'Service Required': lead.service,
    'Budget Range': lead.budget,
    'Status': lead.status,
    'Source': lead.source,
    'Date & Time': lead.dateTime,
    'Message': lead.message
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function parseExcelOrCSVFile(file: File): Promise<Partial<Lead>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, any>[];

        const parsedLeads: Partial<Lead>[] = jsonData.map((row, i) => {
          return {
            name: row['Full Name'] || row['Name'] || row['name'] || `Lead #${i + 1}`,
            mobile: String(row['Mobile Number'] || row['Mobile'] || row['Phone'] || row['mobile'] || ''),
            email: row['Email Address'] || row['Email'] || row['email'] || '',
            businessName: row['Business Name'] || row['Company'] || row['businessName'] || 'N/A',
            city: row['City'] || row['city'] || 'Unknown',
            service: row['Service Required'] || row['Service'] || row['service'] || 'Website Development',
            budget: row['Budget Range'] || row['Budget'] || row['budget'] || 'Not Specified',
            message: row['Message'] || row['message'] || row['Notes'] || '',
            status: row['Status'] || 'New',
            source: row['Lead Source'] || row['Source'] || 'Excel Import'
          };
        });

        resolve(parsedLeads);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
