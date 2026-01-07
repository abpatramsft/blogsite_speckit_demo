export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary-600 mb-4"></div>
        
        {/* Loading Text */}
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
