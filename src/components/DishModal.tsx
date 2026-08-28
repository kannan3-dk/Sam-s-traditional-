import React, { useState } from 'react';
import { X, Clock, Sparkles, Check, ShoppingBag, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DishItem } from '../types';

interface DishModalProps {
  dish: DishItem | null;
  onClose: () => void;
  onAddToCart: (dish: DishItem, spiceLevel: number, quantity: number, instructions: string, isClayPackaging: boolean) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onAddToCart }) => {
  if (!dish) return null;

  const [spiceLevel, setSpiceLevel] = useState<number>(dish.spiceLevel);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isClayPackaging] = useState<boolean>(true);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(dish, spiceLevel, quantity, specialInstructions, isClayPackaging);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const getClayBg = (theme: string) => {
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className={`w-full max-w-2xl rounded-[2.5rem] ${getClayBg(
            dish.clayColorTheme
          )} p-6 sm:p-8 border-2 border-white shadow-2xl relative max-h-[90vh] overflow-y-auto`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-2xl clay-btn-neutral flex items-center justify-center text-[#111d23] hover:text-[#ac3509] cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Image Header */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white mb-6 h-56 sm:h-64">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block opacity-90">
                  Earthen Cookware
                </span>
                <span className="text-sm font-black">🏺 {dish.clayVesselType}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ff7043] text-white shadow-md">
                ₹{dish.price}
              </span>
            </div>
          </div>

          {/* Header Info */}
          <div className="space-y-1 text-left mb-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold clay-chip-coral">
                {dish.tags[0]}
              </span>
              {dish.isVegetarian ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e5f7ee] text-[#1e7e4e]">
                  🌱 Pure Vegetarian
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ffede7] text-[#ac3509]">
                  🍗 Non-Vegetarian
                </span>
              )}
              {dish.isGlutenFree && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/80 text-[#59413a]">
                  🌾 Gluten Free (GF)
                </span>
              )}
              <span className="text-xs font-semibold text-[#59413a] flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5 text-[#ac3509]" />
                <span>{dish.cookTimeMinutes} mins</span>
              </span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111d23]">{dish.name}</h3>
            <p className="text-xs font-medium text-[#ac3509] uppercase tracking-wider">Traditional Heritage Recipe</p>
          </div>

          {/* Long Description */}
          <div className="bg-white/80 p-4 rounded-2xl clay-surface text-left space-y-2 mb-4">
            <p className="text-xs sm:text-sm text-[#59413a] leading-relaxed">
              {dish.longDescription}
            </p>
            {dish.pairingNotes && (
              <div className="pt-2 border-t border-black/5 flex items-start gap-2 text-xs font-medium text-[#795900]">
                <Sparkles className="w-4 h-4 text-[#fec330] shrink-0 mt-0.5" />
                <span><strong>Chef's Recommended Pairing:</strong> {dish.pairingNotes}</span>
              </div>
            )}
          </div>

          {/* Ingredients Breakdown */}
          <div className="text-left space-y-2 mb-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#111d23]">
              Authentic Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-white/90 text-xs font-medium text-[#111d23] shadow-sm"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens warning */}
          {dish.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-[#8d7169] bg-white/50 px-3 py-2 rounded-xl mb-4 text-left">
              <ShieldAlert className="w-4 h-4 text-[#b80f55] shrink-0" />
              <span>Allergen Notice: Contains {dish.allergens.join(', ')}</span>
            </div>
          )}

          {/* Spice Selector & Special Instructions */}
          <div className="bg-white/90 p-4 rounded-2xl clay-surface space-y-4 mb-4 text-left">
            <div>
              <label className="text-xs font-bold text-[#111d23] block mb-1.5">
                Customize Spice Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { lvl: 1, name: 'Mild', sub: 'Gentle Pepper' },
                  { lvl: 2, name: 'Medium', sub: 'Balanced Classic' },
                  { lvl: 3, name: 'Chettinad', sub: 'Spiced Black Pepper' },
                  { lvl: 4, name: 'Madurai', sub: 'Extra Fiery' },
                ].map((s) => (
                  <button
                    key={s.lvl}
                    type="button"
                    onClick={() => setSpiceLevel(s.lvl)}
                    className={`p-2 rounded-xl text-center cursor-pointer transition-all ${
                      spiceLevel === s.lvl
                        ? 'clay-btn-coral'
                        : 'bg-[#f4faff] hover:bg-[#e9f6fd] text-[#59413a]'
                    }`}
                  >
                    <span className="block text-xs font-bold">{s.name}</span>
                    <span className="text-[9px] opacity-80">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="text-xs font-bold text-[#111d23] block mb-1">
                Kitchen Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra curry leaves, less salt, packing for travel..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 rounded-xl clay-input text-xs text-[#111d23]"
              />
            </div>
          </div>

          {/* Quantity & Add Action */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl clay-input">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl clay-btn-neutral font-bold text-base flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="font-heading font-extrabold text-sm px-2 text-[#111d23]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl clay-btn-neutral font-bold text-base flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-4 px-6 rounded-2xl font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                added ? 'clay-btn-mustard' : 'clay-btn-coral'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 text-[#523c00]" />
                  <span>Added to Banana Leaf Basket!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Order • ₹{dish.price * quantity}</span>
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

