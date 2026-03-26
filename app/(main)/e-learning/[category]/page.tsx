"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, GraduationCap } from "lucide-react";
import { categories, getCoursesByCategory } from "@/lib/data";
import { Course } from "@/types";
import { clsx } from "clsx";

interface PageProps {
  params: Promise<{ category: string }>; 
}

function CourseCategoryCard({ course }: { course: Course }) {
  return (
    <Link href={`/e-learning/${course.category}/${course.slug}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="relative h-44 overflow-hidden shrink-0">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-navy shadow-sm">
            {course.level}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-navy text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <div className="flex items-center gap-1 text-primary text-xs font-bold">
              <span>Detail Kursus</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-[10px]">
               <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
               <span>{course.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoryPage({ params }: PageProps) {
  // 1. Gunakan React.use() untuk unwrap params tanpa useEffect
  const { category: categorySlug } = React.use(params);

  // 2. State Filter tetap aman
  const [activeLevel, setActiveLevel] = useState<string>("Semua Level");
  const [sortBy, setSortBy] = useState<string>("Terbaru");

  // 3. Logic Data
  const cat = useMemo(() => {
    return categories.find((c) => c.slug === categorySlug) ?? categories[0];
  }, [categorySlug]);

  const allCourses = useMemo(() => {
    return getCoursesByCategory(categorySlug);
  }, [categorySlug]);

  const filteredCourses = useMemo(() => {
    let result = [...allCourses];
    if (activeLevel !== "Semua Level") {
      result = result.filter((c) => c.level === activeLevel);
    }

    switch (sortBy) {
      case "Terpopuler":
        result.sort((a, b) => b.totalStudents - a.totalStudents);
        break;
      case "Rating Tertinggi":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Harga Terendah":
        result.sort((a, b) => a.price - b.price);
        break;
    }
    return result;
  }, [allCourses, activeLevel, sortBy]);

  const levels = ["Semua Level", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO BANNER */}
      <section className="w-full px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-4xl overflow-hidden bg-[#1e3a5f] shadow-2xl shadow-navy/20">
            <div className="grid md:grid-cols-2 min-h-70">
              <div className="flex flex-col justify-center px-8 md:px-12 py-12 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  <span className="text-blue-200/80 text-xs font-bold uppercase tracking-[0.2em]">Learning Path</span>
                </div>
                <h1 className="text-white font-bold text-3xl md:text-5xl leading-tight mb-4">
                  Kuasai {cat.name} <br/> 
                  <span className="text-blue-300">Hingga Profesional.</span>
                </h1>
                <p className="text-blue-100/60 text-sm max-w-md leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="hidden md:block relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-[#1e3a5f] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-xs font-bold border transition-all shrink-0",
                  activeLevel === lvl
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
            <p className="hidden sm:block text-gray-400 text-xs font-medium">
              <span className="text-navy font-bold">{filteredCourses.length}</span> Kursus
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white cursor-pointer text-navy"
            >
              {["Terbaru", "Terpopuler", "Rating Tertinggi", "Harga Terendah"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCategoryCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
            <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
               <GraduationCap className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-navy font-bold text-lg">Belum ada kursus</h3>
            <p className="text-gray-500 text-sm">Coba pilih level belajar yang berbeda.</p>
          </div>
        )}
      </section>
    </div>
  );
}