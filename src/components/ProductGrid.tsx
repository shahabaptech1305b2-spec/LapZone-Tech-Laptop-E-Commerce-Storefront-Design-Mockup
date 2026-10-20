import React from 'react';
import { ProductCard } from './ProductCard';
import { Laptop as LaptopType, FilterState } from '../types/laptop';
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  laptops: LaptopType[];
  wishlistIds: string[];
  comparisonIds: string[];
  onToggleWishlist: (laptop: LaptopType) => void;
  onToggleComparison: (laptop: LaptopType) => void;
  onAddToCart: (laptop: LaptopType) => void;
  onQuickView: (laptop: LaptopType) => void;
  sortBy: FilterState['sortBy'];
  onSortChange: (sort: FilterState['sortBy']) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  laptops,
  wishlistIds,
  comparisonIds,
  onToggleWishlist,
  onToggleComparison,
  onAddToCart,
  onQuickView,
  sortBy,
  onSortChange,
  onResetFilters,
}) => {
  return (
    <div id="catalog-section" className="space-y-6">
      {/* Header Bar with Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Featured Laptops
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            100% Genuine, Brand New Box-Packed with Official 1-Year Local Warranty
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#06B6D4]"
          >
            <option value="featured">Featured / Best Sellers</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Grid of Laptops (4-column layout on desktop) */}
      {laptops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {laptops.map((laptop) => (
            <ProductCard
              key={laptop.id}
              laptop={laptop}
              isInWishlist={wishlistIds.includes(laptop.id)}
              isInComparison={comparisonIds.includes(laptop.id)}
              onToggleWishlist={onToggleWishlist}
              onToggleComparison={onToggleComparison}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">No laptops match your selected filters</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your budget range, processor platform, or RAM requirement to view more available machines.
          </p>
          <button
            onClick={onResetFilters}
            className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
