"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import { featuredCourses } from "@/lib/data";
import { PlayCircle, CheckCircle2, ArrowLeft, Send, Lock, Trophy, Star, Clock, RotateCcw, Download, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

// ─── Quiz Data ───────────────────────────────────────────────────────────────
const quizQuestions = [
    {
        id: 1,
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Marking Language",
            "HyperMarker",
            "Super Hyper Language",
            "Hypertext Language",
        ],
        correct: 0,
    },
    {
        id: 2,
        question: "Apa fungsi dari CSS?",
        options: [
            "Styling HTML",
            "Styling render",
            "Styling",
            "Styling animate",
        ],
        correct: 0,
    },
    {
        id: 3,
        question: "Tag HTML yang digunakan untuk membuat heading terbesar adalah?",
        options: ["<h6>", "<h1>", "<header>", "<title>"],
        correct: 1,
    },
    {
        id: 4,
        question: "Property CSS untuk mengubah warna teks adalah?",
        options: ["font-color", "text-color", "color", "foreground"],
        correct: 2,
    },
    {
        id: 5,
        question: "Selector CSS yang benar untuk elemen dengan id 'navbar' adalah?",
        options: [".navbar", "#navbar", "*navbar", "id=navbar"],
        correct: 1,
    },
];

// ─── Types ───────────────────────────────────────────────────────────────────
type ViewType = "material" | "forum" | "quiz" | "quiz-active" | "quiz-result" | "certificate";

