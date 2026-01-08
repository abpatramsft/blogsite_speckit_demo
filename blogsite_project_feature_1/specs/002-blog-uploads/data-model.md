# Data Model: Blog Upload & Publishing Interface

**Feature**: Blog Upload & Publishing Interface (002-blog-uploads)  
**Date**: 2026-01-08  
**Document Type**: Design Specification

## Entity Definitions

### BlogPost (Core Entity)

**Purpose**: Represents a published blog post with all metadata required for display and organization.

**Current Structure** (from existing code):
```typescript
interface BlogPost {
  id: string                    // Unique sequential identifier (e.g., "11", "12")
  slug: string                  // URL-safe identifier (e.g., "my-new-post")
  title: string                 // Blog post title (max 200 chars)
  author: string                // Author name (e.g., "Jane Doe")
  publishedDate: string         // ISO 8601 date (e.g., "2026-01-08T15:30:00.000Z")
  excerpt: string               // Preview text (100-500 chars)
  featuredImage: string         // Path to image (e.g., "/images/blog/my-post.jpg")
  featuredImageAlt: string      // Alt text for accessibility
  content: string               // Reference to markdown file (e.g., "my-post.md")
  tags: string[]                // Array of free-form tags (e.g., ["React", "Web Dev"])
  readingTimeMinutes: number    // Estimated reading time in minutes (positive integer)
}
```

**Validation Rules**:
- `id`: Required, must be unique, numeric string, auto-generated (next sequential)
- `slug`: Required, URL-safe (lowercase, hyphens only), max 100 chars, must be unique
- `title`: Required, non-empty, max 200 characters, no leading/trailing whitespace
- `author`: Required, non-empty, max 100 characters
- `publishedDate`: Required, valid ISO 8601 timestamp, must not exceed current time
- `excerpt`: Required, non-empty, 100-500 characters (warning if outside range)
- `featuredImage`: Required if uploaded; defaults to `/images/blog/default-blog-image.jpg` if omitted
- `featuredImageAlt`: Required, non-empty, max 150 characters (describes image)
- `content`: Required, must reference existing Markdown file in `src/data/posts/`
- `tags`: Required, array of 1+ strings, each tag max 50 chars, free-form (no validation against list)
- `readingTimeMinutes`: Required, positive integer, range 1-60

**Storage Format**: JSON object in `src/data/blogs.json` array under `.posts[]`

---

### UploadFormState (Form Entity)

**Purpose**: Represents the current state of the upload form during editing.

```typescript
interface UploadFormState {
  // Text inputs
  title: string
  author: string
  excerpt: string
  tagsInput: string                 // Comma-separated string (e.g., "React, TypeScript, Web Dev")
  readingTimeMinutes: string | number

  // Content
  contentMode: 'typed' | 'uploaded'  // User input method
  contentText: string                 // If typed: raw content
  contentFile?: File                  // If uploaded: Markdown file

  // Image
  imageMode: 'uploaded' | 'default'
  imageFile?: File
  imagePreviewUrl?: string            // Data URL for preview

  // Meta
  isSubmitting: boolean
  submitError?: string
  fieldErrors: Record<string, string> // e.g., { title: "Title is required" }
}
```

**Initialization**:
```typescript
const initialState: UploadFormState = {
  title: '',
  author: '',
  excerpt: '',
  tagsInput: '',
  readingTimeMinutes: '',
  contentMode: 'typed',
  contentText: '',
  imageMode: 'default',
  isSubmitting: false,
  fieldErrors: {},
}
```

---

### ValidationError (Error Entity)

**Purpose**: Represents a single validation error for display to user.

```typescript
interface ValidationError {
  field: string                    // Form field name (e.g., "title", "imageFile")
  message: string                  // User-friendly error message
  severity: 'error' | 'warning'   // Error blocks submission; warning is advisory
  code?: string                    // Machine-readable code (e.g., "FIELD_REQUIRED", "FIELD_TOO_LONG")
}
```

**Example Errors**:
- `{ field: "title", message: "Title is required", severity: "error", code: "FIELD_REQUIRED" }`
- `{ field: "excerpt", message: "Excerpt must be 100-500 characters", severity: "error", code: "FIELD_LENGTH_OUT_OF_RANGE" }`
- `{ field: "imageFile", message: "Image must be under 3 MB", severity: "error", code: "FILE_TOO_LARGE" }`
- `{ field: "excerpt", message: "Excerpt is quite short; consider 100+ characters", severity: "warning", code: "FIELD_LENGTH_SHORT" }`

