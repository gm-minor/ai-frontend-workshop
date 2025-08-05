'use client'

import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import ProductCard from '@/components/ProductCard'
import BackToTop from '@/components/BackToTop'
import ProductHeader from '../../../components/layout/ProductHeader'

interface ClientProductPageProps {
  product: Product
  relatedProducts: Product[]
}

export default function ClientProductPage({ product, relatedProducts }: ClientProductPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Using shared component */}
      <ProductHeader />

      {/* Navigation Breadcrumb - Design Guidelines */}
      <nav className="breadcrumb-bg border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12">
            <Link href="/" className="breadcrumb-text hover:text-red-600">
              Home
            </Link>
            <span className="mx-2 breadcrumb-text">/</span>
            <Link href="/" className="breadcrumb-text hover:text-red-600">
              Products
            </Link>
            <span className="mx-2 breadcrumb-text">/</span>
            <span className="breadcrumb-current font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      <ProductDetailContent product={product} relatedProducts={relatedProducts} />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}

// Separate component for product detail content
function ProductDetailContent({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Detail Layout - Three Column Layout */}
      <ProductDetailSection product={product} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <RelatedProductsSection relatedProducts={relatedProducts} />
      )}
    </div>
  )
}

// Product detail section component
function ProductDetailSection({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Product Thumbnails */}
      <ProductThumbnails product={product} />

      {/* Center Column - Main Product Image */}
      <ProductMainImage product={product} />

      {/* Right Column - Product Details */}
      <ProductInfo product={product} />
    </div>
  )
}

// Product thumbnails component
function ProductThumbnails({ product }: { product: Product }) {
  return (
    <div className="lg:col-span-1">
      <div className="product-thumbnails">
        {/* Main product thumbnail (active) */}
        <div className="product-thumbnail active">
          <Image
            src={product.image}
            alt={`${product.name} thumbnail 1`}
            fill
            className="object-contain"
          />
        </div>
        {/* Additional thumbnails */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="product-thumbnail">
            <Image
              src={product.image}
              alt={`${product.name} thumbnail ${i + 2}`}
              fill
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Product main image component
function ProductMainImage({ product }: { product: Product }) {
  return (
    <div className="lg:col-span-6">
      <div className="product-container aspect-square relative">
        <Image
          src={product.image}
          alt={`${product.name} main image`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
    </div>
  )
}

// Product info component
function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="lg:col-span-5 space-y-6">
      {/* Product Name & Rating */}
      <div className="space-y-2">
        <h1 className="product-title text-2xl font-semibold">{product.name}</h1>
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-sm">({product.rating.count} Reviews)</span>
          <span className="text-green-600 text-sm">| In Stock</span>
        </div>
      </div>

      {/* Price */}
      <div className="product-price text-2xl font-semibold">
        {formatPrice(product.price)}
      </div>

      {/* Product Description */}
      <div className="product-description">
        <p className="text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Colors Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Colours:</h3>
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-300 hover:border-gray-500 transition-colors" />
          <button className="w-8 h-8 rounded-full bg-red-500 border-2 border-gray-300 hover:border-gray-500 transition-colors" />
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Size:</h3>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              className="px-4 py-2 border border-gray-300 rounded hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded">
          <button className="px-3 py-2 hover:bg-gray-100 transition-colors">-</button>
          <span className="px-4 py-2 border-x border-gray-300">2</span>
          <button className="px-3 py-2 hover:bg-gray-100 transition-colors">+</button>
        </div>
        
        <AddToCartButton 
          product={product}
          productId={product.id}
          productName={product.name}
          inStock={product.inStock}
          className="flex-1"
        />
        
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Delivery Information */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Free Delivery</p>
            <p className="text-sm text-gray-600 underline">Enter your postal code for Delivery Availability</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Return Delivery</p>
            <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. <span className="underline">Details</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Related products section component
function RelatedProductsSection({ relatedProducts }: { relatedProducts: Product[] }) {
  return (
    <div className="mt-16">
      <div className="flex items-center mb-8">
        <div className="category-marker mr-4"></div>
        <h2 className="section-title text-2xl font-semibold">Related Item</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </div>
  )
}
