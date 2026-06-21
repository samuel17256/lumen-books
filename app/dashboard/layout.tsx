import Link from "next/link"
import { Search, User } from "lucide-react"
import { logoutAction } from "@/actions"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-secondary">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-primary/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
          <p className="font-display text-lg font-semibold text-primary-dark shrink-0">
            Welcome back 👋
          </p>

          <div className="flex-1 max-w-sm hidden sm:flex items-center rounded-full bg-white border border-primary/15 px-4 py-2">
            <Search size={16} className="text-primary-dark/40 shrink-0" />
            <input
              type="text"
              placeholder="Search your books..."
              className="ml-2 w-full bg-transparent text-sm text-primary-dark placeholder:text-primary-dark/40 focus:outline-none"
            />
          </div>

          <Link
            href="/dashboard"
            aria-label="Profile"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-dark text-secondary"
          >
            <User size={16} strokeWidth={1.75} />
          </Link>
        </div>
      </nav>

   
      <div className="max-w-6xl px-6 pt-28 pb-12 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
          <aside className="space-y-1">
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-primary-dark hover:bg-primary/10"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/books"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-primary-dark hover:bg-primary/10"
            >
              Manage Books
            </Link>
            <form action={logoutAction} className="pt-4">
              <button className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                Log Out
              </button>
            </form>
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;