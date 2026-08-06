import React from 'react';
import { Sparkles, Phone, MessageSquare, CheckCircle, ArrowRight, MapPin, Smartphone, Cloud, Laptop } from 'lucide-react';
import { Lead } from '../types';

interface HeroSectionProps {
  onOpenQuestionnaire: () => void;
  onSuccessSubmit: (lead: Lead) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuestionnaire }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 bg-slate-950 text-slate-100" id="home">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-600/15 via-blue-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines, Contact CTAs & Business Details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Nashik, Maharashtra • Prakash Graphic Designer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Professional Website <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-white">Design & Development</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Custom business websites, hospital portals, school management sites, hotel & restaurant booking engines, and e-commerce platforms engineered for rapid growth and maximum lead generation.
            </p>

            {/* Direct Action Buttons: Get Free Quote, WhatsApp, Call Now */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenQuestionnaire}
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
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
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium text-slate-200 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Mobile Responsive & Ultra Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Free Domain, Hosting & SSL Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span>SEO & Google Business Profile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
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
                <span className="text-xl sm:text-2xl font-bold text-orange-400 block">100%</span>
                <span className="text-[11px] text-slate-400">Client Satisfaction</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-bold text-amber-300 block">Nashik</span>
                <span className="text-[11px] text-slate-400">Maharashtra HQ</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Resolution Visual Application Showcase */}
          <div className="lg:col-span-6" id="hero-showcase">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border-2 border-slate-800 hover:border-orange-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group transition-all">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Visual Showcase Content */}
              <div className="relative z-10 space-y-6">
                
                {/* Visual Graphic Display Header */}
                <div className="w-full h-56 rounded-2xl bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950 border border-slate-800/80 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#ff6b00_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  {/* Floating 3D Cloud & Laptop Graphic */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <div className="absolute -top-3 bg-orange-500/20 border border-orange-400/40 p-2 rounded-xl text-orange-400 shadow-lg animate-bounce">
                      <Cloud className="w-6 h-6" />
                    </div>

                    {/* Laptop Mockup */}
                    <div className="w-40 h-28 bg-slate-900 border-2 border-orange-400/80 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between transform -rotate-2 group-hover:rotate-0 transition-transform">
                      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[8px] text-orange-300 font-mono ml-auto">TechSurya.app</span>
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="h-1.5 w-3/4 bg-orange-500/60 rounded" />
                        <div className="h-1.5 w-1/2 bg-blue-400/60 rounded" />
                        <div className="h-1.5 w-5/6 bg-indigo-500/60 rounded" />
                      </div>
                      <div className="flex justify-between items-center text-[8px]">
                        <span className="text-orange-400 font-bold">Web & Mobile</span>
                        <span className="text-emerald-400 font-semibold">Live 99.9%</span>
                      </div>
                    </div>

                    {/* Mobile Mockup */}
                    <div className="w-14 h-28 bg-slate-900 border-2 border-blue-400/80 rounded-2xl p-1.5 shadow-2xl flex flex-col justify-between transform rotate-6 group-hover:rotate-0 transition-transform">
                      <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto" />
                      <div className="w-full h-16 bg-gradient-to-b from-orange-500/30 to-blue-600/30 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-orange-400 animate-pulse" />
                      </div>
                      <div className="w-3 h-3 rounded-full bg-orange-400/80 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Text & Subtitle */}
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
                    Full Stack Digital Agency
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Engineered For Business Growth
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Get custom software, mobile apps, and high-converting web applications crafted specifically for your business requirements.
                  </p>
                </div>

                {/* Quick Feature Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Development SLA</span>
                    <span className="text-orange-400 font-extrabold text-sm">Fast 3-Day Delivery</span>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Client Rating</span>
                    <span className="text-emerald-400 font-extrabold text-sm">4.9 ★★★★★</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onOpenQuestionnaire}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Request Custom Project Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
