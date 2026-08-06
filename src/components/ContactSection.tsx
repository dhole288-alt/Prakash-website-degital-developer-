import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { QuickEnquiryForm } from './QuickEnquiryForm';
import { Lead } from '../types';

interface ContactSectionProps {
  onSuccessSubmit: (lead: Lead) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessSubmit }) => {
  return (
    <section className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Prakash Graphic Designer • Contact Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let’s Build Your Premium Website
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Reach out directly via phone, WhatsApp, email or submit your requirements below for an instant custom quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Details & Google Maps Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Agency Headquarters</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Prakash Graphic Designer Studio — Nashik’s leading digital agency for modern website engineering and lead growth.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="tel:+918055239255"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Direct Mobile Line</span>
                    <span className="font-bold text-white text-sm">+91 8055239255</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/918055239255?text=Hello%20Prakash%20Graphic%20Designer%20I%20want%20a%20website%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">WhatsApp Chat</span>
                    <span className="font-bold text-emerald-400 text-sm">+91 8055239255 (Instant Response)</span>
                  </div>
                </a>

                <a
                  href="mailto:prakashdhole965@gmail.com"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Official Email</span>
                    <span className="font-bold text-white text-sm">prakashdhole965@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Office Address</span>
                    <span className="font-bold text-white text-sm">Nashik, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" /> Mon - Sat: 9:00 AM - 8:00 PM</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold"><ShieldCheck className="w-3.5 h-3.5" /> Verified Studio</span>
              </div>

            </div>

            {/* Simulated Google Maps Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden relative shadow-lg">
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Nashik Location Pin</span>
                </div>
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">Google Maps</span>
              </div>
              
              <div className="h-36 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-xs block">Prakash Graphic Designer</span>
                  <span className="text-[11px] text-slate-400">Nashik, Maharashtra 422001</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <QuickEnquiryForm onSuccessSubmit={onSuccessSubmit} />
          </div>

        </div>

      </div>
    </section>
  );
};
