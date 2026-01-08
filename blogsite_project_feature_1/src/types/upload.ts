/**
 * Upload Feature Type Definitions
 * Defines form state, validation errors, and API payload types for blog upload feature
 * Reference: specs/002-blog-uploads/data-model.md
 */

/**
 * Represents current state of the blog upload form during editing
 * Manages text inputs, content mode, image mode, and submission state
 */
export interface UploadFormState {
  // Text inputs
  title: string
  author: string
  excerpt: string
  tagsInput: string // Comma-separated string (e.g., "React, TypeScript, Web Dev")
  readingTimeMinutes: string | number

  // Content
  contentMode: 'typed' | 'uploaded' // User input method
  contentText: string // If typed: raw markdown content
  contentFile?: File // If uploaded: Markdown file

  // Image
  imageMode: 'uploaded' | 'default' // User choice for featured image
  imageFile?: File // If uploaded: image file
  imagePreviewUrl?: string // Data URL for preview

  // Meta
  isSubmitting: boolean
  submitError?: string
  fieldErrors: Record<string, string> // e.g., { title: "Title is required" }
}

/**
 * Validation error details for a single field
 */
export interface ValidationError {
  field: string // Field name (e.g., "title", "excerpt")
  message: string // Error message to display
  code: string // Error code for programmatic handling (e.g., "REQUIRED", "TOO_LONG")
}

/**
 * File upload payload with metadata
 * Used internally for image and markdown file handling
 */
export interface FileUploadPayload {
  file: File
  type: 'image' | 'markdown' // Type of file being uploaded
  mimeType: string // MIME type (e.g., "image/jpeg")
  size: number // File size in bytes
  name: string // Original filename
}

/**
 * Form submission payload - sent to API endpoint
 * Includes both form data and file uploads encoded as base64
 */
export interface UploadFormSubmission {
  title: string
  author: string
  excerpt: string
  tagsInput: string // Comma-separated string; will be parsed server-side
  readingTimeMinutes: number
  contentMode: 'typed' | 'uploaded'
  content: string // Raw markdown or filename reference
  imageMode: 'default' | 'uploaded'
  image?: {
    data: string // Base64-encoded image data
    mimeType: string // MIME type (validated: image/jpeg, image/png, image/webp)
    originalFileName: string
    size: number // File size in bytes
  }
}

/**
 * API response after successful blog post upload
 * Returns the created post slug and URL for navigation
 */
export interface UploadSuccessResponse {
  success: true
  message: string
  slug: string // Generated URL-safe slug for the new post
  postUrl: string // Full URL path to new post (e.g., "/blog/my-new-post")
  id: string // Generated post ID
  publishedDate: string // ISO 8601 timestamp
}

/**
 * API error response
 */
export interface UploadErrorResponse {
  success: false
  message: string
  errors?: Record<string, string> // Field-level errors (e.g., { title: "Title is required" })
  code?: string // Error code for programmatic handling
}

/**
 * Combined API response type
 */
export type UploadResponse = UploadSuccessResponse | UploadErrorResponse

/**
 * Initial form state - used to reset form after successful submission
 */
export const initialUploadFormState: UploadFormState = {
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
