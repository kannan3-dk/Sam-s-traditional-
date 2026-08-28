import React from 'react';
import { Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS } from '../data/supplementary';

export const ReviewsSection: React.FC = () => {
  const cardThemes = ['clay-card-peach', 'clay-card-lavender', 'clay-card-yellow'];

  return (
    <section id="reviews" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-chip-berry text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5" />
          <span>Guest Testimonials</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111d23]">
          Loved by Food Historians & Guests
        </h2>
        <p className="text-sm sm:text-base text-[#59413a]">
          Authentic impressions from culinary authors, families, and lovers of slow-cooked Tamil heritage dining.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((rev, idx) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-7 sm:p-8 rounded-[2.25rem] ${
              cardThemes[idx % cardThemes.length]
            } border border-white/80 flex flex-col justify-between relative`}
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#fec330] text-[#fec330]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-[#111d23] font-medium leading-relaxed mb-6 italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl ${rev.avatarBg} text-white font-heading font-extrabold flex items-center justify-center text-sm shadow-sm`}
                >
                  {rev.avatarInitial}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111d23]">{rev.author}</h4>
                  <p className="text-[11px] text-[#59413a]">{rev.role}</p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/70 text-[#ac3509] shadow-sm max-w-[140px] truncate">
                🏺 {rev.dishMention}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

