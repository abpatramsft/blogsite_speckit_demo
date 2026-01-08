'use client'

/**
 * FormError Component
 * Displays validation errors with accessible aria-live region
 * Reference: specs/002-blog-uploads - FR-015 (error messages)
 */

interface FormErrorProps {
  message?: string
  fieldName?: string
}

export default function FormError({ message, fieldName }: FormErrorProps) {
  if (!message) {
    return null
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="mt-1 flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm"
    >
      <div className="flex-shrink-0 pt-0.5">
        <svg
          className="h-4 w-4 text-red-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-red-700">{message}</p>
        {fieldName && (
          <p className="text-xs text-red-600 mt-1">Field: {fieldName}</p>
        )}
      </div>
    </div>
  )
}
