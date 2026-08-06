import React, { useState } from 'react';
import { X, CheckCircle2, ChevronDown, Sparkles, Send, AlertCircle, MessageSquare, PhoneCall } from 'lucide-react';
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
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Name and Phone Number.');
      return;
    }

    if (serviceCategory === 'Service Category') {
      setErrorMsg('Please select a valid Service Category.');
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
          email: email.trim() || 'Not Provided',
          businessName: serviceCategory,
          businessCategory: serviceCategory,
          city: 'Nashik',
          service: serviceCategory,
          websiteType: serviceCategory,
          pagesCount: 'Custom Request',
          budget: 'Flexible Quote',
          deliveryDate: 'Asap',
          message: message.trim() || `Inquiry for ${serviceCategory}`,
          source: 'Quick Quote Modal'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedLead(data.lead);
        onSuccessSubmit(data.lead);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMsg(data.message || 'Error sending quote request.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
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
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Prakash Graphic Designer</h3>
              <p className="text-slate-400 text-xs">Request Free Instant Quotation</p>
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
              <h4 className="text-2xl font-extrabold text-white">Quote Request Received!</h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto">
                Thank you, <span className="font-bold text-white">{submittedLead.name}</span>! Our team will contact you shortly regarding your <span className="text-orange-400 font-semibold">{submittedLead.service}</span> inquiry.
              </p>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-left text-xs space-y-2 mb-4 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Ref ID:</span>
                  <span className="text-orange-400 font-bold">{submittedLead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Category:</span>
                  <span className="text-slate-200">{submittedLead.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mobile Number:</span>
                  <span className="text-slate-200">{submittedLead.mobile}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/918055239255?text=${encodeURIComponent(`Hello Prakash, I submitted a quote request for ${submittedLead.service}. My Mobile is ${submittedLead.mobile}. Ref: ${submittedLead.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Directly on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-3 rounded-xl transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>

              {/* Service Category Dropdown */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Service Category *</label>
                <div className="relative">
                  <select
                    value={serviceCategory}
                    onChange={(e) => {
                      setServiceCategory(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
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

              {/* Requirements Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details / Message</label>
                <textarea
                  rows={3}
                  placeholder="Describe your project requirement or features needed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <span>Sending Quote Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Send Free Quote Request</span>
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
