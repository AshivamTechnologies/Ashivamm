export type DishCategory = 
  | 'All' 
  | 'Veg items' 
  | 'Non-veg items' 
  | 'Veg Curries'
  | 'Biryanis'
  | 'Meals & Thalis'
  | 'Starters' 
  | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  subCategory?: 'Curry' | 'Biryani' | 'Meal' | 'Starter' | 'Drink' | 'Dessert';
  isVegetarian: boolean;
  isStarter?: boolean;
  isDrink?: boolean;
  isCurry?: boolean;
  isBiryani?: boolean;
  isMeal?: boolean;
  isSignature?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3; // 0 mild, 1 medium, 2 spicy, 3 extra spicy
  image: string;
  rating?: number;
  prepTime?: string;
  tags?: string[];
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialNotes?: string;
}

export interface ReservationData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference?: string;
  specialRequests?: string;
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  dishFavored: string;
  date: string;
}

export interface RestaurantEvent {
  id: string;
  title: string;
  tagline: string;
  dateOrSchedule: string;
  time: string;
  coverPrice: string;
  description: string;
  highlights: string[];
  image: string;
  statusTag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Interior' | 'Food' | 'Chef' | 'Dining' | 'Ambience';
  image: string;
  caption: string;
}
