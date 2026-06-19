import Category from "@/components/ui/Category";
import Hero from "@/components/ui/Hero";
import Stats from "@/components/ui/Stats";

export default function Home() {
  return (
    <div className="bg-secondary">
     <Hero />
     <Category />
     <Stats />
    </div>
  );
}
