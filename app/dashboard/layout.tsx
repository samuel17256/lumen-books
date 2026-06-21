import Link from "next/link"
import { logoutAction } from "@/actions"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
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
  )
}

export default DashboardLayout;