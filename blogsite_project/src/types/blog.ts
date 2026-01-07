export interface BlogPost {
  id: string
  slug: string
  title: string
  author: string
  publishedDate: string
  excerpt: string
  featuredImage: string
  featuredImageAlt: string
  content: string
  tags: string[]
  readingTimeMinutes: number
}

export interface BlogPostCollection {
  version: string
  lastUpdated: string
  posts: BlogPost[]
}
