"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";
import {
  Search, MapPin, Briefcase,
  ChevronLeft, ChevronRight, Building2,
  Banknote, Bookmark
} from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

type JobType = "Full-Time" | "Part-Time" | "Remote" | "Hybrid" | "Internship";
const jobTypes: JobType[] = ["Full-Time", "Part-Time", "Remote", "Hybrid", "Internship"];
const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function InfoLokerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.skills ?? []).some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedTypes]);

  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleType = (type: JobType) => {
    setCurrentPage(1);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedJobs((prev) => prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <title>Info Loker | Edupath</title>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden px-6 py-12 md:px-10 md:py-16 bg-primary shadow-xl shadow-primary/10">
            <svg
              className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20 pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="xMaxYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
              <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
            </svg>

            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <p className="text-white/60 text-[10px] md:text-xs font-semibold mb-3 tracking-widest uppercase">
                Info Loker by Edupath
              </p>
              <h1 className="text-white font-bold text-2xl md:text-4xl leading-snug">
                Temukan lowongan yang cocok<br className="hidden md:block" /> untuk kamu
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-28 z-20 bg-white">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Cari posisi atau perusahaan..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 lg:w-full",
                    selectedTypes.includes(type)
                      ? "bg-navy text-white border-navy shadow-md shadow-navy/10"
                      : "bg-white text-gray-600 border-gray-100 hover:border-navy/30"
                  )}
                >
                  <div className={clsx(
                    "w-4 h-4 rounded flex items-center justify-center border transition-colors",
                    selectedTypes.includes(type) ? "bg-white border-white" : "border-gray-300"
                  )}>
                    {selectedTypes.includes(type) && <div className="w-2 h-2 bg-navy rounded-[1px]" />}
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">{type}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-4">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <Link key={job.id} href={`/info-loker/${job.id}`} className="block group">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 hover:border-navy/20 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 relative">

                      <button
                        onClick={(e) => toggleSave(job.id, e)}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm border border-gray-50 z-10"
                      >
                        <Bookmark
                          className={clsx(
                            "w-4 h-4 transition-colors",
                            savedJobs.includes(job.id) ? "text-navy fill-navy" : "text-gray-300 hover:text-navy"
                          )}
                        />
                      </button>

                      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center border border-gray-50">
                          {job.companyLogo ? (
                            <Image src={job.companyLogo} alt={job.company} width={80} height={80} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-8 h-8 text-gray-200" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex items-center gap-1.5 text-navy font-semibold text-[11px] md:text-xs mb-2 bg-navy/5 w-fit px-2 py-1 rounded-md">
                            <Banknote className="w-3.5 h-3.5 shrink-0" />
                            <span>{job.salary} / bulan</span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-primary transition-colors mb-2 leading-tight">
                            {job.title}
                          </h3>

                          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-gray-400" />
                              <span className="truncate">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                              <span className="font-medium text-gray-600">{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          </div>

                          <div className="mt-5 pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:justify-between gap-2 text-[10px] md:text-[11px] text-gray-400 italic">
                            <span>Diposting: {new Date(job.postedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</span>
                            <span className="text-red-400 font-medium">Deadline: {new Date(job.deadline).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Tidak ada lowongan</h3>
                  <p className="text-gray-400 text-sm mt-1">Coba gunakan kata kunci lain atau reset filter.</p>
                  <button
                    onClick={() => { setSelectedTypes([]); setSearchQuery(""); }}
                    className="mt-6 px-6 py-2 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy/90 transition-all"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

            {filteredJobs.length > 0 && (
              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100 rounded-2xl px-6 py-4 bg-white shadow-sm">
                <p className="text-xs md:text-sm text-gray-500 order-2 md:order-1">
                  Menampilkan <span className="font-bold text-gray-700">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredJobs.length)}</span> dari <span className="font-bold text-gray-700">{filteredJobs.length}</span> lowongan
                </p>

                <div className="flex items-center gap-4 order-1 md:order-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 hidden sm:block">Tampilkan</span>
                    <select
                      value={pageSize}
                      onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                      className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-gray-700 focus:outline-none bg-gray-50"
                    >
                      {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="px-4 text-xs font-bold text-navy">
                      {currentPage} / {totalPages}
                    </div>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}