'use client';

import { Heart, MessageSquare, Share2, MoreHorizontal, FileText, Download, ChevronDown, Send, X, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export function PostCard({ post, profile, currentUserIsAdmin }: { post: any; profile: any; currentUserIsAdmin?: boolean }) {
  const { user } = useUser();
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";
  const authorRole = profile?.role || "Collective Member";

  const isResourcePost = post.content?.includes("PDF") || post.content?.includes("Resource");

  // Seed reactor avatars from existing reactions (real likers)
  const seedReactors: string[] = (post.post_reactions ?? []).slice(0, 5).map(
    (r: any) => r.profiles?.image_url || `https://i.pravatar.cc/100?img=${(r.user_id?.charCodeAt?.(0) ?? 10) % 70 + 1}`
  );
  const [reactorAvatars, setReactorAvatars] = useState<string[]>(seedReactors);
  const currentUserAvatar = user?.imageUrl ?? null;

  const [showDropdown, setShowDropdown] = useState(false);
  const isAdmin = currentUserIsAdmin || user?.publicMetadata?.role === 'admin';
  const isOwner = user?.id === post.user_id;

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this insight?")) return;
    try {
      const response = await fetch(`/api/community/posts?id=${post.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        window.location.reload(); // Simple refresh for now
      } else {
        const err = await response.json();
        alert(`Failed to delete: ${err.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/community/posts?id=${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent.trim() }),
      });
      if (response.ok) {
        setIsEditing(false);
        window.location.reload();
      } else {
        alert("Failed to update insight");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#D8CEBE]/30 hover:border-[#1E6B3A]/30 transition-all group relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
             <img src={authorImage} alt={authorName} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover bg-slate-100 ring-2 ring-[#D8CEBE]/10" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[15px] md:text-[16px] text-[#114B2A] leading-tight break-words" >{authorName}</h4>
              <span className="hidden md:inline text-[#D8CEBE]">•</span>
              <span className="text-[11px] md:text-[12px] text-[#1E6B3A]/60 font-medium">
                {formatDistanceToNow(new Date(post.created_at))} ago
              </span>
            </div>
            <p className="text-[11px] md:text-[12px] text-[#1E6B3A]/50 font-medium mt-0.5">{authorRole}</p>
          </div>
        </div>
                <div className="relative dropdown-container">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-[#1E6B3A]/40 hover:text-[#114B2A] transition-colors p-1 shrink-0"
          >
            <MoreHorizontal size={18} />
          </button>
 
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#D8CEBE]/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button 
                className="w-full text-left px-4 py-2 text-[12px] font-bold text-[#1E6B3A] hover:bg-[#FDFCFB] hover:text-[#114B2A] transition-colors flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/dashboard/community#post-${post.id}`);
                  setShowDropdown(false);
                }}
              >
                <Share2 size={14} />
                Copy Link
              </button>
              {(isOwner || isAdmin) && (
                <>
                  <button 
                    className="w-full text-left px-4 py-2 text-[12px] font-bold text-[#1E6B3A] hover:bg-[#FDFCFB] hover:text-[#114B2A] transition-colors flex items-center gap-2"
                    onClick={() => {
                      setIsEditing(true);
                      setShowDropdown(false);
                    }}
                  >
                    <FileText size={14} />
                    Edit Insight
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                    onClick={handleDelete}
                  >
                    <Trash2 size={14} />
                    Delete Insight
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <div className="max-h-[500px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-4 bg-[#FDFCFB] border border-[#D8CEBE]/40 rounded-2xl text-[14px] md:text-[15px] font-medium text-[#114B2A] outline-none focus:border-[#1E6B3A] transition-all min-h-[120px] resize-none"
                placeholder="Update your insight..."
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-[11px] font-bold text-[#1E6B3A] hover:text-[#114B2A] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate}
                  disabled={isUpdating || !editContent.trim()}
                  className="px-6 py-2 bg-[#1E6B3A] text-white rounded-full text-[11px] font-bold hover:bg-[#1E6B3A]/80 transition-all disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[#114B2A] leading-[1.6] text-[14px] md:text-[15px] whitespace-pre-wrap break-words font-medium" >
              {post.content}
            </p>
          )}
        </div>

        {isResourcePost && (
          <div className="mt-5 flex items-center justify-between p-4 rounded-2xl bg-[#FDFCFB] border border-[#D8CEBE]/40 group/asset hover:border-[#1E6B3A]/30 transition-all">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#EAF4EC] rounded-xl flex items-center justify-center text-[#1E6B3A] shadow-sm border border-[#D8CEBE]/20">
                   <FileText size={20} />
                </div>
                <div className="min-w-0">
                   <p className="text-[13px] md:text-[14px] font-bold text-[#114B2A] truncate">Growth_Framework_v2.pdf</p>
                   <p className="text-[11px] text-[#1E6B3A]/60 font-medium tracking-wide">1.2 MB &bull; PDF</p>
                </div>
             </div>
             <button className="w-9 h-9 rounded-full bg-white text-[#1E6B3A] border border-[#D8CEBE]/40 flex items-center justify-center hover:bg-[#1E6B3A] hover:text-white transition-all shrink-0">
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
            {/* Reactor Avatars — updates live when user likes */}
            <div className="flex -space-x-2">
                {reactorAvatars.slice(0, 5).map((src, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#D8CEBF] overflow-hidden shadow-sm">
                        <img src={src} alt="Liker" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Like Button — green, updates avatar list */}
            <LikeButton
              initialLikes={post.post_reactions?.length || 0}
              currentUserAvatar={currentUserAvatar}
              reactorAvatars={reactorAvatars}
              onLikeChange={(_, updated) => setReactorAvatars(updated)}
            />

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

/* ── Like Button — green theme with avatar tracking ──────────── */
function LikeButton({
  initialLikes,
  currentUserAvatar,
  reactorAvatars,
  onLikeChange,
}: {
  initialLikes: number;
  currentUserAvatar: string | null;
  reactorAvatars: string[];
  onLikeChange: (liked: boolean, avatars: string[]) => void;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    const nowLiked = !isLiked;
    setIsLiked(nowLiked);
    setLikes(prev => nowLiked ? prev + 1 : prev - 1);

    // Add or remove the current user's avatar from reactors
    let updated = [...reactorAvatars];
    if (nowLiked && currentUserAvatar && !updated.includes(currentUserAvatar)) {
      updated = [currentUserAvatar, ...updated].slice(0, 5);
    } else if (!nowLiked && currentUserAvatar) {
      updated = updated.filter(a => a !== currentUserAvatar);
    }
    onLikeChange(nowLiked, updated);
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
