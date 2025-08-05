# 🌐 Pre-Launch Accessibility Checklist for React Frontend

## 📋 **Overview**
This checklist ensures your e-commerce React application meets WCAG 2.1 AA standards and provides an inclusive experience for all users, including those using assistive technologies.

---

## 🎯 **Critical Success Metrics**
- **Target**: WCAG 2.1 AA compliance (minimum)
- **Tools**: axe-core, WAVE, Lighthouse accessibility audit
- **Testing**: Manual screen reader testing + automated tools
- **Browser Support**: Latest 2 versions of major browsers + assistive technologies

---

## 🔘 **UI Elements & Components**

### **Buttons & Interactive Elements**
- [ ] **Semantic HTML**: Use `<button>` for actions, `<a>` for navigation
- [ ] **Accessible Names**: All buttons have descriptive text or `aria-label`
- [ ] **Focus Indicators**: Visible focus rings on keyboard navigation
- [ ] **States**: Proper disabled, loading, and pressed states
- [ ] **Size**: Minimum 44x44px touch target (mobile)
- [ ] **Keyboard Support**: Space/Enter triggers button actions

```tsx
// ✅ Good Button Example
<button 
  className="btn-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
  disabled={isLoading}
  aria-label={isLoading ? "Adding to cart..." : "Add to cart"}
>
  {isLoading ? <Spinner /> : "Add to Cart"}
</button>

// ❌ Bad Button Example
<div onClick={handleClick}>Click me</div> // No keyboard support
```

### **Forms & Inputs**
- [ ] **Labels**: Every input has associated `<label>` or `aria-label`
- [ ] **Error Handling**: Clear error messages with `aria-describedby`
- [ ] **Required Fields**: Marked with `required` attribute and visual indicators
- [ ] **Autocomplete**: Appropriate `autocomplete` attributes for user data
- [ ] **Fieldsets**: Related form controls grouped with `<fieldset>` and `<legend>`
- [ ] **Validation**: Real-time validation with clear error states

```tsx
// ✅ Good Form Example
<div className="form-field">
  <label htmlFor="email" className="required">Email Address</label>
  <input
    id="email"
    type="email"
    required
    autoComplete="email"
    aria-describedby={hasError ? "email-error" : undefined}
    aria-invalid={hasError}
    className={`input ${hasError ? 'input-error' : ''}`}
  />
  {hasError && (
    <div id="email-error" role="alert" className="error-message">
      Please enter a valid email address
    </div>
  )}
</div>
```

### **Modals & Overlays**
- [ ] **Focus Management**: Focus traps within modal, returns to trigger on close
- [ ] **Escape Key**: ESC key closes modal
- [ ] **Background**: Background is inert (non-interactive)
- [ ] **Accessible Names**: Modal has `aria-labelledby` or `aria-label`
- [ ] **Role**: Use `role="dialog"` or `role="alertdialog"`
- [ ] **Initial Focus**: Focus moves to modal content on open

```tsx
// ✅ Good Modal Example
const Modal = ({ isOpen, onClose, title, children }) => {
  const focusTrapRef = useFocusTrap(isOpen);
  
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="modal-overlay"
      ref={focusTrapRef}
    >
      <div className="modal-content">
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close modal">×</button>
      </div>
    </div>
  );
};
```

### **Cards & Product Listings**
- [ ] **Semantic Structure**: Use proper heading hierarchy (`h1`, `h2`, `h3`)
- [ ] **Interactive Areas**: Entire card clickable with single tab stop
- [ ] **Images**: All images have descriptive `alt` text
- [ ] **Price Information**: Clear price formatting with currency
- [ ] **Stock Status**: Announced to screen readers

```tsx
// ✅ Good Product Card
<article className="product-card">
  <Link href={`/products/${product.id}`} className="card-link">
    <img 
      src={product.image} 
      alt={`${product.name} - ${product.brand}`}
      className="product-image"
    />
    <div className="product-info">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">
        <span className="sr-only">Price: </span>
        ${product.price}
      </p>
      <p className="stock-status" aria-live="polite">
        {product.inStock ? "In stock" : "Out of stock"}
      </p>
    </div>
  </Link>
</article>
```

---

## 🧭 **Navigation & Focus Management**

