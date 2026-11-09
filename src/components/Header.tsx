import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setView, 
    setGender, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    orders 
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnounce, setShowAnnounce] = useState(true);

  const handleNav = (view: any, gender: any = 'All') => {
    if (gender !== 'All') {
      setGender(gender);
    } else {
      setView(view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E6E1D7] transition-all">
      {/* Top Privilege Announcement Bar */}
      {showAnnounce && (
        <div className="bg-[#202020] text-[#F7F5F0] text-[11px] uppercase tracking-[0.2em] py-2 px-4 text-center font-medium flex items-center justify-between">
          <div className="w-4"></div>
          <span>COMPLIMENTARY EXPRESS SHIPPING ACROSS INDIA ON ORDERS ABOVE ₹2,999</span>
          <button 
            onClick={() => setShowAnnounce(false)}
            aria-label="Close announcement banner"
            className="text-[#D8CFC1] hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation - 3 Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#202020] hover:opacity-75 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button 
            onClick={() => handleNav('home')} 
            className="text-left group flex flex-col justify-center"
          >
            <span className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#202020] group-hover:opacity-80 transition-opacity whitespace-nowrap shrink-0">
              MAISON NOVE
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#202020]/60 -mt-1 font-sans-body hidden sm:block">
              PARIS · MUMBAI
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#202020]">
          <button 
            onClick={() => handleNav('shop')}
            className={`transition-all hover:text-[#202020] pb-1 border-b ${
              currentView === 'shop' ? 'border-[#202020] font-semibold' : 'border-transparent text-[#202020]/75 hover:border-[#202020]/40'
            } whitespace-nowrap shrink-0`}
          >
            Shop All
          </button>
          
          <button 
            onClick={() => handleNav('women', 'Women')}
            className={`transition-all hover:text-[#202020] pb-1 border-b ${
              currentView === 'women' ? 'border-[#202020] font-semibold' : 'border-transparent text-[#202020]/75 hover:border-[#202020]/40'
            } whitespace-nowrap shrink-0`}
          >
            Women
          </button>

          <button 
            onClick={() => handleNav('men', 'Men')}
            className={`transition-all hover:text-[#202020] pb-1 border-b ${
              currentView === 'men' ? 'border-[#202020] font-semibold' : 'border-transparent text-[#202020]/75 hover:border-[#202020]/40'
            } whitespace-nowrap shrink-0`}
          >
            Men
          </button>

          <button 
            onClick={() => handleNav('about')}
            className={`transition-all hover:text-[#202020] pb-1 border-b ${
              currentView === 'about' ? 'border-[#202020] font-semibold' : 'border-transparent text-[#202020]/75 hover:border-[#202020]/40'
            } whitespace-nowrap shrink-0`}
          >
            Atelier & Story
          </button>

          <button 
            onClick={() => handleNav('contact')}
            className={`transition-all hover:text-[#202020] pb-1 border-b ${
              currentView === 'contact' ? 'border-[#202020] font-semibold' : 'border-transparent text-[#202020]/75 hover:border-[#202020]/40'
            } whitespace-nowrap shrink-0`}
          >
            Boutiques
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart, Orders) */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-[#202020] hover:text-[#202020]/70 transition-colors flex items-center gap-1.5 text-xs font-medium"
            aria-label="Open search dialog"
          >
            <Search size={19} />
            <span className="hidden lg:inline text-[11px] uppercase tracking-wider text-[#202020]/70">Search</span>
          </button>

          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="p-1.5 text-[#202020] hover:text-[#202020]/70 transition-colors relative"
            aria-label="Open wishlist"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#202020] text-[#F7F5F0] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {orders.length > 0 && (
            <button 
              onClick={() => handleNav('orders')}
              className="p-1.5 text-[#202020] hover:text-[#202020]/70 transition-colors hidden sm:block"
              title="My Orders"
              aria-label="View order history"
            >
              <User size={19} />
            </button>
          )}

          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#202020] text-[#F7F5F0] hover:bg-[#3D3D3D] transition-colors py-2 px-3.5 rounded-none flex items-center gap-2.5 text-xs font-medium tracking-widest uppercase shadow-xs"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={16} />
            <span>BAG ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] border-b border-[#E6E1D7] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4 text-sm font-medium uppercase tracking-widest text-[#202020]">
            <button 
              onClick={() => handleNav('shop')} 
              className="text-left py-2 border-b border-[#E6E1D7]/50"
            >
              Shop All Catalog
            </button>
            <button 
              onClick={() => handleNav('women', 'Women')} 
              className="text-left py-2 border-b border-[#E6E1D7]/50"
            >
              Women's Collection
            </button>
            <button 
              onClick={() => handleNav('men', 'Men')} 
              className="text-left py-2 border-b border-[#E6E1D7]/50"
            >
              Men's Collection
            </button>
            <button 
              onClick={() => handleNav('about')} 
              className="text-left py-2 border-b border-[#E6E1D7]/50"
            >
              Atelier & Brand Philosophy
            </button>
            <button 
              onClick={() => handleNav('contact')} 
              className="text-left py-2 border-b border-[#E6E1D7]/50"
            >
              Boutiques & Contact
            </button>
            {orders.length > 0 && (
              <button 
                onClick={() => handleNav('orders')} 
                className="text-left py-2 border-b border-[#E6E1D7]/50 text-[#8C7769]"
              >
                My Orders ({orders.length})
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
