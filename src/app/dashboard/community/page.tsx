'use client';

import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { Users, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";

export default function CommunityHubPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("role").eq("id", user.id).single()
        .then(({ data }) => {
          if (data?.role === "admin") setIsAdmin(true);
        });
    }
  }, [user, supabase]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/community/posts?t=' + Date.now(), { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1D1914] font-dm-sans pb-32">
      {/* Centered Column wrapper */}
      <div className="max-w-[650px] mx-auto px-4">
        
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <h1 className="text-[28px] md:text-[32px] font-black text-[#0F1419]">
            Community
          </h1>
          <button className="w-10 h-10 rounded-full border border-[#EFF3F4] bg-[#FFFFFF] flex items-center justify-center text-[#1E6B3A] hover:bg-[#EAF4EC]/40 shadow-sm transition-colors">
            <Users size={20} />
          </button>
        </header>

        {/* Input box */}
        <div className="mb-6">
          <CreatePost onPostCreated={fetchPosts} />
        </div>

        {/* Connect Tab */}
        <div className="border-b border-[#EFF3F4] flex">
          <button className="text-[#1E6B3A] font-bold text-[15px] pb-3 px-4 border-b-2 border-[#1E6B3A] focus:outline-none transition-all">
            Connect
          </button>
        </div>

        {/* Posts list */}
        <div className="mt-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#1E6B3A]/60">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p className="font-semibold text-[14px]">Loading feed...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard 
                key={post.id} 
                post={post} 
                profile={post.profiles}
                currentUserIsAdmin={isAdmin}
              />
            ))
          ) : (
            <div className="text-center py-20 text-gray-500 italic text-[14px]">
              No posts found. Start the conversation!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
