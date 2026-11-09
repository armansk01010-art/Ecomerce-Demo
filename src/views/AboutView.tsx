import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Scissors, Globe, Shield } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setView } = useShop();

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* Hero Banner */}
      <section className="bg-[#202020] text-[#F7F5F0] py-20 px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#D8CFC1]">THE ARCHIVE STORY</span>
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Quiet Luxury. Timeless Form.
          </h1>
          <p className="font-sans-body text-sm sm:text-base text-[#D8CFC1]/90 max-w-2xl mx-auto leading-relaxed">
            MAISON NOVE was founded on a singular conviction: luxury should be quiet, architectural, and rooted in the tactile purity of natural textiles.
          </p>
        </div>
      </section>

      {/* Grid Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-semibold">OUR GENESIS</span>
            <h2 className="font-serif-heading text-3xl font-bold text-[#202020]">
              Bridging Normandy Flax & Indian Artisan Heritage
            </h2>
            <p className="text-xs sm:text-sm text-[#202020]/80 leading-relaxed font-sans-body">
              Established in 2021, MAISON NOVE unites European textile heritage with Indian bespoke tailoring. Our flax linen is harvested in northern Normandy, while our silk and pattern engineering are hand-worked in our Bandra studio in Mumbai.
            </p>
            <p className="text-xs sm:text-sm text-[#202020]/80 leading-relaxed font-sans-body">
              Instead of producing mass seasonal drops, we craft small limited batches of 100-200 pieces per garment, ensuring meticulous seam construction and zero excess inventory.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 overflow-hidden border border-[#D8CFC1] bg-[#EBE5DB]">
            <img 
              src="/images/atelier-craftsmanship.webp" 
              alt="Atelier Craftsman Pattern Cutting"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 4 Pillars of Craftsmanship */}
      <section className="bg-white py-16 border-y border-[#E6E1D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-medium">FOUNDATIONAL PILLARS</span>
            <h2 className="font-serif-heading text-3xl font-bold text-[#202020]">The Four Rules of Maison Nove</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#F7F5F0] border border-[#E6E1D7] space-y-3">
              <div className="p-3 bg-[#202020] text-[#D8CFC1] w-fit">
                <Scissors size={20} />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-[#202020]">1. Pattern Integrity</h3>
              <p className="text-xs text-[#202020]/75 leading-relaxed font-sans-body">
                Every silhouette undergoes 12 fitting iterations before release to ensure fluid drape without restrictive tightness.
              </p>
            </div>

            <div className="p-6 bg-[#F7F5F0] border border-[#E6E1D7] space-y-3">
              <div className="p-3 bg-[#202020] text-[#D8CFC1] w-fit">
                <Globe size={20} />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-[#202020]">2. Traceable Sourcing</h3>
              <p className="text-xs text-[#202020]/75 leading-relaxed font-sans-body">
                100% Normandy flax linen, 22-momme Mulberry silk, and GOTS certified organic cotton—zero synthetic blends.
              </p>
            </div>

            <div className="p-6 bg-[#F7F5F0] border border-[#E6E1D7] space-y-3">
              <div className="p-3 bg-[#202020] text-[#D8CFC1] w-fit">
                <Shield size={20} />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-[#202020]">3. Fair Wage Guarantee</h3>
              <p className="text-xs text-[#202020]/75 leading-relaxed font-sans-body">
                Our tailors earn 2.5x regional minimum wage with full healthcare and artisan retirement dividends.
              </p>
            </div>

            <div className="p-6 bg-[#F7F5F0] border border-[#E6E1D7] space-y-3">
              <div className="p-3 bg-[#202020] text-[#D8CFC1] w-fit">
                <Sparkles size={20} />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-[#202020]">4. Circular Life</h3>
              <p className="text-xs text-[#202020]/75 leading-relaxed font-sans-body">
                We offer free lifetime button replacements and seam repairs for all registered MAISON NOVE clients.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Explore */}
      <section className="max-w-3xl mx-auto text-center px-4 space-y-6">
        <h2 className="font-serif-heading text-3xl font-bold text-[#202020]">Explore Our Seasonal Atelier</h2>
        <p className="text-xs sm:text-sm text-[#202020]/80 font-sans-body leading-relaxed">
          Discover structured double-breasted blazers, bias-cut silk midi dresses, and enzyme-washed French linen shirts.
        </p>
        <button
          onClick={() => setView('shop')}
          className="bg-[#202020] text-[#F7F5F0] hover:bg-[#3D3D3D] text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 transition-colors"
        >
          EXPLORE THE ARCHIVE CATALOG
        </button>
      </section>

    </div>
  );
};
