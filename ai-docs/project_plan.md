# E-Commerce Frontend Project Plan

## Overview
This document provides a detailed, step-by-step blueprint for building the e-commerce frontend application as specified in `spec.md`. The plan is broken down into small, incremental chunks that build on each other, ensuring safe implementation with no orphaned code.

## Project Blueprint

### High-Level Architecture
1. **Foundation**: Next.js project setup with TypeScript and Tailwind
2. **Data Layer**: Static JSON data and TypeScript interfaces
3. **Core Components**: Basic UI components (Header, SideMenu, ProductCard)
4. **Pages**: Home page with product display
5. **Routing**: Product detail page with navigation
6. **Interactivity**: Filtering, search, and state management
7. **Polish**: Dark theme, styling, and final integration

### Development Phases
- **Phase 1**: Foundation & Data (15 minutes)
- **Phase 2**: Core Components (15 minutes)
- **Phase 3**: Pages & Routing (15 minutes)
- **Phase 4**: Interactivity & Polish (15 minutes)

---

## Implementation Steps

### Step 1: Project Foundation Setup

**Objective**: Set up the Next.js project with TypeScript, Tailwind CSS, and basic project structure.

**Dependencies**: Clean Next.js installation

**Deliverable**: Working Next.js app with Tailwind CSS configured

```
Set up a Next.js 13+ project with TypeScript and Tailwind CSS. The project should use the app directory structure. Install and configure the following:

1. Create a new Next.js project with TypeScript
2. Install and configure Tailwind CSS
3. Set up the basic app directory structure with:
   - app/layout.tsx (root layout)
   - app/page.tsx (home page)
   - app/globals.css (global styles with Tailwind)
4. Configure Tailwind for dark theme as the default
5. Create the basic folder structure:
   - src/components/ (for reusable components)
   - src/types/ (for TypeScript interfaces)
   - src/data/ (for static JSON data)
   - src/lib/ (for utility functions)
6. Verify the setup works by running the development server

Make sure the project follows Next.js 13+ app directory conventions and has proper TypeScript configuration. The app should display the default Next.js welcome page with dark theme styling applied.
```

### Step 2: TypeScript Interfaces and Data Structure

**Objective**: Define TypeScript interfaces and create the foundational data structure.

**Dependencies**: Step 1 (project setup)

**Deliverable**: TypeScript interfaces and utility functions ready for use

```
Create TypeScript interfaces and utility functions for the e-commerce application. Based on the specification, implement:

1. In src/types/product.ts, create TypeScript interfaces for:
   - Product interface with fields: id, name, price, brand, image, category
   - Category type (union type for "smartphones" | "laptops" | "headphones")
   - ProductCategory interface for menu items

2. In src/lib/utils.ts, create utility functions for:
   - formatPrice function (takes number, returns formatted string with $)
   - filterProductsByCategory function
   - searchProducts function (basic text search across name and brand)

3. Create a basic data structure in src/data/products.json with:
   - 3 sample products (1 from each category) to start with
   - Follow the exact JSON structure from the specification
   - Use placeholder image paths for now (/images/product-1.jpg format)

Ensure all TypeScript interfaces are properly exported and the utility functions include proper type annotations. The data should be valid JSON and match the interface specifications exactly.
```

### Step 3: Static Product Data Creation

**Objective**: Create comprehensive product data for all 60 products across 3 categories.

**Dependencies**: Step 2 (TypeScript interfaces)

**Deliverable**: Complete products.json file with 60 realistic products

```
Expand the products.json file to include all 60 products as specified. Create realistic product data following these guidelines:

1. Expand src/data/products.json to include:
   - 20 smartphones (various brands: Apple, Samsung, Google, OnePlus)
   - 20 laptops (various brands: Apple, Dell, HP, Lenovo, ASUS)
   - 20 headphones (various brands: Sony, Bose, Apple, Sennheiser)

2. For each product, ensure:
   - Unique sequential IDs (1-60)
   - Realistic product names (iPhone 15 Pro, MacBook Air M2, etc.)
   - Varied price ranges ($50-$2000 depending on category)
   - Authentic brand names
   - Consistent image naming pattern (/images/[category]/product-[id].jpg)
   - Correct category classification

3. Organize the JSON structure with:
   - Products array containing all 60 items
   - Logical grouping by category
   - Consistent formatting and structure

4. Create a data loader function in src/lib/data.ts that:
   - Imports and exports the products data
   - Provides functions like getAllProducts(), getProductsByCategory(), getProductById()
   - Includes proper TypeScript typing

Ensure the data is realistic, well-structured, and ready for immediate use in components. All product data should follow the established TypeScript interfaces.
```

