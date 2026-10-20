import React from 'react';
import { X, Plus, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Laptop } from '../types/laptop';
import { formatPKR } from '../utils/format';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedLaptops: Laptop[];
  allLaptops: Laptop[];
  onRemoveFromComparison: (id: string) => void;
  onAddLaptopToComparison: (laptop: Laptop) => void;
  onAddToCart: (laptop: Laptop) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedLaptops,
  allLaptops,
  onRemoveFromComparison,
  onAddLaptopToComparison,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const availableToAdd = allLaptops.filter(
    (l) => !comparedLaptops.some((c) => c.id === l.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#06B6D4]">LapZone</span> Full Comparison Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare architectural benchmarks, memory speed, battery chemistry, and real PKR pricing.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Comparison"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {comparedLaptops.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-slate-400 text-sm">No laptops selected for comparison yet.</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {allLaptops.slice(0, 3).map((lap) => (
                  <button
                    key={lap.id}
                    onClick={() => onAddLaptopToComparison(lap)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add {lap.name.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Optional Add More Dropdown */}
              {comparedLaptops.length < 4 && availableToAdd.length > 0 && (
                <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400">Add another machine to compare:</span>
                  <select
                    onChange={(e) => {
                      const selected = allLaptops.find((l) => l.id === e.target.value);
                      if (selected) onAddLaptopToComparison(selected);
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="text-xs bg-slate-800 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="" disabled>
                      Choose model (+ up to 4 models)
                    </option>
                    {availableToAdd.map((lap) => (
                      <option key={lap.id} value={lap.id}>
                        {lap.name} ({formatPKR(lap.price)})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="p-3 w-44 text-slate-400 font-semibold uppercase tracking-wider">
                        Feature
                      </th>
                      {comparedLaptops.map((item) => (
                        <th key={item.id} className="p-3 min-w-[220px]">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-[#06B6D4]">
                                {item.brand}
                              </span>
                              <button
                                onClick={() => onRemoveFromComparison(item.id)}
                                title="Remove from comparison"
                                className="text-slate-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="font-bold text-white text-sm line-clamp-1">
                              {item.name}
                            </div>
                            <div className="text-cyan-400 font-mono font-bold text-sm">
                              {formatPKR(item.price)}
                            </div>
                            <button
                              onClick={() => onAddToCart(item)}
                              className="w-full bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3 text-slate-950" />
                              Add to Cart
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Processor</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.processor}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">RAM Memory</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.ram}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Storage</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.storage}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Graphics (GPU)</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.gpu}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Display</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.screen}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Battery Life</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.battery}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Weight</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200 font-mono">
                          {l.specs.weight}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Operating System</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-200">
                          {l.specs.os}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400">Official Warranty</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-emerald-400 font-medium">
                          <span className="inline-flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {l.specs.warranty}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3 font-semibold text-[#06B6D4]">Target Persona</td>
                      {comparedLaptops.map((l) => (
                        <td key={l.id} className="p-3 text-slate-100 font-medium">
                          {l.bestFor}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Comparing <span className="text-white font-bold">{comparedLaptops.length}</span> of 4 slots
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
