import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Search,
  Bell,
  Calendar,
  Eye,
  Rocket,
  Heart,
  Target,
  TrendingUp,
  ShieldCheck,
  ListOrdered
} from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafb] text-[#191c1d]">
        <h1 className="text-2xl font-bold font-heading">Unauthorized</h1>
        <Link href="/" className="mt-4 text-[#005746] hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const supabase = createServerSupabaseClient();
  
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error && error.code === 'PGRST116') {
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        first_name: user.firstName,
        last_name: user.lastName,
        image_url: user.imageUrl
      })
      .select()
      .single();
    
    if (!insertError) profile = newProfile;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#191c1d] selection:bg-[#83fba5]/30 selection:text-[#005746]">
      <header className="flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          SIGNET Home Hub
        </h1>
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7975]" />
            <input 
              type="text" 
              placeholder="Search insights..." 
              className="pl-10 pr-4 py-2 bg-[#f2f4f5] rounded-full text-sm border border-transparent focus:border-[#83fba5] outline-none shadow-[0_4px_20px_rgba(13,113,93,0.02)] transition-all w-64 text-[#3e4945] font-body"
            />
          </div>
          <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-[#191c1d] hover:text-[#005746] transition-colors"><Calendar className="w-5 h-5" /></button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform"><UserButton /></div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 pb-24 space-y-12">
        <section className="relative w-full h-[320px] rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgba(13,113,93,0.08)] group">
          <img src="/forest_hero_bg.png" alt="Forest" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-[#005746]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005746]/90 via-[#005746]/50 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center px-12 md:px-16 max-w-3xl">
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#9df2d8] mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Silent Growth Network
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Elevating Excellence through Organic Professionalism.
            </h2>
            <p className="text-sm md:text-md text-[#b8ecdc] leading-relaxed max-w-xl font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
              Welcome to SIGNET, where impact is measured by depth and growth is fostered in the quiet spaces of collective wisdom.
            </p>
          </div>
        </section>

        <div className="flex items-center gap-8 border-b border-[#e1e3e4] overflow-x-auto no-scrollbar pb-4 shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          <button className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-[#005746] border-b-2 border-[#005746] pb-4 -mb-4">
            <TrendingUp className="w-4 h-4" /> Growth
          </button>
          <button className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-[#6e7975] hover:text-[#005746] pb-4 -mb-4 transition-colors">
            <Target className="w-4 h-4" /> Disciplined Focus
          </button>
          <button className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-[#6e7975] hover:text-[#005746] pb-4 -mb-4 transition-colors">
            <ListOrdered className="w-4 h-4" /> Structured Merit
          </button>
          <button className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-[#6e7975] hover:text-[#005746] pb-4 -mb-4 transition-colors">
            <ShieldCheck className="w-4 h-4" /> Organic Integrity
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[1rem] p-8 shadow-[0_4px_20px_rgba(13,113,93,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-[0.5rem] bg-[#83fba5]/40 flex items-center justify-center mb-6 text-[#005746]">
               <Eye className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-[#191c1d] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Our Vision</h3>
            <p className="text-[16px] text-[#3e4945] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              To build a global network of trailblazers who model and replicate excellence in diverse spheres.
            </p>
          </div>
          <div className="bg-white rounded-[1rem] p-8 shadow-[0_4px_20px_rgba(13,113,93,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-[0.5rem] bg-[#83fba5]/40 flex items-center justify-center mb-6 text-[#005746]">
               <Rocket className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-[#191c1d] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Our Mission</h3>
            <p className="text-[16px] text-[#3e4945] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Ordinary persons achieving extraordinary results, silently and sustainably.
            </p>
          </div>
        </div>

        <div className="bg-[#f2f4f5] rounded-[1.5rem] p-12 md:p-16 hover:shadow-[0_4px_20px_rgba(13,113,93,0.03)] transition-shadow">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
                <h3 className="text-[32px] font-bold text-[#191c1d] mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>About SIGNET</h3>
                <div className="w-16 h-1.5 bg-[#006b58] mb-8" />
                
                <div className="space-y-6 text-[16px] text-[#3e4945] leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <p>
                    SIGNET stands for <strong>Silent Growth Network</strong>. We are a premier community dedicated to mentorship and professional excellence, operating on the principle that the most profound professional development often happens away from the spotlight.
                  </p>
                  <p>
                    Our ecosystem is designed for professionals who seek high-fidelity connections and a space to refine their craft with integrity. Here, we prioritize the organic evolution of skills and the steady cultivation of a leadership style rooted in substance rather than performance.
                  </p>
                </div>
                
                <Link href="#" className="inline-flex items-center px-6 py-3.5 rounded-[0.5rem] bg-[#005746] text-white font-medium text-[16px] shadow-[0_4px_20px_rgba(13,113,93,0.15)] hover:shadow-[0_8px_25px_rgba(13,113,93,0.25)] hover:-translate-y-0.5 transition-all">
                  Learn More About Our Philosophy
                </Link>
             </div>
             <div className="flex justify-center md:justify-end">
                <div className="aspect-square max-w-[340px] w-full rounded-[1rem] overflow-hidden shadow-xl border border-[#e1e3e4]">
                   <img src="/mentorship_graphic.png" alt="Mentorship" className="w-full h-full object-cover" />
                </div>
             </div>
           </div>
        </div>

        <div>
          <h3 className="text-[24px] font-bold text-[#191c1d] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Growth Pillars</h3>
          <p className="text-[16px] text-[#6e7975] mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Core attributes of Organic Professionalism</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[1rem] p-8 shadow-[0_4px_20px_rgba(13,113,93,0.05)] border border-[#f2f4f5] hover:border-[#83fba5] hover:-translate-y-1 transition-all duration-300">
               <div className="w-10 h-10 rounded-[0.5rem] bg-[#f8fafb] flex items-center justify-center mb-6 text-[#005746] border border-[#e1e3e4]">
                 <Heart className="w-5 h-5 fill-current" />
               </div>
               <h4 className="text-[18px] font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Emotional Intelligence</h4>
               <p className="text-[16px] text-[#6e7975] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>Understanding and managing emotions for better professional relationships.</p>
            </div>
            
            <div className="bg-white rounded-[1rem] p-8 shadow-[0_4px_20px_rgba(13,113,93,0.05)] border border-[#f2f4f5] hover:border-[#83fba5] hover:-translate-y-1 transition-all duration-300">
               <div className="w-10 h-10 rounded-[0.5rem] bg-[#f8fafb] flex items-center justify-center mb-6 text-[#005746] border border-[#e1e3e4]">
                 <Target className="w-5 h-5" />
               </div>
               <h4 className="text-[18px] font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Self-Awareness</h4>
               <p className="text-[16px] text-[#6e7975] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>Deeply understanding your own strengths, weaknesses, and motivations.</p>
            </div>
            
            <div className="bg-white rounded-[1rem] p-8 shadow-[0_4px_20px_rgba(13,113,93,0.05)] border border-[#f2f4f5] hover:border-[#83fba5] hover:-translate-y-1 transition-all duration-300">
               <div className="w-10 h-10 rounded-[0.5rem] bg-[#f8fafb] flex items-center justify-center mb-6 text-[#005746] border border-[#e1e3e4]">
                 <Eye className="w-5 h-5 fill-current" />
               </div>
               <h4 className="text-[18px] font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Vision</h4>
               <p className="text-[16px] text-[#6e7975] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>Cultivating a clear, long-term perspective for your professional journey.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#e1e3e4] py-10 md:flex md:items-center md:justify-between px-12 max-w-[1400px] mx-auto text-[12px] font-medium text-[#3e4945] bg-[#f8fafb]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <p className="text-center md:text-left mb-4 md:mb-0"><strong className="text-[#005746] tracking-widest font-bold">SIGNET</strong> © 2024 Silent Growth Network</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <Link href="#" className="hover:text-[#005746] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#005746] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[#005746] transition-colors">Community Guidelines</Link>
        </div>
      </footer>
    </div>
  );
}
