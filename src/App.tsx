import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ThaliBuilder } from './components/ThaliBuilder';
import { ClayCraftStory } from './components/ClayCraftStory';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { DISHES } from './data/dishes';
import { DishItem, CartItem, ReservationData } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartId: 'default-1',
      dish: DISHES[0], // Dindigul Thalappakatti Biryani
      quantity: 1,
      selectedSpiceLevel: 3,
      isClayPotPackaging: true,
    },
    {
      cartId: 'default-2',
      dish: DISHES[1], // Chettinad Nattu Kozhi
      quantity: 1,
      selectedSpiceLevel: 3,
      isClayPotPackaging: true,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState<DishItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (
    dish: DishItem,
    spiceLevel?: number,
    quantity: number = 1,
    instructions?: string,
    isClayPackaging: boolean = true
  ) => {
    const chosenSpice = spiceLevel !== undefined ? spiceLevel : dish.spiceLevel;
    const existingIndex = cartItems.findIndex(
      (item) => item.dish.id === dish.id && item.selectedSpiceLevel === chosenSpice && !item.isCustomThali
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${dish.id}-${Date.now()}`,
        dish,
        quantity,
        selectedSpiceLevel: chosenSpice,
        specialInstructions: instructions,
        isClayPotPackaging: isClayPackaging,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    triggerToast(`"${dish.name}" added to your basket!`);
  };

  const handleAddCustomThaliToCart = (thaliData: {
    name: string;
    price: number;
    calories: number;
    details: {
      base: string;
      mains: string[];
      starter: string;
      chutney: string;
      dessert: string;
    };
  }) => {
    const customDish: DishItem = {
      id: `custom-thali-${Date.now()}`,
      name: thaliData.name,
      category: 'thali',
      description: `Base: ${thaliData.details.base} | Curries: ${thaliData.details.mains.join(
        ', '
      )} | Savory: ${thaliData.details.starter} | Chutney: ${thaliData.details.chutney} | Sweet: ${
        thaliData.details.dessert
      }`,
      longDescription: 'Traditional banana leaf grand feast curated with slow earthenware cooked staples, heirloom stone-ground sambar, and authentic Tamil delicacies.',
      price: thaliData.price,
      spiceLevel: 2,
      tags: ['Banana Leaf Feast', 'Claypot Meal'],
      calories: thaliData.calories,
      cookTimeMinutes: 20,
      clayColorTheme: 'yellow',
      allergens: [],
      ingredients: [
        thaliData.details.base,
        ...thaliData.details.mains,
        thaliData.details.starter,
        thaliData.details.chutney,
        thaliData.details.dessert,
      ],
      pairingNotes: 'Best enjoyed with steaming hot Pepper Rasam and tempered claypot buttermilk.',
      imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
      clayVesselType: 'Banana Leaf Earthen Platter',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    };

    const newItem: CartItem = {
      cartId: `thali-${Date.now()}`,
      dish: customDish,
      quantity: 1,
      selectedSpiceLevel: 2,
      isClayPotPackaging: true,
      isCustomThali: true,
      thaliDetails: thaliData.details,
    };

    setCartItems((prev) => [...prev, newItem]);
    triggerToast('Custom Banana Leaf Feast added to your basket!');
  };

  const handleUpdateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f4faff] text-[#111d23] flex flex-col selection:bg-[#ff7043] selection:text-white font-sans">
      {/* Floating Clay Navigation Header */}
      <HeaderNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
        onOpenThaliBuilder={() => scrollToSection('thali-builder')}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* 1. Hero Banner with 3D Dish Showcase */}
        <HeroSection
          featuredDishes={DISHES.filter((d) => d.isBestseller || d.isChefSpecial)}
          onExploreMenu={() => scrollToSection('menu')}
          onOpenThaliBuilder={() => scrollToSection('thali-builder')}
          onAddToCart={handleAddToCart}
          onOpenDishModal={(dish) => setSelectedDishForModal(dish)}
        />

        {/* 2. Artisanal Tasting Menu (Pastel Clay Cards) */}
        <MenuSection
          dishes={DISHES}
          onAddToCart={handleAddToCart}
          onOpenDishModal={(dish) => setSelectedDishForModal(dish)}
        />

        {/* 3. Interactive Thali Customizer */}
        <ThaliBuilder onAddThaliToCart={handleAddCustomThaliToCart} />

        {/* 4. The Clay Craft & Science Journey */}
        <ClayCraftStory />

        {/* 5. Acclaim & Reviews */}
        <ReviewsSection />

        {/* 6. Hearth Table Reservation */}
        <ReservationSection
          onReserveSuccess={(booking: ReservationData) => {
            triggerToast(`Reservation confirmed for ${booking.name} on ${booking.date} at ${booking.timeSlot}!`);
          }}
        />

        {/* 7. Chunky Clay Accordion FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dish Details & Spice Customizer Modal */}
      <DishModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Clay Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}
