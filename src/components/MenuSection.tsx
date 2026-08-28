import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Sparkles, Leaf, Clock, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { DishItem } from '../types';

interface MenuSectionProps {
  dishes: DishItem[];
  onAddToCart: (dish: DishItem, spiceLevel?: number) => void;
  onOpenDishModal: (dish: DishItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  dishes,
  onAddToCart,
  onOpenDishModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'nonveg' | 'chef'>('all');
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState<number | null>(null);
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Heritage Dishes' },
    { id: 'curries', label: 'Claypot Curries' },
    { id: 'biryani', label: 'Seeraga Samba Biryani' },
    { id: 'starters', label: 'Ancient Starters & Millets' },
    { id: 'thali', label: 'Banana Leaf Thali' },
    { id: 'desserts', label: 'Royal Sweets & Elixirs' },
  ];

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category Match
      if (activeCategory !== 'all' && dish.category !== activeCategory) {
        return false;
      }
      // Search Query
      if (
        searchQuery &&
        !dish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !dish.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !dish.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !dish.isVegetarian) return false;
      if (dietaryFilter === 'nonveg' && dish.isVegetarian) return false;
      if (dietaryFilter === 'chef' && !dish.isChefSpecial) return false;

      // Spice filter
      if (selectedSpiceFilter !== null && dish.spiceLevel !== selectedSpiceFilter) {
        return false;
      }

      return true;
    });
  }, [dishes, activeCategory, searchQuery, dietaryFilter, selectedSpiceFilter]);

  const handleAdd = (dish: DishItem) => {
    onAddToCart(dish);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  const getClayCardClass = (theme: string) => {
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
    <section id="menu" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-chip-coral text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tamil Old Traditional Culinary Heritage</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111d23]">
          Authentic Heritage Menu
        </h2>
        <p className="text-sm sm:text-base text-[#59413a] leading-relaxed">
          Time-tested recipes from Chettinad, Madurai, Kongu Nadu, Tanjore, and ancient Sangam hearths, slow-cooked in artisanal cured earthenware.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="space-y-6 mb-12">
        {/* Category Pills Slider */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'clay-btn-coral scale-105 shadow-md'
                    : 'clay-btn-neutral hover:bg-[#e9f6fd] text-[#111d23]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/70 p-4 sm:p-5 rounded-3xl clay-surface-subtle border border-white/80">
          
          {/* Inset Molded Search Field */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8d7169] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search fish curry, Seeraga Samba biryani, Kambu koozh, mutton sukka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm clay-input font-medium placeholder:text-[#8d7169]/70 text-[#111d23]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8d7169] hover:text-[#111d23] font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Chips */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: '🌱 Pure Veg', icon: Leaf },
              { id: 'nonveg', label: '🍗 Non-Veg' },
              { id: 'chef', label: '★ Chef Special' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietaryFilter(diet.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dietaryFilter === diet.id
                    ? 'clay-btn-mustard scale-105'
                    : 'bg-white/80 text-[#59413a] hover:bg-white'
                }`}
              >
                {diet.label}
              </button>
            ))}

            {/* Spice Filter Dropdown/Reset */}
            <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-xl">
              <span className="text-[11px] font-bold text-[#8d7169] pl-1">Spice:</span>
              {[1, 2, 3, 4].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedSpiceFilter(selectedSpiceFilter === lvl ? null : lvl)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center transition-all cursor-pointer ${
                    selectedSpiceFilter === lvl
                      ? 'bg-[#ff7043] text-white'
                      : 'text-[#ac3509] hover:bg-[#ffede7]'
                  }`}
                  title={`Spice Level ${lvl}`}
                >
                  {lvl}🌶️
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Product Cards Grid - Rotating Pastel Clay Colors */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl clay-surface max-w-lg mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#ffede7] text-[#ff7043] flex items-center justify-center mx-auto text-2xl">
            🏺
          </div>
          <h3 className="font-heading text-xl font-bold text-[#111d23]">No Dishes Found</h3>
          <p className="text-xs sm:text-sm text-[#59413a]">
            Try adjusting your search keywords or dietary filters to explore our full heritage menu.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setDietaryFilter('all');
              setSelectedSpiceFilter(null);
            }}
            className="px-5 py-2.5 rounded-xl clay-btn-coral text-xs font-bold cursor-pointer"
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish, idx) => {
            const isAdded = addedItems[dish.id];

            return (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`p-6 sm:p-7 rounded-[2.25rem] ${getClayCardClass(
                  dish.clayColorTheme
                )} border border-white/80 flex flex-col justify-between group relative transition-transform duration-300 hover:-translate-y-1.5`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold clay-chip-coral">
                        {dish.tags[0] || 'Claypot'}
                      </span>
                      {dish.isVegetarian ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e5f7ee] text-[#1e7e4e] border border-[#2ea06c]/20">
                          🌱 Veg
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffede7] text-[#ac3509] border border-[#ff7043]/20">
                          🍗 Non-Veg
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-[#59413a] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#ac3509]" />
                      <span>{dish.cookTimeMinutes} mins</span>
                    </span>
                  </div>

                  {/* Floating Food Imagery with Soft Drop Shadow */}
                  <div
                    onClick={() => onOpenDishModal(dish)}
                    className="relative my-3 rounded-2xl overflow-hidden shadow-xl border-2 border-white/90 cursor-pointer h-48 sm:h-52"
                  >
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                    
                    {/* Floating Curing Vessel Tag */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-black/60 text-white backdrop-blur-sm truncate max-w-[170px]">
                        🏺 {dish.clayVesselType}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/90 text-[#111d23] shadow-sm">
                        {'🌶️'.repeat(dish.spiceLevel)}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1 text-left mt-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => onOpenDishModal(dish)}
                        className="font-heading text-lg sm:text-xl font-bold text-[#111d23] group-hover:text-[#ac3509] transition-colors cursor-pointer leading-snug"
                      >
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#59413a] line-clamp-2 pt-1 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Key Botanical Ingredients Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/60 text-[#59413a]"
                      >
                        • {ing}
                      </span>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/40 text-[#59413a]">
                        +{dish.ingredients.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Price & Action Buttons */}
                <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8d7169] block">Price</span>
                    <span className="font-heading text-xl font-extrabold text-[#ac3509]">
                      ₹{dish.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDishModal(dish)}
                      className="p-2.5 rounded-xl clay-btn-neutral text-[#111d23] hover:text-[#ac3509] cursor-pointer"
                      title="View Details"
                      aria-label="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                        isAdded ? 'clay-btn-mustard' : 'clay-btn-coral'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#523c00]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

    </section>
  );
};