### **Keyboard Navigation**
- [ ] **Tab Order**: Logical tab sequence through all interactive elements
- [ ] **Skip Links**: "Skip to main content" link for keyboard users
- [ ] **Roving Tabindex**: Complex widgets (grids, menus) use roving tabindex
- [ ] **Arrow Keys**: Arrow key navigation for menus, tabs, carousels
- [ ] **Custom Components**: All custom interactive components are keyboard accessible

### **Focus Management**
- [ ] **Visible Focus**: High contrast focus indicators (3:1 ratio minimum)
- [ ] **Focus Trapping**: Modals, dropdowns trap focus appropriately
- [ ] **Focus Return**: Focus returns to trigger element after modal/dropdown closes
- [ ] **Page Navigation**: Focus management for SPA route changes
- [ ] **Loading States**: Focus preserved during loading/async operations

```tsx
// ✅ Good Focus Management for Route Changes
const useRouteAnnouncement = () => {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Announce page change to screen readers
      const announcement = document.getElementById('route-announcer');
      if (announcement) {
        announcement.textContent = `Navigated to ${getPageTitle(url)}`;
      }
      
      // Focus main content
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router]);
};
```

### **Menu & Dropdown Navigation**
- [ ] **ARIA States**: Proper `aria-expanded`, `aria-haspopup` attributes
- [ ] **Arrow Key Navigation**: Up/down arrows navigate menu items
- [ ] **Escape Key**: ESC closes dropdown and returns focus
- [ ] **Click Outside**: Clicking outside closes dropdown
- [ ] **Mobile Support**: Touch-friendly dropdown behavior

---

## 🔊 **Screen Reader Testing & Support**

### **Testing Checklist**
- [ ] **NVDA (Windows)**: Test with free NVDA screen reader
- [ ] **JAWS (Windows)**: Test with JAWS if available
- [ ] **VoiceOver (macOS)**: Test with built-in VoiceOver
- [ ] **Mobile Screen Readers**: Test with VoiceOver (iOS) and TalkBack (Android)
- [ ] **Browser Testing**: Test in Chrome, Firefox, Safari with screen readers

### **Content Structure**
- [ ] **Headings**: Proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] **Landmarks**: Use semantic HTML5 elements (`main`, `nav`, `aside`, `header`, `footer`)
- [ ] **Lists**: Use `ul`, `ol`, `dl` for grouped content
- [ ] **Tables**: Data tables have `th` headers with `scope` attributes
- [ ] **Reading Flow**: Content reads logically when navigated linearly

```tsx
// ✅ Good Semantic Structure
<>
  <header role="banner">
    <nav aria-label="Main navigation">
      <ul>{/* navigation items */}</ul>
    </nav>
  </header>
  
  <main id="main-content" tabIndex="-1">
    <h1>Product Catalog</h1>
    <section aria-labelledby="filters-heading">
      <h2 id="filters-heading">Filter Products</h2>
      {/* filter content */}
    </section>
    
    <section aria-labelledby="products-heading">
      <h2 id="products-heading">Products</h2>
      {/* product grid */}
    </section>
  </main>
  
  <aside aria-label="Shopping cart">
    {/* cart content */}
  </aside>
</>
```

### **Dynamic Content & Updates**
- [ ] **Live Regions**: Use `aria-live` for dynamic content updates
- [ ] **Loading States**: Announce loading and completion to screen readers
- [ ] **Error Messages**: Use `role="alert"` for critical errors
- [ ] **Success Messages**: Announce successful actions
- [ ] **Search Results**: Announce result counts and filtering changes

```tsx
// ✅ Good Live Region Usage
const SearchResults = ({ results, isLoading, query }) => (
  <section aria-live="polite" aria-atomic="true">
    {isLoading ? (
      <p>Searching for "{query}"...</p>
    ) : (
      <p>
        Found {results.length} products 
        {query && ` for "${query}"`}
      </p>
    )}
  </section>
);
```

---

## 🎨 **Color & Contrast Validation**

### **Contrast Requirements**
- [ ] **Normal Text**: 4.5:1 contrast ratio minimum (WCAG AA)
- [ ] **Large Text**: 3:1 contrast ratio minimum (18pt+ or 14pt+ bold)
- [ ] **Non-text Elements**: 3:1 for UI components, graphics
- [ ] **Focus Indicators**: 3:1 contrast with background
- [ ] **Enhanced**: 7:1 for normal text (WCAG AAA, recommended)

