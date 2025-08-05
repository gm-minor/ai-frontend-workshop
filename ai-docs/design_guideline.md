# UI/UX Style Guide: E-Commerce Platform Design System (Light Theme)

## General Overview of the Design System

This e-commerce platform employs a clean, minimalist design system that prioritizes clarity, usability, and conversion optimization. The design follows modern web standards with a focus on accessibility, visual hierarchy, and seamless user experience across all touchpoints.

### Design Philosophy

- **Clarity First**: Clean layouts with strategic use of white space to enhance content readability
- **Conversion-Driven**: Visual hierarchy guides users toward key actions and product discovery
- **Accessibility-Focused**: High contrast ratios and clear visual indicators ensure inclusive design
- **Brand Consistency**: Cohesive visual language that builds trust and recognition


### Visual Language

- **Style**: Modern, clean, and professional
- **Mood**: Trustworthy, efficient, and user-friendly
- **Aesthetic**: Minimalist with strategic color accents
- **Target Audience**: General consumers seeking electronics and gaming products


### Design Principles Applied

- **Visual Hierarchy**: Clear information architecture using typography, spacing, and color
- **Consistency**: Unified component library ensuring coherent user experience
- **Simplicity**: Reduced cognitive load through clean, uncluttered interfaces
- **Accessibility**: WCAG 2.1 AA compliance with proper contrast ratios and semantic structure


---

## Color Palette

### Primary Colors

- **Pure White**: `#FFFFFF` - Primary background, card surfaces, clean canvas
- **Pure Black**: `#000000` - Primary text, high-emphasis content, maximum contrast
- **Brand Red**: `#DB4444` - Primary CTA buttons, brand accent, conversion elements
- **Bright Red**: `#FB1314` - Hover states, active elements, interactive feedback


### Secondary Colors

- **Light Gray**: `#F5F5F5` - Secondary backgrounds, product containers, subtle surfaces
- **Medium Gray**: `#D9D9D9` - Borders, dividers, structural elements
- **Dark Gray**: `#1C1B1F` - Secondary text, body copy, medium emphasis
- **Charcoal**: `#030406` - High-contrast text, strong emphasis elements


### Accent Colors

- **Warning Orange**: `#FFAD33` - Star ratings, warning indicators, positive highlights
- **Success Green**: `#00FF66` - Stock status, success messages, positive states
- **Info Blue**: `#A0BCE0` - Product variants, informational elements, neutral highlights
- **Error Red**: `#E07575` - Error states, destructive actions, negative feedback


### Color Usage Guidelines

- **Primary Actions**: Use Brand Red (`#DB4444`) for main CTAs and important actions
- **Text Hierarchy**: Pure Black for headings, Dark Gray for body text
- **Backgrounds**: White for main content, Light Gray for secondary surfaces
- **Status Indicators**: Green for positive, Orange for warnings, Red for errors


---

## Typography

### Font Family

- **Primary**: System font stack for optimal performance and native feel
- **Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Fallback**: Generic sans-serif for maximum compatibility


### Font Scale & Hierarchy

- **H1 (Page Title)**: 24px, Semibold (600) - Main page headings
- **H2 (Section Title)**: 20px, Semibold (600) - Section headers, category titles
- **H3 (Card Title)**: 16px, Medium (500) - Product names, card headers
- **Body Large**: 16px, Regular (400) - Primary body text, descriptions
- **Body Medium**: 14px, Regular (400) - Secondary text, labels
- **Body Small**: 12px, Regular (400) - Captions, metadata
- **Caption**: 10px, Regular (400) - Fine print, legal text


### Font Weights

- **Regular (400)**: Body text, descriptions, general content
- **Medium (500)**: Card titles, labels, subtle emphasis
- **Semibold (600)**: Headings, section titles, strong emphasis
- **Bold (700)**: Reserved for critical emphasis and price highlights


### Line Height & Spacing

- **Headings**: 1.2x line height for compact, impactful presentation
- **Body Text**: 1.5x line height for optimal readability
- **Letter Spacing**: Default system spacing, no custom adjustments


---

## Font and Background Colors by UI Section

### Header Section

- **Background**: `#FFFFFF` (Pure White)
- **Border**: `#D9D9D9` (Medium Gray) - 1px bottom border
- **Logo Text**: `#000000` (Pure Black) - 24px, Bold (700)
- **Navigation Links**: `#000000` (Pure Black) - 16px, Regular (400)
- **Navigation Hover**: `#DB4444` (Brand Red) - Interactive feedback
- **Search Input**:

- Background: `#F5F5F5` (Light Gray)
- Text: `#000000` (Pure Black)
- Placeholder: `#1C1B1F` (Dark Gray)
- Border: None (borderless design)



- **Icon Colors**: `#000000` (Pure Black) with `#F5F5F5` hover background


### Navigation Breadcrumb

- **Background**: `#FFFFFF` (Pure White)
- **Primary Text**: `#1C1B1F` (Dark Gray) - 14px, Regular (400)
- **Current Page**: `#DB4444` (Brand Red) - 14px, Regular (400)
- **Separators**: `#1C1B1F` (Dark Gray) - "/" character


### Sidebar ("Explore Our Products")

- **Background**: `#FFFFFF` (Pure White)
- **Border**: `#D9D9D9` (Medium Gray) - 1px solid border
- **Section Title**: `#000000` (Pure Black) - 18px, Semibold (600)
- **Product Names**: `#000000` (Pure Black) - 10px, Regular (400)
- **Product Prices**: `#DB4444` (Brand Red) - 10px, Semibold (600)
- **Product Containers**:

