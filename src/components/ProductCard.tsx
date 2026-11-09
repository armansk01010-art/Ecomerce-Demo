import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setView, toggleWishlist, isInWishlist, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inWish = isInWishlist(product.id);

  const handleCardClick = () => {
    setView('product', product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const displayImg = isHovered && product.secondaryImage 
    ? product.secondaryImage 
    : product.primaryImage;

  return (
    <div 
      className="group cursor-pointer flex flex-col h-full bg-white border border-[#E6E1D7]/80 hover:border-[#202020]/30 transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-3/4 w-full bg-[#F2EFE9] overflow-hidden">
        {!imgError ? (
          <img 
            src={displayImg} 
            alt={product.name}
            onError={() => setImgError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EBE5DB] text-[#202020] p-4 text-center">
            <span className="font-serif-heading text-lg font-bold">{product.name}</span>
            <span className="text-xs text-[#202020]/60 mt-1 uppercase tracking-wider">{product.category}</span>
          </div>
        )}

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div>
            {product.isNewArrival && (
              <span className="bg-[#202020] text-[#F7F5F0] text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-medium shadow-xs">
                NEW
              </span>
            )}
            {!product.isNewArrival && product.isBestseller && (
              <span className="bg-[#D8CFC1] text-[#202020] text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-semibold shadow-xs">
                BESTSELLER
              </span>
            )}
          </div>

          <button
            onClick={handleToggleWishlist}
            aria-label={inWish ? "Remove from wishlist" : "Add to wishlist"}
            className={`pointer-events-auto p-2 bg-white/90 backdrop-blur-xs transition-colors rounded-full shadow-xs ${
              inWish ? 'text-red-600 bg-white' : 'text-[#202020] hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={inWish ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Quick Add Overlay Bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] text-[11px] font-medium uppercase tracking-[0.15em] py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <ShoppingBag size={14} />
            <span>QUICK ADD</span>
          </button>
          <button
            onClick={handleCardClick}
            className="bg-white hover:bg-[#FAF8F5] text-[#202020] p-2.5 transition-colors border border-[#E6E1D7] shadow-sm"
            title="View Details"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white space-y-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#202020]/60 uppercase tracking-widest mb-1">
            <span>{product.category}</span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#202020]/70">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          </div>

          <h3 className="font-serif-heading text-base font-medium text-[#202020] group-hover:opacity-80 transition-opacity line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-xs text-[#202020]/65 font-sans-body line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Swatches */}
        <div className="pt-2 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
          {/* Color Swatches */}
          <div className="flex items-center gap-1">
            {product.colors.map(color => (
              <span
                key={color.name}
                title={color.name}
                className="w-3 h-3 rounded-full border border-[#D8CFC1]/70 inline-block"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-sans-body font-semibold text-sm text-[#202020] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#888888] line-through ml-1.5 tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
