import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/supplementary';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);
  const [activeFilter, setActiveFilter] = useState<'all' | 'clay' | 'menu' | 'delivery' | 'dining'>('all');

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeFilter === 'all') return true;
    return faq.category === activeFilter;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-chip-coral text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111d23]">
          Everything About Earthenware Dining
        </h2>
        <p className="text-sm sm:text-base text-[#59413a]">
          Learn about our natural terracotta seasoning, firewood kitchens, zero-plastic packaging, and table reservations.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'clay', label: '🏺 Claypot Science' },
          { id: 'menu', label: '🌿 Heritage Menu & Spices' },
          { id: 'delivery', label: '📦 Zero-Plastic Packaging' },
          { id: 'dining', label: '🪑 Table Reservations' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'clay-btn-coral scale-105'
                : 'clay-btn-neutral text-[#59413a]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;

          return (
            <div
              key={faq.id}
              data-open={isOpen}
              className="clay-accordion-item rounded-3xl overflow-hidden border border-white/80 transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-heading font-bold text-base sm:text-lg text-[#111d23] leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'clay-btn-coral rotate-180 text-white' : 'clay-btn-neutral text-[#59413a]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-1 text-xs sm:text-sm text-[#59413a] leading-relaxed border-t border-black/5">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

