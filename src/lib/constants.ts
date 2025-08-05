import type { CategoryId, MenuItem } from '@/types';

// App Configuration
export const APP_CONFIG = {
  name: 'TechStore',
  description: 'Your one-stop shop for the latest electronics',
  url: 'https://techstore.com',
  version: '1.0.0',
} as const;

// Menu Items Configuration
export const MENU_ITEMS: MenuItem[] = [
  { id: 'all', label: 'Home' },
  { id: 'all', label: 'All Products' },
  { id: 'smartphones', label: 'Smartphones' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'headphones', label: 'Headphones' },
] as const;

// Category Configuration
export const CATEGORIES: Record<CategoryId, { name: string; slug: string }> = {
  all: { name: 'All Products', slug: 'all' },
  smartphones: { name: 'Smartphones', slug: 'smartphones' },
  laptops: { name: 'Laptops', slug: 'laptops' },
  headphones: { name: 'Headphones', slug: 'headphones' },
} as const;

// UI Configuration
export const UI_CONFIG = {
  // Grid Layout
  productsPerRow: {
    desktop: 4,
    tablet: 3,
    mobile: 2,
  },
  
  // Pagination
  productsPerPage: 12,
  maxPaginationButtons: 5,
  
  // Search
  searchDebounceMs: 300,
  minSearchLength: 2,
  maxSearchResults: 50,
  
  // Related Products
  relatedProductsCount: 4,
  
  // Animation Durations (in ms)
  animationDuration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  
  // Responsive Breakpoints (Tailwind defaults)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Theme Colors (matching design guidelines)
export const THEME_COLORS = {
  // Primary Colors
  white: '#ffffff',
  black: '#000000',
  brandRed: '#db4444',
  brightRed: '#fb1314',
  
  // Secondary Colors
  lightGray: '#f5f5f5',
  mediumGray: '#d9d9d9',
  darkGray: '#1c1b1f',
  charcoal: '#030406',
  
  // Accent Colors
  warningOrange: '#ffad33',
  successGreen: '#00ff66',
  infoBlue: '#a0bce0',
  errorRed: '#e07575',
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fontSize: {
    caption: '10px',    // 0.625rem
    small: '12px',      // 0.75rem
    base: '14px',       // 0.875rem
    medium: '16px',     // 1rem
    large: '20px',      // 1.25rem
    xl: '24px',         // 1.5rem
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale
export const SPACING = {
  0: '0',
  1: '4px',     // 0.25rem
  2: '8px',     // 0.5rem
  3: '12px',    // 0.75rem
  4: '16px',    // 1rem
  5: '20px',    // 1.25rem
  6: '24px',    // 1.5rem
  8: '32px',    // 2rem
  10: '40px',   // 2.5rem
  12: '48px',   // 3rem
  16: '64px',   // 4rem
} as const;

// Border Radius
export const BORDER_RADIUS = {
  sm: '4px',    // 0.25rem
  md: '6px',    // 0.375rem
  lg: '8px',    // 0.5rem
  xl: '12px',   // 0.75rem
  '2xl': '16px', // 1rem
} as const;

// Box Shadows
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// API Configuration (for future use)
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retries: 3,
  endpoints: {
    products: '/products',
    categories: '/categories',
    search: '/search',
  },
} as const;

// Performance Targets
export const PERFORMANCE_TARGETS = {
  // Page Load Times (milliseconds)
  homePage: 2000,
  productDetail: 1500,
  categoryFilter: 500,
  searchResults: 300,
  
  // Image Loading
  imageLoadTimeout: 5000,
  imagePlaceholderDelay: 200,
  
  // Cache Durations (seconds)
  staticDataCache: 3600,     // 1 hour
  imageCache: 86400,         // 24 hours
  apiCache: 300,             // 5 minutes
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  productNotFound: 'Product not found',
  categoryNotFound: 'Category not found',
  searchNoResults: 'No products found matching your search',
  loadingError: 'Failed to load data. Please try again.',
  imageLoadError: 'Failed to load image',
  networkError: 'Network error. Please check your connection.',
  genericError: 'Something went wrong. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  productLoaded: 'Product loaded successfully',
  searchCompleted: 'Search completed',
  filterApplied: 'Filter applied successfully',
} as const;

// Loading States
export const LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  recentSearches: 'techstore_recent_searches',
  viewedProducts: 'techstore_viewed_products',
  preferences: 'techstore_user_preferences',
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'TechStore - Premium Electronics & Gadgets',
  titleTemplate: '%s | TechStore',
  defaultDescription: 'Discover the latest smartphones, laptops, and headphones from top brands. Free shipping on orders over $100.',
  keywords: [
    'electronics',
    'smartphones',
    'laptops',
    'headphones',
    'technology',
    'gadgets',
    'apple',
    'samsung',
    'sony',
    'dell',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techstore.com',
    siteName: 'TechStore',
  },
} as const;
