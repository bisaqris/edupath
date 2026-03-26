"use client";
import Link from "next/link";
import CourseCard from "@/components/ui/CourseCard";
import { featuredCourses } from "@/lib/data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
} from "recharts";
import { Download, Share2, RefreshCw } from "lucide-react";

const barData = [
  { name: "Frontend", score: 85, fill: "#1a5f7a" }, // Dipendekkan agar tidak overlap di mobile
  { name: "Backend", score: 72, fill: "#1a5f7a" },
  { name: "Data Sc", score: 68, fill: "#e5a317" },
  { name: "UI/UX", score: 60, fill: "#e5a317" },
  { name: "DevOps", score: 45, fill: "#1a5f7a" },
];

const pieData = [
  { name: "Frontend Dev", value: 40, color: "#1a5f7a" },
  { name: "Backend Dev", value: 30, color: "#00c2cb" },
  { name: "Data Science", value: 20, color: "#e5a317" },
  { name: "UI/UX", value: 10, color: "#6366f1" },
];

const careerRecs = [
  { title: "The Logical Developer", match: 92, desc: "Full-stack developer dengan keunggulan analitik tinggi" },
  { title: "Frontend Specialist", match: 85, desc: "Spesialis UI interaktif dan pengalaman pengguna" },
  { title: "Backend Engineer", match: 78, desc: "Arsitek sistem backend yang scalable" },
];

const strengths = [
  { skill: "Problem Solving", val: 90 },
  { skill: "Logical Thinking", val: 88 },
  { skill: "Technical Skills", val: 82 },
  { skill: "Attention to Detail", val: 78 },
  { skill: "Learning Agility", val: 75 },
];

export default function SkillResultPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-primary text-white py-10 md:py-16 relative overflow-hidden">
        <div className="wave-decoration opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <p className="text-accent text-xs md:text-sm font-medium mb-2 tracking-wide uppercase">
            Hasil Skill Kamu Sudah Keluar
          </p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
            The Logical Developer
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Grid: Stacked on Mobile, 3-cols on LG */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">

            {/* Description Card */}
            <div className="card p-5 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                <p>
                  Kamu memiliki kecenderungan yang kuat dalam bidang analisis logis dan pemecahan masalah
                  sistematis. Dengan nilai kecenderungan teknis yang tinggi, kamu sangat cocok untuk
                  berkarir di dunia pengembangan perangkat lunak, data engineering, atau sistem backend.
                </p>
                <p>
                  Dalam proses belajar kamu terlihat memiliki pola pikir yang terstruktur, dan kamu sering
                  mencari jawaban yang efisien dan logis untuk setiap tantangan.
                </p>
                <p>
                  Kamu memiliki kemampuan yang baik dalam berpikir, fokus, dan memahami pola — yang
                  merupakan keterampilan kunci dalam dunia pengembangan teknologi modern.
                </p>
              </div>
            </div>

            {/* Bar Chart Card */}
            <div className="card p-5 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-display font-bold text-navy mb-6">
                Diagram Presentase Kecenderungan
              </h2>
              <div className="h-[250 md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "#666" }}
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#666" }} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => [`${value}%`, "Score"]} />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={32}>
                      {barData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart Card */}
            <div className="card p-5 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-display font-bold text-navy mb-6">
                Presentase Rekomendasi Karier
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="w-full max-w-[200px] aspect-square">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%" cy="50%"
                        innerRadius="60%" outerRadius="90%"
                        paddingAngle={4} dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full sm:flex-1">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs md:text-sm text-gray-700 flex-1 font-medium">{item.name}</span>
                      <span className="text-xs md:text-sm font-bold text-navy">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Recommendations */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <h2 className="text-lg md:text-xl font-display font-bold text-navy">Rekomendasi Karier</h2>
                <p className="text-xs md:text-sm text-gray-500">Berdasarkan hasil analisis Anda</p>
              </div>
              <div className="grid gap-4">
                {careerRecs.map((rec) => (
                  <div key={rec.title} className="card p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-primary">{rec.match}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy text-sm md:text-base truncate">{rec.title}</h3>
                      <p className="text-xs md:text-sm text-gray-500 line-clamp-2">{rec.desc}</p>
                    </div>
                    <div className="w-full sm:w-24 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${rec.match}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Courses */}
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-display font-bold text-navy">
                Rekomendasi Belajar Selanjutnya
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {featuredCourses.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">

            {/* Top Match Profile Card */}
            <div className="card p-6 md:p-8 rounded-2xl border-0 shadow-lg"
              style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#1a5f7a 50%,#0a1628 100%)" }}>
              <div className="text-center text-white">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <span className="text-xl md:text-2xl font-display font-bold">92%</span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl mb-1">The Logical Developer</h3>
                <p className="text-white/70 text-xs md:text-sm">Profil Karier Terbaik Anda</p>
              </div>
            </div>

            {/* Strengths Card */}
            <div className="card p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy mb-5 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary rounded-full" />
                Kekuatan Anda
              </h3>
              <div className="space-y-4">
                {strengths.map((s) => (
                  <div key={s.skill}>
                    <div className="flex justify-between text-[11px] md:text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">{s.skill}</span>
                      <span className="font-bold text-navy">{s.val}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${s.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Card */}
            <div className="card p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <button className="w-full bg-primary hover:bg-navy text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                <Download className="w-4 h-4" /> Unduh Hasil
              </button>
              <button className="w-full bg-white border border-gray-200 hover:border-primary hover:text-primary text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm">
                <Share2 className="w-4 h-4" /> Bagikan
              </button>
              <Link
                href="/analisis-skill"
                className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-400 hover:text-primary transition-colors py-2 group"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                Ulangi Tes
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}