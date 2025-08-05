'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { getAllProducts } from '@/lib/data'
import { getSearchSuggestions, getRecentSearches, saveRecentSearch, debounce } from '@/lib/search'

export default function ProductHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const { totalItems } = useCart()
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
    setRecentSearches(getRecentSearches())
  }, [])

  // Get all products for suggestions
  const products = useMemo(() => getAllProducts(), [])

  // Debounced function to get suggestions
  const getSuggestionsDebounced = useMemo(
    () => debounce((query: string) => {
      if (query.trim().length > 1) {
        const newSuggestions = getSearchSuggestions(query, products)
        setSuggestions(newSuggestions)
      } else {
        setSuggestions([])
      }
    }, 300),
    [products]
  )

  // Handle search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    getSuggestionsDebounced(value)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allSuggestions = showRecentInSuggestions ? recentSearches : suggestions
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => 
        prev < allSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      e.preventDefault()
      performSearch(allSuggestions[selectedSuggestionIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
    }
  }

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedSuggestionIndex(-1)
  }, [suggestions, recentSearches])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  // Perform search and navigate
  const performSearch = (query: string) => {
    const trimmedQuery = query.trim()
    
    if (trimmedQuery) {
      saveRecentSearch(trimmedQuery)
      setRecentSearches(getRecentSearches())
      setShowSuggestions(false)
      setSearchQuery('')
      // Navigate to search page with query parameter
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    performSearch(suggestion)
  }

  // Handle input focus
  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showRecentInSuggestions = searchQuery.trim().length === 0 && recentSearches.length > 0
  const showSearchSuggestions = searchQuery.trim().length > 1 && suggestions.length > 0

  return (
    <header className="header-bg border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="header-logo hover:text-red-600 transition-colors">
              Exclusive
            </Link>
          </div>
          
          {/* Centered Search Input */}
          <div className="flex-1 flex justify-center mx-8">
            <div ref={searchRef} className="relative w-80">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="What are you looking for?"
                  className="search-input w-full text-sm"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                  maxLength={100}
                  aria-label="Search products"
                  autoComplete="off"
                />
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-red-600 transition-colors"
                  aria-label="Submit search"
                >
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (showRecentInSuggestions || showSearchSuggestions) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                  {showRecentInSuggestions && (
                    <div className="p-3 border-b border-gray-100">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Recent Searches
                      </h4>
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(term)}
                          className={`w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center ${
                            selectedSuggestionIndex === index ? 'bg-red-50 text-red-700' : ''
                          }`}
                        >
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {term}
                        </button>
                      ))}
                    </div>
                  )}

                  {showSearchSuggestions && (
                    <div className="p-3">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Suggestions
                      </h4>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center ${
                            selectedSuggestionIndex === index ? 'bg-red-50 text-red-700' : ''
                          }`}
                        >
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Action Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="View wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label={`View cart with ${isClient ? totalItems : 0} items`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19" />
              </svg>
              {isClient && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
