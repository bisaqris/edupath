"use client";
import InputGroup from "@/components/ui/InputGroup";
import { Camera, Plus } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-slate-50">
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow relative bg-slate-100">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
              alt="Avatar"
              className="object-cover"
            />
          </div>
          <button className="cursor-pointer absolute -bottom-2 -right-2 bg-navy text-white p-2.5 rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-all">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <button className="cursor-pointer bg-navy text-white px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all">
            Pilih Foto
          </button>
          <p className="text-[10px] text-slate-400 max-w-50 leading-relaxed mx-auto md:mx-0">
            Gambar sebaiknya rasio 1:1 dan tidak lebih dari 2MB.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InputGroup label="Nama Lengkap" value="Armeider Burstenhag" />
        <InputGroup label="Username" value="Arbusten7" />
        <InputGroup label="Email" value="burstenhag@gmail.com" />
        <InputGroup label="Password" value="••••••••••••••••" type="password" />
      </div>

      <section className="pt-6">
        <div className="bg-slate-50/50 rounded-md p-8 border border-slate-100 space-y-6">
          <h3 className="font-bold text-navy">Pengalaman Kerja</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InputGroup label="Nama Perusahaan" value="PT Perkasa" isWhite />
            <InputGroup label="Pekerjaan" value="UI/UX Designer" isWhite />
          </div>
          <button className="cursor-pointer flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-bold text-xs shadow-md hover:bg-primary transition-all active:scale-95">
            <Plus size={16} /> TAMBAH PENGALAMAN KERJA
          </button>
        </div>
      </section>
    </div>
  );
}

