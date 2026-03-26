"use client";

import React, { useState } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";
import {
  ArrowLeft, Upload, CheckCircle2,
  MapPin, Building2, X, FileText
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
    <div className="w-full">
      <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
        {label}<span className="text-red-500 ml-0.5">*</span>
      </label>
      <input
        type={type}
        required
        placeholder={placeholder || label}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/30 transition-all bg-white"
      />
      {hint && <p className="text-[10px] md:text-[11px] text-primary mt-1.5 leading-relaxed">{hint}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans pb-10">
      
      {showSuccess && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-sm w-full text-center animate-in zoom-in-95 fade-in duration-300 relative">
            <button 
              onClick={() => setShowSuccess(false)} 
              className="absolute right-5 top-5 text-gray-300 hover:text-gray-500 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-primary" strokeWidth={2} />
            </div>

            <h3 className="text-lg font-bold text-primary mb-3">Pendaftaran Berhasil</h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              Anda telah berhasil mendaftar pada pekerjaan ini. Informasi selanjutnya akan dikirim melalui{" "}
              <span className="text-primary font-bold">Email</span> Anda.
            </p>

            <Link
              href="/info-loker"
              className="mt-8 block w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-navy/20 transition-all active:scale-[0.98]"
            >
              Kembali ke Info Loker
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 md:px-10 py-6">
        <Link
          href={`/info-loker/${job.id}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-navy text-xs md:text-sm font-semibold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-10">
        
        <div className="mb-8 md:mb-10 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-3">Lamar: {job.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs md:text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" /> {job.company}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {field("Nama Lengkap", "fullName", "text", "Masukkan nama sesuai KTP")}
            {field("Pendidikan Terakhir", "education", "text", "Contoh: S1 Teknik Informatika")}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {field("Nomor WhatsApp", "phone", "tel", "0812xxxx")}
            {field("Alamat Email", "email", "email", "nama@email.com")}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {field("Domisili Saat Ini", "domicile", "text", "Kota, Provinsi")}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
                Tanggal Lahir<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="date"
                required
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {field("Link Portfolio", "portfolio", "url", "https://", "Dapat berupa link Google Drive, GitHub, atau Behance.")}
            
            <div>
              <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
                Upload CV / Resume<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div 
                onClick={() => document.getElementById("cv-upload")?.click()}
                className={clsx(
                  "relative w-full border-2 border-dashed rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all group",
                  cvFile ? "border-navy/30 bg-navy/5" : "border-gray-200 hover:border-navy/20 bg-white"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    cvFile ? "bg-primary text-white" : "bg-gray-100 text-gray-400 group-hover:bg-navy/10 group-hover:text-navy"
                  )}>
                    {cvFile ? <FileText className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <p className={clsx(
                      "text-xs font-bold truncate",
                      cvFile ? "text-navy" : "text-gray-400"
                    )}>
                      {cvFile ? cvFile.name : "Pilih file CV"}
                    </p>
                    <p className="text-[10px] text-gray-400">PDF, DOC (Maks. 10MB)</p>
                  </div>
                </div>
                <input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50/30 p-6 rounded-2xl border border-gray-100">
            <label className="block text-sm font-bold text-slate-800 mb-4">
              Total Pengalaman Kerja<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {experienceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setExperience(opt)}
                  className={clsx(
                    "px-4 py-3 rounded-xl text-xs font-bold transition-all border text-center",
                    experience === opt 
                      ? "bg-primary text-white border-navy" 
                      : "bg-white text-slate-500 border-gray-100 hover:border-navy/20"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
            >
              Kirim Lamaran
            </button>
            <p className="text-[10px] text-center text-slate-400 px-4">
              Dengan menekan tombol di atas, Anda menyetujui syarat dan ketentuan yang berlaku di platform Edupath.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}