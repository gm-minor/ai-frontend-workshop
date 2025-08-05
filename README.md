# TechStore - E-Commerce Frontend

A modern e-commerce frontend built with Next.js 15, TypeScript, and Tailwind CSS 4.0, featuring a comprehensive design system and optimized for performance.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS 4.0
- **Comprehensive Design System**: Based on design guidelines with custom theme configuration
- **Product Catalog**: Browse 17 tech products across 3 categories (Smartphones, Laptops, Headphones)
- **Advanced Search & Filtering**: Real-time search with category filtering
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Performance Optimized**: Image optimization, lazy loading, and efficient data handling
- **Type-Safe**: Full TypeScript implementation with comprehensive type definitions
- **Accessible**: WCAG compliant with proper focus management and semantic HTML

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with theme configuration
│   ├── page.tsx           # Home page
│   ├── product/[id]/      # Dynamic product detail pages
│   └── globals.css        # Global styles with design system
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Header, SideMenu)
│   └── product/          # Product-specific components
├── data/                 # Static JSON data
│   ├── products.json     # Product catalog
│   └── categories.json   # Category definitions
├── lib/                  # Utility functions and configurations
│   ├── constants.ts      # App constants and configuration
│   ├── data.ts          # Data loading functions
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
    └── index.ts         # All type definitions
```

## 🎨 Design System

Our design system follows modern e-commerce best practices:

### Colors
- **Primary**: Pure White (#FFFFFF), Pure Black (#000000)
- **Brand**: Brand Red (#DB4444), Bright Red (#FB1314)
- **Secondary**: Light Gray (#F5F5F5), Medium Gray (#D9D9D9)
- **Accent**: Success Green, Warning Orange, Info Blue, Error Red

### Typography
- **Font Stack**: System fonts for optimal performance
- **Scale**: 10px (caption) to 24px (H1) with proper hierarchy
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Layout
- **Grid**: 3-4 products per row on desktop
- **Spacing**: Consistent 4px base unit scale
- **Shadows**: Subtle elevation system
- **Border Radius**: 4px-16px scale for modern look

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Data**: Static JSON files (ready for API integration)
- **Development**: ESLint, TypeScript strict mode

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd ai-workshop
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks
npm run type-check   # Run TypeScript checks
```

## 🏗️ Development Guidelines

### File Naming Conventions
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Types: PascalCase interfaces (e.g., `Product`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_CONFIG`)

### Component Structure
```tsx
// Component with proper TypeScript typing
interface ComponentProps {
  // Props definition
}

export default function Component({ prop }: ComponentProps) {
  // Component implementation
}
```

### Import Organization
```tsx
// 1. React and Next.js imports
import { useState } from 'react'
import Link from 'next/link'

// 2. Third-party imports
import { clsx } from 'clsx'

// 3. Internal imports
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'
```

## 📊 Data Structure

### Product Schema
```typescript
interface Product {
  id: string;              // Unique identifier
  name: string;            // Product name
  description: string;     // Short description
  price: number;           // Price in USD
  image: string;           // Image URL
  categoryId: string;      // Category reference
  inStock: boolean;        // Availability status
  rating: {
    average: number;       // 1.0-5.0 rating
    count: number;         // Number of reviews
  };
}
```

### Category Schema
```typescript
interface Category {
  id: string;              // Unique identifier
  name: string;            // Display name
  slug: string;            // URL-friendly version
}
```

## 🎯 Performance Targets

- **Home Page Load**: < 2 seconds
- **Product Detail**: < 1.5 seconds  
- **Search Response**: < 300ms
- **Category Filter**: < 500ms

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product grid displays 3-4 items per row
- [ ] Category filtering works instantly
- [ ] Search returns relevant results
- [ ] Product detail pages load correctly
- [ ] Related products display properly
- [ ] Navigation works between all pages
- [ ] Error states handle gracefully

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

## 🔧 Configuration

### Tailwind Theme Extension
The design system is configured in `globals.css` using Tailwind 4.0's inline theme syntax:

```css
@theme inline {
  --color-brand-primary: #db4444;
  --font-size-base: 0.875rem;
  --spacing-4: 1rem;
  /* ... more theme variables */
}
```

### Environment Variables
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_APP_URL`: Application URL
- `NEXT_PUBLIC_API_URL`: API base URL (for future use)
- Feature flags for conditional functionality

## 📚 Documentation

- [Project Specification](./ai-docs/spec.md)
- [Project Plan](./ai-docs/project_plan.md)
- [Design Guidelines](./ai-docs/design_guideline.md)
- [App Flow](./ai-docs/app_flow.md)
- [Development Todo](./ai-docs/todo.md)

## 🤝 Contributing

1. Follow the established coding conventions
2. Use TypeScript for all new code
3. Follow the design system guidelines
4. Test on multiple screen sizes
5. Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
1. Check the documentation in `ai-docs/`
2. Review the type definitions in `src/types/`
3. Examine the utility functions in `src/lib/`

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
