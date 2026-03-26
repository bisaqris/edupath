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
  { name: "Frontend Dev", score: 85, fill: "#1a5f7a" },
  { name: "Backend Dev", score: 72, fill: "#1a5f7a" },
  { name: "Data Science", score: 68, fill: "#e5a317" },
  { name: "UI/UX Design", score: 60, fill: "#e5a317" },
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
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-12 relative overflow-hidden">
        <div className="wave-decoration" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-accent text-sm font-medium mb-2">Hasil Skill Kamu Sudah Keluar</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold">The Logical Developer</h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Main Result ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Profile Summary */}
            <div className="card p-8">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Kamu memiliki kecenderungan yang kuat dalam bidang analisis logis dan pemecahan masalah
                sistematis. Dengan nilai kecenderungan teknis yang tinggi, kamu sangat cocok untuk
                berkarir di dunia pengembangan perangkat lunak, data engineering, atau sistem backend.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Dalam proses belajar kamu terlihat memiliki pola pikir yang terstruktur, dan kamu sering
                mencari jawaban yang efisien dan logis untuk setiap tantangan.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kamu memiliki kemampuan yang baik dalam berpikir, fokus, dan memahami pola — yang
                merupakan keterampilan kunci dalam dunia pengembangan teknologi modern.
              </p>
            </div>

            {/* Bar Chart */}
            <div className="card p-8">
              <h2 className="text-xl font-display font-bold text-navy mb-6">
                Diagram Presentase Kecenderungan
              </h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#666" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#666" }} domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="card p-8">
              <h2 className="text-xl font-display font-bold text-navy mb-6">
                Presentase Rekomendasi Karier
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ResponsiveContainer width={220} height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%" cy="50%"
                      innerRadius={55} outerRadius={90}
                      paddingAngle={3} dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 flex-1">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                      <span className="text-sm font-semibold text-navy">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Recommendations */}
            <div>
              <h2 className="text-xl font-display font-bold text-navy mb-2">Rekomendasi Karier</h2>
              <p className="text-sm text-gray-500 mb-6">Berdasarkan hasil analisis Anda</p>
              <div className="space-y-4">
                {careerRecs.map((rec) => (
                  <div key={rec.title} className="card p-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-primary">{rec.match}%</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy">{rec.title}</h3>
                      <p className="text-sm text-gray-500">{rec.desc}</p>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${rec.match}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div>
              <h2 className="text-xl font-display font-bold text-navy mb-6">
                Rekomendasi Belajar Selanjutnya
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {featuredCourses.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="space-y-5">

            {/* Result highlight */}
            <div className="card p-6 border-0" style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#1a5f7a 50%,#0a1628 100%)" }}>
              <div className="text-center text-white">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-display font-bold">92%</span>
                </div>
                <h3 className="font-display font-bold text-xl mb-1">The Logical Developer</h3>
                <p className="text-white/70 text-sm">Profil Karier Terbaik Anda</p>
              </div>
            </div>

            {/* Strengths */}
            <div className="card p-6">
              <h3 className="font-semibold text-navy mb-4">Kekuatan Anda</h3>
              <div className="space-y-3">
                {strengths.map((s) => (
                  <div key={s.skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700">{s.skill}</span>
                      <span className="font-medium text-navy">{s.val}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${s.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card p-6 space-y-3">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Unduh Hasil
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Bagikan
              </button>
              <Link
                href="/analisis-skill"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors py-2"
              >
                <RefreshCw className="w-4 h-4" /> Ulangi Tes
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}