import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Flame, Clock, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DishItem } from '../types';

interface HeroSectionProps {
  featuredDishes: DishItem[];
  onExploreMenu: () => void;
  onOpenThaliBuilder: () => void;
  onAddToCart: (dish: DishItem, spiceLevel?: number) => void;
  onOpenDishModal: (dish: DishItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredDishes,
  onExploreMenu,
  onOpenThaliBuilder,
  onAddToCart,
  onOpenDishModal,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [customSpice, setCustomSpice] = useState(2);
  const [justAdded, setJustAdded] = useState(false);

  const currentDish = featuredDishes[activeIdx] || featuredDishes[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featuredDishes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredDishes.length]);

  const handleQuickAdd = () => {
    onAddToCart(currentDish, customSpice);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const getClayBgClass = (theme: string) => {
    switch (theme) {
      case 'lavender':
        return 'clay-card-lavender';
      case 'mint':
        return 'clay-card-mint';
      case 'blue':
        return 'clay-card-blue';
      case 'yellow':
        return 'clay-card-yellow';
      case 'peach':
      default:
        return 'clay-card-peach';
    }
  };

  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Brand Hero Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          
          {/* Eyebrow Clay Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-chip-coral text-xs sm:text-sm font-bold tracking-wide">
            <Flame className="w-4 h-4 text-white animate-pulse" />
            <span>Manamadurai Cured Claypot Hearth • Ancient Tamil Heritage Recipes</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111d23] leading-[1.2]">
              Pure Claypot Hearth. <br />
              <span className="text-[#ac3509] drop-shadow-sm">SAM's Traditional Food</span>
            </h1>
            <p className="text-base sm:text-lg text-[#59413a] leading-relaxed max-w-2xl font-medium pt-2">
              Step back into centuries of authentic culinary wisdom. Experience slow-simmered curries in seasoned earthenware, wood-fired Seeraga Samba dum biryani, stone-ground masalas, and grand 12-course banana leaf thali feasts.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2">
            <div className="p-3 sm:p-4 rounded-2xl clay-surface text-center sm:text-left">
              <div className="w-8 h-8 rounded-xl bg-[#ffede7] text-[#ff7043] flex items-center justify-center font-bold text-sm mb-1.5 mx-auto sm:mx-0">
                🏺
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111d23]">Cured Claypots</p>
              <p className="text-[11px] text-[#59413a] hidden sm:block">Alkaline health balance</p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl clay-surface text-center sm:text-left">
              <div className="w-8 h-8 rounded-xl bg-[#e5f7ee] text-[#2ea06c] flex items-center justify-center font-bold text-sm mb-1.5 mx-auto sm:mx-0">
                100%
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111d23]">Cold-Pressed Oils</p>
              <p className="text-[11px] text-[#59413a] hidden sm:block">Virgin sesame & A2 ghee</p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl clay-surface text-center sm:text-left">
              <div className="w-8 h-8 rounded-xl bg-[#fef8e2] text-[#795900] flex items-center justify-center font-bold text-sm mb-1.5 mx-auto sm:mx-0">
                🔥
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111d23]">Wood-Fired Dum</p>
              <p className="text-[11px] text-[#59413a] hidden sm:block">Fragrant Seeraga Samba</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={onExploreMenu}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl clay-btn-coral font-heading font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore Heritage Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenThaliBuilder}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl clay-btn-mustard font-heading font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#523c00]" />
              <span>Customize Banana Leaf Thali</span>
            </button>
          </div>

          {/* Live Kitchen Status Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full clay-surface-subtle border border-[#cfdce4]/60 text-xs font-semibold text-[#111d23]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>Hearth Update: Dindigul Seeraga Samba Dum Biryani & Claypot Fish Curry simmering fresh!</span>
          </div>

        </div>

        {/* Right Column: 3D Interactive Clay Dish Showcase Card */}
        <div className="lg:col-span-5 relative">
          
          {/* Subtle Ambient Ring */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff7043]/15 via-[#fec330]/15 to-[#b80f55]/10 rounded-[3rem] blur-2xl -z-10" />

          {/* Active Featured Dish Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDish.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`p-6 sm:p-8 rounded-[2.5rem] ${getClayBgClass(
                currentDish.clayColorTheme
              )} border border-white/80 relative overflow-hidden`}
            >
              {/* Dish Badges Top Row */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold clay-chip-coral uppercase tracking-wider">
                  {currentDish.tags[0] || 'Chef Special'}
                </span>
                <span className="text-xs font-semibold text-[#59413a] flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#ac3509]" />
                  <span>{currentDish.cookTimeMinutes} mins</span>
                </span>
              </div>

              {/* Floating Food Imagery with 3D Drop Shadow */}
              <div
                onClick={() => onOpenDishModal(currentDish)}
                className="relative my-4 group cursor-pointer"
              >
                <div className="w-full h-56 sm:h-64 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white/90">
                  <img
                    src={currentDish.imageUrl}
                    alt={currentDish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-medium opacity-90 block">Traditional Vessel:</span>
                    <span className="text-xs font-bold tracking-wide">{currentDish.clayVesselType}</span>
                  </div>
                </div>
              </div>

              {/* Dish Title */}
              <div className="space-y-1 text-left mt-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111d23] leading-tight">
                      {currentDish.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-heading text-2xl font-extrabold text-[#ac3509]">
                      ₹{currentDish.price}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#59413a] line-clamp-2 pt-1 leading-relaxed">
                  {currentDish.longDescription || currentDish.description}
                </p>
              </div>

              {/* Interactive Spice Level Selector */}
              <div className="my-4 pt-3 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#ff7043]" />
                  <span className="text-xs font-bold text-[#111d23]">Spice Level:</span>
                </div>
                <div className="flex gap-1.5">
                  {[
                    { lvl: 1, label: 'Mild' },
                    { lvl: 2, label: 'Medium' },
                    { lvl: 3, label: 'Spicy' },
                    { lvl: 4, label: 'Fiery' },
                  ].map((s) => (
                    <button
                      key={s.lvl}
                      onClick={() => setCustomSpice(s.lvl)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        customSpice === s.lvl
                          ? 'clay-btn-coral text-white scale-105'
                          : 'bg-white/80 text-[#59413a] hover:bg-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleQuickAdd}
                  className={`flex-1 py-3 px-4 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 cursor-pointer ${
                    justAdded ? 'clay-btn-mustard' : 'clay-btn-coral'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#523c00]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart • ₹{currentDish.price}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenDishModal(currentDish)}
                  className="py-3 px-4 rounded-xl clay-btn-neutral font-heading font-bold text-xs sm:text-sm cursor-pointer"
                >
                  Details
                </button>
              </div>

              {/* Slider Dots Indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-1">
                {featuredDishes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIdx === i ? 'w-6 bg-[#ff7043]' : 'w-2 bg-[#111d23]/20 hover:bg-[#111d23]/40'
                    }`}
                    aria-label={`View dish ${i + 1}`}
                  />
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

