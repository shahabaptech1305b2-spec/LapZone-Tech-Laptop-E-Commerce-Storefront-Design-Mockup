import React from 'react';
import { X, ShoppingBag, Heart, SlidersHorizontal, ShieldCheck, CheckCircle2, Cpu, HardDrive, Monitor, Battery, Scale } from 'lucide-react';
import { Laptop } from '../types/laptop';
import { formatPKR } from '../utils/format';

interface QuickViewModalProps {
  laptop: Laptop | null;
  onClose: () => void;
  isInWishlist: boolean;
  isInComparison: boolean;
  onToggleWishlist: (laptop: Laptop) => void;
  onToggleComparison: (laptop: Laptop) => void;
  onAddToCart: (laptop: Laptop) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  laptop,
  onClose,
  isInWishlist,
  isInComparison,
  onToggleWishlist,
  onToggleComparison,
  onAddToCart,
}) => {
  if (!laptop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#06B6D4] bg-cyan-50 px-2 py-0.5 rounded">
              {laptop.brand}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-600">Model Quick Specifications</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product Image & Badges */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 h-64 flex items-center justify-center border border-slate-200">
              <img
                src={laptop.image}
                alt={laptop.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {laptop.badge && (
                <div className="absolute top-3 left-3 bg-[#0F172A] text-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded">
                  {laptop.badge}
                </div>
              )}
            </div>

            {/* Highlights List */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Key Machine Highlights
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {laptop.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Title, Price, Detailed Specs Table, Actions */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-extrabold text-[#0F172A] leading-snug">
                {laptop.name}
              </h2>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-[#0F172A] font-mono">
                    {formatPKR(laptop.price)}
                  </span>
                  {laptop.originalPrice > laptop.price && (
                    <span className="text-xs text-slate-400 line-through font-mono">
                      {formatPKR(laptop.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  Official 0% Interest EMI: {formatPKR(laptop.installmentPerMonth)}/month (12 months)
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs divide-y divide-slate-100">
                <div className="flex p-2.5 bg-slate-50">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" /> Processor
                  </span>
                  <span className="text-slate-800 font-semibold flex-1">{laptop.specs.processor}</span>
                </div>
                <div className="flex p-2.5">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-[#06B6D4]" /> RAM Memory
                  </span>
                  <span className="text-slate-800 font-semibold flex-1">{laptop.specs.ram}</span>
                </div>
                <div className="flex p-2.5 bg-slate-50">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-[#06B6D4]" /> Storage (SSD)
                  </span>
                  <span className="text-slate-800 font-semibold flex-1">{laptop.specs.storage}</span>
                </div>
                <div className="flex p-2.5">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-[#06B6D4]" /> Display
                  </span>
                  <span className="text-slate-800 font-semibold flex-1">{laptop.specs.screen}</span>
                </div>
                <div className="flex p-2.5 bg-slate-50">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5 text-[#06B6D4]" /> Battery
                  </span>
                  <span className="text-slate-800 font-semibold flex-1">{laptop.specs.battery}</span>
                </div>
                <div className="flex p-2.5">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#06B6D4]" /> Weight
                  </span>
                  <span className="text-slate-800 font-semibold flex-1">{laptop.specs.weight}</span>
                </div>
                <div className="flex p-2.5 bg-slate-50">
                  <span className="w-28 text-slate-500 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" /> Warranty
                  </span>
                  <span className="text-emerald-700 font-semibold flex-1">{laptop.specs.warranty}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 space-y-2">
              <button
                onClick={() => {
                  onAddToCart(laptop);
                  onClose();
                }}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#06B6D4]" />
                Add to Cart ({formatPKR(laptop.price)})
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onToggleWishlist(laptop)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isInWishlist
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  {isInWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
                </button>

                <button
                  onClick={() => onToggleComparison(laptop)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isInComparison
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {isInComparison ? 'In Comparison' : 'Compare Model'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
