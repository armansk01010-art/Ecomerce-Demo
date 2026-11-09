import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, PaymentMethod } from '../types';
import { ShieldCheck, Lock, CreditCard, Banknote, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, shippingFee, cartTotal, appliedPromo, placeOrder, setView, showToast } = useShop();

  const [step, setStep] = useState<1 | 2>(1);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Arman Sharma',
    email: 'arman@example.com',
    phone: '9876543210',
    addressLine1: '42 Lotus Apartments, Off Hill Road',
    addressLine2: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8910');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [upiId, setUpiId] = useState('arman@upi');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif-heading text-2xl font-bold text-[#202020]">Your shopping bag is empty</h2>
        <p className="text-xs text-[#202020]/70 font-sans-body">Add garments to your shopping bag before proceeding to checkout.</p>
        <button
          onClick={() => setView('shop')}
          className="bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-widest px-6 py-3 font-semibold"
        >
          EXPLORE CATALOG
        </button>
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.pincode) {
      showToast('Validation Error', 'Please complete all required shipping fields');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: shippingFee,
      total: cartTotal,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-[#E6E1D7] pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-semibold">SECURE EXPRESS CHECKOUT</span>
          <h1 className="font-serif-heading text-3xl font-bold text-[#202020]">Checkout Order</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
          <Lock size={14} />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Forms (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E6E1D7] space-y-6">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-[#E6E1D7] pb-4 text-xs font-semibold uppercase tracking-wider">
            <div className={`flex items-center gap-2 ${step === 1 ? 'text-[#202020]' : 'text-[#202020]/50'}`}>
              <span className="w-5 h-5 rounded-full bg-[#202020] text-white text-[10px] flex items-center justify-center">1</span>
              <span>Shipping Address</span>
            </div>
            <div className="h-[1px] w-12 bg-[#E6E1D7]" />
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-[#202020]' : 'text-[#202020]/50'}`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${step === 2 ? 'bg-[#202020] text-white' : 'bg-gray-200 text-gray-700'}`}>2</span>
              <span>Payment Option</span>
            </div>
          </div>

          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className="font-serif-heading text-lg font-bold text-[#202020]">Recipient & Delivery Address</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Full Name *</label>
                  <input 
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Email (For Order Updates) *</label>
                  <input 
                    type="email"
                    required
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Mobile Phone *</label>
                  <input 
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Postal Pincode *</label>
                  <input 
                    type="text"
                    required
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Address Line 1 *</label>
                <input 
                  type="text"
                  required
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  placeholder="House/Flat No., Building Name, Street"
                  className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">City *</label>
                  <input 
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">State *</label>
                  <input 
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] py-4 text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>CONTINUE TO PAYMENT METHOD</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Details */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E6E1D7] pb-3">
                <h3 className="font-serif-heading text-lg font-bold text-[#202020]">Select Payment Method</h3>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="text-xs text-[#202020]/70 hover:underline flex items-center gap-1"
                >
                  <ArrowLeft size={13} />
                  <span>Edit Address</span>
                </button>
              </div>

              {/* Payment Methods selector */}
              <div className="space-y-3">
                {/* COD Option */}
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#202020] bg-[#FAF8F5]' : 'border-[#E6E1D7] bg-white'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif-heading font-semibold text-sm text-[#202020] flex items-center gap-2">
                        <Banknote size={18} className="text-emerald-700" />
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 uppercase">RECOMMENDED</span>
                    </div>
                    <p className="text-xs text-[#202020]/70 mt-1 font-sans-body">
                      Pay cash or UPI directly to the courier agent upon receiving your luxury box.
                    </p>
                  </div>
                </label>

                {/* Card Option */}
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#202020] bg-[#FAF8F5]' : 'border-[#E6E1D7] bg-white'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-serif-heading font-semibold text-sm text-[#202020] flex items-center gap-2">
                      <CreditCard size={18} />
                      Credit / Debit Card (Demo)
                    </span>
                    <p className="text-xs text-[#202020]/70 mt-1 font-sans-body">
                      Visa, Mastercard, American Express, RuPay.
                    </p>
                    
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-3 pt-3 border-t border-[#E6E1D7]">
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-[#202020]">Card Number</label>
                          <input 
                            type="text" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-white p-2 border border-[#E6E1D7] text-xs font-mono mt-1" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-semibold uppercase text-[#202020]">Expiry Date</label>
                            <input 
                              type="text" 
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-white p-2 border border-[#E6E1D7] text-xs font-mono mt-1" 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold uppercase text-[#202020]">CVV Code</label>
                            <input 
                              type="password" 
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full bg-white p-2 border border-[#E6E1D7] text-xs font-mono mt-1" 
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* UPI Option */}
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#202020] bg-[#FAF8F5]' : 'border-[#E6E1D7] bg-white'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'upi'} 
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-serif-heading font-semibold text-sm text-[#202020] flex items-center gap-2">
                      <Smartphone size={18} />
                      UPI Instant Transfer (Google Pay, PhonePe, Paytm)
                    </span>
                    
                    {paymentMethod === 'upi' && (
                      <div className="mt-3">
                        <label className="text-[10px] font-semibold uppercase text-[#202020]">VPA / UPI ID</label>
                        <input 
                          type="text" 
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-white p-2 border border-[#E6E1D7] text-xs font-mono mt-1" 
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Note about Demo Checkout */}
              <div className="p-3 bg-[#EBE5DB] text-[11px] text-[#202020]/80 font-sans-body border border-[#D8CFC1]">
                <strong>Note:</strong> This is a demo checkout simulation for MAISON NOVE. No actual bank charge will occur. Order confirmation will be generated instantly.
              </div>

              <button
                type="submit"
                className="w-full bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] py-4 text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <ShieldCheck size={18} />
                <span>PLACE ORDER (₹{cartTotal.toLocaleString('en-IN')})</span>
              </button>
            </form>
          )}

        </div>

        {/* Right Sticky Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E6E1D7] space-y-6 sticky top-24">
          <h3 className="font-serif-heading text-xl font-bold text-[#202020] border-b border-[#E6E1D7] pb-3">
            Order Summary ({cart.length})
          </h3>

          {/* Cart Items list */}
          <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
            {cart.map(item => (
              <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="flex gap-3 text-xs">
                <img src={item.product.primaryImage} alt={item.product.name} className="w-14 h-18 object-cover bg-[#F2EFE9] shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif-heading font-semibold text-[#202020] line-clamp-1">{item.product.name}</h5>
                    <span className="text-[11px] text-[#202020]/70 font-sans-body">
                      {item.selectedColor.name} · Size {item.selectedSize} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-[#202020] tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E6E1D7] pt-4 space-y-2 text-xs font-sans-body">
            <div className="flex justify-between text-[#202020]/75">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold text-[#202020]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Privilege Code ({appliedPromo?.code})</span>
                <span className="tabular-nums font-semibold">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-[#202020]/75">
              <span>Express Delivery</span>
              <span className="tabular-nums font-semibold text-[#202020]">
                {shippingFee === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : `₹${shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-[#202020] border-t border-[#E6E1D7] pt-3">
              <span className="font-serif-heading">TOTAL PAYABLE</span>
              <span className="tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
