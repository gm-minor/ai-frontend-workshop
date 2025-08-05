import type { Product, Category, CategoryId, FilterOptions, SortConfig } from '@/types';

/**
 * Formats a price number to a currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Formats a rating to display with one decimal place
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Filters products by category
 */
export function filterProductsByCategory(
  products: Product[],
  categoryId: CategoryId
): Product[] {
  if (categoryId === 'all') {
    return products;
  }
  return products.filter(product => product.categoryId === categoryId);
}

/**
 * Searches products by name and brand (case-insensitive)
 */
export function searchProducts(
  products: Product[],
  searchTerm: string
): Product[] {
  if (!searchTerm.trim()) {
    return products;
  }

  const term = searchTerm.toLowerCase().trim();
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
}

/**
 * Applies multiple filters to products
 */
export function filterProducts(
  products: Product[],
  filters: FilterOptions
): Product[] {
  let filtered = [...products];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filterProductsByCategory(filtered, filters.category);
  }

  // Filter by search term
  if (filters.searchTerm) {
    filtered = searchProducts(filtered, filters.searchTerm);
  }

  // Filter by stock status
  if (filters.inStock !== undefined) {
    filtered = filtered.filter(product => product.inStock === filters.inStock);
  }

  // Filter by price range
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filtered = filtered.filter(product => 
      product.price >= min && product.price <= max
    );
  }

  return filtered;
}

/**
 * Sorts products based on configuration
 */
export function sortProducts(
  products: Product[],
  sortConfig: SortConfig
): Product[] {
  return [...products].sort((a, b) => {
    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];

    if (sortConfig.field === 'rating') {
      const aRating = typeof aValue === 'object' && aValue !== null && 'average' in aValue 
        ? (aValue as { average: number }).average 
        : 0;
      const bRating = typeof bValue === 'object' && bValue !== null && 'average' in bValue 
        ? (bValue as { average: number }).average 
        : 0;
      
      return sortConfig.direction === 'asc' 
        ? aRating - bRating 
        : bRating - aRating;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });
}

/**
 * Gets related products (same category, excluding current product)
 */
export function getRelatedProducts(
  products: Product[],
  currentProduct: Product,
  limit: number = 4
): Product[] {
  const relatedProducts = products
    .filter(product => 
      product.categoryId === currentProduct.categoryId && 
      product.id !== currentProduct.id
    )
    .slice(0, limit);

  // Shuffle for variety
  return shuffleArray(relatedProducts);
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Generates URL-friendly slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validates if a product ID is valid
 */
export function isValidProductId(id: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(id);
}

/**
 * Validates if a category ID is valid
 */
export function isValidCategoryId(id: string): id is CategoryId {
  return ['smartphones', 'laptops', 'headphones', 'all'].includes(id);
}

/**
 * Gets category display name from ID
 */
export function getCategoryDisplayName(categoryId: CategoryId): string {
  const categoryNames: Record<CategoryId, string> = {
    'all': 'All Products',
    'smartphones': 'Smartphones',
    'laptops': 'Laptops',
    'headphones': 'Headphones',
  };
  return categoryNames[categoryId] || 'Unknown Category';
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Checks if a product is on sale (for future use)
 */
export function isProductOnSale(product: Product & { originalPrice?: number }): boolean {
  return product.originalPrice !== undefined && product.originalPrice > product.price;
}

/**
 * Gets price display with potential sale info
 */
export function getPriceDisplay(product: Product & { originalPrice?: number }): {
  current: string;
  original?: string;
  discount?: number;
} {
  const current = formatPrice(product.price);
  
  if (isProductOnSale(product)) {
    return {
      current,
      original: formatPrice(product.originalPrice!),
      discount: calculateDiscount(product.originalPrice!, product.price),
    };
  }
  
  return { current };
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Combines class names conditionally
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
