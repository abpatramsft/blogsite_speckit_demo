/**
 * Upload API Route Handler
 * Processes blog post submissions and persists data
 * Reference: specs/002-blog-uploads/plan.md - Data Flow
 *
 * POST /api/upload - Create and publish a new blog post
 */

import { NextRequest, NextResponse } from 'next/server'
import { BlogPost } from '@/types/blog'
import {
  validateTitle,
  validateAuthor,
  validateExcerpt,
  validateContent,
  validateTags,
  validateReadingTime,
  validateImageFile,
  validatePublishedDate,
  errorsToFieldMap,
} from '@/lib/uploadValidation'
import { generateUniqueSlug, isValidSlugFormat } from '@/lib/slugGenerator'
import { addBlogEntry, getNextBlogId } from '@/lib/blogDataManager'
import { saveImageFile, saveMarkdownFile, generateImagePath } from '@/lib/fileHandler'
import { UploadFormSubmission, UploadResponse } from '@/types/upload'

/**
 * Sanitize input to prevent XSS attacks
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Sanitize HTML in content while preserving Markdown syntax
 */
function sanitizeMarkdown(content: string): string {
  // Remove script tags and dangerous HTML
  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
}

/**
 * Parse comma-separated tags into array
 */
function parseTags(tagsInput: string): string[] {
  return tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0 && tag.length <= 50)
}

/**
 * POST handler for blog post uploads
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = (await request.json()) as UploadFormSubmission

    // Server-side validation - re-validate all fields
    const errors: Record<string, string> = {}

    // Validate title
    const titleError = validateTitle(payload.title)
    if (titleError) {
      errors[titleError.field] = titleError.message
    }

    // Validate author
    const authorError = validateAuthor(payload.author)
    if (authorError) {
      errors[authorError.field] = authorError.message
    }

    // Validate excerpt
    const excerptError = validateExcerpt(payload.excerpt)
    if (excerptError) {
      errors[excerptError.field] = excerptError.message
    }

    // Validate reading time
    const readingTimeError = validateReadingTime(payload.readingTimeMinutes)
    if (readingTimeError) {
      errors[readingTimeError.field] = readingTimeError.message
    }

    // Validate tags
    const tagsError = validateTags(payload.tagsInput)
    if (tagsError) {
      errors[tagsError.field] = tagsError.message
    }

    // Validate content
    let contentToSave = ''
    if (payload.contentMode === 'typed') {
      const contentError = validateContent(payload.content)
      if (contentError) {
        errors[contentError.field] = contentError.message
      } else {
        contentToSave = sanitizeMarkdown(payload.content)
      }
    } else if (payload.contentMode === 'uploaded') {
      // Content from uploaded file is already validated on client
      // For now, require some content
      if (!payload.content) {
        errors.content = 'Content is required'
      } else {
        contentToSave = sanitizeMarkdown(payload.content)
      }
    }

    // Validate image if provided
    if (payload.imageMode === 'uploaded' && payload.image) {
      // Validate MIME type
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedMimeTypes.includes(payload.image.mimeType)) {
        errors.image = 'Image must be JPEG, PNG, or WebP format'
      }

      // Validate size
      if (payload.image.size > 3145728) {
        errors.image = 'Image must be under 3 MB'
      }
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        } as UploadResponse,
        { status: 400 }
      )
    }

    // Generate unique slug from title
    const slug = generateUniqueSlug(payload.title)

    if (!isValidSlugFormat(slug)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to generate valid slug',
        } as UploadResponse,
        { status: 500 }
      )
    }

    // Get next ID
    const id = getNextBlogId()

    // Get current timestamp
    const publishedDate = new Date().toISOString()

    // Validate published date
    const dateError = validatePublishedDate(publishedDate)
    if (dateError) {
      return NextResponse.json(
        {
          success: false,
          message: dateError.message,
        } as UploadResponse,
        { status: 500 }
      )
    }

    // Handle image storage
    let imagePath = '/images/blog/default-blog-image.jpg'
    if (payload.imageMode === 'uploaded' && payload.image) {
      try {
        imagePath = saveImageFile(payload.image.data, payload.image.originalFileName)
      } catch (error) {
        console.error('Error saving image:', error)
        return NextResponse.json(
          {
            success: false,
            message: 'Failed to save image file',
          } as UploadResponse,
          { status: 500 }
        )
      }
    }

    // Save markdown file
    let markdownFilename = ''
    try {
      markdownFilename = saveMarkdownFile(slug, contentToSave)
    } catch (error) {
      console.error('Error saving markdown:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save blog content',
        } as UploadResponse,
        { status: 500 }
      )
    }

    // Parse tags
    const tags = parseTags(payload.tagsInput)

    // Create blog post entry
    const newPost: BlogPost = {
      id,
      slug,
      title: sanitizeInput(payload.title),
      author: sanitizeInput(payload.author),
      publishedDate,
      excerpt: sanitizeInput(payload.excerpt),
      featuredImage: imagePath,
      featuredImageAlt: sanitizeInput(payload.title), // Use title as alt text if not provided
      content: markdownFilename,
      tags,
      readingTimeMinutes: payload.readingTimeMinutes,
    }

    // Add entry to blogs.json
    try {
      addBlogEntry(newPost)
    } catch (error) {
      console.error('Error adding blog entry:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to publish blog post',
          code: 'DATABASE_ERROR',
        } as UploadResponse,
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Blog post published successfully!',
        slug,
        postUrl: `/blog/${slug}`,
        id,
        publishedDate,
      } as UploadResponse,
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload handler error:', error)

    const errorMessage =
      error instanceof SyntaxError
        ? 'Invalid request format'
        : 'An unexpected error occurred'

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      } as UploadResponse,
      { status: 500 }
    )
  }
}
