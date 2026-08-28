import React, { useState } from 'react';
import { Flame, Sparkles, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export const ClayCraftStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'science' | 'curing' | 'sustainability'>('science');

  const storySteps = [
    {
      step: '01',
      title: 'Riverbank Clay Sourcing',
      desc: '100% natural, unadulterated terracotta sourced directly from the Vaigai and Thamirabarani riverbeds.',
      icon: '🌿',
      theme: 'clay-card-mint',
    },
    {
      step: '02',
      title: 'Manamadurai Pottery Guilds',
      desc: 'Hand-thrown on traditional wooden wheels by generational master artisans preserving centuries of craftsmanship.',
      icon: '🏺',
      theme: 'clay-card-peach',
    },
    {
      step: '03',
      title: '5-Day Rice Starch Curing',
      desc: 'Seasoned naturally with fermented organic rice starch, cold-pressed sesame oil, and organic turmeric.',
      icon: '✨',
      theme: 'clay-card-yellow',
    },
    {
      step: '04',
      title: 'Firewood Kiln Baking',
      desc: 'Fired at 800°C in woodsmoke kilns, preserving essential minerals and micro-porosity for slow, even cooking.',
      icon: '🔥',
      theme: 'clay-card-lavender',
    },
  ];

  return (
    <section id="craft-story" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-chip-berry text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>The Ancient Cooking Philosophy</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111d23]">
          The Science of Earthenware Cooking
        </h2>
        <p className="text-sm sm:text-base text-[#59413a]">
          Discover why slow simmering in unglazed claypots retains full nutrition, elevates natural aroma, and balances acidity naturally.
        </p>
      </div>

      {/* 4-Step Craft Journey Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {storySteps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 sm:p-7 rounded-3xl ${step.theme} border border-white/80 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center text-xl shadow-sm">
                  {step.icon}
                </span>
                <span className="font-heading font-black text-2xl text-[#111d23]/20">{step.step}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#111d23] mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#59413a] leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deep-Dive Interactive Tab Panel */}
      <div className="rounded-[2.5rem] clay-surface p-6 sm:p-10 border border-white/90 shadow-xl">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {[
            { id: 'science', label: 'Alkaline Science & Health', icon: Sparkles },
            { id: 'curing', label: '5-Day Curing Ritual', icon: Flame },
            { id: 'sustainability', label: 'Zero-Plastic & ₹50 Clay Credit', icon: Leaf },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'clay-btn-coral scale-105'
                  : 'clay-btn-neutral text-[#59413a]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'science' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-4 text-left">
              <h3 className="font-heading text-2xl font-bold text-[#111d23]">
                Natural Alkaline Balance & Convection Heat
              </h3>
              <p className="text-sm text-[#59413a] leading-relaxed">
                Natural earthenware is naturally alkaline. It gently neutralizes the harsh acids in tamarind, tomato, curd, and rich spice blends, preventing acidity and enhancing complex flavors.
              </p>
              <p className="text-sm text-[#59413a] leading-relaxed">
                Millions of microscopic pores allow heat and steam to circulate uniformly without scorching. Grains like Seeraga Samba and meats simmer gently in their own flavorful juices.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffede7] text-[#ac3509]">
                  ✓ Acid-Neutralizing
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e5f7ee] text-[#1e7e4e]">
                  ✓ 100% Nutrient Retention
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fef8e2] text-[#795900]">
                  ✓ Gentle on Digestion
                </span>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                alt="Clay Pot Cooking"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}

        {activeTab === 'curing' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-4 text-left">
              <h3 className="font-heading text-2xl font-bold text-[#111d23]">
                Traditional 5-Day Seasoning Method
              </h3>
              <p className="text-sm text-[#59413a] leading-relaxed">
                Raw clay vessels cannot be used directly on flame. Every pot at SAM's undergoes a meticulous 5-day preparation:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#59413a]">
                <li className="flex items-start gap-2">
                  <span className="text-[#ac3509] font-bold">1.</span>
                  <span><strong>Purified Water Soaking:</strong> Submerged for 48 hours to release micro air pockets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ac3509] font-bold">2.</span>
                  <span><strong>Rice Starch Simmering:</strong> Slow heated with organic rice kanji water to seal pores with natural glassing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ac3509] font-bold">3.</span>
                  <span><strong>Sesame & Turmeric Rub:</strong> Hand-rubbed with cold-pressed sesame oil and wild turmeric before sun-curing.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Curing Process"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}

        {activeTab === 'sustainability' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-4 text-left">
              <h3 className="font-heading text-2xl font-bold text-[#111d23]">
                Zero Single-Use Plastics & ₹50 Clay Credit
              </h3>
              <p className="text-sm text-[#59413a] leading-relaxed">
                Hot food packed in single-use plastic leaches harmful polymers. At SAM's Traditional Food, even deliveries arrive packed in reusable, sanitized terracotta pots wrapped in organic banana leaves.
              </p>
              <div className="p-4 rounded-2xl bg-[#e5f7ee] border border-[#2ea06c]/30 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1e7e4e]">
                  <Leaf className="w-4 h-4" />
                  <span>₹50 "Green Clay Credit" Return Program</span>
                </div>
                <p className="text-xs text-[#59413a]">
                  Keep the claypots for your own kitchen or garden planters, or return them on your next order for an instant ₹50 credit applied directly to your bill!
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"
                alt="Zero Plastic Clay Pots"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

