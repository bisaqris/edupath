import Link from "next/link";
import { ArrowRight, Target, BarChart3, Lightbulb, CheckCircle } from "lucide-react";
import { skillCategories } from "@/lib/data";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analisis Skill",
    description: "Analisis kemampuan dirimu untuk karir yang lebih baik.",
};

export default function AnalisisSkillPage() {
    return (
        <div className="min-h-screen flex flex-col py-10">
            <section className="w-full px-4 sm:px-6 lg:px-10 pt-6 md:pt-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-white relative w-full rounded-2xl overflow-hidden px-6 py-12 md:px-10 md:py-16 bg-primary">
                        <svg className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20 pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice">
                            <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
                            <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
                        </svg>
                        <div className="relative z-10 max-w-2xl">
                            <p className="text-sm font-medium mb-2">Analisis Skill by Edupath</p>
                            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Temukan Keahlian Diri Anda</h1>
                            <p className="text-white/70 max-w-2xl leading-relaxed mb-8">
                                Setiap individu memiliki kekuatan unik. Identifikasi potensi terbaik Anda dan dapatkan rekomendasi karir yang tepat sasaran.
                            </p>
                            <Link href="/analisis-skill/quiz" className=" inline-flex items-center gap-2">
                                Mulai Analisis <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-navy mb-4">Cara Kerja</h2>
                            <ul className="space-y-4 mb-8">
                                {[
                                    { n: "01", title: "Jawab 10 pertanyaan singkat", desc: "Setiap pertanyaan mengukur preferensi dan kekuatan alami Anda." },
                                    { n: "02", title: "Gunakan skala 1–7", desc: "Jawaban jujur menghasilkan analisis yang lebih akurat." },
                                    { n: "03", title: "Dapatkan hasil analisis instan", desc: "Lihat diagram kecenderungan, rekomendasi karir, dan kursus yang cocok." },
                                ].map((step) => (
                                    <li key={step.n} className="flex gap-4">
                                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">{step.n}</div>
                                        <div>
                                            <p className="font-semibold text-navy mb-1">{step.title}</p>
                                            <p className="text-sm text-gray-500">{step.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/analisis-skill/quiz" className="btn-primary inline-flex items-center gap-2">
                                Mulai Sekarang <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Target, title: "Identifikasi Potensi", desc: "Temukan kekuatan tersembunyi Anda" },
                                { icon: BarChart3, title: "Analisis Mendalam", desc: "Data visual yang mudah dipahami" },
                                { icon: Lightbulb, title: "Rekomendasi Karir", desc: "Jalur karir yang sesuai profil Anda" },
                                { icon: CheckCircle, title: "Kursus Personal", desc: "Belajar sesuai kebutuhan spesifik" },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="card p-5 text-center">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="font-semibold text-navy text-sm mb-1">{title}</p>
                                    <p className="text-xs text-gray-500">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="pb-12 px-6 lg:px-0 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-navy mb-10 tracking-tight">Pilih Bidang Analisis</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skillCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/analisis-skill/quiz?category=${cat.id}`}
                                className="group relative h-80 rounded-4xl overflow-hidden shadow-xl shadow-navy/10 transition-all duration-500 hover:-translate-y-2 active:scale-95"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-black/10 opacity-50" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                                    <h3 className="font-bold text-white text-xl md:text-2xl leading-tight mb-3 transform transition-transform duration-500 group-hover:-translate-y-2 tracking-tight">
                                        {cat.name}
                                    </h3>

                                    <p className="text-white/80 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-3 font-medium">
                                        {cat.desc}
                                    </p>

                                    <div className="mt-6 flex items-center gap-3">
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Mulai Analisis</span>
                                        <div className="h-px w-8 bg-white" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}