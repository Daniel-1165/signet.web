'use client';

import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { Search, Bell, Calendar, Sparkles, TrendingUp, Clock } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useSupabaseClient } from "@/lib/supabase/client";

export default function CommunityHubPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('trending');
  
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

  const scrollToCreate = () => {
    const element = document.getElementById('create-post-section');
    element?.scrollIntoView({ behavior: 'smooth' });
    const textarea = element?.querySelector('textarea');
    textarea?.focus();
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1914] pt-4 md:pt-8">
      {/* Editorial Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between py-6 md:py-10 max-w-[1300px] mx-auto px-5 md:px-6 border-b border-[#D8CEBE]/40 mb-8 md:mb-12 gap-6 md:gap-0">
        <div>
           <div className="flex items-center gap-2 text-[#1E6B3A] mb-2">
             <Sparkles size={14} className="md:w-4 md:h-4" />
             <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">The Collective</span>
           </div>
           <h1 className="text-[32px] md:text-[44px] font-bold leading-tight text-[#114B2A]" >
             Community <span className="italic font-normal text-[#1E6B3A]">Hub</span>
           </h1>
        </div>
        
        {/* Right side search/filters - hidden on small mobile, handled differently if needed */}
        <div className="flex items-center gap-4 md:gap-8 pb-1 overflow-x-auto no-scrollbar">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E6B3A]/40" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="pl-11 pr-5 py-2.5 bg-white rounded-full text-sm border border-[#D8CEBE]/40 focus:border-[#1E6B3A] outline-none shadow-sm transition-all w-full sm:w-[240px] lg:w-[320px] text-[#114B2A] font-body"
            />
          </div>
          <div className="flex bg-[#EAF4EC]/50 rounded-full p-1 border border-[#D8CEBE]/20 shrink-0">
             <button 
                onClick={() => setActiveFilter('trending')}
                className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-[11px] md:text-[12px] font-bold transition-all ${activeFilter === 'trending' ? 'bg-[#1E6B3A] text-white shadow-md' : 'text-[#1E6B3A] hover:bg-white'}`}
             >
               <TrendingUp size={14} />
               Trending
             </button>
             <button 
                onClick={() => setActiveFilter('newest')}
                className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-[11px] md:text-[12px] font-bold transition-all ${activeFilter === 'newest' ? 'bg-[#1E6B3A] text-white shadow-md' : 'text-[#1E6B3A] hover:bg-white'}`}
             >
               <Clock size={14} />
               Newest
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 md:gap-12 px-4 md:px-6 pb-32">
        <div className="space-y-8 md:space-y-10">
          <div id="create-post-section">
            <CreatePost onPostCreated={fetchPosts} />
          </div>

          <div className="space-y-6 md:space-y-8">
            {isLoading ? (
               <div className="space-y-6 md:space-y-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-white rounded-[1.5rem] md:rounded-[2rem] animate-pulse border border-[#D8CEBE]/20" />
                  ))}
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
              <div className="text-center py-20 md:py-24 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-[#D8CEBE]/30 shadow-sm px-6">
                <p className="text-[#1E6B3A] text-[15px] italic leading-relaxed" >The conversation is waiting for your insight.</p>
              </div>
            )}
            
            {!isLoading && posts.length > 0 && (
              <div className="pt-6 md:pt-8 flex justify-center">
                 <button className="text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase text-[#1E6B3A] hover:text-[#114B2A] transition-all border-b border-[#D8CEBE] pb-1">
                   Load older insights
                 </button>
              </div>
            )}
          </div>
        </div>

        <aside className="hidden lg:block space-y-10">
           {/* Mentors Section */}
           <div className="bg-white rounded-[2.5rem] p-8 border border-[#D8CEBE]/30 shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[18px] font-bold text-[#114B2A]" >Active Mentors</h3>
                <Link href="#" className="text-[#1E6B3A] text-[10px] font-bold tracking-[0.2em] uppercase border-b border-[#D8CEBE]">All</Link>
              </div>
              <div className="space-y-6">
                 {[
                   { name: "Sarah Jenkins", role: "Leadership Coach", icon: "SJ" },
                   { name: "Robert Aris", role: "Technical Architect", icon: "RA" },
                   { name: "Maria Chen", role: "Design Director", icon: "MC" }
                 ].map((mentor, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] font-bold text-[14px] group-hover:bg-[#1E6B3A] group-hover:text-white transition-all">
                            {mentor.icon}
                         </div>
                         <div>
                            <p className="text-[#114B2A] text-[15px] font-bold leading-tight">{mentor.name}</p>
                            <p className="text-[#1E6B3A]/60 text-[12px] font-medium">{mentor.role}</p>
                         </div>
                      </div>
                       <button className="w-8 h-8 rounded-full bg-[#EAF4EC] text-[#1E6B3A] flex items-center justify-center hover:bg-[#1E6B3A] hover:text-white transition-all text-xs font-bold">
                          ›
                       </button>
                   </div>
                 ))}
              </div>
           </div>
           
           {/* Events Section */}
           <div className="bg-white rounded-[2.5rem] p-8 border border-[#D8CEBE]/30 shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
              <h3 className="text-[18px] font-bold text-[#114B2A] mb-8" >Gatherings</h3>
              <div className="space-y-8">
                 {[
                   { title: "Mental Clarity Workshop", day: "12", month: "OCT", time: "10:00 AM" },
                   { title: "Mentorship Q&A", day: "15", month: "OCT", time: "04:30 PM" }
                 ].map((event, i) => (
                    <div key={i} className="flex gap-5 group cursor-pointer">
                       <div className="w-14 h-14 bg-[#FDFCFB] rounded-2xl flex flex-col items-center justify-center border border-[#D8CEBE]/40 shadow-sm group-hover:bg-[#1E6B3A] group-hover:border-[#1E6B3A] transition-all">
                          <span className="text-[9px] text-[#1E6B3A] font-bold group-hover:text-[#EAF4EC] transition-colors">{event.month}</span>
                          <span className="text-[20px] text-[#114B2A] font-bold group-hover:text-white transition-colors leading-none">{event.day}</span>
                       </div>
                       <div>
                          <h4 className="text-[15px] font-bold text-[#114B2A] leading-tight mb-1">{event.title}</h4>
                          <p className="text-[#1E6B3A]/60 text-[12px] font-medium">{event.time} • Live Session</p>
                       </div>
                    </div>
                  ))}
              </div>
              <button 
                onClick={() => alert('Calendar feature integrated with Google Calendar is coming in the next build!')}
                className="w-full mt-10 py-3.5 rounded-2xl border border-[#D8CEBE] text-[#114B2A] font-bold text-[12px] uppercase tracking-widest hover:bg-[#1E6B3A] hover:text-white hover:border-[#1E6B3A] transition-all"
              >
                 Browse Calendar
              </button>
           </div>
 
           {/* Pulse Widget */}
           <div className="bg-[#114B2A] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <Sparkles className="absolute -top-6 -right-6 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#EAF4EC]/60">Pulse</span>
              <p className="text-white text-[38px] font-bold mt-2" >4,821</p>
              <p className="text-[#EAF4EC] text-[13px] font-medium mb-6">Network Nodes</p>
              
              <div className="w-full h-[3px] bg-white/10 rounded-full mb-4 overflow-hidden">
                 <div className="h-full bg-[#EAF4EC] w-[75%] rounded-full shadow-[0_0_10px_rgba(234,244,236,0.5)]" />
              </div>
              <p className="text-[11px] text-white/40 font-medium leading-relaxed italic">The collective is evolving by 12% peer density this month.</p>
           </div>
        </aside>
      </div>


    </div>
  );
}
