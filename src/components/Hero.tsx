import React from 'react';
import { ArrowRight, SlidersHorizontal, ShieldCheck, Truck, CreditCard } from 'lucide-react';

interface HeroProps {
  onBrowseLaptops: () => void;
  onOpenComparison: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseLaptops, onOpenComparison }) => {
  return (
    <section className="relative bg-[#0F172A] text-white overflow-hidden border-b border-slate-800">
      {/* Subtle tech background lighting glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#06B6D4] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
              Pakistan's Premier Laptop Authority
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Power Up Your Productivity & Gaming
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Explore top-tier laptops from Apple, Dell, HP, Lenovo, and ASUS with official warranty, verified benchmark performance, and doorstep delivery across Pakistan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBrowseLaptops}
                className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-lg text-sm sm:text-base transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                Browse Laptops
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenComparison}
                className="border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-semibold px-6 py-3.5 rounded-lg text-sm sm:text-base transition-all bg-slate-900/60 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#06B6D4]" />
                Compare Models
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-3 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>100% Genuine Box-Sealed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Truck className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Insured Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CreditCard className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>0% Interest Bank EMI</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Hero Laptop Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/80 shadow-2xl shadow-cyan-950/50 group">
              <img
                src="/src/assets/images/hero_lapzone_laptop_1792487007933.jpg"
                alt="Ultra-sleek Titanium Gaming and Productivity Laptop"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Float Spec Card on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-200">
                <div>
                  <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Spotlight Machine</div>
                  <div className="font-semibold text-white text-sm">Titan Arc QHD+ 165Hz Edition</div>
                  <div className="text-slate-400 text-[11px]">Intel Core i9 13th Gen · RTX 4070 · 32GB RAM</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Special Promo</div>
                  <div className="font-mono font-bold text-[#06B6D4] text-sm">PKR 385,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
