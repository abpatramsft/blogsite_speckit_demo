# Quickstart: Blog Upload Feature Development

**Feature**: Blog Upload & Publishing Interface (002-blog-uploads)  
**Status**: Ready for implementation  
**Estimated Dev Time**: 4-6 hours (form + validation + API + integration tests)

---

## Prerequisites

- Node.js 18+ LTS installed
- BlogSite project cloned and dependencies installed (`npm install`)
- Knowledge of Next.js 14 App Router, React hooks, TypeScript
- Understanding of blog data structure (see [data-model.md](./data-model.md))
- Access to git branch `002-blog-uploads`

---

## Project Setup

### 1. Ensure Branch is Active

```bash
cd blogsite
git checkout 002-blog-uploads
git pull origin 002-blog-uploads
```

### 2. Review Design Documents

Read in order:
1. [spec.md](./spec.md) — User stories, requirements, success criteria
2. [data-model.md](./data-model.md) — Data structures, validation rules, transformations
3. [plan.md](./plan.md) — Architecture, design decisions, tech stack
4. This file — Implementation guide

### 3. Understand Existing Codebase

**Key files to review**:
- `src/types/blog.ts` — BlogPost interface
- `src/components/BlogCard.tsx` — Component styling patterns
- `src/lib/getBlogPosts.ts` — Data fetching logic
- `src/app/blogs/page.tsx` — Page structure and layout
- `src/data/blogs.json` — Current data format
- `tailwind.config.js` — Color scheme and design system

**Key patterns**:
- Component structure: Client components use `'use client'`, server components use async
- Styling: Tailwind CSS utility classes (no CSS modules), responsive breakpoints (sm, md, lg)
- Type safety: All components and functions fully typed with TypeScript
- Error handling: Graceful fallbacks (e.g., image fallback gradient)
- Accessibility: Semantic HTML, ARIA labels, keyboard navigation

---

## Implementation Roadmap

### Phase 1: Create Components & Utilities

#### 1a. Create `src/types/upload.ts`

```typescript
// Form state type (from data-model.md)
export interface UploadFormState {
  title: string
  author: string
  excerpt: string
  tagsInput: string
  readingTimeMinutes: string | number
  contentMode: 'typed' | 'uploaded'
  contentText: string
  contentFile?: File
  imageMode: 'uploaded' | 'default'
  imageFile?: File
  imagePreviewUrl?: string
  isSubmitting: boolean
  submitError?: string
  fieldErrors: Record<string, string>
}

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
  code?: string
}
```

#### 1b. Create `src/lib/uploadValidation.ts`

```typescript
// Validation functions
export function validateTitle(title: string): ValidationError[] { ... }
export function validateAuthor(author: string): ValidationError[] { ... }
export function validateExcerpt(excerpt: string): ValidationError[] { ... }
export function validateContent(content: string): ValidationError[] { ... }
export function validateTags(tagsInput: string): { tags: string[], errors: ValidationError[] } { ... }
export function validateReadingTime(time: string | number): ValidationError[] { ... }
export function validateImage(file?: File): ValidationError[] { ... }

export function validateForm(state: UploadFormState): ValidationError[] {
  // Aggregate all validation errors
}
```

#### 1c. Create `src/lib/slugGenerator.ts`

```typescript
export function generateSlug(title: string): string {
  // Algorithm from data-model.md
  return slug
}

export async function ensureUniqueSlug(slug: string, existingPosts?: BlogPost[]): Promise<string> {
  // Check existing slugs, append -2, -3 if collision
}
```

#### 1d. Create `src/lib/blogDataManager.ts`

```typescript
export async function getBlogsData(): Promise<BlogPostCollection> {
  // Read src/data/blogs.json
}

export async function addBlogPost(post: BlogPost): Promise<BlogPostCollection> {
  // Append post to blogs.json and update lastUpdated
}

export function getNextId(posts: BlogPost[]): string {
  // Generate next sequential ID
}
```

#### 1e. Create `src/lib/fileHandler.ts`

```typescript
export function generateImageFileName(slug: string, mimeType: string): string {
  // Return filename for public/images/blog/
}

export async function saveImage(
  file: File,
  fileName: string
): Promise<string> {
  // Base64 encode or handle file upload
  // Return path: /images/blog/[filename]
}

export async function saveMarkdownFile(slug: string, content: string): Promise<string> {
  // Write to src/data/posts/[slug].md
  // Return filename
}
```

#### 1f. Create `src/components/FormError.tsx`

Reusable error display component:

```typescript
'use client'

import { ValidationError } from '@/types/upload'

interface FormErrorProps {
  errors?: ValidationError[]
  field?: string
}

export default function FormError({ errors, field }: FormErrorProps) {
  if (!errors) return null

  const fieldErrors = field 
    ? errors.filter((e) => e.field === field)
    : errors

  if (fieldErrors.length === 0) return null

  return (
    <div role="alert" aria-live="polite" className="rounded-lg bg-red-50 p-4 text-red-800">
      {fieldErrors.map((err) => (
        <p key={err.code} className="text-sm font-medium">
          {err.message}
        </p>
      ))}
    </div>
  )
}
```

