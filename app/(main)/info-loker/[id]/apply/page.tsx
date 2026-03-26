"use client";

import React, { useState } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";
import {
  ArrowLeft, Upload, CheckCircle2,
  MapPin, Building2, X
} from "lucide-react";
import { clsx } from "clsx";

interface PageProps { params: Promise<{ id: string }> }

const experienceOptions = ["0-1 Tahun", "2-4 Tahun", "5-8 Tahun", ">9 Tahun"];

export default function ApplyPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const job = jobs.find((j) => j.id === resolvedParams.id) || jobs[0];

  const [showSuccess, setShowSuccess] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [experience, setExperience] = useState("");
  const [form, setForm] = useState({
    fullName: "", education: "",
    phone: "", email: "",
    domicile: "", dob: "",
    portfolio: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCvFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const field = (
    label: string,
    key: keyof typeof form,
    type = "text",
    placeholder = "",
    hint?: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}<span className="text-red-500 ml-0.5">*</span>
      </label>
      <input
        type={type}
        required
        placeholder={placeholder || label}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition-all bg-white"
      />
      {hint && <p className="text-[11px] text-primary mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">

      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full text-center animate-in zoom-in-95 fade-in duration-300">
            <div className="flex justify-end mb-2">
              <button onClick={() => setShowSuccess(false)} className="text-gray-300 hover:text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-24 h-24 rounded-full border-4 border-navy flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-navy" strokeWidth={1.5} />
            </div>

            <h3 className="text-base font-bold text-navy mb-3">Pendaftaran Berhasil</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Anda telah berhasil mendaftar pada pekerjaan ini, informasi selanjutnya akan diberikan melalui{" "}
              <span className="text-primary font-medium">email</span> anda.
            </p>

            <Link
              href="/info-loker"
              className="mt-8 block w-full py-3 bg-navy text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
            >
              Kembali ke Info Loker
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-6">
        <Link
          href={`/info-loker/${job.id}`}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-navy text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6 lg:px-10 pb-20">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Apply {job.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" /> {job.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid sm:grid-cols-2 gap-6">
            {field("Nama Lengkap", "fullName", "text", "Nama Lengkap")}
            {field("Pendidikan", "education", "text", "Pendidikan")}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {field("Nomor Telephone", "phone", "tel", "Nomor Telephone")}
            {field("Email", "email", "email", "Email")}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {field("Domisili", "domicile", "text", "Domisili")}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tanggal Lahir<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="date"
                required
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Link Portfolio<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://"
                value={form.portfolio}
                onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition-all bg-white"
              />
              <p className="text-[11px] text-primary mt-1">Portfolio dapat berupa link drive atau website portfolio anda.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Upload CV<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  placeholder="Upload CV"
                  value={cvFile ? cvFile.name : ""}
                  className="w-full border border-gray-200 rounded-lg pl-4 pr-12 py-2.5 text-sm text-slate-700 placeholder-gray-300 bg-white cursor-pointer"
                  onClick={() => document.getElementById("cv-upload")?.click()}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("cv-upload")?.click()}
                  className="absolute right-0 top-0 h-full px-3 bg-navy text-white rounded-r-lg flex items-center justify-center hover:bg-navy/90 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Upload logo dalam format PDF dengan max size 10MB.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Pengalaman<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {experienceOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="experience"
                    value={opt}
                    required
                    checked={experience === opt}
                    onChange={() => setExperience(opt)}
                    className="w-4 h-4 accent-navy cursor-pointer"
                  />
                  <span className={clsx(
                    "text-sm transition-colors",
                    experience === opt ? "text-navy font-medium" : "text-slate-500 group-hover:text-slate-700"
                  )}>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-navy text-white px-10 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-navy/20 transition-all active:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}