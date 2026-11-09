import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { products, isSearchOpen, setIsSearchOpen, setView, setSearchQuery } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    setView('product', id);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      setIsSearchOpen(false);
      setView('shop');
    }
  };

  const popularSearches = ['Linen Blazer', 'Silk Dress', 'French Oxford Shirt', 'Pleated Trousers', 'Co-ord Set'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-[#F7F5F0] text-[#202020] w-full max-w-2xl border border-[#E6E1D7] shadow-2xl animate-in fade-in duration-200">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-[#E6E1D7] flex items-center justify-between bg-white">
          <form onSubmit={handleFullSearch} className="flex-1 flex items-center gap-3">
            <Search size={22} className="text-[#202020]/50 shrink-0" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by garment name, linen, silk, jacket, or dress..."
              autoFocus
              className="w-full bg-transparent text-base sm:text-lg font-serif-heading font-medium text-[#202020] focus:outline-none placeholder:text-[#202020]/40"
            />
          </form>

          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#202020]/60 hover:text-[#202020] transition-colors"
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#202020]/60">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                    }}
                    className="bg-white hover:bg-[#EBE5DB] text-[#202020] text-xs font-sans-body px-3.5 py-1.5 border border-[#E6E1D7] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-[#202020]/60">
              <p className="font-serif-heading text-base text-[#202020]">No garments found for "{query}"</p>
              <p className="text-xs mt-1 font-sans-body">Try searching for linen, silk, trousers, dress, or blazer.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#202020]/60 border-b border-[#E6E1D7] pb-2">
                <span>FOUND {filteredProducts.length} GARMENT{filteredProducts.length > 1 ? 'S' : ''}</span>
                <button 
                  onClick={handleFullSearch}
                  className="hover:underline flex items-center gap-1 font-medium text-[#202020]"
                >
                  <span>View all in Shop</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex gap-3 p-2 bg-white border border-[#E6E1D7] hover:border-[#202020]/40 cursor-pointer transition-all group"
                  >
                    <img 
                      src={product.primaryImage} 
                      alt={product.name}
                      className="w-14 h-18 object-cover bg-[#F2EFE9] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[9px] uppercase tracking-wider text-[#202020]/60">{product.category}</span>
                      <h5 className="font-serif-heading text-xs font-semibold text-[#202020] group-hover:underline line-clamp-1">
                        {product.name}
                      </h5>
                      <span className="font-sans-body font-semibold text-xs text-[#202020] mt-1 tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
