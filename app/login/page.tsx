import Link from "next/link"
import { loginAction } from "@/actions"

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>
}) => {
  const { error } = await searchParams

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-20">
      <h1 className="font-display text-3xl font-bold text-primary-dark">
        Seller Login
      </h1>
      <p className="mt-2 text-sm text-primary-dark/60">
        Sign in to manage your books and view your dashboard.
      </p>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
          Invalid email or password. Try again.
        </p>
      )}
      <form action={loginAction} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="seller@lumenbooks.com"
            className="w-full rounded-lg border border-primary/20 px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-dark mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full rounded-lg border border-primary/20 px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-primary-dark px-6 py-3 text-sm font-medium text-secondary hover:bg-primary transition-colors"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-xs text-primary-dark/40">
        Demo credentials: <code>seller@lumenbooks.com</code> /{" "}
        <code>lumen123</code>
      </p>

      <Link
        href="/"
        className="mt-8 text-sm text-primary-dark/60 hover:text-primary-dark"
      >
        ← Back to Lumen Books
      </Link>
    </div>
  )
}

export default LoginPage;