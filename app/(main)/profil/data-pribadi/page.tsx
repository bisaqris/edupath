"use client";
import InputGroup from "@/components/ui/InputGroup";
import React from "react";

export default function DataPribadiPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section>
        <h2 className="text-2xl font-bold text-navy mb-8">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <InputGroup label="First Name" value="Armeider" />
          <InputGroup label="Last Name" value="Burstenhag" />
          <InputGroup label="Jenis Kelamin" value="Laki-Laki" />
          <InputGroup label="Kota Asal" value="Jayapura" />
          <InputGroup label="Tanggal Lahir" value="30/02/2025" />
          <InputGroup label="Domisili" value="Jayapura, Papua" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-8">Contact</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <InputGroup label="Nomor Telepon Pribadi" value="+62 812-3456-7890" />
          <InputGroup label="Nomor Telepon Kerja" value="3121241253287350001" />
          <div className="md:col-span-2">
            <InputGroup label="Nomor Telepon Darurat" value="1234-LU-12345124123123-12312" />
          </div>
        </div>
      </section>

      <button className="cursor-pointer bg-navy hover:bg-primary text-white px-8 py-3.5 rounded-md font-bold text-sm hover:shadow-xl transition-all active:scale-95">
        Simpan Perubahan
      </button>
    </div>
  );
}