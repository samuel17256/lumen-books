import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getSellerBooks } from "@/lib/data"
import { deleteBookAction } from "@/actions"

const DashboardBooksPage = async () => {
  const cookieStore = await cookies()
  const sellerId = cookieStore.get("lumen_session")?.value

  if (!sellerId) {
    redirect("/login")
  }

  const books = await getSellerBooks(sellerId)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-dark">
            Your Books
          </h1>
          <p className="text-sm text-primary-dark/50 mt-1">
            {books.length} {books.length === 1 ? "listing" : "listings"}
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="rounded-full bg-primary-dark px-5 py-2.5 text-sm font-medium text-secondary hover:bg-primary transition-colors"
        >
          + Add Book
        </Link>
      </div>

      <div className="divide-y divide-primary/10 rounded-xl border border-primary/10 bg-white">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-primary/10">
              <Image
                src={book.coverImageUrl}
                alt={book.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/books/${book.slug}`}
                className="font-medium text-primary-dark truncate hover:underline block"
              >
                {book.title}
              </Link>
              <p className="text-xs text-primary-dark/50">
                ${book.price.toFixed(2)} · {book.category} · {book.stock} in stock
              </p>
            </div>

            <p className="hidden sm:block text-xs text-primary-dark/40 shrink-0">
              {book.ratingsCount} ratings
            </p>

            {/* Server Action again — deleting is a mutation, no client
                JS, no confirm() dialog needed for this demo. */}
            <form action={deleteBookAction}>
              <input type="hidden" name="id" value={book.id} />
              <input type="hidden" name="slug" value={book.slug} />
              <button className="text-xs font-medium text-red-600 hover:underline shrink-0">
                Delete
              </button>
            </form>
          </div>
        ))}

        {books.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-sm text-primary-dark/50">
              You haven&apos;t listed any books yet.
            </p>
            <Link
              href="/dashboard/new"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              Add your first book →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardBooksPage;