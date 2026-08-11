'use client';

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase/client";
import { PostCard } from "../../PostCard";
import Link from "next/link";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.postId as string;
  const router = useRouter();
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("role").eq("id", user.id).single()
        .then(({ data }) => {
          if (data?.role === "admin") setIsAdmin(true);
        });
    }
  }, [user, supabase]);

  const fetchPostAndComments = async () => {
    if (!postId) return;
    try {
      setIsLoading(true);
      // Fetch post details
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            image_url
          ),
          post_reactions (
            id,
            user_id,
            reaction_type
          )
        `)
        .eq('id', postId)
        .single();

      if (postError) {
        console.error('Error fetching post:', postError);
        return;
      }
      setPost(postData);

      // Fetch comments
      const response = await fetch(`/api/community/posts/${postId}/comments?t=${Date.now()}`);
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Error loading post page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [postId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const response = await fetch(`/api/community/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment.trim() })
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments(prev => [...prev, addedComment]);
        setNewComment("");
      } else {
        alert("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const getHandle = (profile: any) => {
    if (profile?.username) return `@${profile.username.toLowerCase()}`;
    if (profile?.first_name || profile?.last_name) {
      const fn = (profile.first_name || '').toLowerCase().replace(/\s+/g, '');
      const ln = (profile.last_name || '').toLowerCase().replace(/\s+/g, '');
      return `@${fn}${ln}`;
    }
    return '@growthmember';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface text-ink flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-12 h-12 rounded-full border-4 border-seal/20 border-t-seal animate-spin mb-4" />
        <p className="text-seal/60 font-semibold">Loading insight...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-surface text-ink flex flex-col items-center justify-center p-6 font-sans">
        <p className="text-red-500 font-bold mb-4">Post not found</p>
        <button 
          onClick={() => router.push("/dashboard/community")}
          className="flex items-center gap-2 text-seal font-bold"
        >
          <ArrowLeft size={16} /> Back to community
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-ink font-sans pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-rule px-4 py-3 flex items-center gap-6 max-w-[650px] mx-auto">
        <button 
          onClick={() => router.push("/dashboard/community")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-ink">Post</h1>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[650px] mx-auto px-4 mt-2">
        <PostCard 
          post={post}
          profile={post.profiles}
          currentUserIsAdmin={isAdmin}
          isDetailView={true}
        />

        {/* Comment Input box */}
        {user && (
          <form onSubmit={handlePostComment} className="flex gap-3 py-4 border-b border-rule items-start">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
              <img src={user.imageUrl} alt="My Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Post your reply"
                rows={2}
                className="w-full text-base placeholder-gray-500 text-gray-900 border-none outline-none resize-none pt-2"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmittingComment}
                  className="px-5 py-1.5 bg-seal text-white rounded-full text-[14px] font-bold hover:bg-seal transition disabled:opacity-50"
                >
                  {isSubmittingComment ? "Replying..." : "Reply"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Comments Feed */}
        <div className="mt-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment: any) => {
              const cName = comment.profiles ? `${comment.profiles.first_name || ''} ${comment.profiles.last_name || ''}`.trim() : "Growth Member";
              const cHandle = getHandle(comment.profiles);
              const cAvatar = comment.profiles?.image_url || "/placeholder-avatar.png";

              return (
                <div key={comment.id} className="flex gap-3 py-3 border-b border-rule items-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                    <img src={cAvatar} alt={cName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-ink text-[15px] truncate">{cName}</span>
                      <span className="text-ink text-[14px]">{cHandle}</span>
                      <span className="text-ink text-[14px]">&middot;</span>
                      <span className="text-ink text-[14px]">
                        {new Date(comment.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-[15px] text-ink leading-relaxed mt-1 whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-500 italic text-[14px]">
              No replies yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
