import { CategoryCard } from "@/components/ui/CategoryCard";
import { categories } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "E-Learning",
    description: "Akses kursus dan materi belajar terbaik.",
};

export default function ELearningPage() {
    return (
        <div className="w-full bg-white">
            <section className="w-full px-4 sm:px-6 lg:px-10 pt-6 md:pt-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-white relative w-full rounded-2xl overflow-hidden px-6 py-12 md:px-10 md:py-16 bg-primary">
                        <svg className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20 pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice">
                            <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
                            <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
                        </svg>
                        <div className="relative z-10 max-w-2xl">
                            <p className="text-white/80 text-xs sm:text-sm font-medium mb-3 sm:mb-4 tracking-wide uppercase">
                                Learn, search your path
                            </p>
                            <h1 className="text-white font-semibold text-xl sm:text-2xl md:text-3xl leading-[1.3]">
                                Pelajari ratusan skill bersertifikat.<br />
                                Dan temukan karirmu.
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-6 sm:gap-y-10 lg:gap-y-12">
                        {categories.map((cat) => (
                            <CategoryCard key={cat.id} category={cat} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}