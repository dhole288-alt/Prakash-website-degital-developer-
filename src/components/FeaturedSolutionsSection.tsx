import React from 'react';
import { 
  Smartphone, Laptop, Database, Cloud, FileText, Cpu, Code2, 
  Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck, CreditCard
} from 'lucide-react';

interface FeaturedSolutionsSectionProps {
  onOpenQuestionnaire: (serviceName?: string) => void;
}

export const FeaturedSolutionsSection: React.FC<FeaturedSolutionsSectionProps> = ({ onOpenQuestionnaire }) => {
  const featuredCards = [
    {
      id: 'app-dev',
      title: 'Application Development',
      badge: 'Mobile & Cloud',
      gradient: 'from-blue-900/80 via-indigo-950/90 to-slate-950',
      borderColor: 'border-blue-500/40 hover:border-cyan-400',
      shadowColor: 'shadow-blue-500/10 hover:shadow-cyan-500/20',
      accentColor: 'text-cyan-400',
      description: 'Native iOS & Android mobile apps, PWA web applications, and scalable backend cloud infrastructure.',
      tags: ['Android Studio', 'Flutter / React Native', 'Cloud Sync', 'Push Notifications'],
      illustration: (
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-950/90 via-slate-900 to-indigo-950 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-blue-500/30">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          {/* Glowing Orbs matching screenshot */}
          <div className="absolute top-3 right-6 w-16 h-16 bg-pink-500/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-2 left-6 w-20 h-20 bg-cyan-500/30 rounded-full blur-xl" />

          {/* Central 3D Visual elements matching Tech Surya screenshot (Laptop + Mobile + Cloud + Floating Orb) */}
          <div className="relative z-10 flex items-center justify-center gap-3">
            {/* Cloud Icon floating top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-blue-600/30 border border-cyan-400/50 p-2 rounded-xl backdrop-blur-md text-cyan-300 shadow-lg animate-bounce">
              <Cloud className="w-6 h-6" />
            </div>

            {/* Laptop UI Screen */}
            <div className="w-36 h-24 bg-slate-900 border-2 border-cyan-400/60 rounded-xl p-2 shadow-2xl flex flex-col justify-between relative transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[8px] text-cyan-300 font-mono ml-auto">App.tsx</span>
              </div>
              <div className="space-y-1 py-1">
                <div className="h-1.5 w-3/4 bg-blue-500/40 rounded" />
                <div className="h-1.5 w-1/2 bg-cyan-400/60 rounded" />
                <div className="h-1.5 w-5/6 bg-indigo-500/40 rounded" />
              </div>
              <div className="flex justify-between items-center text-[8px] text-slate-400">
                <span className="text-cyan-400 font-bold">iOS & Android</span>
                <span className="text-emerald-400">v2.4 Live</span>
              </div>
            </div>

            {/* Smartphone Floating */}
            <div className="w-14 h-28 bg-slate-900 border-2 border-indigo-400/60 rounded-2xl p-1.5 shadow-2xl flex flex-col justify-between transform rotate-6 hover:rotate-0 transition-transform">
              <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto" />
              <div className="w-full h-16 bg-gradient-to-b from-blue-600/30 to-indigo-600/30 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-cyan-300 animate-pulse" />
              </div>
              <div className="w-3 h-3 rounded-full bg-cyan-400/80 mx-auto" />
            </div>

            {/* Glowing 3D Orb floating */}
            <div className="absolute -right-2 top-8 w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shadow-pink-500/40 border border-white/40 animate-spin" />
          </div>
        </div>
      )
    },
    {
      id: 'software-dev',
      title: 'Software Development',
      badge: 'Enterprise Engine',
      gradient: 'from-slate-950 via-blue-950/90 to-slate-950',
      borderColor: 'border-indigo-500/40 hover:border-blue-400',
      shadowColor: 'shadow-indigo-500/10 hover:shadow-blue-500/20',
      accentColor: 'text-blue-400',
      description: 'Custom ERP software, multi-tenant SaaS architectures, workflow automation, and microservices.',
      tags: ['Custom ERP', 'Rest APIs', 'Database Design', 'Node.js & Python'],
      illustration: (
        <div className="relative w-full h-48 bg-gradient-to-br from-indigo-950/90 via-slate-950 to-blue-950 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-indigo-500/30">
          {/* Neon Isometric Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:14px_14px] opacity-25" />

          {/* Isometric Glowing Circuit Graphic matching screenshot center card */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Circuit connection nodes */}
            <div className="absolute -inset-4 flex items-center justify-between pointer-events-none opacity-60">
              <div className="w-3 h-3 rounded-full bg-cyan-400 border border-cyan-200 animate-ping" />
              <div className="w-3 h-3 rounded-full bg-indigo-400 border border-indigo-200" />
              <div className="w-3 h-3 rounded-full bg-blue-400 border border-blue-200" />
            </div>

            {/* Isometric 3D Laptop with Circuit Matrix */}
            <div className="w-44 h-28 bg-slate-900/90 border-2 border-indigo-400/80 rounded-2xl p-2.5 shadow-2xl relative flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-all group-hover:border-cyan-400">
              <div className="flex items-center justify-between border-b border-indigo-500/30 pb-1.5">
                <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> Architecture Engine
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="grid grid-cols-3 gap-1.5 my-1 text-[8px] text-slate-300 font-mono">
                <div className="bg-indigo-950/80 border border-indigo-500/30 p-1 rounded text-center">
                  <span className="text-cyan-300 block font-bold">API</span> 200 OK
                </div>
                <div className="bg-indigo-950/80 border border-indigo-500/30 p-1 rounded text-center">
                  <span className="text-indigo-300 block font-bold">SQL</span> Active
                </div>
                <div className="bg-indigo-950/80 border border-indigo-500/30 p-1 rounded text-center">
                  <span className="text-emerald-300 block font-bold">CPU</span> 12%
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-1 rounded text-[8px] text-indigo-300 flex items-center justify-between">
                <span>Microservices Grid</span>
                <Code2 className="w-3 h-3 text-cyan-400" />
              </div>
            </div>

          </div>
        </div>
      )
    },
    {
      id: 'billing-software',
      title: 'Billing Software',
      badge: 'GST & Invoicing',
      gradient: 'from-blue-950 via-slate-950 to-indigo-950',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      shadowColor: 'shadow-emerald-500/10 hover:shadow-emerald-500/20',
      accentColor: 'text-emerald-400',
      description: 'Retail & wholesale GST billing software, inventory tracking, sales analytics, and WhatsApp PDF invoices.',
      tags: ['GST Compliance', 'Thermal Printer POS', 'Inventory Stock', 'WhatsApp PDF'],
      illustration: (
        <div className="relative w-full h-48 bg-gradient-to-br from-slate-950 via-blue-950/90 to-emerald-950/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-emerald-500/30">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

          {/* User working on laptop with floating analytics matching bottom card */}
          <div className="relative z-10 flex items-center justify-center gap-2">
            
            {/* Left: Floating Invoice / Payment Card */}
            <div className="w-24 bg-slate-900/90 border border-emerald-500/50 rounded-xl p-2 shadow-xl space-y-1 transform -rotate-6">
              <div className="flex justify-between items-center text-[8px] font-bold text-emerald-300">
                <span>INVOICE #902</span>
                <CreditCard className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <div className="text-[10px] font-extrabold text-white">₹ 24,500.00</div>
              <div className="text-[7px] text-slate-400 bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 font-semibold inline-block">
                GST 18% Paid
              </div>
            </div>

            {/* Center: Laptop with POS Dashboard */}
            <div className="w-36 h-24 bg-slate-900 border-2 border-emerald-400/60 rounded-xl p-2 shadow-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-[8px] font-extrabold text-emerald-300 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-emerald-400" /> POS Billing Software
                </span>
                <span className="text-[7px] text-slate-400">Offline Ready</span>
              </div>
              <div className="space-y-1 py-1">
                <div className="flex justify-between text-[8px]">
                  <span className="text-slate-400">Daily Sales:</span>
                  <span className="text-emerald-400 font-bold">₹ 1,48,200</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-emerald-400" />
                </div>
              </div>
              <div className="bg-slate-950 px-1.5 py-0.5 rounded text-[8px] text-emerald-300 flex justify-between items-center">
                <span>Barcode & Thermal POS</span>
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              </div>
            </div>

          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800 relative overflow-hidden" id="featured-solutions">
      
      {/* Glow highlight behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            Specialized Software & App Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Custom <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300">Software & Mobile Apps</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Engineered with high-speed 3D web interfaces, offline-first sync engines, and seamless cloud database infrastructure.
          </p>
        </div>

        {/* 3 Featured Visual Cards (Exact replica of Tech Surya Application, Software & Billing Cards in photo) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCards.map((card) => (
            <div
              key={card.id}
              className={`bg-gradient-to-b ${card.gradient} border ${card.borderColor} rounded-3xl p-6 shadow-2xl ${card.shadowColor} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden`}
            >
              <div>
                {/* 3D Visual Illustration Header */}
                <div className="mb-6">
                  {card.illustration}
                </div>

                {/* Badge & Title */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-full ${card.accentColor}`}>
                    {card.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">3D Interactive</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-950/80 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-medium"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenQuestionnaire(card.title)}
                className="w-full bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>Get Demo & Quote for {card.title}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">1-Year Free Technical Support & Maintenance</span>
              <span>All software & mobile app projects include full source code delivery & Play Store submission support.</span>
            </div>
          </div>

          <button
            onClick={() => onOpenQuestionnaire('Custom Software & App Inquiry')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Schedule Technical Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
