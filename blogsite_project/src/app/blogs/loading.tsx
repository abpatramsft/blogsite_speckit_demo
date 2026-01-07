export default function BlogsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-10 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>

      {/* Tag Filter Skeleton */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>

      {/* Blog Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Image Skeleton */}
            <div className="aspect-[16/9] bg-gray-200 animate-pulse"></div>
            
            {/* Content Skeleton */}
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-7 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
