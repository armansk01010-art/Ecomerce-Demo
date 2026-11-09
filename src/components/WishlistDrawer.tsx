import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, products, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, setView } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveToBag = (product: any) => {
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F0] text-[#202020] flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E6E1D7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <h2 className="font-serif-heading text-xl font-bold tracking-wider">SAVED GARMENTS</h2>
              <span className="text-xs font-sans-body text-[#202020]/60">({wishlistProducts.length})</span>
            </div>
            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#202020]/70 hover:text-[#202020] transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#202020]/60 space-y-4">
                <Heart size={48} className="stroke-1 text-[#D8CFC1]" />
                <p className="font-serif-heading text-lg text-[#202020]">Your wishlist is empty</p>
                <p className="text-xs text-[#202020]/60 max-w-xs font-sans-body">
                  Save your favorite tailored blazers and silk dresses for easy access anytime.
                </p>
                <button
                  onClick={() => { setIsWishlistOpen(false); setView('shop'); }}
                  className="mt-4 bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium hover:bg-[#3D3D3D] transition-colors"
                >
                  DISCOVER CATALOG
                </button>
              </div>
            ) : (
              wishlistProducts.map(product => (
                <div 
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-[#E6E1D7] group"
                >
                  <img 
                    src={product.primaryImage} 
                    alt={product.name}
                    className="w-20 h-26 object-cover bg-[#F2EFE9] shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#202020]/60">{product.category}</span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#202020]/40 hover:text-red-600 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <h4 
                        onClick={() => { setIsWishlistOpen(false); setView('product', product.id); }}
                        className="font-serif-heading text-sm font-semibold text-[#202020] hover:underline cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#202020]/60 line-clamp-1">{product.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-sans-body font-semibold text-sm text-[#202020] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] text-[10px] uppercase tracking-wider py-1.5 px-3 flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag size={12} />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
