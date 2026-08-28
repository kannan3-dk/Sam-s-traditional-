import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Utensils, Sparkles, Menu, X, Heart, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenThaliBuilder: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenThaliBuilder,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Heritage Menu', icon: Utensils },
    { id: 'thali-builder', label: 'Banana Leaf Thali', icon: Sparkles, highlight: true },
    { id: 'craft-story', label: 'Claypot Science', icon: Flame },
    { id: 'reviews', label: 'Reviews', icon: Heart },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 transition-all duration-300 pointer-events-none flex justify-center`}
      >
        <div
          className={`pointer-events-auto w-full max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between clay-floating-nav ${
            isScrolled ? 'shadow-2xl border border-white/60' : 'border border-white/40'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl clay-btn-coral flex items-center justify-center text-white shrink-0 shadow-md">
              <span className="font-bold text-sm sm:text-base font-heading">SAM</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-base sm:text-lg text-[#111d23] tracking-tight group-hover:text-[#ff7043] transition-colors">
                  SAM's Traditional Food
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#fec330] text-[#523c00] clay-chip-mustard">
                  Claypot Cuisine
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#59413a] tracking-wide hidden sm:block">
                Ancient Tamil Heritage Dining
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'thali-builder') {
                      onOpenThaliBuilder();
                    } else {
                      onNavigate(link.id);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    link.highlight
                      ? 'bg-[#ffede7] text-[#ac3509] hover:bg-[#ff7043] hover:text-white shadow-sm'
                      : isActive
                      ? 'bg-[#111d23] text-white shadow-sm'
                      : 'text-[#111d23] hover:bg-[#e9f6fd] hover:text-[#ac3509]'
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold clay-btn-neutral cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#ac3509]" />
              <span>Book a Table</span>
            </button>

            {/* Cart Button with Clay Molded Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl clay-btn-coral flex items-center gap-2 cursor-pointer focus:outline-none"
              aria-label="Feast Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-[#fec330] text-[#523c00] text-xs font-black flex items-center justify-center shadow-md -ml-0.5"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl clay-btn-neutral text-[#111d23] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-30 lg:hidden p-5 rounded-3xl clay-surface border border-white/80 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.id === 'thali-builder') {
                      onOpenThaliBuilder();
                    } else {
                      onNavigate(link.id);
                    }
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-[#111d23] hover:bg-[#e9f6fd] flex items-center gap-3 transition-colors"
                >
                  {link.icon && <link.icon className="w-4 h-4 text-[#ff7043]" />}
                  <span>{link.label}</span>
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-[#cfdce4] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-3 rounded-xl clay-btn-mustard font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Claypot Feast Table</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

