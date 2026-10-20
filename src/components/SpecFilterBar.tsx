import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { FilterState } from '../types/laptop';

interface SpecFilterBarProps {
  filters: FilterState;
  onChangeFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalMatches: number;
}

const BRANDS = ['All', 'Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'];
const PROCESSORS = ['All', 'Intel Core i7 / i9', 'AMD Ryzen', 'Apple M-Series'];
const RAM_OPTIONS = ['All', '8GB', '16GB', '32GB+'];

export const SpecFilterBar: React.FC<SpecFilterBarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
  totalMatches,
}) => {
  const isFiltered =
    filters.category !== 'all' ||
    filters.brand !== 'All' ||
    filters.processor !== 'All' ||
    filters.ram !== 'All' ||
    filters.maxPrice < 700000 ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-[#0F172A]">
            <Filter className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <span className="font-bold text-sm text-[#0F172A]">Key Specs Filter Bar</span>
          <span className="text-xs text-slate-500 font-mono">
            ({totalMatches} {totalMatches === 1 ? 'model' : 'models'} available)
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-2.5 py-1 rounded bg-rose-50 border border-rose-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onChangeFilter('brand', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4]"
          >
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand === 'All' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
        </div>

        {/* Processor Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Processor / Platform
          </label>
          <select
            value={filters.processor}
            onChange={(e) => onChangeFilter('processor', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4]"
          >
            {PROCESSORS.map((proc) => (
              <option key={proc} value={proc}>
                {proc === 'All' ? 'All Processors' : proc}
              </option>
            ))}
          </select>
        </div>

        {/* RAM Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            RAM Capacity
          </label>
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg">
            {RAM_OPTIONS.map((ram) => (
              <button
                key={ram}
                type="button"
                onClick={() => onChangeFilter('ram', ram)}
                className={`text-xs py-1 font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  filters.ram === ram
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ram}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Filter */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
            <span>Budget Ceiling</span>
            <span className="font-mono text-[#0F172A]">
              PKR {(filters.maxPrice / 1000).toFixed(0)}k
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={750000}
            step={25000}
            value={filters.maxPrice}
            onChange={(e) => onChangeFilter('maxPrice', Number(e.target.value))}
            className="w-full accent-[#06B6D4] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>PKR 100k</span>
            <span>PKR 400k</span>
            <span>PKR 750k+</span>
          </div>
        </div>
      </div>
    </div>
  );
};
