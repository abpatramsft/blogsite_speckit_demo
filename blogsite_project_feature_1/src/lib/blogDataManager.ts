/**
 * Blog Data Manager
 * Reference: specs/002-blog-uploads/data-model.md - Persistence Model
 * Handles reading/writing to blogs.json and blog post management
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { BlogPost, BlogPostCollection } from '@/types/blog'

const BLOGS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'blogs.json')
const DATA_DIR = path.join(process.cwd(), 'src', 'data')

/**
 * Create data directory if it doesn't exist
 */
function ensureDataDirExists(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

/**
 * Read blogs.json and parse blog post collection
 * Returns BlogPostCollection or empty collection if file doesn't exist
 */
export function readBlogsJson(): BlogPostCollection {
  ensureDataDirExists()

  try {
    if (!existsSync(BLOGS_JSON_PATH)) {
      // Create default empty collection
      return {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        posts: [],
      }
    }

    const content = readFileSync(BLOGS_JSON_PATH, 'utf-8')
    return JSON.parse(content) as BlogPostCollection
  } catch (error) {
    console.error('Error reading blogs.json:', error)
    throw new Error('Failed to read blogs.json')
  }
}

/**
 * Write blog collection back to blogs.json
 * Updates lastUpdated timestamp
 */
export function writeBlogsJson(collection: BlogPostCollection): void {
  ensureDataDirExists()

  try {
    // Update lastUpdated timestamp
    const updated: BlogPostCollection = {
      ...collection,
      lastUpdated: new Date().toISOString(),
    }

    const content = JSON.stringify(updated, null, 2)
    writeFileSync(BLOGS_JSON_PATH, content, 'utf-8')
  } catch (error) {
    console.error('Error writing blogs.json:', error)
    throw new Error('Failed to write blogs.json')
  }
}

/**
 * Get next sequential ID for new blog post
 * Parses existing IDs and returns next number as string
 * Returns "1" if no posts exist yet
 */
export function getNextBlogId(): string {
  try {
    const collection = readBlogsJson()

    if (collection.posts.length === 0) {
      return '1'
    }

    // Find max ID (assuming numeric string IDs)
    const numericIds = collection.posts
      .map((post) => parseInt(post.id, 10))
      .filter((id) => !isNaN(id))

    if (numericIds.length === 0) {
      return '1'
    }

    const maxId = Math.max(...numericIds)
    return (maxId + 1).toString()
  } catch (error) {
    console.error('Error getting next blog ID:', error)
    throw new Error('Failed to determine next blog ID')
  }
}

/**
 * Add new blog post entry to blogs.json
 * Validates BlogPost against schema before adding
 *
 * @throws Error if validation fails or file write fails
 */
export function addBlogEntry(post: BlogPost): void {
  try {
    // Validate post against schema
    validateBlogPostSchema(post)

    // Read existing collection
    const collection = readBlogsJson()

    // Check for ID collision
    if (collection.posts.some((p) => p.id === post.id)) {
      throw new Error(`Blog post with ID "${post.id}" already exists`)
    }

    // Check for slug collision
    if (collection.posts.some((p) => p.slug === post.slug)) {
      throw new Error(`Blog post with slug "${post.slug}" already exists`)
    }

    // Add new post
    collection.posts.push(post)

    // Sort posts by ID descending (newest first) - optional, remove if not desired
    collection.posts.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10))

    // Write back to file
    writeBlogsJson(collection)
  } catch (error) {
    console.error('Error adding blog entry:', error)
    throw error
  }
}

/**
 * Validate BlogPost against required schema
 * Ensures all 11 required properties are present and valid types
 *
 * @throws Error with validation details if invalid
 */
export function validateBlogPostSchema(post: BlogPost): void {
  const errors: string[] = []

  // Check required properties
  if (!post.id || typeof post.id !== 'string') {
    errors.push('id: required string')
  }
  if (!post.slug || typeof post.slug !== 'string') {
    errors.push('slug: required string')
  }
  if (!post.title || typeof post.title !== 'string') {
    errors.push('title: required string')
  }
  if (!post.author || typeof post.author !== 'string') {
    errors.push('author: required string')
  }
  if (!post.publishedDate || typeof post.publishedDate !== 'string') {
    errors.push('publishedDate: required string (ISO 8601)')
  }
  if (!post.excerpt || typeof post.excerpt !== 'string') {
    errors.push('excerpt: required string')
  }
  if (!post.featuredImage || typeof post.featuredImage !== 'string') {
    errors.push('featuredImage: required string (path)')
  }
  if (!post.featuredImageAlt || typeof post.featuredImageAlt !== 'string') {
    errors.push('featuredImageAlt: required string')
  }
  if (!post.content || typeof post.content !== 'string') {
    errors.push('content: required string (markdown filename)')
  }
  if (!Array.isArray(post.tags) || post.tags.length === 0) {
    errors.push('tags: required string array (at least 1 tag)')
  }
  if (typeof post.readingTimeMinutes !== 'number' || post.readingTimeMinutes < 1) {
    errors.push('readingTimeMinutes: required number (1-60)')
  }

  // Check property constraints
  if (post.title && post.title.length > 200) {
    errors.push('title: must be ≤200 characters')
  }
  if (post.author && post.author.length > 100) {
    errors.push('author: must be ≤100 characters')
  }
  if (post.excerpt && (post.excerpt.length < 100 || post.excerpt.length > 500)) {
    errors.push('excerpt: must be 100-500 characters')
  }
  if (post.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    errors.push('slug: must be URL-safe (lowercase alphanumeric with hyphens)')
  }
  if (post.slug && post.slug.length > 100) {
    errors.push('slug: must be ≤100 characters')
  }
  if (post.readingTimeMinutes && (post.readingTimeMinutes < 1 || post.readingTimeMinutes > 60)) {
    errors.push('readingTimeMinutes: must be 1-60')
  }

  if (errors.length > 0) {
    throw new Error(`Blog post validation failed:\n${errors.join('\n')}`)
  }
}

/**
 * Get blog post by slug
 * Useful for verifying post was created correctly
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  try {
    const collection = readBlogsJson()
    return collection.posts.find((post) => post.slug === slug)
  } catch (error) {
    console.error('Error getting blog post by slug:', error)
    return undefined
  }
}

/**
 * Get blog post by ID
 */
export function getBlogPostById(id: string): BlogPost | undefined {
  try {
    const collection = readBlogsJson()
    return collection.posts.find((post) => post.id === id)
  } catch (error) {
    console.error('Error getting blog post by ID:', error)
    return undefined
  }
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  try {
    const collection = readBlogsJson()
    return collection.posts
  } catch (error) {
    console.error('Error getting all blog posts:', error)
    return []
  }
}
