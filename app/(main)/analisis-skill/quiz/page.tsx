"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

const questions = [
  { id: 1, text: "Saya merasa tertantang untuk memahami dan menyelesaikan masalah-masalah teknis secara sistematis." },
  { id: 2, text: "Saya memiliki ketertarikan terhadap proses pengembangan aplikasi atau website." },
  { id: 3, text: "Saya memperhatikan tata letak dan estetika kualitas aplikasi atau website." },
  { id: 4, text: "Saya mampu dalam menginterpretasikan data dan mencari pola di dalamnya." },
  { id: 5, text: "Saya tertarik untuk mempelajari cara kerja sistem backend, server, atau jaringan." },
  { id: 6, text: "Saya lebih menyukai pekerjaan yang melibatkan pemikiran analisis logis atau penyusunan algoritma." },
  { id: 7, text: "Saya senang belajar teknologi baru untuk meningkatkan kompetensi saya di bidang teknologi." },
  { id: 8, text: "Saya merasa nyaman belajar dalam tim untuk mencapai tujuan bersama." },
  { id: 9, text: "Saya mudah menyesuaikan konsep teknis kepada orang yang tidak memahami teknologi." },
  { id: 10, text: "Saya aktif mencari sumber belajar baru untuk meningkatkan kemampuan di bidang teknologi." },
];

const scaleLabels = ["Setuju", "", "", "", "", "", "Tidak Setuju"];

export default function QuizPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentAnswer = answers[questions[currentQ]?.id];

  const handleAnswer = (val: number) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: val }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((p) => p + 1);
    } else {
      router.push("/analisis-skill/result");
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((p) => p - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-primary text-white py-10 sm:py-12 relative overflow-hidden">
        <div className="wave-decoration" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-accent text-sm font-medium mb-2">Analisis Skill by Edupath</p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-snug">
            Temukan Keahlian pada diri anda
          </h1>
        </div>
      </section>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2">
            <span>Pertanyaan {currentQ + 1} dari {questions.length}</span>
            <span>{Math.round(((currentQ + 1) / questions.length) * 100)}% selesai</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="card p-5 sm:p-8 mb-5 sm:mb-6">
          <p className="text-sm text-primary font-medium mb-2 sm:mb-3">Pertanyaan {currentQ + 1}</p>
          <h2 className="text-base sm:text-lg font-semibold text-navy mb-6 sm:mb-8 leading-relaxed">
            {questions[currentQ].text}
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span className="font-medium text-green-600">Setuju</span>
              <span className="font-medium text-red-500">Tidak Setuju</span>
            </div>

            <div className="flex justify-between gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                <button
                  key={val}
                  onClick={() => handleAnswer(val)}
                  className={`flex-1 py-2.5 sm:py-3 rounded-xl border-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 min-w-0 ${
                    currentAnswer === val
                      ? "border-primary bg-primary text-white shadow-glow"
                      : "border-gray-200 text-gray-500 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-400 px-1">
              {scaleLabels.map((l, i) => (
                <span key={i} className="flex-1 text-center first:text-left last:text-right">{l}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            className="btn-secondary flex items-center gap-1.5 sm:gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Sebelumnya</span>
          </button>

          <div className="hidden sm:flex gap-1 flex-wrap justify-center">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentQ
                    ? "bg-primary w-6"
                    : answers[questions[i].id]
                      ? "bg-primary/40 w-2"
                      : "bg-gray-200 w-2"
                }`}
              />
            ))}
          </div>

          <span className="sm:hidden text-xs text-gray-400 font-medium">
            {currentQ + 1} / {questions.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className="btn-primary flex items-center gap-1.5 sm:gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm shrink-0"
          >
            {currentQ === questions.length - 1 ? (
              <><CheckCircle className="w-4 h-4" /> <span>Selesai</span></>
            ) : (
              <><span className="hidden xs:inline sm:inline">Selanjutnya</span> <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}