---

### FileUploadPayload (Submission Entity)

**Purpose**: Represents the data being submitted from the form to the API.

```typescript
interface FileUploadPayload {
  // Metadata
  title: string
  author: string
  excerpt: string
  tags: string[]                    // Parsed from comma-separated input
  readingTimeMinutes: number

  // Content
  content: string                   // Raw markdown text (either typed or from file)
  contentFileName?: string          // Original file name if uploaded

  // Image
  image?: {
    data: string                    // Base64-encoded image data (if provided)
    mimeType: string                // e.g., "image/jpeg"
    originalFileName: string        // For reference
    size: number                    // In bytes
  }

  // Auto-generated
  slug: string                      // Generated from title
  id: string                        // Next sequential ID
  publishedDate: string             // Current timestamp (ISO 8601)
  featuredImage: string             // Path or default
  featuredImageAlt: string          // Generated from title or provided
}
```

---

## Relationships

```
BlogPostCollection (array in blogs.json)
  ↓ contains many
BlogPost (individual posts)
  ├─ references → Markdown file (src/data/posts/[slug].md)
  ├─ references → Featured Image (public/images/blog/[filename].jpg)
  └─ tags → string[] (freeform, no separate Tag entity)

UploadFormState (client-side form state)
  └─ converts → FileUploadPayload (submission)
       └─ creates → BlogPost (persisted)
            ├─ writes → blogs.json (metadata)
            └─ writes → posts/[slug].md (content)
                   └─ writes → public/images/blog/[image].jpg (featured image)
```

---

## Data Flow

### 1. Form Input → FormState

```
User types/uploads form values
    ↓
onChange events fire
    ↓
Update UploadFormState (React state)
    ↓
Display preview (image thumbnail, tags)
    ↓
(No validation yet - validation deferred to submission attempt)
```

### 2. Form Submission → Validation

```
User clicks "Publish"
    ↓
Client-side validation of UploadFormState
    ↓
If errors → Display ValidationError items, block submission
    ↓
If valid → Construct FileUploadPayload
    ↓
Send to API (POST /api/upload)
```

### 3. API Processing → Data Persistence

```
API receives FileUploadPayload
    ↓
Re-validate all fields (security)
    ↓
Generate slug from title
    ↓
Check slug uniqueness against blogs.json
    ↓
If collision → Generate slug variant (e.g., slug-2)
    ↓
Process image:
  ├─ Save to public/images/blog/[slug].jpg
  ├─ Or use default if no image provided
    ↓
Create Markdown file:
  └─ Write content to src/data/posts/[slug].md
    ↓
Create BlogPost object
    ↓
Append to src/data/blogs.json posts array
    ↓
Update lastUpdated timestamp in blogs.json
    ↓
Return success response with new BlogPost
    ↓
Client redirects to /blog/[slug] (new post)
```

---

## Persistence Model

### File Structure

```
src/data/
├── blogs.json
│   ├── version: "1.0.0"
│   ├── lastUpdated: "2026-01-08T15:30:00.000Z"
│   └── posts: [
│         { existing posts... },
│         { new post... }  ← appended on upload
│       ]
│
└── posts/
    ├── existing-post-1.md
    ├── existing-post-2.md
    └── [slug].md  ← new markdown file created on upload

public/images/blog/
├── existing-image-1.jpg
├── existing-image-2.jpg
└── [slug].jpg  ← new image file created on upload (or default used)
```

