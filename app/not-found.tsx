import Link from "next/link"



const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6 text-center">
      <svg
        viewBox="0 0 120 90"
        className="h-20 w-28 text-primary/30 mb-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 20 C30 12, 50 12, 60 20 L60 75 C50 67, 30 67, 10 75 Z" />
        <path d="M110 20 C90 12, 70 12, 60 20 L60 75 C70 67, 90 67, 110 75 Z" />
        <path d="M30 30 L45 30 M30 40 L45 40 M75 30 L90 30 M75 40 L90 40" opacity="0.5" />
      </svg>
      <p className="text-xs font-medium uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mt-2">
        That page isn&apos;t on the shelf
      </h1>
      <p className="mt-3 max-w-sm text-sm text-primary-dark/60 leading-relaxed">
        The book or page you&apos;re looking for might have been moved,
        renamed, or never existed in the first place.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/books"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-medium text-secondary hover:bg-primary transition-colors"
        >
          Browse all books
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-primary-dark/60 hover:text-primary-dark"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
