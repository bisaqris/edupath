"use client";
import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { posts, communityCategories, getRelativeTime } from "@/lib/data";
import { Search, Plus, Heart, MessageCircle, Eye, X, Upload, ChevronRight, ChevronLeft } from "lucide-react";
import { clsx } from "clsx";
import { Metadata } from "next";

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
    <div className="min-h-screen bg-white font-sans">
      <title>Komunitas | Edupath</title>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Buat Topik baru</h3>
                <p className="text-slate-400 text-xs mt-0.5">Ketik pertanyaan atau topik baru anda pada form dibawah ini.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mt-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Judul<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Judul"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Topik<span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  placeholder="Topik"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Upload File</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={clsx(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                    dragActive
                      ? "border-navy bg-navy/5"
                      : "border-gray-300 bg-gray-50 hover:border-navy/40 hover:bg-gray-100"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.mp4"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  {uploadFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                        <Upload className="w-5 h-5 text-navy" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-slate-700 truncate max-w-48">{uploadFile.name}</p>
                        <p className="text-xs text-slate-400">{(uploadFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setUploadFile(null); }}
                        className="ml-2 text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-6 h-6 text-slate-500" />
                      </div>
                      <p className="text-sm font-semibold text-slate-600">File Upload</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Drag & Drop files, or{" "}
                        <span className="font-bold text-slate-600">Browse</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Support file jpg, jpeg, png, mp4 (max file 16MB)</p>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Upload file pendukung, bisa berupa gambar ataupun video.</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handlePostSubmit}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="bg-navy text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-navy/20 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buat Topik
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="w-full px-6 lg:px-10 pt-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative w-full rounded-2xl overflow-hidden px-10 py-16 bg-primary"
          >
            <svg
              className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="xMaxYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="350" cy="0" r="180" fill="none" stroke="white" strokeWidth="30" />
              <circle cx="200" cy="320" r="130" fill="none" stroke="white" strokeWidth="30" />
            </svg>
            <div className="relative z-10">
              <p className="text-white/60 text-xs font-semibold mb-3 tracking-widest uppercase">
                Connect, Grow and Support
              </p>
              <h1 className="text-white font-bold text-3xl md:text-4xl leading-snug max-w-xl">
                Ciptakan topik, temukan inspirasi<br />dan tumbuh bersama.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex gap-8 items-start">

          <aside className="w-55 shrink-0 sticky top-28 space-y-4">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 bg-navy text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-navy/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Buat Topik Baru
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-navy/10 placeholder-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2.5 mt-1">
              {categoryList.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-gray-300 accent-navy cursor-pointer"
                  />
                  <span className={clsx(
                    "text-sm transition-colors",
                    selectedCategories.includes(cat) ? "text-navy font-semibold" : "text-gray-600 group-hover:text-navy"
                  )}>{cat}</span>
                </label>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3">
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <Link key={post.id} href={`/komunitas/${post.id}`} className="block group">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-navy/20 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start gap-4">
                        {post.image && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-navy transition-colors mb-1 line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {post.content}
                          </p>

                          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                            <div className="flex items-center gap-1">
                              <Heart className={clsx("w-3.5 h-3.5", post.likes > 50 ? "fill-red-400 text-red-400" : "")} />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{post.views}</span>
                            </div>
                            <span className="ml-auto">{getRelativeTime(post.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                  <Search className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-base font-bold text-gray-600">Topik tidak ditemukan</h3>
                  <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain atau reset filter.</p>
                  <button
                    onClick={() => { setSelectedCategories([]); setSearchQuery(""); }}
                    className="mt-4 text-navy text-sm font-semibold hover:underline"
                  >Reset Filter</button>
                </div>
              )}
            </div>

            {filteredPosts.length > 0 && (
              <div className="mt-6 flex items-center justify-between border border-gray-200 rounded-xl px-6 py-4 bg-white text-sm text-gray-500">
                <span>
                  Showing{" "}
                  <strong className="text-gray-700">
                    {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredPosts.length)}
                  </strong>{" "}
                  data out of <strong className="text-gray-700">{filteredPosts.length}</strong>
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 focus:outline-none bg-white"
                  >
                    {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="text-gray-400">data per page</span>

                  <div className="flex items-center gap-1 ml-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
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