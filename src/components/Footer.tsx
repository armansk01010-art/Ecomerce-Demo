import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, RefreshCw, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, setCategory, setGender, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Newsletter Error', 'Please enter a valid email address');
      return;
    }
    showToast('Subscribed to Gazette', 'Welcome to MAISON NOVE Gazette. You will receive private previews.');
    setEmail('');
  };

  const handleNavCategory = (cat: any) => {
    setCategory(cat);
    setView('shop');
  };

  return (
    <footer className="bg-[#202020] text-[#F7F5F0] pt-16 pb-12 border-t border-[#383838]">
      {/* Brand Guarantees / Service Markers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#333333]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2A2A2A] text-[#D8CFC1] shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-serif-heading text-lg tracking-wide text-[#F7F5F0] mb-1">Complimentary Shipping</h4>
              <p className="text-xs text-[#D8CFC1]/80 leading-relaxed font-sans-body">
                Express door delivery across all Indian pincodes on orders over ₹2,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2A2A2A] text-[#D8CFC1] shrink-0">
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 className="font-serif-heading text-lg tracking-wide text-[#F7F5F0] mb-1">14-Day Private Returns</h4>
              <p className="text-xs text-[#D8CFC1]/80 leading-relaxed font-sans-body">
                Complimentary home pickup for effortless exchange or full refund.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2A2A2A] text-[#D8CFC1] shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-serif-heading text-lg tracking-wide text-[#F7F5F0] mb-1">Authentic Craftsmanship</h4>
              <p className="text-xs text-[#D8CFC1]/80 leading-relaxed font-sans-body">
                Hand-finished in small batches with certified European linen & Mulberry silk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4">
          <span className="font-serif-heading text-2xl font-bold tracking-[0.2em] text-[#F7F5F0]">
            MAISON NOVE
          </span>
          <p className="text-xs text-[#D8CFC1]/80 leading-relaxed max-w-sm font-sans-body">
            An international fashion atelier dedicated to modern luxury, quiet minimalism, and uncompromising craftsmanship in Normandy linen and organic textures.
          </p>
          <div className="pt-2 text-xs text-[#D8CFC1] font-mono tracking-wider">
            ATELIER PARIS & MUMBAI
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="lg:col-span-2 space-y-3 text-xs">
          <h5 className="uppercase tracking-[0.2em] text-[#D8CFC1] font-medium mb-4">Collections</h5>
          <ul className="space-y-2.5 text-[#F7F5F0]/80">
            <li>
              <button onClick={() => { setGender('Women'); setView('women'); }} className="hover:text-white transition-colors">
                Women's Line
              </button>
            </li>
            <li>
              <button onClick={() => { setGender('Men'); setView('men'); }} className="hover:text-white transition-colors">
                Men's Line
              </button>
            </li>
            <li>
              <button onClick={() => handleNavCategory('Outerwear & Jackets')} className="hover:text-white transition-colors">
                Blazers & Jackets
              </button>
            </li>
            <li>
              <button onClick={() => handleNavCategory('Trousers & Tailoring')} className="hover:text-white transition-colors">
                Tailored Trousers
              </button>
            </li>
            <li>
              <button onClick={() => handleNavCategory('Dresses & Sets')} className="hover:text-white transition-colors">
                Silk Dresses & Co-ords
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-3 text-xs">
          <h5 className="uppercase tracking-[0.2em] text-[#D8CFC1] font-medium mb-4">Maison</h5>
          <ul className="space-y-2.5 text-[#F7F5F0]/80">
            <li>
              <button onClick={() => setView('about')} className="hover:text-white transition-colors">
                Brand Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => setView('contact')} className="hover:text-white transition-colors">
                Flagship Boutiques
              </button>
            </li>
            <li>
              <button onClick={() => setView('contact')} className="hover:text-white transition-colors">
                Press & Inquiries
              </button>
            </li>
            <li>
              <button onClick={() => setView('about')} className="hover:text-white transition-colors">
                Material Traceability
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="lg:col-span-4 space-y-4">
          <h5 className="uppercase tracking-[0.2em] text-[#D8CFC1] font-medium">The Gazette</h5>
          <p className="text-xs text-[#D8CFC1]/80 leading-relaxed font-sans-body">
            Subscribe to receive private collection previews, seasonal lookbooks, and invitation-only events.
          </p>

          <form onSubmit={handleNewsletter} className="flex items-center gap-0 border border-[#444444] focus-within:border-[#D8CFC1] transition-colors">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-[#1A1A1A] text-[#F7F5F0] text-xs px-4 py-3 focus:outline-none placeholder:text-[#888888]"
            />
            <button 
              type="submit"
              className="bg-[#D8CFC1] text-[#202020] px-4 py-3 hover:bg-white transition-colors font-medium text-xs flex items-center gap-1 shrink-0 uppercase tracking-wider"
              aria-label="Subscribe"
            >
              <span>JOIN</span>
              <ArrowRight size={14} />
            </button>
          </form>
          <span className="text-[10px] text-[#D8CFC1]/60 block font-sans-body">
            By joining you agree to our privacy terms. Unsubscribe at any time.
          </span>
        </div>
      </div>

      {/* Bottom Bar - Unboxed metadata */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between text-xs text-[#D8CFC1]/60 gap-4">
        <div>
          © {new Date().getFullYear()} MAISON NOVE ARCHIVE. ALL RIGHTS RESERVED.
        </div>
        
        <div className="flex items-center gap-3">
          <span>Terms of Service</span>
          <span aria-hidden="true">·</span>
          <span>Privacy Policy</span>
          <span aria-hidden="true">·</span>
          <span>Cookie Preferences</span>
        </div>
      </div>
    </footer>
  );
};
