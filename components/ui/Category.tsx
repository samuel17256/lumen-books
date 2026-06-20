import { BookOpen, Sparkles, Terminal, FileText } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
    {
        title: "Creative Writing",
        description: "Life reflections, personal essays, and human-centered storytelling that resonates on a deeper level.",
        icon: BookOpen,
    },
    {
        title: "Brand Strategy",
        description: "Compelling brand voices, copy, and narratives that convert readers into loyal community members.",
        icon: Sparkles,
    },
    {
        title: "Technical Writing",
        description: "Breaking down complex systems, APIs, and frameworks into crystal-clear, accessible documentation.",
        icon: Terminal,
    },
    {
        title: "Editorial & Features",
        description: "Deep-dive journalism, thought leadership pieces, and cultural commentary backed by thorough research.",
        icon: FileText,
    },
];

const Category = () => {
    return (
        <section className="bg-white">
            <div className="mx-auto flex flex-col max-w-6xl px-6 py-16 md:py-20 gap-12">
                
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-dark leading-tight">
                        From compelling brand stories to heartfelt essays, I write to connect, inspire, and bring ideas to life with clarity and emotion.
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
                    
                    <div className="w-full lg:w-1/2 relative overflow-hidden shadow-lg">
                        <Image
                            src="/images/photo-1485462537746-965f33f7f6a7.avif"
                            alt="Woman reading, surrounded by flowers"
                            height={500}
                            width={600}
                            className="object-cover w-full h-87.5 md:h-112.5"
                            priority
                        />
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {CATEGORIES.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-start gap-4 p-2 group">
                                    <div className="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white rounded-xl flex items-center justify-center p-3 transition-colors duration-300 shrink-0">
                                        <IconComponent size={28} strokeWidth={1.75} />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="font-bold text-xl text-slate-800 tracking-tight">
                                            {category.title}
                                        </h2>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Category;