'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchProductsByTerm } from '@/lib/data'
import { saveRecentSearch } from '@/lib/search'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import ProductHeader from '@/components/layout/ProductHeader'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')

  // Memoize search results to avoid unnecessary recalculations
  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    let results = searchProductsByTerm(query)
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results = results.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        results = results.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        results = results.sort((a, b) => b.rating.average - a.rating.average)
        break
      case 'name':
        results = results.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'relevance':
      default:
        // Keep original order (relevance-based from search function)
        break
    }
    
    return results
  }, [query, sortBy])

  useEffect(() => {
    // Save search term to recent searches
    if (query.trim()) {
      saveRecentSearch(query.trim())
    }

    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProductHeader />
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductHeader />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <div className="flex items-center justify-between">
            <div>
              {query && (
                <p className="text-gray-600">
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${query}"`
                    : `No results found for "${query}"`
                  }
                </p>
              )}
            </div>
            
            {/* Sort Dropdown */}
            {searchResults.length > 0 && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="search-input rounded-md px-3 py-1.5 text-sm border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {!query.trim() ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Enter a search term
              </h3>
              <p className="text-gray-500">
                Try searching for products, brands, or categories
              </p>
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.44-1.007-5.9-2.609M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any products matching your search. Try different keywords or browse our categories.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Suggestions:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Check your spelling</li>
                    <li>• Try more general keywords</li>
                    <li>• Use fewer keywords</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                  >
                    Browse All Products
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
