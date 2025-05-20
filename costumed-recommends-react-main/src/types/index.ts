
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  score: number;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

// List of Moroccan cities
export const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", 
  "Meknès", "Oujda", "Kénitra", "Tétouan", "El Jadida", "Safi", 
  "Mohammedia", "Khouribga", "Béni Mellal", "Nador", "Taza", 
  "Settat", "Berrechid", "Khémisset", "Guelmim", "Témara", 
  "Ouarzazate", "Essaouira", "Larache", "Dakhla", "Laâyoune"
];
