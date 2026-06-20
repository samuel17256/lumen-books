import { Book, Order, DashboardStats } from "../types"


function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const SELLER_ID = "seller-1"

let books: Book[] = [
  {
    id: "1",
    slug: "the-quiet-orchard",
    title: "The Quiet Orchard",
    author: "Mireille Dubois",
    price: 18.99,
    description:
      "A slow, tender novel about a woman who returns to her late grandmother's orchard and, in restoring it, begins to restore herself. A book about grief, memory, and the patience of growing things.",
    coverImageUrl: "/images/orchard.webp",
    category: "Fiction",
    createdAt: "2026-01-12T10:00:00.000Z",
    ratingsCount: 184,
    ratingsAverage: 4.6,
    stock: 22,
    sellerId: SELLER_ID,
  },
  {
    id: "2",
    slug: "letters-i-never-sent",
    title: "Letters I Never Sent",
    author: "Asha Bello",
    price: 15.5,
    description:
      "An epistolary novel told through unsent letters between two sisters separated by an ocean and a falling-out neither can quite name.",
    coverImageUrl: "/images/letters.webp",
    category: "Romance",
    createdAt: "2026-02-03T10:00:00.000Z",
    ratingsCount: 312,
    ratingsAverage: 4.8,
    stock: 14,
    sellerId: SELLER_ID,
  },
  {
    id: "3",
    slug: "small-hours",
    title: "Small Hours",
    author: "Tomas Vrana",
    price: 12.0,
    description:
      "A debut poetry collection about insomnia, cities at 3am, and the strange clarity that comes with being the only one awake.",
    coverImageUrl: "/images/hours.webp",
    category: "Poetry",
    createdAt: "2025-11-20T10:00:00.000Z",
    ratingsCount: 97,
    ratingsAverage: 4.4,
    stock: 30,
    sellerId: SELLER_ID,
  },
  {
    id: "4",
    slug: "the-cartography-of-loss",
    title: "The Cartography of Loss",
    author: "Helena Marsh",
    price: 21.0,
    description:
      "A memoir structured as an atlas — each chapter a place the author lived, mapped against the people she lost along the way.",
    coverImageUrl: "/images/cartography_of_loss_04-2.webp",
    category: "Nonfiction",
    createdAt: "2026-03-08T10:00:00.000Z",
    ratingsCount: 56,
    ratingsAverage: 4.9,
    stock: 9,
    sellerId: SELLER_ID,
  },
  {
    id: "5",
    slug: "what-the-river-keeps",
    title: "What the River Keeps",
    author: "Mireille Dubois",
    price: 19.99,
    description:
      "A multigenerational saga following a family of river-boat traders, and the secrets the water carries downstream with it.",
    coverImageUrl: "/images/rivers.webp",
    category: "Fiction",
    createdAt: "2025-09-14T10:00:00.000Z",
    ratingsCount: 421,
    ratingsAverage: 4.7,
    stock: 18,
    sellerId: SELLER_ID,
  },
  {
    id: "6",
    slug: "second-chances-at-the-cafe-bloom",
    title: "Second Chances at Café Bloom",
    author: "Asha Bello",
    price: 14.25,
    description:
      "A cozy, slow-burn romance set above a flower shop, about two people who keep almost-meeting for a decade before finally getting it right.",
    coverImageUrl: "/images/second-chances.webp",
    category: "Romance",
    createdAt: "2026-04-01T10:00:00.000Z",
    ratingsCount: 203,
    ratingsAverage: 4.5,
    stock: 25,
    sellerId: SELLER_ID,
  },
  {
  id: "7",
  slug: "the-darwin-affair",
  title: "The Darwin Affair",
  author: "Tim Mason",
  price: 16.99,
  description:
    "A gripping historical thriller set in Victorian London, where a failed assassination attempt on Queen Victoria unravels into a dark conspiracy tangled with the controversy surrounding Charles Darwin's theory of evolution.",
  coverImageUrl: "/images/darwin.webp",
  category: "Fiction",
  createdAt: "2026-06-01T10:00:00.000Z",
  ratingsCount: 0,
  ratingsAverage: 0,
  stock: 15,
  sellerId: SELLER_ID,
},
]

let orders: Order[] = [
  { id: "o1", bookId: "1", bookTitle: "The Quiet Orchard", quantity: 2, total: 37.98, createdAt: "2026-05-01T10:00:00.000Z" },
  { id: "o2", bookId: "2", bookTitle: "Letters I Never Sent", quantity: 1, total: 15.5, createdAt: "2026-05-04T10:00:00.000Z" },
  { id: "o3", bookId: "5", bookTitle: "What the River Keeps", quantity: 3, total: 59.97, createdAt: "2026-05-10T10:00:00.000Z" },
  { id: "o4", bookId: "6", bookTitle: "Second Chances at Café Bloom", quantity: 1, total: 14.25, createdAt: "2026-06-02T10:00:00.000Z" },
]

// ---------- public catalog ----------

export async function getBooks(): Promise<Book[]> {
  await delay()
  return books
}

export async function getAllSlugs(): Promise<string[]> {
  await delay(100)
  return books.map((b) => b.slug)
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  await delay()
  return books.find((b) => b.slug === slug)
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  await delay()
  return books.filter(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  )
}

export async function searchBooks(query: string): Promise<Book[]> {
  await delay(300)
  const q = query.toLowerCase()
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
  )
}

export async function getFeaturedBooks(): Promise<Book[]> {
  await delay()
  return [...books]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4)
}

export async function getBestsellers(): Promise<Book[]> {
  await delay()
  return [...books].sort((a, b) => b.ratingsCount - a.ratingsCount)
}

export async function getStoreStats() {
  await delay()
  const totalBooks = books.length
  const totalCategories = new Set(books.map((b) => b.category)).size
  const totalReaders = books.reduce((sum, b) => sum + b.ratingsCount, 0)
 
  return { totalBooks, totalCategories, totalReaders }
}

export async function getRecommendedBooks(
  bookId: string,
  limit = 4
): Promise<Book[]> {
  await delay(1200)
  const current = books.find((b) => b.id === bookId)
  const pool = books.filter((b) => b.id !== bookId)
  const sameCategory = current
    ? pool.filter((b) => b.category === current.category)
    : []
  const rest = pool.filter((b) => !sameCategory.includes(b))
  return [...sameCategory, ...rest].slice(0, limit)
}

// ---------- seller dashboard ----------

export async function getSellerBooks(sellerId: string): Promise<Book[]> {
  await delay()
  return books.filter((b) => b.sellerId === sellerId)
}

export async function getDashboardStats(
  sellerId: string
): Promise<DashboardStats> {
  await delay()
  const sellerBookIds = new Set(
    books.filter((b) => b.sellerId === sellerId).map((b) => b.id)
  )
  const sellerOrders = orders.filter((o) => sellerBookIds.has(o.bookId))

  return {
    totalRevenue: sellerOrders.reduce((sum, o) => sum + o.total, 0),
    totalOrders: sellerOrders.length,
    totalBooks: sellerBookIds.size,
    lastUpdated: new Date().toISOString(),
  }
}

export async function createBook(
  input: Omit<Book, "id" | "createdAt" | "ratingsCount" | "ratingsAverage">
): Promise<Book> {
  await delay()
  const book: Book = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ratingsCount: 0,
    ratingsAverage: 0,
  }
  books = [book, ...books]
  return book
}

export async function deleteBook(id: string): Promise<void> {
  await delay(300)
  books = books.filter((b) => b.id !== id)
}

export { SELLER_ID }