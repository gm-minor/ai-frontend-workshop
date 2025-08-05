'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface LazyProductGridProps {
  products: Product[]
  initialCount?: number
  loadIncrement?: number
  className?: string
}

export default function LazyProductGrid({ 
  products, 
  initialCount = 6,
  loadIncrement = 6,
  className = '' 
}: LazyProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)
  const [newlyLoadedItems, setNewlyLoadedItems] = useState<string[]>([])

  const loadMoreProducts = useCallback(() => {
    if (visibleCount >= products.length) return

    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      const currentCount = visibleCount
      const newCount = Math.min(currentCount + loadIncrement, products.length)
      
      // Track newly loaded items for animation
      const newItems = products.slice(currentCount, newCount).map(p => p.id)
      setNewlyLoadedItems(newItems)
      
      setVisibleCount(newCount)
      setIsLoading(false)
      
      // Clear animation class after animation completes
      setTimeout(() => setNewlyLoadedItems([]), 500)
    }, 500)
  }, [visibleCount, products.length, loadIncrement])

  // Intersection Observer for lazy loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.offsetHeight
      
      // Load more when user is near bottom (within 200px)
      if (scrollPosition >= documentHeight - 200 && !isLoading && visibleCount < products.length) {
        loadMoreProducts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreProducts, isLoading, visibleCount, products.length])

  const visibleProducts = products.slice(0, visibleCount)

  return (
    <div className={className}>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-grid">
        {visibleProducts.map((product) => (
          <div 
            key={product.id} 
            className={newlyLoadedItems.includes(product.id) ? 'product-fade-in' : ''}
          >
            <ProductGridItem product={product} />
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center space-x-3">
            <div className="loading-spinner"></div>
            <span className="text-body-medium secondary-text">Loading more products...</span>
          </div>
        </div>
      )}

      {/* Load More Button (fallback for users who prefer clicking) */}
      {!isLoading && visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreProducts}
            className="primary-button px-8 py-3 rounded-lg"
          >
            Load More Products ({products.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* End Message */}
      {visibleCount >= products.length && products.length > initialCount && (
        <div className="text-center py-8">
          <p className="text-body-medium secondary-text">
            You've reached the end! Showing all {products.length} products.
          </p>
        </div>
      )}
    </div>
  )
}

// Individual Product Item Component (matching the image style)
function ProductGridItem({ product }: { product: Product }) {
  return (
    <article className="group relative product-grid-item">
      <Link href={`/products/${product.id}`} className="block">
        {/* Product Image Container */}
        <div className="product-image-container aspect-square relative mb-3">
          <Image
            src={product.image}
            alt={`${product.name} product image`}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300 p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Wishlist Icon */}
          <button 
            onClick={(e) => {
              e.preventDefault()
              // Add wishlist functionality here
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white hover:bg-gray-50 border border-gray-200"
            aria-label="Add to wishlist"
          >
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Add to Cart Button Overlay */}
          <div className="absolute inset-x-0 bottom-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={(e) => {
                e.preventDefault()
                // Add to cart functionality
              }}
              className={`w-full py-2 px-3 rounded text-xs font-medium transition-colors ${
                product.inStock 
                  ? 'primary-button text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add To Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Stock Badge */}
          {!product.inStock && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info-compact space-y-1">
          <h3 className="text-body-medium font-medium text-black line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="product-price text-body-medium">
              {formatPrice(product.price)}
            </span>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xs ${
                      i < Math.floor(product.rating.average) ? 'star-rating-active' : 'star-rating-inactive'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs secondary-text">
                ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
