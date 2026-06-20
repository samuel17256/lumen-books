import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { getAllSlugs, getBookBySlug } from "@/lib/data"
import RecommendedForYou from "@/components/ui/ Recommendedforyou"
import RecommendedForYouSkeleton from "@/components/ui/Recommendedforyouskeleton"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const revalidate = 3600 

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) {
    return { title: "Book not found — Lumen Books" }
  }

  return {
    title: `${book.title} — Lumen Books`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [{ url: book.coverImageUrl }],
      type: "book",
    },
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) notFound()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-2/3 w-full max-w-sm overflow-hidden rounded-xl bg-primary/10 shadow-md">
          <Image
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-primary">
            {book.category}
          </p>
          <h1 className="font-display text-4xl font-bold text-primary-dark mt-1">
            {book.title}
          </h1>
          <p className="text-primary-dark/60 mt-1">by {book.author}</p>
          <p className="mt-4 text-2xl font-semibold text-primary-dark">
            ${book.price.toFixed(2)}
          </p>
          <p className="mt-6 text-primary-dark/80 leading-relaxed">
            {book.description}
          </p>
          <p className="mt-4 text-sm text-primary-dark/50">
            {book.ratingsCount} ratings · {book.ratingsAverage.toFixed(1)}★
          </p>
        </div>
      </div>
      <section className="mt-20">
        <h2 className="font-display text-2xl font-bold text-primary-dark mb-6">
          Recommended for You
        </h2>
        <Suspense fallback={<RecommendedForYouSkeleton />}>
          <RecommendedForYou bookId={book.id} />
        </Suspense>
      </section>
    </div>
  )
}