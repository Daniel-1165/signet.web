"use client";

import {
  MessageSquare, Heart, Share2, MoreHorizontal,
  Video, Image as ImageIcon, Send, X, ChevronDown, ChevronUp
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: Profile | null;
}

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
  likes_count: number;
  comments_count: number;
  profiles: Profile | null;
  // local state
  liked_by_me?: boolean;
  comments?: Comment[];
  showComments?: boolean;
  commentText?: string;
  loadingComments?: boolean;
}

const TABS = ["All", "Posts", "Media", "Milestones"];
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80";

export default function CommunityPage() {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── Fetch Posts ────────────────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(first_name, last_name, image_url)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch posts error:", error);
      showToast("Could not load posts. Check your connection.", "error");
    } else {
      // Enrich with liked_by_me if user is logged in
      let enriched = (data || []) as Post[];
      if (user) {
        const { data: myLikes } = await supabase
          .from("post_reactions")
          .select("post_id")
          .eq("user_id", user.id)
          .eq("reaction_type", "like");

        const likedIds = new Set((myLikes || []).map((l: any) => l.post_id));
        enriched = enriched.map((p) => ({ ...p, liked_by_me: likedIds.has(p.id) }));
      }
      setPosts(enriched);
    }
    setLoading(false);
  }, [supabase, user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ─── Ensure Profile Exists ──────────────────────────────────────────────────
  const ensureProfile = async (): Promise<boolean> => {
    if (!user) return false;
    const { data } = await supabase.from("profiles").select("id").eq("id", user.id).single();
    if (!data) {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
        image_url: user.imageUrl,
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });
      if (error) {
        showToast("Profile sync failed. Try again in a moment.", "error");
        return false;
      }
    }
    return true;
  };

  // ─── Create Post ─────────────────────────────────────────────────────────────
  const handlePost = async () => {
    if (!user) return showToast("Sign in to post to the feed.", "error");
    if (!newPost.trim() && !selectedImage) return showToast("Write something or attach an image.", "error");

    setUploading(true);
    const ready = await ensureProfile();
    if (!ready) { setUploading(false); return; }

    let image_url: string | null = null;

    if (selectedImage) {
      const ext = selectedImage.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("post-images").upload(filePath, selectedImage);
      if (uploadError) {
        setUploading(false);
        return showToast("Image upload failed: " + uploadError.message, "error");
      }
      const { data: { publicUrl } } = supabase.storage.from("post-images").getPublicUrl(filePath);
      image_url = publicUrl;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ user_id: user.id, content: newPost.trim() || "", image_url }])
      .select("*, profiles(first_name, last_name, image_url)")
      .single();

    setUploading(false);

    if (error) {
      console.error("Post error:", error);
      showToast("Failed to post: " + error.message, "error");
      return;
    }

    setPosts((prev) => [{ ...data, liked_by_me: false }, ...prev]);
    setNewPost("");
    setSelectedImage(null);
    showToast("Posted to the feed! ✓");
  };

  // ─── Toggle Like ─────────────────────────────────────────────────────────────
  const handleLike = async (postId: string) => {
    if (!user) return showToast("Sign in to like posts.", "error");

    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    const alreadyLiked = post.liked_by_me;

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked_by_me: !alreadyLiked, likes_count: (p.likes_count || 0) + (alreadyLiked ? -1 : 1) }
          : p
      )
    );

    if (alreadyLiked) {
      // Unlike
      await supabase.from("post_reactions")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .eq("reaction_type", "like");

      await supabase.rpc("decrement_post_likes", { post_id_val: postId });
    } else {
      // Like
      const { error } = await supabase.from("post_reactions")
        .insert([{ post_id: postId, user_id: user.id, reaction_type: "like" }]);

      if (!error) {
        await supabase.rpc("increment_post_likes", { post_id_val: postId });
      } else if (error.code === "23505") {
        // Already liked in DB — just sync UI back
        setPosts((prev) =>
          prev.map((p) => p.id === postId ? { ...p, liked_by_me: true } : p)
        );
      }
    }
  };

  // ─── Toggle Comments ──────────────────────────────────────────────────────────
  const handleToggleComments = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.showComments) {
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, showComments: false } : p));
      return;
    }

    // Open + fetch comments
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, showComments: true, loadingComments: true } : p));

    const { data, error } = await supabase
      .from("post_comments")
      .select("*, profiles(first_name, last_name, image_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      showToast("Couldn't load comments.", "error");
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, loadingComments: false } : p));
    } else {
      setPosts((prev) =>
        prev.map((p) => p.id === postId ? { ...p, comments: data as Comment[], loadingComments: false } : p)
      );
    }
  };

  // ─── Submit Comment ───────────────────────────────────────────────────────────
  const handleComment = async (postId: string) => {
    if (!user) return showToast("Sign in to comment.", "error");
    const post = posts.find((p) => p.id === postId);
    if (!post?.commentText?.trim()) return;

    const ready = await ensureProfile();
    if (!ready) return;

    const { data, error } = await supabase
      .from("post_comments")
      .insert([{ post_id: postId, user_id: user.id, content: post.commentText.trim() }])
      .select("*, profiles(first_name, last_name, image_url)")
      .single();

    if (error) {
      showToast("Comment failed: " + error.message, "error");
    } else {
      // Increment comments_count in DB
      await supabase.rpc("increment_post_comments", { post_id_val: postId });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                commentText: "",
                comments_count: (p.comments_count || 0) + 1,
                comments: [...(p.comments || []), data as Comment],
              }
            : p
        )
      );
    }
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  const filteredPosts = posts.filter((p) => {
    if (activeTab === "All" || activeTab === "Posts") return true;
    if (activeTab === "Media") return !!p.image_url;
    if (activeTab === "Milestones") return p.content?.toLowerCase().includes("milestone") || p.content?.toLowerCase().includes("goal");
    return true;
  });

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 w-full relative">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-xl transition-all ${toast.type === "error" ? "bg-red-500 text-white" : "bg-accent text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Community Feed</h1>
          <p className="text-sm font-medium text-foreground/50 mt-1">Connect, share, and grow with the Signet ecosystem.</p>
        </div>
        <button
          onClick={fetchPosts}
          className="text-xs font-bold text-accent border border-accent/30 px-4 py-2 rounded-full hover:bg-accent/5 transition-colors"
        >
          Refresh
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">

          {/* Post Composer */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-black/5 border border-black/5 flex-shrink-0">
                {user?.imageUrl
                  ? <img src={user.imageUrl} alt="You" className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-accent text-white flex items-center justify-center font-bold text-sm">{user?.firstName?.[0] ?? "U"}</div>
                }
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handlePost(); }}
                placeholder={user ? "Share a mental model, framework, or progression log... (Ctrl+Enter to post)" : "Sign in to post to the feed..."}
                disabled={!user}
                className="w-full bg-[#F9FBF4] rounded-2xl py-3 px-4 outline-none text-sm font-medium text-foreground border border-black/5 focus:border-accent/40 focus:bg-white transition-all resize-none min-h-[80px] disabled:opacity-50"
              />
            </div>

            {selectedImage && (
              <div className="relative inline-block ml-14 mb-3 group">
                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="h-20 w-20 object-cover rounded-xl border border-black/5" />
                <button onClick={() => setSelectedImage(null)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 pl-14">
              <div className="flex items-center gap-1">
                <input type="file" id="img-upload" hidden accept="image/*,video/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
                <label htmlFor="img-upload" className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-black/5 text-xs font-bold text-foreground/60 cursor-pointer transition-colors">
                  <ImageIcon className="w-4 h-4" /> Photo
                </label>
                <label htmlFor="img-upload" className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-black/5 text-xs font-bold text-foreground/60 cursor-pointer transition-colors">
                  <Video className="w-4 h-4" /> Video
                </label>
              </div>
              <button
                onClick={handlePost}
                disabled={(!newPost.trim() && !selectedImage) || uploading || !user}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_4px_15px_rgba(22,163,74,0.3)] hover:scale-105 transition-transform disabled:opacity-40 disabled:scale-100"
              >
                {uploading
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <Send className="w-4 h-4" />
                }
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab ? "bg-foreground text-white" : "bg-white text-foreground/60 border border-black/5 hover:bg-black/5"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Feed */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-black/5 animate-pulse">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-black/5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-black/5 rounded w-1/3" />
                      <div className="h-3 bg-black/5 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="h-16 bg-black/5 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-black/5 text-center">
              <h3 className="font-extrabold text-xl">The feed is quiet.</h3>
              <p className="text-sm font-medium mt-2 text-black/50">Be the first to share something with the community.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black/[0.06] relative group">

                {/* Author */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-black/5 border border-black/5 flex-shrink-0">
                    <img
                      src={post.profiles?.image_url || DEFAULT_AVATAR}
                      alt={post.profiles?.first_name || "Member"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base text-black">
                        {post.profiles?.first_name} {post.profiles?.last_name}
                      </span>
                      <span className="w-4 h-4 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-black/40 mt-0.5">{formatDate(post.created_at)}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(post.content).then(() => showToast("Copied to clipboard!"))}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-black/5 transition-all"
                  >
                    <Share2 className="w-4 h-4 text-black/40" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-base font-medium leading-relaxed text-black whitespace-pre-wrap mb-4">{post.content}</p>

                {/* Media */}
                {post.image_url && (
                  <div className="rounded-2xl overflow-hidden border border-black/5 mb-4">
                    {post.image_url.match(/\.(mp4|webm|ogg)$/i)
                      ? <video src={post.image_url} controls className="w-full max-h-[400px]" />
                      : <img src={post.image_url} alt="Post media" className="w-full max-h-[400px] object-cover" />
                    }
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-black/5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors group/like ${post.liked_by_me ? "text-red-500" : "text-black/40 hover:text-red-500"}`}
                  >
                    <Heart className={`w-5 h-5 transition-transform group-hover/like:scale-110 ${post.liked_by_me ? "fill-red-500" : ""}`} />
                    <span>{post.likes_count || 0}</span>
                  </button>

                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${post.showComments ? "text-accent" : "text-black/40 hover:text-accent"}`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments_count || 0}</span>
                    {post.showComments ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Comments Panel */}
                {post.showComments && (
                  <div className="mt-4 pt-4 border-t border-black/5 space-y-4">
                    {post.loadingComments ? (
                      <div className="text-xs text-black/30 font-bold text-center py-4">Loading comments...</div>
                    ) : (post.comments || []).length === 0 ? (
                      <p className="text-xs text-black/30 font-bold text-center py-2">No comments yet. Be the first!</p>
                    ) : (
                      (post.comments || []).map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-black/5 flex-shrink-0">
                            <img src={comment.profiles?.image_url || DEFAULT_AVATAR} alt={comment.profiles?.first_name || ""} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 bg-[#F9FBF4] rounded-2xl px-4 py-3">
                            <span className="font-bold text-xs text-black">{comment.profiles?.first_name} {comment.profiles?.last_name} · </span>
                            <span className="text-xs text-black/40">{formatDate(comment.created_at)}</span>
                            <p className="text-sm text-black mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Comment Input */}
                    {user && (
                      <div className="flex gap-3 items-center mt-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-black/5 flex-shrink-0">
                          {user.imageUrl
                            ? <img src={user.imageUrl} alt="You" className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-accent text-white flex items-center justify-center text-xs font-bold">{user.firstName?.[0] ?? "U"}</div>
                          }
                        </div>
                        <input
                          type="text"
                          value={post.commentText || ""}
                          onChange={(e) =>
                            setPosts((prev) =>
                              prev.map((p) => p.id === post.id ? { ...p, commentText: e.target.value } : p)
                            )
                          }
                          onKeyDown={(e) => { if (e.key === "Enter") handleComment(post.id); }}
                          placeholder="Write a comment... (Enter to send)"
                          className="flex-1 bg-[#F9FBF4] rounded-2xl px-4 py-2.5 text-sm outline-none border border-black/5 focus:border-accent/40 focus:bg-white transition-all font-medium"
                        />
                        <button
                          onClick={() => handleComment(post.id)}
                          disabled={!post.commentText?.trim()}
                          className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform disabled:opacity-40"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/[0.06] text-center sticky top-28">
            <div className="flex justify-center -space-x-3 mb-6">
              {[41, 42, 43].map((img) => (
                <div key={img} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <img src={`https://i.pravatar.cc/150?img=${img}`} alt="Member" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <h3 className="font-extrabold text-xl text-black leading-tight mb-3">Build your inner circle.</h3>
            <p className="text-sm font-semibold text-black/60 mb-6 leading-relaxed">
              Connect with growth-focused members and amplify your ecosystem.
            </p>
            <button
              onClick={() => showToast("Member search coming in v1.2!")}
              className="w-full bg-black text-white py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors"
            >
              Find Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
