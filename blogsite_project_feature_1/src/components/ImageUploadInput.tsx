'use client'

/**
 * ImageUploadInput Component
 * Handles featured image upload with preview and default fallback
 * Reference: specs/002-blog-uploads - US2 (optional image)
 */

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { validateImageFile } from '@/lib/uploadValidation'
import FormError from './FormError'

interface ImageUploadInputProps {
  imageMode: 'default' | 'uploaded'
  onModeChange: (mode: 'default' | 'uploaded') => void
  imageFile?: File
  onImageChange: (file?: File) => void
  previewUrl?: string
  onPreviewChange: (url?: string) => void
  error?: string
}

export default function ImageUploadInput({
  imageMode,
  onModeChange,
  imageFile,
  onImageChange,
  previewUrl,
  onPreviewChange,
  error,
}: ImageUploadInputProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.value as 'default' | 'uploaded'
    onModeChange(mode)
    if (mode === 'default') {
      onImageChange(undefined)
      onPreviewChange(undefined)
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      onImageChange(undefined)
      onPreviewChange(undefined)
      return
    }

    // Validate file
    const validationError = validateImageFile(file)
    if (validationError) {
      // Error will be displayed, but we still need to set the file
      // so error handler can work with it
      onImageChange(file)
      return
    }

    // Create preview
    setIsLoading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      onPreviewChange(reader.result as string)
      setIsLoading(false)
    }
    reader.readAsDataURL(file)

    onImageChange(file)
  }

  return (
    <div className="space-y-4">
      {/* Mode Selection */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-gray-900">
          Featured Image
        </legend>

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="imageMode-default"
            name="imageMode"
            value="default"
            checked={imageMode === 'default'}
            onChange={handleModeChange}
            className="h-4 w-4 border-gray-300 text-primary-600"
          />
          <label htmlFor="imageMode-default" className="text-sm text-gray-700">
            Use Default Image
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="imageMode-uploaded"
            name="imageMode"
            value="uploaded"
            checked={imageMode === 'uploaded'}
            onChange={handleModeChange}
            className="h-4 w-4 border-gray-300 text-primary-600"
          />
          <label htmlFor="imageMode-uploaded" className="text-sm text-gray-700">
            Upload Custom Image
          </label>
        </div>
      </fieldset>

      {/* File Input (shown when 'uploaded' mode selected) */}
      {imageMode === 'uploaded' && (
        <div className="space-y-2">
          <label
            htmlFor="imageFile"
            className="block text-sm font-medium text-gray-700"
          >
            Image File
            <span className="text-gray-500 font-normal ml-1">(JPEG, PNG, or WebP, max 3 MB)</span>
          </label>
          <input
            type="file"
            id="imageFile"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            aria-describedby={error ? 'imageError' : undefined}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <FormError message={error} fieldName="image" />
      )}

      {/* Preview */}
      {imageMode === 'default' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Default Image Preview:</p>
          <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-lg bg-gray-100">
            <Image
              src="/images/blog/default-blog-image.jpg"
              alt="Default blog featured image"
              fill
              className="object-cover"
              sizes="(max-width: 384px) 100vw, 384px"
            />
          </div>
        </div>
      )}

      {imageMode === 'uploaded' && previewUrl && !isLoading && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Image Preview:</p>
          <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={previewUrl}
              alt="Uploaded featured image preview"
              fill
              className="object-cover"
              sizes="(max-width: 384px) 100vw, 384px"
            />
          </div>
          {imageFile && (
            <p className="text-xs text-gray-500">
              File: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Loading preview...</p>
        </div>
      )}
    </div>
  )
}
