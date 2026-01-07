import { Metadata } from 'next'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getLatestBlogPost, getAllBlogPosts } from '@/lib/getBlogPosts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Explore the latest in web development, design, and technology. Learn about Next.js, TypeScript, CSS, and more.',
}

export default function HomePage() {
  const latestPost = getLatestBlogPost()
  const allPosts = getAllBlogPosts()
  const recentPosts = allPosts.slice(1, 4) // Get 3 recent posts after the latest

  if (!latestPost) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">No blog posts available yet.</p>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section with Latest Post */}
      <Hero post={latestPost} />

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-white" aria-labelledby="recent-posts-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 id="recent-posts-heading" className="text-3xl font-bold text-gray-900">
                Recent Posts
              </h2>
              <Link
                href="/blogs"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors"
              >
                View All
                <svg
                  className="ml-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {recentPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary-600 to-primary-700" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Post
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles on web development, design, and technology delivered straight to you.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-primary-600 bg-white hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            style={{ minHeight: '44px' }}
          >
            Browse All Articles
          </Link>
        </div>
      </section>
    </>
  )
}
