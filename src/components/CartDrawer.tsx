import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderStage, setOrderStage] = useState<number>(1);
  const [isClayVesselPreserved, setIsClayVesselPreserved] = useState(true);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const packagingFee = isClayVesselPreserved ? 30 : 0;
  const deliveryFee = deliveryMode === 'delivery' ? 40 : 0;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxes = Math.round(taxableAmount * 0.05); // 5% GST on Restaurant food
  const tipAmount = Math.round((taxableAmount * tipPercent) / 100);
  const grandTotal = Math.max(0, taxableAmount + packagingFee + deliveryFee + taxes + tipAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'HERITAGE15' || code === 'CLAY15' || code === 'TAMIL15') {
      setAppliedDiscount(15);
      setPromoMessage('✨ 15% Heritage discount applied!');
    } else if (code === 'CHETTINAD' || code === 'MADURAI') {
      setAppliedDiscount(10);
      setPromoMessage('🔥 10% Traditional Feast discount applied!');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid coupon. Try "HERITAGE15" for 15% off.');
    }
  };

  const handleSimulateOrder = () => {
    setIsCheckingOut(true);
    setOrderStage(1);

    // Simulate order progress stages
    setTimeout(() => setOrderStage(2), 2000);
    setTimeout(() => setOrderStage(3), 4500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
        {/* Click outside backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Slide-over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#f4faff] h-full flex flex-col justify-between shadow-2xl border-l border-white/60 z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#cfdce4] bg-white/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl clay-btn-coral flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#111d23]">Your Order Basket</h3>
                <p className="text-xs text-[#59413a]">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl clay-btn-neutral text-[#111d23] hover:text-[#ac3509] cursor-pointer"
              aria-label="Close basket"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* Delivery / Pickup Toggle */}
            <div className="p-1 rounded-2xl clay-surface-subtle flex items-center gap-1">
              <button
                onClick={() => setDeliveryMode('delivery')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  deliveryMode === 'delivery'
                    ? 'clay-btn-coral'
                    : 'text-[#59413a] hover:text-[#111d23]'
                }`}
              >
                🚚 Express Delivery (30m)
              </button>
              <button
                onClick={() => setDeliveryMode('pickup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  deliveryMode === 'pickup'
                    ? 'clay-btn-coral'
                    : 'text-[#59413a] hover:text-[#111d23]'
                }`}
              >
                🏺 Hot Claypot Takeaway (15m)
              </button>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#ffede7] text-[#ff7043] flex items-center justify-center mx-auto text-2xl">
                  🍲
                </div>
                <h4 className="font-heading font-bold text-base text-[#111d23]">Your Basket is Empty</h4>
                <p className="text-xs text-[#59413a] max-w-xs mx-auto">
                  Explore our authentic slow-cooked Tamil curries, biryanis, and customizable banana leaf feast thalis.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl clay-btn-coral text-xs font-bold cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 rounded-2xl clay-surface flex items-center gap-3 border border-white/80"
                  >
                    <img
                      src={item.dish.imageUrl}
                      alt={item.dish.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-[#111d23] truncate">
                          {item.dish.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-[#8d7169] hover:text-[#ba1a1a] p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.thaliDetails ? (
                        <p className="text-[10px] text-[#ac3509] font-medium truncate">
                          Base: {item.thaliDetails.base} • Mains: {item.thaliDetails.mains.join(', ')}
                        </p>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-[#59413a]">
                          <span>Spice: {'🌶️'.repeat(item.selectedSpiceLevel)}</span>
                          {item.isClayPotPackaging && <span>• 🏺 Terracotta Sealed</span>}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-heading font-extrabold text-xs text-[#ac3509]">
                          ₹{item.dish.price * item.quantity}
                        </span>

                        <div className="flex items-center gap-2 px-2 py-0.5 rounded-lg clay-input">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-white flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-white flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clay Vessel Packaging Option */}
                <div className="p-3.5 rounded-2xl bg-[#ffede7] border border-[#ff7043]/30 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#ac3509] flex items-center gap-1">
                      <span>🏺 Authentic Terracotta Pot Delivery (+₹30)</span>
                    </span>
                    <p className="text-[11px] text-[#59413a] leading-tight mt-0.5">
                      Return claypots on your next order to earn ₹50 eco-dining wallet credits!
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isClayVesselPreserved}
                    onChange={(e) => setIsClayVesselPreserved(e.target.checked)}
                    className="w-5 h-5 accent-[#ff7043] rounded cursor-pointer mt-1"
                  />
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (HERITAGE15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs uppercase font-bold clay-input"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl clay-btn-neutral font-heading font-bold text-xs cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className="text-xs font-semibold text-[#ac3509]">{promoMessage}</p>
                )}

                {/* Tip Selector */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111d23]">
                    <span>Rider Appreciation Tip:</span>
                    <span>₹{tipAmount}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[5, 10, 15, 0].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTipPercent(t)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          tipPercent === t
                            ? 'clay-btn-coral'
                            : 'bg-white text-[#59413a] hover:bg-[#e9f6fd]'
                        }`}
                      >
                        {t === 0 ? 'None' : `${t}%`}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer & Checkout Total */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#cfdce4] bg-white/90 space-y-3">
              <div className="space-y-1.5 text-xs text-[#59413a]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#111d23]">₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#ac3509] font-bold">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                {isClayVesselPreserved && (
                  <div className="flex justify-between">
                    <span>Terracotta Pot Packaging</span>
                    <span className="font-bold text-[#111d23]">₹{packagingFee}</span>
                  </div>
                )}
                {deliveryMode === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-[#111d23]">₹{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Restaurant GST (5%)</span>
                  <span className="font-bold text-[#111d23]">₹{taxes}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#111d23] pt-1.5 border-t border-black/5">
                  <span className="font-heading text-base">Grand Total</span>
                  <span className="font-heading text-lg text-[#ac3509]">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSimulateOrder}
                className="w-full py-3.5 sm:py-4 rounded-2xl clay-btn-coral font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Place Order • ₹{grandTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>

        {/* Live Order Tracker Modal */}
        <AnimatePresence>
          {isCheckingOut && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg rounded-[2.5rem] clay-card-yellow p-6 sm:p-8 border-2 border-white text-center space-y-6 shadow-2xl relative"
              >
                <div className="w-16 h-16 rounded-full bg-[#ff7043] text-white flex items-center justify-center mx-auto text-2xl shadow-xl animate-bounce">
                  🏺
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#795900] uppercase tracking-widest">
                    Order #SAM-89240 In Preparation
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#111d23]">
                    Your Claypot Feast is Cooking!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59413a]">
                    Total Paid: <strong>₹{grandTotal}</strong> (Google Pay / UPI / Card)
                  </p>
                </div>

                {/* Progress Tracker Steps */}
                <div className="space-y-3 text-left">
                  <div
                    className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                      orderStage >= 1
                        ? 'bg-[#e5f7ee] border-2 border-[#2ea06c]'
                        : 'bg-white/60 opacity-60'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#2ea06c] text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#111d23]">1. Heritage Chef Accepted Order</p>
                      <p className="text-[10px] text-[#59413a]">Hand-grinding fresh spices on granite stone</p>
                    </div>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                      orderStage >= 2
                        ? 'bg-[#e5f7ee] border-2 border-[#2ea06c]'
                        : 'bg-white/60 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        orderStage >= 2 ? 'bg-[#2ea06c] text-white' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {orderStage >= 2 ? '✓' : '2'}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#111d23]">2. Simmering in Claypots on Firewood Hearth</p>
                      <p className="text-[10px] text-[#59413a]">Slow-cooking with cold-pressed gingelly oil</p>
                    </div>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                      orderStage >= 3
                        ? 'bg-[#e5f7ee] border-2 border-[#2ea06c]'
                        : 'bg-white/60 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        orderStage >= 3 ? 'bg-[#2ea06c] text-white' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {orderStage >= 3 ? '✓' : '3'}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#111d23]">3. Claypot Sealed & Dispatched for Delivery</p>
                      <p className="text-[10px] text-[#59413a]">Arriving hot at your doorstep in ~25 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCheckingOut(false);
                      onClearCart();
                      onClose();
                    }}
                    className="px-6 py-3 rounded-xl clay-btn-coral text-xs font-bold cursor-pointer"
                  >
                    Back to Menu
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
};

