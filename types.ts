export type Book = {
  id: string
  slug: string
  title: string
  author: string
  price: number
  description: string
  coverImageUrl: string
  category: string
  createdAt: string
  ratingsCount: number
  ratingsAverage: number
  stock: number
  sellerId: string
}

export type Testimonial = {
  name: string
  role: string
  avatarUrl: string
  quote: string
}

export type Order = {
  id: string
  bookId: string
  bookTitle: string
  quantity: number
  total: number
  createdAt: string
}

export type DashboardStats = {
  totalRevenue: number
  totalOrders: number
  totalBooks: number
  lastUpdated: string
}