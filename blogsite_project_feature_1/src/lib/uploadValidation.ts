/**
 * Form Validation Utilities
 * Reference: specs/002-blog-uploads/data-model.md - Validation Rules
 * Provides field-level and form-level validation functions
 */

import { ValidationError } from '@/types/upload'

/**
 * Validate blog post title
 * Required, non-empty, max 200 characters
 */
export function validateTitle(title: string): ValidationError | null {
  if (!title || title.trim().length === 0) {
    return {
      field: 'title',
      message: 'Title is required',
      code: 'REQUIRED',
    }
  }

  if (title.length > 200) {
    return {
      field: 'title',
      message: 'Title must be 200 characters or less',
      code: 'TOO_LONG',
    }
  }

  return null
}

/**
 * Validate author name
 * Required, non-empty, max 100 characters
 */
export function validateAuthor(author: string): ValidationError | null {
  if (!author || author.trim().length === 0) {
    return {
      field: 'author',
      message: 'Author name is required',
      code: 'REQUIRED',
    }
  }

  if (author.length > 100) {
    return {
      field: 'author',
      message: 'Author name must be 100 characters or less',
      code: 'TOO_LONG',
    }
  }

  return null
}

/**
 * Validate excerpt
 * Required, 100-500 characters
 */
export function validateExcerpt(excerpt: string): ValidationError | null {
  if (!excerpt || excerpt.trim().length === 0) {
    return {
      field: 'excerpt',
      message: 'Excerpt is required',
      code: 'REQUIRED',
    }
  }

  if (excerpt.length < 100) {
    return {
      field: 'excerpt',
      message: 'Excerpt must be at least 100 characters',
      code: 'TOO_SHORT',
    }
  }

  if (excerpt.length > 500) {
    return {
      field: 'excerpt',
      message: 'Excerpt must be 500 characters or less',
      code: 'TOO_LONG',
    }
  }

  return null
}

/**
 * Validate reading time in minutes
 * Required, positive integer, range 1-60
 */
export function validateReadingTime(
  readingTime: string | number
): ValidationError | null {
  const num = typeof readingTime === 'string' ? parseInt(readingTime, 10) : readingTime

  if (isNaN(num)) {
    return {
      field: 'readingTimeMinutes',
      message: 'Reading time must be a number',
      code: 'INVALID_FORMAT',
    }
  }

  if (num < 1 || num > 60) {
    return {
      field: 'readingTimeMinutes',
      message: 'Reading time must be between 1 and 60 minutes',
      code: 'OUT_OF_RANGE',
    }
  }

  return null
}

/**
 * Validate image file
 * Allowed types: JPEG, PNG, WebP
 * Max size: 3 MB (3145728 bytes)
 */
export function validateImageFile(file: File | undefined): ValidationError | null {
  if (!file) {
    // Image is optional, so no file is valid
    return null
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      field: 'image',
      message: 'Image must be JPEG, PNG, or WebP format',
      code: 'INVALID_TYPE',
    }
  }

  const maxSizeBytes = 3145728 // 3 MB
  if (file.size > maxSizeBytes) {
    return {
      field: 'image',
      message: 'Image must be under 3 MB',
      code: 'FILE_TOO_LARGE',
    }
  }

  return null
}

/**
 * Validate content (markdown)
 * Required, minimum 50 characters
 */
export function validateContent(content: string): ValidationError | null {
  if (!content || content.trim().length === 0) {
    return {
      field: 'content',
      message: 'Content is required',
      code: 'REQUIRED',
    }
  }

  if (content.length < 50) {
    return {
      field: 'content',
      message: 'Content must be at least 50 characters',
      code: 'TOO_SHORT',
    }
  }

  return null
}

/**
 * Validate tags input
 * Required, at least one tag after parsing
 * Individual tags max 50 characters
 */
export function validateTags(tagsInput: string): ValidationError | null {
  if (!tagsInput || tagsInput.trim().length === 0) {
    return {
      field: 'tags',
      message: 'At least one tag is required',
      code: 'REQUIRED',
    }
  }

  // Parse comma-separated tags
  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)

  if (tags.length === 0) {
    return {
      field: 'tags',
      message: 'At least one tag is required',
      code: 'REQUIRED',
    }
  }

  // Check individual tag length
  for (const tag of tags) {
    if (tag.length > 50) {
      return {
        field: 'tags',
        message: `Tag "${tag}" is too long (max 50 characters)`,
        code: 'TAG_TOO_LONG',
      }
    }
  }

  return null
}

/**
 * Validate publishedDate is not in future
 * Date must be ISO 8601 format and not exceed current time
 */
export function validatePublishedDate(dateString: string): ValidationError | null {
  if (!dateString) {
    return {
      field: 'publishedDate',
      message: 'Published date is required',
      code: 'REQUIRED',
    }
  }

  const date = new Date(dateString)
  const now = new Date()

  if (isNaN(date.getTime())) {
    return {
      field: 'publishedDate',
      message: 'Invalid date format',
      code: 'INVALID_FORMAT',
    }
  }

  if (date > now) {
    return {
      field: 'publishedDate',
      message: 'Published date cannot be in the future',
      code: 'FUTURE_DATE',
    }
  }

  return null
}

/**
 * Validate all form fields
 * Returns array of ValidationError objects (empty if all valid)
 */
export function validateAllFields(formData: {
  title: string
  author: string
  excerpt: string
  content: string
  tagsInput: string
  readingTimeMinutes: string | number
  imageFile?: File
}): ValidationError[] {
  const errors: ValidationError[] = []

  const titleError = validateTitle(formData.title)
  if (titleError) errors.push(titleError)

  const authorError = validateAuthor(formData.author)
  if (authorError) errors.push(authorError)

  const excerptError = validateExcerpt(formData.excerpt)
  if (excerptError) errors.push(excerptError)

  const contentError = validateContent(formData.content)
  if (contentError) errors.push(contentError)

  const tagsError = validateTags(formData.tagsInput)
  if (tagsError) errors.push(tagsError)

  const readingTimeError = validateReadingTime(formData.readingTimeMinutes)
  if (readingTimeError) errors.push(readingTimeError)

  const imageError = validateImageFile(formData.imageFile)
  if (imageError) errors.push(imageError)

  return errors
}

/**
 * Convert validation errors array to field-indexed object
 * Useful for form state error tracking
 */
export function errorsToFieldMap(
  errors: ValidationError[]
): Record<string, string> {
  const fieldMap: Record<string, string> = {}
  for (const error of errors) {
    fieldMap[error.field] = error.message
  }
  return fieldMap
}
