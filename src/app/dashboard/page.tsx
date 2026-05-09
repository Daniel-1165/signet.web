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
  ListOrdered,
  Sun,
  Moon
} from "lucide-react";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";

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
    <div className="min-h-screen bg-[#fff] text-[#191c1d] selection:bg-[#83fba5]/30 selection:text-[#005746] pb-24 md:pb-12 pt-0 md:pt-4">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 py-6 max-w-7xl mx-auto bg-white rounded-t-3xl border-b border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          SIGNET Home Hub
        </h1>
        <div className="flex items-center gap-6">
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

      <main className="max-w-7xl mx-auto md:px-8 space-y-10 md:space-y-12">
        {/* Mobile Full-Bleed Hero (rounded on desktop) */}
        <section className="relative w-full h-[320px] md:h-[400px] md:rounded-[1.5rem] overflow-hidden group">
          <img src="/forest_hero_bg.png" alt="Forest" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#005746]/20 via-[#005746]/10 to-white md:to-[#fff]/80" />
          
          <div className="relative h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-3xl">
            <div className="mb-2">
               <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-white bg-[#005746]/80 backdrop-blur-md px-3 py-1.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                 Silent Growth Network
               </span>
            </div>
            <h2 className="text-[38px] md:text-5xl font-bold text-[#005746] md:text-[#005746] leading-[1.1] tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Master your path.
            </h2>
            <p className="hidden md:block mt-4 text-sm md:text-md text-[#3e4945] leading-relaxed max-w-xl font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
              Welcome to SIGNET, where impact is measured by depth and growth is fostered in the quiet spaces of collective wisdom.
            </p>
          </div>
        </section>

        {/* Daily Discipline */}
        <section className="px-6 md:px-0">
           <div className="flex items-baseline justify-between mb-4">
             <h3 className="text-xl md:text-2xl font-bold text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Daily Discipline</h3>
             <button className="text-[11px] font-bold text-[#005746] hover:text-[#006d36] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
               View History
             </button>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x pr-6 md:pr-0">
              <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-[#f2f4f5] flex-shrink-0 snap-start">
                 <div className="flex items-center justify-between mb-4">
                    <Sun className="w-5 h-5 text-[#005746]" />
                    <span className="text-[11px] font-bold text-[#6e7975] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Day 12/30</span>
                 </div>
                 <h4 className="text-[18px] font-bold text-[#191c1d] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Morning Silence</h4>
                 <div className="w-full bg-[#f2f4f5] rounded-full h-2 mb-2">
                   <div className="bg-[#83fba5] h-2 rounded-full relative" style={{ width: '65%' }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#83fba5] rounded-full shadow-sm" />
                   </div>
                 </div>
                 <p className="text-[11px] text-[#6e7975] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>65% toward today&apos;s goal</p>
              </div>

              <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-[#f2f4f5] flex-shrink-0 snap-start opacity-70">
                 <div className="flex items-center justify-between mb-4">
                    <Moon className="w-5 h-5 text-[#6e7975]" />
                 </div>
                 <h4 className="text-[18px] font-bold text-[#191c1d] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Evening Reflection</h4>
                 <p className="text-[13px] text-[#6e7975] leading-relaxed mb-4">Reflect on the day&apos;s progress to build your mental muscle.</p>
                 <button className="text-[11px] font-bold text-[#005746] hover:text-[#006d36] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Begin Entry
                 </button>
              </div>
           </div>
        </section>

        {/* Vision & Mission Cards */}
        <div className="px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-[#005746] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,87,70,0.2)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <Eye className="absolute -bottom-8 -right-8 w-48 h-48 text-black opacity-10" />
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>The Vision</h3>
            <p className="text-[15px] text-[#9df2d8] leading-relaxed relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
              To become the world&apos;s most trusted network for silent high-performers seeking intentional evolution.
            </p>
          </div>

          <div className="bg-white border-l-4 border-[#005746] rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#005746] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>The Mission</h3>
            <p className="text-[15px] text-[#3e4945] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Equipping individuals with the psychological tools and community mentorship required to transcend mediocrity.
            </p>
          </div>
        </div>

        {/* About SIGNET */}
        <div className="mx-6 md:mx-0 bg-white rounded-[1.5rem] p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#f2f4f5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div>
                <h3 className="text-2xl md:text-[32px] font-bold text-[#005746] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>About SIGNET</h3>
                <p className="text-[15px] text-[#3e4945] leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Our approach blends ancient Stoic philosophy with modern behavioral science to foster genuine self-mastery through mentorship.
                </p>
                
                <Link href="#" className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3.5 rounded-[0.5rem] bg-[#005746] text-white font-medium text-[15px] shadow-[0_4px_20px_rgba(13,113,93,0.15)] hover:bg-[#004235] hover:shadow-[0_8px_25px_rgba(13,113,93,0.25)] transition-all">
                  Learn More
                </Link>
             </div>
             <div className="flex justify-center mt-4 md:mt-0">
                <div className="aspect-[4/3] md:aspect-square w-full rounded-xl overflow-hidden shadow-sm border border-[#e1e3e4] bg-[#f2f4f5]">
                   <img src="/mentorship_graphic.png" alt="Mentorship UI Mockup" className="w-full h-full object-cover object-top opacity-90 mix-blend-multiply" />
                </div>
             </div>
           </div>
        </div>

        {/* Growth Pillars */}
        <div className="px-6 md:px-0">
          <h3 className="text-xl md:text-[24px] font-bold text-[#005746] mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Growth Pillars</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#f8fafb] rounded-[1.2rem] p-6 text-center hover:bg-[#f2f4f5] transition-colors border border-transparent hover:border-[#e1e3e4] flex flex-col items-center justify-center min-h-[140px]">
               <div className="w-10 h-10 rounded-full bg-[#e6fcf2] flex items-center justify-center mb-3 text-[#005746]">
                 <Heart className="w-5 h-5 fill-current" />
               </div>
               <h4 className="text-[11px] font-bold text-[#191c1d] uppercase tracking-widest leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Emotional<br/>Intelligence</h4>
            </div>
            
            <div className="bg-[#f8fafb] rounded-[1.2rem] p-6 text-center hover:bg-[#f2f4f5] transition-colors border border-transparent hover:border-[#e1e3e4] flex flex-col items-center justify-center min-h-[140px]">
               <div className="w-10 h-10 rounded-full bg-[#e6fcf2] flex items-center justify-center mb-3 text-[#005746]">
                 <Target className="w-5 h-5" />
               </div>
               <h4 className="text-[11px] font-bold text-[#191c1d] uppercase tracking-widest leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Self-Awareness</h4>
            </div>
            
            <div className="bg-[#f8fafb] rounded-[1.2rem] p-6 text-center hover:bg-[#f2f4f5] transition-colors border border-transparent hover:border-[#e1e3e4] flex flex-col items-center justify-center min-h-[140px]">
               <div className="w-10 h-10 rounded-full bg-[#e6fcf2] flex items-center justify-center mb-3 text-[#005746]">
                 <TrendingUp className="w-5 h-5" />
               </div>
               <h4 className="text-[11px] font-bold text-[#191c1d] uppercase tracking-widest leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Resilience</h4>
            </div>

            <div className="bg-[#f8fafb] rounded-[1.2rem] p-6 text-center hover:bg-[#f2f4f5] transition-colors border border-transparent hover:border-[#e1e3e4] flex flex-col items-center justify-center min-h-[140px]">
               <div className="w-10 h-10 rounded-full bg-[#e6fcf2] flex items-center justify-center mb-3 text-[#005746]">
                 <ListOrdered className="w-5 h-5" />
               </div>
               <h4 className="text-[11px] font-bold text-[#191c1d] uppercase tracking-widest leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Systems<br/>Thinking</h4>
            </div>
          </div>
        </div>

        {/* Legacy Sections Re-Integration */}
        <div className="py-12 border-t border-[#f2f4f5] mt-12">
            <h3 className="text-xl md:text-[24px] font-bold text-[#005746] mb-8 text-center" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Community Experiences</h3>
            <Testimonials />
        </div>
        <div className="py-12 border-t border-[#f2f4f5]">
            <Process />
        </div>
      </main>

      <footer className="mt-12 md:mt-24 border-t border-[#f2f4f5] py-8 md:flex md:items-center md:justify-between px-8 md:px-12 max-w-[1400px] mx-auto text-[11px] md:text-[12px] font-medium text-[#6e7975] bg-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <p className="text-center md:text-left mb-6 md:mb-0"><strong className="text-[#005746] tracking-widest font-bold">SIGNET</strong> © 2024 Silent Growth Network</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <Link href="#" className="hover:text-[#005746] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#005746] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[#005746] transition-colors">Community Guidelines</Link>
        </div>
      </footer>
    </div>
  );
}
