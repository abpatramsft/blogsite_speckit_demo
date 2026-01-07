# Data Model: Modern Blogging Website

**Date**: 2026-01-07  
**Feature**: [spec.md](./spec.md) | [plan.md](./plan.md) | [research.md](./research.md)

## Overview

This document defines the data structures and content models for the blogging website. All data is stored as static JSON and Markdown files in the codebase (no database).

## Entities

### 1. BlogPost

Represents a complete blog post with metadata and content.

**Attributes**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| id | string | Yes | Unique identifier for the post | Alphanumeric with hyphens, max 100 chars |
| slug | string | Yes | URL-friendly identifier | Must match markdown filename, lowercase, hyphens only |
| title | string | Yes | Blog post title | 5-120 characters |
| author | string | Yes | Author's full name | 2-50 characters |
| publishedDate | string | Yes | ISO 8601 date (YYYY-MM-DD) | Valid date, not in future |
| excerpt | string | Yes | Short summary for cards/previews | 100-200 characters |
| featuredImage | string | Yes | Path to featured image | Relative path from /public, must exist |
| featuredImageAlt | string | Yes | Alt text for featured image | 5-150 characters, descriptive |
| content | string | Yes | Full blog post content (Markdown) | Stored in separate .md file |
| tags | string[] | No | Post categories/topics | Max 5 tags, each 2-20 chars |
| readingTimeMinutes | number | No | Estimated reading time | Calculated: ~200 words per minute |
| updatedDate | string | No | Last modification date | ISO 8601 date, >= publishedDate |

**Example**:
```json
{
  "id": "modern-web-development-2026",
  "slug": "modern-web-development-2026",
  "title": "Modern Web Development in 2026",
  "author": "Jane Developer",
  "publishedDate": "2026-01-05",
  "excerpt": "Exploring the latest trends and best practices in web development as we move through 2026. From static site generation to modern JavaScript frameworks, discover what's shaping the future.",
  "featuredImage": "/images/blog/modern-web-dev.jpg",
  "featuredImageAlt": "Developer working on a laptop with code on screen",
  "tags": ["web-development", "javascript", "trends"],
  "readingTimeMinutes": 8,
  "updatedDate": "2026-01-06"
}
```

**Relationships**: 
- One BlogPost has one corresponding Markdown file in `/src/data/posts/`
- One BlogPost may have one featuredImage in `/public/images/blog/`

**Business Rules**:
- slug must be unique across all posts
- publishedDate determines sort order (newest first on landing page)
- excerpt should be compelling and self-contained (not cut off mid-sentence)
- featuredImage must have corresponding alt text for accessibility

---

### 2. BlogPostCollection

Container for all blog posts, stored in single JSON file.

**Attributes**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| posts | BlogPost[] | Yes | Array of blog post metadata |
| version | string | Yes | Data schema version (e.g., "1.0.0") |
| lastUpdated | string | Yes | ISO 8601 timestamp of last update |

**Example**:
```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-07T10:30:00Z",
  "posts": [
    { /* BlogPost 1 */ },
    { /* BlogPost 2 */ },
    { /* ... 10 posts total */ }
  ]
}
```

**File Location**: `/src/data/blogs.json`

**Business Rules**:
- Minimum 10 posts required (per specification)
- Posts sorted by publishedDate descending for efficient latest post retrieval
- version allows for schema migrations if needed in future

---

### 3. StaticPage

Represents static content pages (About, FAQ).

**Attributes**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Page identifier | 
| title | string | Yes | Page title |
| slug | string | Yes | URL path segment |
| content | string | Yes | Page content (can include HTML/Markdown) |
| metaDescription | string | Yes | SEO meta description |

**Example - About Page**:
```typescript
{
  id: "about",
  title: "About BlogSite",
  slug: "about",
  metaDescription: "Learn about BlogSite, our mission, and the team behind the content",
  content: `
    # About BlogSite
    
    BlogSite is a modern platform for sharing insights on web development...
    
    ## Our Mission
    ...
    
    ## The Team
    ...
  `
}
```

**Storage**: 
- Content can be hardcoded in page components OR
- Stored in `/src/data/pages.json` for easier content management

**Business Rules**:
- slug corresponds to Next.js route (e.g., slug "about" → /about page)
- metaDescription must be 150-160 characters for SEO

---

### 4. FAQItem

Represents a single FAQ entry.

**Attributes**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| question | string | Yes | The question text |
| answer | string | Yes | The answer text (supports Markdown) |
| order | number | Yes | Display order (ascending) |
| category | string | No | FAQ category for grouping |

**Example**:
```json
{
  "id": "content-license",
  "question": "Can I share or republish your blog posts?",
  "answer": "All content is licensed under CC BY 4.0. You may share with attribution.",
  "order": 1,
  "category": "content"
}
```

**Collection**:
```json
{
  "version": "1.0.0",
  "faqs": [
    { /* FAQ 1 */ },
    { /* FAQ 2 */ },
    { /* ... 5-8 FAQs total */ }
  ]
}
```

**File Location**: `/src/data/faq.json`

**Business Rules**:
- Minimum 5 FAQs, recommended 8 (per specification)
- Sorted by order field for consistent display
- Categories optional but recommended for organization

---

### 5. NavigationItem

Represents a navigation menu link.

