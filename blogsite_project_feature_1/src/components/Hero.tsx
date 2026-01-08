'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { formatDate } from '@/lib/formatDate'
import { useState } from 'react'

interface HeroProps {
  post: BlogPost
}

export default function Hero({ post }: HeroProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-12 md:py-20" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                Latest Post
              </span>
            </div>
            <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
              <span className="mx-2">•</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              style={{ minHeight: '44px' }}
            >
              Read Full Article
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Featured Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
              {!imageError ? (
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-white opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
