import { getBestsellers } from "@/lib/data"
import BestsellerCarousel from "../../components/Bestsellercarousel"

const Bestsellers = async () => {
  const books = await getBestsellers()

  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <p className="text-xs uppercase tracking-wide text-primary font-medium">
          Reader Favorites
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mt-2">
          Bestselling Books
        </h2>
      </div>

      <BestsellerCarousel books={books} />
    </section>
  )
}

export default Bestsellers;