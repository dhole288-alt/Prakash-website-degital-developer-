import React, { useState } from 'react';
import { Phone, MessageSquare, Sparkles, LayoutDashboard, Menu, X, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenQuestionnaire: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  totalLeadsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuestionnaire,
  onOpenAdmin,
  isAdminLoggedIn,
  activeView,
  setActiveView,
  totalLeadsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'featured-solutions', label: 'App & Software' },
    { id: 'services', label: 'Services' },
    { id: 'ai-solutions', label: 'AI Solutions' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'clients', label: 'Clients' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveView('public');
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Bar for Contact Details */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-6 lg:px-8 text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <a href="tel:+918055239255" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">+91 8055239255</span>
          </a>
          <a href="mailto:prakashdhole965@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>prakashdhole965@gmail.com</span>
          </a>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Nashik, Maharashtra, India</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/918055239255?text=Hello%20Prakash%20Graphic%20Designer%2C%20I%20need%20a%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
          </a>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-400" /> 100% SSL & Spam Protected
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <BrandLogo 
          size="md"
          showTagline={true}
          showBadge={true}
          onClick={() => {
            setActiveView('public');
            setActiveTab('home');
          }}
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`hover:text-white transition-colors relative py-1 ${
                activeTab === item.id && activeView === 'public'
                  ? 'text-blue-400 font-bold'
                  : ''
              }`}
            >
              {item.label}
              {activeTab === item.id && activeView === 'public' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenQuestionnaire}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Request Quote</span>
          </button>

          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                setActiveView(activeView === 'admin' ? 'public' : 'admin');
              } else {
                onOpenAdmin();
              }
            }}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-slate-700 transition-colors relative cursor-pointer"
            title="Private Admin CRM"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>
              {isAdminLoggedIn ? (activeView === 'admin' ? 'View Site' : 'CRM Panel') : 'Admin Portal'}
            </span>
            {totalLeadsCount > 0 && (
              <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {totalLeadsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                setActiveView(activeView === 'admin' ? 'public' : 'admin');
              } else {
                onOpenAdmin();
              }
            }}
            className="p-2 text-slate-300 hover:text-white"
            title="Admin CRM"
          >
            <LayoutDashboard className="w-5 h-5 text-emerald-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ${
                  activeTab === item.id ? 'bg-blue-600/20 text-blue-400 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuestionnaire();
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3 rounded-xl text-center text-sm shadow-lg shadow-orange-500/20"
            >
              Request Free Quote
            </button>
            <div className="flex justify-between items-center text-xs text-slate-400 px-1 pt-1">
              <span>Call: +91 8055239255</span>
              <span>Location: Nashik</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
