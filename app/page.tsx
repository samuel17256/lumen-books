import Category from "@/components/ui/Category";
import Hero from "@/components/ui/Hero";
import Stats from "@/components/ui/Stats";
import Works from "@/components/ui/Works";

export default function Home() {
  return (
    <div className="bg-secondary">
     <Hero />
     <Category />
     <Works />
     <Stats />
    </div>
  );
}
