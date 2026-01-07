# Research & Technical Decisions: Modern Blogging Website

**Date**: 2026-01-07  
**Feature**: [spec.md](./spec.md) | [plan.md](./plan.md)

## Overview

This document captures research findings and technical decisions for building a modern, responsive blogging website using Next.js with Static Site Generation. All unknowns from the Technical Context have been resolved.

## Technical Decisions

### 1. Framework Selection: Next.js 14 with App Router

**Decision**: Use Next.js 14 with App Router and Static Site Generation (SSG)

**Rationale**:
- **Static Export**: Next.js supports `output: 'export'` which generates pure static HTML/CSS/JS files, meeting the Static-First Architecture requirement
- **Image Optimization**: Built-in `next/image` component provides automatic WebP conversion, lazy loading, and responsive images
- **Performance**: Automatic code splitting, route prefetching, and optimization out of the box
- **SEO**: Built-in Head component and metadata API for managing meta tags, Open Graph tags, and structured data
- **File-based Routing**: Intuitive routing that maps directly to folder structure
- **TypeScript Support**: First-class TypeScript support built-in
- **Developer Experience**: Hot reload, error overlay, and extensive documentation

**Alternatives Considered**:
- **Jekyll**: Ruby-based, less modern JavaScript ecosystem integration, limited component reusability
- **Hugo**: Fast but Go templates less familiar, limited React component ecosystem
- **Eleventy**: Excellent but requires more manual setup for image optimization and component patterns
- **Gatsby**: Similar to Next.js but more complex GraphQL layer unnecessary for simple static content

**Best Practices**:
- Use `generateStaticParams()` to pre-generate all blog post pages at build time
- Configure `next.config.js` with `output: 'export'` for static HTML export
- Use `next/image` for all images to ensure optimization and lazy loading
- Implement proper metadata using Next.js 14 Metadata API

### 2. Styling Solution: Tailwind CSS 3.x

**Decision**: Use Tailwind CSS for all styling

**Rationale**:
- **Mobile-First**: Tailwind is inherently mobile-first with responsive modifiers (sm:, md:, lg:, xl:)
- **Performance**: Purges unused CSS automatically, resulting in minimal CSS bundle
- **Consistency**: Utility classes enforce design system consistency
- **Responsive Design**: Built-in breakpoints align with constitution requirements (320px, 768px, 1024px, 1440px)
- **No Inline Styles**: Utility classes avoid inline styles while maintaining component co-location
- **Dark Mode Ready**: Built-in dark mode support if needed in future
- **Accessibility**: Includes focus-visible utilities for keyboard navigation

**Alternatives Considered**:
- **CSS Modules**: More verbose, requires separate CSS files, harder to maintain responsive variants
- **Styled Components**: Runtime CSS-in-JS adds client-side overhead, not ideal for static sites
- **Plain CSS/SASS**: More boilerplate, harder to maintain responsive patterns consistently

**Best Practices**:
- Configure Tailwind to include all responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Use semantic color names in tailwind.config.js
- Ensure minimum touch target size: `min-h-[44px] min-w-[44px]` for interactive elements
- Use Tailwind's contrast utilities to meet WCAG 2.1 AA standards

### 3. Content Storage: JSON Metadata + Markdown Files

**Decision**: Store blog post metadata in JSON and full content in Markdown files

**Rationale**:
- **Separation of Concerns**: Metadata (title, date, excerpt, author) separate from content
- **Easy Querying**: JSON file for quick listing/sorting without parsing all markdown
- **Content Authoring**: Markdown is familiar, easy to write, and supports formatting
- **No Database**: Keeps architecture simple and fully static
- **Version Control Friendly**: Text files easily tracked in Git
- **Build-time Processing**: Content parsed once during build, not at runtime

**Data Structure**:

```json
// src/data/blogs.json
{
  "posts": [
    {
      "id": "modern-web-development-2026",
      "title": "Modern Web Development in 2026",
      "author": "Jane Developer",
      "publishedDate": "2026-01-05",
      "excerpt": "Exploring the latest trends in web development...",
      "featuredImage": "/images/blog/modern-web-dev.jpg",
      "slug": "modern-web-development-2026",
      "tags": ["web", "development"]
    }
  ]
}
```

