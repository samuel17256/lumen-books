const RecommendedForYouSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-2/3 w-full rounded-lg bg-primary/10" />
          <div className="mt-3 h-3 w-3/4 rounded bg-primary/10" />
          <div className="mt-2 h-3 w-1/2 rounded bg-primary/10" />
          <div className="mt-2 h-3 w-1/4 rounded bg-primary/10" />
        </div>
      ))}
    </div>
  )
}

export default RecommendedForYouSkeleton