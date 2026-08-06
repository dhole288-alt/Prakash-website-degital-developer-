import React, { useState } from 'react';
import { ExternalLink, Sparkles, Filter, CheckCircle, Eye } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenQuestionnaire: (serviceName?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenQuestionnaire }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  const portfolioProjects = [
    {
      title: 'Mehta Super Speciality Hospital',
      category: 'Hospital Website',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      description: 'Patient appointment scheduling system, doctor directory, OPD timing chart, and emergency call launcher.',
      tech: ['React', 'Tailwind', 'Appointment CRM', 'WhatsApp Alert'],
      location: 'Nashik, Maharashtra'
    },
    {
      title: 'Apex International School',
      category: 'School Website',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive educational portal with online admission forms, annual events gallery, and circulars download.',
      tech: ['React', 'Node.js', 'PDF Downloads', 'GMB SEO'],
      location: 'Pune, Maharashtra'
    },
    {
      title: 'Spice & Curry Fine Dining',
      category: 'Restaurant Website',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'Interactive digital QR menu, table reservation engine, and direct WhatsApp takeaway ordering system.',
      tech: ['QR Menu', 'Table Booking', 'WhatsApp Direct', 'SEO'],
      location: 'Mumbai, Maharashtra'
    },
    {
      title: 'Sharma Global B2B Traders',
      category: 'E-commerce Website',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
      description: 'B2B & retail e-commerce platform with Razorpay checkout, live inventory management, and multi-currency support.',
      tech: ['E-Commerce', 'Razorpay Gateway', 'Inventory Sync', 'SSL'],
      location: 'Nashik, Maharashtra'
    },
    {
      title: 'Royal Heritage Resort & Spa',
      category: 'Hotel Website',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury hotel booking enquiry portal featuring room virtual tours, amenities catalog, and rate calculator.',
      tech: ['Virtual Tour', 'Room Booking', 'Rate Calculator', 'SEO'],
      location: 'Udaipur, Rajasthan'
    },
    {
      title: 'Patil Industrial Machinery',
      category: 'Company Website',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      description: 'Corporate B2B website with product spec catalog, quotation request engine, and multi-language support.',
      tech: ['Corporate UI', 'RFQs Engine', 'Cloud Backend', 'Analytics'],
      location: 'Nashik, Maharashtra'
    }
  ];

  const filters = ['All', 'Hospital Website', 'School Website', 'Restaurant Website', 'E-commerce Website', 'Hotel Website', 'Company Website'];

  const filteredProjects = selectedFilter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedFilter);

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Prakash Graphic Designer • Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured Web Projects & Success Stories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore a selection of recent websites developed for businesses in Nashik, Maharashtra, and across India.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-full border border-slate-700">
                    {item.location}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tech.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Project Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Modal Preview */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 relative text-slate-100 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{previewItem.category}</span>
                <h3 className="text-xl font-extrabold text-white">{previewItem.title}</h3>
                <p className="text-xs text-slate-400">{previewItem.location}</p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <img
              src={previewItem.image}
              alt={previewItem.title}
              className="w-full h-44 object-cover rounded-xl border border-slate-800"
            />

            <p className="text-slate-300 text-xs leading-relaxed">
              {previewItem.description}
            </p>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-white block">Technologies & Modules:</span>
              <div className="flex flex-wrap gap-1.5">
                {previewItem.tech.map((t: string, i: number) => (
                  <span key={i} className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => {
                  setPreviewItem(null);
                  onOpenQuestionnaire(previewItem.category);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
              >
                Get Similar Website Quote
              </button>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
