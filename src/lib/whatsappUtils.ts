/**
 * Utility for Click-to-Call, Click-to-WhatsApp, and Click-to-Email
 */

export function formatPhoneNumberForWhatsApp(phone: string): string {
  // Clean string to keep only digits
  let cleaned = phone.replace(/\D/g, '');
  // If no country code assumed (e.g. 10 digit Indian number starting with 9, 8, 7, 6)
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

export function openWhatsAppChat(mobile: string, leadName: string, serviceRequired?: string) {
  const cleanPhone = formatPhoneNumberForWhatsApp(mobile);
  const message = `Hello ${leadName}, thank you for reaching out to our Digital Agency regarding ${serviceRequired || 'your website enquiry'}. I'm following up on your request. When would be a good time to connect?`;
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  } catch (e) {
    console.warn('WhatsApp open notice:', e);
  }
}

export function makePhoneCall(mobile: string) {
  const cleanPhone = mobile.replace(/[^\d+]/g, '');
  window.location.href = `tel:${cleanPhone}`;
}

export function sendDirectEmail(email: string, leadName: string, serviceRequired?: string) {
  const subject = `Proposal & Discussion: ${serviceRequired || 'Your Project Enquiry'}`;
  const body = `Dear ${leadName},\n\nThank you for reaching out regarding ${serviceRequired || 'your project'}.\n\nWe have reviewed your request and would love to schedule a quick 10-minute discovery call to discuss your exact requirements and share a customized proposal.\n\nBest regards,\nAgency Lead Team`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
