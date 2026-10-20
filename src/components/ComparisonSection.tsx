import React from 'react';
import { SlidersHorizontal, Check, ArrowRight } from 'lucide-react';
import { formatPKR } from '../utils/format';

interface ComparisonSectionProps {
  onOpenFullComparison: () => void;
  onAddToCartById: (id: string) => void;
}

const COMPARISON_PREVIEW_MODELS = [
  {
    id: 'apple-macbook-air-m2',
    name: 'MacBook Air M2',
    badge: 'Best for Work & Battery',
    brand: 'Apple',
    processor: 'Apple M2 (8-Core CPU / 8-Core GPU)',
    battery: 'Up to 18 Hours (MagSafe 3)',
    weight: '1.24 kg',
    screen: '13.6" Liquid Retina 500 nits',
    ram: '8GB Unified RAM',
    price: 295000,
    bestFor: 'College, Executive Travel & Silent Daily Work',
    image: '/src/assets/images/category_business_laptop_1792487010106.jpg',
  },
  {
    id: 'dell-xps-13-plus',
    name: 'Dell XPS 13 Plus',
    badge: 'Best Windows Ultraportable',
    brand: 'Dell',
    processor: 'Intel Core i7-1360P (12 Cores)',
    battery: 'Up to 12 Hours (ExpressCharge)',
    weight: '1.26 kg',
    screen: '13.4" 3.5K OLED InfinityEdge',
    ram: '16GB LPDDR5 6000MHz',
    price: 360000,
    bestFor: 'Consulting, C-Suite, Spreadsheets & Code',
    image: '/src/assets/images/hero_lapzone_laptop_1792487007933.jpg',
  },
  {
    id: 'asus-rog-strix-g16',
    name: 'ASUS ROG Strix G16',
    badge: 'Ultimate Gaming & Render Monster',
    brand: 'ASUS',
    processor: 'Intel Core i9-13980HX (24 Cores)',
    battery: 'Up to 6 Hours (90Wh Gaming)',
    weight: '2.50 kg',
    screen: '16" QHD+ 240Hz Nebula Display',
    ram: '32GB DDR5 4800MHz',
    price: 485000,
    bestFor: 'AAA Esports, 4K Rendering & Game Dev',
    image: '/src/assets/images/category_gaming_laptop_1792487008975.jpg',
  },
];

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  onOpenFullComparison,
  onAddToCartById,
}) => {
  return (
    <section className="py-16 bg-[#0F172A] text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Side-by-Side Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Unsure which laptop fits your needs?
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenFullComparison}
              className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              Compare All Models
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50">
                  <th className="p-4 text-xs font-semibold text-slate-400 w-1/4 uppercase tracking-wider">
                    Specification
                  </th>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <th key={item.id} className="p-4 w-1/4">
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wide">
                          {item.brand}
                        </div>
                        <div className="text-base font-bold text-white leading-snug">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {formatPKR(item.price)}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {/* Processor Row */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                    Processor
                  </td>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <td key={item.id} className="p-4 text-slate-200 font-medium text-xs">
                      {item.processor}
                    </td>
                  ))}
                </tr>

                {/* Display Row */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                    Screen & Display
                  </td>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <td key={item.id} className="p-4 text-slate-200 text-xs">
                      {item.screen}
                    </td>
                  ))}
                </tr>

                {/* Battery Life Row */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                    Battery Life
                  </td>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <td key={item.id} className="p-4 text-slate-200 font-medium text-xs">
                      <span className="text-emerald-400 font-bold">● </span>
                      {item.battery}
                    </td>
                  ))}
                </tr>

                {/* Weight Row */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                    Chassis Weight
                  </td>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <td key={item.id} className="p-4 text-slate-200 font-mono text-xs">
                      {item.weight}
                    </td>
                  ))}
                </tr>

                {/* Best For Row */}
                <tr className="hover:bg-slate-800/30 transition-colors bg-slate-950/30">
                  <td className="p-4 font-semibold text-[#06B6D4] text-xs uppercase tracking-wider">
                    Best For
                  </td>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <td key={item.id} className="p-4 text-xs font-semibold text-slate-100">
                      {item.bestFor}
                    </td>
                  ))}
                </tr>

                {/* Price & Action Row */}
                <tr className="bg-slate-950/70">
                  <td className="p-4 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                    Official Price
                  </td>
                  {COMPARISON_PREVIEW_MODELS.map((item) => (
                    <td key={item.id} className="p-4">
                      <div className="space-y-2">
                        <div className="text-base font-extrabold text-[#06B6D4] font-mono">
                          {formatPKR(item.price)}
                        </div>
                        <button
                          onClick={() => onAddToCartById(item.id)}
                          className="w-full bg-slate-800 hover:bg-[#06B6D4] hover:text-slate-950 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          Select & Add to Cart
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
