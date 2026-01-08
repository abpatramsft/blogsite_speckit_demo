<!-- 
CONSTITUTION SYNC REPORT
========================
Version Change: N/A → 1.0.0 (Initial Constitution)
Type: MAJOR (Initial ratification)

Modified Principles: N/A (initial)
Added Sections: 
  - Core Principles (5 principles)
  - Technology Requirements
  - Content & Data Management
  - Page Architecture & Navigation
  - Accessibility & SEO Standards
  - Performance & Deployment
  - Governance

Removed Sections: N/A
Templates Requiring Updates:
  - .specify/templates/plan-template.md (⚠ pending - align with SSG principles)
  - .specify/templates/spec-template.md (⚠ pending - verify content schema requirements)
  - .specify/templates/tasks-template.md (⚠ pending - update task categorization for static site workflows)

Follow-up TODOs: None at this time
-->

# BlogSite Constitution

## Core Principles

### I. Static-First Architecture
Every feature and page component MUST be designed for static generation via Next.js SSG (Static Site Generation). No server-side rendering or dynamic API calls at runtime. All data sources MUST be JSON files or Markdown files in `src/data/` directory. Rationale: Ensures optimal performance, simple deployment, and cost efficiency for a blogging platform.

### II. Type Safety & Content Contracts
All content data MUST conform to JSON Schema contracts defined in `specs/001-modern-blog-site/contracts/`. TypeScript strict mode MANDATORY. Blog posts and FAQ entries MUST be validated against their respective schemas at build time. Rationale: Prevents runtime errors, enables early detection of content issues, and provides clear documentation of expected data structures.

### III. Accessibility & WCAG Compliance
All components MUST meet WCAG 2.1 Level AA accessibility standards. No exceptions. Semantic HTML required. Keyboard navigation, screen reader compatibility, and sufficient color contrast are non-negotiable. Rationale: Ensures the blog is usable by all visitors, including those with disabilities, and improves SEO.

### IV. Performance & Core Web Vitals
The site MUST maintain Lighthouse performance scores of 90+. Optimized images required (next/image component). CSS-in-JS or utility-first Tailwind CSS only. No render-blocking resources. Static export must complete in under 60 seconds. Rationale: Fast load times improve user experience and search engine rankings.

### V. Content Structure & Reusability
Blog posts use Markdown format stored in `src/data/posts/`. Metadata stored in `src/data/blogs.json`. Each Markdown file MUST include clear front matter (title, date, author, tags). Component library approach: all UI pieces are reusable across pages. Rationale: Enables easy content maintenance, supports future features (search, tagging), and simplifies scaling.

## Technology Requirements

**Stack Lock**: Next.js 14+, React 19+, TypeScript 5.x, Tailwind CSS 3.x, Gray Matter for parsing Markdown, @tailwindcss/typography for content rendering.

**Build Process**: Next.js `next build` followed by static export (`out/` directory). Sitemap auto-generated via `next-sitemap` post-build.

**Deployment Target**: Any static hosting (Vercel, GitHub Pages, AWS S3+CloudFront, Netlify). No runtime server required.

## Content & Data Management

**Data Location**: All mock data in `src/data/`. No external APIs. FAQ and blog metadata stored as JSON. Blog post content in Markdown with YAML front matter.

**Content Schema**: Blog posts MUST include: title (string), date (ISO 8601), author (string), excerpt (string, 100-150 words), tags (array). Refer to `specs/001-modern-blog-site/contracts/blog-post.schema.json`.

**Versioning**: When altering data schemas, update corresponding JSON Schema files AND increment version in `package.json`.

## Page Architecture & Navigation

**Required Pages**: 
- Home: Feature latest blog post with hero section
- Blog List: Grid/card layout of all 10 blog posts
- Blog Post (dynamic): Full article rendering from Markdown
- About: Author/blog information
- FAQ: Expandable Q&A section
- Navigation: Consistent menu on all pages

**Routing**: Use Next.js App Router conventions. Dynamic routes via `[slug]` pattern. 404 and error boundaries required.

## Accessibility & SEO Standards

**Accessibility**: WCAG 2.1 Level AA mandatory. Screen reader tested. Keyboard navigable. Color contrast minimum 4.5:1.

**SEO**: Meta tags, Open Graph tags, and semantic HTML on all pages. Sitemap and robots.txt auto-generated. Structured data recommended for blog posts.

## Performance & Deployment

**Build Artifacts**: Static HTML/CSS/JS in `out/` directory. No server runtime needed.

**Performance Targets**: 
- Lighthouse Performance: ≥90
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

**Deployment Checklist**: Type check passes, lint passes, build completes, performance audit passes.

## Governance

**Constitution Authority**: This constitution supersedes all informal practices and guides development decisions for BlogSite. All PRs MUST verify compliance with principles I–V above.

**Amendment Process**: Changes to principles require ratification with updated version number. Use semantic versioning: MAJOR (principle removal/redefinition), MINOR (principle addition/expansion), PATCH (clarifications).

**Compliance Review**: Every spec and PR review must validate adherence to Core Principles. Deviations require explicit justification.

**Runtime Guidance**: Refer to [README.md](../../README.md) for development workflow, build commands, and deployment instructions. Template files at `.specify/templates/` define artifact standards.

---

**Version**: 1.0.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08
