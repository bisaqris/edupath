"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { jobs, formatDate } from "@/lib/data";
import {
  MapPin, Building2,
  Share2, Bookmark,
  ChevronLeft, Users, Copy, Check
} from "lucide-react";
import { clsx } from "clsx";

interface PageProps { params: Promise<{ id: string }> }

export default function JobDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const job = jobs.find((j) => j.id === resolvedParams.id) || jobs[0];

  const [bookmarked, setBookmarked] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");

  const handleBookmark = () => setBookmarked((prev) => !prev);

  const handleShare = async () => {
    const shareData = {
      title: `${job.title} — ${job.company}`,
      text: `Lowongan ${job.title} di ${job.company} (${job.location}). Gaji: ${job.salary}`,
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        setShareState("shared");
        setTimeout(() => setShareState("idle"), 2000);
        return;
      } catch { }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch { }
  };

  useEffect(() => {
    if (job) {
      document.title = `${job.title} - ${job.company} | Edupath`;
    }
  }, [job]);

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      <section className="w-full px-6 lg:px-10 pt-8">
        <div
          className="relative w-full rounded-2xl overflow-hidden px-10 py-14 bg-primary h-60"
        >
          <svg
            className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMaxYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
            <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
          </svg>
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-semibold mb-3 tracking-wide">Lowongan Pekerjaan</p>
            <h1 className="text-white font-bold text-3xl md:text-4xl leading-snug">{job.title}</h1>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <main className="max-w-5xl mx-auto px-6 lg:px-10 py-10 space-y-6">

        <Link href="/info-loker" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Jelajah Karir
        </Link>

        {/* ── INFO CARD ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center border border-gray-100">
            {job.companyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-10 h-10 text-gray-300" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{job.title}</h2>
            <div className="flex flex-col gap-1.5 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400 shrink-0" /><span>{job.company}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0" /><span>{job.location}</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400 shrink-0" /><span>51–100 Karyawan</span></div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Share */}
            <div className="relative">
              <button
                onClick={handleShare}
                title="Bagikan lowongan"
                className={clsx(
                  "p-2 rounded-lg transition-all",
                  shareState !== "idle" ? "text-green-500 bg-green-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                {shareState === "copied" ? <Copy className="w-5 h-5" /> : shareState === "shared" ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              </button>
              {shareState !== "idle" && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-lg shadow-sm z-10">
                  {shareState === "copied" ? "Link disalin!" : "Dibagikan!"}
                </span>
              )}
            </div>

            {/* Bookmark toggle */}
            <button
              onClick={handleBookmark}
              title={bookmarked ? "Hapus simpanan" : "Simpan lowongan"}
              className={clsx(
                "p-2 rounded-lg transition-all",
                bookmarked ? "text-navy bg-navy/5" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              )}
            >
              <Bookmark className="w-5 h-5 transition-all duration-200" fill={bookmarked ? "currentColor" : "none"} />
            </button>

            <Link href={`/info-loker/${job.id}/apply`} className="bg-navy text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-navy/20 transition-all active:scale-95 ml-1">
              Apply
            </Link>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-3 gap-0 border border-gray-200 rounded-2xl overflow-hidden bg-white">
          <div className="px-8 py-6 border-r border-gray-200">
            <p className="text-xs text-slate-500 mb-1">Pengalaman Bekerja</p>
            <p className="text-sm font-semibold text-slate-800">0–1 Tahun</p>
          </div>
          <div className="px-8 py-6 border-r border-gray-200">
            <p className="text-xs text-slate-500 mb-1">Batas Akhir Pendaftaran</p>
            <p className="text-sm font-semibold text-slate-800">{formatDate(job.deadline)}</p>
          </div>
          <div className="px-8 py-6">
            <p className="text-xs text-slate-500 mb-2">Tipe Pekerjaan</p>
            <span className="inline-block px-4 py-1 rounded-full border border-navy/30 text-navy text-xs font-semibold bg-navy/5">{job.type}</span>
          </div>
        </div>

        {/* ── DESKRIPSI PEKERJAAN ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Deskripsi Pekerjaan</h3>
          <ul className="space-y-2">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── KUALIFIKASI ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Kualifikasi</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── SKILLS ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Keahlian Utama</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span key={skill} className="px-4 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-xs font-semibold border border-slate-100">{skill}</span>
            ))}
          </div>
        </div>

        {/* ── APPLY CTA ── */}
        <div className="flex items-center justify-between pb-8 pt-2">
          <button
            onClick={handleBookmark}
            className={clsx(
              "flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2.5 rounded-xl border",
              bookmarked
                ? "border-navy/20 text-navy bg-navy/5 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                : "border-gray-200 text-slate-400 hover:text-navy hover:border-navy/20 hover:bg-navy/5"
            )}
          >
            <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
            {bookmarked ? "Tersimpan" : "Simpan Lowongan"}
          </button>

          <Link href={`/info-loker/${job.id}/apply`} className="bg-navy text-white px-12 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-navy/20 transition-all active:scale-95">
            Lamar Sekarang
          </Link>
        </div>

      </main>
    </div>
  );
}