# BlogSite Constitution
<!-- Static Web Page Application Requirements and Standards -->

## Core Principles

### I. Static-First Architecture
All content must be deliverable as static HTML/CSS/JavaScript files without requiring server-side processing. Pages must be pre-rendered or client-side rendered only. No backend dependencies for core functionality. All dynamic features must gracefully degrade when JavaScript is disabled.

### II. Performance Standards
Page load time must be under 3 seconds on 3G networks. Total page size should not exceed 1MB per page (excluding images). Images must be optimized and use modern formats (WebP with fallbacks). Lazy loading required for below-the-fold content and images.

### III. Responsive Design (NON-NEGOTIABLE)
Mobile-first approach mandatory. All pages must be fully functional on screens from 320px to 4K. Breakpoints required at minimum: 320px, 768px, 1024px, 1440px. Touch-friendly interface with minimum 44x44px tap targets. Test on real devices before deployment.

### IV. Accessibility Standards
WCAG 2.1 Level AA compliance required. Semantic HTML5 elements mandatory. All images require descriptive alt text. Keyboard navigation must work for all interactive elements. Color contrast ratio minimum 4.5:1 for normal text, 3:1 for large text. Screen reader compatibility verified.

### V. Content & SEO
Meta descriptions required for all pages (150-160 characters). Open Graph tags mandatory for social sharing. Schema.org structured data for articles/blog posts. Sitemap.xml generated and maintained. Clean, descriptive URLs (no query parameters). Valid HTML5 markup verified.

## Technical Constraints

### Technology Stack
- HTML5 with semantic markup
- CSS3 (with preprocessors allowed: SASS/LESS)
- Vanilla JavaScript or modern frameworks (React, Vue, Svelte)
- Static Site Generator optional (Jekyll, Hugo, Eleventy, Next.js SSG)
- No server-side languages (PHP, Python, Ruby) for core functionality
- Package management: npm/yarn allowed for build tools only

### Browser Support
- Modern browsers: Latest 2 versions of Chrome, Firefox, Safari, Edge
- Mobile browsers: iOS Safari 12+, Chrome Android latest
- Progressive enhancement for older browsers
- Polyfills allowed for critical features only

### Asset Management
- All assets must be versioned or cache-busted
- CSS/JS must be minified in production
- Images optimized with appropriate compression
- SVG preferred for icons and logos
- Web fonts limited to 2 font families maximum

## Development Workflow

### Code Quality Standards
- Valid HTML5 (W3C validator pass)
- CSS follows BEM or similar naming convention
- JavaScript follows ESLint standard configuration
- No inline styles or scripts (except critical CSS)
- Comments required for complex logic
- Code must be formatted consistently (Prettier recommended)

### Testing Requirements
- Cross-browser testing on major browsers
- Mobile responsiveness tested on real devices
- Accessibility audit passed (axe, WAVE, or Lighthouse)
- Performance audit: Lighthouse score 90+ for Performance, Accessibility, Best Practices, SEO
- Link checker run before deployment (no broken links)
- Spelling and grammar checked

### Version Control
- Git required for version control
- Meaningful commit messages (conventional commits preferred)
- Feature branches for new content or features
- Pull requests required for significant changes
- Main/master branch always deployable

## Governance

This constitution defines the non-negotiable standards for the BlogSite static web application. All development must comply with these principles. Performance, accessibility, and responsive design are mandatory—no exceptions. Any deviation requires documented justification and approval. Changes to this constitution require review and consensus before implementation.

**Version**: 1.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-01-07
