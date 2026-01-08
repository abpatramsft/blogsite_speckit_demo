'use client'

/**
 * ContentEditor Component
 * Allows users to type or upload Markdown content
 * Reference: specs/002-blog-uploads - US4 (content input)
 */

import { ChangeEvent, useState } from 'react'
import FormError from './FormError'

interface ContentEditorProps {
  contentMode: 'typed' | 'uploaded'
  onModeChange: (mode: 'typed' | 'uploaded') => void
  contentText: string
  onContentTextChange: (text: string) => void
  contentFile?: File
  onContentFileChange: (file?: File) => void
  error?: string
}

export default function ContentEditor({
  contentMode,
  onModeChange,
  contentText,
  onContentTextChange,
  contentFile,
  onContentFileChange,
  error,
}: ContentEditorProps) {
  const [uploadedFileName, setUploadedFileName] = useState<string>('')

  const handleModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.value as 'typed' | 'uploaded'
    onModeChange(mode)
    // Clear the non-active mode's data
    if (mode === 'typed') {
      onContentFileChange(undefined)
      setUploadedFileName('')
    } else {
      onContentTextChange('')
    }
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentTextChange(e.target.value)
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      onContentFileChange(undefined)
      setUploadedFileName('')
      return
    }

    // Validate file type
    if (!file.name.endsWith('.md')) {
      // Show error but still set the file
      setUploadedFileName(file.name)
      onContentFileChange(file)
      return
    }

    // Read file content for preview
    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      onContentTextChange(content)
    }
    reader.readAsText(file)

    setUploadedFileName(file.name)
    onContentFileChange(file)
  }

  return (
    <div className="space-y-4">
      {/* Mode Selection */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-gray-900">
          Blog Content
        </legend>

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="contentMode-typed"
            name="contentMode"
            value="typed"
            checked={contentMode === 'typed'}
            onChange={handleModeChange}
            className="h-4 w-4 border-gray-300 text-primary-600"
          />
          <label htmlFor="contentMode-typed" className="text-sm text-gray-700">
            Type Content
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="contentMode-uploaded"
            name="contentMode"
            value="uploaded"
            checked={contentMode === 'uploaded'}
            onChange={handleModeChange}
            className="h-4 w-4 border-gray-300 text-primary-600"
          />
          <label htmlFor="contentMode-uploaded" className="text-sm text-gray-700">
            Upload Markdown File
          </label>
        </div>
      </fieldset>

      {/* Typed Content Mode */}
      {contentMode === 'typed' && (
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-900">
            Content (Markdown)
            <span className="text-gray-500 font-normal ml-1">(min 50 characters)</span>
          </label>
          <textarea
            id="content"
            value={contentText}
            onChange={handleTextChange}
            placeholder="Enter your blog post content in Markdown format...&#10;&#10;You can use:&#10;# Headings&#10;**Bold text**&#10;- Lists&#10;[Links](url)&#10;`code`&#10;```code blocks```"
            rows={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            aria-describedby={error ? 'contentError' : undefined}
          />
          <p className="text-xs text-gray-500">
            {contentText.length} characters {contentText.length < 50 && `(${50 - contentText.length} more needed)`}
          </p>
        </div>
      )}

      {/* Upload Mode */}
      {contentMode === 'uploaded' && (
        <div className="space-y-2">
          <label htmlFor="contentFile" className="block text-sm font-medium text-gray-900">
            Markdown File
            <span className="text-gray-500 font-normal ml-1">(.md format)</span>
          </label>
          <input
            type="file"
            id="contentFile"
            accept=".md,text/markdown,text/plain"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            aria-describedby={error ? 'contentError' : undefined}
          />
          {uploadedFileName && (
            <p className="text-xs text-gray-500">
              Selected file: {uploadedFileName}
            </p>
          )}
          {contentFile && contentText && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">Preview:</p>
              <pre className="text-xs text-gray-600 overflow-auto max-h-24 whitespace-pre-wrap break-words">
                {contentText.slice(0, 300)}
                {contentText.length > 300 && '...'}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && <FormError message={error} fieldName="content" />}
    </div>
  )
}
