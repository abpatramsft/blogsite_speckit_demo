/**
 * Upload Page (Server Component)
 * Displays blog upload form interface
 * Reference: specs/002-blog-uploads/plan.md - Project Structure
 */

import BlogUploadForm from '@/components/BlogUploadForm'

export const metadata = {
  title: 'Upload Blog Post',
  description: 'Create and publish a new blog post',
}

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Upload New Blog Post
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Share your thoughts with the world. Fill in the form below to publish a new post.
        </p>
      </div>

      {/* Form Container */}
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200">
          <BlogUploadForm />
        </div>
      </div>

      {/* Help Text */}
      <div className="mx-auto max-w-4xl mt-8">
        <div className="rounded-lg bg-blue-50 p-6 border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Fill in all required fields</li>
            <li>Your excerpt should be 100-500 characters</li>
            <li>Featured image is optional (we'll use a default if not provided)</li>
            <li>Upload Markdown files or type your content directly</li>
            <li>Add tags as comma-separated values</li>
            <li>Your post will be published immediately after submission</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
