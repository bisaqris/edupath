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
    <div className="min-h-screen flex flex-col bg-gray-50/50 pb-10">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 w-full">
        <Link href="/komunitas" className="inline-flex items-center gap-2 text-gray-400 hover:text-navy transition-colors text-xs md:text-sm mb-6 md:mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Komunitas
        </Link>

        <article className="p-5 md:p-10 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-lg bg-navy/5 text-navy text-[10px] md:text-[11px] font-bold uppercase tracking-widest border border-navy/5">
              {post.category}
            </span>
            <span className="text-[10px] md:text-xs text-gray-300 uppercase tracking-wider font-bold">
              {getRelativeTime(post.createdAt)}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-display font-bold text-navy mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0">
                <img
                  src={post.author.avatar!}
                  alt={post.author.name}
                  className="w-full h-full rounded-full bg-gray-50 object-cover border border-gray-100"
                />
              </div>
              <div>
                <p className="font-bold text-sm text-navy leading-none mb-1">{post.author.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Penulis</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400 font-bold sm:ml-auto pt-4 sm:pt-0 border-t sm:border-0 border-gray-50">
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-gray-300" />{post.views} Views</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-gray-300" />{commentsList.length} Diskusi</span>
            </div>
          </div>

          {post.image && (
            <div className="relative w-full aspect-video md:h-[400px] mb-8 shadow-sm bg-gray-50 rounded-2xl overflow-hidden border border-gray-50">
              <img src={post.image!} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-relaxed space-y-5">
            <p className="whitespace-pre-line">{post.content}</p>
            <p>Terima kasih sudah mengikuti update terbaru dari komunitas Edupath. Kami berharap topik ini memberikan wawasan baru bagi perjalanan karir Anda.</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-50">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-xl bg-gray-50 text-gray-400 text-[10px] md:text-xs font-bold border border-gray-50 hover:border-navy/20 hover:text-navy transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        <div className="p-3 md:p-4 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl transition-all font-bold text-xs md:text-sm ${liked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500"}`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl bg-gray-50 text-gray-500 hover:bg-navy/5 hover:text-navy transition-colors font-bold text-xs md:text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>{commentsList.length}</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2.5 rounded-xl transition-colors border ${bookmarked ? "bg-navy/10 text-navy border-navy/10" : "bg-white border-gray-50 text-gray-400 hover:text-navy"}`}
            >
              <Bookmark className={`w-4 h-4 md:w-5 md:h-5 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button className="p-2.5 rounded-xl bg-white border border-gray-50 text-gray-400 hover:text-navy transition-colors">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <h2 className="text-lg font-display font-bold text-navy mb-8 flex items-center gap-3">
            <span className="w-1.5 h-5 bg-navy rounded-full" />
            Diskusi ({commentsList.length})
          </h2>

          <div className="flex gap-3 md:gap-4 mb-10">
            <div className="w-9 h-9 md:w-11 md:h-11 shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad"
                alt="You"
                className="w-full h-full rounded-full bg-gray-100 object-cover border border-gray-100"
              />
            </div>
            <div className="flex-1 min-w-0">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Apa pendapat kamu tentang topik ini?"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm resize-none min-h-[100px] focus:outline-none focus:ring-4 focus:ring-navy/5 focus:bg-white transition-all"
              />
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl w-full sm:w-auto justify-center sm:justify-start">
                  {["B", "I", "U", "🔗", "😊"].map((btn) => (
                    <button key={btn} type="button" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-400 text-[10px] font-bold transition-all">
                      {btn}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSendComment}
                  className="w-full sm:w-auto sm:ml-auto bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-navy/20 transition-all active:scale-95 disabled:opacity-30"
                  disabled={!comment.trim()}
                >
                  <Send className="w-4 h-4" /> Kirim Komentar
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            {commentsList.map((c) => (
              <div key={c.id} className="flex gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="w-9 h-9 md:w-11 md:h-11 shrink-0">
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-full h-full rounded-full bg-gray-50 object-cover border border-gray-100"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-bold text-xs md:text-sm text-navy">{c.author.name}</span>
                    <span className="text-[10px] md:text-xs text-gray-300 font-medium">{c.date}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 bg-gray-50/50 p-3 md:p-4 rounded-2xl rounded-tl-none border border-gray-50">
                    {c.content}
                  </p>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{c.likes} Likes</span>
                    </button>
                    <button className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-navy transition-colors">
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