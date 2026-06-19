"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Search, User } from "lucide-react"
import Button from "./button/Button";

const links = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
]

const Nav = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-secondary/90 backdrop-blur-sm border-b border-primary/10">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-18 items-center justify-between py-4">
                    <Link
                        href="/"
                        className="font-serif text-2xl font-bold tracking-tight text-primary-dark"
                        onClick={() => setOpen(false)}
                    >
                        Lumen <span className="italic text-primary">Books</span>
                    </Link>

                    <ul className="hidden md:flex items-center gap-9">
                        {links.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`relative font-bold text-sm tracking-wide transition-colors ${isActive
                                            ? "text-primary-dark"
                                            : "text-black hover:text-primary-dark"
                                            }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-primary-dark transition-colors"
                        >
                            <User size={16} strokeWidth={1.75} />
                            Login
                        </Link>
                        <button
                            aria-label={open ? "Close menu" : "Open menu"}
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden text-primary-dark"
                        >
                            {open ? (
                                <X size={22} strokeWidth={1.75} />
                            ) : (
                                <Menu size={22} strokeWidth={1.75} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-primary/10 ${open ? "max-h-80" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col px-6 py-4 gap-4 bg-secondary">
                    {links.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`text-base ${isActive
                                        ? "text-primary-dark font-medium"
                                        : "text-primary-dark/60"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        )
                    })}
                    <li>
                        <Link
                            href="/login"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-secondary"
                        >
                            <User size={16} strokeWidth={1.75} />
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Nav;