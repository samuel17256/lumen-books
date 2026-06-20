import { Book, Layers, Users } from "lucide-react";
import { getStoreStats } from "@/lib/data";


const Stats = async () => {
    const { totalBooks, totalCategories, totalReaders } = await getStoreStats();

    return (
        <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col">
            <div className="text-center">
                <h2 className="font-bold text-4xl md:text-5xl leading-[1.05] text-primary-dark">
                    Craft Stories For Readers
                </h2>
                <p className="text-base mt-2 leading-6 text-gray-600">
                    Years of dedication, multiple pages <br className="hidden sm:inline" /> 
                    written, and a growing community of passionate readers around the world.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-around items-center gap-8 mt-12 space-y-6 md:space-y-0">

                <div className="flex items-center gap-4 min-w-50">
                    <div className="bg-primary text-white p-3 rounded-full flex items-center justify-center">
                        <Book size={32} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-4xl text-gray-900">{totalBooks}+</span>
                        <span className="text-sm text-gray-500 font-medium">Books Published</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 min-w-50">
                    <div className="bg-primary text-white p-3 rounded-full flex items-center justify-center">
                        <Layers size={32} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-4xl text-gray-900">{totalCategories}+</span>
                        <span className="text-sm text-gray-500 font-medium">Story Collections</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 min-w-50">
                    <div className="bg-primary text-white p-3 rounded-full flex items-center justify-center">
                        <Users size={32} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-4xl text-gray-900">{totalReaders}+</span>
                        <span className="text-sm text-gray-500 font-medium">Happy Readers</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Stats;