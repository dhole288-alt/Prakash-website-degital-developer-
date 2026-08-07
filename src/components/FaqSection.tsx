import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does it take to design and launch a complete business website?',
      a: 'Starter business websites are usually designed and launched in 3 to 5 working days. E-commerce portals and larger hospital or school websites take approximately 7 to 14 days depending on custom feature requirements.'
    },
    {
      q: 'Do you provide Domain Name & Web Hosting setup in Nashik?',
      a: 'Yes, absolutely! We handle complete domain registration (.com, .in, .org, .edu.in), setup high-speed NVMe SSD hosting, configure business emails (info@yourdomain.com), and install free SSL certificates.'
    },
    {
      q: 'Will my website work smoothly on Mobile Phones and Tablets?',
      a: 'Yes, 100%. Every website created by Prakash Graphic Designer is engineered with fluid mobile-first responsive design, fast image compression, and touch-optimized buttons for WhatsApp and direct calls.'
    },
    {
      q: 'Can I update content, images, and prices on my website later?',
      a: 'Yes! We provide an easy-to-use admin panel / CMS where you can add photos, update prices, upload blogs, or modify contact information without any technical or coding knowledge.'
    },
    {
      q: 'Is Search Engine Optimization (SEO) included in website packages?',
      a: 'Yes! All our website packages include foundational On-Page SEO (meta titles, description tags, sitemap submission, Google Indexing, and Google Business Profile setup).'
    },
    {
      q: 'How do enquiries from the website reach me?',
      a: 'Every enquiry automatically routes to our private Lead CRM, triggers an instant SMS/Email alert to your phone (+91 8055239252), and gives the customer an instant WhatsApp chat link.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about getting your website designed by Prakash Graphic Designer in Nashik.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
