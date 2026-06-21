import { NextRequest, NextResponse } from "next/server"
import { getBooks, searchBooks, createBook } from "@/lib/data"
import { SELLER_ID } from "@/lib/data"


export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const q = searchParams.get("q")
  const category = searchParams.get("category")
  const limit = parseInt(searchParams.get("limit") ?? "8", 10)
  const offset = parseInt(searchParams.get("offset") ?? "0", 10)

  let books = q ? await searchBooks(q) : await getBooks()

  if (category) {
    books = books.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    )
  }

  const total = books.length
  const page = books.slice(offset, offset + limit)
  const hasMore = offset + limit < total

  return NextResponse.json({ books: page, total, hasMore })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { title, author, price, description, category, coverImageUrl, stock } =
    body ?? {}

  if (!title || !author || !category || typeof price !== "number") {
    return NextResponse.json(
      { error: "title, author, category, and price are required" },
      { status: 400 }
    )
  }

  const slug = String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const book = await createBook({
    slug,
    title,
    author,
    price,
    description: description ?? "",
    category,
    coverImageUrl: coverImageUrl ?? "/covers/placeholder.jpg",
    stock: typeof stock === "number" ? stock : 0,
    sellerId: SELLER_ID,
  })

  return NextResponse.json({ book }, { status: 201 })
}