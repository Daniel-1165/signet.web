'use client';

import { Heart, MessageSquare, Share2, MoreHorizontal, FileText, Download, ChevronDown, Send, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export function PostCard({ post, profile }: { post: any; profile: any }) {
  const { user } = useUser();
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";
  const authorRole = profile?.role || "Collective Member";

  const isResourcePost = post.content?.includes("PDF") || post.content?.includes("Resource");

  // Use actual reactors if available, else fallback to pravatar placeholders
  const reactors: string[] = post.post_reactions?.slice(0, 3).map((r: any) =>
    r.profiles?.image_url || `https://i.pravatar.cc/100?img=${r.user_id?.charCodeAt(0) || 10}`
  ) || [
    `https://i.pravatar.cc/100?img=${(post.id?.charCodeAt?.(0) || 10) + 1}`,
    `https://i.pravatar.cc/100?img=${(post.id?.charCodeAt?.(0) || 10) + 2}`,
    `https://i.pravatar.cc/100?img=${(post.id?.charCodeAt?.(0) || 10) + 3}`,
  ];

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#D8CEBE]/30 hover:border-[#6E7A67]/30 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
             <img src={authorImage} alt={authorName} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover bg-slate-100 ring-2 ring-[#D8CEBE]/10" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[15px] md:text-[16px] text-[#1D1914] leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{authorName}</h4>
              <span className="hidden md:inline text-[#D8CEBE]">•</span>
              <span className="text-[11px] md:text-[12px] text-[#6E7A67]/60 font-medium">
                {formatDistanceToNow(new Date(post.created_at))} ago
              </span>
            </div>
            <p className="text-[11px] md:text-[12px] text-[#6E7A67]/50 font-medium mt-0.5">{authorRole}</p>
          </div>
        </div>
        
        <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-colors p-1 shrink-0">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-[#1D1914] leading-[1.6] text-[15px] md:text-[16px] whitespace-pre-wrap font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
          {post.content}
        </p>

        {isResourcePost && (
          <div className="mt-5 flex items-center justify-between p-4 rounded-2xl bg-[#FDFCFB] border border-[#D8CEBE]/40 group/asset hover:border-[#6E7A67]/30 transition-all">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#8B4513] shadow-sm border border-[#D8CEBE]/20">
                   <FileText size={20} />
                </div>
                <div className="min-w-0">
                   <p className="text-[13px] md:text-[14px] font-bold text-[#1D1914] truncate">Growth_Framework_v2.pdf</p>
                   <p className="text-[11px] text-[#6E7A67]/60 font-medium tracking-wide">1.2 MB &bull; PDF</p>
                </div>
             </div>
             <button className="w-9 h-9 rounded-full bg-white text-[#6E7A67] border border-[#D8CEBE]/40 flex items-center justify-center hover:bg-[#1D1914] hover:text-white transition-all shrink-0">
                <Download size={16} />
             </button>
          </div>
        )}

        {post.image_url && !isResourcePost && (
          <div className="mt-5 overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] border border-[#D8CEBE]/30">
            <img 
              src={post.image_url} 
              alt="Contextual Insight" 
              className="w-full max-h-[400px] md:max-h-[500px] object-cover group-hover:scale-[1.01] transition-transform duration-700" 
            />
          </div>
        )}
      </div>

      {/* Interactions Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-[#D8CEBE]/20">
        <div className="flex items-center gap-4 md:gap-6">
            {/* Reactor Avatars — people who liked */}
            <div className="flex -space-x-2">
                {reactors.map((src, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#D8CEBF] overflow-hidden shadow-sm">
                        <img src={src} alt="Liker" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Like Button — green */}
            <LikeButton initialLikes={post.post_reactions?.length || 0} />

            {/* Comment Button — functional */}
            <CommentButton initialComments={post.post_comments?.length || 0} postId={post.id} />
        </div>

        <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-all group/share">
          <Share2 size={18} className="group-hover/share:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}

/* ── Like Button — green theme ─────────────────────────────── */
function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(prev => !prev);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <button 
      onClick={toggleLike}
      className={`flex items-center gap-1.5 transition-all group/stat ${isLiked ? 'text-[#1DA756]' : 'text-[#6E7A67]/60 hover:text-[#1DA756]'}`}
    >
      <Heart 
        size={19} 
        className={`transition-all duration-200 ${isLiked ? 'fill-[#1DA756] scale-110' : 'group-hover/stat:scale-110'}`} 
      />
      {likes > 0 && <span className="text-[13px] font-bold tracking-tight">{likes}</span>}
    </button>
  );
}

/* ── Comment Button — opens inline reply thread ─────────────── */
function CommentButton({ initialComments, postId }: { initialComments: number; postId: string }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{ text: string; time: string }[]>([]);
  const count = initialComments + comments.length;

  const submit = () => {
    if (!comment.trim()) return;
    setComments(prev => [...prev, { text: comment.trim(), time: 'just now' }]);
    setComment('');
  };

  return (
    <div>
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`flex items-center gap-1.5 transition-all group/stat ${open ? 'text-[#1D1914]' : 'text-[#6E7A67]/60 hover:text-[#1D1914]'}`}
      >
        <MessageSquare size={19} className="group-hover/stat:scale-110 transition-all" />
        {count > 0 && <span className="text-[13px] font-bold tracking-tight">{count}</span>}
      </button>

      {open && (
        <div className="mt-4 border-t border-[#D8CEBE]/20 pt-4 space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-[#6E7A67]/10 flex items-center justify-center text-[#6E7A67] text-[10px] font-bold shrink-0">U</div>
              <div className="flex-1 bg-[#FDFCFB] rounded-2xl px-4 py-2.5 border border-[#D8CEBE]/20">
                <p className="text-[14px] text-[#1D1914] font-medium">{c.text}</p>
                <p className="text-[10px] text-[#6E7A67]/50 mt-1 font-medium">{c.time}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-full bg-[#1DA756]/10 flex items-center justify-center text-[#1DA756] text-[10px] font-bold shrink-0">Me</div>
            <div className="flex-1 flex items-center gap-2 bg-[#FDFCFB] rounded-2xl px-4 py-2 border border-[#D8CEBE]/30 focus-within:border-[#6E7A67] transition-all">
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                placeholder="Write a reply..."
                className="flex-1 bg-transparent text-[14px] text-[#1D1914] outline-none font-medium placeholder:text-[#6E7A67]/40"
              />
              <button onClick={submit} className="text-[#1DA756] hover:scale-110 transition-transform shrink-0">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
