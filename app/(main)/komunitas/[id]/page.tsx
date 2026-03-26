"use client";
import React, { useState, use } from "react";
import Link from "next/link";
import { posts, getRelativeTime } from "@/lib/data";
import { ArrowLeft, Heart, MessageCircle, Eye, Share2, Bookmark, Send } from "lucide-react";

interface PageProps { params: Promise<{ id: string }> }

export default function PostDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const post = posts.find((p) => p.id === resolvedParams.id) || posts[2];

  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentsList, setCommentsList] = useState([
    { id: "c1", author: { name: "Komyu123", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Komyu" }, content: "Artikel yang sangat informatif! Saya juga mengalami masalah yang sama dan solusi di sini sangat membantu.", date: "2 jam lalu", likes: 12 },
    { id: "c2", author: { name: "DevLearner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev" }, content: "Terima kasih telah berbagi! Ada referensi tambahan yang bisa kamu rekomendasikan untuk belajar lebih dalam?", date: "1 jam lalu", likes: 7 },
  ]);

  const handleSendComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      author: { name: "Ahmad Fauzi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" },
      content: comment,
      date: "Baru saja",
      likes: 0
    };
    setCommentsList([newComment, ...commentsList]);
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Link href="/komunitas" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Komunitas
        </Link>

        <article className="p-8 md:p-10 mb-6">

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-widest border border-primary/10">
              {post.category}
            </span>
            <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">
              {getRelativeTime(post.createdAt)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
            <div className="relative w-11 h-11 shrink-0">
              <img
                src={post.author.avatar!}
                alt={post.author.name}
                className="w-11 h-11 rounded-full bg-gray-100 object-cover border border-gray-100"
              />
            </div>
            <div>
              <p className="font-bold text-sm text-navy">{post.author.name}</p>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Penulis</p>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs text-gray-400 font-bold">
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{post.views}</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />{commentsList.length}</span>
            </div>
          </div>

          {post.image && (
            <div className="relative w-full h-[300px] md:h-[400px] mb-8 shadow-inner bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <img src={post.image!} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-slate max-w-none text-gray-600 text-base leading-relaxed space-y-5">
            <p>{post.content}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-10 pt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-xl bg-gray-50 text-gray-500 text-xs font-bold border border-gray-100 hover:border-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        <div className="card p-4 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${liked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500"}`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span className="text-sm font-medium">{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-primary/5 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{commentsList.length}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl transition-colors ${bookmarked ? "bg-primary/10 text-primary" : "bg-gray-50 text-gray-500 hover:text-primary"}`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button className="p-2 rounded-xl bg-gray-50 text-gray-500 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-8 ">
          <h2 className="text-lg font-display font-bold text-navy mb-6">Diskusi ({commentsList.length})</h2>

          <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-10 h-10 shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
                alt="You"
                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
              />
            </div>
            <div className="flex-1 w-full">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar kamu..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm resize-none min-h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {["B", "I", "U", "🔗", "😊"].map((btn) => (
                    <button key={btn} type="button" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 text-xs font-bold transition-colors">
                      {btn}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSendComment}
                  className="btn-primary ml-auto flex items-center gap-2 !py-2 !px-5 text-sm font-bold disabled:opacity-50"
                  disabled={!comment.trim()}
                >
                  <Send className="w-3.5 h-3.5" /> Kirim
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {commentsList.map((c) => (
              <div key={c.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-10 h-10 shrink-0">
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-sm text-navy">{c.author.name}</span>
                    <span className="text-xs text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{c.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{c.likes}</span>
                    </button>
                    <button className="text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                      Balas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}