### **Color Independence**
- [ ] **Information**: Information not conveyed by color alone
- [ ] **Status Indicators**: Use icons/text in addition to color
- [ ] **Form Validation**: Errors shown with text, not just red color
- [ ] **Links**: Distinguishable from regular text without color
- [ ] **Charts/Graphs**: Use patterns/textures alongside color

```css
/* ✅ Good Contrast Examples */
.btn-primary {
  background: #1976d2; /* 4.5:1 with white text */
  color: #ffffff;
}

.error-message {
  color: #d32f2f; /* 4.5:1 with white background */
  background: #ffffff;
}

.focus-visible {
  outline: 2px solid #1976d2; /* 3:1 with background */
  outline-offset: 2px;
}

/* ✅ Color-independent status indicators */
.status-success::before {
  content: "✓ ";
  color: #2e7d32;
}

.status-error::before {
  content: "⚠ ";
  color: #d32f2f;
}
```

### **Testing Tools**
- [ ] **Browser DevTools**: Use built-in contrast checking
- [ ] **WAVE**: Web accessibility evaluation tool
- [ ] **Colour Contrast Analyser**: Desktop app for precise testing
- [ ] **Stark**: Figma/Sketch plugin for design validation
- [ ] **axe DevTools**: Browser extension for comprehensive testing

---

## 🏷️ **ARIA Usage: Dos and Don'ts**

### **✅ ARIA Dos**
- [ ] **Use Semantic HTML First**: Only use ARIA when semantic HTML isn't enough
- [ ] **Complement, Don't Override**: ARIA enhances, doesn't replace semantics
- [ ] **Test with Real Users**: Validate ARIA with actual screen reader users
- [ ] **Keep It Simple**: Use the minimum ARIA necessary
- [ ] **Update Dynamically**: Change ARIA states when UI changes

```tsx
// ✅ Good ARIA Usage
<button 
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  aria-haspopup="menu"
>
  Categories
</button>

<ul 
  id="dropdown-menu"
  role="menu"
  aria-labelledby="categories-button"
  hidden={!isOpen}
>
  <li role="menuitem">Smartphones</li>
  <li role="menuitem">Laptops</li>
</ul>
```

### **❌ ARIA Don'ts**
- [ ] **Don't Override Semantics**: Avoid changing native element roles unnecessarily
- [ ] **Don't Use Redundant ARIA**: `<button role="button">` is redundant
- [ ] **Don't Break Native Behavior**: Ensure keyboard/mouse behavior still works
- [ ] **Don't Ignore Required Properties**: Some ARIA attributes have required properties
- [ ] **Don't Use ARIA for Styling**: Use CSS classes, not ARIA attributes

```tsx
// ❌ Bad ARIA Usage
<div role="button" onClick={handleClick}>
  Click me
</div>
// Missing keyboard support, focus management

// ❌ Redundant ARIA
<button role="button" aria-label="Close">×</button>
// role="button" is redundant for <button>

// ❌ Changing semantics unnecessarily
<h1 role="button">This should be a heading</h1>
```

### **Essential ARIA Patterns**
- [ ] **Disclosure Widget**: `aria-expanded` for collapsible content
- [ ] **Live Regions**: `aria-live="polite"` or `aria-live="assertive"`
- [ ] **Error Announcements**: `role="alert"` for immediate attention
- [ ] **Form Descriptions**: `aria-describedby` linking to help text
- [ ] **Custom Controls**: `aria-pressed`, `aria-checked` for toggle states

---

## 🔧 **Automated Testing Setup**

### **Testing Tools Integration**
```json
// package.json - Testing dependencies
{
  "devDependencies": {
    "@axe-core/react": "^4.8.0",
    "jest-axe": "^8.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "eslint-plugin-jsx-a11y": "^6.8.0"
  }
}
```

```tsx
// Example accessibility test
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProductCard from './ProductCard';

expect.extend(toHaveNoViolations);

test('ProductCard has no accessibility violations', async () => {
  const { container } = render(
    <ProductCard product={mockProduct} />
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('ProductCard is keyboard navigable', () => {
  const { getByRole } = render(
    <ProductCard product={mockProduct} />
  );
  
  const card = getByRole('article');
  expect(card).toBeInTheDocument();
  
  // Test keyboard interaction
  fireEvent.keyDown(card, { key: 'Enter' });
  // Assert navigation behavior
});
```

