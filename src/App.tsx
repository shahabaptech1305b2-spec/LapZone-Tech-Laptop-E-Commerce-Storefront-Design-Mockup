import React, { useState, useMemo, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { SpecFilterBar } from './components/SpecFilterBar';
import { ProductGrid } from './components/ProductGrid';
import { ComparisonSection } from './components/ComparisonSection';
import { ComparisonModal } from './components/ComparisonModal';
import { TrustBadges } from './components/TrustBadges';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { MockupViewerModal } from './components/MockupViewerModal';
import { SupportModals } from './components/SupportModals';
import { LAPTOP_CATALOG, CUSTOMER_REVIEWS } from './data/laptops';
import { Laptop, FilterState, CartItem, ReviewItem } from './types/laptop';
import { Check, ShoppingBag, SlidersHorizontal, Heart, Image as ImageIcon } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  brand: 'All',
  processor: 'All',
  ram: 'All',
  minPrice: 100000,
  maxPrice: 750000,
  searchQuery: '',
  sortBy: 'featured',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lapzone_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lapzone_wishlist');
      return saved ? JSON.parse(saved) : ['lenovo-legion-5-pro', 'apple-macbook-air-m2'];
    } catch {
      return ['lenovo-legion-5-pro', 'apple-macbook-air-m2'];
    }
  });

  const [comparisonIds, setComparisonIds] = useState<string[]>([
    'apple-macbook-air-m2',
    'dell-xps-13-plus',
    'asus-rog-strix-g16',
  ]);

  const [reviews, setReviews] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [appliedPromo, setAppliedPromo] = useState<string>('STUDENT10');

  // Modal / Drawer visibility states
  const [quickViewLaptop, setQuickViewLaptop] = useState<Laptop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);
  const [supportModal, setSupportModal] = useState<'warranty' | 'tracking' | 'faq' | 'account' | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; icon: 'cart' | 'compare' | 'wishlist' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('lapzone_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('lapzone_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (text: string, icon: 'cart' | 'compare' | 'wishlist') => {
    setToastMessage({ text, icon });
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectCategory = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Cart operations
  const handleAddToCart = (laptop: Laptop) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.laptop.id === laptop.id);
      if (existing) {
        return prev.map((item) =>
          item.laptop.id === laptop.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { laptop, quantity: 1 }];
    });
    showToast(`Added ${laptop.name.split('(')[0]} to Cart`, 'cart');
  };

  const handleUpdateQuantity = (laptopId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(laptopId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.laptop.id === laptopId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (laptopId: string) => {
    setCart((prev) => prev.filter((item) => item.laptop.id !== laptopId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (laptop: Laptop) => {
    setWishlistIds((prev) => {
      if (prev.includes(laptop.id)) {
        showToast(`Removed from Wishlist`, 'wishlist');
        return prev.filter((id) => id !== laptop.id);
      }
      showToast(`Saved to Wishlist`, 'wishlist');
      return [...prev, laptop.id];
    });
  };

  // Comparison operations
  const handleToggleComparison = (laptop: Laptop) => {
    setComparisonIds((prev) => {
      if (prev.includes(laptop.id)) {
        showToast(`Removed from Comparison`, 'compare');
        return prev.filter((id) => id !== laptop.id);
      }
      if (prev.length >= 4) {
        showToast(`Comparison slot limit reached (max 4)`, 'compare');
        return prev;
      }
      showToast(`Added to Comparison Matrix`, 'compare');
      return [...prev, laptop.id];
    });
  };

  const handleRemoveFromComparison = (id: string) => {
    setComparisonIds((prev) => prev.filter((item) => item !== id));
  };

  const handleAddLaptopToComparison = (laptop: Laptop) => {
    if (!comparisonIds.includes(laptop.id) && comparisonIds.length < 4) {
      setComparisonIds((prev) => [...prev, laptop.id]);
    }
  };

  // Filtered laptops computation
  const filteredLaptops = useMemo(() => {
    return LAPTOP_CATALOG.filter((laptop) => {
      // Category filter
      if (filters.category !== 'all' && laptop.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand !== 'All' && laptop.brand !== filters.brand) {
        return false;
      }

      // RAM filter
      if (filters.ram !== 'All' && laptop.specs.ramCategory !== filters.ram) {
        return false;
      }

      // Processor filter
      if (filters.processor !== 'All') {
        const procLower = laptop.specs.processor.toLowerCase();
        if (filters.processor === 'Intel Core i7 / i9') {
          if (!procLower.includes('core i7') && !procLower.includes('core i9')) return false;
        } else if (filters.processor === 'AMD Ryzen') {
          if (!procLower.includes('ryzen')) return false;
        } else if (filters.processor === 'Apple M-Series') {
          if (!procLower.includes('apple m')) return false;
        }
      }

      // Price filter
      if (laptop.price > filters.maxPrice) {
        return false;
      }

      // Search query (names, brands, processor, RAM, gpu)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const fullString = `${laptop.name} ${laptop.brand} ${laptop.specs.processor} ${laptop.specs.ram} ${laptop.specs.gpu} ${laptop.specs.storage}`.toLowerCase();
        if (!fullString.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [filters]);

  const wishlistLaptops = useMemo(() => {
    return LAPTOP_CATALOG.filter((l) => wishlistIds.includes(l.id));
  }, [wishlistIds]);

  const comparedLaptops = useMemo(() => {
    return LAPTOP_CATALOG.filter((l) => comparisonIds.includes(l.id));
  }, [comparisonIds]);

  const cartTotalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B]">
      {/* 1. Header & Announcement Bar */}
      <AnnouncementBar
        onApplyCode={(code) => setAppliedPromo(code)}
        appliedCode={appliedPromo}
      />

      <Navbar
        activeCategory={filters.category}
        onSelectCategory={handleSelectCategory}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        comparisonCount={comparisonIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        onOpenMockup={() => setIsMockupModalOpen(true)}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange('searchQuery', q)}
        onOpenAccount={() => setSupportModal('account')}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onBrowseLaptops={() => {
            document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenComparison={() => setIsComparisonModalOpen(true)}
        />

        {/* 3. Shop by Category Grid */}
        <CategoryGrid
          activeCategory={filters.category}
          onSelectCategory={handleSelectCategory}
        />

        {/* 4 & 5. Filter Bar & Featured Laptops Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpecFilterBar
            filters={filters}
            onChangeFilter={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalMatches={filteredLaptops.length}
          />

          <ProductGrid
            laptops={filteredLaptops}
            wishlistIds={wishlistIds}
            comparisonIds={comparisonIds}
            onToggleWishlist={handleToggleWishlist}
            onToggleComparison={handleToggleComparison}
            onAddToCart={handleAddToCart}
            onQuickView={(laptop) => setQuickViewLaptop(laptop)}
            sortBy={filters.sortBy}
            onSortChange={(sort) => handleFilterChange('sortBy', sort)}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* 6. Laptop Comparison Section (Feature Highlight) */}
        <ComparisonSection
          onOpenFullComparison={() => setIsComparisonModalOpen(true)}
          onAddToCartById={(id) => {
            const found = LAPTOP_CATALOG.find((l) => l.id === id);
            if (found) handleAddToCart(found);
          }}
        />

        {/* 7. Trust & Guarantee Badges */}
        <TrustBadges />

        {/* 8. Customer Reviews & Ratings */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={(newRev) => setReviews((prev) => [newRev, ...prev])}
        />

        {/* Special Mockup CTA Banner */}
        <section className="bg-slate-900 text-white py-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#06B6D4] flex items-center justify-center text-slate-950 font-black">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Need the LapZone Website Mockup JPG or PSD Specs?</h4>
                <p className="text-xs text-slate-400">Download the high-resolution presentation artboard and view the complete layer breakdown.</p>
              </div>
            </div>
            <button
              onClick={() => setIsMockupModalOpen(true)}
              className="bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shrink-0 shadow-md"
            >
              Open Mockup & PSD Breakdown
            </button>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <Footer
        onOpenWarrantyModal={() => setSupportModal('warranty')}
        onOpenTrackingModal={() => setSupportModal('tracking')}
        onOpenFaqModal={() => setSupportModal('faq')}
      />

      {/* Floating Action Badge / Comparison Pill */}
      {comparisonIds.length > 0 && (
        <div className="fixed bottom-5 right-5 z-40 animate-bounce-subtle">
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="bg-[#0F172A] text-white hover:bg-slate-800 border border-cyan-500/50 shadow-xl px-4 py-2.5 rounded-full flex items-center gap-2.5 text-xs font-bold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#06B6D4]" />
            <span>Compare ({comparisonIds.length}/4)</span>
          </button>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl border border-cyan-500/40 shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          {toastMessage.icon === 'cart' && <ShoppingBag className="w-4 h-4 text-[#06B6D4]" />}
          {toastMessage.icon === 'compare' && <SlidersHorizontal className="w-4 h-4 text-[#06B6D4]" />}
          {toastMessage.icon === 'wishlist' && <Heart className="w-4 h-4 text-rose-400 fill-current" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <QuickViewModal
        laptop={quickViewLaptop}
        onClose={() => setQuickViewLaptop(null)}
        isInWishlist={quickViewLaptop ? wishlistIds.includes(quickViewLaptop.id) : false}
        isInComparison={quickViewLaptop ? comparisonIds.includes(quickViewLaptop.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onToggleComparison={handleToggleComparison}
        onAddToCart={handleAddToCart}
      />

      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        comparedLaptops={comparedLaptops}
        allLaptops={LAPTOP_CATALOG}
        onRemoveFromComparison={handleRemoveFromComparison}
        onAddLaptopToComparison={handleAddLaptopToComparison}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        promoCode={appliedPromo}
        onApplyPromoCode={(code) => setAppliedPromo(code)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistLaptops={wishlistLaptops}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <MockupViewerModal
        isOpen={isMockupModalOpen}
        onClose={() => setIsMockupModalOpen(false)}
      />

      <SupportModals
        type={supportModal}
        onClose={() => setSupportModal(null)}
      />
    </div>
  );
}
