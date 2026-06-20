"use client"

import Image from "next/image"
import Link from "next/link"
import { Book } from "@/types"

const BestsellerCarousel = ({ books }: { books: Book[] }) => {
  const track = [...books, ...books]

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-secondary to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-secondary to-transparent z-10" />

      <div className="group overflow-hidden">
        <div className="flex w-max gap-6 px-6 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((book, i) => (
            <Link
              key={`${book.id}-${i}`}
              href={`/books/${book.slug}`}
              className="w-40 shrink-0"
            >
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-primary/10 shadow-sm">
                <Image
                  src={book.coverImageUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-full bg-primary-dark/90 px-2 py-0.5 text-[10px] font-medium text-secondary">
                  #{(i % books.length) + 1}
                </span>
              </div>

              <h3 className="mt-3 font-display font-semibold text-sm text-primary-dark leading-snug line-clamp-1">
                {book.title}
              </h3>
              <p className="text-xs text-primary-dark/60">{book.author}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  ${book.price.toFixed(2)}
                </span>
                <span className="text-[11px] text-primary-dark/40">
                  {book.ratingsAverage.toFixed(1)}★
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestsellerCarousel;