import React, { useState } from 'react';
import { X, CheckCircle2, ChevronDown, Sparkles, Send, CreditCard, AlertCircle } from 'lucide-react';
import { Lead } from '../types';

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState(initialService || 'Website development');
  const [siteType, setSiteType] = useState<'Static' | 'Dynamic'>('Static');
  const [pageFrom, setPageFrom] = useState(1);
  const [pageTo, setPageTo] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const serviceCategories = [
    'Service Category',
    'Application development',
    'Software development',
    'Website development',
    'Billing software',
    'Digital Marketing'
  ];

  const pageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30];

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
      setErrorMsg('Please select a valid Service Category from the dropdown.');
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
          message: `Modal Calculator Submission:\n- Category: ${serviceCategory}\n- Type: ${siteType}\n- Pages Range: ${pageFrom} to ${pageTo} (${totalPages} Total)\n- Est. Quote: ₹${estimatedTotal.toLocaleString('en-IN')}`,
          source: 'Interactive Scope Modal'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedLead(data.lead);
        onSuccessSubmit(data.lead);
        setName('');
        setEmail('');
        setPhone('');
      } else {
        setErrorMsg(data.message || 'Error processing request.');
      }
    } catch (err) {
      setErrorMsg('Network connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl w-full max-w-lg my-8 overflow-hidden shadow-2xl text-slate-100 flex flex-col relative">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Prakash Graphic Designer</h3>
              <p className="text-slate-400 text-xs">Instant Price & Service Calculator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {submittedLead ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-white">Quotation Saved!</h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto">
                Thank you, <span className="font-bold text-white">{submittedLead.name}</span>! Your estimate for <span className="text-blue-400 font-semibold">{submittedLead.service}</span> has been saved into our CRM.
              </p>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-left text-xs font-mono space-y-2 mb-4 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Ref ID:</span>
                  <span className="text-blue-400 font-bold">{submittedLead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category & Type:</span>
                  <span className="text-slate-200">{submittedLead.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Total Quote:</span>
                  <span className="text-emerald-400 font-sans font-bold text-sm">{submittedLead.budget}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/918055239255?text=${encodeURIComponent(`Hello Prakash, I placed a quote for ${submittedLead.service} (${submittedLead.budget}). Ref: ${submittedLead.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center transition-all"
                >
                  WhatsApp Direct Order
                </a>
                <button
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-3 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
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
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
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
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
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
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Service Category Dropdown (Photo 2) */}
              <div className="relative">
                <select
                  value={serviceCategory}
                  onChange={(e) => {
                    setServiceCategory(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  {serviceCategories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-slate-900 text-white py-2">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Toggle Buttons: Static vs Dynamic (Photo 1) */}
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

              {/* Number of Pages: [1 ▾] to [1 ▾] (Photo 1) */}
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

                {/* Display Output Box (Photo 1) */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Total Estimated Pages:</span>
                  <span className="text-blue-400 font-extrabold text-base">{totalPages}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Est. Starting Price:</span>
                <span className="text-emerald-400 font-extrabold text-sm">₹{estimatedTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Blue CTA Button: Proceed to Payment */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-cyan-300" />
                    <span>Proceed to Payment</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
