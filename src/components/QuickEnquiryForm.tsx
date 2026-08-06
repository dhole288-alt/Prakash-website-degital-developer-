import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, Sparkles, AlertCircle, ChevronDown, Lock, CreditCard } from 'lucide-react';
import { Lead } from '../types';

interface QuickEnquiryFormProps {
  onSuccessSubmit: (lead: Lead) => void;
}

export const QuickEnquiryForm: React.FC<QuickEnquiryFormProps> = ({ onSuccessSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Service Category');
  const [siteType, setSiteType] = useState<'Static' | 'Dynamic'>('Static');
  const [pageFrom, setPageFrom] = useState(1);
  const [pageTo, setPageTo] = useState(1);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const serviceCategories = [
    'Service Category',
    'Application development',
    'Software development',
    'Website development',
    'Billing software',
    'Digital Marketing'
  ];

  const pageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];

  // Calculate estimated price dynamically for customer transparency
  const calculateEstimate = () => {
    const totalPages = Math.max(pageFrom, pageTo);
    let baseRate = siteType === 'Static' ? 1500 : 3500;
    if (serviceCategory === 'Application development') baseRate = 8000;
    if (serviceCategory === 'Software development') baseRate = 12000;
    if (serviceCategory === 'Billing software') baseRate = 9500;
    if (serviceCategory === 'Digital Marketing') baseRate = 4500;

    const estimatedTotal = baseRate + (totalPages - 1) * (siteType === 'Static' ? 800 : 1500);
    return { totalPages, estimatedTotal };
  };

  const { totalPages, estimatedTotal } = calculateEstimate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Name, Email, and Phone Number.');
      return;
    }

    if (serviceCategory === 'Service Category') {
      setErrorMsg('Please select a valid Service Category from the list.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: phone.trim(),
          whatsapp: phone.trim(),
          email: email.trim(),
          businessName: `${siteType} ${serviceCategory}`,
          businessCategory: serviceCategory,
          city: 'Nashik',
          service: serviceCategory,
          websiteType: `${siteType} (${serviceCategory})`,
          pagesCount: `${totalPages} Page(s) (${pageFrom} to ${pageTo})`,
          budget: `Est. ₹${estimatedTotal.toLocaleString('en-IN')}`,
          deliveryDate: 'Flexible',
          message: `Direct Calculator Inquiry:\n- Category: ${serviceCategory}\n- Type: ${siteType}\n- Pages Range: ${pageFrom} to ${pageTo} (${totalPages} Total)\n- Est. Quote: ₹${estimatedTotal.toLocaleString('en-IN')}`,
          source: 'Interactive Photo Form'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedLead(data.lead);
        onSuccessSubmit(data.lead);
        setName('');
        setEmail('');
        setPhone('');
        setServiceCategory('Service Category');
      } else {
        setErrorMsg(data.message || 'Failed to submit request.');
      }
    } catch (err) {
      setErrorMsg('Network error saving request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedLead) {
    return (
      <div className="bg-slate-900 border-2 border-blue-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-slate-100 animate-fadeIn relative">
        <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-extrabold text-white mb-2">Request Submitted!</h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto mb-6">
          Thank you, <span className="text-blue-400 font-bold">{submittedLead.name}</span>! Your requirement for <span className="font-semibold text-emerald-400">{submittedLead.service}</span> has been calculated & registered into our CRM.
        </p>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left text-xs font-mono space-y-2 mb-6">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Ref ID:</span>
            <span className="text-blue-400 font-bold">{submittedLead.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Selected Category:</span>
            <span className="text-slate-200 font-bold">{submittedLead.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Pages & Architecture:</span>
            <span className="text-slate-200">{submittedLead.pagesCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Estimated Quote:</span>
            <span className="text-emerald-400 font-sans font-bold text-sm">{submittedLead.budget}</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`https://wa.me/918055239255?text=${encodeURIComponent(`Hello Prakash, I placed a quote for ${submittedLead.service} (${submittedLead.budget}). Ref: ${submittedLead.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <span>Proceed via WhatsApp Direct Order</span>
          </a>

          <button
            onClick={() => setSubmittedLead(null)}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
          >
            Calculate Another Service Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border-2 border-slate-800 hover:border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all backdrop-blur-md">
      {/* Glow highlight matching TechSurya photo */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {errorMsg && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Fields exactly as shown in screenshot photo */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Input */}
        <div>
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Phone Number Input */}
        <div>
          <input
            type="tel"
            required
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Service Category Dropdown (Matching Photo 2 Categories) */}
        <div className="relative">
          <select
            value={serviceCategory}
            onChange={(e) => {
              setServiceCategory(e.target.value);
              setErrorMsg('');
            }}
            className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {serviceCategories.map((cat, idx) => (
              <option key={idx} value={cat} className="bg-slate-900 text-white py-2">
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Toggle Buttons: Static vs Dynamic (Matching Photo 1) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => setSiteType('Static')}
            className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              siteType === 'Static'
                ? 'bg-blue-900/90 border-2 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Static
          </button>

          <button
            type="button"
            onClick={() => setSiteType('Dynamic')}
            className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              siteType === 'Dynamic'
                ? 'bg-blue-900/90 border-2 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Dynamic
          </button>
        </div>

        {/* Number of Pages: [1 ▾] to [1 ▾] (Matching Photo 1) */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>Number of Pages</span>
            <div className="flex items-center gap-2">
              <select
                value={pageFrom}
                onChange={(e) => setPageFrom(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {pageOptions.map((num) => (
                  <option key={num} value={num} className="bg-slate-900 text-white">
                    {num}
                  </option>
                ))}
              </select>
              <span className="text-slate-400">to</span>
              <select
                value={pageTo}
                onChange={(e) => setPageTo(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {pageOptions.map((num) => (
                  <option key={num} value={num} className="bg-slate-900 text-white">
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Display Output Box (Matching Photo 1 number box) */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 flex items-center justify-between">
            <span className="text-slate-400 text-xs">Total Estimated Pages:</span>
            <span className="text-blue-400 font-extrabold text-base">{totalPages}</span>
          </div>
        </div>

        {/* Dynamic Estimate Price Banner */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">Est. Starting Price:</span>
          <span className="text-emerald-400 font-extrabold text-sm">₹{estimatedTotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Blue CTA Button: Proceed to Payment (Matching Photo 1 exact text) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <span>Processing Order...</span>
          ) : (
            <>
              <CreditCard className="w-4 h-4 text-cyan-300" />
              <span>Proceed to Payment</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
