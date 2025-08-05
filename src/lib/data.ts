import type { Product, Category, ProductsResponse, CategoriesResponse } from '@/types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

/**
 * Get all products from static data
 */
export function getAllProducts(): Product[] {
  const data = productsData as ProductsResponse;
  return data.products;
}

/**
 * Get all categories from static data
 */
export function getAllCategories(): Category[] {
  const data = categoriesData as CategoriesResponse;
  return data.categories;
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | null {
  const products = getAllProducts();
  return products.find(product => product.id === id) || null;
}

/**
 * Get products by category ID
 */
export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === 'all') {
    return getAllProducts();
  }
  
  const products = getAllProducts();
  return products.filter(product => product.categoryId === categoryId);
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): Category | null {
  const categories = getAllCategories();
  return categories.find(category => category.id === id) || null;
}

/**
 * Get related products by category (excluding current product)
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  const products = getAllProducts();
  const relatedProducts = products
    .filter(product => 
      product.categoryId === currentProduct.categoryId && 
      product.id !== productId
    )
    .slice(0, limit);
  
  // If we don't have enough products in the same category, 
  // fill with products from other categories
  if (relatedProducts.length < limit) {
    const remainingSlots = limit - relatedProducts.length;
    const otherProducts = products
      .filter(product => 
        product.categoryId !== currentProduct.categoryId && 
        product.id !== productId
      )
      .slice(0, remainingSlots);
    
    relatedProducts.push(...otherProducts);
  }
  
  return relatedProducts;
}

/**
 * Get products with pagination (for future use)
 */
export function getProductsPaginated(
  page: number = 1,
  limit: number = 12,
  categoryId?: string
): {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
} {
  const allProducts = categoryId 
    ? getProductsByCategory(categoryId)
    : getAllProducts();
  
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const products = allProducts.slice(startIndex, endIndex);
  
  return {
    products,
    totalPages,
    currentPage: page,
    totalProducts,
  };
}

/**
 * Search products by term
 */
export function searchProductsByTerm(searchTerm: string): Product[] {
  if (!searchTerm.trim()) {
    return [];
  }
  
  const products = getAllProducts();
  const term = searchTerm.toLowerCase().trim();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
}

/**
 * Get featured products (highest rated)
 */
export function getFeaturedProducts(limit: number = 8): Product[] {
  const products = getAllProducts();
  return products
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, limit);
}

/**
 * Get products by price range
 */
export function getProductsByPriceRange(
  minPrice: number = 0,
  maxPrice: number = Infinity
): Product[] {
  const products = getAllProducts();
  return products.filter(
    product => product.price >= minPrice && product.price <= maxPrice
  );
}

/**
 * Get in-stock products only
 */
export function getInStockProducts(): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.inStock);
}

/**
 * Get product statistics
 */
export function getProductStats(): {
  totalProducts: number;
  categoryCounts: Record<string, number>;
  averagePrice: number;
  priceRange: { min: number; max: number };
  inStockCount: number;
  outOfStockCount: number;
} {
  const products = getAllProducts();
  
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.categoryId] = (acc[product.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const prices = products.map(p => p.price);
  const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.length - inStockCount;
  
  return {
    totalProducts: products.length,
    categoryCounts,
    averagePrice,
    priceRange: { min: minPrice, max: maxPrice },
    inStockCount,
    outOfStockCount,
  };
}

/**
 * Get random products (for related products, etc.)
 */
export function getRandomProducts(
  count: number,
  excludeIds: string[] = []
): Product[] {
  const products = getAllProducts().filter(
    product => !excludeIds.includes(product.id)
  );
  
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Simulate async data loading (for future API integration)
 */
export async function loadProductsAsync(
  delay: number = 500
): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getAllProducts());
    }, delay);
  });
}

/**
 * Simulate async product loading by ID
 */
export async function loadProductByIdAsync(
  id: string,
  delay: number = 300
): Promise<Product | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getProductById(id));
    }, delay);
  });
}