**Attributes**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | string | Yes | Display text |
| href | string | Yes | Link destination |
| order | number | Yes | Display order in nav |
| external | boolean | No | Opens in new tab if true |

**Example**:
```typescript
const navigation: NavigationItem[] = [
  { label: "Home", href: "/", order: 1 },
  { label: "Blogs", href: "/blogs", order: 2 },
  { label: "About", href: "/about", order: 3 },
  { label: "FAQ", href: "/faq", order: 4 }
];
```

**Storage**: Hardcoded in Navigation component (no JSON file needed)

**Business Rules**:
- Order determines left-to-right display on desktop
- Active page determined by matching href to current route
- External links must have rel="noopener noreferrer" for security

---

### 6. SiteMetadata

Global site information for SEO and branding.

**Attributes**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| siteName | string | Yes | Site name/brand |
| siteDescription | string | Yes | Default meta description |
| siteUrl | string | Yes | Production URL (for canonical links) |
| author | string | Yes | Default author name |
| social | object | No | Social media handles |

**Example**:
```typescript
{
  siteName: "BlogSite",
  siteDescription: "Modern insights on web development, design, and technology",
  siteUrl: "https://blogsite.example.com",
  author: "Jane Developer",
  social: {
    twitter: "@blogsite",
    github: "blogsite"
  }
}
```

**Storage**: `/src/data/metadata.json` or hardcoded in root layout

**Business Rules**:
- siteUrl must be production URL for proper canonical tags
- siteDescription used as fallback when page-specific description not provided

---

## Data Relationships

```
BlogPostCollection
├── posts[] (BlogPost)
│   ├── featuredImage → /public/images/blog/*.jpg
│   └── content → /src/data/posts/*.md

StaticPage (About, FAQ)
└── content (inline or from JSON)

FAQCollection
└── faqs[] (FAQItem)

NavigationItem[] (static array)

SiteMetadata (singleton)
```

---

## File Structure

```
src/data/
├── blogs.json              # BlogPostCollection
├── posts/                  # Markdown content
│   ├── modern-web-development-2026.md
│   ├── nextjs-static-sites.md
│   ├── responsive-design-tips.md
│   ├── typescript-best-practices.md
│   ├── web-performance-2026.md
│   ├── accessibility-matters.md
│   ├── tailwind-css-guide.md
│   ├── seo-fundamentals.md
│   ├── git-workflow-tips.md
│   └── future-of-web-dev.md
├── faq.json                # FAQCollection
└── metadata.json           # SiteMetadata

public/images/
├── blog/                   # Blog featured images
│   ├── modern-web-dev.jpg
│   ├── nextjs-static.jpg
│   └── ... (10 images)
└── avatars/
    └── author-avatar.jpg
```

---

## Validation Rules

### Build-Time Validation

The build process should validate:

1. **Required Files Exist**:
   - All referenced featuredImage paths exist in /public
   - All slugs have corresponding markdown files in /src/data/posts/

2. **Data Integrity**:
   - All required fields present
   - Dates in valid ISO 8601 format
   - Dates not in future
   - No duplicate slugs or IDs

3. **Content Quality**:
   - excerpt within 100-200 characters
   - title within 5-120 characters
   - featuredImageAlt text provided and descriptive
   - Markdown files parse without errors

4. **Business Rules**:
   - Minimum 10 blog posts
   - Minimum 5 FAQs
   - All navigation hrefs resolve to actual pages

### TypeScript Types

All entities have corresponding TypeScript interfaces defined in `/src/types/blog.ts` to enforce type safety at compile time.

---

## State Management

**No state management library needed** (Redux, Zustand, etc.) because:
- All data is static and loaded at build time
- No user interactions modify data
- No client-side data fetching
- Simple prop drilling sufficient for small component tree

---

## Content Updates

To add/modify blog posts:

1. **Add metadata** to `/src/data/blogs.json`
2. **Create markdown file** in `/src/data/posts/[slug].md`
3. **Add featured image** to `/public/images/blog/`
4. **Rebuild site** with `npm run build`
5. **Redeploy** static files

No database migrations or API updates required.

---

## Mock Data Requirements

Per specification, need **10 blog posts** with mock content covering:

**Suggested Topics** (diverse content):
1. Modern Web Development in 2026
2. Building Static Sites with Next.js
3. Responsive Design Best Practices
4. TypeScript for Beginners
5. Web Performance Optimization
6. Accessibility: Why It Matters
7. Tailwind CSS Complete Guide
8. SEO Fundamentals for Developers
9. Git Workflow Tips and Tricks
10. The Future of Web Development

**Content Guidelines**:
- Each post 800-1500 words
- Include 2-3 headings (##, ###)
- 2-3 paragraphs per section
- Professional but approachable tone
- Include code snippets where relevant
- Publish dates spread over last 3 months

---

## Summary

This data model supports all functional requirements:
- ✅ FR-001: Landing page latest post (sort by publishedDate)
- ✅ FR-002-003: Blogs page grid (all posts from blogs.json)
- ✅ FR-004: Individual post pages (markdown content)
- ✅ FR-006: About page (StaticPage entity)
- ✅ FR-007: FAQ page (FAQCollection with 5-8 items)
- ✅ FR-008: Mock data (all content in JSON/MD files)
- ✅ FR-015: Clickable cards (slug field for routing)

The model is simple, maintainable, and requires no database infrastructure.
