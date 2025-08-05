'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <article 
      className={`group product-card-bg hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full ${className}`}
      data-testid="product-card"
      aria-label="product card"
    >
      <Link href={`/products/${product.id}`} className="block flex-1 flex flex-col">
        <div className="product-container aspect-square relative overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.name} product image`}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Product Badges - Design Guidelines */}
          {!product.inStock && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                Out of Stock
              </span>
            </div>
          )}

          {/* Wishlist Icon - Design Guidelines */}
          <button 
            onClick={(e) => {
              e.preventDefault()
              // Add wishlist functionality here
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-200 text-gray-600 hover:bg-gray-300"
            aria-label="Add to wishlist"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className="padding-card flex-1 flex flex-col">
          <h3 className="product-title mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-body-medium secondary-text mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating - Design Guidelines */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm ${i < Math.floor(product.rating.average) ? 'star-rating-active' : 'star-rating-inactive'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-body-small secondary-text">
              ({product.rating.average.toFixed(1)})
            </span>
          </div>
          
          {/* Price and Stock Status - Design Guidelines */}
          <div className="flex items-center justify-between mb-4 mt-auto">
            <span className="product-price">
              {formatPrice(product.price)}
            </span>
            
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              product.inStock 
                ? 'success-text bg-green-100' 
                : 'text-red-600 bg-red-100'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button - Dark Theme */}
      <div className="px-4 pb-4">
        <button 
          className={`w-full py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
            product.inStock
              ? 'focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
              : 'cursor-not-allowed'
          }`}
          style={{
            backgroundColor: product.inStock ? '#FF6B6B' : '#404040',
            color: product.inStock ? '#FFFFFF' : '#888888'
          }}
          disabled={!product.inStock}
          aria-label={product.inStock ? 'Add to cart' : 'Out of stock'}
          onClick={(e) => {
            e.preventDefault()
            if (product.inStock) {
              console.log('Added to cart:', product.name)
            }
          }}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  )
}
