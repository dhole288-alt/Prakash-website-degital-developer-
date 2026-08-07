import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, Sparkles, AlertCircle, ChevronDown, Lock, CreditCard, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { Lead } from '../types';
import { submitToGoogleSheets } from '../lib/googleSheetsService';

interface QuickEnquiryFormProps {
  onSuccessSubmit: (lead: Lead) => void;
}

export const QuickEnquiryForm: React.FC<QuickEnquiryFormProps> = ({ onSuccessSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Website development');
  const [siteType, setSiteType] = useState<'Static' | 'Dynamic'>('Dynamic');
  const [budget, setBudget] = useState('₹5,000 - ₹10,000');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const serviceCategories = [
    'Website development',
    'Application development',
    'Software development',
    'Billing software',
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
      setErrorMsg('Please enter your Full Name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid Mobile Number.');
      return;
    }
    if (!businessName.trim()) {
      setErrorMsg('Please enter your Business / Company Name.');
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
      businessCategory: serviceCategory,
      city: 'Nashik',
      service: serviceCategory,
      websiteType: `${siteType} (${serviceCategory})`,
      pagesCount: 'Custom Architecture',
      budget: budget,
      deliveryDate: 'Asap',
      message: message.trim() || `Inquiry for ${siteType} ${serviceCategory} (${businessName.trim()})`,
      dateTime: new Date().toISOString(),
      ipAddress: '127.0.0.1',
      source: 'Quick Enquiry Form',
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

    // Submit to Google Sheets and Express backend
    try {
      const res = await submitToGoogleSheets(newLead);
      if (res && res.success === false) {
        setErrorMsg(res.message || 'Submission failed. Please check your network connection.');
        setIsSubmitting(false);
        return;
      }
    } catch (err: any) {
      console.warn('Submission network notice:', err);
    }

    // Clear form fields after successful submission
    setName('');
    setEmail('');
    setPhone('');
    setBusinessName('');
    setMessage('');

    setIsSubmitting(false);
    setSubmittedLead(newLead);
    onSuccessSubmit(newLead);

    // Auto trigger WhatsApp message
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
    
    setTimeout(() => {
      try {
        const a = document.createElement('a');
        a.href = `https://wa.me/918055239252?text=${waText}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
      } catch (e) {
        console.warn('WhatsApp popup notice:', e);
      }
    }, 400);
  };

  if (submittedLead) {
    return (
      <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-slate-100 animate-fadeIn relative">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        
        <h3 className="text-2xl font-black text-white mb-2">Thank You!</h3>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 font-extrabold text-sm sm:text-base max-w-sm mx-auto mb-6">
          Thank you! Your enquiry has been submitted successfully.
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Ref ID:</span>
            <span className="text-amber-400 font-bold">{submittedLead.id}</span>
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
            <span className="text-slate-400">Selected Category:</span>
            <span className="text-orange-400 font-bold">{submittedLead.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Budget Range:</span>
            <span className="text-emerald-400 font-bold">{submittedLead.budget}</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`https://wa.me/918055239252?text=${encodeURIComponent(
              `Hello Prakash Graphic Designer, I need a website.\n\n` +
              `Ref: ${submittedLead.id}\n` +
              `Name: ${submittedLead.name}\n` +
              `Mobile: ${submittedLead.mobile}\n` +
              `Business: ${submittedLead.businessName}\n` +
              `Website Type: ${submittedLead.websiteType}\n` +
              `Budget: ${submittedLead.budget}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect Directly on WhatsApp (+91 8055239252)</span>
          </a>

          <button
            onClick={() => {
              setSubmittedLead(null);
              setName('');
              setEmail('');
              setPhone('');
              setBusinessName('');
              setMessage('');
            }}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer pt-2 block mx-auto"
          >
            Submit Another Requirement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border-2 border-slate-800 hover:border-orange-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all backdrop-blur-md">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-6 border-b border-slate-800 pb-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Get Instant Free Quote</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Fill in your requirement details below to get a custom project quote from Prakash Graphic Designer.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name */}
        <div>
          <label htmlFor="quick-name" className="block text-xs font-bold text-slate-200 mb-1">
            Full Name <span className="text-orange-500">*</span>
          </label>
          <input
            id="quick-name"
            type="text"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="quick-phone" className="block text-xs font-bold text-slate-200 mb-1">
            Mobile / WhatsApp Number <span className="text-orange-500">*</span>
          </label>
          <input
            id="quick-phone"
            type="tel"
            required
            placeholder="+91 Mobile number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
          />
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="quick-business" className="block text-xs font-bold text-slate-200 mb-1">
            Business / Shop / Company Name <span className="text-orange-500">*</span>
          </label>
          <input
            id="quick-business"
            type="text"
            required
            placeholder="Enter business name"
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
          />
        </div>

        {/* Service Category */}
        <div>
          <label htmlFor="quick-category" className="block text-xs font-bold text-slate-200 mb-1">
            Website Type / Service <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <select
              id="quick-category"
              value={serviceCategory}
              onChange={(e) => {
                setServiceCategory(e.target.value);
                setErrorMsg('');
              }}
              className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
            >
              {serviceCategories.map((cat, idx) => (
                <option key={idx} value={cat} className="bg-slate-900 text-white py-2">
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Website Architecture Toggle */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => setSiteType('Static')}
            className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              siteType === 'Static'
                ? 'bg-orange-950/90 border-2 border-orange-500 text-white shadow-lg shadow-orange-600/20'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Static Website
          </button>

          <button
            type="button"
            onClick={() => setSiteType('Dynamic')}
            className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              siteType === 'Dynamic'
                ? 'bg-orange-950/90 border-2 border-orange-500 text-white shadow-lg shadow-orange-600/20'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Dynamic / CMS Website
          </button>
        </div>

        {/* Budget Dropdown */}
        <div>
          <label htmlFor="quick-budget" className="block text-xs font-bold text-slate-200 mb-1">
            Budget Range <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <select
              id="quick-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-base sm:text-sm text-amber-300 font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
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

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address (Optional)</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Project Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Project Details</label>
          <textarea
            rows={3}
            placeholder="Describe your requirements or specific pages needed..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-2 transform active:scale-98"
        >
          {isSubmitting ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4 text-white" />
              <span>Get Instant Free Quote</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
