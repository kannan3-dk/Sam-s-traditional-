export type ClayColor = 'lavender' | 'peach' | 'mint' | 'blue' | 'yellow';

export interface DishItem {
  id: string;
  name: string;
  category: 'curries' | 'biryani' | 'starters' | 'thali' | 'desserts' | 'beverages';
  description: string;
  longDescription: string;
  price: number; // in INR (₹)
  spiceLevel: 1 | 2 | 3 | 4; // 1: Mild (Black Pepper), 2: Heritage Balanced, 3: Chettinad Fiery, 4: Madurai Hot
  tags: string[];
  calories: number;
  cookTimeMinutes: number;
  clayColorTheme: ClayColor;
  allergens: string[];
  ingredients: string[];
  pairingNotes: string;
  imageUrl: string;
  clayVesselType: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
}

export interface CartItem {
  cartId: string;
  dish: DishItem;
  quantity: number;
  selectedSpiceLevel: number;
  specialInstructions?: string;
  isClayPotPackaging: boolean;
  isCustomThali?: boolean;
  thaliDetails?: {
    base: string;
    mains: string[];
    starter: string;
    chutney: string;
    dessert: string;
  };
}

export interface ThaliComponentOption {
  id: string;
  name: string;
  category: 'base' | 'main' | 'starter' | 'chutney' | 'dessert';
  description: string;
  extraPrice: number; // in INR (₹)
  calories: number;
  imageUrl: string;
  isVeg: boolean;
  isGlutenFree: boolean;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  tableType: 'chettinad-hall' | 'clay-hearth' | 'banana-leaf-patio' | 'candlelight';
  specialNotes?: string;
  spicePreference?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  dishMention: string;
  avatarBg: string;
  avatarInitial: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'clay' | 'menu' | 'delivery' | 'dining';
}


