"use client"

import { useEffect } from "react"


const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {

    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary-dark px-6 text-center">
      <svg
        viewBox="0 0 200 120"
        className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-24 w-72 text-secondary/5"
        fill="currentColor"
      >
        <path d="M0 0 L200 0 L200 60 L180 50 L160 65 L140 48 L120 62 L100 45 L80 60 L60 42 L40 58 L20 44 L0 55 Z" />
      </svg>

      <p className="relative z-10 text-xs font-medium uppercase tracking-widest text-secondary/50">
        Unexpected error
      </p>
      <h1 className="relative z-10 font-display text-3xl md:text-4xl font-bold text-secondary mt-3">
        Something tore loose
      </h1>
      <p className="relative z-10 mt-4 max-w-sm text-sm text-secondary/70 leading-relaxed">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>

      {error.digest && (
        <p className="relative z-10 mt-2 font-mono text-[11px] text-secondary/30">
          Error ID: {error.digest}
        </p>
      )}

      <button
        onClick={() => reset()}
        className="relative z-10 mt-8 rounded-full bg-secondary px-7 py-2.5 text-sm font-medium text-primary-dark hover:bg-white transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default GlobalError
