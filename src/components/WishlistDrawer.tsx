import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Laptop } from '../types/laptop';
import { formatPKR } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistLaptops: Laptop[];
  onRemoveFromWishlist: (laptop: Laptop) => void;
  onAddToCart: (laptop: Laptop) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistLaptops,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="font-extrabold text-[#0F172A] text-base">
              Saved Laptops ({wishlistLaptops.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistLaptops.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">No saved laptops yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any laptop card to bookmark machines for future reference or comparison.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {wishlistLaptops.map((laptop) => (
                <div key={laptop.id} className="py-3 flex gap-3 items-center">
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {laptop.name}
                    </h4>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      {formatPKR(laptop.price)}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {laptop.specs.ram} · {laptop.specs.storage}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <button
                      onClick={() => onAddToCart(laptop)}
                      className="bg-[#0F172A] hover:bg-slate-800 text-white p-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      title="Move to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#06B6D4]" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(laptop)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistLaptops.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => {
                wishlistLaptops.forEach((l) => onAddToCart(l));
                onClose();
              }}
              className="w-full bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Move All {wishlistLaptops.length} Items to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
