import React from 'react';
import { Bot, Lightbulb, Sparkles, BrainCircuit, Cpu, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

interface AiSolutionsSectionProps {
  onOpenQuestionnaire: (serviceName?: string) => void;
}

export const AiSolutionsSection: React.FC<AiSolutionsSectionProps> = ({ onOpenQuestionnaire }) => {
  return (
    <section className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800 relative overflow-hidden" id="ai-solutions">
      {/* Background glowing ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner Title (Exact wording matching video 0:33 - 0:42) */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Prakash Graphic Designer • Next-Gen AI Integration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            We Provide <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">AI Solutions</span> for Your Business & Transforming Challenges Into <span className="text-amber-300">Opportunities</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We harness the power of artificial intelligence to revolutionize business operations. Our AI-driven solutions optimize processes, enhance decision-making, and accelerate client acquisition.
          </p>
        </div>

        {/* 2 Big Visual Cards matching video 0:35 (Robot Head & Glowing Lightbulb) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Card 1: Futuristic Robot AI Brain (Video 0:35) */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

            <div>
              {/* Graphic container */}
              <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 p-6 flex items-center justify-center relative overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                
                {/* 3D AI Robot Brain Avatar Visual */}
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/40 group-hover:scale-105 transition-transform duration-500">
                    <BrainCircuit className="w-12 h-12 text-blue-200 animate-pulse" />
                  </div>
                  <span className="inline-block text-xs font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                    Smart Lead Bot & AI Assistant
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Intelligent AI Customer Assistants & Chatbots
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Automate customer inquiries 24/7 on your website with custom-trained Gemini & OpenAI chatbots. Instantly capture customer names, phone numbers, and requirements even while you sleep.
              </p>
            </div>

            <button
              onClick={() => onOpenQuestionnaire('AI Chatbot & Lead Automation')}
              className="w-full bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Add AI Chatbot to Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Glowing Innovation Bulb (Video 0:39) */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between hover:border-amber-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

            <div>
              {/* Graphic container */}
              <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 p-6 flex items-center justify-center relative overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                
                {/* Glowing Lightbulb Innovation Graphic */}
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 group-hover:scale-105 transition-transform duration-500">
                    <Lightbulb className="w-12 h-12 text-amber-200 animate-bounce" />
                  </div>
                  <span className="inline-block text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                    Bespoke Business Digital Transformation
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                End-to-End Digital Workflow & Automation
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                With expertise in custom website development, mobile apps, cloud hosting, and digital marketing, we seamlessly integrate modern technology into your business ecosystem for maximum efficiency.
              </p>
            </div>

            <button
              onClick={() => onOpenQuestionnaire('Custom Business Automation')}
              className="w-full bg-slate-900 hover:bg-amber-600 text-slate-200 hover:text-white border border-slate-800 hover:border-amber-500 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Transform Your Business Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
