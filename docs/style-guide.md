# Fashionistas Website Style Guide

This document outlines the comprehensive style guide for the Fashionistas website, ensuring consistency across the entire application.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Styles](#component-styles)
5. [Animation System](#animation-system)
6. [Layout Guidelines](#layout-guidelines)
7. [Image Guidelines](#image-guidelines)
8. [Interactive Elements](#interactive-elements)
9. [Accessibility Features](#accessibility-features)
10. [Brand Elements](#brand-elements)

## Color Palette

### Base Colors
```css
--background: 0 0% 4%      /* Dark background */
--foreground: 0 0% 100%    /* White text */
```

### Maroon Scale (Primary Brand Colors)
```css
--maroon: 0 100% 27%       /* Primary maroon */
--maroon-light: 0 68% 41%  /* Lighter variant */
--maroon-dark: 0 91% 15%   /* Darker variant */
```

### Red Scale (Accent Colors)
```css
--red-bright: 348 100% 54% /* Bright accent */
--red-primary: 348 100% 60% /* Primary accent */
--red-soft: 348 100% 71%   /* Soft accent */
```

### Gray Scale (UI Elements)
```css
--gray-100: 0 0% 95%      /* Lightest gray */
--gray-200: 0 0% 87%      /* Light gray */
--gray-300: 0 0% 53%      /* Medium gray */
--gray-400: 0 0% 33%      /* Dark gray */
--gray-500: 0 0% 13%      /* Darkest gray */
```

## Typography

### Font Families
```javascript
fontFamily: {
  montserrat: ['Montserrat', 'sans-serif'],  // Primary headings
  poppins: ['Poppins', 'sans-serif'],        // Secondary headings
  inter: ['Inter', 'sans-serif']             // Body text
}
```

### Font Sizes
```javascript
fontSize: {
  'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
  'h2': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
  'h3': ['2rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
  'h4': ['1.5rem', { lineHeight: '1.5' }]
}
```

## Spacing System

### Global Spacing Scale
```javascript
spacing: {
  section: '6rem',        // 96px - Major sections
  'section-inner': '4rem', // 64px - Inner sections
  component: '2rem',      // 32px - Component spacing
  element: '1rem',        // 16px - Element spacing
}
```

## Component Styles

### Button Styles
```css
.btn-primary {
  @apply bg-red-primary text-white
         hover:bg-red-bright
         focus:ring-2 focus:ring-red-primary
         active:scale-95;
}
```

### Card Styles
```css
.card-base {
  @apply bg-gray-500 border border-white/10 text-white
         backdrop-blur-sm;
}
```

## Animation System

### Duration Variables
```css
--duration-fast: 150ms;    /* Quick interactions */
--duration-normal: 300ms;  /* Standard transitions */
--duration-slow: 500ms;    /* Complex animations */
```

### Predefined Animations
```css
animation: {
  marquee: 'marquee var(--duration, 30s) linear infinite',
  'fade-in': 'fadeIn var(--duration-normal) var(--ease-out)',
  'slide-up': 'slideUp var(--duration-normal) var(--ease-out)'
}
```

## Layout Guidelines

### Container Configuration
```javascript
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',
    md: '2rem',
  }
}
```

### Breakpoints
```javascript
screens: {
  sm: '640px',  /* Mobile */
  md: '768px',  /* Tablet */
  lg: '1024px', /* Desktop */
  xl: '1280px'  /* Large Desktop */
}
```

## Image Guidelines

### Cloudinary Configuration
- Default aspect ratios:
  - Heroes: 16:9
  - Cards: 1:1
- Progressive loading enabled
- Blur placeholders for lazy loading
- Optimized transformations for different use cases

### Image Transformations
```javascript
transformations: {
  highlight: 'c_fill,g_center,h_600,w_800,q_auto,f_auto',
  showcase: 'c_fill,g_center,h_800,w_600,q_auto,f_auto',
  hero: 'c_fill,g_center,h_1080,w_1920,q_auto,f_auto'
}
```

## Interactive Elements

### Focus States
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-red-primary
```

### Touch Targets
```css
.touch-target {
  @apply min-h-[44px] min-w-[44px];
}
```

## Accessibility Features

### Standards
- ARIA labels on all interactive elements
- Minimum contrast ratio: 4.5:1
- Preserved focus indicators
- Minimum touch target size: 44px
- Support for reduced motion preferences

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .parallax-bg,
  .parallax-content,
  .section-transition {
    transform: none !important;
    transition: opacity 0.5s ease-in-out !important;
  }
}
```

## Brand Elements

### Icons
- Using Lucide icons consistently throughout the application
- Icon sizes:
  - Navigation: 24px
  - Buttons: 20px
  - Indicators: 16px

### Logo Placement
- Top-left corner in header
- Minimum clear space: 1rem
- Maximum width on mobile: 120px
- Maximum width on desktop: 160px

### Brand Colors Usage
- Primary actions: Maroon
- Call-to-action: Red bright
- Accents: Red soft
- Text on dark: White
- Text on light: Gray 500

### Gradient Overlays
```css
.gradient-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.6) 0%,
    rgba(0,0,0,0.3) 50%,
    rgba(0,0,0,0.6) 100%
  );
}
```

## Usage Guidelines

### Implementation
1. Use the provided CSS variables for colors
2. Follow the type scale for all text elements
3. Maintain consistent spacing using the spacing system
4. Use predefined components and their variants
5. Follow accessibility guidelines for all interactive elements

### Best Practices
1. Mobile-first approach
2. Progressive enhancement
3. Semantic HTML
4. Performance optimization
5. Accessibility first

### Documentation
Keep this style guide updated when:
- Adding new components
- Modifying existing styles
- Introducing new brand elements
- Updating accessibility features 