#### 1g. Create `src/components/BlogUploadForm.tsx`

Main form component (150-200 lines):

```typescript
'use client'

import { useState } from 'react'
import { UploadFormState, ValidationError } from '@/types/upload'
import { validateForm } from '@/lib/uploadValidation'
import FormError from './FormError'
import ImageUploadInput from './ImageUploadInput'
import TagInput from './TagInput'
import ContentEditor from './ContentEditor'

const initialState: UploadFormState = { ... }

export default function BlogUploadForm() {
  const [state, setState] = useState<UploadFormState>(initialState)
  const [errors, setErrors] = useState<ValidationError[]>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Validate
    const validationErrors = validateForm(state)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    // Submit
    setState({ ...state, isSubmitting: true })
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      // Redirect to new post
      window.location.href = `/blog/${data.slug}`
    } catch (err) {
      setState({
        ...state,
        isSubmitting: false,
        submitError: err.message,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
          Post Title *
        </label>
        <input
          id="title"
          type="text"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
          maxLength={200}
          required
        />
        <FormError errors={errors} field="title" />
      </div>

      {/* Author Input */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-900">
          Author *
        </label>
        <input
          id="author"
          type="text"
          value={state.author}
          onChange={(e) => setState({ ...state, author: e.target.value })}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
          maxLength={100}
          required
        />
        <FormError errors={errors} field="author" />
      </div>

      {/* Excerpt Input */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-900">
          Excerpt *
        </label>
        <textarea
          id="excerpt"
          value={state.excerpt}
          onChange={(e) => setState({ ...state, excerpt: e.target.value })}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
          rows={3}
          maxLength={500}
          required
        />
        <FormError errors={errors} field="excerpt" />
      </div>

      {/* Featured Image */}
      <ImageUploadInput
        imageFile={state.imageFile}
        imagePreviewUrl={state.imagePreviewUrl}
        onImageSelect={(file, previewUrl) =>
          setState({ ...state, imageFile: file, imagePreviewUrl: previewUrl })
        }
        errors={errors}
      />

      {/* Content Editor */}
      <ContentEditor
        contentMode={state.contentMode}
        contentText={state.contentText}
        contentFile={state.contentFile}
        onContentChange={(text, mode) =>
          setState({ ...state, contentText: text, contentMode: mode })
        }
        onFileSelect={(file) => setState({ ...state, contentFile: file })}
        errors={errors}
      />

      {/* Tags */}
      <TagInput
        tagsInput={state.tagsInput}
        onTagsChange={(input) => setState({ ...state, tagsInput: input })}
        errors={errors}
      />

      {/* Reading Time */}
      <div>
        <label htmlFor="readingTime" className="block text-sm font-medium text-gray-900">
          Reading Time (minutes) *
        </label>
        <input
          id="readingTime"
          type="number"
          value={state.readingTimeMinutes}
          onChange={(e) =>
            setState({ ...state, readingTimeMinutes: e.target.value })
          }
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
          min="1"
          max="60"
          required
        />
        <FormError errors={errors} field="readingTimeMinutes" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state.isSubmitting}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {state.isSubmitting ? 'Publishing...' : 'Publish Post'}
      </button>

      {/* Global Error */}
      {state.submitError && (
        <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
          {state.submitError}
        </div>
      )}
    </form>
  )
}
```

#### 1h. Create Sub-Components

**`src/components/ImageUploadInput.tsx`** — Image file input with preview  
**`src/components/TagInput.tsx`** — Tag input with comma-parsing  
**`src/components/ContentEditor.tsx`** — Textarea + file upload toggle

(See component stubs in components plan)

### Phase 2: Create API Route

#### 2a. Create `src/app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { BlogPost } from '@/types/blog'
import { validateForm } from '@/lib/uploadValidation'
import { generateSlug, ensureUniqueSlug } from '@/lib/slugGenerator'
import { getBlogsData, addBlogPost, getNextId } from '@/lib/blogDataManager'
import { saveImage, saveMarkdownFile } from '@/lib/fileHandler'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const errors = validateForm(body)
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    // Get existing posts
    const blogsData = await getBlogsData()

    // Generate slug
    let slug = generateSlug(body.title)
    slug = await ensureUniqueSlug(slug, blogsData.posts)

    // Save image
    let featuredImage = '/images/blog/default-blog-image.jpg'
    if (body.image) {
      featuredImage = await saveImage(body.image, generateImageFileName(slug, body.image.mimeType))
    }

    // Save markdown
    const contentFileName = await saveMarkdownFile(slug, body.content)

    // Create BlogPost object
    const newPost: BlogPost = {
      id: getNextId(blogsData.posts),
      slug,
      title: body.title,
      author: body.author,
      publishedDate: new Date().toISOString(),
      excerpt: body.excerpt,
      featuredImage,
      featuredImageAlt: body.featuredImageAlt || body.title,
      content: contentFileName,
      tags: parseTags(body.tags),
      readingTimeMinutes: parseInt(body.readingTimeMinutes, 10),
    }

    // Add to blogs.json
    const updatedData = await addBlogPost(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload blog post' },
      { status: 500 }
    )
  }
}