### **ESLint A11y Rules**
```json
// .eslintrc.json
{
  "extends": ["plugin:jsx-a11y/recommended"],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/no-autofocus": "error",
    "jsx-a11y/no-redundant-roles": "error"
  }
}
```

---

## 📱 **Mobile Accessibility**

### **Touch & Mobile Considerations**
- [ ] **Touch Targets**: Minimum 44x44px tap targets
- [ ] **Spacing**: Adequate spacing between interactive elements
- [ ] **Orientation**: Support both portrait and landscape
- [ ] **Zoom**: Content remains usable at 200% zoom
- [ ] **Screen Reader Mobile**: Test with VoiceOver (iOS) and TalkBack (Android)

### **Responsive Design**
- [ ] **Text Scaling**: Text remains readable when scaled up
- [ ] **Focus Indicators**: Visible focus indicators on mobile keyboards
- [ ] **Error Handling**: Error messages clear on small screens
- [ ] **Navigation**: Mobile navigation patterns are accessible

---

## 📊 **Pre-Launch Testing Protocol**

### **Automated Testing Checklist**
- [ ] **Lighthouse Audit**: Score 90+ on accessibility
- [ ] **axe-core Tests**: No violations in automated tests
- [ ] **Jest A11y Tests**: All components pass accessibility tests
- [ ] **ESLint A11y**: No linting errors
- [ ] **CI/CD Integration**: Accessibility tests run on every PR

### **Manual Testing Checklist**
- [ ] **Keyboard Only**: Complete user flow using only keyboard
- [ ] **Screen Reader**: Test core user flows with screen reader
- [ ] **High Contrast**: Test in high contrast mode
- [ ] **Zoom**: Test at 200% browser zoom
- [ ] **Color Blindness**: Test with color blindness simulators

### **User Testing**
- [ ] **Real Users**: Test with actual users who use assistive technologies
- [ ] **Feedback Integration**: Process for incorporating accessibility feedback
- [ ] **Documentation**: Accessibility features documented for users

---

## 🚀 **Final Pre-Launch Checklist**

### **Documentation & Training**
- [ ] **Accessibility Statement**: Published accessibility statement
- [ ] **User Guide**: Guide for using accessibility features
- [ ] **Support Contact**: Accessibility feedback contact method
- [ ] **Team Training**: Development team trained on accessibility

### **Legal & Compliance**
- [ ] **WCAG 2.1 AA**: Compliance verified through testing
- [ ] **Section 508**: US federal compliance if applicable
- [ ] **ADA Compliance**: Americans with Disabilities Act considerations
- [ ] **Regional Laws**: EU Accessibility Act, AODA (Ontario) if applicable

### **Monitoring & Maintenance**
- [ ] **Automated Monitoring**: Continuous accessibility monitoring setup
- [ ] **Regular Audits**: Schedule for periodic accessibility audits
- [ ] **Issue Tracking**: System for tracking and resolving accessibility issues
- [ ] **Version Control**: Accessibility testing in release pipeline

---

## 🎯 **Success Metrics**

### **Technical Metrics**
- [ ] **Lighthouse Score**: 90+ accessibility score
- [ ] **Zero Violations**: No axe-core violations in automated tests
- [ ] **ESLint Clean**: No jsx-a11y linting errors
- [ ] **Contrast Ratios**: All text meets WCAG AA requirements

### **User Experience Metrics**
- [ ] **Task Completion**: Screen reader users can complete core tasks
- [ ] **Error Rates**: Low error rates for keyboard-only users
- [ ] **User Satisfaction**: Positive feedback from accessibility testing
- [ ] **Support Requests**: Minimal accessibility-related support tickets

---

## 📚 **Resources & Tools**

### **Testing Tools**
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluator
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools
- [Color Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) - Desktop application

### **Screen Readers**
- [NVDA](https://www.nvaccess.org/) - Free Windows screen reader
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Popular Windows screen reader
- VoiceOver - Built into macOS and iOS
- TalkBack - Built into Android

### **Learning Resources**
- [WebAIM](https://webaim.org/) - Web accessibility guidance
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Technical documentation
- [A11y Project](https://www.a11yproject.com/) - Community-driven accessibility checklist
- [Inclusive Components](https://inclusive-components.design/) - Accessible component patterns

This comprehensive checklist ensures your React e-commerce application will be accessible to all users. Focus on the critical items first, then work through the complete list systematically. Remember: accessibility is not a checklist item—it's an ongoing commitment to inclusive design! 🌟
