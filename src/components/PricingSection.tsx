import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenQuestionnaire: (planName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenQuestionnaire }) => {
  const plans = [
    {
      name: 'Starter Website',
      price: '₹5,000 - ₹15,000',
      subtitle: 'Perfect for local shops, small businesses & individual portfolios.',
      features: [
        '1 to 5 Professional Pages',
        'Mobile & Tablet Responsive',
        'Free .com / .in Domain (1 Yr)',
        'Free SSL Security Certificate',
        'WhatsApp Instant Inquiry Button',
        'Contact Form + Email Alerts',
        'Basic On-Page SEO Setup',
        'Google Maps Location Pin'
      ],
      popular: false,
      badge: 'Starter'
    },
    {
      name: 'Business Pro',
      price: '₹15,000 - ₹30,000',
      subtitle: 'Ideal for Companies, Schools, Hospitals, Hotels & Restaurants.',
      features: [
        '5 to 12 Custom Designed Pages',
        'Custom Business Layout & Graphic Design',
        'Free Domain & NVMe Fast Hosting',
        'Online Booking / Appointment Engine',
        'Dynamic Photo & Video Gallery',
        'Google Business Profile (GMB) Sync',
        'Lead Management CRM Integration',
        'Social Media Links Integration'
      ],
      popular: true,
      badge: 'Most Popular'
    },
    {
      name: 'E-Commerce Suite',
      price: '₹30,000 - ₹60,000',
      subtitle: 'Full online store with Razorpay / Stripe payment gateway.',
      features: [
        'Unlimited Products & Categories',
        'Razorpay & UPI Payment Gateway',
        'Shopping Cart & Checkout System',
        'Stock & Inventory Management',
        'Automated Order Email & SMS',
        'WhatsApp Direct Order Button',
        'Customer Account Portal',
        'Full E-Com SEO & Analytics'
      ],
      popular: false,
      badge: 'E-Com Special'
    },
    {
      name: 'Custom Web Portal',
      price: 'Custom Quote',
      subtitle: 'Tailored Web Applications, Hospital CRM & SaaS platforms.',
      features: [
        'Custom React & Node.js Architecture',
        'Role-Based Admin Dashboard',
        'Database & REST API Integration',
        'Custom Workflows & SMS Automation',
        'Dedicated Cloud Server Setup',
        'Priority SLA Tech Support (24/7)',
        'Staff Training & Source Code',
        'Full Data Backup & Backup Engine'
      ],
      popular: false,
      badge: 'Enterprise'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800 text-slate-100" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Transparent Investment • No Hidden Costs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Simple, Transparent Website Design Pricing
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every package includes responsive mobile layout, free domain & hosting consultation, SSL security certificate, and instant CRM lead routing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`bg-slate-950 border rounded-2xl p-6 shadow-xl relative flex flex-col justify-between transition-all ${
                p.popular
                  ? 'border-blue-500 shadow-blue-500/10 ring-1 ring-blue-500'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {p.badge}
                </span>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-slate-400 text-xs min-h-[32px]">{p.subtitle}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <span className="text-2xl font-extrabold text-white">{p.price}</span>
                  <span className="text-slate-400 text-xs block mt-1">One-time payment</span>
                </div>

                <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenQuestionnaire(p.name)}
                className={`w-full text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  p.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <span>Select {p.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
