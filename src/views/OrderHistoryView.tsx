import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Calendar, Truck, ArrowRight } from 'lucide-react';

export const OrderHistoryView: React.FC = () => {
  const { orders, setView } = useShop();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-[#E6E1D7] pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-semibold">CLIENT ACCOUNT</span>
          <h1 className="font-serif-heading text-3xl font-bold text-[#202020]">Order History</h1>
        </div>

        <button 
          onClick={() => setView('shop')}
          className="text-xs uppercase tracking-widest font-semibold text-[#202020] hover:underline"
        >
          EXPLORE CATALOG
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#E6E1D7] p-12 text-center space-y-4 py-20">
          <Package size={48} className="stroke-1 text-[#D8CFC1] mx-auto" />
          <h2 className="font-serif-heading text-xl font-bold text-[#202020]">No Order History Recorded</h2>
          <p className="text-xs text-[#202020]/60 max-w-sm mx-auto font-sans-body">
            You have not placed any orders yet. Explore our luxury collection to place your first order.
          </p>
          <button
            onClick={() => setView('shop')}
            className="bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] px-6 py-3 font-semibold hover:bg-[#3D3D3D] transition-colors"
          >
            DISCOVER CATALOG
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-[#E6E1D7] p-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E1D7] pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-heading text-xl font-bold text-[#202020]">#{order.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#202020]/60 mt-1 font-sans-body">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {order.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Truck size={13} />
                      Estimated: {order.estimatedDelivery}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#202020]/60 block font-medium">TOTAL PAYABLE</span>
                  <span className="font-sans-body font-bold text-lg text-[#202020] tabular-nums">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.map(item => (
                  <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="flex gap-3 p-2 bg-[#F7F5F0] border border-[#E6E1D7]">
                    <img src={item.product.primaryImage} alt={item.product.name} className="w-12 h-16 object-cover bg-gray-200 shrink-0" />
                    <div className="flex-1 flex flex-col justify-center">
                      <h5 className="font-serif-heading text-xs font-semibold text-[#202020] line-clamp-1">{item.product.name}</h5>
                      <span className="text-[10px] text-[#202020]/70 font-sans-body">
                        {item.selectedColor.name} · Size {item.selectedSize} × {item.quantity}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#202020] mt-1 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setView('confirmation');
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-[#202020] hover:underline flex items-center gap-1"
                >
                  <span>View Order Receipt</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
