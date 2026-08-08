import React from 'react';
import { Sparkles, ShieldCheck, Lock, PhoneCall, Mail, MapPin, LayoutDashboard, Twitter, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQuestionnaire: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenQuestionnaire }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 relative overflow-hidden" id="footer">
      
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* WE TRANSFORM / INNOVATE / SCALE Footer Banner (Matching video 1:12 - 1:18) */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <p className="text-slate-300 text-sm sm:text-base font-medium">
            Harnessing the power of AI, cloud, and automation to drive smarter business decisions.
          </p>

          <div className="py-4">
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
              WE <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">TRANSFORM</span> • <span className="text-blue-400">INNOVATE</span> • <span className="text-amber-300">SCALE</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuestionnaire}
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Contact Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+918055239252"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-700 shadow-md flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>+91 8055239252</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-t border-slate-800/80 pt-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <BrandLogo size="lg" showTagline={true} showBadge={true} />
            <p className="text-xs leading-relaxed text-slate-400">
              Nashik's premier web design & graphic studio. Custom corporate sites, billing software, graphic design, logo design, brand identity & digital marketing.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Google Verified Agency & SSL Protected</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">14 Core Services</a></li>
              <li><a href="#tech-stack" className="hover:text-white transition-colors">Technology Arsenal</a></li>
              <li><a href="#ai-solutions" className="hover:text-white transition-colors">AI Solutions</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Client Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Website Pricing Plans</a></li>
              <li><button onClick={onOpenQuestionnaire} className="hover:text-white transition-colors text-left">Scope Builder Questionnaire</button></li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors text-left flex items-center gap-1 mt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login & CRM Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CRM & Admin Access */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Lead CRM Management</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-blue-400 font-bold hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Access Admin CRM Portal</span>
                </button>
              </li>
              <li className="text-slate-400">Automated WhatsApp Lead Alerts</li>
              <li className="text-slate-400">Excel / CSV Export & Import</li>
              <li className="text-slate-400">Visitor Analytics & Logs</li>
            </ul>
          </div>

          {/* Direct Contact Details & Branches (Video 1:15) */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm mb-3">Contact & Offices</h4>
            <div className="flex items-center gap-2 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>+91 8055239252</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>prakashdhole965@gmail.com</span>
            </div>
            
            {/* Social Icons (Video 1:15) */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 hover:border-blue-500/50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-pink-400 hover:border-pink-500/50 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-500 hover:border-blue-500/50 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 hover:border-blue-500/50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Office Branches text (Video 1:18) */}
            <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
              <span className="font-bold text-white block">Office Branches At:</span>
              Nashik, Pune, Chhatrapati Sambhajinagar, Mumbai, Nagpur
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Prakash Graphic Designer & Lead CRM. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Secured</span>
            <button onClick={onOpenAdmin} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer flex items-center gap-1">
              <LayoutDashboard className="w-3 h-3" />
              <span>Admin Login</span>
            </button>
            <button onClick={onOpenQuestionnaire} className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={onOpenQuestionnaire} className="hover:text-slate-300 transition-colors cursor-pointer">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