### Step 4: Basic Layout Structure

**Objective**: Create the foundational layout components without complex logic.

**Dependencies**: Step 3 (product data)

**Deliverable**: Header and SideMenu components with basic structure

```
Create the basic layout structure components for the application. Focus on structure and basic styling without complex interactivity:

1. Update app/layout.tsx to:
   - Include proper HTML structure for the dark theme
   - Set up the main layout grid (header, sidebar, main content)
   - Apply Tailwind classes for dark theme background
   - Include proper metadata and viewport settings

2. Create src/components/Header.tsx:
   - Simple header component with dark theme styling
   - Include placeholder logo/brand name
   - Add search input (non-functional for now)
   - Add cart and user account icons (just icons, no functionality)
   - Use flexbox layout with proper spacing
   - Apply rounded corners and subtle shadows as specified

3. Create src/components/SideMenu.tsx:
   - Vertical navigation menu structure
   - List all menu items: Home, All Products, Smartphones, Laptops, Headphones
   - Apply dark theme styling with proper contrast
   - Include hover states for menu items
   - Use consistent spacing and typography

4. Update app/page.tsx to:
   - Import and display Header and SideMenu components
   - Set up the basic grid layout (sidebar + main content area)
   - Add a placeholder main content area
   - Ensure responsive behavior on desktop

Focus on clean, semantic HTML structure and consistent dark theme styling. No JavaScript interactivity needed yet - just the visual foundation.
```

### Step 5: Product Card Component

**Objective**: Create the ProductCard component for displaying individual products.

**Dependencies**: Step 4 (layout components)

**Deliverable**: Reusable ProductCard component with proper styling

```
Create a reusable ProductCard component that displays individual product information according to the specification:

1. Create src/components/ProductCard.tsx:
   - Accept a Product prop with proper TypeScript typing
   - Display product image, name, price, and brand
   - Apply minimal information display as specified
   - Use card layout with rounded corners and shadow
   - Implement proper dark theme styling
   - Include hover effects for better UX
   - Make the entire card clickable (prepare for navigation)

2. Styling requirements:
   - Card should be responsive and fit 3-4 per row
   - Use Tailwind classes for rounded corners and drop shadows
   - Ensure proper spacing between elements
   - Price should be prominently displayed and formatted
   - Image should have proper aspect ratio and object-fit
   - Use consistent typography hierarchy

3. Create src/components/ProductGrid.tsx:
   - Accept an array of products as props
   - Render products in a responsive grid (3-4 columns)
   - Use CSS Grid or Flexbox for layout
   - Apply proper gap spacing between cards
   - Handle empty states gracefully

4. Update app/page.tsx to:
   - Import the product data using the data loader
   - Display a sample of products using ProductGrid
   - Show how the components work together
   - Maintain the existing Header and SideMenu layout

Focus on creating reusable, well-styled components that match the dark theme specification. Ensure the cards look professional and follow the minimal design approach.
```

### Step 6: Product Detail Page Structure

**Objective**: Create the product detail page with proper routing and layout.

**Dependencies**: Step 5 (ProductCard component)

**Deliverable**: Product detail page with routing and basic layout

