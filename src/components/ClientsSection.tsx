import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Building, CheckCircle2 } from 'lucide-react';

export const ClientsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const esteemedClients = [
    { name: 'Dr. MyCare Clinic', tag: 'Healthcare', icon: '🏥' },
    { name: 'Siddhivinayak Lab', tag: 'Diagnostics', icon: '🧪' },
    { name: 'Unity Homeopathy', tag: 'Medical Center', icon: '⚕️' },
    { name: 'Jagtap Catering', tag: 'Hospitality', icon: '🍽️' },
    { name: 'Sellquick ERP', tag: 'Retail Tech', icon: '🛍️' },
    { name: 'Just Checkin', tag: 'Hotel Engine', icon: '🏨' },
    { name: 'LETSWRK Spaces', tag: 'Coworking', icon: '🏢' },
    { name: 'Cyclist Foundation', tag: 'NGO & Sports', icon: '🚴' },
    { name: 'Shinde Hospital', tag: 'Multispeciality', icon: '🏥' },
    { name: 'Apex Education', tag: 'School Portal', icon: '🎓' }
  ];

  const testimonials = [
    {
      name: 'Kunal Joshi',
      role: 'Founder & CEO, TechSurya / Jagtap Group',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'From day one, Prakash Graphic Designer was focused on delivering the best results for our website & web app. Their support and maintenance services have been excellent, ensuring our app runs smoothly 24/7.'
    },
    {
      name: 'Dr. Rajesh Mehta',
      role: 'Director, Mehta Speciality Hospital',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'Our hospital website and online appointment booking engine designed by Prakash Dhole transformed our patient OPD workflow. Patient inquiries increased by 200% within the first month!'
    },
    {
      name: 'Priya Deshmukh',
      role: 'Owner, Spice & Curry Restaurant Nashik',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'The QR digital menu and direct WhatsApp ordering system created for our restaurant in Nashik is outstanding. Super fast loading speed and sleek modern aesthetic!'
    }
  ];

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800 relative overflow-hidden" id="clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Trusted By 300+ Businesses
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Our <span className="text-blue-400">Esteemed Clients</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We partner with leading healthcare institutions, schools, retail brands, hospitality groups, and enterprises in Nashik & across Maharashtra.
          </p>
        </div>

        {/* Horizontal Scrolling / Grid Client Badges Carousel (Video 0:52 - 1:07) */}
        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {esteemedClients.map((client, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center hover:border-blue-500/50 hover:bg-slate-900/90 transition-all group flex flex-col items-center justify-center space-y-2 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {client.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-blue-400 transition-colors">
                    {client.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium block">{client.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Quote Slider Card (Exact layout matching video 1:08) */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 relative shadow-2xl">
            
            <Quote className="w-12 h-12 text-blue-500/20 absolute top-6 left-6 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal italic">
                "{testimonials[activeTestimonial].text}"
              </p>

              {/* Author Row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>

                {/* Slider Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
