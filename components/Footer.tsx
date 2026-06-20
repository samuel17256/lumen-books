import Link from "next/link"
import { Mail } from "lucide-react"

const shopLinks = [
  { name: "All Books", href: "/shop" },
  { name: "New Releases", href: "/shop?sort=new" },
  { name: "Bestsellers", href: "/shop?sort=popular" },
  { name: "Collections", href: "/collections" },
]

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Sell on Lumen", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
]

const supportLinks = [
  { name: "FAQs", href: "/faq" },
  { name: "Shipping & Returns", href: "/shipping" },
  { name: "Track Order", href: "/orders" },
  { name: "Privacy Policy", href: "/privacy" },
]

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              Lumen <span className="italic font-normal">Books</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-secondary/75 leading-relaxed">
              Heartfelt novels, inspiring stories, and beautifully crafted
              books written to spark imagination and emotion.
            </p>

            <form className="mt-6 max-w-sm">
              <label className="text-xs uppercase tracking-wide text-secondary/60">
                Join our newsletter
              </label>
              <div className="mt-2 flex items-center rounded-full bg-secondary/10 border border-secondary/20 overflow-hidden focus-within:border-secondary/50 transition-colors">
                <Mail size={16} className="ml-4 text-secondary/50 shrink-0" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-transparent px-3 py-3 text-sm placeholder:text-secondary/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="m-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-primary-dark hover:bg-white transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-2">
            <FooterColumn title="Shop" links={shopLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Company" links={companyLinks} />
          </div>
          <div className="md:col-span-3">
            <FooterColumn title="Support" links={supportLinks} />
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t border-secondary/15 pt-6">
          <p className="text-xs text-secondary/60">
            &copy; {new Date().getFullYear()} Lumen Books. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <SocialIcon href="https://instagram.com" label="Instagram">
              <Mail size={17} strokeWidth={1.75} />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" label="Twitter">
              <Mail size={17} strokeWidth={1.75} />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <Mail size={17} strokeWidth={1.75} />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { name: string; href: string }[]
}) {
  return (
    <div>
      <p className="font-display text-sm font-semibold text-secondary/90">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm text-secondary/65 hover:text-secondary transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary/80 hover:bg-secondary hover:text-primary-dark transition-colors"
    >
      {children}
    </a>
  )
}

export default Footer