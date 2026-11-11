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
          <span className="line-clamp-1">COMPLIMENTARY EXPRESS SHIPPING ACROSS INDIA ON ORDERS ABOVE ₹2,999</span>
          <button 
            onClick={() => setShowAnnounce(false)}
            aria-label="Close announcement banner"
            className="text-[#D8CFC1] hover:text-white text-xs px-1 min-w-[24px] min-h-[24px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Mobile Header: Hamburger + Brand Logo (Desktop: Logo + Nav Links) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#202020] hover:opacity-75 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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

        {/* Desktop Navigation Links */}
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

        {/* Desktop Zone 3 Actions (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 shrink-0">
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

      {/* Mobile Hamburger Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] border-b border-[#E6E1D7] px-5 py-6 space-y-5 animate-in slide-in-from-top duration-200 shadow-xl">
          
          {/* Mobile Quick Utility Actions: Shopping Bag & Wishlist */}
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#E6E1D7]">
            <button
              onClick={() => {
                setIsCartOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3.5 bg-[#202020] text-[#F7F5F0] active:bg-[#3D3D3D] transition-colors text-xs font-semibold uppercase tracking-wider min-h-[48px] rounded-none shadow-xs"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span>Shopping Bag</span>
              </div>
              <span className="bg-[#D8CFC1] text-[#202020] text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>

            <button
              onClick={() => {
                setIsWishlistOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3.5 bg-white text-[#202020] border border-[#E6E1D7] active:bg-[#FAF8F5] transition-colors text-xs font-semibold uppercase tracking-wider min-h-[48px] rounded-none shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Heart size={18} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : "text-[#202020]"} />
                <span>Wishlist</span>
              </div>
              {wishlist.length > 0 && (
                <span className="bg-[#202020] text-[#F7F5F0] text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 text-xs font-medium uppercase tracking-widest text-[#202020]">
            <button 
              onClick={() => handleNav('shop')} 
              className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
            >
              <span>Shop All Catalog</span>
              <span className="text-[#202020]/40 text-sm">→</span>
            </button>
            <button 
              onClick={() => handleNav('women', 'Women')} 
              className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
            >
              <span>Women's Collection</span>
              <span className="text-[#202020]/40 text-sm">→</span>
            </button>
            <button 
              onClick={() => handleNav('men', 'Men')} 
              className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
            >
              <span>Men's Collection</span>
              <span className="text-[#202020]/40 text-sm">→</span>
            </button>
            <button 
              onClick={() => handleNav('about')} 
              className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
            >
              <span>Atelier & Brand Philosophy</span>
              <span className="text-[#202020]/40 text-sm">→</span>
            </button>
            <button 
              onClick={() => handleNav('contact')} 
              className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
            >
              <span>Boutiques & Contact</span>
              <span className="text-[#202020]/40 text-sm">→</span>
            </button>
            <button 
              onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }} 
              className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Search size={16} />
                <span>Search Garments</span>
              </div>
              <span className="text-[#202020]/40 text-sm">→</span>
            </button>
            {orders.length > 0 && (
              <button 
                onClick={() => handleNav('orders')} 
                className="text-left py-3.5 px-2 border-b border-[#E6E1D7]/50 text-[#8C7769] active:bg-[#EBE5DB] transition-colors min-h-[48px] flex items-center justify-between"
              >
                <span>My Orders</span>
                <span className="text-xs font-mono font-bold">({orders.length})</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
