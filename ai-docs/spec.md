# E-Commerce Frontend Specification

## Project Overview
A Proof of Concept (PoC) e-commerce frontend for browsing and viewing electronic products, organized by categories. Built with Next.js, TypeScript, and Tailwind CSS, using static JSON files as data sources. Development time: 1 hour.

## Technical Stack
- **Framework**: Next.js 13+ (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Static JSON files
- **Deployment**: Development environment

## Product Categories & Data Structure

### Categories
- **Smartphones** (20 products)
- **Laptops** (20 products)
- **Headphones** (20 products)
- **Total**: 60 products

### Product Data Model
Each product contains:
- `id`: Unique identifier
- `name`: Product name
- `price`: Product price (number)
- `brand`: Manufacturer brand
- `image`: Product image URL
- `category`: Category classification

### JSON Data Structure
```json
{
  "products": [
    {
      "id": "1",
      "name": "iPhone 15 Pro",
      "price": 999,
      "brand": "Apple",
      "image": "/images/iphone-15-pro.jpg",
      "category": "smartphones"
    }
  ]
}
```

## Application Layout

### Header Component
- **Brand/Logo**: Site branding
- **Search Bar**: Product search functionality
- **Shopping Cart Icon**: Cart access
- **User Account Icon**: User profile access
- **Styling**: Dark theme, clean minimal design

### Left Side Menu Component
- **Navigation Options**:
  - Home
  - All Products
  - Smartphones
  - Laptops
  - Headphones
- **Behavior**: 
  - Selected category visually highlighted
  - Filters main content based on selection
- **Styling**: Consistent with dark theme

### Main Content Area
- Displays filtered product grid
- Responsive layout (desktop-first)

### No Footer Component
- Footer component skipped for this PoC

## Page Structure

### Home Page (`/`)
**Layout**:
- Header at top
- Left side menu for navigation
- Main content area with product grid

**Product Display**:
- **Grid Layout**: 3-4 products per row
- **Product Cards**: Minimal information display
  - Product image
  - Product name
  - Price
  - Brand
- **Filtering**: By category via left menu
- **Default Order**: No sorting, display in JSON order
- **Navigation**: Click product card → Product Detail page

**Initial State**:
- All products displayed by default
- "All Products" menu item highlighted

### Product Detail Page (`/product/[id]`)
**Layout**:
- Header at top
- Left side menu (consistent)
- Main content with product details

**Content Layout**:
- **Left Side**: Large product image
- **Right Side**: Product details
  - Product name (prominent)
  - Brand
  - Price (prominent)
- **Navigation Buttons**:
  - "Back to [Category]" button
  - "Back to All Products" button
- **Additional Section**:
  - "You might also like" section with related products

**Behavior**:
- Accessible via product card clicks from Home page
- Navigation buttons return to appropriate filtered view

## User Experience Flow

1. **Landing**: User arrives at Home page, sees all products
2. **Browse**: User can filter by category using left menu
3. **View Details**: User clicks product card → Product Detail page
4. **Return**: User uses back buttons to return to browsing
5. **Search**: User can search products via header search bar

## Styling Guidelines

### Design System
- **Theme**: Dark theme throughout
- **Design Approach**: Clean and minimal
- **Components**: Rounded corners and subtle shadows
- **Responsive**: Desktop-first approach

### Color Scheme (Dark Theme)
- **Background**: Dark grays/blacks
- **Text**: Light colors for contrast
- **Accent**: Subtle color for highlights/buttons
- **Cards**: Dark cards with subtle borders/shadows

### Component Styling
- **Cards**: Rounded corners, drop shadows
- **Buttons**: Rounded, hover effects
- **Menu**: Highlight selected items
- **Typography**: Clean, readable fonts

## File Organization

### Directory Structure
```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx         # Product detail page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Header.tsx               # Header component
│   ├── SideMenu.tsx             # Left navigation menu
│   ├── ProductCard.tsx          # Product card component
│   ├── ProductGrid.tsx          # Product grid layout
│   └── ProductDetail.tsx        # Product detail display
├── data/
│   └── products.json            # Static product data
├── types/
│   └── product.ts               # TypeScript interfaces
└── lib/
    └── utils.ts                 # Utility functions
```

### Data Files
- **products.json**: Contains all 60 products with complete data structure
- **Image assets**: Stored in `public/images/` directory

## Component Specifications

### ProductCard Component
- **Props**: Product object
- **Display**: Image, name, price, brand
- **Behavior**: Click → navigate to detail page
- **Styling**: Card layout with rounded corners and shadow

### SideMenu Component
- **Props**: Current selected category
- **Options**: Home, All Products, Categories
- **Behavior**: Filter products, highlight selection
- **Styling**: Vertical menu, dark theme

### Header Component
- **Elements**: Logo, search bar, cart icon, account icon
- **Behavior**: Search functionality, navigation icons
- **Styling**: Horizontal layout, dark theme

### ProductDetail Component
- **Layout**: Image left, details right
- **Content**: All product information prominently displayed
- **Navigation**: Back buttons, related products
- **Styling**: Large layout, emphasis on product info

## Development Priorities

### Phase 1 (Core - 40 minutes)
1. Set up project structure and routing
2. Create static JSON data
3. Implement Home page with product grid
4. Basic product filtering by category
5. Product detail page navigation

### Phase 2 (Polish - 20 minutes)
1. Styling and dark theme implementation
2. Header component with icons
3. "You might also like" section
4. Responsive adjustments
5. Final polish and testing

## Edge Cases & Considerations

### Data Handling
- Handle missing product images gracefully
- Ensure price formatting consistency
- Validate product data structure

### Navigation
- Handle direct URL access to product pages
- Maintain category selection state
- Handle invalid product IDs

### Performance
- Optimize image loading
- Efficient filtering/search implementation
- Component re-render optimization

## Success Criteria
- [x] All 60 products displayable and filterable
- [x] Clean, functional navigation between pages
- [x] Responsive design working on desktop
- [x] Dark theme consistently applied
- [x] Search functionality operational
- [x] Product detail pages fully functional
- [x] One-hour development timeline met
