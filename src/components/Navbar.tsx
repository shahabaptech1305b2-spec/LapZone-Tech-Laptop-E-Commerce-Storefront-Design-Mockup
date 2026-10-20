import React from 'react';
import { Search, Heart, ShoppingBag, Laptop, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  comparisonCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenComparison: () => void;
  onOpenMockup: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  comparisonCount,
  onOpenCart,
  onOpenWishlist,
  onOpenComparison,
  onOpenMockup,
  searchQuery,
  onSearchChange,
  onOpenAccount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 text-white backdrop-blur-md bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white whitespace-nowrap"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#06B6D4] to-cyan-700 flex items-center justify-center text-slate-900 shadow-sm shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-white">
                Lap<span className="text-[#06B6D4]">Zone</span>
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => onSelectCategory('all')}
              className={`hover:text-[#06B6D4] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'text-[#06B6D4] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSelectCategory('gaming')}
              className={`hover:text-[#06B6D4] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'gaming' ? 'text-[#06B6D4] font-semibold' : ''
              }`}
            >
              Gaming Laptops
            </button>
            <button
              onClick={() => onSelectCategory('business')}
              className={`hover:text-[#06B6D4] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'business' ? 'text-[#06B6D4] font-semibold' : ''
              }`}
            >
              Business / MacBooks
            </button>
            <button
              onClick={() => onSelectCategory('student')}
              className={`hover:text-[#06B6D4] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'student' ? 'text-[#06B6D4] font-semibold' : ''
              }`}
            >
              Budget Laptops
            </button>
            <button
              onClick={() => onSelectCategory('creator')}
              className={`hover:text-[#06B6D4] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'creator' ? 'text-[#06B6D4] font-semibold' : ''
              }`}
            >
              Creator & Studio
            </button>
            <a
              href="#deals"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-1 font-semibold"
            >
              Deals
            </a>
          </nav>

          {/* Zone 3: Utility Group & Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input with RAM/Processor hint */}
            <div className="relative hidden sm:block w-48 md:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search RAM, GPU, CPU..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/90 text-sm text-slate-200 pl-9 pr-3 py-1.5 rounded-lg border border-slate-700 focus:border-[#06B6D4] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] transition-all placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Compare Drawer Trigger */}
            <button
              onClick={onOpenComparison}
              aria-label="Compare Laptops"
              title="Compare Models"
              className="relative p-2 text-slate-300 hover:text-[#06B6D4] hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              title="Saved Laptops"
              className="relative p-2 text-slate-300 hover:text-[#06B6D4] hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="flex items-center gap-2 bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 px-3.5 py-1.5 rounded-lg font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-slate-950 text-cyan-400 text-[11px] font-mono px-1.5 py-0.2 rounded font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mockup Preview & PSD Asset Trigger */}
            <button
              onClick={onOpenMockup}
              title="View Mockup JPG & PSD Breakdown"
              className="flex items-center gap-1.5 border border-cyan-500/40 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#06B6D4]" />
              <span className="hidden md:inline">Mockup / PSD</span>
            </button>

            {/* Account Quick Button */}
            <button
              onClick={onOpenAccount}
              className="text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-2.5 py-1.5 rounded-lg font-medium transition-colors hidden sm:inline-block cursor-pointer"
            >
              Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
