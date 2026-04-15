"use client";

import { MessageSquare, Heart, Share2, MoreHorizontal, HelpCircle, Video, Image as ImageIcon, Send, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [supabase]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(first_name, last_name, image_url)')
      .order('created_at', { ascending: false });
      
    if (data) setPosts(data);
    setLoading(false);
  };

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handlePost = async () => {
    if (!user) return alert("Log in to broadcast to the network.");
    if (!newPost.trim() && !selectedImage) return alert("Write an insight or attach an image before posting.");

    setUploading(true);
    let image_url = null;

    if (selectedImage) {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, selectedImage);

      if (uploadError) {
        setUploading(false);
        return alert("Failed to upload image: " + uploadError.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);
      
      image_url = publicUrl;
    }

    const { data, error } = await supabase.from('posts').insert([
      {
        user_id: user.id,
        content: newPost,
        image_url: image_url
      }
    ]).select('*, profiles(first_name, last_name, image_url)').single();

    setUploading(false);

    if (error) {
      console.error("Community Post Error:", error);
      if (error.code === '23503') {
        alert("Wait a second while your profile synchronizes with our database... try again in 3 seconds.");
      } else {
        alert("Failed to post message. " + error.message);
      }
      return;
    }

    if (data) {
      setPosts([data, ...posts]);
      setNewPost("");
      setSelectedImage(null);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return alert("Sign in to calibrate with protocols.");
    
    // Optimistic UI update
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
    ));
    
    // Call our SQL function to permanently increment the database
    await supabase.rpc('increment_post_likes', { post_id_val: postId });
    
    // Register the like safely in the post_reactions table
    await supabase.from('post_reactions').insert([
      { user_id: user.id, post_id: postId, reaction_type: 'like' }
    ]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10 w-full">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Community Feed</h1>
          <p className="text-sm font-medium text-foreground/50 mt-1">Connect, share, and grow with the Signet ecosystem.</p>
        </div>
        
        {/* Profile/Notification Header Elements */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 flex items-center justify-center relative hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all">
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            <MessageSquare className="w-5 h-5 text-foreground/70" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Post Creation Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.02]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-black/5 border border-black/5">
                 {user?.imageUrl ? (
                   <img src={user.imageUrl} alt="Profile" />
                 ) : (
                   <div className="w-full h-full bg-accent text-white flex items-center justify-center font-bold">U</div>
                 )}
              </div>
              <div className="flex-1 space-y-3">
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share a mental model, framework, or progression log..."
                  className="w-full bg-[#F9FBF4] rounded-2xl py-3 px-5 outline-none text-base font-medium text-foreground border border-black/5 focus:border-accent/40 focus:bg-white transition-all shadow-inner resize-none min-h-[80px]"
                />
                
                {selectedImage && (
                  <div className="relative inline-block group">
                    <img 
                      src={URL.createObjectURL(selectedImage)} 
                      alt="Selected" 
                      className="h-24 w-24 object-cover rounded-xl border border-black/5 shadow-sm"
                    />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-3 h-3 rotate-45" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  id="media-upload" 
                  hidden 
                  accept="image/*,video/*"
                  onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                <button onClick={() => alert("Polling engine deployed in v1.2 updates.")} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 transition-colors text-xs font-bold text-foreground/70">
                  <HelpCircle className="w-4 h-4" /> Poll
                </button>
                <label 
                  htmlFor="media-upload"
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 transition-colors text-xs font-bold text-foreground/70 cursor-pointer"
                >
                  <Video className="w-4 h-4" /> Video
                </label>
                <label 
                  htmlFor="media-upload"
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 transition-colors text-xs font-bold text-foreground/70 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" /> Gallery
                </label>
              </div>
              <button 
                onClick={handlePost}
                disabled={(!newPost.trim() && !selectedImage) || uploading}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_4px_15px_rgba(22,163,74,0.3)] hover:scale-105 transition-transform disabled:opacity-50"
              >
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4 -ml-1 mt-1" />
                )}
              </button>
            </div>
          </div>

          {/* Filtering Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
            {["All", "Posts", "Videos", "Assessments", "Milestones"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${
                  activeTab === tab 
                    ? "bg-foreground text-white"
                    : "bg-white text-foreground/60 border border-black/5 hover:bg-black/5 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Feed Posts */}
          {loading ? (
             <div className="text-center py-10 font-bold text-black/50">Loading ecosystem data...</div>
          ) : posts.length === 0 ? (
             <div className="bg-white rounded-3xl p-8 border border-black/10 text-center">
                 <h3 className="font-extrabold text-xl">The feed is remarkably quiet.</h3>
                 <p className="text-sm font-medium mt-2 text-black/60">Be the first to drop a protocol log above.</p>
             </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black/10 mb-8 relative group">
                <div className="absolute top-8 right-8 bg-black text-white px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide hidden sm:block">
                  Protocol Log
                </div>

                <div className="flex items-start gap-4 mb-6">
                   <div className="w-14 h-14 rounded-full overflow-hidden bg-black/5 shadow-inner border border-black/10">
                     <img src={post.profiles?.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80"} alt={post.profiles?.first_name} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-extrabold text-xl flex items-center gap-2 text-black">
                      {post.profiles?.first_name} {post.profiles?.last_name} <span className="w-4 h-4 bg-accent rounded-full border border-white shadow-sm flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
                    </h3>
                    <p className="text-base font-semibold text-black/60 mt-0.5">{formatDate(post.created_at)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xl font-medium leading-relaxed text-black whitespace-pre-wrap">
                    {post.content}
                  </p>
                  
                  {/* Media Content (Image or Video) */}
                  {post.image_url && (
                    <div className="rounded-2xl overflow-hidden shadow-md border border-black/5 w-full bg-black mt-4">
                      {post.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video 
                          src={post.image_url} 
                          controls 
                          className="w-full h-auto max-h-[600px] block" 
                        />
                      ) : (
                        <img 
                          src={post.image_url} 
                          alt="Progress context" 
                          className="w-full h-auto max-h-[600px] object-cover block" 
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/10">
                  <div className="flex items-center gap-8">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2.5 text-black hover:text-accent font-bold text-sm transition-colors group"
                    >
                      <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
                      <span>{post.likes_count || 0}</span>
                    </button>
                    <button onClick={() => alert("Comments thread architecture is currently initializing...")} className="flex items-center gap-2.5 text-black hover:text-blue-500 font-bold text-sm transition-colors group">
                      <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
                      <span>{post.comments_count || 0}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-black">
                    <button onClick={() => alert("Share to external networks coming soon!")} className="hover:text-accent transition-colors p-2 rounded-full hover:bg-black/5">
                       <Share2 className="w-6 h-6" />
                    </button>
                    <button onClick={() => alert("Context menu opening...")} className="hover:text-accent transition-colors p-2 rounded-full hover:bg-black/5">
                       <MoreHorizontal className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

        </div>

        {/* Right Sidebar Widget Column */}
        <div className="lg:col-span-4 space-y-6 hidden lg:block">
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/10 text-center sticky top-28">
             <div className="flex justify-center -space-x-3 mb-6">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md z-[${10-i}]`}>
                     <img src={`https://i.pravatar.cc/150?img=${i+40}`} alt="avatar" />
                  </div>
                ))}
             </div>
             <h3 className="font-extrabold text-2xl text-black leading-tight mb-3">Build your inner circle.</h3>
             <p className="text-sm font-semibold text-black/70 mb-8 leading-relaxed">
               Let the network know your protocols. Connect with friends and amplify your ecosystem.
             </p>
             <div className="space-y-4">
               <button className="w-full bg-black text-white py-4 rounded-full text-sm font-bold hover:bg-black/80 transition-colors shadow-md">
                 Connect Contacts
               </button>
               <button className="w-full bg-[#f4f6f0] text-black py-4 rounded-full text-sm font-bold border border-black/10 hover:bg-[#ebefe5] transition-colors">
                 Find Members
               </button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
