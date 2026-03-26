import Link from "next/link";
import { Star, Users, BookOpen } from "lucide-react";
import { CategoryCardProps } from "@/types";
import Image from "next/image";

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/e-learning/${category.slug}`} className="block group h-full">
            <div className="bg-white border-2 border-gray-100 rounded-2xl h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                <div className="relative w-full h-28 sm:h-36 overflow-hidden rounded-t-[14px]">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-navy text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {category.name}
                    </h3>

                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 font-medium">
                            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
                            <span>{category.totalStudents.toLocaleString('id-ID')} Siswa</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 font-medium">
                            <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
                            <span className="line-clamp-1">{category.totalTopics} Topik – {category.totalCourses} Kursus</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 font-medium">
                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
                            <span>{category.rating}/5</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Lihat lebih banyak</span>
                        <span className="text-base sm:text-lg leading-none">›</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}