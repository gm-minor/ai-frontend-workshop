'use client'

import { getAllProducts } from '@/lib/data'
import LazyProductGrid from '@/components/LazyProductGrid'
import BackToTop from '@/components/BackToTop'
import ProductHeader from '../components/layout/ProductHeader'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  const products = getAllProducts()

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Using shared component */}
      <ProductHeader />

      {/* Navigation Breadcrumb - Design Guidelines */}
      <nav className="breadcrumb-bg border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12">
            <span className="breadcrumb-text">Home</span>
            <span className="mx-2 breadcrumb-text">/</span>
            <span className="breadcrumb-current font-medium">All Products</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - "Explore Our Products" - Design Guidelines */}
          <aside className="w-72 flex-shrink-0">
            <div className="sidebar-bg sticky top-8">
              <h2 className="sidebar-title mb-6">Explore Our Products</h2>
              
              {/* Categories */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-body-medium font-medium mb-3 text-black">Categories</h3>
                  <nav className="space-y-2">
                    <a 
                      href="#" 
                      className="primary-button flex items-center justify-between px-3 py-2.5 rounded-md w-full text-left"
                    >
                      <span>All Products</span>
                      <span className="text-xs">({products.length})</span>
                    </a>
                    <a 
                      href="#" 
                      className="secondary-button flex items-center justify-between px-3 py-2.5 rounded-md w-full text-left"
                    >
                      <span>Smartphones</span>
                      <span className="text-xs text-gray-600">(6)</span>
                    </a>
                    <a 
                      href="#" 
                      className="secondary-button flex items-center justify-between px-3 py-2.5 rounded-md w-full text-left"
                    >
                      <span>Laptops</span>
                      <span className="text-xs text-gray-600">(6)</span>
                    </a>
                    <a 
                      href="#" 
                      className="secondary-button flex items-center justify-between px-3 py-2.5 rounded-md w-full text-left"
                    >
                      <span>Headphones</span>
                      <span className="text-xs text-gray-600">(5)</span>
                    </a>
                  </nav>
                </div>

                {/* Price Range Filter - Design Guidelines */}
                <div className="pt-4 border-t border-gray-300">
                  <h3 className="text-body-medium font-medium mb-3 text-black">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-red-600 focus:ring-red-600 border-gray-300" />
                      <span className="ml-2 secondary-text">Under $100</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-red-600 focus:ring-red-600 border-gray-300" />
                      <span className="ml-2 secondary-text">$100 - $500</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-red-600 focus:ring-red-600 border-gray-300" />
                      <span className="ml-2 secondary-text">$500 - $1000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-red-600 focus:ring-red-600 border-gray-300" />
                      <span className="ml-2 secondary-text">Over $1000</span>
                    </label>
                  </div>
                </div>

                {/* Rating Filter - Design Guidelines */}
                <div className="pt-4 border-t border-gray-300">
                  <h3 className="text-body-medium font-medium mb-3 text-black">Customer Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input type="checkbox" className="rounded text-red-600 focus:ring-red-600 border-gray-300" />
                        <div className="ml-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-sm ${i < rating ? 'star-rating-active' : 'star-rating-inactive'}`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-1 secondary-text">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area - Design Guidelines */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-h1 mb-2 text-black">
                All Products
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-body-medium text-gray-600">
                  Showing <span className="font-medium text-black">{products.length}</span> results
                </p>
                
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-4">
                  <label className="text-body-medium text-black">Sort by:</label>
                  <select className="search-input rounded-md px-3 py-1.5 text-sm">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Customer Rating</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid with Lazy Loading */}
            <LazyProductGrid 
              products={products} 
              initialCount={6}
              loadIncrement={6}
            />
          </main>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
