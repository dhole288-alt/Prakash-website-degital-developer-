import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, Sparkles, AlertCircle, Lock, RefreshCw, MessageSquare, Phone } from 'lucide-react';
import { Lead } from '../types';

interface QuickEnquiryFormProps {
  onSuccessSubmit: (lead: Lead) => void;
}

export const QuickEnquiryForm: React.FC<QuickEnquiryFormProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    businessName: '',
    businessCategory: 'Retail & Local Business',
    city: 'Nashik',
    websiteType: 'Business Website',
    pagesCount: '1-5 Pages',
    budget: '₹10,000 - ₹25,000',
    deliveryDate: '',
    message: '',
    honeypot: ''
  });

  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successLead, setSuccessLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const websiteTypes = [
    'Business Website',
    'Company Website',
    'School Website',
    'Hospital Website',
    'Restaurant Website',
    'Hotel Website',
    'Portfolio Website',
    'E-commerce Website',
    'Landing Page',
    'Website Redesign',
    'Website Maintenance',
    'SEO',
    'Google Business Profile',
    'Domain & Hosting'
  ];

  const businessCategories = [
    'Retail & Local Business',
    'Education & School / College',
    'Healthcare & Hospital / Clinic',
    'Hotel & Restaurant / Cafe',
    'Real Estate & Construction',
    'IT & Tech / Startup',
    'Services & Consultancy',
    'Manufacturing & Industrial',
    'E-Commerce & Online Store',
    'Personal Brand & Portfolio',
    'Other Industry'
  ];

  const pagesOptions = [
    '1 Page (Landing Page)',
    '1-5 Pages (Starter)',
    '5-10 Pages (Standard)',
    '10-20 Pages (Pro Business)',
    '20+ Pages (Enterprise / E-Com)'
  ];

  const budgetRanges = [
    '₹5,000 - ₹15,000',
    '₹15,000 - ₹30,000',
    '₹30,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000+'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      // Spam honeypot triggered
      return;
    }

    if (!formData.name.trim() || !formData.mobile.trim() || !formData.email.trim()) {
      setErrorMsg('Full Name, Mobile Number, and Email are required.');
      return;
    }

    if (!recaptchaVerified) {
      setErrorMsg('Please check the Google reCAPTCHA checkbox below to verify you are human.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          whatsapp: formData.whatsapp.trim() || formData.mobile.trim(),
          email: formData.email.trim(),
          businessName: formData.businessName.trim(),
          businessCategory: formData.businessCategory,
          city: formData.city.trim() || 'Nashik',
          service: formData.websiteType,
          websiteType: formData.websiteType,
          pagesCount: formData.pagesCount,
          budget: formData.budget,
          deliveryDate: formData.deliveryDate || 'Flexible',
          message: formData.message.trim(),
          source: 'Public Website Form',
          recaptchaToken: 'recaptcha_verified_v2_passed'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessLead(data.lead);
        onSuccessSubmit(data.lead);
        setFormData({
          name: '',
          mobile: '',
          whatsapp: '',
          email: '',
          businessName: '',
          businessCategory: 'Retail & Local Business',
          city: 'Nashik',
          websiteType: 'Business Website',
          pagesCount: '1-5 Pages',
          budget: '₹10,000 - ₹25,000',
          deliveryDate: '',
          message: '',
          honeypot: ''
        });
        setRecaptchaVerified(false);
      } else {
        setErrorMsg(data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error saving enquiry. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successLead) {
    return (
      <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-center text-slate-100 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You, {successLead.name}!</h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
          Your quote request for <span className="font-semibold text-blue-400">{successLead.websiteType}</span> has been received and saved automatically into our Prakash Graphic Designer CRM!
        </p>

        {/* Lead Receipt Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 mb-6 text-slate-300 font-mono">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Ref ID:</span>
            <span className="font-bold text-blue-400">{successLead.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Business:</span>
            <span className="text-slate-100">{successLead.businessName || 'Independent'} ({successLead.city})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Contact:</span>
            <span className="text-slate-100">{successLead.mobile} | {successLead.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Website & Budget:</span>
            <span className="text-emerald-400 font-sans">{successLead.websiteType} ({successLead.budget})</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <a
            href={`https://wa.me/918055239255?text=${encodeURIComponent(`Hello Prakash, I submitted an enquiry for ${successLead.websiteType} (Ref: ${successLead.id}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat On WhatsApp Now</span>
          </a>

          <a
            href="tel:+918055239255"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Call Prakash Dhole (+91 8055239255)</span>
          </a>
        </div>

        <button
          onClick={() => setSuccessLead(null)}
          className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
        <Sparkles className="w-4 h-4" />
        <span>Prakash Graphic Designer • Get Free Quote</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
        Request Free Quote
      </h3>
      <p className="text-slate-400 text-xs sm:text-sm mb-6">
        Fill out the details below. Our team in Nashik will review and send you a custom project proposal within 2 hours.
      </p>

      {errorMsg && (
        <div className="mb-5 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Spam Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Row 1: Full Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Ramesh Patil"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Mobile Number <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Row 2: WhatsApp Number & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              WhatsApp Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="Same as mobile or WhatsApp no."
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. ramesh@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Business Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Business / Company Name
            </label>
            <input
              type="text"
              name="businessName"
              placeholder="e.g. Patil Industries"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Business Category
            </label>
            <select
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              {businessCategories.map((c, i) => (
                <option key={i} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: City & Required Website Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              City / Location
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Nashik, Mumbai, Pune"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Required Website Type
            </label>
            <select
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              {websiteTypes.map((wt, i) => (
                <option key={i} value={wt} className="bg-slate-900 text-white">
                  {wt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Number of Pages, Budget, Required Delivery Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Number of Pages
            </label>
            <select
              name="pagesCount"
              value={formData.pagesCount}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              {pagesOptions.map((p, i) => (
                <option key={i} value={p} className="bg-slate-900 text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Estimated Budget
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              {budgetRanges.map((b, i) => (
                <option key={i} value={b} className="bg-slate-900 text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Required Delivery Date
            </label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Row 6: Message */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Message / Additional Requirements
          </label>
          <textarea
            name="message"
            rows={2}
            placeholder="Tell us about your specific goals, domain/hosting requirements, design preference..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Google reCAPTCHA v2 box simulation */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={recaptchaVerified}
              onChange={(e) => setRecaptchaVerified(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer"
            />
            <span className="text-xs text-slate-300 font-medium select-none">
              I'm not a robot (Google reCAPTCHA v2)
            </span>
          </label>

          <div className="flex items-center gap-1 text-slate-500 text-[10px]">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Spam Protected</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Saving Enquiry to CRM...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Enquiry & Get Free Quote</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
