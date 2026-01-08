/**
 * File Handler Utilities
 * Reference: specs/002-blog-uploads/data-model.md - File Operations
 * Handles saving images to public/images/blog/ and markdown files to src/data/posts/
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog')
const POSTS_DIR = path.join(process.cwd(), 'src', 'data', 'posts')

/**
 * Sanitize filename to prevent directory traversal and invalid characters
 * Removes special characters, replaces spaces with hyphens
 *
 * Examples:
 *   "my image.jpg" → "my-image.jpg"
 *   "../../etc/passwd" → "etcpasswd"
 *   "file (1).png" → "file-1.png"
 */
export function sanitizeFilename(filename: string): string {
  return (
    filename
      // Remove path separators and parent directory references
      .replace(/\.\.\//g, '')
      .replace(/\.\.\\/g, '')
      .replace(/[\/\\]/g, '')
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove special characters except dots and hyphens
      .replace(/[^a-zA-Z0-9._-]/g, '')
      // Replace multiple dots (prevent double extensions)
      .replace(/\.+/g, '.')
      // Trim leading/trailing hyphens and dots
      .replace(/^[-.]/, '')
      .replace(/[-.]$/, '')
  )
}

/**
 * Generate a unique image filename
 * Adds timestamp to prevent collisions
 * Example: "my-image.jpg" → "my-image-1705336200.jpg"
 */
export function generateImageFilePath(originalFileName: string): string {
  const timestamp = Math.floor(Date.now() / 1000)
  const ext = path.extname(originalFileName).toLowerCase()
  const nameWithoutExt = path.basename(originalFileName, ext)
  const sanitized = sanitizeFilename(nameWithoutExt)

  // Ensure we have a valid name
  const finalName = sanitized ? `${sanitized}-${timestamp}` : `image-${timestamp}`

  return `${finalName}${ext}`
}

/**
 * Ensure directories exist
 */
function ensureDirectoriesExist(): void {
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true })
  }
  if (!existsSync(POSTS_DIR)) {
    mkdirSync(POSTS_DIR, { recursive: true })
  }
}

/**
 * Save image file to public/images/blog/
 * Accepts base64-encoded image data and saves to disk
 *
 * @param imageData - Base64-encoded image data
 * @param originalFileName - Original filename for slug generation
 * @returns Public path to image (e.g., "/images/blog/my-image-1705336200.jpg")
 */
export function saveImageFile(imageData: string, originalFileName: string): string {
  ensureDirectoriesExist()

  try {
    // Generate unique filename
    const filename = generateImageFilePath(originalFileName)
    const filePath = path.join(IMAGES_DIR, filename)

    // Convert base64 to buffer and write
    const buffer = Buffer.from(imageData, 'base64')
    writeFileSync(filePath, buffer)

    // Return public path for use in HTML/JSON
    return `/images/blog/${filename}`
  } catch (error) {
    console.error('Error saving image file:', error)
    throw new Error('Failed to save image file')
  }
}

/**
 * Save markdown file to src/data/posts/
 * Creates markdown file with content
 *
 * @param slug - Post slug (used as filename base)
 * @param content - Markdown content
 * @returns Filename reference (e.g., "my-new-post.md")
 */
export function saveMarkdownFile(slug: string, content: string): string {
  ensureDirectoriesExist()

  try {
    const filename = `${slug}.md`
    const filePath = path.join(POSTS_DIR, filename)

    // Write markdown content to file
    writeFileSync(filePath, content, 'utf-8')

    // Return filename reference for blogs.json
    return filename
  } catch (error) {
    console.error('Error saving markdown file:', error)
    throw new Error('Failed to save markdown file')
  }
}

/**
 * Generate public path for image
 * If no custom image provided, returns default image path
 *
 * @param imageData - Base64-encoded image data (optional)
 * @param originalFileName - Original filename (optional)
 * @returns Public image path
 */
export function generateImagePath(
  imageData?: string,
  originalFileName?: string
): string {
  if (!imageData || !originalFileName) {
    // Return default image path
    return '/images/blog/default-blog-image.jpg'
  }

  // Save custom image and return its path
  return saveImageFile(imageData, originalFileName)
}

/**
 * Get full file path for a saved markdown file
 * Used internally for verification
 */
export function getMarkdownFilePath(slug: string): string {
  return path.join(POSTS_DIR, `${slug}.md`)
}

/**
 * Get full directory path for images
 */
export function getImagesDirPath(): string {
  return IMAGES_DIR
}

/**
 * Get full directory path for posts
 */
export function getPostsDirPath(): string {
  return POSTS_DIR
}
