export type Category = 
  | 'All' 
  | 'Tops & Shirts' 
  | 'Trousers & Tailoring' 
  | 'Outerwear & Jackets' 
  | 'Dresses & Sets';

export type Gender = 'All' | 'Men' | 'Women' | 'Unisex';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '30' | '32' | '34' | '36';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  colors: ProductColor[];
  sizes: Size[];
  primaryImage: string;
  secondaryImage?: string;
  gallery: string[];
  description: string;
  composition: string[];
  careInstructions: string[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: Size;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'cod' | 'card' | 'upi';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export type ViewMode = 
  | 'home' 
  | 'shop' 
  | 'men' 
  | 'women' 
  | 'product' 
  | 'about' 
  | 'contact' 
  | 'checkout' 
  | 'confirmation' 
  | 'orders';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info';
}