export default function CourseLearnPage({ params }: { params: Promise<{ course: string }> }) {
    const { course: courseSlug } = use(params);
    const course = featuredCourses.find((c) => c.slug === courseSlug) || featuredCourses[0];

    const [view, setView] = useState<ViewType>("material");
    const [activeLesson, setActiveLesson] = useState(0);

    // Quiz state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
    const [score, setScore] = useState(0);

    const syllabus = [
        { title: "Pengenalan HTML", type: "video", duration: "12:40", isLocked: false, content: "Di materi ini, kita akan membahas instalasi tools utama seperti VS Code, Node.js, dan ekstensi yang diperlukan untuk menunjang produktivitas coding." },
        { title: "Pengenalan CSS", type: "video", duration: "18:20", isLocked: false, content: "Mempelajari perbedaan antara tag div biasa dengan elemen semantik seperti <header>, <main>, dan <footer> untuk optimasi SEO." },
        { title: "Quiz 1", type: "quiz", duration: "10 Menit", isLocked: false, content: "Uji pemahamanmu mengenai tag dasar dan struktur dokumen web sebelum lanjut ke styling." },
        { title: "Pengenalan JavaScript", type: "video", duration: "25:15", isLocked: true, content: "Belajar konsep Utility-First CSS dan bagaimana membuat layout responsif dengan cepat menggunakan Tailwind." },
        { title: "Latihan membuat website sederhana", type: "practice", duration: "45:00", isLocked: true, content: "Tugas praktek: Buatlah sebuah sidebar dan navbar menggunakan grid/flexbox yang sudah dipelajari." },
        { title: "Final Quiz", type: "quiz", duration: "20 Soal", isLocked: true, content: "Ujian akhir untuk mendapatkan sertifikat penyelesaian kursus." },
    ];

    // ── Quiz Logic ────────────────────────────────────────────────────────────
    const handleSelectAnswer = (optionIndex: number) => {
        const updated = [...selectedAnswers];
        updated[currentQuestion] = optionIndex;
        setSelectedAnswers(updated);
    };

    const handleSubmitQuiz = () => {
        let correct = 0;
        quizQuestions.forEach((q, i) => {
            if (selectedAnswers[i] === q.correct) correct++;
        });
        setScore(Math.round((correct / quizQuestions.length) * 100));
        setView("quiz-result");
    };

    const handleRetakeQuiz = () => {
        setSelectedAnswers(Array(quizQuestions.length).fill(null));
        setCurrentQuestion(0);
        setView("quiz-active");
    };

    const isPassed = score >= 70;

    const startQuiz = () => {
        setSelectedAnswers(Array(quizQuestions.length).fill(null));
        setCurrentQuestion(0);
        setView("quiz-active");
    };

    const goToLesson = (index: number) => {
        setActiveLesson(index);
        const type = syllabus[index].type;
        if (type === "quiz") {
            setView("quiz");
        } else {
            setView("material");
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="w-full bg-white min-h-screen font-sans">
            <div className="max-w-360 mx-auto px-6 py-6">

                {/* Header */}
                <div className="relative flex items-center justify-between mb-10">
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-500 hover:text-navy text-sm font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="text-xl md:text-2xl font-bold text-navy truncate max-w-75 md:max-w-md">{course.title}</h1>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Modul {activeLesson + 1} dari {syllabus.length}</p>
                    </div>
                    <div className="w-20" />
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* ── Sidebar ── */}
                    <aside className="w-full lg:w-70 shrink-0 sticky top-24 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                        <div className="mb-4 px-2">
                            <h3 className="font-bold text-navy text-sm">Daftar Kurikulum</h3>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${(activeLesson / (syllabus.length - 1)) * 100}%` }} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {syllabus.map((item, index) => (
                                <button
                                    key={index}
                                    disabled={item.isLocked}
                                    onClick={() => goToLesson(index)}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-2xl text-xs font-medium transition-all flex items-center justify-between",
                                        activeLesson === index
                                            ? "bg-white text-navy font-bold shadow-md border border-gray-100"
                                            : item.isLocked
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-500 hover:bg-white hover:shadow-sm"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="opacity-40">{String(index + 1).padStart(2, "0")}</span>
                                        <span className="truncate max-w-36">{item.title}</span>
                                    </div>
                                    {item.isLocked
                                        ? <Lock className="w-3.5 h-3.5 shrink-0" />
                                        : <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                                    }
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setView("forum")}
                            className={clsx(
                                "w-full mt-8 py-4 rounded-2xl font-bold text-sm transition-all border-2",
                                view === "forum" ? "bg-navy text-white border-navy shadow-lg" : "border-navy text-navy hover:bg-navy/5"
                            )}
                        >
                            Forum Diskusi
                        </button>
                    </aside>

                    {/* ── Content Area ── */}
                    <main className="flex-1 w-full max-w-4xl overflow-hidden">

                        {/* MATERIAL */}
                        {view === "material" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">{syllabus[activeLesson].type}</span>
                                    <span className="text-gray-400 text-xs">•</span>
                                    <span className="text-gray-400 text-xs font-medium">{syllabus[activeLesson].duration}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-navy">{syllabus[activeLesson].title}</h2>
                                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-navy border-4 border-white shadow-2xl shadow-navy/10">
                                    <Image src={course.thumbnail} alt="Thumbnail" fill className="object-cover opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-all">
                                            <PlayCircle className="w-12 h-12 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed space-y-6">
                                    <p className="text-lg font-medium text-navy/80">Deskripsi Materi:</p>
                                    <p>{syllabus[activeLesson].content}</p>
                                    <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100">
                                        <h4 className="font-bold text-navy mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" /> Goal Pembelajaran:
                                        </h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />Memahami alur kerja profesional dalam pengembangan perangkat lunak.</li>
                                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />Mampu mengimplementasikan desain ke dalam kode yang bersih.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-12 border-t border-gray-100">
                                    <button disabled={activeLesson === 0} onClick={() => goToLesson(activeLesson - 1)} className="text-navy font-bold text-sm disabled:opacity-30">Sebelumnya</button>
                                    <button
                                        onClick={() => {
                                            if (activeLesson < syllabus.length - 1) goToLesson(activeLesson + 1);
                                        }}
                                        className="px-12 py-4 bg-navy text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-navy/20 transition-all active:scale-95"
                                    >
                                        Selesai & Lanjut
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* FORUM */}
                        {view === "forum" && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-bold text-navy mb-8 text-center">Forum Diskusi : {course.title}</h2>
                                <div className="space-y-8 border-l-2 border-gray-100 pl-8 ml-4">
                                    <div className="relative space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                                            <span className="font-bold text-navy">MR. Supriyadi</span>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 italic text-gray-500">
                                            &quot;Hi Guys, I&apos;m trying to make my character layout word more active. Any suggestion guys?&quot;
                                        </div>
                                    </div>
                                    <div className="pl-10 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100" />
                                            <span className="font-bold text-navy text-sm">Aliph Hakim</span>
                                        </div>
                                        <p className="text-sm text-gray-600">I assume you&apos;re following a tutorial where responsive is not yet implemented...</p>
                                    </div>
                                </div>
                                <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                    <textarea placeholder="Ketik disini untuk membalas..." className="w-full h-32 p-4 outline-none resize-none text-sm" />
                                    <div className="flex justify-end border-t pt-4">
                                        <button className="bg-navy text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">Submit <Send className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* QUIZ START SCREEN */}
                        {view === "quiz" && (
                            <div className="max-w-2xl mx-auto py-10 animate-in zoom-in-95 duration-500">
                                <h2 className="text-3xl font-bold text-navy mb-2">{syllabus[activeLesson].title}</h2>
                                <p className="text-gray-500 text-sm mb-10">
                                    Siapkan dirimu! Kamu akan menjawab <strong>{quizQuestions.length} pertanyaan</strong>. Skor minimal kelulusan adalah <strong>70</strong> untuk mendapatkan sertifikat.
                                </p>
                                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm">
                                    <div className="grid grid-cols-3 gap-4 mb-10 text-center">
                                        <div className="bg-navy/5 rounded-2xl p-4">
                                            <p className="text-2xl font-bold text-navy">{quizQuestions.length}</p>
                                            <p className="text-xs text-gray-400 mt-1">Soal</p>
                                        </div>
                                        <div className="bg-navy/5 rounded-2xl p-4">
                                            <p className="text-2xl font-bold text-navy">70</p>
                                            <p className="text-xs text-gray-400 mt-1">Nilai Min.</p>
                                        </div>
                                        <div className="bg-navy/5 rounded-2xl p-4">
                                            <Clock className="w-6 h-6 text-navy mx-auto mb-1" />
                                            <p className="text-xs text-gray-400">Waktu Bebas</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={startQuiz}
                                        className="w-full py-4 bg-navy text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-navy/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Mulai Quiz <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* QUIZ ACTIVE */}
                        {view === "quiz-active" && (
                            <div className="max-w-2xl mx-auto py-6 animate-in fade-in slide-in-from-right-4 duration-400">
                                {/* Progress */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-400">Soal {currentQuestion + 1} dari {quizQuestions.length}</span>
                                    <span className="text-xs font-bold text-primary">{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                    />
                                </div>

                                {/* Number pills */}
                                <div className="flex gap-2 mb-8 flex-wrap">
                                    {quizQuestions.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentQuestion(i)}
                                            className={clsx(
                                                "w-8 h-8 rounded-full text-xs font-bold transition-all",
                                                i === currentQuestion
                                                    ? "bg-navy text-white shadow-md"
                                                    : selectedAnswers[i] !== null
                                                        ? "bg-primary/20 text-primary"
                                                        : "bg-gray-100 text-gray-400"
                                            )}
                                        >{i + 1}</button>
                                    ))}
                                </div>

                                {/* Question Card */}
                                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-6">
                                    <p className="text-lg font-bold text-navy mb-6">{quizQuestions[currentQuestion].question}</p>
                                    <div className="space-y-3">
                                        {quizQuestions[currentQuestion].options.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSelectAnswer(i)}
                                                className={clsx(
                                                    "w-full text-left px-5 py-4 rounded-2xl text-sm font-medium border-2 transition-all",
                                                    selectedAnswers[currentQuestion] === i
                                                        ? "border-navy bg-navy text-white shadow-md"
                                                        : "border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                )}
                                            >
                                                <span className="mr-3 font-bold opacity-50">{String.fromCharCode(65 + i)}.</span> {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Nav Buttons */}
                                <div className="flex justify-between items-center">
                                    <button
                                        disabled={currentQuestion === 0}
                                        onClick={() => setCurrentQuestion((p) => p - 1)}
                                        className="px-6 py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-bold text-sm disabled:opacity-30 hover:border-gray-400 transition-all"
                                    >Kembali</button>

                                    {currentQuestion < quizQuestions.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentQuestion((p) => p + 1)}
                                            className="px-8 py-3 bg-navy text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                                        >Selanjutnya <ChevronRight className="w-4 h-4" /></button>
                                    ) : (
                                        <button
                                            onClick={handleSubmitQuiz}
                                            className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                                        >Submit <CheckCircle2 className="w-4 h-4" /></button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* QUIZ RESULT */}
                        {view === "quiz-result" && (
                            <div className="max-w-2xl mx-auto py-10 animate-in zoom-in-95 duration-500 text-center">
                                <div className={clsx(
                                    "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg",
                                    isPassed ? "bg-green-500 shadow-green-200" : "bg-red-400 shadow-red-200"
                                )}>
                                    {isPassed
                                        ? <Trophy className="w-12 h-12 text-white" />
                                        : <RotateCcw className="w-10 h-10 text-white" />
                                    }
                                </div>

                                <h2 className="text-3xl font-bold text-navy mb-2">
                                    {isPassed ? "Selamat! Kamu Lulus 🎉" : "Belum Lulus"}
                                </h2>
                                <p className="text-gray-500 text-sm mb-8">
                                    {isPassed
                                        ? "Kamu berhasil melewati kuis! Silahkan ambil sertifikatmu."
                                        : "Jangan menyerah! Pelajari kembali materinya dan coba lagi."}
                                </p>

                                {/* Score Card */}
                                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-8">
                                    <p className={clsx("text-7xl font-extrabold mb-2", isPassed ? "text-green-500" : "text-red-400")}>{score}</p>
                                    <p className="text-gray-400 text-sm mb-6">/ 100 poin</p>

                                    <div className="flex justify-center gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={clsx("w-6 h-6",
                                                s <= Math.round(score / 20)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-200 fill-gray-200"
                                            )} />
                                        ))}
                                    </div>

                                    {/* Per-question review */}
                                    <div className="text-left space-y-3 border-t pt-6">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Review Jawaban</p>
                                        {quizQuestions.map((q, i) => {
                                            const isCorrect = selectedAnswers[i] === q.correct;
                                            return (
                                                <div key={i} className={clsx("flex items-start gap-3 p-3 rounded-xl text-sm", isCorrect ? "bg-green-50" : "bg-red-50")}>
                                                    <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5", isCorrect ? "bg-green-500" : "bg-red-400")}>
                                                        {isCorrect
                                                            ? <CheckCircle2 className="w-3 h-3 text-white" />
                                                            : <span className="text-white text-xs font-bold">✕</span>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className={clsx("font-medium", isCorrect ? "text-green-700" : "text-red-600")}>{q.question}</p>
                                                        {!isCorrect && (
                                                            <p className="text-xs text-gray-500 mt-0.5">Jawaban benar: {q.options[q.correct]}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {isPassed ? (
                                    <button
                                        onClick={() => setView("certificate")}
                                        className="w-full py-4 bg-navy text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-navy/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        Lihat Sertifikat <Trophy className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleRetakeQuiz}
                                        className="w-full py-4 bg-navy text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-navy/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw className="w-5 h-5" /> Ulangi Quiz
                                    </button>
                                )}
                            </div>
                        )}

                        {/* CERTIFICATE */}
                        {view === "certificate" && (
                            <div className="animate-in fade-in duration-700">
                                <h2 className="text-2xl font-bold text-navy mb-8 text-center">Sertifikat Penyelesaian : {course.title}</h2>

                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                    {/* Certificate Card */}
                                    <div className="flex-1">
                                        <div
                                            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
                                            style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #eef2ff 50%, #f0fdf4 100%)" }}
                                        >
                                            {/* Top accent bar */}
                                            <div className="h-3 w-full bg-linear-to-r from-navy via-primary to-navy" />

                                            <div className="p-10 relative">
                                                {/* Header row */}
                                                <div className="flex justify-between items-start mb-8">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">E</span>
                                                        </div>
                                                        <span className="font-bold text-navy text-sm tracking-wide">Edupath</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-gray-400">Certificate no.</p>
                                                        <p className="text-[10px] font-bold text-gray-600">EP8872234</p>
                                                    </div>
                                                </div>

                                                {/* Score badge (absolute) */}
                                                <div className="absolute top-12 right-10 w-16 h-16 rounded-full bg-navy/5 border-2 border-navy/10 flex flex-col items-center justify-center">
                                                    <p className="text-lg font-extrabold text-navy">{score}</p>
                                                    <p className="text-[9px] text-gray-400">skor</p>
                                                </div>

                                                {/* Main text */}
                                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Sertifikat Penyelesaian</p>
                                                <p className="text-sm text-gray-500 mb-4">untuk membuktikan bahwa</p>
                                                <h3 className="text-4xl font-bold text-navy mb-4" style={{ fontFamily: "Georgia, serif" }}>
                                                    Rahmadanis Danang K
                                                </h3>

                                                {/* Divider */}
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-navy/20 to-transparent" />
                                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-navy/20 to-transparent" />
                                                </div>

                                                <p className="text-sm text-gray-600 mb-1">telah berhasil menyelesaikan kursus</p>
                                                <p className="text-xl font-bold text-primary mb-1">{course.title}</p>
                                                <p className="text-sm text-gray-500 mb-10">dengan skor tertinggi</p>

                                                {/* Signature row */}
                                                <div className="flex justify-between items-end">
                                                    <p className="text-xs text-gray-400">May, 31, 2024</p>
                                                    <div className="text-right">
                                                        <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-8 mb-1 ml-auto">
                                                            <path d="M4 28 Q20 4 36 16 Q48 24 56 8 Q64 0 76 12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
                                                            <path d="M10 30 Q30 22 50 28 Q60 30 70 26" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                                        </svg>
                                                        <div className="border-t border-gray-300 pt-1">
                                                            <p className="text-xs font-bold text-navy">Muhammad Rasyid</p>
                                                            <p className="text-[10px] text-gray-400">Chief Executive Officer, Edupath</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom accent bar */}
                                            <div className="h-2 w-full bg-linear-to-r from-navy via-primary to-navy" />
                                        </div>

                                        <button className="mt-6 w-full px-10 py-4 bg-navy text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-navy/20 transition-all flex items-center justify-center gap-2">
                                            <Download className="w-5 h-5" /> Download Sertifikat
                                        </button>
                                    </div>

                                    <div className="w-full lg:w-60 shrink-0">
                                        <h3 className="font-bold text-navy text-sm mb-4">E-Learning Lainnya</h3>
                                        <div className="space-y-4">
                                            {featuredCourses.slice(0, 2).map((c, i) => (
                                                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                                                    <div className="relative h-28 bg-gray-100">
                                                        <Image src={c.thumbnail} alt={c.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="font-bold text-navy text-xs leading-snug mb-1">{c.title}</p>
                                                        <p className="text-[10px] text-gray-400 line-clamp-2">{c.description}</p>
                                                        <button className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1">
                                                            See Details <ChevronRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
}