function parseTags(tagsInput: string | string[]): string[] {
  if (Array.isArray(tagsInput)) return tagsInput
  return tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

function generateImageFileName(slug: string, mimeType: string): string {
  const ext = mimeType === 'image/jpeg' ? 'jpg' : mimeType.split('/')[1]
  return `${slug}.${ext}`
}
```

### Phase 3: Create Upload Page

#### 3a. Create `src/app/upload/page.tsx`

```typescript
import { Metadata } from 'next'
import BlogUploadForm from '@/components/BlogUploadForm'

export const metadata: Metadata = {
  title: 'Upload Blog Post',
  description: 'Create and publish a new blog post',
}

export default function UploadPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create New Blog Post
          </h1>
          <p className="text-xl text-gray-600">
            Fill in the details below to publish a new blog post.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <BlogUploadForm />
      </div>
    </div>
  )
}
```

### Phase 4: Update Navigation

#### 4a. Update `src/components/Navigation.tsx`

Add link to `/upload`:

```tsx
<Link
  href="/upload"
  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
>
  Upload
</Link>
```

### Phase 5: Testing

#### 5a. Unit Tests

Test validation functions, slug generation, tag parsing:

```bash
npm test -- uploadValidation.test.ts
npm test -- slugGenerator.test.ts
```

#### 5b. Integration Tests

Test form submission, API response, blogs.json update:

```bash
# Manual testing: npm run dev, navigate to /upload, fill form, submit
# Verify blogs.json updated
# Verify new .md file created
# Verify new post accessible at /blog/[slug]
```

#### 5c. End-to-End

Full workflow from form to published post visible on `/blogs` page.

---

## File Checklist

### New Files to Create

- [ ] `src/types/upload.ts` — Form and validation types
- [ ] `src/lib/uploadValidation.ts` — Validation functions
- [ ] `src/lib/slugGenerator.ts` — Slug generation and uniqueness
- [ ] `src/lib/blogDataManager.ts` — blogs.json I/O
- [ ] `src/lib/fileHandler.ts` — File operations
- [ ] `src/components/BlogUploadForm.tsx` — Main form
- [ ] `src/components/FormError.tsx` — Error display
- [ ] `src/components/ImageUploadInput.tsx` — Image upload
- [ ] `src/components/TagInput.tsx` — Tag input
- [ ] `src/components/ContentEditor.tsx` — Content input
- [ ] `src/app/upload/page.tsx` — Upload page
- [ ] `src/app/api/upload/route.ts` — API handler

### Files to Update

- [ ] `src/components/Navigation.tsx` — Add upload link
- [ ] `src/data/blogs.json` — Add new posts (after upload)
- [ ] `src/data/posts/*.md` — New markdown files (after upload)

### Documentation to Update

- [ ] `README.md` — Add instructions for using upload page

---

## Development Commands

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Run tests (once implemented)
npm test
```

---

## Common Patterns from Existing Code

### Component Structure

```typescript
'use client'

import { useState } from 'react'

interface ComponentProps {
  // Props
}

export default function Component({ ...props }: ComponentProps) {
  const [state, setState] = useState(...)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState(e.target.value)
  }

  return (
    <div className="space-y-4">
      {/* Semantic HTML, Tailwind classes */}
    </div>
  )
}
```

### Error Handling

```typescript
if (imageError) {
  return (
    <div className="bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
      {/* Fallback UI */}
    </div>
  )
}
```

### Tailwind Styling

```typescript
// Use utility classes
className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white"

// Responsive breakpoints
className="text-lg md:text-xl lg:text-2xl"

// Spacing
className="space-y-4" // Vertical stack
className="flex gap-2" // Horizontal with gap
```

---

## Debugging Tips

1. **Type errors**: Run `npm run type-check` to catch TypeScript issues early
2. **Form submission**: Add `console.log(state)` before fetch to debug form data
3. **API errors**: Check browser DevTools Network tab; add error logging to route handler
4. **Styling issues**: Inspect element in DevTools; verify Tailwind config is loaded
5. **File I/O**: Check file permissions; ensure `src/data/` is writable

---

## Next Steps After Implementation

1. Test full workflow (form → submission → blogs.json update → new post published)
2. Run `npm run type-check && npm run lint`
3. Build for production: `npm run build`
4. Create comprehensive test suite
5. Document any deviations from plan
6. Request code review
7. Merge to main branch

---

**Ready to start development!** 🚀  
Follow the phases above and refer back to data-model.md and plan.md as needed.

