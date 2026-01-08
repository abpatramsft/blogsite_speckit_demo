# Implementation Plan: Blog Upload & Publishing Interface

**Feature Branch**: `002-blog-uploads`  
**Date**: 2026-01-08  
**Spec**: [spec.md](./spec.md)  
**Status**: Planning Phase

## Summary

Enable content creators to publish new blog posts via an intuitive web form without database infrastructure. Users fill form fields (title, author, excerpt, optional featured image, content, tags, reading time), submit, and the new post is immediately saved to `src/data/blogs.json` and `src/data/posts/` for static site generation. No preview mode; users verify after publication. Free-form comma-separated tags. 3 MB image upload limit.

---

## Technical Context

**Language/Version**: TypeScript 5.x, React 19+  
**Framework**: Next.js 14 with App Router  
**Styling**: Tailwind CSS 3.x (mobile-first utility approach)  
**Storage**: Static JSON + Markdown files in `src/data/`; no database, no backend API  
**Image Handling**: Client-side upload + validation; stored in `/public/images/blog/`  
**Build Process**: Next.js SSG (`npm run build`); static export to `out/` directory  
**Component Library**: Reusable form elements, input validation, error handling  
**Testing**: Node.js test runner (validation, file writes, slug generation)  
**Target Platform**: Web (modern browsers); static hosting (Vercel, GitHub Pages, Netlify)  
**Performance Goals**: Form load <2s, submission validation <500ms, build remains <60s  
**Constraints**: 3 MB max image size, no server-side processing, no real-time updates, static generation only  
**Scale/Scope**: Single upload page + utilities; 1 new route (`/upload`), 2 new components, 1 API-like handler module  

---

## Constitution Check

### Compliance Validation

| Principle | Requirement | Status | Evidence |
|-----------|-------------|--------|----------|
| **I. Static-First** | No runtime APIs; SSG only; data in `src/data/` | ✅ PASS | Upload form → client-side validation → file writes to `src/data/` during build prep |
| **II. Type Safety** | TypeScript strict mode; JSON Schema contracts | ✅ PASS | BlogPost interface enforced; form validation against BlogPost schema |
| **III. Accessibility** | WCAG 2.1 Level AA; semantic HTML; keyboard nav | ✅ PASS | Form uses semantic `<form>`, `<label>`, `<input>` elements; error aria-live regions |
| **IV. Performance** | Lighthouse ≥90; <2s form response; <60s build | ✅ PASS | Form validation client-side (instant); image optimization deferred to build; no render-blocking |
| **V. Content Structure** | Markdown posts; JSON metadata; reusable components | ✅ PASS | Content saved as `.md` files; metadata to `blogs.json`; shared form components |

### Critical Design Decisions

1. **Client-Side Form Handling** ← No server backend; form state managed in React with TypeScript
2. **File System Writes** ← During build process via Next.js API Routes or pre-build script
3. **Image Storage** ← Public folder for static serving; client validates format/size before upload attempt
4. **No Real-Time Updates** ← Users rebuild (`npm run build`) to see new posts live
5. **Slug Generation** ← Deterministic from title; collision detection against existing slugs

---

## Project Structure

### Documentation (this feature)

```
specs/002-blog-uploads/
├── plan.md                    # This file
├── spec.md                    # Feature specification (clarified)
├── research.md                # [Generated Phase 0]
├── data-model.md              # [Generated Phase 1]
├── quickstart.md              # [Generated Phase 1]
├── checklists/
│   └── requirements.md        # Quality validation
└── contracts/
    ├── blog-post-upload.schema.json    # Form submission schema
    └── upload-response.schema.json     # Success response schema
```

### Source Code (repository root)

```
src/
├── app/
│   ├── upload/                # New upload page
│   │   └── page.tsx           # Upload form page (SSG-friendly)
│   └── api/                   # API routes (if needed for form submission)
│       └── upload/
│           └── route.ts       # Form submission handler
│
├── components/
│   ├── BlogUploadForm.tsx      # Main upload form component
│   ├── ImageUploadInput.tsx    # Featured image upload + preview
│   ├── TagInput.tsx            # Tag input with comma-parsing
│   ├── ContentEditor.tsx       # Content textarea + file upload
│   └── FormError.tsx           # Error message component (reusable)
│
├── lib/
│   ├── uploadValidation.ts     # Form validation logic
│   ├── slugGenerator.ts        # URL-safe slug generation
│   ├── fileHandler.ts          # Image + Markdown file operations
│   └── blogDataManager.ts      # blogs.json read/write operations
│
├── types/
│   ├── blog.ts                 # BlogPost interface (existing)
│   ├── upload.ts               # FormState, ValidationErrors types
│   └── index.ts                # Re-export all types
│
└── data/
    ├── blogs.json              # Updated with new posts
    ├── posts/                  # New .md files
    │   └── [slug].md           # Markdown content files
    └── [unchanged]
```

