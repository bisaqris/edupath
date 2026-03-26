"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export default function RiwayatKursusPage() {
  const kursus = [
    { title: "Front-End Development Fundamental", progress: 100 },
    { title: "Back-End Development Fundamental", progress: 87 },
    { title: "Development Front-End With React", progress: 90 },
    { title: "Back-End Development With NodeJS", progress: 39 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-navy mb-8">Riwayat Kursus</h2>
      <div className="grid gap-4">
        {kursus.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-6 bg-slate-50 rounded-md border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className={clsx(
                "w-10 h-10 rounded-md flex items-center justify-center shadow-sm transition-colors",
                item.progress === 100 ? "bg-green-500 text-white" : "bg-white text-primary"
              )}>
                {item.progress === 100 ? <CheckCircle2 size={20} /> : <GraduationCap size={20} />}
              </div>
              <span className="font-bold text-navy group-hover:text-primary transition-colors">{item.title}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:block w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
              </div>
              <span className="text-sm font-black text-navy w-12 text-right">{item.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GraduationCap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
);