import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getDashboardStats, getSellerBooks, getRecentOrders } from "@/lib/data"


export const dynamic = "force-dynamic"

const DashboardPage = async () => {
  const cookieStore = await cookies()
  const sellerId = cookieStore.get("lumen_session")?.value

  if (!sellerId) {
    redirect("/login")
  }

  const [stats, books, recentOrders] = await Promise.all([
    getDashboardStats(sellerId),
    getSellerBooks(sellerId),
    getRecentOrders(sellerId),
  ])

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-primary-dark mb-1">
        Dashboard
      </h1>
      <p className="text-sm text-primary-dark/50 mb-8">
        Last updated {new Date(stats.lastUpdated).toLocaleTimeString()}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Books Listed" value={stats.totalBooks} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-primary-dark">
          Your Listings
        </h2>
        <Link
          href="/dashboard/books"
          className="text-sm font-medium text-primary hover:underline"
        >
          Manage all →
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
              <p className="font-medium text-primary-dark truncate">
                {book.title}
              </p>
              <p className="text-xs text-primary-dark/50">
                ${book.price.toFixed(2)} · {book.category} · {book.stock} in stock
              </p>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <p className="p-6 text-sm text-primary-dark/50">
            You haven&apos;t listed any books yet.
          </p>
        )}
      </div>

      <h2 className="font-display text-xl font-semibold text-primary-dark mt-12 mb-4">
        Recent Orders
      </h2>

      <div className="divide-y divide-primary/10 rounded-xl border border-primary/10 bg-white">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-primary-dark text-sm">
                {order.bookTitle}
              </p>
              <p className="text-xs text-primary-dark/50">
                Qty {order.quantity} ·{" "}
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className="font-medium text-primary-dark text-sm">
              ${order.total.toFixed(2)}
            </p>
          </div>
        ))}

        {recentOrders.length === 0 && (
          <p className="p-6 text-sm text-primary-dark/50">
            No orders yet.
          </p>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-primary-dark/50">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-primary-dark">
        {value}
      </p>
    </div>
  )
}

export default DashboardPage;