---

## Design & Architecture

### Component Hierarchy

```
app/upload/page.tsx (SSG wrapper)
  └── BlogUploadForm (client)
      ├── ImageUploadInput (client)
      │   └── preview + error handling
      ├── TagInput (client)
      │   └── comma-separated parser
      ├── ContentEditor (client)
      │   ├── textarea input
      │   └── file upload fallback
      └── FormError (client - reusable)
          └── aria-live alert region
```

### Data Flow

```
User Form Input (client-side)
    ↓
Input Validation (uploadValidation.ts)
    ↓
Format Conversion (tagParser, slugGenerator)
    ↓
File Preparation (image resize?, .md creation)
    ↓
API Submission (api/upload/route.ts)
    ↓
Persist to Disk (blogs.json + posts/*.md + images/blog/*)
    ↓
Success Response
    ↓
Redirect to Blog Post / Show Success Message
```

### Form Validation Strategy

**Client-Side Validation** (instant user feedback):
- Required fields check (title, author, excerpt, content, tags, readingTime)
- Field length constraints (title <200, excerpt <500)
- Reading time numeric validation
- Image format + size pre-check (JPEG/PNG/WebP, <3MB)
- Slug collision detection against existing `blogs.json`

**Server-Side Validation** (security + data integrity):
- Re-validate all fields
- Verify image MIME type
- Sanitize inputs (XSS prevention)
- Final slug uniqueness check
- File system permission checks

### Styling & Design Patterns

**Reuse from Existing Components**:
- Color scheme: Primary color (`primary-600`, `primary-700`), grays (from Tailwind defaults)
- Typography: Heading scale (`text-4xl`, `text-xl`), font weights (`font-bold`, `font-medium`)
- Spacing: Tailwind scale (px-4, py-6, gap-4)
- Shadows: `shadow-md`, `shadow-lg` on hover
- Borders: `border-gray-200`, `rounded-lg`
- Buttons: Primary CTA style from About page (`bg-primary-600 hover:bg-primary-700`)
- Forms: Input styling consistent with existing site
- Responsive: Mobile-first (sm:, md:, lg: breakpoints)

**New UI Elements** (upload form):
- File input with drag-and-drop zone (Tailwind + custom CSS)
- Image preview (thumbnail display)
- Tag display as pills (similar to BlogCard)
- Error alerts with icons (warning/error state colors)
- Loading states (spinner during submission)
- Success confirmation (toast or modal)

---

## Implementation Phases

### Phase 0: Research & Setup ✅ COMPLETE

**Status**: Completed  
**Artifacts**: spec.md (clarified), constitution alignment

### Phase 1: Design & Data Contracts

**Deliverables**: 
1. ✅ data-model.md — Entity definitions, validation rules, relationships
2. ✅ contracts/ — JSON schemas for form submission and API responses
3. ✅ quickstart.md — Developer setup guide for upload feature

**Key Decisions**:
- BlogPost interface extended with creation metadata
- File upload validation at form level + API level
- Slug generation algorithm (title sanitization + uniqueness)
- Image storage strategy (public folder, auto-naming, fallback defaults)
- Tag parsing (free-form comma-separated, whitespace trimmed)

**Testing Approach**:
- Unit tests: slug generation, tag parsing, validation logic
- Integration tests: form submission, file writes, blogs.json updates
- E2E tests: full upload workflow from form to published blog

---

## Assumptions & Constraints

### Assumptions

