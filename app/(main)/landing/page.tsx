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
      <div className="relative h-64 md:h-108 w-full my-8 max-w-7xl mx-auto">
        <Image src={"/images/banner.png"} alt="Banner" className="w-full h-auto" fill />
      </div>

      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-center text-4xl font-display font-semibold mb-10">
            <span className="text-primary">Program </span>
            <span className="text-navy">Kami</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-gray-100 bg-white px-8 pt-8 pb-10"
              >
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
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

      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">

          <h2 className="text-center text-4xl font-display font-semibold mb-10">
            <span className="text-primary">Kenapa Edupath</span>
            <span className="text-navy"> Berbeda</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            <div className="divide-y divide-gray-100">
              {whyItems.map((item, i) => (
                <div key={i} className="overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full py-4 flex justify-between items-center text-left group"
                  >
                    <span className={clsx(
                      "text-lg font-medium transition-colors duration-200",
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
                    <p className="pb-4 text-base text-gray-500 leading-relaxed pr-6">
                      {item.detail ?? "Kualitas terjamin dengan standar industri internasional."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-40 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
                  fill
                  className="object-cover rounded-xl"
                  alt="Students"
                />
              </div>
              <div className="relative h-40 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400"
                  fill
                  className="object-cover rounded-xl"
                  alt="Learning"
                />
              </div>
              <div className="relative h-52 w-full col-span-2">
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

      <section className="w-full py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href="/auth/login"
                className="relative h-36 rounded-xl overflow-hidden group block"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/20 to-transparent" />
                <span className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-semibold px-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-2xl px-10 pt-10 pb-6 relative bg-primary"
          >
            <div className="text-center mb-5">
              <h2 className="text-white text-2xl font-display font-bold">Testimoni</h2>
              <p className="text-blue-200 text-sm mt-1">Apa kata mereka tentang Edupath?</p>
            </div>
            <hr className="border-white/20 mb-8" />

            <div className="absolute top-30 left-8 self-center">
              <span
                className="block text-8xl leading-none font-bold"
                style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "-4px", fontFamily: "Georgia, serif" }}
              >
                &#8220;
              </span>
            </div>
            <div className="flex items-center justify-center gap-6 pb-6">


              <div className="flex-1 max-w-2xl">
                <p className="text-white/90 text-sm leading-relaxed">
                  Saya sangat terbantu dengan platform edukasi ini. Setelah menyelesaikan beberapa modul
                  belajar, saya menggunakan fitur analisis skill-nya dan benar-benar kagum dengan hasilnya.
                  Platform ini mampu mengidentifikasi kekuatan dan kelemahan saya secara detail, lalu
                  merekomendasikan materi lanjutan yang sangat sesuai. Tidak hanya itu, saya juga bisa
                  langsung melamar pekerjaan melalui sistem open recruitment yang tersedia. Rasanya seperti
                  belajar dan membangun karir di satu tempat yang terintegrasi. Sangat relevan dan efisien
                  untuk generasi sekarang!
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="relative w-28 h-36 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200"
                    alt="Aliph HKM"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <span className="text-white text-xs font-medium">Aliph HKM</span>
              </div>

            </div>

            <div className="absolute bottom-0 right-8">
              <span
                className="block text-8xl leading-none font-bold"
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