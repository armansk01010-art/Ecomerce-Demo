import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartDiscount, 
    shippingFee, 
    cartTotal, 
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setView 
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const freeShippingThreshold = 2999;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F0] text-[#202020] flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E6E1D7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <h2 className="font-serif-heading text-xl font-bold tracking-wider">SHOPPING BAG</h2>
              <span className="text-xs font-sans-body text-[#202020]/60">({cart.length} items)</span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#202020]/70 hover:text-[#202020] transition-colors"
              aria-label="Close cart drawer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#EBE5DB] px-6 py-3 border-b border-[#E6E1D7] text-xs font-sans-body">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#202020]/80">
                Add <span className="font-semibold text-[#202020] tabular-nums">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-semibold uppercase tracking-wider">Complimentary Express Shipping</span>
              </p>
            ) : (
              <p className="text-[#202020] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                <span>You qualify for Complimentary Express Delivery in India!</span>
              </p>
            )}
            <div className="w-full h-1.5 bg-[#D8CFC1] rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#202020] transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#202020]/60 space-y-4">
                <ShoppingBag size={48} className="stroke-1 text-[#D8CFC1]" />
                <p className="font-serif-heading text-lg text-[#202020]">Your shopping bag is empty</p>
                <p className="text-xs text-[#202020]/60 max-w-xs font-sans-body">
                  Explore our luxury linen and silk tailoring to build your wardrobe.
                </p>
                <button
                  onClick={() => { setIsCartOpen(false); setView('shop'); }}
                  className="mt-4 bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium hover:bg-[#3D3D3D] transition-colors"
                >
                  EXPLORE CATALOG
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-white border border-[#E6E1D7] relative group"
                >
                  <img 
                    src={item.product.primaryImage} 
                    alt={item.product.name}
                    className="w-20 h-26 object-cover bg-[#F2EFE9] shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-heading text-sm font-semibold text-[#202020] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                          className="text-[#202020]/40 hover:text-red-600 transition-colors p-1"
                          title="Remove garment"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#202020]/70 mt-1 font-sans-body">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                          {item.selectedColor.name}
                        </span>
                        <span>·</span>
                        <span>Size: <strong className="font-semibold text-[#202020]">{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E6E1D7] bg-[#FAF8F5]">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity - 1)}
                          className="p-1.5 text-[#202020] hover:bg-[#EBE5DB] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums text-[#202020]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity + 1)}
                          className="p-1.5 text-[#202020] hover:bg-[#EBE5DB] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right font-sans-body font-semibold text-sm text-[#202020] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Calculation */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E6E1D7] space-y-4">
              {/* Promo Code Form */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#F7F5F0] border border-[#D8CFC1] p-2.5 text-xs text-[#202020]">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-emerald-700" />
                      <span>Code <strong>{appliedPromo.code}</strong> ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button 
                      onClick={removePromoCode}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input 
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. NOVE10)"
                      className="flex-1 bg-[#F7F5F0] text-[#202020] text-xs px-3 py-2 border border-[#E6E1D7] focus:outline-none focus:border-[#202020] uppercase placeholder:normal-case"
                    />
                    <button 
                      type="submit"
                      className="bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-wider px-3 py-2 hover:bg-[#3D3D3D] transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs font-sans-body border-t border-[#F2EFE9] pt-3">
                <div className="flex justify-between text-[#202020]/75">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#202020]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount ({appliedPromo?.discountPercent}%)</span>
                    <span className="tabular-nums font-medium">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#202020]/75">
                  <span>Express Shipping</span>
                  <span className="tabular-nums font-medium text-[#202020]">
                    {shippingFee === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#202020] border-t border-[#E6E1D7] pt-2">
                  <span className="font-serif-heading tracking-wider">TOTAL ESTIMATE</span>
                  <span className="tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] py-4 text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
