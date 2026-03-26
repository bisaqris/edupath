"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CourseCard from "@/components/ui/CourseCard";
import { featuredCourses, formatPrice } from "@/lib/data";
import { Star, Clock, BookOpen, Users, CheckCircle, Play, Globe, Award, ChevronRight } from "lucide-react";
import PaymentModal from "@/components/ui/PaymentModal";

interface PageProps {
  params: Promise<{ category: string; course: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { category, course: courseSlug } = resolvedParams;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const course = featuredCourses.find((c) => c.slug === courseSlug) || featuredCourses[0];

  // Filter kursus terkait berdasarkan kategori yang sama
  const related = featuredCourses
    .filter((c) => c.id !== course.id && c.category === category)
    .slice(0, 4);

  const benefits = [
    "Akses seumur hidup ke materi kursus",
    "Sertifikat penyelesaian kursus",
    "Akses ke komunitas diskusi",
    "Update materi secara berkala",
    "Project nyata untuk portofolio",
    "Mentoring dengan instruktur",
  ];

  const curriculum = [
    { title: "Pengenalan & Setup Environment", lessons: 5, duration: "1.5 jam" },
    { title: "Fundamental Konsep", lessons: 12, duration: "4 jam" },
    { title: "Hands-on Practice", lessons: 18, duration: "6 jam" },
    { title: "Project Nyata", lessons: 10, duration: "4 jam" },
    { title: "Deploy & Publikasi", lessons: 8, duration: "3 jam" },
  ];

  const reviews = [
    { name: "Adi Nurhadi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adi", rating: 5, date: "2 bulan lalu", text: "Kursus ini luar biasa! Instruktur menjelaskan dengan sangat detail dan mudah dipahami." },
    { name: "Nadira Suzan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadira", rating: 5, date: "1 bulan lalu", text: "Saya sudah mencoba banyak kursus online, tapi ini yang paling bagus. Sangat rekomendasikan!" },
    { name: "MR. Kumpul", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kumpul", rating: 4, date: "3 minggu lalu", text: "Materi sangat lengkap dan sangat membantu untuk portfolio." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        {/* HERO SECTION */}
        <div className="bg-primary text-white py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href="/e-learning" className="hover:text-white transition-colors">E-Learning</Link>
              <span>/</span>
              <Link href={`/e-learning/${category}`} className="hover:text-white transition-colors capitalize">
                {category.replace(/-/g, " ")}
              </Link>
              <span>/</span>
              <span className="text-white/90 truncate max-w-50">{course.title}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.isBestseller && <span className="bg-yellow-400 text-navy px-3 py-1 rounded-full text-xs font-bold">🏆 Bestseller</span>}
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium">{course.level}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{course.title}</h1>
                <p className="text-blue-50/80 mb-8 text-lg leading-relaxed max-w-3xl">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{course.rating}</span>
                    <span className="text-white/60">({course.totalStudents.toLocaleString()} siswa)</span>
                  </div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-300" />{course.duration}</div>
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-300" />{course.totalLessons} Pelajaran</div>
                  <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-300" />Bahasa Indonesia</div>
                </div>

                <div className="flex items-center gap-4 mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 w-fit">
                  <div className="relative w-12 h-12">
                    <Image src={course.instructor.avatar} alt={course.instructor.name} fill className="rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{course.instructor.name}</p>
                    <p className="text-xs text-white/60">{course.instructor.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Apa yang dipelajari */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-8">Apa yang akan kamu pelajari?</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kurikulum */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-2">Kurikulum Kursus</h2>
                <p className="text-sm text-gray-400 mb-8">{course.totalLessons} Pelajaran • {course.duration} Total Durasi</p>
                <div className="space-y-4">
                  {curriculum.map((section, i) => (
                    <div key={i} className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                      <div className="flex items-center justify-between p-5 bg-gray-50/50 group-hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-xs font-bold">{i + 1}</div>
                          <span className="font-bold text-navy text-sm">{section.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                          <span>{section.lessons} video</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-md">{section.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Reviews */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-8">Ulasan Siswa</h2>
                <div className="flex flex-col md:flex-row gap-8 mb-10 pb-8 border-b border-gray-50">
                  <div className="text-center md:text-left">
                    <p className="text-6xl font-bold text-navy mb-2">{course.rating}</p>
                    <div className="flex justify-center md:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Rating Kursus</p>
                  </div>
                  <div className="flex-1 space-y-3">
                    {/* Progress bars dummy untuk statistik rating */}
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="w-4">{star}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}></div>
                        </div>
                        <span className="w-10 text-right">{star === 5 ? '80%' : star === 4 ? '15%' : '5%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews.map((r, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image src={r.avatar} alt={r.name} fill className="rounded-full object-cover bg-gray-100" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-navy text-sm">{r.name}</h4>
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Courses */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-navy">Kursus Terkait</h2>
                  <Link href={`/e-learning/${category}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                    Lihat Semua <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {related.map((c) => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2.5rem] p-6 sticky top-28 border border-gray-100 shadow-xl shadow-navy/5">
                <div className="relative rounded-3xl overflow-hidden mb-6 cursor-pointer group aspect-video">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-navy/40 flex items-center justify-center group-hover:bg-navy/50 transition-all">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-7 h-7 text-primary ml-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <p className="text-4xl font-bold text-navy">{formatPrice(course.price)}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">Rp 1.200.000</span>
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Hemat 50%</span>
                  </div>
                </div>  

                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95"
                  >
                    Check out
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fasilitas Kursus:</p>
                  <div className="space-y-3">
                    {[
                      { icon: Clock, text: `${course.duration} total video belajar` },
                      { icon: BookOpen, text: "Materi PDF & Source Code" },
                      { icon: Globe, text: "Akses selamanya" },
                      { icon: Award, text: "Sertifikat Kelulusan" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          courseTitle={course.title}
          coursePrice={formatPrice(course.price)}
        />
      </main>
    </div>
  );
}