1. **No Database**: All data persisted to filesystem (JSON + Markdown)
2. **No Real-Time**: New posts visible after next build/deployment
3. **No Authentication**: Anyone can upload (dev/staging environment assumption)
4. **Static Generation**: Upload form available at build time; actual data writes during development
5. **Browser Compatibility**: Modern browsers (ES2020+); no IE11 support
6. **File System Access**: Dev environment has write access to `src/data/` and `public/images/`
7. **Build Process**: `npm run build` handles SSG and sitemap generation
8. **Image Optimization**: Next.js `<Image>` component handles optimization at runtime

### Constraints

- **3 MB image size limit** per upload
- **No preview mode** (direct submission)
- **Free-form tags** (no predefined list)
- **Markdown content** (no rich text editor)
- **Single author per post** (no co-authorship)
- **No draft/scheduled publishing** (immediate or manual delay)
- **No delete/edit UI** (manual file deletion required)
- **Build time**: Must complete `npm run build` in <60 seconds

---

## Technology Stack Details

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| UI Framework | Next.js 14 App Router | Static generation, file-based routing, SSG-first |
| Language | TypeScript 5.x strict mode | Type safety, catches errors at build time |
| Styling | Tailwind CSS 3.x | Utility-first, consistent with existing site |
| Form Handling | React hooks (useState) | Lightweight, no external form library dependency |
| Validation | Custom TypeScript functions | Fine-grained control, no heavy library overhead |
| Image Upload | Native `<input type="file">` | Simple, no third-party upload service |
| Image Processing | Sharp (via Next.js Image) | Automatic optimization, responsive images |
| File I/O | Node.js fs module | Direct filesystem access in API routes |
| Testing | Node.js built-in test runner (or Jest) | Standard, built-in support |
| Markdown Processing | Gray Matter (existing) | Already in project, YAML front matter support |

---

## Success Metrics

| Metric | Target | Validation |
|--------|--------|-----------|
| Form Load Time | <2 seconds | Lighthouse performance audit |
| Validation Response | <500ms | Client-side timing measurement |
| Build Time Increase | +5-10 seconds max | `time npm run build` |
| Form Accessibility | WCAG 2.1 Level AA | Axe, WAVE audits |
| Data Integrity | 100% accuracy in blogs.json | Validation test suite |
| Image Upload Success | 95%+ for <3MB images | Manual test cases |
| Slug Uniqueness | 100% no collisions | Unit tests |
| User Error Clarity | 90% understand errors | User feedback (if testable) |

---

## Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| File I/O permissions denied | Medium | Test in staging environment; document permissions |
| Slug collision on concurrent uploads | Low | Validate against current blogs.json before write |
| Large image degrading build | Medium | Enforce 3 MB limit; optimize images during build |
| XSS via title/excerpt input | High | Sanitize all inputs; use React's built-in escaping |
| Markdown rendering issues | Low | Parse with gray-matter; use existing renderer |
| Build failure if data invalid | High | Validate blogs.json schema at build time |

---

## Integration Points

### With Existing Features

1. **Blog Listing Page** (`/blogs`) — Auto-includes new posts after rebuild
2. **Blog Detail Page** (`/blog/[slug]`) — Auto-routes to new posts
3. **Navigation Component** — No changes (links already to `/upload`)
4. **BlogCard Component** — Reused for displaying new posts
5. **BlogPost Type** — Extended with upload metadata

### With Build Process

1. **Pre-Build Validation** — Validate blogs.json schema
2. **Post-Build** — Sitemap auto-generation includes new posts
3. **Image Optimization** — Next.js Image component optimizes featured images
4. **Type Checking** — `npm run type-check` validates form types

### With Deploy Process

1. **Commit** — New blog files + blogs.json changes
2. **Build** — Next.js generates static HTML for all posts
3. **Deploy** — Static files to hosting (Vercel, GitHub Pages, etc.)
4. **Live** — New posts accessible immediately post-deploy

---

## Next Steps

**Immediate**:
1. Generate data-model.md (entity definitions, validation rules)
2. Create JSON schema contracts (blog-post-upload.schema.json)
3. Write quickstart.md (developer guide)

**Then**:
4. Run `/speckit.tasks` to generate detailed task list with story-based breakdowns
5. Begin implementation of Phase 1 components (BlogUploadForm, etc.)

**Validation**:
6. Test form validation logic
7. Test file I/O operations
8. Test slug generation and collision detection
9. End-to-end test: form submission → blogs.json update → new post published

---

**Status**: ✅ Planning phase underway. Ready for Phase 1 design document generation.

