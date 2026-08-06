import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Send, ShieldCheck, HelpCircle } from 'lucide-react';
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
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    businessName: '',
    businessType: 'Retail & Local Business',
    city: 'Nashik',
    websiteType: initialService || 'Business Website',
    pagesCount: '1-5 Pages',
    needDomain: 'Yes' as 'Yes' | 'No',
    needHosting: 'Yes' as 'Yes' | 'No',
    needLogo: 'Yes' as 'Yes' | 'No',
    budget: '₹15,000 - ₹30,000',
    expectedDelivery: '',
    additionalReqs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.mobile.trim() || !formData.email.trim()) {
        setErrorMsg('Please complete your Full Name, Mobile Number, and Email Address.');
        return;
      }
    }
    setErrorMsg('');
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setErrorMsg('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          businessName: formData.businessName.trim() || 'N/A',
          businessCategory: formData.businessType,
          city: formData.city.trim() || 'Nashik',
          service: formData.websiteType,
          websiteType: formData.websiteType,
          pagesCount: formData.pagesCount,
          budget: formData.budget,
          deliveryDate: formData.expectedDelivery || 'Flexible',
          message: `Scope Questionnaire Submission:\n- Industry: ${formData.businessType}\n- Website Type: ${formData.websiteType}\n- Pages: ${formData.pagesCount}\n- Need Domain: ${formData.needDomain}\n- Need Hosting: ${formData.needHosting}\n- Need Logo: ${formData.needLogo}\n- Notes: ${formData.additionalReqs}`,
          source: 'Scope Questionnaire Modal',
          questionnaire: {
            businessType: formData.businessType,
            websiteType: formData.websiteType,
            pagesCount: formData.pagesCount,
            needDomain: formData.needDomain,
            needHosting: formData.needHosting,
            needLogo: formData.needLogo,
            expectedDelivery: formData.expectedDelivery || 'Flexible',
            additionalReqs: formData.additionalReqs
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmittedLead(data.lead);
        onSuccessSubmit(data.lead);
      } else {
        setErrorMsg(data.message || 'Error saving questionnaire scope.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Prakash Graphic Designer • Scope Builder</h3>
              <p className="text-slate-400 text-xs">Build your custom website specification in 3 easy steps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!submittedLead && (
          <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
              <span>Contact & Business</span>
            </div>
            <div className="h-0.5 flex-1 mx-3 bg-slate-800">
              <div className="h-full bg-blue-500 transition-all" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
              <span>Website Specs</span>
            </div>
            <div className="h-0.5 flex-1 mx-3 bg-slate-800">
              <div className="h-full bg-blue-500 transition-all" style={{ width: step === 3 ? '100%' : '0%' }} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
              <span>Budget & Timeline</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {submittedLead ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-white">Project Scope Saved into CRM!</h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{submittedLead.name}</span>! Your customized project scope for <span className="text-blue-400 font-semibold">{submittedLead.service}</span> has been logged. Prakash Dhole will contact you shortly.
              </p>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs font-mono space-y-2 mb-4 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Ref ID:</span>
                  <span className="text-blue-400 font-bold">{submittedLead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Website & Pages:</span>
                  <span className="text-slate-200">{submittedLead.service} ({submittedLead.questionnaire?.pagesCount})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Budget & Target:</span>
                  <span className="text-emerald-400">{submittedLead.budget} (Delivery: {submittedLead.questionnaire?.expectedDelivery || 'Flexible'})</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Step 1: Your Contact & Business Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Dhole"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Mobile Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="e.g. +91 8055239255"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="WhatsApp Number"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Nashik Enterprises"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Nashik, Mumbai, Pune"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Step 2: Technical & Website Scope
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Required Website Type
                      </label>
                      <select
                        value={formData.websiteType}
                        onChange={e => setFormData({ ...formData, websiteType: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="Company Website">Company Website</option>
                        <option value="School Website">School Website</option>
                        <option value="Hospital Website">Hospital Website</option>
                        <option value="Restaurant Website">Restaurant Website</option>
                        <option value="Hotel Website">Hotel Website</option>
                        <option value="Portfolio Website">Portfolio Website</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Website Maintenance">Website Maintenance</option>
                        <option value="SEO">SEO</option>
                        <option value="Google Business Profile">Google Business Profile</option>
                        <option value="Domain & Hosting">Domain & Hosting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Estimated Number of Pages
                      </label>
                      <select
                        value={formData.pagesCount}
                        onChange={e => setFormData({ ...formData, pagesCount: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="1 Page (Landing Page)">1 Page (Landing Page)</option>
                        <option value="1-5 Pages">1-5 Pages (Starter Website)</option>
                        <option value="5-10 Pages">5-10 Pages (Standard Business)</option>
                        <option value="10-20 Pages">10-20 Pages (Pro Corporate)</option>
                        <option value="20+ Pages">20+ Pages (Portal / E-com)</option>
                      </select>
                    </div>
                  </div>

                  {/* Yes / No Toggles */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <span className="block text-xs text-slate-300 font-medium mb-2">Need Domain?</span>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, needDomain: 'Yes' })}
                          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${formData.needDomain === 'Yes' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, needDomain: 'No' })}
                          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${formData.needDomain === 'No' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <span className="block text-xs text-slate-300 font-medium mb-2">Need Hosting?</span>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, needHosting: 'Yes' })}
                          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${formData.needHosting === 'Yes' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, needHosting: 'No' })}
                          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${formData.needHosting === 'No' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <span className="block text-xs text-slate-300 font-medium mb-2">Need Logo?</span>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, needLogo: 'Yes' })}
                          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${formData.needLogo === 'Yes' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, needLogo: 'No' })}
                          className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${formData.needLogo === 'No' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Step 3: Budget & Target Delivery Timeline
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
                        <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000</option>
                        <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000+">₹1,00,000+ (Custom Portal)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Required Delivery Date
                      </label>
                      <input
                        type="date"
                        value={formData.expectedDelivery}
                        onChange={e => setFormData({ ...formData, expectedDelivery: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Additional Message / Specific Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalReqs}
                      onChange={e => setFormData({ ...formData, additionalReqs: e.target.value })}
                      placeholder="e.g. Razorpay Payment Gateway, Doctor Schedule Table, WhatsApp direct order button, Multilingual support..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all ml-auto cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all ml-auto cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Saving Scope...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Scope</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
