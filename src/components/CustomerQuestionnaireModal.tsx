import React, { useState } from 'react';
import { X, CheckCircle2, ChevronDown, Sparkles, Send, AlertCircle, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { Lead } from '../types';
import { BrandLogo } from './BrandLogo';

import { submitToGoogleSheets } from '../lib/googleSheetsService';

interface CustomerQuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit: (lead: Lead) => void;
  initialService?: string;
}

export const CustomerQuestionnaireModal: React.FC<CustomerQuestionnaireModalProps> = ({
  isOpen,
  onClose,
  onSuccessSubmit,
  initialService
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteType, setWebsiteType] = useState(initialService || 'Custom Business Website');
  const [budget, setBudget] = useState('₹5,000 - ₹10,000');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const websiteTypeOptions = [
    'Custom Business Website',
    'E-Commerce Online Store',
    'Billing & Invoice Software',
    'Hospital / Clinic Management',
    'School / Institute Portal',
    'Restaurant / Hotel Booking Engine',
    'Mobile Application Development',
    'Digital Marketing & Graphic Design'
  ];

  const budgetOptions = [
    '₹3,000 - ₹5,000',
    '₹5,000 - ₹10,000',
    '₹10,000 - ₹25,000',
    '₹25,000 - ₹50,000+'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your Name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid Mobile Number.');
      return;
    }
    if (!businessName.trim()) {
      setErrorMsg('Please enter your Business Name.');
      return;
    }
    if (!websiteType.trim()) {
      setErrorMsg('Please select a Website Type.');
      return;
    }
    if (!budget.trim()) {
      setErrorMsg('Please select your Budget.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newLead: Lead = {
      id: 'LD-' + Math.floor(100000 + Math.random() * 900000),
      name: name.trim(),
      mobile: phone.trim(),
      whatsapp: phone.trim(),
      email: email.trim() || 'Not Provided',
      businessName: businessName.trim(),
      businessCategory: websiteType,
      city: 'Nashik',
      service: websiteType,
      websiteType: websiteType,
      pagesCount: 'Custom Architecture',
      budget: budget,
      deliveryDate: 'Asap',
      message: message.trim() || `Inquiry for ${websiteType} (${businessName.trim()})`,
      dateTime: new Date().toISOString(),
      ipAddress: '127.0.0.1',
      source: 'Instant Quote Form',
      status: 'New',
      notes: [],
    };

    // Save locally for Netlify static deployment resilience
    try {
      const existing = localStorage.getItem('prakash_leads');
      const leadsArr = existing ? JSON.parse(existing) : [];
      leadsArr.unshift(newLead);
      localStorage.setItem('prakash_leads', JSON.stringify(leadsArr));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    // Submit to Google Sheets and Express Backend
    try {
      await submitToGoogleSheets(newLead);
    } catch (err) {
      console.warn('Submission network notice:', err);
    }

    // Clear form fields
    setName('');
    setPhone('');
    setEmail('');
    setBusinessName('');
    setMessage('');

    setIsSubmitting(false);
    setSubmittedLead(newLead);
    onSuccessSubmit(newLead);

    // Form notification triggers
    const waText = encodeURIComponent(
      `Hello Prakash Graphic Designer, I need a website.\n\n` +
      `*Enquiry Details:*\n` +
      `• *Name:* ${newLead.name}\n` +
      `• *Mobile:* ${newLead.mobile}\n` +
      `• *Business:* ${newLead.businessName}\n` +
      `• *Website Type:* ${newLead.websiteType}\n` +
      `• *Budget:* ${newLead.budget}\n` +
      `• *Message:* ${newLead.message}`
    );

    // Auto trigger WhatsApp notification link in new tab on desktop/mobile
    const waUrl = `https://wa.me/918055239255?text=${waText}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const resetForm = () => {
    setSubmittedLead(null);
    setName('');
    setPhone('');
    setEmail('');
    setBusinessName('');
    setMessage('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl w-full max-w-lg my-6 overflow-hidden shadow-2xl text-slate-100 flex flex-col relative">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <BrandLogo size="sm" showTagline={true} />
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[80vh]">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {submittedLead ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <h4 className="text-2xl font-black text-white">Thank You!</h4>
              
              <p className="text-emerald-400 font-extrabold text-sm sm:text-base bg-emerald-500/10 py-3 px-4 rounded-xl border border-emerald-500/20 max-w-sm mx-auto">
                Thank you! Your enquiry has been submitted successfully.
              </p>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-left text-xs space-y-2.5 my-4 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Ref ID:</span>
                  <span className="text-orange-400 font-bold">{submittedLead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name:</span>
                  <span className="text-white font-semibold">{submittedLead.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mobile Number:</span>
                  <span className="text-white font-semibold">{submittedLead.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Business Name:</span>
                  <span className="text-slate-200">{submittedLead.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Website Type:</span>
                  <span className="text-orange-300 font-medium">{submittedLead.websiteType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Budget:</span>
                  <span className="text-emerald-400 font-bold">{submittedLead.budget}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={`https://wa.me/918055239255?text=${encodeURIComponent(
                    `Hello Prakash Graphic Designer, I need a website.\n\n` +
                    `Enquiry Ref: ${submittedLead.id}\n` +
                    `Name: ${submittedLead.name}\n` +
                    `Mobile: ${submittedLead.mobile}\n` +
                    `Business: ${submittedLead.businessName}\n` +
                    `Website Type: ${submittedLead.websiteType}\n` +
                    `Budget: ${submittedLead.budget}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp (+91 8055239255)</span>
                </a>

                <a
                  href="tel:+918055239255"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-orange-400" />
                  <span>Call Direct (+91 8055239255)</span>
                </a>

                {submittedLead.email && submittedLead.email !== 'Not Provided' && (
                  <a
                    href={`mailto:prakashdhole965@gmail.com?subject=Website%20Enquiry%20Confirmation%20${submittedLead.id}&body=${encodeURIComponent(
                      `Hello Prakash Graphic Designer,\n\nI submitted an enquiry for ${submittedLead.websiteType}.\nName: ${submittedLead.name}\nPhone: ${submittedLead.mobile}\nBusiness: ${submittedLead.businessName}\nBudget: ${submittedLead.budget}\nMessage: ${submittedLead.message}`
                    )}`}
                    className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Send Email Copy</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-1"
                >
                  Done / Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  1. Your Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  2. Mobile Number <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 Mobile or WhatsApp number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>

              {/* Business Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  3. Business Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your shop, company, or clinic name"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>

              {/* Website Type Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  4. Website Type <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={websiteType}
                    onChange={(e) => {
                      setWebsiteType(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
                  >
                    {websiteTypeOptions.map((opt, idx) => (
                      <option key={idx} value={opt} className="bg-slate-900 text-white py-2">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Budget Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  5. Budget Range <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-amber-300 font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
                  >
                    {budgetOptions.map((b, idx) => (
                      <option key={idx} value={b} className="bg-slate-900 text-white py-2 font-normal">
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Optional Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  6. Project Details / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what features or pages you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-3 transform active:scale-98"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Get Instant Free Quote</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Instant Response Guaranteed • Direct WhatsApp Connect
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
