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
    <div className="min-h-screen bg-white text-slate-700 font-sans pb-10">
      <section className="w-full px-4 sm:px-6 lg:px-10 pt-6 md:pt-8">
        <div className="relative w-full rounded-2xl overflow-hidden px-6 py-10 md:px-10 md:py-14 bg-primary min-h-[180px] md:h-60 flex items-center">
          <svg
            className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20 pointer-events-none"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMaxYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
            <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
          </svg>
          <div className="relative z-10">
            <p className="text-white/60 text-[10px] md:text-xs font-semibold mb-2 tracking-widest uppercase">Lowongan Pekerjaan</p>
            <h1 className="text-white font-bold text-2xl md:text-4xl leading-tight md:leading-snug">{job.title}</h1>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 space-y-6">

        <Link href="/info-loker" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors text-xs md:text-sm font-medium">
          <ChevronLeft className="w-4 h-4" /> Kembali ke Jelajah Karir
        </Link>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center border border-gray-50">
              {job.companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-10 h-10 text-gray-200" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 truncate">{job.title}</h2>
              <div className="flex flex-col gap-1 text-xs md:text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>51–100 Karyawan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50">
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={handleShare}
                  className={clsx(
                    "p-3 rounded-xl transition-all border",
                    shareState !== "idle" ? "text-green-600 bg-green-50 border-green-100" : "text-slate-400 border-gray-100 hover:bg-slate-50"
                  )}
                >
                  {shareState === "copied" ? <Copy className="w-5 h-5" /> : shareState === "shared" ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                </button>
                {shareState !== "idle" && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg shadow-sm z-10">
                    {shareState === "copied" ? "Link disalin!" : "Dibagikan!"}
                  </span>
                )}
              </div>

              <button
                onClick={handleBookmark}
                className={clsx(
                  "p-3 rounded-xl transition-all border",
                  bookmarked ? "text-navy bg-primary/5 border-navy/10" : "text-slate-400 border-gray-100 hover:bg-slate-50"
                )}
              >
                <Bookmark className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} />
              </button>
            </div>

            <Link href={`/info-loker/${job.id}/apply`} className="flex-1 lg:flex-none text-center bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-navy/20 transition-all active:scale-95">
              Lamar Cepat
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 border border-gray-100 md:rounded-2xl overflow-hidden bg-white shadow-sm rounded-xl">
          <div className="px-6 py-4 md:px-8 md:py-6 md:border-r border-gray-100">
            <p className="text-[10px] md:text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Pengalaman</p>
            <p className="text-sm md:text-base font-bold text-slate-800">0–1 Tahun</p>
          </div>
          <div className="px-6 py-4 md:px-8 md:py-6 md:border-r border-gray-100 bg-gray-50/30 md:bg-transparent">
            <p className="text-[10px] md:text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Deadline</p>
            <p className="text-sm md:text-base font-bold text-slate-800">{formatDate(job.deadline)}</p>
          </div>
          <div className="px-6 py-4 md:px-8 md:py-6">
            <p className="text-[10px] md:text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Tipe</p>
            <span className="inline-block px-3 py-1 rounded-lg border border-navy/20 text-navy text-[11px] font-bold bg-primary/5">{job.type}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-navy rounded-full" />
              Deskripsi Pekerjaan
            </h3>
            <ul className="space-y-3">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-600 leading-relaxed">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy/30 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-navy rounded-full" />
              Kualifikasi
            </h3>
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-600 leading-relaxed">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy/30 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-slate-900">Keahlian Utama</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-[11px] md:text-xs font-bold border border-slate-100 hover:border-navy/20 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 pt-4">
          <button
            onClick={handleBookmark}
            className={clsx(
              "w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold transition-all px-6 py-3.5 rounded-xl border",
              bookmarked
                ? "border-red-100 text-red-500 bg-red-50 hover:bg-red-100"
                : "border-gray-100 text-slate-400 hover:text-navy hover:border-navy/20 hover:bg-primary/5"
            )}
          >
            <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
            {bookmarked ? "Hapus Simpanan" : "Simpan Lowongan"}
          </button>

          <Link href={`/info-loker/${job.id}/apply`} className="w-full sm:w-auto text-center bg-primary text-white px-12 py-4 rounded-xl font-bold shadow-lg shadow-navy/10 hover:shadow-navy/20 transition-all active:scale-95">
            Lamar Sekarang
          </Link>
        </div>

      </main>
    </div>
  );
}