**Alternatives Considered**:
- **Pure Markdown with Frontmatter**: Would require parsing all files for listings, slower build times
- **CMS (Contentful, Sanity)**: Unnecessary complexity, introduces API dependency
- **MDX**: Overkill for simple blog content, adds build complexity

**Best Practices**:
- Use ISO 8601 date format (YYYY-MM-DD) for easy sorting
- Slugs should match markdown filename for consistency
- Validate JSON schema during build to catch errors early

### 4. Image Handling: next/image with WebP

**Decision**: Use Next.js Image component with automatic WebP conversion

**Rationale**:
- **Automatic Optimization**: Converts images to WebP with automatic fallbacks
- **Responsive Images**: Generates multiple sizes via srcset
- **Lazy Loading**: Built-in lazy loading for below-the-fold images
- **Performance**: Reduces image size by 25-35% on average
- **Constitution Compliance**: Meets "modern formats (WebP with fallbacks)" requirement

**Image Organization**:
- Store blog featured images in: `/public/images/blog/`
- Store author avatars in: `/public/images/avatars/`
- Store static assets in: `/public/images/`
- Use descriptive filenames: `modern-web-development-hero.jpg`

**Best Practices**:
- Always provide width and height to prevent layout shift
- Use `priority` prop for above-the-fold images (hero image on landing page)
- Provide meaningful alt text for all images (accessibility requirement)
- Use placeholder='blur' with blurDataURL for better perceived performance

### 5. Navigation: Responsive with Mobile Hamburger Menu

**Decision**: Implement responsive navigation with CSS-only hamburger menu for mobile

**Rationale**:
- **Performance**: CSS-only solution avoids JavaScript for basic interaction
- **Accessibility**: Proper HTML structure supports keyboard navigation
- **Progressive Enhancement**: Works without JavaScript
- **Constitution Compliance**: Meets "mobile-friendly navigation" and "44x44px touch targets"

**Implementation Approach**:
- Desktop (≥768px): Horizontal navigation bar
- Mobile (<768px): Hamburger icon (☰) expands to full menu
- Active page visually indicated with highlight/underline
- Minimum 44x44px touch targets on all interactive elements

**Best Practices**:
- Use semantic HTML: `<nav>`, `<ul>`, `<li>`, `<a>`
- Implement keyboard navigation with proper focus states
- Use aria-label for hamburger button: "Toggle navigation menu"
- Ensure sufficient color contrast for active/hover states

### 6. TypeScript Configuration

**Decision**: Use TypeScript with strict mode enabled

**Rationale**:
- **Type Safety**: Catch errors at build time rather than runtime
- **Developer Experience**: Better IDE autocomplete and inline documentation
- **Maintainability**: Explicit types make code easier to understand and refactor
- **Constitution Compliance**: Aligns with code quality standards

**Configuration**:
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

### 7. Testing Strategy

**Decision**: Playwright for E2E, Jest + React Testing Library for unit tests

**Rationale**:
- **Playwright**: 
  - Tests across Chromium, Firefox, WebKit
  - Mobile viewport emulation for responsive testing
  - Accessibility testing with built-in audit tools
  - Screenshot comparison for visual regression
- **Jest + RTL**: 
  - Fast unit tests for utility functions
  - Component testing with accessibility queries
  - Snapshot testing for component structure

**Test Coverage Goals**:
- E2E: All user scenarios from spec (7 stories)
- Unit: All data parsing and utility functions
- Accessibility: WCAG 2.1 AA compliance via automated audits
- Performance: Lighthouse CI tests (90+ score requirement)

### 8. Performance Optimization

**Decision**: Implement multiple performance optimizations to meet <3s load time on 3G

**Rationale**: Constitution requires page load under 3 seconds on 3G networks

