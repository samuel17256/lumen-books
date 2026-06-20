import Category from "@/components/ui/Category";
import Hero from "@/components/ui/Hero";
import Stats from "@/components/ui/Stats";
import Testimonials from "@/components/ui/Testimonials";
import Bestsellers from "@/components/ui/Bestsellers ";
import FeaturedBooks from "@/components/ui/FeaturedBooks";

export default function Home() {
  return (
    <div className="bg-secondary">
     <Hero />
     <Category />
      <FeaturedBooks />
     <Bestsellers />
     <Stats />
     <Testimonials />
    </div>
  );
}
