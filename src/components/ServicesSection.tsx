import React, { useState } from 'react';
import { 
  Building2, School, Hospital, Utensils, Hotel, UserCheck, 
  ShoppingCart, Rocket, RefreshCw, Wrench, Search, MapPin, 
  Globe, Check, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuestionnaire: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuestionnaire }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const services = [
    {
      id: 'business-website',
      icon: Building2,
      category: 'Websites',
      title: 'Business Website',
      desc: 'High-converting custom website for local businesses, shops, manufacturers and service providers.',
      features: ['Mobile Friendly', 'WhatsApp Button', 'Contact Form', 'Google Maps'],
      badge: 'Popular'
    },
    {
      id: 'company-website',
      icon: Globe,
      category: 'Websites',
      title: 'Company Website',
      desc: 'Sleek, brand-focused corporate portals engineered for corporate authority and B2B client conversion.',
      features: ['Corporate Design', 'Multi-page Architecture', 'Service Catalogue', 'SSL Security'],
      badge: 'B2B Special'
    },
    {
      id: 'school-website',
      icon: School,
      category: 'Websites',
      title: 'School Website',
      desc: 'Interactive school & college websites with online admission forms, notices, events gallery, and curriculum.',
      features: ['Admission Enquiry', 'Notices Board', 'Photo Gallery', 'Faculty Directory'],
      badge: 'Education'
    },
    {
      id: 'hospital-website',
      icon: Hospital,
      category: 'Websites',
      title: 'Hospital Website',
      desc: 'Healthcare and clinic web portals featuring doctor schedules, department list, and online appointment booking.',
      features: ['Doctor Profiles', 'Appointment Form', 'Department Directory', 'Emergency Contacts'],
      badge: 'Healthcare'
    },
    {
      id: 'restaurant-website',
      icon: Utensils,
      category: 'Websites',
      title: 'Restaurant Website',
      desc: 'Food & dining websites with digital QR menus, table reservation forms, and instant WhatsApp food orders.',
      features: ['Digital Menu', 'Table Booking', 'WhatsApp Order Link', 'Location Map'],
      badge: 'Food & Dining'
    },
    {
      id: 'hotel-website',
      icon: Hotel,
      category: 'Websites',
      title: 'Hotel Website',
      desc: 'Luxury hotel and resort websites with room galleries, amenities tour, and direct room booking enquiry.',
      features: ['Room Showcase', 'Direct Booking Enquiry', 'Amenities Tour', 'Virtual Gallery'],
      badge: 'Hospitality'
    },
    {
      id: 'portfolio-website',
      icon: UserCheck,
      category: 'Websites',
      title: 'Portfolio Website',
      desc: 'Personal portfolio websites for artists, designers, doctors, lawyers, consultants, and freelancers.',
      features: ['Project Showcase', 'Resume Integration', 'Client Reviews', 'Direct Inquiry'],
      badge: 'Personal'
    },
    {
      id: 'ecommerce-website',
      icon: ShoppingCart,
      category: 'Websites',
      title: 'E-commerce Website',
      desc: 'Online stores with Razorpay/Stripe payment gateway, shopping cart, inventory management and order tracking.',
      features: ['Payment Gateway', 'Shopping Cart', 'Product Filters', 'Order Management'],
      badge: 'High ROI'
    },
    {
      id: 'landing-page',
      icon: Rocket,
      category: 'Websites',
      title: 'Landing Page',
      desc: 'High-speed, single-page lead capture sales pages designed specifically for Google & Facebook Ads campaigns.',
      features: ['Lead Capture Form', 'Fast 1-Sec Load', 'Call to Actions', 'A/B Test Ready'],
      badge: 'Lead Gen'
    },
    {
      id: 'website-redesign',
      icon: RefreshCw,
      category: 'Maintenance',
      title: 'Website Redesign',
      desc: 'Modernize your old website with a fresh responsive UI layout, faster loading speeds, and modern branding.',
      features: ['Modern UI/UX', 'Mobile Optimization', 'SEO Preservation', 'Content Revamp'],
      badge: 'Revamp'
    },
    {
      id: 'website-maintenance',
      icon: Wrench,
      category: 'Maintenance',
      title: 'Website Maintenance',
      desc: '24/7 technical support, regular backups, security monitoring, plugin updates, and content changes.',
      features: ['Daily Backups', 'Security Scans', 'Content Updates', 'Bug Fixing'],
      badge: 'Monthly'
    },
    {
      id: 'seo',
      icon: Search,
      category: 'Marketing',
      title: 'SEO (Search Engine Optimization)',
      desc: 'On-page and off-page SEO optimization to rank your business #1 on Google search for local keywords.',
      features: ['Keyword Ranking', 'On-Page SEO', 'Backlink Strategy', 'Speed Optimization'],
      badge: 'Google Rank'
    },
    {
      id: 'google-business-profile',
      icon: MapPin,
      category: 'Marketing',
      title: 'Google Business Profile',
      desc: 'Complete Setup & Verification of Google My Business profile to get more local phone calls and shop visits.',
      features: ['GMB Verification', 'Local SEO Ranking', 'Review Management', 'Map Pinning'],
      badge: 'Local Calls'
    },
    {
      id: 'domain-hosting',
      icon: ShieldCheck,
      category: 'Hosting',
      title: 'Domain & Hosting',
      desc: 'Fast NVMe SSD high-speed Web Hosting setup, .com / .in Domain registration, professional business email & SSL.',
      features: ['Fast NVMe Hosting', '.com / .in Domain', 'Free SSL Certificate', 'Business Emails'],
      badge: 'Infrastructure'
    }
  ];

  const categories = ['All', 'Websites', 'Marketing', 'Maintenance', 'Hosting'];

  const filteredServices = filterCategory === 'All'
    ? services
    : services.filter(s => s.category === filterCategory);

  return (
    <section className="py-20 bg-slate-900 border-t border-b border-slate-800 text-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Prakash Graphic Designer • Our 14 Core Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Complete Website Design, Development & Marketing
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From single-page landing sites to full hospital portals, school management systems, e-commerce stores, and GMB ranking in Nashik & across India.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of All 14 Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-blue-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-700 text-blue-300 px-2.5 py-1 rounded-full">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{s.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {s.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onOpenQuestionnaire(s.title)}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Request Quote for {s.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
