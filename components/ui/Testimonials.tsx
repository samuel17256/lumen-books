import Image from "next/image"
import { Testimonial } from "@/types"

const testimonials: Testimonial[] = [
    {
        name: "Naomi Chukwu",
        role: "Bookworm & blogger",
        avatarUrl: "/images/photo-1519733833087-3b1ceb8d56c5.avif",
        quote:
            "Lumen Books recommended The Quiet Orchard and I haven't stopped thinking about it since. Their picks always feel personal, never generic.",
    },
    {
        name: "Daniel Reyes",
        role: "Verified buyer",
        avatarUrl: "/images/photo-1519733833087-3b1ceb8d56c5.avif",
        quote:
            "Fast shipping, beautifully packaged, and the seller dashboard makes it so easy to see what's coming. This is how online bookstores should feel.",
    },
    {
        name: "Priya Anand",
        role: "Book club host",
        avatarUrl: "/images/photo-1519733833087-3b1ceb8d56c5.avif",
        quote:
            "We've ordered every pick for our book club from here for the past year. The curation is honestly better than the big retailers.",
    },
]

const Testimonials = () => {
    return (
        <section className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-xl">
                <p className="text-xs uppercase tracking-wide text-primary font-medium">
                    Reader Love
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mt-2">
                    What Our Readers Are Saying
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                    <div
                        key={t.name}
                        className="flex gap-4 rounded-2xl bg-white border border-primary/10 p-6 shadow-sm"
                    >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-primary/10">
                            <Image
                                src={t.avatarUrl}
                                alt={t.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm text-primary-dark/80 leading-relaxed">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <p className="mt-4 font-display font-semibold text-sm text-primary-dark">
                                {t.name}
                            </p>
                            <p className="text-xs text-primary-dark/50">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials;