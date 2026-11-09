import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { currentOrder, setView } = useShop();

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif-heading text-2xl font-bold text-[#202020]">No recent order found</h2>
        <button
          onClick={() => setView('shop')}
          className="bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-widest px-6 py-3 font-semibold"
        >
          RETURN TO CATALOG
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Confirmation Banner */}
      <div className="bg-white border border-[#E6E1D7] p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#202020]/60 block">ATELIER RECEIPT</span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#202020]">
          Thank You, {currentOrder.shippingAddress.fullName.split(' ')[0]}
        </h1>
        <p className="text-xs sm:text-sm text-[#202020]/80 font-sans-body max-w-lg mx-auto">
          Your order <strong className="font-mono text-[#202020]">#{currentOrder.id}</strong> has been received and registered at our Mumbai Atelier.
        </p>

        <div className="inline-flex items-center gap-2 bg-[#F7F5F0] px-4 py-2 border border-[#E6E1D7] text-xs text-[#202020] font-sans-body font-medium">
          <Truck size={16} className="text-emerald-700" />
          <span>Estimated Delivery: <strong>{currentOrder.estimatedDelivery}</strong></span>
        </div>
      </div>

      {/* Simulated Tracking Timeline */}
      <div className="bg-white p-6 border border-[#E6E1D7] space-y-4">
        <h3 className="font-serif-heading text-lg font-bold text-[#202020] border-b border-[#E6E1D7] pb-3">
          Fulfilment Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans-body">
          <div className="flex flex-col items-center text-center space-y-2 p-3 bg-[#F7F5F0] border border-[#202020]">
            <span className="w-6 h-6 rounded-full bg-[#202020] text-white text-[10px] flex items-center justify-center font-bold">✓</span>
            <span className="font-semibold text-[#202020]">1. Confirmed</span>
            <span className="text-[10px] text-[#202020]/60">{currentOrder.date}</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-3 bg-[#FAF8F5] border border-emerald-300">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">●</span>
            <span className="font-semibold text-emerald-800">2. Atelier Inspection</span>
            <span className="text-[10px] text-[#202020]/60">Hand finishing seam check</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-3 bg-white border border-gray-200 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-[10px] flex items-center justify-center">3</span>
            <span>3. Express Dispatch</span>
            <span className="text-[10px]">Pending courier handoff</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-3 bg-white border border-gray-200 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-[10px] flex items-center justify-center">4</span>
            <span>4. Delivered</span>
            <span className="text-[10px]">{currentOrder.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Order Itemized Receipt Details */}
      <div className="bg-white p-6 sm:p-8 border border-[#E6E1D7] space-y-6">
        <div className="flex items-center justify-between border-b border-[#E6E1D7] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#202020]/60 block font-medium">Order Number</span>
            <span className="font-serif-heading font-bold text-xl text-[#202020]">#{currentOrder.id}</span>
          </div>
          
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#202020] hover:underline border border-[#E6E1D7] px-3 py-1.5 bg-[#F7F5F0]"
          >
            <Printer size={14} />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans-body border-b border-[#E6E1D7] pb-6">
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#202020] mb-2">Delivery Address</h4>
            <p className="font-medium text-[#202020]">{currentOrder.shippingAddress.fullName}</p>
            <p className="text-[#202020]/75">{currentOrder.shippingAddress.addressLine1}</p>
            {currentOrder.shippingAddress.addressLine2 && <p className="text-[#202020]/75">{currentOrder.shippingAddress.addressLine2}</p>}
            <p className="text-[#202020]/75">{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}</p>
            <p className="text-[#202020]/75 mt-1 font-mono">Mobile: {currentOrder.shippingAddress.phone}</p>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#202020] mb-2">Payment Summary</h4>
            <p className="capitalize">Method: <strong className="text-[#202020]">{currentOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : currentOrder.paymentMethod.toUpperCase()}</strong></p>
            <p className="mt-1">Status: <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 uppercase">VERIFIED</span></p>
            <p className="mt-1 text-[#202020]/75">Notification sent to: {currentOrder.shippingAddress.email}</p>
          </div>
        </div>

        {/* Garments Table */}
        <div className="space-y-3">
          <h4 className="font-serif-heading text-sm font-semibold text-[#202020]">Garments Ordered</h4>
          
          <div className="divide-y divide-[#E6E1D7] border-y border-[#E6E1D7]">
            {currentOrder.items.map(item => (
              <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.product.primaryImage} alt={item.product.name} className="w-12 h-16 object-cover bg-[#F2EFE9]" />
                  <div>
                    <h5 className="font-serif-heading font-semibold text-[#202020]">{item.product.name}</h5>
                    <span className="text-[11px] text-[#202020]/70 font-sans-body">
                      {item.selectedColor.name} · Size {item.selectedSize} × {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono font-semibold text-[#202020] tabular-nums">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-2 text-xs font-sans-body max-w-xs ml-auto pt-2">
          <div className="flex justify-between text-[#202020]/75">
            <span>Subtotal</span>
            <span className="tabular-nums font-semibold">₹{currentOrder.subtotal.toLocaleString('en-IN')}</span>
          </div>

          {currentOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Privilege Discount</span>
              <span className="tabular-nums font-semibold">- ₹{currentOrder.discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between text-[#202020]/75">
            <span>Express Shipping</span>
            <span className="tabular-nums font-semibold">
              {currentOrder.shippingFee === 0 ? 'FREE' : `₹${currentOrder.shippingFee}`}
            </span>
          </div>

          <div className="flex justify-between text-base font-bold text-[#202020] border-t border-[#E6E1D7] pt-2">
            <span className="font-serif-heading">TOTAL PAID / COD</span>
            <span className="tabular-nums">₹{currentOrder.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => setView('orders')}
          className="text-xs uppercase tracking-widest text-[#202020] hover:underline font-semibold"
        >
          VIEW ORDER HISTORY
        </button>

        <button
          onClick={() => setView('shop')}
          className="bg-[#202020] text-[#F7F5F0] hover:bg-[#3D3D3D] text-xs uppercase tracking-[0.2em] font-semibold px-8 py-3.5 flex items-center gap-2 transition-colors"
        >
          <span>CONTINUE SHOPPING</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};
