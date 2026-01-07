'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { formatDateShort } from '@/lib/formatDate'
import { useState } from 'react'

interface BlogCardProps {
  post: BlogPost
  priority?: boolean
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden">
        {!imageError ? (
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            priority={priority}
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-50"
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
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <time dateTime={post.publishedDate}>{formatDateShort(post.publishedDate)}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTimeMinutes} min</span>
          </div>
        </div>
      </div>
    </article>
  )
}
