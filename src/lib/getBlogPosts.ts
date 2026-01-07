import fs from 'fs'
import path from 'path'
import { BlogPost, BlogPostCollection } from '@/types/blog'

const blogsDataPath = path.join(process.cwd(), 'src/data/blogs.json')

export function getAllBlogPosts(): BlogPost[] {
  const fileContents = fs.readFileSync(blogsDataPath, 'utf8')
  const data: BlogPostCollection = JSON.parse(fileContents)
  
  // Sort by publishedDate descending (newest first)
  return data.posts.sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  })
}

export function getLatestBlogPost(): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.length > 0 ? posts[0] : null
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}
