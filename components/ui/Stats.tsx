import { Book } from "lucide-react";

const Stats = () => {
    return (
        <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col">
            <div className="text-center">
                <h2 className="font-bold text-4xl md:text-5xl leading-[1.05] text-primary-dark">Craft Stories For Readers</h2>
                <p className="text-base font-bold mt-1 leading-6">Years of dedication, multiple pages <br /> written and a growing passionate readers around the world.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="">
                    <Book />
                    <p>
                        <span>67+</span>
                        <span>Publishe Chapters</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Stats;