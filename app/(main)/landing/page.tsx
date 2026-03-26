"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, BookOpen, Target } from "lucide-react";
import { programs, whyItems, categories } from "@/lib/data";
import { clsx } from "clsx";
import Link from "next/link";

export default function LandingPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── BANNER ── */}
      <div className="relative w-full my-6 md:my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aspect ratio wrapper: taller on mobile, shorter on desktop */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] md:aspect-[16/5]">
          <Image
            src="/images/banner.png"
            alt="Banner"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {/* ── PROGRAM KAMI ── */}
      <section className="w-full py-10 md:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-display font-semibold mb-8 md:mb-10">
            <span className="text-primary">Program </span>
            <span className="text-navy">Kami</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {programs.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-gray-100 bg-white px-6 sm:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10"
              >
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    {i === 0
                      ? <BookOpen className="w-6 h-6 text-primary" />
                      : <Target className="w-6 h-6 text-primary" />
                    }
                  </div>
                  <h3 className="font-bold text-primary text-base">{p.title}</h3>
                </div>
                <p className="text-navy text-sm leading-relaxed text-justify">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KENAPA EDUPATH BERBEDA ── */}
      <section className="w-full py-10 md:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-display font-semibold mb-8 md:mb-10">
            <span className="text-primary">Kenapa Edupath</span>
            <span className="text-navy"> Berbeda</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* Accordion */}
            <div className="divide-y divide-gray-100 order-2 md:order-1">
              {whyItems.map((item, i) => (
                <div key={i} className="overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full py-4 flex justify-between items-center text-left group"
                  >
                    <span className={clsx(
                      "text-base md:text-lg font-medium transition-colors duration-200 pr-4",
                      openIdx === i ? "text-primary" : "text-navy group-hover:text-primary"
                    )}>
                      {item.label}
                    </span>
                    <ChevronDown className={clsx(
                      "w-4 h-4 shrink-0 transition-all duration-300 ease-in-out",
                      openIdx === i
                        ? "rotate-180 text-primary"
                        : "text-gray-400 group-hover:text-primary"
                    )} />
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: openIdx === i ? "200px" : "0px",
                      opacity: openIdx === i ? 1 : 0,
                    }}
                  >
                    <p className="pb-4 text-sm md:text-base text-gray-500 leading-relaxed pr-6">
                      {item.detail ?? "Kualitas terjamin dengan standar industri internasional."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3 order-1 md:order-2">
              <div className="relative h-32 sm:h-40 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
                  fill
                  className="object-cover rounded-xl"
                  alt="Students"
                />
              </div>
              <div className="relative h-32 sm:h-40 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400"
                  fill
                  className="object-cover rounded-xl"
                  alt="Learning"
                />
              </div>
              <div className="relative h-44 sm:h-52 w-full col-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800"
                  fill
                  className="object-cover rounded-xl"
                  alt="Teamwork"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section className="w-full py-8 md:py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href="/auth/login"
                className="relative h-28 sm:h-36 rounded-xl overflow-hidden group block"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                <span className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-semibold px-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="w-full py-10 md:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl px-6 sm:px-10 pt-8 sm:pt-10 pb-6 relative bg-primary overflow-hidden">

            <div className="text-center mb-4 md:mb-5">
              <h2 className="text-white text-xl md:text-2xl font-display font-bold">Testimoni</h2>
              <p className="text-blue-200 text-sm mt-1">Apa kata mereka tentang Edupath?</p>
            </div>
            <hr className="border-white/20 mb-6 md:mb-8" />

            {/* Opening quote — hidden on very small screens */}
            <div className="absolute top-24 sm:top-28 left-4 sm:left-8 hidden sm:block">
              <span
                className="block text-6xl sm:text-8xl leading-none font-bold"
                style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "-4px", fontFamily: "Georgia, serif" }}
              >
                &#8220;
              </span>
            </div>

            {/* Content: stack on mobile, side-by-side on md+ */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pb-6">

              {/* Photo — top on mobile */}
              <div className="shrink-0 flex flex-col items-center gap-2 order-1 md:order-2">
                <div className="relative w-20 h-28 sm:w-28 sm:h-36 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200"
                    alt="Aliph HKM"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <span className="text-white text-xs font-medium">Aliph HKM</span>
              </div>

              {/* Quote text */}
              <div className="flex-1 max-w-2xl order-2 md:order-1">
                <p className="text-white/90 text-sm leading-relaxed text-center md:text-left">
                  Saya sangat terbantu dengan platform edukasi ini. Setelah menyelesaikan beberapa modul
                  belajar, saya menggunakan fitur analisis skill-nya dan benar-benar kagum dengan hasilnya.
                  Platform ini mampu mengidentifikasi kekuatan dan kelemahan saya secara detail, lalu
                  merekomendasikan materi lanjutan yang sangat sesuai. Tidak hanya itu, saya juga bisa
                  langsung melamar pekerjaan melalui sistem open recruitment yang tersedia. Rasanya seperti
                  belajar dan membangun karir di satu tempat yang terintegrasi. Sangat relevan dan efisien
                  untuk generasi sekarang!
                </p>
              </div>

            </div>

            {/* Closing quote */}
            <div className="absolute bottom-0 right-4 sm:right-8">
              <span
                className="block text-6xl sm:text-8xl leading-none font-bold"
                style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "-4px", fontFamily: "Georgia, serif" }}
              >
                &#8221;
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}