# Testing Guide for AI Workshop Project

This guide demonstrates how to write comprehensive unit tests for React components using Jest and React Testing Library in our Next.js 15 project.

## Testing Setup

Our project is configured with:
- **Jest 29.7.0**: JavaScript testing framework
- **React Testing Library 16.0.0**: Simple and complete testing utilities for React
- **Jest DOM**: Custom Jest matchers for DOM testing
- **User Event**: Advanced simulation of user interactions

## Test File Structure

```
src/
├── __tests__/
│   ├── test-utils.tsx          # Shared testing utilities
│   ├── setup.test.js           # Basic setup validation
│   └── example-ProductCard.test.tsx  # Comprehensive component test example
├── components/
│   └── [ComponentName]/
│       ├── [ComponentName].tsx
│       └── [ComponentName].test.tsx
```

## Key Testing Patterns

### 1. Basic Component Rendering

```typescript
import { render, screen } from './test-utils'
import { MyComponent } from '../components/MyComponent'

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 2. User Interaction Testing

```typescript
import { render, screen, userEvent } from './test-utils'

it('handles button clicks', async () => {
  const user = userEvent.setup()
  const mockClick = jest.fn()
  
  render(<Button onClick={mockClick}>Click me</Button>)
  
  await user.click(screen.getByRole('button'))
  expect(mockClick).toHaveBeenCalledTimes(1)
})
```

### 3. Form Testing

```typescript
import { render, screen, userEvent } from './test-utils'

it('submits form with correct data', async () => {
  const user = userEvent.setup()
  const mockSubmit = jest.fn()
  
  render(<ContactForm onSubmit={mockSubmit} />)
  
  await user.type(screen.getByLabelText(/name/i), 'John Doe')
  await user.type(screen.getByLabelText(/email/i), 'john@example.com')
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
```

### 4. Async Operations

```typescript
import { render, screen, waitFor } from './test-utils'

it('loads data asynchronously', async () => {
  render(<AsyncDataComponent />)
  
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded!')).toBeInTheDocument()
  })
})
```

### 5. Props Validation

```typescript
it('displays product information correctly', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg'
  }
  
  render(<ProductCard product={product} />)
  
  expect(screen.getByText('Test Product')).toBeInTheDocument()
  expect(screen.getByText('$99.99')).toBeInTheDocument()
  expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg')
})
```

### 6. Accessibility Testing

```typescript
it('has proper accessibility attributes', () => {
  render(<ProductCard product={mockProduct} />)
  
  const button = screen.getByRole('button', { name: /add to cart/i })
  expect(button).toHaveAccessibleName('Add to cart')
  
  const image = screen.getByRole('img')
  expect(image).toHaveAttribute('alt', expect.any(String))
})
```

### 7. Error Handling

```typescript
it('handles errors gracefully', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
  
  render(<ComponentWithError shouldError={true} />)
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  
  consoleSpy.mockRestore()
})
```

### 8. Snapshot Testing

```typescript
it('matches snapshot', () => {
  const { container } = render(<ProductCard product={mockProduct} />)
  expect(container.firstChild).toMatchSnapshot()
})
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ProductCard

# Run tests with verbose output
npm test -- --verbose
```

### Debugging Tests

```bash
# Run with debugging info
npm test -- --verbose --no-cache

# Run single test file
npm test -- src/__tests__/MyComponent.test.tsx

# Update snapshots
npm test -- --updateSnapshot
```

## Mock Usage Examples

### Mocking Next.js Components

```typescript
// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))
```

### Mocking API Calls

```typescript
// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' }),
  })
) as jest.Mock

// Mock external API
jest.mock('../lib/api', () => ({
  fetchProducts: jest.fn(() => Promise.resolve(mockProducts)),
  createProduct: jest.fn(() => Promise.resolve(mockProduct)),
}))
```

## Best Practices

### 1. Test Structure (AAA Pattern)
- **Arrange**: Set up test data and environment
- **Act**: Execute the function/interaction being tested
- **Assert**: Verify the expected outcome

### 2. Test Naming
- Use descriptive test names: `it('should display error message when form submission fails', () => {})`
- Group related tests with `describe` blocks

### 3. Mock Management
- Clear mocks between tests: `beforeEach(() => { jest.clearAllMocks() })`
- Use specific mocks for each test case
- Restore original implementations when needed

### 4. Accessibility First
- Test with screen readers in mind
- Use semantic queries: `getByRole`, `getByLabelText`
- Verify ARIA attributes and labels

### 5. Avoid Implementation Details
- Test behavior, not implementation
- Use user-centric queries
- Focus on what users can see and do

## Coverage Guidelines

Our coverage thresholds are set to:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Coverage Commands

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## Testing Utilities Reference

### Available Test Utilities
- `createMockProduct()`: Creates mock product data
- `createMockCategories()`: Creates mock category data
- `expectElementToBeVisible()`: Custom assertion for visibility
- `waitForLoadingToFinish()`: Waits for loading states
- `fillFormField()`: Helper for form interactions
- `checkBasicAccessibility()`: Basic accessibility checks

### Custom Matchers
- `toBeInRange(min, max)`: Checks if number is within range
- All jest-dom matchers: `toBeInTheDocument`, `toHaveClass`, etc.

## Troubleshooting

### Common Issues

1. **Tests hanging**: Check for async operations without proper awaiting
2. **Module not found**: Verify import paths and Jest configuration
3. **Snapshot mismatches**: Run with `--updateSnapshot` if changes are intentional
4. **Mock not working**: Ensure mocks are defined before imports

### Debug Mode

```typescript
// Add debugging to tests
import { screen, debug } from './test-utils'

it('debugs test output', () => {
  render(<MyComponent />)
  screen.debug() // Prints DOM to console
})
```

## Next Steps

1. **Write Component Tests**: Start with your main components
2. **Add Integration Tests**: Test component interactions
3. **Performance Tests**: Add tests for loading states and optimization
4. **E2E Tests**: Consider adding Playwright or Cypress for full user flows

This testing setup provides a solid foundation for maintaining code quality and catching regressions early in development.
