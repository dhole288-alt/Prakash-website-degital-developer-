import React, { useState } from 'react';
import { Phone, MessageCircle, X, ChevronUp, Sparkles } from 'lucide-react';

export const FloatingContactButtons: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const phoneNumber = '+91 8055239252';
  const rawNumber = '918055239252';
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(
    'Hello Prakash Graphic Designer, I am interested in building a website for my business.'
  )}`;
  const callUrl = `tel:+${rawNumber}`;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 max-w-[calc(100vw-2rem)] select-none pointer-events-auto">
      
      {/* Minimized Bubble Toggle */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3.5 shadow-2xl border-2 border-emerald-400/30 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open WhatsApp & Call Contact Widget"
          aria-label="Open contact options"
        >
          <div className="relative">
            <WhatsAppIcon className="w-6 h-6 fill-current animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full border-2 border-emerald-700 animate-ping" />
          </div>
          <span className="text-xs font-bold hidden sm:inline pr-1">Chat on WhatsApp</span>
          <ChevronUp className="w-4 h-4 text-emerald-200 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      ) : (
        <div className="flex flex-col items-end gap-2 bg-slate-950/90 backdrop-blur-md p-2.5 sm:p-3 rounded-3xl border border-slate-800/90 shadow-2xl shadow-emerald-950/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          
          {/* Header Status Bar */}
          <div className="flex items-center justify-between w-full pl-2 pr-1 pt-0.5 pb-1 border-b border-slate-800/80 gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Live Customer Support
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Minimize floating buttons"
              aria-label="Minimize floating contact widget"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons Stack */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
            
            {/* WhatsApp Floating Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-lg shadow-emerald-900/40 border border-emerald-400/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[48px]"
            >
              <div className="relative shrink-0 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full border border-emerald-700" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider leading-none">
                  Chat with us on WhatsApp
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white mt-0.5 leading-none">
                  {phoneNumber}
                </span>
              </div>
            </a>

            {/* Call Now Button */}
            <a
              href={callUrl}
              className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-lg shadow-blue-900/40 border border-blue-400/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[48px]"
            >
              <div className="shrink-0 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-white" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-blue-100 tracking-wider leading-none">
                  Call Now Direct
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white mt-0.5 leading-none">
                  {phoneNumber}
                </span>
              </div>
            </a>

          </div>

          {/* Subtext Label */}
          <div className="text-[10px] text-slate-400 text-right pr-1 pt-0.5">
            Prakash Graphic Designer • Instant Direct Connect
          </div>

        </div>
      )}

    </div>
  );
};

// SVG WhatsApp Icon Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}