- Default: `#F5F5F5` (Light Gray)
- Black Variant: `#000000` (Pure Black)
- Red Accent: `#DB4444` (Brand Red)



- **CTA Button**:

- Background: `#DB4444` (Brand Red)
- Text: `#FFFFFF` (Pure White) - 14px, Medium (500)
- Hover: `#FB1314` (Bright Red)





### Main Content Area

- **Background**: `#FFFFFF` (Pure White)
- **Product Title**: `#000000` (Pure Black) - 24px, Semibold (600)
- **Product Price**: `#000000` (Pure Black) - 24px, Semibold (600)
- **Body Text**: `#000000` (Pure Black) - 16px, Regular (400)
- **Secondary Text**: `#1C1B1F` (Dark Gray) - 14px, Regular (400)
- **Success Indicators**: `#00FF66` (Success Green) - 14px, Regular (400)
- **Review Count**: `#1C1B1F` (Dark Gray) - 14px, Regular (400)
- **Star Ratings**: `#FFAD33` (Warning Orange) - filled stars
- **Inactive Stars**: `#D9D9D9` (Medium Gray) - empty stars


### Product Image Containers

- **Background**: `#F5F5F5` (Light Gray)
- **Border**: None or `#D9D9D9` (Medium Gray) when needed
- **Border Radius**: 8px for consistent rounded corners
- **Padding**: 16px-32px depending on container size


### Interactive Elements

#### Primary Buttons

- **Background**: `#DB4444` (Brand Red)
- **Text**: `#FFFFFF` (Pure White) - 14px, Medium (500)
- **Hover State**: `#FB1314` (Bright Red)
- **Border**: None
- **Border Radius**: 4px
- **Padding**: 12px 24px


#### Secondary Buttons

- **Background**: `transparent`
- **Text**: `#000000` (Pure Black) - 14px, Medium (500)
- **Border**: `#D9D9D9` (Medium Gray) - 1px solid
- **Hover Background**: `#F5F5F5` (Light Gray)
- **Border Radius**: 4px
- **Padding**: 8px 16px


#### Selected State

- **Background**: `#DB4444` (Brand Red)
- **Text**: `#FFFFFF` (Pure White)
- **Border**: `#DB4444` (Brand Red)


#### Input Fields

- **Background**: `#F5F5F5` (Light Gray)
- **Text**: `#000000` (Pure Black) - 14px, Regular (400)
- **Placeholder**: `#1C1B1F` (Dark Gray)
- **Border**: None (borderless design)
- **Focus State**: Subtle shadow or border highlight


### Product Cards (Related Items)

- **Background**: `#FFFFFF` (Pure White)
- **Border**: `#D9D9D9` (Medium Gray) - 1px solid
- **Border Radius**: 8px
- **Product Container**: `#F5F5F5` (Light Gray)
- **Product Names**: `#000000` (Pure Black) - 16px, Medium (500)
- **Current Prices**: `#DB4444` (Brand Red) - 16px, Semibold (600)
- **Crossed-out Prices**: `#1C1B1F` (Dark Gray) - 14px, Regular (400) with strikethrough
- **Review Text**: `#1C1B1F` (Dark Gray) - 12px, Regular (400)
- **Star Ratings**: `#FFAD33` (Warning Orange) filled, `#D9D9D9` empty


### Information Panels

- **Background**: `#FFFFFF` (Pure White)
- **Border**: `#D9D9D9` (Medium Gray) - 1px solid
- **Border Radius**: 8px
- **Icon Containers**: `#000000` (Pure Black) background with white icons
- **Primary Text**: `#000000` (Pure Black) - 16px, Medium (500)
- **Secondary Text**: `#1C1B1F` (Dark Gray) - 14px, Regular (400)


### Footer Section

- **Background**: `#000000` (Pure Black)
- **Primary Headings**: `#FFFFFF` (Pure White) - 18px, Semibold (600)
- **Secondary Text**: `#FFFFFF` (Pure White) - 14px, Regular (400)
- **Link Text**: `#9CA3AF` (Gray-400) - 14px, Regular (400)
- **Link Hover**: `#FFFFFF` (Pure White)
- **Input Fields**:

- Background: `transparent`
- Border: `#FFFFFF` (Pure White) - 1px solid
- Text: `#FFFFFF` (Pure White)
- Placeholder: `#9CA3AF` (Gray-400)



- **Divider**: `#374151` (Gray-700) - 1px solid
- **Copyright Text**: `#9CA3AF` (Gray-400) - 14px, Regular (400)


---

## Spacing and Grid System

### Grid Structure

- **Container Max Width**: 1200px
- **Grid Columns**: 12-column system
- **Sidebar**: 3 columns (25%)
- **Main Content**: 9 columns (75%)
- **Gutter**: 32px between major sections


### Spacing Scale

- **4px**: Micro spacing (icon padding)
- **8px**: Small spacing (button padding)
- **12px**: Medium spacing (card padding)
- **16px**: Standard spacing (section margins)
- **24px**: Large spacing (component separation)
- **32px**: Extra large spacing (major sections)
- **48px**: Section spacing (between major blocks)


### Component Spacing

- **Cards**: 24px internal padding
- **Buttons**: 12px vertical, 24px horizontal padding
- **Input Fields**: 12px vertical, 16px horizontal padding
- **Product Grid**: 24px gaps between items


This comprehensive color and typography system ensures consistent, accessible, and visually appealing interfaces across all platform touchpoints while maintaining strong brand identity and optimal user experience.