import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about BlogSite and our mission to share knowledge about modern web development, design, and technology.',
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About BlogSite
          </h1>
          <p className="text-xl text-gray-600">
            Sharing knowledge about modern web development, one post at a time.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <h2>Our Mission</h2>
          <p>
            BlogSite is dedicated to providing high-quality, practical content for web developers and designers. 
            We believe in making complex topics accessible and helping developers of all skill levels improve their craft.
          </p>

          <h2>What We Cover</h2>
          <p>
            Our articles span a wide range of topics in modern web development:
          </p>
          <ul>
            <li><strong>Frontend Frameworks</strong>: React, Next.js, and the latest JavaScript technologies</li>
            <li><strong>TypeScript</strong>: Best practices, advanced patterns, and type safety</li>
            <li><strong>CSS & Styling</strong>: Tailwind CSS, modern layouts, and responsive design</li>
            <li><strong>Performance</strong>: Optimization techniques, Core Web Vitals, and speed improvements</li>
            <li><strong>Accessibility</strong>: WCAG compliance, inclusive design, and best practices</li>
            <li><strong>SEO</strong>: Technical SEO, metadata, structured data, and search optimization</li>
          </ul>

          <h2>Our Approach</h2>
          <p>
            Every article we publish follows these principles:
          </p>
          <ul>
            <li><strong>Practical</strong>: Real-world examples and production-ready code</li>
            <li><strong>Current</strong>: Up-to-date with the latest technologies and best practices</li>
            <li><strong>Accessible</strong>: Clear explanations suitable for various skill levels</li>
            <li><strong>Comprehensive</strong>: In-depth coverage with proper context</li>
          </ul>

          <h2>About the Author</h2>
          <p>
            Jane Doe is a web developer with a passion for creating fast, accessible, and beautiful web experiences. 
            With years of experience in frontend development, she enjoys sharing knowledge and helping others learn.
          </p>

          <h2>Technical Details</h2>
          <p>
            This blog is built with modern web technologies to practice what we preach:
          </p>
          <ul>
            <li><strong>Next.js 14</strong>: Static site generation for optimal performance</li>
            <li><strong>TypeScript</strong>: Type-safe, maintainable code</li>
            <li><strong>Tailwind CSS</strong>: Mobile-first, responsive design</li>
            <li><strong>Performance</strong>: Optimized images, lazy loading, and fast load times</li>
            <li><strong>Accessibility</strong>: WCAG 2.1 Level AA compliant</li>
          </ul>

          <h2>Get in Touch</h2>
          <p>
            We'd love to hear from you! Whether you have questions, suggestions for topics, or just want to connect:
          </p>
          <ul>
            <li>Leave comments on our blog posts</li>
            <li>Follow us on social media</li>
            <li>Check out our <Link href="/faq" className="text-primary-600 hover:text-primary-700">FAQ page</Link> for common questions</li>
          </ul>

          <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-700 mb-4">
              New posts are published regularly. Browse our <Link href="/blogs" className="text-primary-600 hover:text-primary-700 font-medium">full archive</Link> to explore all articles.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              style={{ minHeight: '44px' }}
            >
              Explore All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
