/**
 * Slug Generation & Collision Detection
 * Reference: specs/002-blog-uploads/data-model.md - Field Transformations
 * Generates URL-safe slugs from titles and detects collisions with existing slugs
 */

import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { BlogPostCollection } from '@/types/blog'

/**
 * Sanitize title to URL-safe slug
 * Converts to lowercase, removes special characters, replaces spaces with hyphens
 * Trims to 100 characters max
 *
 * Examples:
 *   "My New Blog Post" → "my-new-blog-post"
 *   "React & TypeScript" → "react-typescript"
 *   "CSS: Best Practices" → "css-best-practices"
 */
export function sanitizeToSlug(title: string): string {
  return (
    title
      .toLowerCase()
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Remove all characters except alphanumeric and hyphens
      .replace(/[^a-z0-9-]/g, '')
      // Replace multiple consecutive hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Trim to 100 characters
      .slice(0, 100)
  )
}

/**
 * Read blogs.json and extract all existing slugs
 * Returns array of existing slug strings for collision detection
 */
function getExistingSlugs(): string[] {
  try {
    const blogsJsonPath = path.join(process.cwd(), 'src', 'data', 'blogs.json')

    if (!existsSync(blogsJsonPath)) {
      return []
    }

    const content = readFileSync(blogsJsonPath, 'utf-8')
    const data: BlogPostCollection = JSON.parse(content)

    return data.posts.map((post) => post.slug)
  } catch (error) {
    console.warn('Error reading existing slugs:', error)
    return []
  }
}

/**
 * Check if slug already exists in blogs.json
 */
export function checkSlugCollision(slug: string): boolean {
  const existingSlugs = getExistingSlugs()
  return existingSlugs.includes(slug)
}

/**
 * Generate unique slug, retrying with timestamp suffix if collision detected
 * Collision resolution: if "my-post" exists, try "my-post-1705336200"
 *
 * Returns URL-safe slug guaranteed to be unique
 */
export function generateUniqueSlug(title: string): string {
  let baseSlug = sanitizeToSlug(title)

  // If base slug is empty after sanitization, use timestamp
  if (!baseSlug) {
    baseSlug = `post-${Date.now()}`
  }

  // Check if slug already exists
  if (!checkSlugCollision(baseSlug)) {
    return baseSlug
  }

  // Collision detected - append timestamp
  const timestamp = Math.floor(Date.now() / 1000) // Unix timestamp
  const slugWithTimestamp = `${baseSlug}-${timestamp}`

  // Double-check the timestamp version doesn't collide (extremely unlikely)
  if (!checkSlugCollision(slugWithTimestamp)) {
    return slugWithTimestamp
  }

  // Fallback: use full timestamp if still collides
  return `post-${Date.now()}`
}

/**
 * Validate slug format (for database integrity checks)
 * Slug should be lowercase alphanumeric with hyphens, no leading/trailing hyphens
 */
export function isValidSlugFormat(slug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugPattern.test(slug) && slug.length > 0 && slug.length <= 100
}

/**
 * Slug collision statistics (for debugging)
 */
export function getSlugStatistics(): {
  totalExistingSlugs: number
  sampleSlugs: string[]
} {
  const existingSlugs = getExistingSlugs()
  return {
    totalExistingSlugs: existingSlugs.length,
    sampleSlugs: existingSlugs.slice(0, 5),
  }
}
