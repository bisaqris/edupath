"use client";

import React, { useState } from "react";
import { Upload, X, FileText, Link as LinkIcon, Github, Linkedin } from "lucide-react";
import { clsx } from "clsx";

export default function LinkPortofolioPage() {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-navy mb-2">Link Portofolio</h2>
                <p className="text-slate-400 text-sm">Bagikan tautan profesional kamu untuk memudahkan rekruter meninjau hasil karyamu.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Linkedin size={12} className="text-primary" /> Link Akun LinkedIn
                    </label>
                    <input 
                        type="url" 
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-slate-50 border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all text-navy" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <LinkIcon size={12} className="text-primary" /> Link Portofolio (Website/Behance)
                    </label>
                    <input 
                        type="url" 
                        placeholder="https://myportfolio.com"
                        className="w-full bg-slate-50 border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all text-navy" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Github size={12} className="text-primary" /> Link Repository Github
                    </label>
                    <input 
                        type="url" 
                        placeholder="https://github.com/username"
                        className="w-full bg-slate-50 border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all text-navy" 
                    />
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Upload File Portofolio (PDF/ZIP)</label>
                
                {!file ? (
                    <label 
                        className={clsx(
                            "border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer group flex flex-col items-center justify-center",
                            dragActive ? "border-primary bg-primary/5" : "border-slate-100 bg-slate-50/50 hover:border-primary/30"
                        )}
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                    >
                        <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.zip,.rar" />
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm font-bold text-slate-600">File Upload</p>
                        <p className="text-xs text-slate-400 mt-1">Drag & Drop files, or <span className="text-primary font-bold">Browse</span></p>
                        <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-tighter">Support file .jpg, .jpeg, .png, .pdf (max 16MB)</p>
                    </label>
                ) : (
                    <div className="flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10 animate-in zoom-in-95">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-navy truncate max-w-[200px] md:max-w-md">{file.name}</p>
                                <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setFile(null)}
                            className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                <p className="text-[10px] text-slate-400 italic">Upload file pendukung, bisa berupa PDF hasil kurasi karya atau sertifikat kompetensi lainnya.</p>
            </div>

            <div className="pt-4">
                <button className="cursor-pointer bg-navy hover:bg-primary text-white px-10 py-4 rounded-md font-bold text-sm hover:shadow-md hover:shadow-navy/20 transition-all active:scale-95">
                    Update Portofolio
                </button>
            </div>
        </div>
    );
}