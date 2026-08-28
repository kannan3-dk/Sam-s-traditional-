import React, { useState } from 'react';
import { MapPin, Clock, Instagram, Twitter, Facebook, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#e9f6fd] border-t border-[#cfdce4] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Newsletter Clay Box */}
        <div className="rounded-[2.5rem] clay-surface p-8 sm:p-10 border border-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#ac3509] uppercase tracking-wider">
              ✦ Tamil Heritage Culinary Journal
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111d23]">
              Subscribe for Seasonal Feasts & Heritage Recipes
            </h3>
            <p className="text-xs sm:text-sm text-[#59413a]">
              Receive authentic spice blend guides, festival banquet announcements, and exclusive dining privileges.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full sm:w-72 px-4 py-3.5 rounded-2xl clay-input text-xs text-[#111d23]"
            />
            <button
              type="submit"
              className={`px-6 py-3.5 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
                subscribed ? 'clay-btn-mustard' : 'clay-btn-coral'
              }`}
            >
              {subscribed ? (
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#523c00]" />
                  <span>Subscribed!</span>
                </span>
              ) : (
                <span>Join Journal</span>
              )}
            </button>
          </form>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* Col 1: Brand & Craft */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl clay-btn-coral flex items-center justify-center text-white font-bold font-heading text-sm">
                SAM
              </div>
              <span className="font-heading font-bold text-xl text-[#111d23]">SAM's Traditional Food</span>
            </div>
            <p className="text-xs text-[#59413a] leading-relaxed">
              Preserving Tamil Nadu's ancient culinary heritage through slow earthenware cooking, heirloom stone-ground spices, and traditional hospitality.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#ac3509]">
              <span>🏺 100% Zero-Plastic Terracotta Packaging</span>
            </div>
          </div>

          {/* Col 2: Locations in Tamil Nadu */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#111d23] uppercase tracking-wider">
              Dining Locations
            </h4>
            <ul className="space-y-2 text-xs text-[#59413a]">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#ac3509] shrink-0 mt-0.5" />
                <span><strong>Chennai (T. Nagar):</strong> 42, Thyagaraya Road, near Panagal Park</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#ac3509] shrink-0 mt-0.5" />
                <span><strong>Madurai:</strong> 18, West Masi Street, near Meenakshi Temple</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#ac3509] shrink-0 mt-0.5" />
                <span><strong>Karaikudi:</strong> Chettinad Heritage Palace Road</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#ac3509] shrink-0 mt-0.5" />
                <span><strong>Coimbatore:</strong> Avinashi Road, RS Puram</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Hearth Timings */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#111d23] uppercase tracking-wider">
              Kitchen Hours
            </h4>
            <ul className="space-y-2 text-xs text-[#59413a]">
              <li className="flex items-start gap-1.5">
                <Clock className="w-4 h-4 text-[#795900] shrink-0 mt-0.5" />
                <span><strong>Morning Breakfast:</strong> 07:00 AM – 11:00 AM (Idli, Dosa, Pongal)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Clock className="w-4 h-4 text-[#795900] shrink-0 mt-0.5" />
                <span><strong>Banana Leaf Lunch:</strong> 12:00 PM – 04:00 PM</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Clock className="w-4 h-4 text-[#795900] shrink-0 mt-0.5" />
                <span><strong>Claypot Dinner:</strong> 06:30 PM – 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#111d23] uppercase tracking-wider">
              Catering & Inquiries
            </h4>
            <p className="text-xs text-[#59413a]">
              Traditional earthenware banquet catering for weddings, family functions, and corporate events:
            </p>
            <div className="space-y-1 text-xs font-semibold text-[#111d23]">
              <p>📞 +91 98401 54321 / +91 44 2815 6789</p>
              <p>✉️ vanakkam@samstraditionalfood.com</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-8 h-8 rounded-xl clay-btn-neutral flex items-center justify-center text-[#111d23] cursor-pointer">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-xl clay-btn-neutral flex items-center justify-center text-[#111d23] cursor-pointer">
                <Twitter className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-xl clay-btn-neutral flex items-center justify-center text-[#111d23] cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#cfdce4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8d7169]">
          <p>© 2026 SAM's Traditional Food. All rights reserved. Authentic Tamil Nadu Heritage Cuisine.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#111d23] cursor-pointer">Heirloom Ingredients</span>
            <span>•</span>
            <span className="hover:text-[#111d23] cursor-pointer">Clay Cookware Care</span>
            <span>•</span>
            <span className="hover:text-[#111d23] cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

