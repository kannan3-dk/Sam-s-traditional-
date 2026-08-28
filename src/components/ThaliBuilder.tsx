import React, { useState } from 'react';
import { Sparkles, Check, RefreshCw, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import {
  THALI_BASES,
  THALI_MAINS,
  THALI_STARTERS,
  THALI_CHUTNEYS,
  THALI_DESSERTS,
} from '../data/supplementary';
import { ThaliComponentOption } from '../types';

interface ThaliBuilderProps {
  onAddThaliToCart: (thaliData: {
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
  }) => void;
}

export const ThaliBuilder: React.FC<ThaliBuilderProps> = ({ onAddThaliToCart }) => {
  const [selectedBase, setSelectedBase] = useState<ThaliComponentOption>(THALI_BASES[0]);
  const [selectedMains, setSelectedMains] = useState<ThaliComponentOption[]>([
    THALI_MAINS[0],
    THALI_MAINS[1],
  ]);
  const [selectedStarter, setSelectedStarter] = useState<ThaliComponentOption>(THALI_STARTERS[0]);
  const [selectedChutney, setSelectedChutney] = useState<ThaliComponentOption>(THALI_CHUTNEYS[0]);
  const [selectedDessert, setSelectedDessert] = useState<ThaliComponentOption>(THALI_DESSERTS[0]);
  const [justAdded, setJustAdded] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Toggle main selection (max 2)
  const toggleMain = (main: ThaliComponentOption) => {
    if (selectedMains.some((m) => m.id === main.id)) {
      if (selectedMains.length > 1) {
        setSelectedMains(selectedMains.filter((m) => m.id !== main.id));
      }
    } else {
      if (selectedMains.length < 2) {
        setSelectedMains([...selectedMains, main]);
      } else {
        // replace the oldest selected main
        setSelectedMains([selectedMains[1], main]);
      }
    }
  };

  const basePrice = 480; // in INR (₹)
  const totalPrice =
    basePrice +
    selectedBase.extraPrice +
    selectedMains.reduce((acc, m) => acc + m.extraPrice, 0) +
    selectedStarter.extraPrice +
    selectedChutney.extraPrice +
    selectedDessert.extraPrice;

  const totalCalories =
    selectedBase.calories +
    selectedMains.reduce((acc, m) => acc + m.calories, 0) +
    selectedStarter.calories +
    selectedChutney.calories +
    selectedDessert.calories;

  const handleRandomize = () => {
    const randomBase = THALI_BASES[Math.floor(Math.random() * THALI_BASES.length)];
    const shuffledMains = [...THALI_MAINS].sort(() => 0.5 - Math.random());
    const randomStarter = THALI_STARTERS[Math.floor(Math.random() * THALI_STARTERS.length)];
    const randomChutney = THALI_CHUTNEYS[Math.floor(Math.random() * THALI_CHUTNEYS.length)];
    const randomDessert = THALI_DESSERTS[Math.floor(Math.random() * THALI_DESSERTS.length)];

    setSelectedBase(randomBase);
    setSelectedMains([shuffledMains[0], shuffledMains[1]]);
    setSelectedStarter(randomStarter);
    setSelectedChutney(randomChutney);
    setSelectedDessert(randomDessert);
  };

  const handleAddCustomThali = () => {
    onAddThaliToCart({
      name: `Custom Banana Leaf Thali (${selectedMains.map((m) => m.name.split(' ')[0]).join(' & ')})`,
      price: totalPrice,
      calories: totalCalories,
      details: {
        base: selectedBase.name,
        mains: selectedMains.map((m) => m.name),
        starter: selectedStarter.name,
        chutney: selectedChutney.name,
        dessert: selectedDessert.name,
      },
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="thali-builder" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-chip-must text-xs font-bold uppercase tracking-wider bg-[#fec330] text-[#523c00]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Banana Leaf Royal Thali Builder</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111d23]">
          Craft Your Signature Banana Leaf Feast
        </h2>
        <p className="text-sm sm:text-base text-[#59413a]">
          Select your choice of heritage grain, 2 slow-simmered claypot curries, crisp starters, stone-ground chutneys, and classic desserts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Step-by-Step Customization Options */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { num: 1, label: '1. Rice / Grains' },
              { num: 2, label: '2. Claypot Curries (Pick 2)' },
              { num: 3, label: '3. Crispy Starter' },
              { num: 4, label: '4. Stone Chutney' },
              { num: 5, label: '5. Royal Dessert' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeStep === step.num
                    ? 'clay-btn-coral'
                    : 'clay-btn-neutral text-[#59413a]'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Step 1: Base & Breads */}
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl clay-surface space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#111d23]">Step 1: Choose Rice or Grain Base</h3>
                  <p className="text-xs text-[#59413a]">Steamed Thanjavur Ponni, aromatic Seeraga Samba, Idiyappam, or Ragi Adai</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffede7] text-[#ac3509]">
                  1 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {THALI_BASES.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'clay-card-peach border-2 border-[#ff7043]'
                          : 'bg-[#f4faff] hover:bg-[#e9f6fd] border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-heading font-bold text-sm text-[#111d23]">{base.name}</p>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#ff7043] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#59413a] mt-2 line-clamp-2">{base.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#8d7169]">
                        <span>{base.calories} kcal</span>
                        <span className="text-[#ac3509]">
                          {base.extraPrice > 0 ? `+₹${base.extraPrice}` : 'Included'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: 2 Slow-Cooked Mains */}
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl clay-surface space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#111d23]">Step 2: Pick 2 Claypot Curries</h3>
                  <p className="text-xs text-[#59413a]">Garlic Kara Kuzhambu, Coconut Milk Sodhi, Fish Curry, Sambar & Rasam, or Chettinad Chicken</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffede7] text-[#ac3509]">
                  {selectedMains.length} / 2 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {THALI_MAINS.map((main) => {
                  const isSelected = selectedMains.some((m) => m.id === main.id);
                  return (
                    <button
                      key={main.id}
                      onClick={() => toggleMain(main)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'clay-card-lavender border-2 border-[#b80f55]'
                          : 'bg-[#f4faff] hover:bg-[#e9f6fd] border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-heading font-bold text-sm text-[#111d23]">{main.name}</p>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#b80f55] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#59413a] mt-2 line-clamp-2">{main.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#8d7169]">
                        <span>{main.calories} kcal</span>
                        <span className="text-[#ac3509]">
                          {main.extraPrice > 0 ? `+₹${main.extraPrice}` : 'Included'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Small Chaat / Starter */}
          {activeStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl clay-surface space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#111d23]">Step 3: Select a Starter</h3>
                  <p className="text-xs text-[#59413a]">Banana blossom cutlets, cast-iron paniyaram, or Madurai mutton sukka</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffede7] text-[#ac3509]">
                  1 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {THALI_STARTERS.map((starter) => {
                  const isSelected = selectedStarter.id === starter.id;
                  return (
                    <button
                      key={starter.id}
                      onClick={() => setSelectedStarter(starter)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'clay-card-mint border-2 border-[#2ea06c]'
                          : 'bg-[#f4faff] hover:bg-[#e9f6fd] border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-heading font-bold text-sm text-[#111d23]">{starter.name}</p>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#2ea06c] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#59413a] mt-2 line-clamp-2">{starter.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#8d7169]">
                        <span>{starter.calories} kcal</span>
                        <span className="text-[#ac3509]">
                          {starter.extraPrice > 0 ? `+₹${starter.extraPrice}` : 'Included'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Craft Relish / Chutney */}
          {activeStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl clay-surface space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#111d23]">Step 4: Stone-Ground Chutney</h3>
                  <p className="text-xs text-[#59413a]">Ammi stone red chilli chutney, garden mint thuvaiyal, or tangy inji puli relish</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffede7] text-[#ac3509]">
                  1 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {THALI_CHUTNEYS.map((chutney) => {
                  const isSelected = selectedChutney.id === chutney.id;
                  return (
                    <button
                      key={chutney.id}
                      onClick={() => setSelectedChutney(chutney)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'clay-card-yellow border-2 border-[#fec330]'
                          : 'bg-[#f4faff] hover:bg-[#e9f6fd] border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-heading font-bold text-sm text-[#111d23]">{chutney.name}</p>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#795900] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#59413a] mt-2 line-clamp-2">{chutney.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#8d7169]">
                        <span>{chutney.calories} kcal</span>
                        <span className="text-[#ac3509]">
                          {chutney.extraPrice > 0 ? `+₹${chutney.extraPrice}` : 'Included'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 5: Heritage Sweet / Lassi */}
          {activeStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl clay-surface space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#111d23]">Step 5: Traditional Dessert</h3>
                  <p className="text-xs text-[#59413a]">Chettinad black rice halwa, tender coconut payasam, or Madurai jigarthanda</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffede7] text-[#ac3509]">
                  1 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {THALI_DESSERTS.map((dessert) => {
                  const isSelected = selectedDessert.id === dessert.id;
                  return (
                    <button
                      key={dessert.id}
                      onClick={() => setSelectedDessert(dessert)}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'clay-card-lavender border-2 border-[#b80f55]'
                          : 'bg-[#f4faff] hover:bg-[#e9f6fd] border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-heading font-bold text-sm text-[#111d23]">{dessert.name}</p>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#b80f55] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#59413a] mt-2 line-clamp-2">{dessert.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#8d7169]">
                        <span>{dessert.calories} kcal</span>
                        <span className="text-[#ac3509]">
                          {dessert.extraPrice > 0 ? `+₹${dessert.extraPrice}` : 'Included'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Navigation Controls for Steps */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeStep === 1
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-[#8d7169]'
                  : 'clay-btn-neutral cursor-pointer'
              }`}
            >
              ← Previous Step
            </button>

            <button
              onClick={handleRandomize}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#ac3509] hover:bg-[#ffede7] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Chef's Choice Thali</span>
            </button>

            <button
              onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
              disabled={activeStep === 5}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeStep === 5
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-[#8d7169]'
                  : 'clay-btn-coral cursor-pointer'
              }`}
            >
              Next Step →
            </button>
          </div>

        </div>

        {/* Right Side: Live Visual Clay Thali Plate Rendering */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] clay-card-yellow border border-white/90 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-[#795900] uppercase tracking-wider">
                  Live Banana Leaf Layout
                </span>
                <h3 className="font-heading text-xl font-bold text-[#111d23]">Your Custom Thali</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ff7043] text-white shadow-md">
                ₹{totalPrice}
              </span>
            </div>

            {/* Visual Round Terracotta Platter with Clay Katoris */}
            <div className="relative w-full aspect-square max-w-sm mx-auto my-4 rounded-full bg-[#2e7d32] p-4 shadow-2xl border-4 border-[#1b5e20] flex items-center justify-center">
              
              {/* Inner Banana Leaf Surface Highlight */}
              <div className="w-full h-full rounded-full bg-[#388e3c] p-3 shadow-inner relative flex items-center justify-center">
                
                {/* Center Base Plate (Rice / Breads) */}
                <motion.div
                  key={selectedBase.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-28 h-28 rounded-full bg-[#fffcf5] border-2 border-white/90 shadow-md p-2 flex flex-col items-center justify-center text-center z-10"
                >
                  <span className="text-[10px] font-black uppercase text-[#ac3509] tracking-tight">Grain Base</span>
                  <span className="text-xs font-bold text-[#111d23] line-clamp-2 leading-tight">
                    {selectedBase.name.split(' ')[0]}
                  </span>
                </motion.div>

                {/* Surrounding Clay Katoris (Bowls) */}
                {/* Bowl 1: Main 1 */}
                <motion.div
                  key={selectedMains[0]?.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#ffede7] border-2 border-white shadow-md p-1.5 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[9px] font-bold text-[#ff7043]">Curry 1</span>
                  <span className="text-[10px] font-bold text-[#111d23] line-clamp-2 leading-tight">
                    {selectedMains[0]?.name.split(' ')[0]}
                  </span>
                </motion.div>

                {/* Bowl 2: Main 2 */}
                <motion.div
                  key={selectedMains[1]?.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1/4 right-2 w-20 h-20 rounded-full bg-[#f2eafd] border-2 border-white shadow-md p-1.5 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[9px] font-bold text-[#b80f55]">Curry 2</span>
                  <span className="text-[10px] font-bold text-[#111d23] line-clamp-2 leading-tight">
                    {selectedMains[1]?.name.split(' ')[0]}
                  </span>
                </motion.div>

                {/* Bowl 3: Starter */}
                <motion.div
                  key={selectedStarter.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-4 right-6 w-18 h-18 rounded-full bg-[#e5f7ee] border-2 border-white shadow-md p-1.5 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[9px] font-bold text-[#2ea06c]">Starter</span>
                  <span className="text-[10px] font-bold text-[#111d23] line-clamp-2 leading-tight">
                    {selectedStarter.name.split(' ')[0]}
                  </span>
                </motion.div>

                {/* Bowl 4: Chutney */}
                <motion.div
                  key={selectedChutney.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-4 left-6 w-18 h-18 rounded-full bg-[#fef8e2] border-2 border-white shadow-md p-1.5 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[9px] font-bold text-[#795900]">Chutney</span>
                  <span className="text-[10px] font-bold text-[#111d23] line-clamp-2 leading-tight">
                    {selectedChutney.name.split(' ')[0]}
                  </span>
                </motion.div>

                {/* Bowl 5: Dessert */}
                <motion.div
                  key={selectedDessert.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1/4 left-2 w-20 h-20 rounded-full bg-[#ffede7] border-2 border-white shadow-md p-1.5 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[9px] font-bold text-[#ff7043]">Sweet</span>
                  <span className="text-[10px] font-bold text-[#111d23] line-clamp-2 leading-tight">
                    {selectedDessert.name.split(' ')[0]}
                  </span>
                </motion.div>

              </div>
            </div>

            {/* Summary Breakdown List */}
            <div className="space-y-2 py-3 border-t border-black/5 text-xs text-[#59413a]">
              <div className="flex justify-between">
                <span>🌾 Grain Base:</span>
                <span className="font-bold text-[#111d23]">{selectedBase.name}</span>
              </div>
              <div className="flex justify-between">
                <span>🏺 Curries:</span>
                <span className="font-bold text-[#111d23]">
                  {selectedMains.map((m) => m.name).join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🍢 Starter:</span>
                <span className="font-bold text-[#111d23]">{selectedStarter.name}</span>
              </div>
              <div className="flex justify-between">
                <span>🍃 Chutney:</span>
                <span className="font-bold text-[#111d23]">{selectedChutney.name}</span>
              </div>
              <div className="flex justify-between">
                <span>🍨 Sweet:</span>
                <span className="font-bold text-[#111d23]">{selectedDessert.name}</span>
              </div>
            </div>

            {/* Total Calories & Final Add CTA */}
            <div className="pt-3 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8d7169]">
                Estimated Calories: <strong className="text-[#111d23]">{totalCalories} kcal</strong>
              </span>
            </div>

            <button
              onClick={handleAddCustomThali}
              className={`w-full mt-4 py-4 rounded-2xl font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all ${
                justAdded ? 'clay-btn-mustard' : 'clay-btn-coral'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5 text-[#523c00]" />
                  <span>Thali Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add Thali to Cart • ₹{totalPrice}</span>
                </>
              )}
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

