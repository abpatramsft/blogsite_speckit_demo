import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Heading */}
        <h1 className="text-8xl md:text-9xl font-bold text-primary-600 mb-4">
          404
        </h1>
        
        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm"
            style={{ minWidth: '160px', minHeight: '44px' }}
          >
            Go to Homepage
          </Link>
          
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-600 bg-white hover:bg-gray-50 rounded-lg transition-colors border-2 border-primary-600"
            style={{ minWidth: '160px', minHeight: '44px' }}
          >
            Browse Blogs
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">You might be interested in:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              About Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/faq"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              FAQ
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/blogs"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