### blogs.json Structure

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-08T15:30:00.000Z",
  "posts": [
    {
      "id": "1",
      "slug": "getting-started-with-nextjs-14",
      "title": "Getting Started with Next.js 14: A Complete Guide",
      "author": "Jane Doe",
      "publishedDate": "2025-01-15T00:00:00.000Z",
      "excerpt": "Learn how to build modern web applications with Next.js 14...",
      "featuredImage": "/images/blog/nextjs-14.jpg",
      "featuredImageAlt": "Next.js 14 logo and code editor",
      "content": "getting-started-with-nextjs-14.md",
      "tags": ["Next.js", "React", "Web Development", "Tutorial"],
      "readingTimeMinutes": 8
    },
    ...existing posts...,
    {
      "id": "11",
      "slug": "my-new-uploaded-post",
      "title": "My New Uploaded Post",
      "author": "Jane Doe",
      "publishedDate": "2026-01-08T15:30:00.000Z",
      "excerpt": "This is my new post uploaded via the form...",
      "featuredImage": "/images/blog/my-new-uploaded-post.jpg",
      "featuredImageAlt": "Featured image for my new post",
      "content": "my-new-uploaded-post.md",
      "tags": ["Custom Tag", "Another Tag"],
      "readingTimeMinutes": 5
    }
  ]
}
```

### Markdown File Format

**Filename**: `[slug].md` (derived from title, lowercase, hyphens)

**Content** (optional YAML front matter + content):
```markdown
---
title: My New Uploaded Post
author: Jane Doe
publishedDate: 2026-01-08T15:30:00.000Z
tags:
  - Custom Tag
  - Another Tag
---

# My New Uploaded Post

This is the body of the blog post written in Markdown.

## Section 1

Some content here...

### Subsection 1.1

More content...

## Section 2

Final thoughts...
```

(Or just raw Markdown if no front matter)

---

## Validation Rules

### Form-Level (Client-Side)

| Field | Rule | Type | Message |
|-------|------|------|---------|
| title | Required, non-empty | Error | "Title is required" |
| title | Max 200 characters | Error | "Title must be 200 characters or less" |
| title | No leading/trailing whitespace | Auto-trim | (silent) |
| author | Required, non-empty | Error | "Author is required" |
| author | Max 100 characters | Error | "Author must be 100 characters or less" |
| excerpt | Required, non-empty | Error | "Excerpt is required" |
| excerpt | Min 100 characters | Error | "Excerpt must be at least 100 characters" |
| excerpt | Max 500 characters | Error | "Excerpt must be 500 characters or less" |
| excerpt | 100-500 range advisory | Warning | "Excerpt is quite short; consider 100+ characters" (if <100) |
| content | Required, non-empty | Error | "Content is required" |
| tags | Required, at least 1 tag | Error | "At least one tag is required" |
| tags | Each tag max 50 chars | Error | "Each tag must be 50 characters or less" |
| readingTimeMinutes | Required, numeric | Error | "Reading time must be a number" |
| readingTimeMinutes | Positive integer, 1-60 | Error | "Reading time must be between 1 and 60 minutes" |
| imageFile | Optional; if provided, validate type | Error | "Image must be JPEG, PNG, or WebP" |
| imageFile | Max 3 MB | Error | "Image must be under 3 MB" |

### API-Level (Server-Side)

**All client-side rules re-validated**  
**Additional checks**:
- Slug uniqueness against existing `blogs.json`
- Image MIME type verification (not just extension)
- Input sanitization (XSS prevention)
- File system write permissions
- blogs.json schema validation post-write

---

## Field Transformations

### Slug Generation

**Algorithm**:
```typescript
function generateSlug(title: string): string {
  // 1. Trim whitespace
  let slug = title.trim()

  // 2. Convert to lowercase
  slug = slug.toLowerCase()

  // 3. Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '')

  // 4. Replace spaces and special chars with hyphens
  slug = slug.replace(/[^a-z0-9-]/g, '-')

  // 5. Remove consecutive hyphens
  slug = slug.replace(/-+/g, '-')

  // 6. Limit to 100 characters
  slug = slug.slice(0, 100)

  return slug
}

// Examples:
// "My New Blog Post" → "my-new-blog-post"
// "React Best Practices!" → "react-best-practices"
// "TypeScript   Best   Practices" → "typescript-best-practices"
```

### Tag Parsing

**Algorithm**:
```typescript
function parseTags(tagsInput: string): string[] {
  return tagsInput
    .split(',')                        // Split by comma
    .map((tag) => tag.trim())          // Trim whitespace from each
    .filter((tag) => tag.length > 0)   // Remove empty strings
    .map((tag) => tag.slice(0, 50))    // Cap at 50 chars per tag
}

// Example:
// "React, Web Development, TypeScript" → ["React", "Web Development", "TypeScript"]
// "react, web dev,  ,typescript" → ["react", "web dev", "typescript"]
```

### ID Generation

**Algorithm**:
```typescript
function generateNextId(existingPosts: BlogPost[]): string {
  const maxId = Math.max(
    0,
    ...existingPosts.map((p) => parseInt(p.id, 10))
  )
  return String(maxId + 1)
}

