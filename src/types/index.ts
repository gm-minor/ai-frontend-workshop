// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  inStock: boolean;
  rating: ProductRating;
}

export interface ProductRating {
  average: number;
  count: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Union type for category IDs
export type CategoryId = 'smartphones' | 'laptops' | 'headphones' | 'all';

// Menu item interface
export interface MenuItem {
  id: CategoryId;
  label: string;
  href?: string;
}

// API Response Types
export interface ProductsResponse {
  products: Product[];
}

export interface CategoriesResponse {
  categories: Category[];
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  className?: string;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

export interface SideMenuProps {
  selectedCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
  categories: Category[];
}

export interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchClear: () => void;
}

export interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// Filter and Search Types
export interface FilterOptions {
  category?: CategoryId;
  searchTerm?: string;
  inStock?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
}

// Page Props Types
export interface HomePageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export interface ProductPageProps {
  params: {
    id: string;
  };
}

// Utility Types
export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating';

export interface SortConfig {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Loading State Types
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Search State Types
export interface SearchState extends LoadingState {
  query: string;
  results: Product[];
  hasSearched: boolean;
}
