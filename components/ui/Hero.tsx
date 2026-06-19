"use client"

import Image from "next/image"
import { Search } from "lucide-react"


const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-secondary min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <svg
            viewBox="0 0 80 120"
            className="pointer-events-none absolute -top-6 -left-2 h-28 w-20 text-primary/30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M10 110 L20 10" strokeLinecap="round" />
            <path d="M20 30 L8 18" strokeLinecap="round" />
            <path d="M20 50 L34 38" strokeLinecap="round" />
            <path d="M20 70 L8 60" strokeLinecap="round" />
          </svg>

          <div className="relative z-10">
            <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.05] text-primary-dark">
              Stories That Stay
              <br />
              With You Forever
            </h1>

            <p className="mt-6 max-w-md text-sm md:text-base text-primary-dark/70 font-medium leading-relaxed">
              Discover heartfelt novels, inspiring stories, and beautifully
              crafted books written to spark imagination and emotion.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-6">
              <BookStack />

              <div className="flex-1 max-w-md">
                <p className="font-display font-bold text-base text-primary-dark mb-2">
                  Find Your Next Favorite Book
                </p>
                <form className="flex items-center rounded-full bg-white shadow-sm overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search books, genres, or collections..."
                    className="flex-1 bg-transparent px-5 py-3.5 text-sm text-primary-dark placeholder:text-primary-dark/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="m-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white hover:bg-primary transition-colors"
                  >
                    <Search size={17} strokeWidth={2} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-center md:justify-end">
            <div className="relative w-full max-w-90">
              <svg
                viewBox="0 0 200 400"
                className="pointer-events-none absolute -left-16 top-1/2 -translate-y-1/2 h-105 w-55 text-primary/10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M100 10 L100 390" strokeLinecap="round" />
                {[60, 110, 160, 210, 260, 310].map((y) => (
                  <ellipse
                    key={y}
                    cx={y % 120 === 0 ? 70 : 130}
                    cy={y}
                    rx="22"
                    ry="11"
                    transform={`rotate(${y % 120 === 0 ? -30 : 30} ${
                      y % 120 === 0 ? 70 : 130
                    } ${y})`}
                  />
                ))}
              </svg>

              <div className="relative aspect-3/4 w-full overflow-hidden bg-linear-to-t from-primary/20 to-primary/5">
                <Image
                  src="/images/photo-1519733833087-3b1ceb8d56c5.avif"
                  alt="Woman reading, surrounded by flowers"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              <svg
                viewBox="0 0 120 100"
                className="pointer-events-none absolute -top-6 -right-6 h-24 w-28 text-[#e98ea0]"
                fill="currentColor"
              >
                <g opacity="0.9">
                  <ellipse cx="70" cy="30" rx="14" ry="22" transform="rotate(20 70 30)" />
                  <ellipse cx="90" cy="20" rx="13" ry="20" transform="rotate(-15 90 20)" />
                  <ellipse cx="55" cy="15" rx="12" ry="18" transform="rotate(60 55 15)" />
                  <circle cx="72" cy="22" r="6" className="text-primary-dark" fill="currentColor" />
                </g>
              </svg>

              <svg
                viewBox="0 0 220 160"
                className="pointer-events-none absolute -bottom-10 -left-6 h-40 w-52 text-[#c23b4a]"
                fill="currentColor"
              >
                <g opacity="0.95">
                  <ellipse cx="60" cy="80" rx="26" ry="36" transform="rotate(10 60 80)" />
                  <ellipse cx="100" cy="70" rx="24" ry="34" transform="rotate(-20 100 70)" />
                  <ellipse cx="130" cy="95" rx="25" ry="35" transform="rotate(35 130 95)" />
                  <ellipse cx="90" cy="110" rx="22" ry="30" transform="rotate(80 90 110)" />
                  <circle cx="95" cy="88" r="10" className="text-amber-300" fill="currentColor" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.75 w-full bg-primary-dark" />
    </section>
  )
}

function BookStack() {
  return (
    <div className="relative h-32 w-24 shrink-0">
      <div className="absolute left-0 top-2 h-28 w-16 -rotate-6 rounded-sm bg-[#241a1c] shadow-md" />
      <div className="absolute left-4 top-0 flex h-32 w-16 rotate-3 flex-col items-center justify-center rounded-sm bg-primary-dark px-2 text-center shadow-lg">
        <span className="font-display text-[10px] font-bold uppercase leading-tight text-secondary">
          Read
          <br />
          Your
          <br />
          Book
        </span>
        <span></span>
      </div>
    </div>
  )
}

export default Hero;