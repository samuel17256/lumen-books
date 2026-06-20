import Image from "next/image"
import Link from "next/link"
import { getRecommendedBooks } from "@/lib/data"

const RecommendedForYou = async ({ bookId }: { bookId: string }) => {
  const books = await getRecommendedBooks(bookId)

  if (books.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {books.map((book) => (
        <Link key={book.id} href={`/books/${book.slug}`} className="group block">
          <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-primary/10 shadow-sm">
            <Image
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="mt-3 font-display font-semibold text-sm text-primary-dark leading-snug line-clamp-1">
            {book.title}
          </h3>
          <p className="text-xs text-primary-dark/60">{book.author}</p>
          <p className="mt-1 text-sm font-medium text-primary">
            ${book.price.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default RecommendedForYou