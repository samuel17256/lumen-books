import Image from "next/image"
import Link from "next/link"
import { getBooks } from "@/lib/data"

const BooksPage = async () => {

    const allBooks = await getBooks()


  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 max-w-xl">
        <p className="text-xs uppercase tracking-wide text-primary font-medium">
          Our Catalog
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mt-2">
          A Glimpse into my Recent Work
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-10">
        {allBooks.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.slug}`}
            className="group block bg-white rounded-lg"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-primary/10 shadow-sm">
              <Image
                src={book.coverImageUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="px-2 py-2">
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
            </div>
          </Link>
        ))}

        {allBooks.length === 0 && (
          <p className="col-span-full text-sm text-primary-dark/50">
            No books to show yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default BooksPage;