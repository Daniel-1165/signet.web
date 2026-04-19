import { auth } from "@clerk/nextjs/server";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";

export default async function CommunityHubPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/community/posts`, {
    cache: 'no-store'
  });
  const posts = response.ok ? await response.json() : [];

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#232826]/50 soft-blur border border-white/5 p-12 rounded-[3.5rem] inner-glow signet-glow">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1DA756]/10 text-[#1DA756] text-[10px] font-bold uppercase tracking-widest border border-[#1DA756]/20">
             <div className="w-1.5 h-1.5 rounded-full bg-[#1DA756] animate-pulse" /> The Collective Feed
          </div>
          <h2 className="text-5xl font-extrabold tracking-tighter text-white font-heading">Inner Circle <span className="text-[#1DA756]/60 italic font-light font-sans">Insights.</span></h2>
          <p className="max-w-md text-white/40 leading-relaxed font-outfit text-sm">
            Engage with our elite community. Share high-signal insights, professional milestones, and strategic growth challenges.
          </p>
        </div>
        <div className="flex -space-x-3 overflow-hidden">
          {[1,2,3,4,5].map(i => (
             <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0D120E] bg-[#3C413F] border border-white/10" />
          ))}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA756] text-[10px] font-bold text-[#0D120E] ring-2 ring-[#0D120E]">
             +82
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-8">
          <CreatePost />

          <div className="space-y-8">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  profile={post.profiles}
                />
              ))
            ) : (
              <div className="text-center py-24 bg-[#232826]/30 rounded-[3rem] border border-dashed border-white/5 soft-blur">
                <div className="w-16 h-16 bg-[#1DA756]/5 rounded-full flex items-center justify-center text-[#1DA756]/20 mx-auto mb-6">
                   <div className="text-3xl animate-pulse">🕯️</div>
                </div>
                <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">The collective feed is waiting for its first spark.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Mini-Content */}
        <aside className="hidden lg:block space-y-8">
           <div className="p-8 bg-[#232826]/50 soft-blur border border-white/5 rounded-[2.5rem] space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/20 font-heading">Hot Topics</h3>
              <div className="space-y-4">
                 {['#productivity', '#wellness', '#compounding', '#focus'].map(tag => (
                    <div key={tag} className="flex items-center justify-between text-xs group cursor-pointer">
                       <span className="text-white/40 group-hover:text-white transition-colors">{tag}</span>
                       <span className="text-white/10 font-mono">12k</span>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="p-8 bg-gradient-to-br from-[#232826] to-[#0D120E] border border-[#1DA756]/10 rounded-[2.5rem] space-y-4 shadow-[inset_0_0_20px_rgba(74,222,128,0.02)]">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#1DA756] font-heading">Weekly Sprint</h3>
              <p className="text-[11px] text-white/40 leading-relaxed font-outfit">Join the group sprint for "Deep Work Optimization" starting this Monday.</p>
              <button className="w-full py-3 bg-[#1DA756]/10 text-[#1DA756] border border-[#1DA756]/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#1DA756] hover:text-[#0D120E] transition-all">Join Sprint</button>
           </div>
        </aside>
      </div>
    </div>
  );
}
