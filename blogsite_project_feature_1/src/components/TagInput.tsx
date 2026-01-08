'use client'

/**
 * TagInput Component
 * Handles comma-separated tag input with real-time parsing display
 * Reference: specs/002-blog-uploads - US5 (tag management)
 */

import { ChangeEvent } from 'react'
import FormError from './FormError'

interface TagInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function TagInput({ value, onChange, error }: TagInputProps) {
  // Parse comma-separated tags, trim whitespace, filter empty
  const parsedTags = value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="space-y-2">
      <label htmlFor="tags" className="block text-sm font-medium text-gray-900">
        Tags
        <span className="text-gray-500 font-normal ml-1">
          (comma-separated, e.g., "React, TypeScript, Web Dev")
        </span>
      </label>

      <textarea
        id="tags"
        value={value}
        onChange={handleChange}
        placeholder="Enter tags separated by commas..."
        rows={2}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        aria-describedby={error ? 'tagsError' : undefined}
      />

      {/* Display parsed tags as pills */}
      {parsedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {parsedTags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
            >
              {tag}
              {tag.length > 50 && (
                <span className="text-xs text-primary-600" title="Tag exceeds 50 character limit">
                  ⚠
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Tag count info */}
      {parsedTags.length > 0 && (
        <p className="text-xs text-gray-500">
          {parsedTags.length} tag{parsedTags.length !== 1 ? 's' : ''} will be added
        </p>
      )}

      {/* Error Message */}
      {error && <FormError message={error} fieldName="tags" />}
    </div>
  )
}
