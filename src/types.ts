export type DietaryType = 'veg' | 'non-veg' | 'vegan';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'starters' | 'mains' | 'biryani' | 'breads' | 'thali' | 'desserts' | 'beverages';
  subCategory?: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  dietary: DietaryType;
  spiceLevel: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Hot/Sizzling
  isChefSpecial?: boolean;
  isBestSeller?: boolean;
  isGlutenFree?: boolean;
  portion: string;
  preparationTime: string;
  ingredients: string[];
  image: string;
  calories?: string;
  allergens?: string[];
}

export type SeatingArea = 'royal-hall' | 'garden-terrace' | 'private-dining' | 'ac-family-lounge';

export type OccasionType = 
  | 'family-dinner'
  | 'birthday'
  | 'anniversary'
  | 'tourist-group'
  | 'business-meeting'
  | 'casual-dining';

export interface Reservation {
  id: string;
  bookingCode: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: SeatingArea;
  occasion: OccasionType;
  specialRequests: string;
  preOrderedItems?: { itemId: string; name: string; quantity: number; priceINR: number }[];
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  babyChairRequested?: boolean;
  wheelchairAccessRequested?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'all' | 'dishes' | 'ambience' | 'kitchen' | 'gatherings';
  image: string;
  badge?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google Reviews' | 'Tripadvisor' | 'Zomato';
  highlightDish?: string;
}

export interface PreOrderItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface AccessibilityFeature {
  icon: string;
  title: string;
  description: string;
}
