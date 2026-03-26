"use client";
import Image from "next/image";
import Link from "next/link";
import { featuredCourses } from "@/lib/data";
import { BookOpen, Clock, PlayCircle, User } from "lucide-react";

export default function MyCoursesPage() {
    const myCourses = featuredCourses.slice(0, 2);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-navy mb-1">Kelas Saya</h1>
                        <p className="text-gray-500 text-sm">Selamat datang kembali, Ahmad! Lanjutkan progres belajarmu.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-full border border-gray-100 shadow-sm">
                        <div className="flex -space-x-3">
                            <User size={30}/>
                        </div>
                        <p className="text-sm font-semibold text-navy pr-4">2 Kursus Aktif</p>
                    </div>
                </div>

                {/* Course Grid - Sesuai Design image_7c323f.jpg */}
                <div className="grid md:grid-cols-2 gap-8">
                    {myCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-navy/5 flex flex-col md:flex-row gap-6 transition-all hover:border-primary/30">

                            {/* Thumbnail Responsif */}
                            <div className="relative w-full md:w-48 h-40 shrink-0 rounded-2xl overflow-hidden">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Konten & Progres */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{course.category}</span>
                                </div>

                                <h3 className="font-bold text-navy text-lg leading-tight mb-4 flex-1">{course.title}</h3>

                                <div className="border-t border-gray-100 pt-4 space-y-4">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />{course.duration}</div>
                                        <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-primary" />{course.totalLessons} Pelajaran</div>
                                    </div>

                                    <Link
                                        href={`/dashboard/kelas/${course.category}/${course.slug}/learn`} // Arahkan ke halaman materi
                                        className="w-full py-3 bg-navy text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-navy-700 transition-colors active:scale-95"
                                    >
                                        <PlayCircle className="w-5 h-5" /> Mulai Belajar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}