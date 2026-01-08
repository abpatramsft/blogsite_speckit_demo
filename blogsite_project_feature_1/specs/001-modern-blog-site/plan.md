# Implementation Plan: Modern Blogging Website

**Branch**: `001-modern-blog-site` | **Date**: 2026-01-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-modern-blog-site/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a modern, responsive blogging website with a landing page featuring the latest blog post, a dedicated blogs page displaying all 10 posts, individual blog post pages, FAQ, and About pages. The site will be built using Next.js with Static Site Generation (SSG), requiring no backend or database. All blog content (10 posts) will be stored as mock data in JSON/Markdown files within the codebase. The design must be fully responsive (320px-1920px+) with mobile-first approach, meeting WCAG 2.1 AA accessibility standards and achieving Lighthouse scores of 90+ across all metrics.

## Technical Context

**Language/Version**: TypeScript 5.x with Node.js 18+ (LTS)  
**Primary Dependencies**: 
- Next.js 14.x (Static Site Generation mode)
- React 18.x
- Tailwind CSS 3.x (for responsive, utility-first styling)
- next/image (optimized image handling)

**Storage**: Static JSON/Markdown files in `/data` directory (no database required)  
**Testing**: Jest + React Testing Library for unit tests, Playwright for E2E tests  
**Target Platform**: Static HTML/CSS/JS deployment (Vercel, Netlify, GitHub Pages compatible)  
**Project Type**: Web application (frontend-only, static site)  
**Performance Goals**: 
- Lighthouse Performance score 90+
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Total page size < 1MB (excluding images)

**Constraints**: 
- Page load time < 3 seconds on 3G networks
- No server-side runtime dependencies
- Pre-rendered static HTML at build time
- Mobile-first responsive design (320px to 4K)
- WCAG 2.1 Level AA compliance

**Scale/Scope**: 
- 10 blog posts (static content)
- 4 main pages (Home, Blogs, About, FAQ)
- 10 individual blog post pages
- Total: ~14 static pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Static-First Architecture ✓
- **Compliant**: Next.js SSG generates static HTML/CSS/JS at build time
- **Compliant**: No server-side processing required for core functionality
- **Compliant**: All content pre-rendered during build

### Performance Standards ✓
- **Compliant**: Target page load < 3s on 3G (constitution requirement met)
- **Compliant**: Target page size < 1MB per page (constitution requirement met)
- **Compliant**: Using next/image with WebP and modern formats with fallbacks
- **Compliant**: Lazy loading enabled via Next.js defaults for below-the-fold content

### Responsive Design ✓
- **Compliant**: Mobile-first approach with Tailwind CSS
- **Compliant**: Breakpoints at 320px (sm), 768px (md), 1024px (lg), 1440px (xl)
- **Compliant**: Touch targets minimum 44x44px (to be enforced in design system)
- **Compliant**: Testing on multiple screen sizes required in testing phase

### Accessibility Standards ✓
- **Compliant**: Semantic HTML5 elements (Next.js/React supports this)
- **Compliant**: All images will have descriptive alt text
- **Compliant**: Keyboard navigation support via proper HTML elements
- **Compliant**: Color contrast 4.5:1 minimum (to be verified in design phase)
- **Compliant**: Screen reader testing required (using Lighthouse accessibility audit)

### Content & SEO ✓
- **Compliant**: Meta descriptions via Next.js Head component (150-160 chars)
- **Compliant**: Open Graph tags via next/head
- **Compliant**: JSON-LD structured data for blog posts (Schema.org)
- **Compliant**: sitemap.xml generated via next-sitemap package
- **Compliant**: Clean URLs via Next.js file-based routing (no query params)
- **Compliant**: Valid HTML5 via React rendering

### Technology Stack ✓
- **Compliant**: HTML5 with semantic markup (React generates semantic HTML)
- **Compliant**: CSS3 via Tailwind CSS
- **Compliant**: Next.js SSG explicitly mentioned in constitution as allowed
- **Compliant**: No server-side runtime languages needed
- **Compliant**: npm for package management

### Browser Support ✓
- **Compliant**: Next.js 14 supports latest 2 versions of modern browsers
- **Compliant**: iOS Safari 12+ and Chrome Android supported
- **Compliant**: Progressive enhancement via Next.js

