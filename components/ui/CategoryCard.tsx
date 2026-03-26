import Link from "next/link";
import { Star, Users, BookOpen } from "lucide-react";
import { CategoryCardProps } from "@/types";
import Image from "next/image";

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/e-learning/${category.slug}`} className="block group h-full">
            <div className="bg-white border-2 border-gray-100 rounded-2xl h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                <div className="relative w-full h-36 overflow-hidden rounded-t-[14px]">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-navy text-lg mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                    </h3>

                    <div className="space-y-2 mb-4 flex-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <Users className="w-3.5 h-3.5 text-primary" />
                            <span>{category.totalStudents.toLocaleString('id-ID')} Siswa</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                            <span>{category.totalTopics} Topik – {category.totalCourses} Kursus</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <Star className="w-3.5 h-3.5 text-primary" />
                            <span>{category.rating}/5</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Lihat lebih banyak</span>
                        <span className="text-lg leading-none">›</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}