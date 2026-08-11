'use client';

import { MessageSquare, ThumbsUp, ThumbsDown, MoreHorizontal, Share2, FileText, Download, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PostCard({ 
  post, 
  profile, 
  currentUserIsAdmin,
  isDetailView = false
}: { 
  post: any; 
  profile: any; 
  currentUserIsAdmin?: boolean;
  isDetailView?: boolean;
}) {
  const { user } = useUser();
  const router = useRouter();
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";

  const getHandle = (prof: any) => {
    if (prof?.username) return `@${prof.username.toLowerCase()}`;
    if (prof?.first_name || prof?.last_name) {
      const fn = (prof.first_name || '').toLowerCase().replace(/\s+/g, '');
      const ln = (prof.last_name || '').toLowerCase().replace(/\s+/g, '');
      return `@${fn}${ln}`;
    }
    return '@growthmember';
  };

  const authorHandle = getHandle(profile);

  // Reaction State Management (Optimistic Updates)
  const [reactions, setReactions] = useState<any[]>(post.post_reactions || []);
  const userLike = reactions.find(r => r.user_id === user?.id && r.reaction_type === 'like');
  const userDislike = reactions.find(r => r.user_id === user?.id && r.reaction_type === 'dislike');
  const likesCount = reactions.filter(r => r.reaction_type === 'like').length;
  const dislikesCount = reactions.filter(r => r.reaction_type === 'dislike').length;

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (!user) return;
    
    // Optimistic Update
    const hasThisReaction = reactions.some(r => r.user_id === user.id && r.reaction_type === type);
    let updatedReactions = [...reactions];
    
    if (hasThisReaction) {
      updatedReactions = updatedReactions.filter(r => !(r.user_id === user.id && r.reaction_type === type));
    } else {
      // Remove other type if active, and add current
      updatedReactions = updatedReactions.filter(r => !(r.user_id === user.id && r.reaction_type === (type === 'like' ? 'dislike' : 'like')));
      updatedReactions.push({ user_id: user.id, reaction_type: type });
    }
    setReactions(updatedReactions);

    try {
      const response = await fetch(`/api/community/posts/${post.id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction_type: type })
      });
      if (!response.ok) {
        // Revert
        setReactions(post.post_reactions || []);
      }
    } catch (error) {
      console.error("Error setting reaction:", error);
      // Revert
      setReactions(post.post_reactions || []);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const isAdmin = currentUserIsAdmin || user?.publicMetadata?.role === 'admin';
  const isOwner = user?.id === post.user_id;

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch(`/api/community/posts?id=${post.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        if (isDetailView) {
          router.push("/dashboard/community");
        } else {
          window.location.reload();
        }
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
        if (isDetailView) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Truncation check
  const truncateThreshold = 280;
  const isTruncated = post.content?.length > truncateThreshold;
  const shouldTruncate = isTruncated && !isDetailView;
  const displayedContent = shouldTruncate 
    ? post.content.slice(0, truncateThreshold) + "..." 
    : post.content;

  const commentCount = post.post_comments?.length || 0;

  const formatDistanceCustom = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString))
        .replace('about ', '')
        .replace(' ago', '')
        .replace('hours', 'h')
        .replace('hour', 'h')
        .replace('minutes', 'm')
        .replace('minute', 'm')
        .replace('days', 'd')
        .replace('day', 'd');
    } catch (e) {
      return 'now';
    }
  };

  return (
    <div className="bg-surface py-4 border-b border-rule flex gap-3 font-dm-sans relative">
      {/* Avatar column */}
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 bg-gray-100 cursor-pointer" onClick={() => router.push(`/dashboard/community/posts/${post.id}`)}>
        <img src={authorImage} alt={authorName} className="w-full h-full object-cover" />
      </div>

      {/* Main column */}
      <div className="flex-1 min-w-0">
        {/* Name and Handle row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span 
              onClick={() => router.push(`/dashboard/community/posts/${post.id}`)}
              className="font-bold text-ink text-[15px] md:text-[16px] hover:underline cursor-pointer"
            >
              {authorName}
            </span>
            <span className="text-ink text-[14px]">{authorHandle}</span>
            <span className="text-ink text-[14px]">&middot;</span>
            <span className="text-ink text-[14px]">
              {formatDistanceCustom(post.created_at)}
            </span>
          </div>

          {/* Settings dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-ink hover:text-ink transition-colors p-1"
            >
              <MoreHorizontal size={18} />
            </button>
   
            {showDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                <button 
                  className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/dashboard/community/posts/${post.id}`);
                    setShowDropdown(false);
                  }}
                >
                  <Share2 size={14} />
                  Copy Link
                </button>
                {(isOwner || isAdmin) && (
                  <>
                    <button 
                      className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={() => {
                        setIsEditing(true);
                        setShowDropdown(false);
                      }}
                    >
                      <FileText size={14} />
                      Edit Post
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                      onClick={handleDelete}
                    >
                      <Trash2 size={14} />
                      Delete Post
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content message */}
        <div className="mt-1">
          {isEditing ? (
            <div className="space-y-3 mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] font-medium text-gray-900 outline-none focus:border-seal transition-all min-h-[100px] resize-none"
                placeholder="Update your thoughts..."
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate}
                  disabled={isUpdating || !editContent.trim()}
                  className="px-4 py-1.5 bg-seal text-white rounded-full text-[13px] font-bold hover:bg-seal transition-all disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[15px] text-ink leading-relaxed whitespace-pre-wrap break-words">
              <span>{displayedContent}</span>
              {shouldTruncate && (
                <Link 
                  href={`/dashboard/community/posts/${post.id}`}
                  className="text-seal font-bold hover:underline ml-1.5 cursor-pointer inline-block"
                >
                  See more
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Post Image (if any) */}
        {post.image_url && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-gray-150">
            <img 
              src={post.image_url} 
              alt="Context" 
              className="w-full max-h-[400px] object-cover cursor-pointer" 
              onClick={() => router.push(`/dashboard/community/posts/${post.id}`)}
            />
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-12 mt-2.5 text-ink">
          {/* Comment Button */}
          <button 
            onClick={() => router.push(`/dashboard/community/posts/${post.id}`)}
            className="flex items-center gap-2 hover:text-seal transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-seal/10 transition-colors">
              <MessageSquare size={18} />
            </div>
            {commentCount > 0 && <span className="text-[13px] font-semibold">{commentCount}</span>}
          </button>

          {/* Like Button */}
          <button 
            onClick={() => handleReaction('like')}
            className={`flex items-center gap-2 transition-colors group ${userLike ? 'text-seal' : 'hover:text-seal'}`}
          >
            <div className={`p-2 rounded-full transition-colors ${userLike ? 'bg-seal/10' : 'group-hover:bg-seal/10'}`}>
              <ThumbsUp size={18} className={userLike ? "fill-seal" : ""} />
            </div>
            {likesCount > 0 && <span className="text-[13px] font-semibold">{likesCount}</span>}
          </button>

          {/* Dislike Button */}
          <button 
            onClick={() => handleReaction('dislike')}
            className={`flex items-center gap-2 transition-colors group ${userDislike ? 'text-red-500' : 'hover:text-red-500'}`}
          >
            <div className={`p-2 rounded-full transition-colors ${userDislike ? 'bg-red-50' : 'group-hover:bg-red-50'}`}>
              <ThumbsDown size={18} className={userDislike ? "fill-red-500" : ""} />
            </div>
            {dislikesCount > 0 && <span className="text-[13px] font-semibold">{dislikesCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
