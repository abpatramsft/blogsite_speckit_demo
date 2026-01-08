'use client'

/**
 * BlogUploadForm Component
 * Main form for uploading and publishing blog posts
 * Reference: specs/002-blog-uploads - US1-US7
 */

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  initialUploadFormState,
  UploadFormState,
  UploadFormSubmission,
  UploadResponse,
} from '@/types/upload'
import {
  validateAllFields,
  errorsToFieldMap,
} from '@/lib/uploadValidation'
import FormError from './FormError'
import ImageUploadInput from './ImageUploadInput'
import TagInput from './TagInput'
import ContentEditor from './ContentEditor'

export default function BlogUploadForm() {
  const router = useRouter()
  const [formState, setFormState] = useState<UploadFormState>(
    initialUploadFormState
  )
  const [successMessage, setSuccessMessage] = useState('')
  const [successSlug, setSuccessSlug] = useState('')

  // Handle text input changes
  const handleTextChange = (field: keyof UploadFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      fieldErrors: {
        ...prev.fieldErrors,
        [field]: '', // Clear error when user edits field
      },
    }))
  }

  // Handle image mode/file changes
  const handleImageModeChange = (mode: 'default' | 'uploaded') => {
    setFormState((prev) => ({
      ...prev,
      imageMode: mode,
      fieldErrors: {
        ...prev.fieldErrors,
        image: '',
      },
    }))
  }

  const handleImageFileChange = (file?: File) => {
    setFormState((prev) => ({
      ...prev,
      imageFile: file,
      fieldErrors: {
        ...prev.fieldErrors,
        image: '',
      },
    }))
  }

  const handleImagePreviewChange = (url?: string) => {
    setFormState((prev) => ({
      ...prev,
      imagePreviewUrl: url,
    }))
  }

  // Handle content mode/file changes
  const handleContentModeChange = (mode: 'typed' | 'uploaded') => {
    setFormState((prev) => ({
      ...prev,
      contentMode: mode,
      fieldErrors: {
        ...prev.fieldErrors,
        content: '',
      },
    }))
  }

  const handleContentTextChange = (text: string) => {
    setFormState((prev) => ({
      ...prev,
      contentText: text,
      fieldErrors: {
        ...prev.fieldErrors,
        content: '',
      },
    }))
  }

  const handleContentFileChange = (file?: File) => {
    setFormState((prev) => ({
      ...prev,
      contentFile: file,
      fieldErrors: {
        ...prev.fieldErrors,
        content: '',
      },
    }))
  }

  // Handle tags input change
  const handleTagsChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      tagsInput: value,
      fieldErrors: {
        ...prev.fieldErrors,
        tags: '',
      },
    }))
  }

  // Convert image file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const errors = validateAllFields({
      title: formState.title,
      author: formState.author,
      excerpt: formState.excerpt,
      content: formState.contentText,
      tagsInput: formState.tagsInput,
      readingTimeMinutes: formState.readingTimeMinutes,
      imageFile: formState.imageMode === 'uploaded' ? formState.imageFile : undefined,
    })

    if (errors.length > 0) {
      setFormState((prev) => ({
        ...prev,
        fieldErrors: errorsToFieldMap(errors),
      }))
      return
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      submitError: '',
    }))

    try {
      // Prepare form submission payload
      const payload: UploadFormSubmission = {
        title: formState.title,
        author: formState.author,
        excerpt: formState.excerpt,
        tagsInput: formState.tagsInput,
        readingTimeMinutes: Number(formState.readingTimeMinutes),
        contentMode: formState.contentMode,
        content:
          formState.contentMode === 'typed' ? formState.contentText : '',
        imageMode: formState.imageMode,
      }

      // Add image data if uploading custom image
      if (formState.imageMode === 'uploaded' && formState.imageFile) {
        const base64 = await fileToBase64(formState.imageFile)
        payload.image = {
          data: base64,
          mimeType: formState.imageFile.type,
          originalFileName: formState.imageFile.name,
          size: formState.imageFile.size,
        }
      }

      // Submit to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result: UploadResponse = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          'success' in result && !result.success
            ? result.message
            : 'Failed to upload blog post'
        )
      }

      // Success!
      if ('slug' in result) {
        setSuccessSlug(result.slug)
        setSuccessMessage(result.message)

        // Reset form
        setFormState(initialUploadFormState)

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push(`/blog/${result.slug}`)
        }, 2000)
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        submitError:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }))
    } finally {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }))
    }
  }

  // Show success message if available
  if (successMessage) {
    return (
      <div className="rounded-lg bg-green-50 p-6 border border-green-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-0.5">
            <svg
              className="h-6 w-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-green-900">
              {successMessage}
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm text-green-800">
                Redirecting to your new post in 2 seconds...
              </p>
              <a
                href={`/blog/${successSlug}`}
                className="inline-block text-sm font-medium text-green-700 hover:text-green-600 underline"
              >
                View Published Post
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Submit Error */}
      {formState.submitError && (
        <FormError message={formState.submitError} />
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
          Title
          <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formState.title}
          onChange={(e) => handleTextChange('title', e.target.value)}
          placeholder="Enter blog post title..."
          maxLength={200}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={
            formState.fieldErrors.title ? 'titleError' : undefined
          }
        />
        {formState.fieldErrors.title && (
          <FormError message={formState.fieldErrors.title} fieldName="title" />
        )}
        <p className="mt-1 text-xs text-gray-500">
          {formState.title.length}/200 characters
        </p>
      </div>

      {/* Author */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-900">
          Author
          <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          type="text"
          id="author"
          value={formState.author}
          onChange={(e) => handleTextChange('author', e.target.value)}
          placeholder="Enter author name..."
          maxLength={100}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={
            formState.fieldErrors.author ? 'authorError' : undefined
          }
        />
        {formState.fieldErrors.author && (
          <FormError message={formState.fieldErrors.author} fieldName="author" />
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-900">
          Excerpt
          <span className="text-red-600 ml-1">*</span>
          <span className="text-gray-500 font-normal ml-1">(100-500 characters)</span>
        </label>
        <textarea
          id="excerpt"
          value={formState.excerpt}
          onChange={(e) => handleTextChange('excerpt', e.target.value)}
          placeholder="Enter a short preview of your post..."
          rows={3}
          maxLength={500}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={
            formState.fieldErrors.excerpt ? 'excerptError' : undefined
          }
        />
        {formState.fieldErrors.excerpt && (
          <FormError
            message={formState.fieldErrors.excerpt}
            fieldName="excerpt"
          />
        )}
        <p className="mt-1 text-xs text-gray-500">
          {formState.excerpt.length}/500 characters
        </p>
      </div>

      {/* Image Upload */}
      <ImageUploadInput
        imageMode={formState.imageMode}
        onModeChange={handleImageModeChange}
        imageFile={formState.imageFile}
        onImageChange={handleImageFileChange}
        previewUrl={formState.imagePreviewUrl}
        onPreviewChange={handleImagePreviewChange}
        error={formState.fieldErrors.image}
      />

      {/* Content Editor */}
      <ContentEditor
        contentMode={formState.contentMode}
        onModeChange={handleContentModeChange}
        contentText={formState.contentText}
        onContentTextChange={handleContentTextChange}
        contentFile={formState.contentFile}
        onContentFileChange={handleContentFileChange}
        error={formState.fieldErrors.content}
      />

      {/* Tags */}
      <TagInput
        value={formState.tagsInput}
        onChange={handleTagsChange}
        error={formState.fieldErrors.tags}
      />

      {/* Reading Time */}
      <div>
        <label
          htmlFor="readingTime"
          className="block text-sm font-medium text-gray-900"
        >
          Reading Time (minutes)
          <span className="text-red-600 ml-1">*</span>
          <span className="text-gray-500 font-normal ml-1">(1-60)</span>
        </label>
        <input
          type="number"
          id="readingTime"
          value={formState.readingTimeMinutes}
          onChange={(e) =>
            handleTextChange('readingTimeMinutes', e.target.value)
          }
          placeholder="5"
          min="1"
          max="60"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={
            formState.fieldErrors.readingTimeMinutes
              ? 'readingTimeError'
              : undefined
          }
        />
        {formState.fieldErrors.readingTimeMinutes && (
          <FormError
            message={formState.fieldErrors.readingTimeMinutes}
            fieldName="readingTimeMinutes"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {formState.isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Publishing...
            </>
          ) : (
            'Publish Post'
          )}
        </button>
      </div>

      {/* Required fields note */}
      <p className="text-xs text-gray-500">
        <span className="text-red-600">*</span> Required fields
      </p>
    </form>
  )
}
