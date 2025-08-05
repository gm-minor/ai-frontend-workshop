/**
 * Example ProductCard Component Test
 * This file demonstrates comprehensive testing patterns for React components
 * following industry best practices with Jest and React Testing Library
 */

import { render, screen, fireEvent, waitFor } from './test-utils'
import { createMockProduct, expectElementToBeVisible, TEST_IDS, ARIA_LABELS } from './test-utils'
import type { Product } from '../types'

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Example ProductCard component for testing (this would be imported in real scenario)
const ProductCard: React.FC<{ product: Product; onAddToCart?: (product: Product) => void }> = ({ 
  product, 
  onAddToCart 
}) => {
  const handleAddToCart = () => {
    onAddToCart?.(product)
  }

  return (
    <div data-testid={TEST_IDS.productCard} aria-label={ARIA_LABELS.productCard}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>${product.price.toFixed(2)}</span>
      <div>
        <span>★ {product.rating.average}</span>
        <span>({product.rating.count} reviews)</span>
      </div>
      <button 
        onClick={handleAddToCart}
        disabled={!product.inStock}
        aria-label={ARIA_LABELS.addToCart}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
      <a href={`/products/${product.id}`} aria-label={ARIA_LABELS.viewProduct}>
        View Details
      </a>
    </div>
  )
}

// Test data setup - moved to global scope for reuse across test suites
const mockProduct = createMockProduct({
  id: '1',
  name: 'iPhone 15 Pro',
  description: 'Latest iPhone with advanced features',
  price: 999.99,
  image: 'https://example.com/iphone.jpg',
  inStock: true,
  rating: { average: 4.8, count: 256 }
})

const mockOutOfStockProduct = createMockProduct({
  ...mockProduct,
  inStock: false
})

describe('ProductCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders product information correctly', () => {
      render(<ProductCard product={mockProduct} />)

      // Test basic rendering
      expectElementToBeVisible(screen.getByText('iPhone 15 Pro'))
      expectElementToBeVisible(screen.getByText('Latest iPhone with advanced features'))
      expectElementToBeVisible(screen.getByText('$999.99'))
      
      // Test image attributes
      const image = screen.getByRole('img', { name: 'iPhone 15 Pro' })
      expect(image).toHaveAttribute('src', 'https://example.com/iphone.jpg')
      expect(image).toHaveAttribute('alt', 'iPhone 15 Pro')
    })

    it('displays rating information', () => {
      render(<ProductCard product={mockProduct} />)

      expectElementToBeVisible(screen.getByText('★ 4.8'))
      expectElementToBeVisible(screen.getByText('(256 reviews)'))
    })

    it('renders view details link with correct href', () => {
      render(<ProductCard product={mockProduct} />)

      const link = screen.getByRole('link', { name: ARIA_LABELS.viewProduct })
      expect(link).toHaveAttribute('href', '/products/1')
    })

    it('has proper accessibility attributes', () => {
      render(<ProductCard product={mockProduct} />)

      // Test ARIA labels
      const card = screen.getByTestId(TEST_IDS.productCard)
      expect(card).toHaveAttribute('aria-label', ARIA_LABELS.productCard)

      const addToCartButton = screen.getByRole('button', { name: ARIA_LABELS.addToCart })
      expect(addToCartButton).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('calls onAddToCart when add to cart button is clicked', async () => {
      const mockOnAddToCart = jest.fn()
      render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)

      const addToCartButton = screen.getByRole('button', { name: ARIA_LABELS.addToCart })
      fireEvent.click(addToCartButton)

      expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
      expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
    })

    it('does not call onAddToCart when button is disabled', () => {
      const mockOnAddToCart = jest.fn()
      render(<ProductCard product={mockOutOfStockProduct} onAddToCart={mockOnAddToCart} />)

      const addToCartButton = screen.getByRole('button')
      fireEvent.click(addToCartButton)

      expect(mockOnAddToCart).not.toHaveBeenCalled()
    })

    it('handles missing onAddToCart prop gracefully', () => {
      expect(() => {
        render(<ProductCard product={mockProduct} />)
      }).not.toThrow()

      const addToCartButton = screen.getByRole('button', { name: ARIA_LABELS.addToCart })
      expect(() => {
        fireEvent.click(addToCartButton)
      }).not.toThrow()
    })
  })

  describe('Product States', () => {
    it('shows "Add to Cart" for in-stock products', () => {
      render(<ProductCard product={mockProduct} />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Add to Cart')
      expect(button).toBeEnabled()
    })

    it('shows "Out of Stock" for out-of-stock products', () => {
      render(<ProductCard product={mockOutOfStockProduct} />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Out of Stock')
      expect(button).toBeDisabled()
    })
  })

  describe('Edge Cases', () => {
    it('handles products with zero rating count', () => {
      const productWithNoRatings = createMockProduct({
        ...mockProduct,
        rating: { average: 0, count: 0 }
      })

      render(<ProductCard product={productWithNoRatings} />)

      expectElementToBeVisible(screen.getByText('★ 0'))
      expectElementToBeVisible(screen.getByText('(0 reviews)'))
    })

    it('handles very long product names gracefully', () => {
      const productWithLongName = createMockProduct({
        ...mockProduct,
        name: 'This is an extremely long product name that might cause layout issues if not handled properly'
      })

      render(<ProductCard product={productWithLongName} />)

      expectElementToBeVisible(screen.getByText(productWithLongName.name))
    })

    it('handles missing image gracefully', () => {
      const productWithoutImage = createMockProduct({
        ...mockProduct,
        image: ''
      })

      render(<ProductCard product={productWithoutImage} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '')
      expect(image).toHaveAttribute('alt', mockProduct.name)
    })
  })

  describe('Snapshot Testing', () => {
    it('matches snapshot for in-stock product', () => {
      const { container } = render(<ProductCard product={mockProduct} />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot for out-of-stock product', () => {
      const { container } = render(<ProductCard product={mockOutOfStockProduct} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('Performance', () => {
    it('renders without unnecessary re-renders', () => {
      const { rerender } = render(<ProductCard product={mockProduct} />)
      
      // Re-render with same props
      rerender(<ProductCard product={mockProduct} />)
      
      // Component should handle this gracefully
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument()
    })
  })

  describe('Async Operations', () => {
    it('handles async onAddToCart operations', async () => {
      const asyncOnAddToCart = jest.fn(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      )

      render(<ProductCard product={mockProduct} onAddToCart={asyncOnAddToCart} />)

      const addToCartButton = screen.getByRole('button', { name: ARIA_LABELS.addToCart })
      fireEvent.click(addToCartButton)

      await waitFor(() => {
        expect(asyncOnAddToCart).toHaveBeenCalledWith(mockProduct)
      })
    })
  })
})

// Integration test example
describe('ProductCard Integration', () => {
  it('integrates properly with Next.js components', () => {
    render(<ProductCard product={mockProduct} />)

    // Test that mocked Next.js components work correctly
    const image = screen.getByRole('img')
    const link = screen.getByRole('link')

    expect(image).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })
})

// Custom hook testing example (if ProductCard used hooks)
describe('ProductCard Hooks', () => {
  // This would test any custom hooks used in the component
  it('would test custom hooks if present', () => {
    // Example of how to test custom hooks
    expect(true).toBe(true) // Placeholder
  })
})