// Example:
// If posts array has ids ["1", "2", "3", "10"]
// Next ID → "11"
```

### Featured Image Path

**Logic**:
```typescript
function getImagePath(
  imageUploaded: boolean,
  slug: string,
  imageExtension?: string
): string {
  if (imageUploaded && imageExtension) {
    // Save custom image to public/images/blog/[slug].[ext]
    return `/images/blog/${slug}.${imageExtension}`
  } else {
    // Use default fallback
    return `/images/blog/default-blog-image.jpg`
  }
}
```

### Published Date

**Format**: ISO 8601 UTC timestamp at submission time

```typescript
function getCurrentPublishedDate(): string {
  return new Date().toISOString()
  // Example: "2026-01-08T15:30:45.123Z"
}
```

---

## Error Scenarios & Recovery

| Scenario | Cause | Client Handling | API Handling | Recovery |
|----------|-------|-----------------|-------------|----------|
| Slug collision | Title duplicates existing | Warn in preview (if preview existed) | Append numeric suffix (-2, -3) or regenerate | Auto-resolved; user informed of new slug |
| Image too large | User uploads >3MB | Display error immediately | N/A | User re-uploads smaller image |
| Invalid image type | User uploads .bmp, .gif | Display error immediately | N/A | User uploads JPEG/PNG/WebP |
| Markdown syntax error | User pastes invalid MD | Accept as-is (no validation) | Accept as-is (parser handles) | Display as-is; user can view and notice |
| blogs.json write fails | Permissions, disk full | N/A | Return error response | Manual fix required; docs should clarify |
| Missing required field | User submits form incomplete | Block submission, highlight field | Re-validate, return error | User fills in field and retries |
| XSS injection attempt | User injects `<script>` | React auto-escapes | Sanitize input | Safe rendering |

---

## Constraints & Limitations

### Hard Constraints

- **3 MB image limit**: Enforced at form and API level
- **200 char title max**: Field validation + API check
- **500 char excerpt max**: Field validation + API check
- **100-500 char excerpt range**: Recommended, warnings if outside
- **Slug max 100 chars**: Hard limit for URL safety
- **1-60 min reading time**: Reasonable range for blog posts
- **1+ tags required**: At least one tag per post
- **No authentication**: Anyone can upload (dev environment)
- **No real-time updates**: Rebuild required to see new posts live

### Soft Constraints

- **Max 10 failed validation attempts before timeout** (advisory): Discourage brute-force form attacks
- **Tag recommendations** (future): Suggest tags from existing posts as user types

---

## Future Extensions (Out of Scope)

- Draft/scheduled publishing
- Post editing UI
- Post deletion UI
- Comment system
- Search/filter by tags
- Tag autocomplete from existing tags
- Co-author support
- Featured post promotion
- Reading time auto-calculation

---

## Schema Validation (JSON Schema)

See `contracts/blog-post-upload.schema.json` for full OpenAPI/JSON Schema definition.

**Key Validation**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BlogPost",
  "type": "object",
  "required": ["id", "slug", "title", "author", "publishedDate", "excerpt", "featuredImage", "featuredImageAlt", "content", "tags", "readingTimeMinutes"],
  "properties": {
    "id": { "type": "string", "pattern": "^[0-9]+$" },
    "slug": { "type": "string", "pattern": "^[a-z0-9-]+$", "maxLength": 100 },
    "title": { "type": "string", "minLength": 1, "maxLength": 200 },
    "author": { "type": "string", "minLength": 1, "maxLength": 100 },
    "publishedDate": { "type": "string", "format": "date-time" },
    "excerpt": { "type": "string", "minLength": 100, "maxLength": 500 },
    "featuredImage": { "type": "string", "format": "uri" },
    "featuredImageAlt": { "type": "string", "minLength": 1, "maxLength": 150 },
    "content": { "type": "string", "pattern": "^[a-z0-9-]+\\.md$" },
    "tags": { "type": "array", "items": { "type": "string", "maxLength": 50 }, "minItems": 1 },
    "readingTimeMinutes": { "type": "integer", "minimum": 1, "maximum": 60 }
  }
}
```

---

**Data Model Complete** ✅  
**Ready for quickstart.md and schema contracts generation**

