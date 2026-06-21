# Lumen Books

A small online bookstore with a seller dashboard, built to deliberately exercise
every major Next.js 16 (App Router) rendering and data-fetching pattern in the
place where it actually makes sense — not as a feature showcase, but because
each route was chosen to prove a specific concept.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS
- TanStack Query (client-side search/cache on the homepage)
- Local in-memory data module (`lib/data.ts`) simulating network latency —
  no external API or DB required to run this

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

**Demo seller login** (for `/login`):
```
Email:    seller@lumenbooks.com
Password: lumen123
```

To produce the `next build` output referenced below, run:

```bash
npm run build
```

---

## Rendering table — every route, its mode, and why

| Route | Mode | Why |
|---|---|---|
| `/` | **ISR** — `export const revalidate = 3600` | Homepage sections (featured/bestselling books) don't change minute-to-minute. Build once, regenerate in the background at most once an hour, instead of paying server-render cost on every visit. |
| `/books` | **SSR** (dynamic) | Reads `searchParams` (`category`, `sort`, `q`) and uses them to filter/sort server-side. Next automatically renders this dynamically because it reads request-time input — **no `force-dynamic` is set**, the dynamic behavior is implicit, which is the more correct way to express it. |
| `/books/[slug]` | **SSG + ISR fallback** — `generateStaticParams()` + `revalidate = 3600` | Known books are pre-rendered at build time. A slug not yet known (e.g. just added) is rendered on first request and cached from then on, since `dynamicParams` defaults to `true`. The slow "Recommended for You" section is fetched separately and streamed in via `<Suspense>`, so it doesn't block the rest of the page. |
| `/login` | **SSR** (dynamic) | Reads `searchParams.error` to show an inline error message after a failed login attempt — that alone makes it dynamic, no explicit opt-in needed. |
| `/dashboard` | **SSR** (dynamic) | Reads the `lumen_session` cookie directly via `cookies()` to determine which seller's data to fetch and render. Two different sellers hitting this URL get two different responses — this is the other "headline" SSR route, driven by cookies rather than `searchParams`. |
| `/dashboard/new` | **SSR** (dynamic) | Reads `searchParams.error` for form validation feedback, same pattern as `/login`. The actual mutation happens through a Server Action (`createBookAction`), not on page load. |
| `/dashboard/books` | **SSR** (dynamic) | Reads the session cookie to scope the listing to the logged-in seller, same reasoning as `/dashboard`. |
| `/api/books` | **Route Handler** (not a page — no static/dynamic classification in the build output table) | `GET` (paginated, filterable) and `POST` (create). Consumed by Client Components (`Hero`'s live search, `LoadMoreBooks`) via `fetch()` — the one legitimate place client-side data fetching happens in this app. |

**Contrast of all three core modes, explicitly:**
- **Static / ISR:** `/`
- **SSG with `generateStaticParams`:** `/books/[slug]`
- **SSR (dynamic, request-time):** `/books`, `/dashboard`, `/login`, `/dashboard/new`, `/dashboard/books`

### A note on `force-dynamic`

Earlier drafts of several routes had `export const dynamic = "force-dynamic"`
set explicitly. **This has been removed everywhere.** Reading `searchParams`
or calling `cookies()` inside a Server Component already opts that route out
of static rendering automatically — `force-dynamic` was redundant in every
case it was used. Removing it doesn't change behavior, but it's a more
accurate signal of *why* each route is dynamic: because it genuinely depends
on request-time input, not because it was forced to be.

### `next build` output

```
# Paste the output of `npm run build` here, e.g.:
#
# Route (app)                              Size     First Load JS
# ┌ ○ /                                    ...
# ├ ƒ /books                               ...
# ├ ● /books/[slug]                        ...
# ├ ƒ /login                               ...
# ├ ƒ /dashboard                           ...
# ├ ƒ /dashboard/new                       ...
# ├ ƒ /dashboard/books                     ...
# └ ƒ /api/books                           ...
#
# ○  (Static)   prerendered as static content
# ●  (SSG)      prerendered as static HTML (uses generateStaticParams)
# ƒ  (Dynamic)  server-rendered on demand
```

Run `npm run build` locally and paste the real output above before
submitting — this is the actual proof the grading rubric asks for.

### Demonstrating freshness (SSR)

`/books?sort=price-asc` and `/books?sort=newest` return genuinely different
server-rendered HTML for the same route — the book order in the markup
itself differs, not just a client-side re-sort. Same for `/books?category=Romance`
vs `/books?category=Poetry`: different `<body>` content per request, proving
the page re-runs server-side rather than serving cached HTML. (Take a
screenshot of "View Source" on both URLs side-by-side if your submission
wants visual proof rather than just this explanation.)

---

## Architecture notes

- **Server Components by default.** Client Components exist only where
  interactivity genuinely requires it: `Hero` (live search dropdown),
  `LoadMoreBooks` (pagination button + state), `Nav` (active-link
  highlighting via `usePathname`, mobile menu state), `BestsellerCarousel`
  (CSS animation control), `error.tsx` (required by React).
- **Data fetching happens in Server Components**, not `useEffect` — except
  where a Client Component legitimately calls `/api/books` via `fetch()`
  (live search, load more).
- **Server Actions** handle every mutation: `loginAction`/`logoutAction`
  (auth + cookie), `createBookAction` (add book, including file upload),
  `deleteBookAction` (remove book). Each calls `revalidatePath()` afterward
  so the catalog and dashboard reflect the change immediately rather than
  waiting for the next natural cache expiry.
- **Middleware** (`middleware.ts`) gates `/dashboard/**` at the edge,
  redirecting to `/login` before any Server Component on that route starts
  rendering. Each protected page *also* re-checks the cookie itself
  (defense in depth) rather than trusting middleware alone.
- **Streaming + Suspense:** `/books/[slug]`'s "Recommended for You" section
  is deliberately the slowest fetch in the app (1.2s), wrapped in
  `<Suspense fallback={<RecommendedForYouSkeleton />}>` so the rest of the
  page (cover, title, price, description) ships and becomes interactive
  before that section resolves.

## Bonus items attempted

- TanStack Query for client-side search caching/dedup on the homepage.
- Real file upload (not just a URL string) for book covers in
  `/dashboard/new`, written to `public/covers/` via `fs/promises`.


## Known limitation / trade-off

The cover-image upload in `/dashboard/new` writes directly to the
filesystem (`public/covers/`) using Node's `fs/promises`. This works
correctly in local development and on a traditional long-running Node
server, but **it will not work once deployed to Vercel** (or any serverless
platform) — the filesystem there is read-only at runtime outside of `/tmp`,
and `/tmp` itself doesn't reliably persist between requests or deployments.
The trade-off was chosen deliberately to keep the assignment's data layer
dependency-free (no external storage account needed to run the project
locally); a production version would swap this for an upload to Vercel
Blob, S3, or Cloudinary and store the returned URL instead of a local path.


## Deployment

Live URL: (https://lumen-books-woad.vercel.app/)

## Walkthrough video

_add your 3–5 minute walkthrough link here_