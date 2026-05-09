import { auth } from "@clerk/nextjs/server";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Search, Bell, Calendar, Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default async function CommunityHubPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
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
      ),
      post_comments (
        id,
        content,
        created_at,
        profiles (
          first_name,
          last_name,
          image_url
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  const posts = data || [];

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#191c1d]">
      <header className="flex items-center justify-between py-6 max-w-[1200px] mx-auto">
        <h1 className="text-[28px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Community Hub
        </h1>
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7975]" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="pl-10 pr-4 py-2 bg-[#f2f4f5] rounded-full text-[14px] border border-transparent focus:border-[#83fba5] outline-none transition-all w-[280px] text-[#3e4945] font-body"
            />
          </div>
          <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Calendar className="w-5 h-5" /></button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#83fba5] shadow-sm"><UserButton /></div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 pb-32">
        <div className="space-y-8">
          <CreatePost />

          <div className="flex items-center justify-between pt-2">
             <h2 className="text-[20px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
               Community Insights
             </h2>
             <div className="flex bg-[#f2f4f5] rounded-full p-1 border border-[#e1e3e4]">
                <button className="px-5 py-1.5 rounded-full bg-[#005746] text-white text-[12px] font-bold tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Trending
                </button>
                <button className="px-5 py-1.5 rounded-full text-[#6e7975] text-[12px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Newest
                </button>
             </div>
          </div>

          <div className="space-y-6">
            {posts && posts.length > 0 ? (
              posts.map((post: any) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  profile={post.profiles}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[1rem] border border-[#e1e3e4]">
                <p className="text-[#6e7975] text-[14px]">No insights posted yet.</p>
              </div>
            )}
            
            <div className="pt-4 flex justify-center">
               <button className="text-[#005746] font-bold text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                 Load more insights
               </button>
            </div>
          </div>
        </div>

        <aside className="hidden lg:block space-y-6">
           <div className="bg-white rounded-[1rem] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f2f4f5]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Active Mentors</h3>
                <span className="text-[#005746] text-[12px] font-medium tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>View All</span>
              </div>
              <div className="space-y-5">
                 {/* Dummy Mentors to match UI exactly */}
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <img src="/placeholder-avatar.png" className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#83fba5] border-2 border-white" />
                       </div>
                       <div>
                          <p className="text-[#191c1d] text-[14px] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Sarah Jenkins</p>
                          <p className="text-[#6e7975] text-[12px]">Leadership Coach</p>
                       </div>
                    </div>
                    <button className="px-3 py-1 rounded-full bg-[#f8fafb] text-[#005746] text-[12px] font-bold hover:bg-[#83fba5]/20 transition-colors">Connect</button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <img src="/placeholder-avatar.png" className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#005746] border-2 border-white" />
                       </div>
                       <div>
                          <p className="text-[#191c1d] text-[14px] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Robert Aris</p>
                          <p className="text-[#6e7975] text-[12px]">Technical Architect</p>
                       </div>
                    </div>
                    <button className="px-3 py-1 rounded-full bg-[#f8fafb] text-[#005746] text-[12px] font-bold hover:bg-[#83fba5]/20 transition-colors">Connect</button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-[#eceeef] flex items-center justify-center text-[#005746] font-bold text-[14px]">MC</div>
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#e1e3e4] border-2 border-white" />
                       </div>
                       <div>
                          <p className="text-[#191c1d] text-[14px] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Maria Chen</p>
                          <p className="text-[#6e7975] text-[12px]">Design Director</p>
                       </div>
                    </div>
                    <button className="px-3 py-1 rounded-full bg-[#f8fafb] text-[#005746] text-[12px] font-bold hover:bg-[#83fba5]/20 transition-colors">Connect</button>
                 </div>
              </div>
           </div>
           
           <div className="bg-white rounded-[1rem] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f2f4f5]">
              <h3 className="text-[16px] font-bold text-[#005746] mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Upcoming Events</h3>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#f8fafb] rounded-[0.5rem] flex flex-col items-center justify-center border border-[#e1e3e4] shrink-0">
                       <span className="text-[10px] text-[#6e7975] font-bold">OCT</span>
                       <span className="text-[16px] text-[#005746] font-bold">12</span>
                    </div>
                    <div>
                       <h4 className="text-[14px] font-bold text-[#191c1d]">Mental Clarity Workshop</h4>
                       <p className="text-[#6e7975] text-[12px] mt-1 flex items-center gap-1">
                         🕒 10:00 AM • Live Session
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#f8fafb] rounded-[0.5rem] flex flex-col items-center justify-center border border-[#e1e3e4] shrink-0">
                       <span className="text-[10px] text-[#6e7975] font-bold">OCT</span>
                       <span className="text-[16px] text-[#005746] font-bold">15</span>
                    </div>
                    <div>
                       <h4 className="text-[14px] font-bold text-[#191c1d]">Mentorship Q&A</h4>
                       <p className="text-[#6e7975] text-[12px] mt-1 flex items-center gap-1">
                         🕒 04:30 PM • 45 mins
                       </p>
                    </div>
                 </div>
              </div>
              <button className="w-full mt-6 py-2.5 rounded-[0.5rem] border border-[#005746] text-[#005746] font-bold text-[14px] hover:bg-[#f8fafb] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                 Browse All Events
              </button>
           </div>

           <div className="bg-[#005746] rounded-[1rem] p-6 shadow-xl relative overflow-hidden">
              <span className="text-[10px] font-medium tracking-widest uppercase text-[#9df2d8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Network Strength</span>
              <p className="text-white text-[32px] font-bold mt-2 mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>4,821</p>
              
              <div className="w-full h-2 bg-[#0d715d] rounded-full mb-3 overflow-hidden">
                 <div className="h-full bg-[#83fba5] w-[75%] rounded-full" />
              </div>
              <p className="text-[10px] text-[#9df2d8]/70 font-medium">Growth of +12% this month in peer connections.</p>
           </div>
        </aside>
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#005746] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,87,70,0.3)] hover:scale-105 transition-transform z-50">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