```
Create the product detail page with Next.js dynamic routing and proper layout structure:

1. Create app/product/[id]/page.tsx:
   - Implement dynamic routing for product IDs
   - Extract product ID from params
   - Fetch product data using getProductById utility
   - Handle invalid/missing product IDs with proper error handling
   - Return 404 for non-existent products

2. Create src/components/ProductDetail.tsx:
   - Accept a Product prop with TypeScript typing
   - Implement the specified layout: image left, details right
   - Display product name, brand, and price prominently
   - Use larger, more prominent styling than ProductCard
   - Apply consistent dark theme styling
   - Include proper responsive behavior

3. Add navigation elements:
   - "Back to All Products" button
   - "Back to [Category]" button (dynamic based on product category)
   - Style buttons with rounded corners and hover effects
   - Use proper Tailwind classes for button styling

4. Update the layout structure:
   - Ensure Header and SideMenu are consistent across pages
   - Maintain the same grid layout as the home page
   - Ensure the detail page integrates seamlessly

5. Add basic linking functionality:
   - Update ProductCard to link to the detail page using Next.js Link
   - Use proper href format: /product/[id]
   - Ensure smooth navigation between pages

Focus on proper routing, clean component structure, and maintaining design consistency. The page should feel like a natural extension of the home page.
```

### Step 7: Category Filtering Logic

**Objective**: Implement category filtering functionality in the sidebar menu.

**Dependencies**: Step 6 (product detail page)

**Deliverable**: Working category filter with state management

```
Implement category filtering functionality using React state management:

1. Create a state management system in app/page.tsx:
   - Add useState for selectedCategory (default: "all")
   - Add useState for filteredProducts
   - Create functions to handle category selection
   - Implement filtering logic using the utility functions

2. Update src/components/SideMenu.tsx:
   - Accept selectedCategory and onCategoryChange props
   - Add click handlers to menu items
   - Implement visual highlighting for the selected category
   - Apply active states with different styling
   - Ensure proper TypeScript typing for props

3. Enhance the filtering system:
   - Update ProductGrid to display filtered products
   - Ensure "All Products" shows all 60 products
   - Category-specific filtering shows only relevant products
   - Maintain product grid layout and responsiveness

4. Add category state persistence:
   - Use URL search parameters to maintain category state
   - Update URL when category changes (without page reload)
   - Read initial category from URL on page load
   - Handle browser back/forward navigation properly

5. Update navigation buttons in ProductDetail:
   - Make "Back to [Category]" return to the correct filtered view
   - Ensure "Back to All Products" clears any filters
   - Use proper Next.js navigation with category parameters

Focus on clean state management, proper TypeScript typing, and smooth user experience. The filtering should feel immediate and maintain state across navigation.
```

### Step 8: Search Functionality

**Objective**: Implement search functionality in the header component.

**Dependencies**: Step 7 (category filtering)

**Deliverable**: Working search feature that integrates with category filtering

```
Implement search functionality that works alongside category filtering:

1. Update the state management in app/page.tsx:
   - Add useState for searchTerm
   - Add useState for searchResults
   - Create search handler function
   - Combine search and category filtering logic
   - Implement debounced search to avoid excessive filtering

2. Update src/components/Header.tsx:
   - Make the search input functional
   - Add onChange handler for search input
   - Implement proper TypeScript typing for search props
   - Add search input styling and placeholder text
   - Include clear search functionality (X button)

3. Enhance the search logic:
   - Use the searchProducts utility function
   - Search across product name and brand fields
   - Make search case-insensitive
   - Combine search results with category filtering
   - Show "no results" state when appropriate

4. Update the user interface:
   - Show search results count when searching
   - Display current search term in the interface
   - Clear search when category is changed (or combine them)
   - Add loading states for better UX

5. Improve the overall filtering experience:
   - Search within selected category vs. search all products
   - Clear and intuitive interaction between search and category filters
   - Proper URL parameter handling for search terms
   - Maintain search state across page navigation

Focus on creating an intuitive search experience that works seamlessly with the existing category filtering. Ensure proper performance with debouncing and efficient filtering algorithms.
```

### Step 9: "You Might Also Like" Section

**Objective**: Add related products section to the product detail page.

**Dependencies**: Step 8 (search functionality)

**Deliverable**: Related products display with proper product recommendations

