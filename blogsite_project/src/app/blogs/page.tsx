import { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllBlogPosts, getAllTags } from '@/lib/getBlogPosts'

export const metadata: Metadata = {
  title: 'All Blog Posts',
  description: 'Browse all articles on web development, design, and technology. Learn about Next.js, TypeScript, CSS, performance, accessibility, and more.',
}

export default function BlogsPage() {
  const posts = getAllBlogPosts()
  const tags = getAllTags()

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            All Blog Posts
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Explore {posts.length} articles covering web development, design, and technology topics.
          </p>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 self-center mr-2">Filter by tag:</span>
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                style={{ minHeight: '32px' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
