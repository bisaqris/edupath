import { BookOpen, Clock, Star, Users } from "lucide-react";
import { CourseCardProps } from "@/types";
import { formatPrice } from "@/lib/data";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ course, variant = "default" }: CourseCardProps) {
    const levelColors: Record<string, string> = {
        Beginner: "bg-green-100 text-green-700",
        Intermediate: "bg-yellow-100 text-yellow-700",
        Advanced: "bg-red-100 text-red-700",
    };

    if (variant === "compact") {
        return (
            <Link href={`/e-learning/${course.category}/${course.slug}`} className="block group">
                <div className="card p-0 overflow-hidden flex gap-3 items-start">
                    {/* Menggunakan fill karena ukuran div sudah ditentukan (w-20 h-16) */}
                    <div className="relative w-20 h-16 shrink-0 overflow-hidden rounded-xl">
                        <Image 
                            src={course.thumbnail} 
                            alt={course.title} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                    </div>
                    <div className="py-2 pr-3 flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy line-clamp-2 group-hover:text-primary transition-colors">{course.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-500">{course.rating}</span>
                        </div>
                        <p className="text-xs font-bold text-primary mt-0.5">{formatPrice(course.price)}</p>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/e-learning/${course.category}/${course.slug}`} className="block group">
            <div className="card overflow-hidden p-0 h-full">
                <div className="relative h-40 overflow-hidden">
                    <Image 
                        src={course.thumbnail} 
                        alt={course.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    {course.isBestseller && (
                        <span className="absolute top-2 left-2 badge bg-yellow-400 text-yellow-900 text-xs">🏆 Bestseller</span>
                    )}
                    <span className={clsx("absolute top-2 right-2 badge text-xs", levelColors[course.level])}>
                        {course.level}
                    </span>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-navy text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-100">
                            <Image 
                                src={course.instructor.avatar} 
                                alt={course.instructor.name} 
                                width={20}
                                height={20}
                                className="object-cover" 
                            />
                        </div>
                        <span className="text-xs text-gray-500">{course.instructor.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{course.rating}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.totalLessons} lesson</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="font-bold text-primary text-sm">{formatPrice(course.price)}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Users className="w-3 h-3" />{course.totalStudents.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}