```
Implement the "You might also like" section for the product detail page:

1. Create recommendation logic in src/lib/utils.ts:
   - Add getRelatedProducts function
   - Find products in the same category (excluding current product)
   - Limit to 4 related products for clean layout
   - Add randomization for variety in recommendations
   - Include proper TypeScript typing

2. Create src/components/RelatedProducts.tsx:
   - Accept currentProduct and allProducts as props
   - Use the recommendation logic to get related products
   - Display related products in a horizontal layout
   - Reuse ProductCard component for consistency
   - Add section heading "You might also like"

3. Update src/components/ProductDetail.tsx:
   - Include RelatedProducts component at the bottom
   - Pass necessary props (current product and all products)
   - Ensure proper spacing and layout integration
   - Maintain responsive behavior

4. Enhance the related products display:
   - Use horizontal scrolling on smaller screens if needed
   - Apply consistent dark theme styling
   - Ensure related product cards link properly to their detail pages
   - Add hover effects and smooth transitions

5. Optimize the user experience:
   - Ensure related products load quickly
   - Handle edge cases (insufficient products in category)
   - Make the section visually distinct but integrated
   - Test navigation flow between related products

Focus on creating a smooth product discovery experience that encourages users to explore more products while maintaining the clean, minimal design aesthetic.
```

### Step 10: Dark Theme Refinement and Polish

**Objective**: Polish the dark theme implementation and ensure consistent styling across all components.

**Dependencies**: Step 9 (related products)

**Deliverable**: Fully polished dark theme with consistent styling and smooth interactions

```
Refine and polish the dark theme implementation across all components:

1. Create a comprehensive dark theme color system:
   - Define consistent color variables in globals.css
   - Use Tailwind's dark mode classes systematically
   - Ensure proper contrast ratios for accessibility
   - Create hover and focus states for all interactive elements

2. Polish component styling:
   - Review and enhance Header component styling
   - Refine SideMenu hover and active states
   - Perfect ProductCard shadow and border effects
   - Enhance ProductDetail layout and typography
   - Improve button styling with consistent rounded corners

3. Add smooth transitions and micro-interactions:
   - Add hover transitions to all clickable elements
   - Implement smooth category switching animations
   - Add loading states where appropriate
   - Create subtle animations for product card interactions

4. Ensure responsive design quality:
   - Test and refine desktop-first responsive behavior
   - Ensure proper spacing and layout on different screen sizes
   - Verify that the 3-4 products per row layout works well
   - Test navigation and interaction on various devices

5. Final integration and testing:
   - Verify all components work together seamlessly
   - Test the complete user flow from home to product detail and back
   - Ensure search and filtering work correctly together
   - Verify all links and navigation work properly
   - Test edge cases and error states

6. Performance optimization:
   - Optimize image loading with Next.js Image component
   - Ensure efficient re-renders during filtering/search
   - Add proper loading states for better perceived performance

Focus on creating a polished, professional-looking application that demonstrates best practices in React/Next.js development while meeting the one-hour development timeline.
```

---

## Implementation Guidelines

### Best Practices for Each Step
1. **Start Small**: Each step builds incrementally on the previous
2. **Test Frequently**: Verify each step works before moving to the next
3. **TypeScript First**: Always include proper type definitions
4. **Component Reusability**: Design components to be reusable and modular
5. **Dark Theme Consistency**: Apply dark theme patterns consistently across all components
6. **Performance Awareness**: Consider performance implications of each implementation choice

### Error Handling Strategy
- Graceful degradation for missing data
- Proper TypeScript error catching
- User-friendly error messages
- Fallback states for all components

### Testing Strategy
- Manual testing after each step
- Verify responsive behavior
- Test navigation flows
- Validate data filtering and search

### Integration Points
Each step is designed to integrate seamlessly with previous steps, ensuring no orphaned code and maintaining a working application at every stage.

---

## Success Metrics

### Technical Success
- [ ] All components render correctly
- [ ] TypeScript compilation without errors
- [ ] Responsive design works on desktop
- [ ] Dark theme applied consistently
- [ ] All navigation links work properly

### User Experience Success
- [ ] Intuitive navigation between pages
- [ ] Fast and responsive filtering/search
- [ ] Smooth transitions and interactions
- [ ] Professional visual design
- [ ] Complete user flow functionality

### Timeline Success
- [ ] Each step completable in 6-8 minutes
- [ ] Total implementation under 60 minutes
- [ ] No major refactoring required between steps