**Optimizations**:
1. **Code Splitting**: Next.js automatic route-based code splitting
2. **Font Optimization**: Use next/font for Google Fonts with automatic subsetting
3. **Lazy Loading**: Images lazy-loaded via next/image
4. **Critical CSS**: Tailwind extracts only used CSS, inlined critical CSS
5. **Compression**: Enable gzip/brotli compression in deployment
6. **Caching**: Static assets cached indefinitely via content hashing
7. **Preloading**: Use `<link rel="preload">` for critical resources
8. **Font Limit**: Maximum 2 font families per constitution

**Best Practices**:
- Use `next/font/google` for automatic font optimization
- Limit font weights to only what's needed (e.g., 400, 600)
- Implement font-display: swap to prevent FOIT (Flash of Invisible Text)
- Monitor bundle size with Next.js built-in analyzer

### 9. Accessibility Implementation

**Decision**: Implement comprehensive accessibility from the start

**Rationale**: Constitution requires WCAG 2.1 Level AA compliance

**Key Requirements**:
- **Semantic HTML**: Use proper HTML5 elements (`<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`)
- **Alt Text**: All images must have descriptive alt attributes
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus Indicators**: Visible focus states for all interactive elements
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **ARIA Labels**: Use where semantic HTML insufficient
- **Skip Links**: Add "Skip to main content" link

**Testing Tools**:
- Lighthouse accessibility audit (90+ score)
- axe DevTools for automated testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA/VoiceOver)

### 10. SEO & Metadata

**Decision**: Implement comprehensive SEO metadata using Next.js Metadata API

**Rationale**: Constitution requires meta descriptions, Open Graph, structured data, sitemap

**Implementation**:
- **Metadata API**: Use Next.js 14 `generateMetadata()` for dynamic metadata
- **Open Graph**: og:title, og:description, og:image, og:type for social sharing
- **Twitter Cards**: twitter:card, twitter:title, twitter:description
- **JSON-LD**: Schema.org Article structured data for blog posts
- **Sitemap**: Use next-sitemap package for automatic sitemap.xml generation
- **Robots.txt**: Configure for proper crawling

**Example Structured Data**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2026-01-05",
  "dateModified": "2026-01-05",
  "author": {
    "@type": "Person",
    "name": "Jane Developer"
  }
}
```

## Dependencies Summary

### Core Dependencies
- next: ^14.0.0
- react: ^18.0.0
- react-dom: ^18.0.0
- typescript: ^5.0.0

### Styling
- tailwindcss: ^3.4.0
- autoprefixer: ^10.4.0
- postcss: ^8.4.0

### Utilities
- gray-matter: ^4.0.3 (parse markdown frontmatter)
- remark: ^15.0.0 (markdown processing)
- remark-html: ^16.0.0 (markdown to HTML)
- next-sitemap: ^4.2.0 (sitemap generation)

### Testing
- @playwright/test: ^1.40.0
- jest: ^29.7.0
- @testing-library/react: ^14.1.0
- @testing-library/jest-dom: ^6.1.0

### Development
- eslint: ^8.0.0
- eslint-config-next: ^14.0.0
- prettier: ^3.1.0
- @types/react: ^18.0.0
- @types/node: ^20.0.0

## Risk Mitigation

### Risk: Performance on 3G Networks
**Mitigation**: 
- Implement aggressive image optimization
- Lazy load all below-the-fold content
- Test with Chrome DevTools network throttling
- Monitor with Lighthouse CI in deployment pipeline

### Risk: Accessibility Compliance
**Mitigation**:
- Automated testing with Lighthouse and axe in CI
- Manual testing with keyboard navigation
- Screen reader testing on major platforms
- Color contrast verification with tools

### Risk: Browser Compatibility
**Mitigation**:
- Use Next.js which handles transpilation
- Test with Playwright across Chromium, Firefox, WebKit
- Use progressive enhancement approach
- Provide fallbacks for modern features

## Next Steps

Phase 0 research complete. All technical unknowns resolved. Proceed to Phase 1:
1. Create data-model.md (content structure)
2. Create contracts/blog-post.schema.json
3. Create quickstart.md (getting started guide)
4. Update agent context with technology choices
