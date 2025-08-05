/**
 * Search utilities for managing search functionality
 */

const RECENT_SEARCHES_KEY = 'recent_searches'
const MAX_RECENT_SEARCHES = 5

/**
 * Get recent search terms from localStorage
 */
export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const recent = localStorage.getItem(RECENT_SEARCHES_KEY)
    return recent ? JSON.parse(recent) : []
  } catch (error) {
    console.error('Error loading recent searches:', error)
    return []
  }
}

/**
 * Save a search term to recent searches
 */
export function saveRecentSearch(term: string): void {
  if (typeof window === 'undefined' || !term.trim()) return

  try {
    const recent = getRecentSearches()
    const trimmedTerm = term.trim()
    
    // Remove the term if it already exists
    const filtered = recent.filter(item => item.toLowerCase() !== trimmedTerm.toLowerCase())
    
    // Add the new term at the beginning
    const updated = [trimmedTerm, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Error saving recent search:', error)
  }
}

/**
 * Clear all recent searches
 */
export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch (error) {
    console.error('Error clearing recent searches:', error)
  }
}

/**
 * Get search suggestions based on available products
 */
export function getSearchSuggestions(query: string, products: any[]): string[] {
  if (!query.trim() || products.length === 0) return []

  const lowerQuery = query.toLowerCase()
  const suggestions = new Set<string>()

  // Extract suggestions from product names and descriptions
  products.forEach((product: any) => {
    const name = product.name.toLowerCase()
    const description = product.description.toLowerCase()
    
    // Add exact name matches
    if (name.includes(lowerQuery)) {
      suggestions.add(product.name)
    }
    
    // Add word matches from names
    const nameWords = product.name.split(' ')
    nameWords.forEach((word: string) => {
      if (word.toLowerCase().includes(lowerQuery) && word.length > 2) {
        suggestions.add(word)
      }
    })
    
    // Add category suggestions if available
    if (product.category && product.category.toLowerCase().includes(lowerQuery)) {
      suggestions.add(product.category)
    }
  })

  return Array.from(suggestions).slice(0, 8)
}

/**
 * Highlight matching text in a string
 */
export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
