import React from 'react';
import { Laptop, Cpu, HardDrive, Monitor, Heart, ShoppingBag, Eye, SlidersHorizontal, Check } from 'lucide-react';
import { Laptop as LaptopType } from '../types/laptop';
import { formatPKR } from '../utils/format';

interface ProductCardProps {
  laptop: LaptopType;
  isInWishlist: boolean;
  isInComparison: boolean;
  onToggleWishlist: (laptop: LaptopType) => void;
  onToggleComparison: (laptop: LaptopType) => void;
  onAddToCart: (laptop: LaptopType) => void;
  onQuickView: (laptop: LaptopType) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  laptop,
  isInWishlist,
  isInComparison,
  onToggleWishlist,
  onToggleComparison,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative">
      {/* Top Image & Badges Container */}
      <div className="relative bg-slate-900 h-52 overflow-hidden flex items-center justify-center">
        <img
          src={laptop.image}
          alt={laptop.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

        {/* Badge in top-left */}
        {laptop.badge && (
          <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
            {laptop.badge}
          </div>
        )}

        {/* Top-right Actions: Wishlist */}
        <button
          onClick={() => onToggleWishlist(laptop)}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isInWishlist
              ? 'bg-rose-500 text-white'
              : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Hover Quick View overlay */}
        <button
          onClick={() => onQuickView(laptop)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-600" />
          Quick View
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Brand & Rating kicker */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-slate-700 uppercase tracking-wider">{laptop.brand}</span>
            <span className="flex items-center gap-1 font-mono text-amber-500 font-semibold">
              ★ {laptop.rating.toFixed(1)} <span className="text-slate-400 font-normal">({laptop.reviewsCount})</span>
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(laptop)}
            className="font-bold text-sm text-[#0F172A] line-clamp-2 hover:text-[#06B6D4] transition-colors cursor-pointer"
            title={laptop.name}
          >
            {laptop.name}
          </h3>
        </div>

        {/* Key Specs Bullets (Minimal Icons) */}
        <div className="bg-slate-50 p-2.5 rounded-lg space-y-1.5 text-xs text-slate-600 border border-slate-100">
          <div className="flex items-center gap-2 truncate">
            <Monitor className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
            <span className="truncate">{laptop.specs.screen}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Cpu className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
            <span className="truncate">{laptop.specs.ram} · {laptop.specs.processor.split('(')[0]}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <HardDrive className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
            <span className="truncate">{laptop.specs.storage} · {laptop.specs.gpu.split('(')[0]}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-base sm:text-lg text-[#0F172A] font-mono">
              {formatPKR(laptop.price)}
            </span>
            {laptop.originalPrice > laptop.price && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {formatPKR(laptop.originalPrice)}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            EMI: <span className="text-cyan-700 font-mono font-semibold">{formatPKR(laptop.installmentPerMonth)}/mo</span> (0% 12-mo)
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center gap-2">
          {/* Add to Cart */}
          <button
            onClick={() => onAddToCart(laptop)}
            className="flex-1 bg-[#0F172A] hover:bg-slate-800 active:bg-black text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#06B6D4]" />
            Add to Cart
          </button>

          {/* Compare toggle */}
          <button
            onClick={() => onToggleComparison(laptop)}
            title={isInComparison ? 'Remove from comparison' : 'Compare model'}
            className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
              isInComparison
                ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {isInComparison ? (
              <Check className="w-3.5 h-3.5 text-cyan-600 stroke-[3]" />
            ) : (
              <SlidersHorizontal className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
