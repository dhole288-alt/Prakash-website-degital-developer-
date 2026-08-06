import React, { useState } from 'react';
import { Rocket, Cpu, Code, Database, Sparkles, Layers, ShieldCheck, Smartphone } from 'lucide-react';

export const TechArsenalSection: React.FC = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const techStack = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      icon: '⚛️',
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300',
      description: 'High-performance interactive web UI components & SPA architecture.'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Framework',
      icon: '▲',
      color: 'from-slate-700/30 to-slate-900/30 border-slate-500/40 text-white',
      description: 'Server-side rendering, static site generation, and lightning-fast SEO.'
    },
    {
      id: 'aws',
      name: 'AWS Cloud',
      category: 'Infrastructure',
      icon: '☁️',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
      description: 'Enterprise cloud hosting, S3 asset buckets, and scalable serverless APIs.'
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow / AI',
      category: 'AI & ML',
      icon: '🧠',
      color: 'from-orange-500/20 to-amber-600/20 border-orange-500/40 text-orange-400',
      description: 'Machine learning algorithms, smart automation, and predictive analytics.'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      category: 'Mobile',
      icon: '💙',
      color: 'from-blue-600/20 to-sky-400/20 border-sky-400/40 text-sky-300',
      description: 'Cross-platform native iOS & Android apps built from a single codebase.'
    },
    {
      id: 'supabase',
      name: 'Supabase / PostgreSQL',
      category: 'Database',
      icon: '⚡',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
      description: 'Real-time database persistence, row-level security, and fast queries.'
    },
    {
      id: 'android',
      name: 'Android Studio',
      category: 'Mobile',
      icon: '🤖',
      color: 'from-emerald-600/20 to-green-500/20 border-emerald-500/40 text-emerald-400',
      description: 'Native Android application engineering & Google Play Store publishing.'
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      category: 'Backend',
      icon: '🟢',
      color: 'from-green-600/20 to-emerald-500/20 border-green-500/40 text-green-300',
      description: 'Scalable REST APIs, microservices, and CRM backend event routing.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800 relative overflow-hidden" id="tech-stack">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Modern Tech Stack
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">Technology Arsenal</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We leverage cutting-edge frameworks, cloud platforms, and AI engines to engineer high-performance web applications and automated mobile systems.
          </p>
        </div>

        {/* 3D Rocket Laptop Graphic & Tech Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Futuristic Rocket Laptop Card (Matching Video 0:43) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            
            <div className="relative z-10 space-y-6">
              <div className="h-64 rounded-2xl bg-slate-950 border border-slate-800/80 p-4 relative flex flex-col items-center justify-center overflow-hidden">
                {/* Simulated 3D Laptop with Rocket Launch Artwork */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-indigo-950/20 to-transparent pointer-events-none" />
                
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-4 animate-pulse">
                  <Rocket className="w-10 h-10 text-amber-300" />
                </div>

                <div className="text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Ultra Fast Speed</span>
                  <h3 className="text-lg font-extrabold text-white">Next-Gen Web Architecture</h3>
                  <p className="text-[11px] text-slate-400 max-w-xs">Engineered for 99+ Google PageSpeed Insights score & 1-second load times.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Cloud SLA Uptime</span>
                  <span className="text-emerald-400 font-extrabold text-sm">99.9% Reliable</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Security Standard</span>
                  <span className="text-blue-400 font-extrabold text-sm">256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Glowing Grid of Tech Logos (Matching Video 0:45 - 0:50) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.id}
                onMouseEnter={() => setActiveTech(tech.id)}
                onMouseLeave={() => setActiveTech(null)}
                className={`bg-slate-900 border rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between group ${
                  activeTech === tech.id
                    ? 'border-amber-400 shadow-xl shadow-amber-500/10 -translate-y-1 bg-gradient-to-b ' + tech.color
                    : 'border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl mb-3 shadow-md group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-0.5">{tech.name}</h4>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">{tech.category}</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-tight hidden sm:block line-clamp-2">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
