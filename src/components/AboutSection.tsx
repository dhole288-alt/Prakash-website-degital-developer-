import React from 'react';
import { Award, CheckCircle2, ShieldCheck, MapPin, Users, Sparkles, Code2, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>About Prakash Graphic Designer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Crafting International-Standard Digital Web Solutions in <span className="text-blue-400">Nashik, Maharashtra</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded by <strong className="text-white">Prakash Dhole</strong>, Prakash Graphic Designer is a full-service Website Design & Development Studio based in Nashik, Maharashtra, India. We empower businesses, schools, hospitals, restaurants, and startups with high-performing, search-engine-optimized websites and custom lead capture systems.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Our core objective is simple: translate your business vision into an elegant, fast-loading digital experience that builds brand credibility and generates a steady stream of qualified customer leads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Full-Stack Tech Stack</h4>
                  <p className="text-slate-400 text-xs mt-1">React, Next.js, Node.js, Express, Tailwind CSS, & Cloud DB.</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Dedicated After-Sales Care</h4>
                  <p className="text-slate-400 text-xs mt-1">24/7 maintenance, regular backups, and free updates.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Experience Cards & Location Pin */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="space-y-6">
              
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  8+
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Years of Creative Excellence</h3>
                  <p className="text-slate-400 text-xs">Over 300+ successful client deployments across India.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Headquarters: Nashik, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Mobile & WhatsApp Support: +91 8055239255</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Email: prakashdhole965@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Guaranteed 2-Hour SLA Lead Response</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 bg-slate-950/80 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Lead Designer & Developer</span>
                  <span className="text-sm font-bold text-white">Prakash Dhole</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Nashik, MH</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
