export default function BlogPostLoading() {
  return (
    <article className="bg-white">
      {/* Header Skeleton */}
      <header className="relative">
        <div className="aspect-[21/9] max-h-[500px] bg-gray-200 animate-pulse"></div>
      </header>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Meta Information Skeleton */}
        <div className="flex gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Article Body Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          <div className="h-8 w-full my-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </article>
  )
}
