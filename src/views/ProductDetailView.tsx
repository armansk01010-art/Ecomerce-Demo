import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductColor, Size } from '../types';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, Star, Check } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { products, selectedProductId, setView, addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Natural', hex: '#E2DACD' });
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0] || 'M');
  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion toggle state
  const [openSection, setOpenSection] = useState<'composition' | 'care' | 'delivery' | null>('composition');

  const inWish = isInWishlist(product.id);

  const handleAddBag = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#202020]/60 uppercase tracking-widest">
        <button onClick={() => setView('home')} className="hover:text-[#202020] transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => setView('shop')} className="hover:text-[#202020] transition-colors">Catalog</button>
        <span>/</span>
        <span className="text-[#202020] font-semibold">{product.category}</span>
      </div>

      {/* Main Contiguous PDP Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Gallery Column (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Selected Image */}
          <div className="relative aspect-3/4 w-full bg-[#F2EFE9] border border-[#E6E1D7] overflow-hidden">
            <img 
              src={selectedImage || product.primaryImage} 
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#202020] text-[#F7F5F0] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-medium">
                NEW ARRIVAL
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-26 bg-[#F2EFE9] border transition-all shrink-0 overflow-hidden ${
                    selectedImage === img ? 'border-[#202020] ring-1 ring-[#202020]' : 'border-[#E6E1D7] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Purchase & Details Column (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E6E1D7] space-y-6">
          
          {/* Header & Subtitle */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#202020]/60 uppercase tracking-widest mb-1">
              <span>{product.gender} · {product.category}</span>
              <span className="flex items-center gap-1 font-mono text-xs text-[#202020]/75">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-[#202020]/50">({product.reviewCount} reviews)</span>
              </span>
            </div>

            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#202020]">
              {product.name}
            </h1>

            <p className="text-xs text-[#202020]/70 font-sans-body mt-1">
              {product.subtitle}
            </p>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-sans-body font-bold text-2xl text-[#202020] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#888888] line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium ml-auto">
                IN STOCK · ATELIER READY
              </span>
            </div>
          </div>

          <div className="border-t border-[#E6E1D7]" />

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-sans-body">
              <span className="uppercase tracking-wider font-semibold text-[#202020]">Color:</span>
              <span className="text-[#202020]/75 font-medium">{selectedColor.name}</span>
            </div>

            <div className="flex items-center gap-3">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`group relative p-1 rounded-full border transition-all ${
                    selectedColor.name === color.name ? 'border-[#202020] scale-110' : 'border-transparent hover:border-gray-300'
                  }`}
                  title={color.name}
                >
                  <span 
                    className="w-6 h-6 rounded-full inline-block border border-gray-300 shadow-xs" 
                    style={{ backgroundColor: color.hex }} 
                  />
                  {selectedColor.name === color.name && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                      <Check size={12} className={color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#f5f3ed' ? 'text-black' : 'text-white'} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-sans-body">
              <span className="uppercase tracking-wider font-semibold text-[#202020]">Select Size:</span>
              <button 
                onClick={() => alert("MAISON NOVE Size Guide:\nS: Chest 36-38\" / Waist 30-32\"\nM: Chest 38-40\" / Waist 32-34\"\nL: Chest 40-42\" / Waist 34-36\"\nXL: Chest 42-44\" / Waist 36-38\"")}
                className="text-[11px] underline text-[#202020]/70 hover:text-[#202020]"
              >
                Size Guide & Measurement
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 text-xs font-semibold tracking-wider border transition-all ${
                    selectedSize === size
                      ? 'bg-[#202020] text-[#F7F5F0] border-[#202020]'
                      : 'bg-[#FAF8F5] text-[#202020] border-[#E6E1D7] hover:border-[#202020]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#202020]">Quantity:</span>
            <div className="flex items-center border border-[#E6E1D7] bg-[#FAF8F5]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-xs text-[#202020] hover:bg-[#EBE5DB]"
              >
                -
              </button>
              <span className="px-4 text-xs font-semibold tabular-nums">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-xs text-[#202020] hover:bg-[#EBE5DB]"
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddBag}
              className="w-full bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] py-4 text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <ShoppingBag size={16} />
              <span>ADD TO SHOPPING BAG</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#D8CFC1] hover:bg-[#c9bfae] text-[#202020] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                BUY NOW (EXPRESS)
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border transition-colors ${
                  inWish ? 'border-red-500 text-red-600 bg-red-50' : 'border-[#E6E1D7] text-[#202020] hover:bg-[#FAF8F5]'
                }`}
                title={inWish ? "Saved in wishlist" : "Save to wishlist"}
              >
                <Heart size={18} fill={inWish ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-[#E6E1D7]">
            <p className="text-xs text-[#202020]/80 leading-relaxed font-sans-body">
              {product.description}
            </p>
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-[#E6E1D7] pt-2 space-y-2 text-xs font-sans-body">
            
            {/* Accordion 1: Fabric & Composition */}
            <div className="border-b border-[#E6E1D7]">
              <button
                onClick={() => setOpenSection(openSection === 'composition' ? null : 'composition')}
                className="w-full py-3 flex items-center justify-between font-serif-heading font-semibold text-[#202020]"
              >
                <span>FABRIC & COMPOSITION</span>
                {openSection === 'composition' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSection === 'composition' && (
                <div className="pb-4 text-[#202020]/75 space-y-1">
                  {product.composition.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#202020]/60 inline-block" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Care Instructions */}
            <div className="border-b border-[#E6E1D7]">
              <button
                onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
                className="w-full py-3 flex items-center justify-between font-serif-heading font-semibold text-[#202020]"
              >
                <span>GARMENT CARE & MAINTENANCE</span>
                {openSection === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSection === 'care' && (
                <div className="pb-4 text-[#202020]/75 space-y-1">
                  {product.careInstructions.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#202020]/60 inline-block" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 3: Delivery & Returns */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'delivery' ? null : 'delivery')}
                className="w-full py-3 flex items-center justify-between font-serif-heading font-semibold text-[#202020]"
              >
                <span>DELIVERY & PRIVATE RETURNS</span>
                {openSection === 'delivery' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSection === 'delivery' && (
                <div className="pb-4 text-[#202020]/75 space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck size={15} className="text-[#202020]" />
                    <span>Complimentary express delivery on orders above ₹2,999.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw size={15} className="text-[#202020]" />
                    <span>14-day home pick-up returns with zero restocking fees.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={15} className="text-[#202020]" />
                    <span>Hand-inspected before dispatch from Mumbai atelier.</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Related Garments Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#E6E1D7] space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-heading text-2xl font-bold text-[#202020]">
              You May Also Covet
            </h2>
            <button 
              onClick={() => setView('shop')}
              className="text-xs uppercase tracking-widest text-[#202020] hover:underline"
            >
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
