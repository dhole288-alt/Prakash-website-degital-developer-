import React from 'react';
import { Sparkles, Phone, MessageSquare, CheckCircle, ArrowRight, ShieldCheck, Award, MapPin } from 'lucide-react';
import { QuickEnquiryForm } from './QuickEnquiryForm';
import { Lead } from '../types';

interface HeroSectionProps {
  onOpenQuestionnaire: () => void;
  onSuccessSubmit: (lead: Lead) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuestionnaire, onSuccessSubmit }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 bg-slate-950 text-slate-100" id="home">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines, Contact CTAs & Business Details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Nashik, Maharashtra • Prakash Graphic Designer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Professional Website <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Design & Development</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Custom business websites, hospital portals, school management sites, hotel & restaurant booking engines, and e-commerce platforms engineered for rapid growth and maximum lead generation.
            </p>

            {/* Direct Action Buttons: Get Free Quote, WhatsApp, Call Now */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenQuestionnaire}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Get Free Quote</span>
              </button>

              <a
                href="https://wa.me/918055239255?text=Hello%20Prakash%20Graphic%20Designer%20I%20want%20a%20website%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (+91 8055239255)</span>
              </a>

              <a
                href="tel:+918055239255"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-700 shadow-md flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium text-slate-200 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mobile Responsive & Ultra Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Domain, Hosting & SSL Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SEO & Google Business Profile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated CRM Lead Routing</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-bold text-white block">300+</span>
                <span className="text-[11px] text-slate-400">Websites Developed</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-bold text-emerald-400 block">100%</span>
                <span className="text-[11px] text-slate-400">Client Satisfaction</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-bold text-amber-300 block">Nashik</span>
                <span className="text-[11px] text-slate-400">Maharashtra HQ</span>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Request Quote Form */}
          <div className="lg:col-span-6" id="request-quote">
            <QuickEnquiryForm onSuccessSubmit={onSuccessSubmit} />
          </div>

        </div>
      </div>
    </section>
  );
};
