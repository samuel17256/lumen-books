
const GlobalLoading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-secondary">
      <div className="relative h-14 w-10">
        <div className="absolute inset-0 rounded-sm bg-primary-dark animate-pulse" />
        <div className="absolute left-1 top-1 right-1 bottom-1 rounded-[1px] bg-secondary opacity-90" />
      </div>
      <p className="font-display text-sm font-medium tracking-wide text-primary-dark/60">
        Lumen Books
      </p>
    </div>
  )
}

export default GlobalLoading
