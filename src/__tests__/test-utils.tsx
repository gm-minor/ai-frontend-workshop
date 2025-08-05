import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import type { Product, Category } from '../types'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Export everything
export * from '@testing-library/react'
export { customRender as render }
export { userEvent }

// Mock data generators
export const createMockProduct = (overrides?: Partial<Product>): Product => ({
  id: '1',
  name: 'Test Product',
  description: 'This is a test product description.',
  price: 999.99,
  image: 'https://picsum.photos/300/300?random=1',
  categoryId: 'smartphones',
  inStock: true,
  rating: {
    average: 4.5,
    count: 123,
  },
  ...overrides,
})

export const createMockProducts = (count: number = 3): Product[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockProduct({
      id: String(index + 1),
      name: `Test Product ${index + 1}`,
      price: 100 + index * 50,
      image: `https://picsum.photos/300/300?random=${index + 1}`,
    })
  )
}

export const createMockCategory = (overrides?: Partial<Category>): Category => ({
  id: 'smartphones',
  name: 'Smartphones',
  slug: 'smartphones',
  ...overrides,
})

export const createMockCategories = (): Category[] => [
  createMockCategory({ id: 'smartphones', name: 'Smartphones', slug: 'smartphones' }),
  createMockCategory({ id: 'laptops', name: 'Laptops', slug: 'laptops' }),
  createMockCategory({ id: 'headphones', name: 'Headphones', slug: 'headphones' }),
]

// Test helper functions
export const expectElementToBeVisible = (element: HTMLElement) => {
  expect(element).toBeInTheDocument()
  expect(element).toBeVisible()
}

export const expectElementToHaveAccessibleName = (element: HTMLElement, name: string) => {
  expect(element).toHaveAccessibleName(name)
}

export const expectImageToHaveCorrectAttributes = (image: HTMLImageElement, src: string, alt: string) => {
  expect(image).toHaveAttribute('src', src)
  expect(image).toHaveAttribute('alt', alt)
}

// Mock functions
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

export const mockSearchParams = new URLSearchParams()

// Test constants
export const TEST_IDS = {
  productCard: 'product-card',
  productGrid: 'product-grid',
  productDetail: 'product-detail',
  sideMenu: 'side-menu',
  header: 'header',
  searchInput: 'search-input',
  categoryButton: 'category-button',
  loadingSpinner: 'loading-spinner',
  errorMessage: 'error-message',
} as const

export const ARIA_LABELS = {
  productCard: 'product card',
  searchInput: 'search products',
  categoryFilter: 'filter by category',
  addToCart: 'add to cart',
  viewProduct: 'view product details',
} as const

// Custom matchers (extend jest-dom)
export const toBeInRange = (received: number, min: number, max: number) => {
  const pass = received >= min && received <= max
  return {
    pass,
    message: () =>
      pass
        ? `Expected ${received} not to be in range ${min}-${max}`
        : `Expected ${received} to be in range ${min}-${max}`,
  }
}

// Add custom matcher to expect
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInRange(min: number, max: number): R
    }
  }
}

// Async test utilities
export const waitForLoadingToFinish = async () => {
  const { findByTestId, queryByTestId } = await import('@testing-library/react')
  try {
    await findByTestId(document.body, TEST_IDS.loadingSpinner)
    // Wait for loading to disappear
    await new Promise(resolve => {
      const checkLoading = () => {
        if (!queryByTestId(document.body, TEST_IDS.loadingSpinner)) {
          resolve(undefined)
        } else {
          setTimeout(checkLoading, 100)
        }
      }
      checkLoading()
    })
  } catch {
    // Loading spinner not found, probably already finished
  }
}

// Form testing utilities
export const fillFormField = async (user: ReturnType<typeof userEvent.setup>, label: string, value: string) => {
  const field = await import('@testing-library/react').then(({ screen }) => 
    screen.getByLabelText(label)
  )
  await user.clear(field)
  await user.type(field, value)
  return field
}

export const submitForm = async (user: ReturnType<typeof userEvent.setup>, submitButton?: HTMLElement) => {
  const button = submitButton || await import('@testing-library/react').then(({ screen }) => 
    screen.getByRole('button', { name: /submit/i })
  )
  if (button) {
    await user.click(button)
  }
}

// Accessibility testing utilities
export const checkBasicAccessibility = (container: HTMLElement) => {
  // Check for proper heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  headings.forEach(heading => {
    expect(heading).toBeVisible()
  })

  // Check for alt text on images
  const images = container.querySelectorAll('img')
  images.forEach(image => {
    expect(image).toHaveAttribute('alt')
  })

  // Check for proper button/link accessibility
  const buttons = container.querySelectorAll('button')
  buttons.forEach(button => {
    expect(button).toBeEnabled()
  })

  const links = container.querySelectorAll('a')
  links.forEach(link => {
    expect(link).toHaveAttribute('href')
  })
}
