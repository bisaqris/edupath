"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";

type JobType = "Full-Time" | "Part-Time" | "Remote" | "Hybrid" | "Internship";
import {
  Search, MapPin, Briefcase,
  ChevronLeft, ChevronRight, Building2,
  Banknote, Bookmark
} from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

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
      <section className="w-full px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden px-10 py-16 bg-primary shadow-xl shadow-primary/10 h-max"
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

            <div className="relative z-10 max-w-2xl">
              <p className="text-white/60 text-xs font-semibold mb-3 tracking-widest uppercase">
                Info Loker by Edupath
              </p>
              <h1 className="text-white font-bold text-3xl md:text-4xl leading-snug">
                Temukan lowongan yang cocok<br />untuk kamu
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex gap-8 items-start">

          <aside className="w-55 shrink-0 sticky top-28">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
              />
            </div>

            <div className="flex flex-col gap-3">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="w-4 h-4 rounded border-gray-300 text-navy focus:ring-navy/20 cursor-pointer accent-navy"
                  />
                  <span className={clsx(
                    "text-sm transition-colors",
                    selectedTypes.includes(type) ? "text-navy font-semibold" : "text-gray-600 group-hover:text-navy"
                  )}>{type}</span>
                </label>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <Link key={job.id} href={`/info-loker/${job.id}`} className="block group">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-navy/30 hover:shadow-md transition-all duration-200 relative">

                      <button
                        onClick={(e) => toggleSave(job.id, e)}
                        className="absolute top-4 right-4 p-1"
                      >
                        <Bookmark
                          className={clsx(
                            "w-4 h-4 transition-colors",
                            savedJobs.includes(job.id) ? "text-navy fill-navy" : "text-gray-300 hover:text-navy"
                          )}
                        />
                      </button>

                      <div className="flex items-start gap-4 pr-6">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                          {job.companyLogo ? (
                            <Image src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-8 h-8 text-gray-300" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                            <Banknote className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span>{job.salary} per bulan</span>
                          </div>

                          <h3 className="text-base font-bold text-gray-800 group-hover:text-navy transition-colors mb-1">
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-gray-400" />
                              <span>{job.company}</span>
                            </div>
                            <span className="font-medium text-gray-600">{job.type}</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                              <span>0 – 3 Tahun</span>
                            </div>
                          </div>

                          <div className="flex justify-end gap-6 mt-2 text-[11px] text-gray-400">
                            <span>Dibuat pada {new Date(job.postedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</span>
                            <span>Pendaftaran terakhir {new Date(job.deadline).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                  <Search className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-base font-bold text-gray-600">Tidak ada lowongan ditemukan</h3>
                  <p className="text-gray-400 text-sm mt-1">Coba ubah kata kunci atau reset filter.</p>
                  <button
                    onClick={() => { setSelectedTypes([]); setSearchQuery(""); }}
                    className="mt-4 text-navy text-sm font-semibold hover:underline"
                  >Reset Filter</button>
                </div>
              )}
            </div>

            {filteredJobs.length > 0 && (
              <div className="mt-6 flex items-center justify-between border border-gray-200 rounded-xl px-6 py-4 bg-white text-sm text-gray-500">
                <span>
                  Showing <strong className="text-gray-700">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredJobs.length)}</strong> data out of <strong className="text-gray-700">{filteredJobs.length}</strong>
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy/10 bg-white"
                  >
                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="text-gray-400">data per page</span>

                  <div className="flex items-center gap-1 ml-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
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