"use client";
import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { posts, communityCategories, getRelativeTime } from "@/lib/data";
import { Search, Plus, Heart, MessageCircle, Eye, X, Upload, ChevronRight, ChevronLeft } from "lucide-react";
import { clsx } from "clsx";

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const categoryList = communityCategories;

export default function KomunitasPage() {
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const toggleCategory = (cat: string) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategories, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
  };

  const handlePostSubmit = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    setShowModal(false);
    setNewPost({ title: "", content: "" });
    setUploadFile(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <title>Komunitas | Edupath</title>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-t-[2rem] sm:rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Buat Topik Baru</h3>
                <p className="text-slate-400 text-xs mt-1">Bagikan pemikiran atau pertanyaan Anda.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Topik</label>
                <input
                  type="text"
                  placeholder="Apa yang ingin Anda bahas?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-navy/5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Isi Pesan</label>
                <textarea
                  placeholder="Detail topik Anda..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-navy/5 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lampiran</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={clsx(
                    "border-2 border-dashed rounded-2xl p-6 md:p-8 text-center cursor-pointer transition-all",
                    dragActive ? "border-navy bg-primary/5" : "border-gray-100 bg-gray-50 hover:border-navy/20"
                  )}
                >
                  <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.mp4" className="hidden" onChange={handleFileInput} />
                  {uploadFile ? (
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                          <Upload className="w-5 h-5 text-navy" />
                        </div>
                        <div className="text-left truncate">
                          <p className="text-xs font-bold text-slate-700 truncate">{uploadFile.name}</p>
                          <p className="text-[10px] text-slate-400">{(uploadFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <X onClick={(e) => { e.stopPropagation(); setUploadFile(null); }} className="w-4 h-4 text-slate-300 hover:text-red-500" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs font-bold text-slate-600">Klik atau seret file ke sini</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-semibold">JPG, PNG, MP4 (MAX 16MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handlePostSubmit}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-navy/10 hover:shadow-navy/20 disabled:opacity-30 transition-all active:scale-[0.98]"
              >
                Posting Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="w-full px-4 sm:px-6 lg:px-10 pt-6 md:pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden px-6 py-12 md:px-10 md:py-16 bg-primary">
            <svg className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20 pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice">
              <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
              <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
            </svg>
            <div className="relative z-10 text-center md:text-left">
              <p className="text-white/60 text-[10px] md:text-xs font-bold mb-3 tracking-[0.2em] uppercase">Connect, Grow and Support</p>
              <h1 className="text-white font-bold text-2xl md:text-4xl leading-tight max-w-xl">
                Ciptakan topik, temukan inspirasi dan tumbuh bersama.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-28 space-y-6">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Buat Topik Baru
            </button>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Cari topik diskusi..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-4 focus:ring-navy/5 transition-all"
              />
            </div>

            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              {categoryList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 lg:w-full",
                    selectedCategories.includes(cat)
                      ? "bg-navy text-white border-navy shadow-md shadow-navy/10"
                      : "bg-white text-gray-600 border-gray-100 hover:border-navy/30"
                  )}
                >
                  <div className={clsx("w-4 h-4 rounded border transition-colors", selectedCategories.includes(cat) ? "bg-white border-white" : "border-gray-300")} />
                  <span className="text-sm font-medium whitespace-nowrap">{cat}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-4">
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <Link key={post.id} href={`/komunitas/${post.id}`} className="block group">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 hover:border-navy/20 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                        {post.image && (
                          <div className="w-full sm:w-28 h-40 sm:h-28 rounded-2xl overflow-hidden bg-gray-50 shrink-0 relative border border-gray-50">
                            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 bg-navy/5 text-navy text-[10px] font-bold rounded uppercase tracking-wider">{post.category}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{getRelativeTime(post.createdAt)}</span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2 line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {post.content}
                          </p>

                          <div className="flex items-center gap-5 pt-4 border-t border-gray-50 text-[11px] md:text-xs text-slate-400 font-semibold">
                            <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                              <Heart className={clsx("w-4 h-4", post.likes > 50 ? "fill-red-500 text-red-500" : "")} />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-navy transition-colors cursor-pointer">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-50">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700">Topik tidak ditemukan</h3>
                  <p className="text-slate-400 text-sm mt-1">Gunakan kata kunci lain atau bersihkan filter.</p>
                  <button onClick={() => { setSelectedCategories([]); setSearchQuery(""); }} className="mt-6 px-8 py-2.5 bg-navy text-white text-sm font-bold rounded-xl transition-all">Reset Semua Filter</button>
                </div>
              )}
            </div>

            {filteredPosts.length > 0 && (
              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-xs font-medium text-slate-400">
                  Menampilkan <span className="text-slate-800 font-bold">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredPosts.length)}</span> dari <span className="text-slate-800 font-bold">{filteredPosts.length}</span> diskusi
                </p>

                <div className="flex items-center gap-3">
                  <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 bg-gray-50 focus:outline-none"
                  >
                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n} / halaman</option>)}
                  </select>

                  <div className="flex items-center gap-1">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-navy hover:text-white disabled:opacity-20 transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                    <div className="px-3 text-xs font-bold text-navy">{currentPage} / {totalPages}</div>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-navy hover:text-white disabled:opacity-20 transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
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