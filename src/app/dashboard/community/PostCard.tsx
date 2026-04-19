'use client';

import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function PostCard({ post, profile }: { post: any; profile: any }) {
  const { user } = useUser();
  const [reactions, setReactions] = useState(post.post_reactions || []);
  const [comments, setComments] = useState(post.post_comments || []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLoadingReaction, setIsLoadingReaction] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";

  const userReaction = reactions.find((r: any) => r.user_id === user?.id);
  const reactionCount = reactions.length;

  const handleReaction = async () => {
    if (!user || isLoadingReaction) return;

    setIsLoadingReaction(true);
    try {
      const response = await fetch(`/api/community/posts/${post.id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction_type: 'like' }),
      });

      if (response.ok) {
        const { action } = await response.json();
        if (action === 'added') {
          setReactions([...reactions, { id: Date.now(), user_id: user.id, reaction_type: 'like' }]);
        } else {
          setReactions(reactions.filter((r: any) => r.user_id !== user.id));
        }
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
    } finally {
      setIsLoadingReaction(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || isLoadingComment) return;

    setIsLoadingComment(true);
    try {
      const response = await fetch(`/api/community/posts/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment("");
        setShowComments(true);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsLoadingComment(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#232826] border border-white/5 rounded-2xl p-6 group hover:border-[#1DA756]/15 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 ring-2 ring-[#1DA756]/0 group-hover:ring-[#1DA756]/20 transition-all">
            <img src={authorImage} alt={authorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-lg tracking-tight group-hover:text-[#1DA756] transition-colors">{authorName}</h4>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/20">
              <Clock size={12} className="shrink-0" />
              <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-[#3C413F] text-white/40 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-[#a5b0a5] leading-relaxed text-lg font-medium whitespace-pre-wrap">
          {post.content}
        </p>
        {post.image_url && (
          <div className="mt-4">
            <img 
              src={post.image_url} 
              alt="Post image" 
              className="w-full max-h-96 object-cover rounded-xl border border-white/5" 
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 pt-6 border-t border-white/5">
        <ActionButton 
          icon={<Heart size={18} className={userReaction ? 'fill-[#1DA756] text-[#1DA756]' : ''} />} 
          count={reactionCount} 
          label="Applaud" 
          onClick={handleReaction}
          isLoading={isLoadingReaction}
        />
        <ActionButton 
          icon={<MessageSquare size={18} />} 
          count={comments.length} 
          label="Insight" 
          onClick={() => setShowComments(!showComments)}
        />
        <ActionButton icon={<Share2 size={18} />} count={0} label="Circulate" />
      </div>

      {/* Comments Section */}
      {showComments && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-white/5 space-y-4"
        >
          {comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                  <img 
                    src={comment.profiles?.image_url || "/placeholder-avatar.png"} 
                    alt={comment.profiles ? `${comment.profiles.first_name} ${comment.profiles.last_name}` : "User"}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                  <div className="flex-1">
                    <div className="bg-[#3C413F] rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">
                          {comment.profiles ? `${comment.profiles.first_name || ''} ${comment.profiles.last_name || ''}`.trim() : "User"}
                        </span>
                        <span className="text-xs text-white/40">
                          {formatDistanceToNow(new Date(comment.created_at))} ago
                        </span>
                      </div>
                      <p className="text-sm text-white/80">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {user && (
            <form onSubmit={handleComment} className="flex gap-3">
              <img 
                src={user.imageUrl} 
                alt={user.firstName || "You"}
                className="w-8 h-8 rounded-full object-cover border border-white/10"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Share your insight..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-[#3C413F] border border-white/5 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#1DA756]/50"
                  disabled={isLoadingComment}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || isLoadingComment}
                  className="px-4 py-2 bg-[#1DA756] text-[#0D120E] rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1DA756]/90 transition-colors"
                >
                  {isLoadingComment ? '...' : 'Post'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function ActionButton({ icon, count, label, onClick, isLoading }: { 
  icon: React.ReactNode; 
  count: number; 
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
}) {
  return (
    <button 
      className="flex items-center gap-2.5 text-white/40 hover:text-white transition-all group/btn disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="p-2 rounded-xl group-hover/btn:bg-[#3C413F] transition-colors">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest group-hover/btn:opacity-100 opacity-60 transition-opacity">
        {label}
      </span>
      {count > 0 && <span className="text-sm font-mono">{count}</span>}
    </button>
  );
}
