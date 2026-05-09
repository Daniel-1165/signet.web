import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Search,
  Bell,
  Calendar,
  Eye,
  Heart,
  Target,
  TrendingUp,
  ListOrdered,
  Sun,
  Moon,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Footer from "@/components/layout/Footer";

export default async function DashboardPage() {
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCFB] text-[#1D1914]">
        <h1 className="text-2xl font-bold font-heading">Unauthorized</h1>
        <Link href="/" className="mt-4 text-[#6E7A67] hover:underline">
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
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1914] selection:bg-[#D8CEBF]/40 selection:text-[#1D1914] pb-24 md:pb-12 pt-0 md:pt-6">
      {/* Editorial Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-8 max-w-[1400px] mx-auto border-b border-[#D8CEBE]/30 mb-8">
        <div>
           <h1 className="text-[32px] font-bold tracking-tight text-[#1D1914]" style={{ fontFamily: "'Playfair Display', serif" }}>
             Welcome back, <span className="text-[#6E7A67] italic font-normal">{user.firstName}</span>.
           </h1>
           <p className="text-[14px] text-[#6E7A67]/60 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Your intentional growth continues today.</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7A67]/40" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="pl-11 pr-5 py-2.5 bg-white rounded-full text-sm border border-[#D8CEBE]/40 focus:border-[#6E7A67] outline-none shadow-sm transition-all w-72 text-[#1D1914] font-body"
            />
          </div>
          <div className="flex items-center gap-5">
            <button className="text-[#6E7A67] hover:text-[#1D1914] transition-colors relative">
               <Bell className="w-5 h-5" />
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B4513] rounded-full border-2 border-[#FDFCFB]" />
            </button>
            <button className="text-[#6E7A67] hover:text-[#1D1914] transition-colors"><Calendar className="w-5 h-5" /></button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-110 transition-transform"><UserButton /></div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto md:px-10 space-y-12 md:space-y-20">
        {/* Premium Hero Section */}
        <section className="relative w-full h-[450px] md:rounded-[2.5rem] overflow-hidden group">
          <img src="/forest_hero_bg.png" alt="Forest" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:scale-[1.03] transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D1914]/80 via-[#1D1914]/40 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-24 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-[1px] bg-[#D8CEBF]" />
               <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D8CEBF]" style={{ fontFamily: "'Inter', sans-serif" }}>
                 The Silent Collective
               </span>
            </div>
            <h2 className="text-[44px] md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Elevate through <br /> <span className="italic font-normal text-[#D8CEBF]">intentional</span> silence.
            </h2>
            <Link href="#" className="flex items-center gap-3 group/btn text-white w-fit">
               <span className="text-sm font-bold tracking-widest uppercase border-b border-white pb-1 group-hover/btn:pr-2 transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>Read the Manifesto</span>
               <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Core Daily Focus */}
        <section className="px-6 md:px-0">
           <div className="flex items-end justify-between mb-8 border-b border-[#D8CEBE]/30 pb-4">
             <div>
                <h3 className="text-[28px] font-bold text-[#1D1914]" style={{ fontFamily: "'Playfair Display', serif" }}>Daily Discipline</h3>
                <p className="text-[14px] text-[#6E7A67]/60">Your current trajectory and focus areas.</p>
             </div>
             <button className="text-[11px] font-bold text-[#6E7A67] hover:text-[#1D1914] uppercase tracking-widest flex items-center gap-2 group transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>
               Full Progress History <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-[#D8CEBE]/30 relative overflow-hidden group hover:border-[#6E7A67]/30 transition-all">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#6E7A67]/5 flex items-center justify-center text-[#6E7A67]">
                       <Sun className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#D8CEBF] uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif" }}>Phase 01</span>
                 </div>
                 <h4 className="text-[22px] font-bold text-[#1D1914] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Morning Solitude</h4>
                 <div className="w-full bg-[#FDFCFB] rounded-full h-1.5 mb-2 overflow-hidden border border-[#D8CEBE]/20">
                    <div className="bg-[#6E7A67] h-full rounded-full transition-all duration-1000" style={{ width: '65%' }} />
                 </div>
                 <div className="flex justify-between items-center mt-3">
                   <p className="text-[12px] text-[#6E7A67] font-medium">65% Completed</p>
                   <p className="text-[12px] text-[#D8CEBF] italic">15 mins to go</p>
                 </div>
              </div>

              <div className="bg-[#1D1914] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group border border-white/5">
                 <Moon className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5" />
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#D8CEBF]">
                       <Moon className="w-6 h-6" />
                    </div>
                 </div>
                 <h4 className="text-[22px] font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Evening Synthesis</h4>
                 <p className="text-[14px] text-[#D8CEBF]/60 leading-relaxed mb-6">Capture the day&apos;s essence and prepare your mind for REST.</p>
                 <button className="px-6 py-2.5 rounded-full bg-white text-[#1D1914] font-bold text-[12px] uppercase tracking-widest hover:bg-[#D8CEBF] transition-colors">Start Session</button>
              </div>

              <div className="bg-[#D8CEBF]/10 rounded-[2rem] p-8 border border-[#D8CEBE]/40 flex flex-col justify-center items-center text-center">
                 <Sparkles className="w-10 h-10 text-[#6E7A67] mb-4 opacity-40" />
                 <p className="text-[15px] text-[#1D1914] font-medium leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>&ldquo;Mastery is the byproduct of relentless, quiet repetition.&rdquo;</p>
              </div>
           </div>
        </section>

        {/* Philosophical Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-0">
          <div className="bg-white rounded-[2.5rem] p-12 border border-[#D8CEBE]/30 hover:shadow-2xl transition-all duration-500 group relative">
            <Eye className="absolute top-12 right-12 w-6 h-6 text-[#6E7A67]/20" />
            <h3 className="text-[12px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-6">The Vision</h3>
            <p className="text-[32px] md:text-[40px] font-bold text-[#1D1914] leading-[1.2] tracking-tight group-hover:text-[#6E7A67] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              A world where impact exceeds volume.
            </p>
            <p className="mt-8 text-[16px] text-[#6E7A67] leading-relaxed max-w-md">
              Becoming the trusted ecosystem for high-performers seeking intentionality in a loud world.
            </p>
          </div>

          <div className="bg-[#6E7A67]/5 rounded-[2.5rem] p-12 border border-[#6E7A67]/10 flex flex-col justify-center">
            <h3 className="text-[12px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-6">The Mission</h3>
            <p className="text-[20px] md:text-[24px] font-medium text-[#1D1914] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              To equip silent architects with the psychological infrastructure needed to build legacies of substance over status.
            </p>
            <div className="mt-10 flex gap-4">
               <div className="w-2 h-2 rounded-full bg-[#6E7A67]" />
               <div className="w-2 h-2 rounded-full bg-[#D8CEBF]" />
               <div className="w-2 h-2 rounded-full bg-[#1D1914]" />
            </div>
          </div>
        </div>

        {/* Growth Architecture */}
        <div className="px-6 md:px-0 space-y-12">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-[32px] md:text-[44px] font-bold text-[#1D1914] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Growth Architecture</h3>
              <p className="text-[16px] text-[#6E7A67]">The pillars of the Signet methodology.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Emotional Intelligence", icon: Heart, label: "01" },
                { title: "Self-Awareness", icon: Target, label: "02" },
                { title: "Resilience", icon: TrendingUp, label: "03" },
                { title: "Systems Thinking", icon: ListOrdered, label: "04" }
              ].map((pillar, i) => (
                <div key={i} className="group bg-white rounded-3xl p-10 text-left hover:bg-[#1D1914] transition-all duration-500 border border-[#D8CEBE]/30 flex flex-col min-h-[220px]">
                   <span className="text-[11px] font-bold text-[#D8CEBF] group-hover:text-white/40 transition-colors mb-auto tracking-widest">{pillar.label}</span>
                   <pillar.icon className="w-8 h-8 text-[#6E7A67] mb-6 group-hover:text-white transition-colors" />
                   <h4 className="text-[18px] font-bold text-[#1D1914] group-hover:text-white transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{pillar.title}</h4>
                </div>
              ))}
           </div>
        </div>

        {/* Final Roadmap */}
        <div className="py-20 border-t border-[#D8CEBE]/30">
            <Process />
        </div>

        {/* Community & Legacy - Last section before footer */}
        <div className="py-20 border-t border-[#D8CEBE]/30">
            <h3 className="text-[32px] font-bold text-[#1D1914] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Community Experiences</h3>
            <Testimonials />
        </div>
      </div>

      <Footer />
    </div>
  );
}
