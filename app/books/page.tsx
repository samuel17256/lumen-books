import Image from "next/image"
import Link from "next/link"
import { getBooks,searchBooks } from "@/lib/data"
import {SearchParams} from "@/types"

export const dynamic = "force-dynamic"

const BooksPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const { category, sort, q } = await searchParams

  const allBooks = await getBooks()


  let books = q ? await searchBooks(q) : allBooks

  if (category) {
    books = books.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (sort === "price-asc") {
    books = [...books].sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    books = [...books].sort((a, b) => b.price - a.price)
  } else if (sort === "newest") {
    books = [...books].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const categories = Array.from(new Set(allBooks.map((b) => b.category)))

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 max-w-xl">
        <p className="text-xs uppercase tracking-wide text-primary font-medium">
          Our Catalog
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mt-2">
          Shop All Books
        </h2>
        <p className="mt-2 text-sm text-primary-dark/60">
          {books.length} {books.length === 1 ? "book" : "books"}
          {category ? ` in ${category}` : ""}
          {q ? ` matching "${q}"` : ""}
        </p>
      </div>

      <form
        method="GET"
        className="mb-10 flex flex-col sm:flex-row gap-3 sm:items-center"
      >
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search title or author..."
          className="flex-1 rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-dark placeholder:text-primary-dark/40 focus:outline-none focus:border-primary"
        />

        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-dark focus:outline-none focus:border-primary"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="sort"
          defaultValue={sort ?? ""}
          className="rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-dark focus:outline-none focus:border-primary"
        >
          <option value="">Sort: relevance</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>

        <button
          type="submit"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-medium text-secondary hover:bg-primary transition-colors"
        >
          Apply
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-10">
        {books.map((book) => (
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

        {books.length === 0 && (
          <p className="col-span-full text-sm text-primary-dark/50">
            No books match your filters.
          </p>
        )}
      </div>
    </div>
  )
}

export default BooksPage;