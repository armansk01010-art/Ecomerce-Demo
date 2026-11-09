import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Category, Gender } from '../types';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setCategory, 
    selectedGender, 
    setGender, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: Category[] = [
    'All', 
    'Tops & Shirts', 
    'Trousers & Tailoring', 
    'Outerwear & Jackets', 
    'Dresses & Sets'
  ];

  const genders: Gender[] = ['All', 'Women', 'Men', 'Unisex'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', '30', '32', '34', '36'];

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Gender match
      if (selectedGender !== 'All') {
        if (selectedGender === 'Women' && product.gender !== 'Women' && product.gender !== 'Unisex') return false;
        if (selectedGender === 'Men' && product.gender !== 'Men' && product.gender !== 'Unisex') return false;
      }
      // Size match
      if (selectedSizeFilter !== 'All' && !product.sizes.includes(selectedSizeFilter as any)) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSub && !matchesCat && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default order
    });
  }, [products, selectedCategory, selectedGender, selectedSizeFilter, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setCategory('All');
    setGender('All');
    setSelectedSizeFilter('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedGender !== 'All' || selectedSizeFilter !== 'All' || searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Title */}
      <div className="border-b border-[#E6E1D7] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-medium">MAISON NOVE ARCHIVE</span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#202020] mt-1">
            {selectedGender !== 'All' ? `${selectedGender}'s` : selectedCategory !== 'All' ? selectedCategory : 'Full Apparel Catalog'}
          </h1>
          <p className="text-xs text-[#202020]/70 mt-1 font-sans-body">
            Explore {filteredProducts.length} curated luxury garments crafted in Normandy flax and Mulberry silk.
          </p>
        </div>

        {/* Filter / Sort bar on desktop */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs font-sans-body">
            <ArrowUpDown size={14} className="text-[#202020]/60" />
            <span className="text-[#202020]/70 uppercase tracking-wider font-medium">SORT:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-white text-[#202020] text-xs font-medium py-2 px-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals First</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-wider px-4 py-2 flex items-center gap-2"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <aside className={`md:col-span-3 space-y-8 bg-white md:bg-transparent p-6 md:p-0 border md:border-none border-[#E6E1D7] ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          
          {/* Gender Filter Buttons */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#202020] border-b border-[#E6E1D7] pb-2">
              Department
            </h3>
            <div className="flex flex-col space-y-1">
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`text-left text-xs py-1.5 px-3 transition-colors ${
                    selectedGender === g 
                      ? 'bg-[#202020] text-[#F7F5F0] font-semibold' 
                      : 'text-[#202020]/80 hover:bg-[#EBE5DB]'
                  }`}
                >
                  {g === 'All' ? 'All Departments' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#202020] border-b border-[#E6E1D7] pb-2">
              Category
            </h3>
            <div className="flex flex-col space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-xs py-1.5 px-3 transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#202020] text-[#F7F5F0] font-semibold' 
                      : 'text-[#202020]/80 hover:bg-[#EBE5DB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#202020] border-b border-[#E6E1D7] pb-2">
              Size
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSizeFilter(size)}
                  className={`text-xs px-3 py-1 border transition-colors ${
                    selectedSizeFilter === size
                      ? 'bg-[#202020] text-[#F7F5F0] border-[#202020] font-bold'
                      : 'bg-white text-[#202020] border-[#E6E1D7] hover:border-[#202020]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="w-full text-xs uppercase tracking-wider text-red-600 hover:text-red-800 py-2 border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <X size={14} />
              <span>CLEAR ALL FILTERS</span>
            </button>
          )}

        </aside>

        {/* Products Grid Area */}
        <main className="md:col-span-9 space-y-6">
          
          {/* Active Filter Indicators */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#E6E1D7] text-xs">
              <span className="text-[#202020]/60 uppercase tracking-wider font-medium text-[10px]">Active Filters:</span>
              
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#EBE5DB] text-[#202020] px-2.5 py-1">
                  Category: {selectedCategory}
                  <button onClick={() => setCategory('All')} className="hover:text-red-600 ml-1">✕</button>
                </span>
              )}

              {selectedGender !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#EBE5DB] text-[#202020] px-2.5 py-1">
                  Gender: {selectedGender}
                  <button onClick={() => setGender('All')} className="hover:text-red-600 ml-1">✕</button>
                </span>
              )}

              {selectedSizeFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#EBE5DB] text-[#202020] px-2.5 py-1">
                  Size: {selectedSizeFilter}
                  <button onClick={() => setSelectedSizeFilter('All')} className="hover:text-red-600 ml-1">✕</button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-[#EBE5DB] text-[#202020] px-2.5 py-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600 ml-1">✕</button>
                </span>
              )}

              <button 
                onClick={clearAllFilters} 
                className="text-xs text-red-600 hover:underline font-medium ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Grid Render */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E6E1D7] p-12 text-center space-y-4 py-20">
              <p className="font-serif-heading text-xl font-bold text-[#202020]">No garments match your selected filter criteria</p>
              <p className="text-xs text-[#202020]/60 max-w-sm mx-auto font-sans-body">
                Try clearing active filters or adjusting search keywords to explore our full collection.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium hover:bg-[#3D3D3D] transition-colors"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
