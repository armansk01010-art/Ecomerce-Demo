import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, Size, Order, ViewMode, Category, Gender, ToastMessage } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  currentView: ViewMode;
  selectedProductId: string | null;
  selectedCategory: Category;
  selectedGender: Gender;
  searchQuery: string;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  orders: Order[];
  currentOrder: Order | null;
  appliedPromo: { code: string; discountPercent: number } | null;
  toast: ToastMessage | null;
  
  // Navigation actions
  setView: (view: ViewMode, productId?: string | null) => void;
  setCategory: (category: Category) => void;
  setGender: (gender: Gender) => void;
  setSearchQuery: (query: string) => void;
  
  // Modal/Drawer actions
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  
  // Cart actions
  addToCart: (product: Product, color: ProductColor, size: Size, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string, size: Size) => void;
  updateQuantity: (productId: string, colorName: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Order actions
  placeOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'estimatedDelivery'>) => Order;

  // Calculation helpers
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  cartTotal: number;
  cartCount: number;
  
  // Toast
  showToast: (title: string, message: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_CART = 'maison_nove_cart_v1';
const LOCAL_STORAGE_WISHLIST = 'maison_nove_wishlist_v1';
const LOCAL_STORAGE_ORDERS = 'maison_nove_orders_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedGender, setSelectedGender] = useState<Gender>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(orders));
  }, [orders]);

  const showToast = (title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, title, message });
    setTimeout(() => {
      setToast(prev => prev?.id === id ? null : prev);
    }, 3200);
  };

  const setView = (view: ViewMode, productId: string | null = null) => {
    setCurrentView(view);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategory = (category: Category) => {
    setSelectedCategory(category);
    if (currentView !== 'shop') {
      setCurrentView('shop');
    }
  };

  const setGender = (gender: Gender) => {
    setSelectedGender(gender);
    if (gender === 'Men') {
      setCurrentView('men');
    } else if (gender === 'Women') {
      setCurrentView('women');
    } else {
      setCurrentView('shop');
    }
  };

  const addToCart = (product: Product, color: ProductColor, size: Size, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedColor.name === color.name && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedColor: color, selectedSize: size, quantity }];
      }
    });

    showToast('Added to Shopping Bag', `${product.name} (${color.name}, ${size})`);
  };

  const removeFromCart = (productId: string, colorName: string, size: Size) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor.name === colorName && item.selectedSize === size)
    ));
  };

  const updateQuantity = (productId: string, colorName: string, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName, size);
      return;
    }

    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor.name === colorName && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NOVE10' || cleanCode === 'WELCOME10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      showToast('Promo Code Applied', '10% privilege discount added to your bag');
      return true;
    } else if (cleanCode === 'NOVE15' || cleanCode === 'LUXURY15') {
      setAppliedPromo({ code: cleanCode, discountPercent: 15 });
      showToast('VIP Code Applied', '15% VIP discount applied');
      return true;
    }
    showToast('Invalid Code', 'Please enter a valid promotion code (e.g. NOVE10)');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', product ? product.name : 'Garment removed');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', product ? product.name : 'Garment saved');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedPromo ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
  // Free shipping above ₹2,999
  const shippingFee = cartSubtotal === 0 ? 0 : cartSubtotal >= 2999 ? 0 : 250;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'estimatedDelivery'>): Order => {
    const randomId = 'MN-' + Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    // Estimate delivery 3-5 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder: Order = {
      ...orderData,
      id: randomId,
      date: dateStr,
      status: 'Confirmed',
      estimatedDelivery
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setView('confirmation');
    showToast('Order Placed', `Order #${newOrder.id} confirmed successfully`);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        currentView,
        selectedProductId,
        selectedCategory,
        selectedGender,
        searchQuery,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        orders,
        currentOrder,
        appliedPromo,
        toast,
        setView,
        setCategory,
        setGender,
        setSearchQuery,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTotal,
        cartCount,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