### Asset Management ✓
- **Compliant**: Next.js automatic cache-busting via file hashing
- **Compliant**: CSS/JS minification via Next.js build process
- **Compliant**: Image optimization via next/image
- **Compliant**: SVG support for icons
- **Compliant**: Web fonts limited to 2 families maximum (to be enforced)

### Code Quality Standards ✓
- **Compliant**: ESLint standard configuration included with Next.js
- **Compliant**: Prettier for consistent formatting
- **Compliant**: TypeScript for type safety
- **Compliant**: No inline styles (Tailwind utility classes used)
- **Compliant**: Comments required for complex logic

### Testing Requirements ✓
- **Compliant**: Playwright for cross-browser E2E testing
- **Compliant**: Responsive design testing via Playwright viewports
- **Compliant**: Lighthouse CI for accessibility, performance, SEO audits (90+ target)
- **Compliant**: Jest for unit tests

### Version Control ✓
- **Compliant**: Git repository active (branch 001-modern-blog-site exists)
- **Compliant**: Conventional commits to be followed
- **Compliant**: Feature branch workflow in use

**GATE RESULT: ✅ PASS** - All constitution requirements are met or will be enforced during implementation.

**Post-Phase 1 Re-evaluation**: ✅ PASS
- Data model confirms no database dependencies (static JSON/Markdown only)
- Component structure supports semantic HTML5 (Navigation, BlogCard, BlogContent components)
- Contracts define validation for accessibility requirements (alt text, descriptions)
- All images require descriptive alt text per blog-post.schema.json
- Performance constraints codified in contracts (excerpt length, image optimization)
- No new constitutional violations introduced during design phase

## Project Structure

### Documentation (this feature)

```text
specs/001-modern-blog-site/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - technical decisions
├── data-model.md        # Phase 1 output - content structure
├── quickstart.md        # Phase 1 output - getting started guide
├── contracts/           # Phase 1 output - API/data contracts
│   └── blog-post.schema.json
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
blogsite/
├── public/              # Static assets
│   ├── images/         # Blog post images, avatars
│   └── favicon.ico
├── src/
│   ├── app/            # Next.js 14 App Router
│   │   ├── layout.tsx           # Root layout with navigation
│   │   ├── page.tsx             # Home/Landing page
│   │   ├── blogs/
│   │   │   ├── page.tsx         # Blogs listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual blog post page
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   └── faq/
│   │       └── page.tsx         # FAQ page
│   ├── components/     # Reusable React components
│   │   ├── Navigation.tsx       # Site navigation (with mobile hamburger)
│   │   ├── BlogCard.tsx         # Blog post card for listings
│   │   ├── BlogContent.tsx      # Blog post content renderer
│   │   ├── Hero.tsx             # Landing page hero section
│   │   └── Footer.tsx           # Site footer
│   ├── data/           # Mock blog content
│   │   ├── blogs.json           # Blog metadata (title, date, excerpt, etc.)
│   │   └── posts/               # Markdown files for blog content
│   │       ├── post-01.md
│   │       ├── post-02.md
│   │       └── ... (10 total)
│   ├── lib/            # Utility functions
│   │   ├── getBlogPosts.ts      # Load and parse blog data
│   │   └── formatDate.ts        # Date formatting utilities
│   └── types/          # TypeScript types
│       └── blog.ts              # Blog post type definitions
├── tests/
│   ├── e2e/            # Playwright E2E tests
│   │   ├── home.spec.ts
│   │   ├── blogs.spec.ts
│   │   ├── navigation.spec.ts
│   │   └── mobile.spec.ts
│   └── unit/           # Jest unit tests
│       ├── components/
│       └── lib/
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── next.config.js      # Next.js configuration (output: 'export')
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies
└── README.md           # Project documentation
```

**Structure Decision**: Selected "Web application" structure with frontend-only configuration. Using Next.js 14 App Router for modern file-based routing. All blog content stored in `/src/data` directory as JSON metadata + Markdown content files. No backend directory needed since this is a purely static site using SSG. The `output: 'export'` config in next.config.js enables static HTML export.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All constitution requirements are satisfied by the chosen architecture.
