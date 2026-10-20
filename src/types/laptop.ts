export type LaptopCategory = 'gaming' | 'business' | 'student' | 'creator';

export type LaptopBrand = 'Apple' | 'Dell' | 'HP' | 'Lenovo' | 'ASUS' | 'Acer';

export interface Laptop {
  id: string;
  name: string;
  brand: LaptopBrand;
  category: LaptopCategory;
  price: number; // in PKR
  originalPrice: number; // in PKR
  rating: number;
  reviewsCount: number;
  badge?: 'In Stock' | 'Top Rated' | '15% OFF' | 'Hot Deal' | 'Best Seller';
  image: string;
  specs: {
    screen: string;
    processor: string;
    ram: string; // e.g. "16GB DDR5"
    ramCategory: '8GB' | '16GB' | '32GB+';
    storage: string;
    gpu: string;
    battery: string;
    weight: string;
    os: string;
    warranty: string;
  };
  highlights: string[];
  bestFor: string;
  inStock: boolean;
  installmentPerMonth: number; // 12-month 0% EMI
}

export interface FilterState {
  category: string;
  brand: string;
  processor: string;
  ram: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}

export interface CartItem {
  laptop: Laptop;
  quantity: number;
  selectedWarrantyExt?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  laptopName: string;
  comment: string;
  verifiedPurchase: boolean;
}
