import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReservationData } from '../types';

interface ReservationSectionProps {
  onReserveSuccess: (data: ReservationData) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onReserveSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-09-02');
  const [timeSlot, setTimeSlot] = useState('07:30 PM (Dinner Feast)');
  const [guests, setGuests] = useState(2);
  const [tableType, setTableType] = useState<'chettinad-hall' | 'clay-hearth' | 'banana-leaf-patio' | 'candlelight'>('chettinad-hall');
  const [spicePreference, setSpicePreference] = useState('Medium Spice (Balanced Traditional)');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedPass, setConfirmedPass] = useState<ReservationData | null>(null);

  const tableOptions = [
    {
      id: 'chettinad-hall',
      title: 'Chettinad Grand Heritage Hall',
      desc: 'Teakwood pillars, Athangudi handmade tiles, and classic acoustic resonance.',
      theme: 'clay-card-peach',
      tag: 'Most Popular',
    },
    {
      id: 'clay-hearth',
      title: 'Open Claypot Hearth Table',
      desc: 'Front-row seat overlooking live firewood simmer stations and terracotta pots.',
      theme: 'clay-card-lavender',
      tag: 'Live Hearth View',
    },
    {
      id: 'banana-leaf-patio',
      title: 'Banana Leaf Garden Patio',
      desc: 'Open-air courtyard with fragrant Madurai jasmine and ambient brass lamps.',
      theme: 'clay-card-mint',
      tag: 'Open-Air Garden',
    },
    {
      id: 'candlelight',
      title: 'Pandian Royal Private Dining',
      desc: 'Dedicated private alcove for family anniversaries, celebrations, and gatherings.',
      theme: 'clay-card-yellow',
      tag: 'Private Alcove',
    },
  ];

  const timeSlots = [
    '12:30 PM (Lunch Feast)',
    '01:15 PM (Lunch Feast)',
    '02:00 PM (Lunch Feast)',
    '07:00 PM (Dinner Feast)',
    '07:45 PM (Dinner Feast)',
    '08:30 PM (Dinner Feast)',
    '09:15 PM (Dinner Feast)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const booking: ReservationData = {
      name,
      email,
      phone,
      date,
      timeSlot,
      guests,
      tableType,
      spicePreference,
      specialNotes,
    };

    setConfirmedPass(booking);
    onReserveSuccess(booking);
  };

  return (
    <section id="reservation" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-chip-must text-xs font-bold uppercase tracking-wider bg-[#fec330] text-[#523c00]">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Heritage Table Reservation</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111d23]">
          Reserve Your Claypot Dining Experience
        </h2>
        <p className="text-sm sm:text-base text-[#59413a]">
          Join us at SAM's Traditional Food for an unforgettable banana leaf feast cooked with heirloom recipes in seasoned earthenware.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {confirmedPass ? (
            /* Confirmed Clay Booking Pass Voucher */
            <motion.div
              key="confirmed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 sm:p-10 rounded-[2.5rem] clay-card-yellow border-2 border-white text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-[#2ea06c] text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#795900] uppercase tracking-widest">
                  Reservation Confirmed • Voucher #SAM-{(Math.random() * 90000 + 10000).toFixed(0)}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111d23]">
                  Thank you, {confirmedPass.name}! We look forward to hosting you.
                </h3>
                <p className="text-xs sm:text-sm text-[#59413a] max-w-md mx-auto">
                  A booking confirmation with priority seating details has been sent to your email and phone.
                </p>
              </div>

              {/* Pass Details Card */}
              <div className="bg-white/80 p-5 rounded-2xl clay-surface text-left grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-[#59413a]">
                <div>
                  <span className="text-[10px] text-[#8d7169] uppercase font-bold block">Date</span>
                  <span className="font-bold text-sm text-[#111d23]">{confirmedPass.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8d7169] uppercase font-bold block">Time</span>
                  <span className="font-bold text-sm text-[#111d23]">{confirmedPass.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8d7169] uppercase font-bold block">Party Size</span>
                  <span className="font-bold text-sm text-[#111d23]">{confirmedPass.guests} Guests</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8d7169] uppercase font-bold block">Seating Area</span>
                  <span className="font-bold text-sm text-[#ac3509]">
                    {confirmedPass.tableType === 'chettinad-hall' && 'Chettinad Hall'}
                    {confirmedPass.tableType === 'clay-hearth' && 'Live Hearth Table'}
                    {confirmedPass.tableType === 'banana-leaf-patio' && 'Garden Patio'}
                    {confirmedPass.tableType === 'candlelight' && 'Pandian Private Alcove'}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => setConfirmedPass(null)}
                  className="px-6 py-3 rounded-xl clay-btn-neutral text-xs font-bold cursor-pointer"
                >
                  Make Another Reservation
                </button>
              </div>
            </motion.div>
          ) : (
            /* Reservation Form */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-[2.5rem] clay-surface border border-white/90 space-y-8 shadow-2xl"
            >
              {/* Seating Table Type Cards */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#111d23] uppercase tracking-wider block">
                  1. Select Seating Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tableOptions.map((opt) => {
                    const isSelected = tableType === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setTableType(opt.id as any)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? `${opt.theme} border-2 border-[#ff7043] scale-[1.02]`
                            : 'bg-[#f4faff] hover:bg-[#e9f6fd] border border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-heading font-bold text-sm text-[#111d23]">{opt.title}</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#ac3509]">
                            {opt.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#59413a] mt-2">{opt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date, Time Slot & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23] flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#ac3509]" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs font-semibold text-[#111d23]"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ac3509]" />
                    <span>Seating Time</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs font-semibold text-[#111d23] bg-transparent"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests Stepper */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#ac3509]" />
                    <span>Number of Guests</span>
                  </label>
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-2xl clay-input">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-xl clay-btn-neutral font-bold text-base flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-heading font-extrabold text-sm text-[#111d23]">
                      {guests} Guests
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      className="w-8 h-8 rounded-xl clay-btn-neutral font-bold text-base flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Guest Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Subramanian"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs text-[#111d23]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs text-[#111d23]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98401 23456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs text-[#111d23]"
                  />
                </div>
              </div>

              {/* Spice Preference & Special Request Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23]">Spice Profile</label>
                  <select
                    value={spicePreference}
                    onChange={(e) => setSpicePreference(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs font-medium text-[#111d23]"
                  >
                    <option>Mild Spice (Gentle, child friendly)</option>
                    <option>Medium Spice (Balanced Traditional)</option>
                    <option>Authentic Chettinad Spice (Black Pepper & Guntur Chillies)</option>
                    <option>Madurai Fiery Spice (Extra Heat)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111d23]">Special Occasion / Dietary Notes</label>
                  <input
                    type="text"
                    placeholder="Birthday, anniversary, high-chair needed..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl clay-input text-xs text-[#111d23]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl clay-btn-coral font-heading font-bold text-base cursor-pointer shadow-xl flex items-center justify-center gap-2 mx-auto"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Confirm Table Reservation</span>
                </button>
                <p className="text-[11px] text-[#8d7169] mt-3 font-medium">
                  Zero cancellation fees. Modify or reschedule anytime with instant SMS updates.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

