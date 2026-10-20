import React from 'react';
import { Gamepad2, Briefcase, GraduationCap, Palette, ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  {
    id: 'gaming',
    title: 'Gaming Laptops',
    desc: 'High Refresh Rate, RTX 40-Series & Liquid Metal',
    specs: '165Hz - 240Hz · RTX 4060 / 4070 / 4080',
    icon: Gamepad2,
    image: '/src/assets/images/category_gaming_laptop_1792487008975.jpg',
    color: 'from-cyan-950/90 to-slate-900/90',
  },
  {
    id: 'business',
    title: 'Business & MacBooks',
    desc: 'Lightweight, All-Day 18h Battery & Secure Enclaves',
    specs: 'Apple M2/M3 · Dell XPS · ThinkPad Carbon',
    icon: Briefcase,
    image: '/src/assets/images/category_business_laptop_1792487010106.jpg',
    color: 'from-slate-950/90 to-slate-900/90',
  },
  {
    id: 'student',
    title: 'Student & Budget',
    desc: 'Affordable, Everyday Coding, Office & Zoom Tasks',
    specs: 'Starting PKR 115,000 · Light & Durable',
    icon: GraduationCap,
    image: '/src/assets/images/category_business_laptop_1792487010106.jpg',
    color: 'from-cyan-950/90 to-slate-900/90',
  },
  {
    id: 'creator',
    title: 'Creator & Workstation',
    desc: '4K OLED Displays, Color Grading & Heavy 3D Rendering',
    specs: '100% DCI-P3 · Studio Drivers · 32GB+ RAM',
    icon: Palette,
    image: '/src/assets/images/category_creator_workstation_1792487010921.jpg',
    color: 'from-slate-950/90 to-slate-900/90',
  },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-1">
              Curated Segments
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Engineered systems tailored for specific workloads, whether you are coding in university, crunching 4K renders, or pushing 240 FPS in tournaments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#06B6D4] ring-2 ring-[#06B6D4]/30 shadow-lg'
                    : 'border-slate-200 hover:border-slate-400 bg-white hover:shadow-md'
                }`}
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 p-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-[#06B6D4] border border-slate-700">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {cat.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#06B6D4] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="pt-2 text-[11px] font-mono font-medium text-slate-700">
                    {cat.specs}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
