import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Feather, Scissors } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, setView, setCategory, setGender } = useShop();
  const [heroLoaded, setHeroLoaded] = useState(false);

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  const handleGenderSelect = (gender: 'Men' | 'Women') => {
    setGender(gender);
  };

  const handleCategorySelect = (category: any) => {
    setCategory(category);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. EDITORIAL HERO BANNER */}
      <section className="relative w-full bg-[#202020] text-[#F7F5F0] overflow-hidden min-h-[80vh] flex items-center">
        {/* Skeleton loader background */}
        {!heroLoaded && (
          <div className="absolute inset-0 bg-[#262626] animate-pulse" />
        )}

        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 opacity-75 mix-blend-luminosity">
          <img 
            src="/images/hero-editorial-campaign.webp" 
            alt="MAISON NOVE Editorial Campaign"
            width={1600}
            height={900}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setHeroLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
              heroLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-[#202020]/40 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-medium text-[#D8CFC1]">
              <span>AUTUMN / WINTER '26 ARCHIVE</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] text-wrap">
              Architectural Tailoring & Pure Silk.
            </h1>

            <p className="font-sans-body text-sm sm:text-base text-[#D8CFC1]/90 leading-relaxed max-w-xl">
              An international fashion atelier dedicated to modern minimalism, Normandy flax linen, and unstructured fluid silhouettes engineered for effortless elegance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setView('shop')}
                className="bg-[#F7F5F0] hover:bg-white text-[#202020] text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 flex items-center gap-2 transition-all shadow-lg hover:gap-3"
              >
                <span>EXPLORE CATALOG</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setView('about')}
                className="bg-transparent hover:bg-white/10 text-[#F7F5F0] border border-[#D8CFC1]/40 text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 transition-all"
              >
                ATELIER PHILOSOPHY
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CURATED GENDER & COLLECTION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-medium">CURATED DEPARTMENTS</span>
          <h2 className="font-serif-heading text-3xl font-bold text-[#202020] mt-1">Explore By Line</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Women Card */}
          <div 
            onClick={() => handleGenderSelect('Women')}
            className="group relative h-[450px] overflow-hidden cursor-pointer bg-[#EBE5DB] border border-[#E6E1D7]"
          >
            <img 
              src="/images/women-silk-dress-primary.webp" 
              alt="Women's Collection"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-6 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8CFC1] font-medium">LINE NO. 01</span>
              <h3 className="font-serif-heading text-3xl font-bold mt-1">Women's Collection</h3>
              <p className="text-xs text-[#D8CFC1]/80 mt-1 font-sans-body">Mulberry silk dresses, linen sets & fluid blazers.</p>
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white group-hover:underline">
                <span>SHOP WOMEN</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Men Card */}
          <div 
            onClick={() => handleGenderSelect('Men')}
            className="group relative h-[450px] overflow-hidden cursor-pointer bg-[#EBE5DB] border border-[#E6E1D7]"
          >
            <img 
              src="/images/lookbook-men-collection.webp" 
              alt="Men's Collection"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-6 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8CFC1] font-medium">LINE NO. 02</span>
              <h3 className="font-serif-heading text-3xl font-bold mt-1">Men's Collection</h3>
              <p className="text-xs text-[#D8CFC1]/80 mt-1 font-sans-body">French Oxford linen shirts, wool trousers & selvedge denim.</p>
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white group-hover:underline">
                <span>SHOP MEN</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-[#E6E1D7]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-medium">SEASONAL PREVIEW</span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#202020] mt-1">New Arrivals</h2>
          </div>
          <button 
            onClick={() => setView('shop')}
            className="mt-2 sm:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-[#202020] hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. ATELIER CRAFTSMANSHIP SPOTLIGHT */}
      <section className="bg-[#EBE5DB] py-20 border-y border-[#D8CFC1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative aspect-16/9 lg:aspect-4/3 overflow-hidden border border-[#D8CFC1] bg-[#D8CFC1]">
              <img 
                src="/images/atelier-craftsmanship.webp" 
                alt="MAISON NOVE Craftsmanship Studio"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#202020]/70">OUR MANIFESTO</span>
              
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#202020] leading-tight">
                "We design for quiet confidence, not loud trend cycles."
              </h2>

              <p className="text-xs sm:text-sm text-[#202020]/80 leading-relaxed font-sans-body">
                Every MAISON NOVE piece is developed across our dual studios in Normandy and Mumbai. We source unbleached European flax, 22-momme Mulberry silk, and GOTS organic cotton to craft garments that wear gracefully with age.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#D8CFC1]">
                <div>
                  <div className="flex items-center gap-2 text-[#202020] font-serif-heading text-lg font-bold">
                    <Scissors size={18} />
                    <span>Single Tailor Assembly</span>
                  </div>
                  <p className="text-xs text-[#202020]/60 mt-1 font-sans-body">Each blazer is cut and assembled by a master tailor from neck to hem.</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#202020] font-serif-heading text-lg font-bold">
                    <Feather size={18} />
                    <span>Zero Chemical Wash</span>
                  </div>
                  <p className="text-xs text-[#202020]/60 mt-1 font-sans-body">Natural organic enzyme washes preserve fiber soft feel and strength.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setView('about')}
                  className="bg-[#202020] text-[#F7F5F0] hover:bg-[#3D3D3D] text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 transition-colors"
                >
                  READ OUR STORY
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-[#E6E1D7]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-medium">MOST COVETED</span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#202020] mt-1">Bestselling Icons</h2>
          </div>
          <button 
            onClick={() => setView('shop')}
            className="mt-2 sm:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-[#202020] hover:underline flex items-center gap-1"
          >
            <span>EXPLORE FULL SHOP</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. CATEGORY QUICK LINKS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E6E1D7] p-8 sm:p-12 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-medium">DISCOVER CATEGORIES</span>
          <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#202020]">Tailored Essentials for Everyday Sophistication</h3>
          
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {['Tops & Shirts', 'Trousers & Tailoring', 'Outerwear & Jackets', 'Dresses & Sets'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="bg-[#F7F5F0] hover:bg-[#202020] hover:text-[#F7F5F0] text-[#202020] text-xs uppercase tracking-wider px-5 py-3 border border-[#E6E1D7] transition-all font-medium"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
