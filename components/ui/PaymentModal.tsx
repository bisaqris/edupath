"use client";

import React, { useState } from "react";
import { X, CreditCard, Wallet, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    coursePrice: string;
}

export default function PaymentModal({ isOpen, onClose, courseTitle, coursePrice }: PaymentModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleNextStep = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(step + 1);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl relative">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-navy text-lg">Checkout Kursus</h3>
                        <p className="text-xs text-gray-400 truncate max-w-62.5">{courseTitle}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {step === 1 && (
                    <div className="p-8 space-y-6">
                        <p className="text-sm font-bold text-navy uppercase tracking-widest">Pilih Metode Pembayaran</p>
                        <div className="space-y-3">
                            <button onClick={() => setStep(2)} className="w-full p-4 border-2 border-primary rounded-2xl flex items-center justify-between group hover:bg-primary/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="w-6 h-6 text-primary" />
                                    <span className="font-bold text-navy">Kartu Kredit</span>
                                </div>
                                <div className="flex gap-2 opacity-60">
                                    <span className="text-[10px] font-bold">VISA / Master</span>
                                </div>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-100 rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed grayscale">
                                <div className="flex items-center gap-4">
                                    <Wallet className="w-6 h-6 text-gray-400" />
                                    <span className="font-bold text-gray-400">E-Wallet (OVO/Gopay)</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-8 space-y-6">
                        <div className="flex justify-between items-end mb-4">
                            <p className="text-xs font-bold text-navy uppercase tracking-widest">Detail Kartu</p>
                            <p className="text-xl font-bold text-primary">{coursePrice}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Depan</label>
                                    <input type="text" placeholder="Ahmad" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none text-sm font-medium" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Belakang</label>
                                    <input type="text" placeholder="Fauzi" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none text-sm font-medium" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Nomor Kartu</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none text-sm font-medium" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Masa Berlaku</label>
                                    <input type="text" placeholder="MM/YY" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none text-sm font-medium" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">CVC</label>
                                    <input type="password" placeholder="***" className="w-full border-b-2 border-gray-100 py-2 focus:border-primary outline-none text-sm font-medium" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleNextStep}
                            disabled={loading}
                            className="w-full py-4 bg-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Bayar Sekarang"}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="p-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-navy">Pembayaran Berhasil!</h2>
                            <p className="text-sm text-gray-500 mt-2">Selamat, kamu sudah terdaftar di kursus ini. Silahkan cek email atau dashboard untuk mulai belajar.</p>
                        </div>
                        <Link
                            href="/dashboard/kelas"
                            className="block w-full py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg transition-all text-center"
                            onClick={onClose}
                        >
                            Mulai Belajar Sekarang
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}