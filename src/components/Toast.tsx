import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300 pointer-events-none">
      <div className="bg-[#202020] text-[#F7F5F0] px-5 py-4 shadow-xl border border-[#3D3D3D] flex items-center gap-3.5 max-w-sm">
        <CheckCircle2 size={18} className="text-[#D8CFC1] shrink-0" />
        <div>
          <h5 className="font-serif-heading text-xs font-semibold tracking-wide uppercase text-[#F7F5F0]">
            {toast.title}
          </h5>
          <p className="text-[11px] text-[#D8CFC1] font-sans-body leading-snug mt-0.5">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
};
