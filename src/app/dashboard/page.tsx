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
  Sparkles,
  ChevronLeft,
  ChevronRight
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

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 space-y-12 md:space-y-20">
        {/* Premium Hero Section */}
        <section className="relative w-full h-[420px] md:h-[500px] md:rounded-[2.5rem] overflow-hidden group">
          <img src="/forest_hero_bg.png" alt="Forest" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:scale-[1.03] transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D1914]/80 via-[#1D1914]/50 to-[#1D1914]/20" />
          
          <div className="relative h-full flex flex-col justify-center px-6 md:px-24 w-full overflow-hidden">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
               <div className="w-8 md:w-10 h-[1px] bg-[#D8CEBF]" />
               <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase text-[#D8CEBF]" style={{ fontFamily: "'Inter', sans-serif" }}>
                 Silent Growth Network
               </span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 md:mb-8 max-w-[90%] md:max-w-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Become Intentional<br className="md:hidden" /> about{" "}
              <span className="italic font-normal text-[#D8CEBF]">Growth</span>
              <br className="hidden md:block" /> and Development.
            </h2>
            <Link href="/dashboard/community" className="flex items-center gap-3 group/btn text-white w-fit">
               <span className="text-xs md:text-sm font-bold tracking-widest uppercase border-b border-white pb-1 group-hover/btn:pr-2 transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>Join community</span>
               <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Featured Insights & Wisdom Scroller */}
        <section className="px-6 md:px-0">
           <div className="flex items-end justify-between mb-8 border-b border-[#D8CEBE]/30 pb-4">
             <div>
                <h3 className="text-[28px] font-bold text-[#1D1914]" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Insights</h3>
                <p className="text-[14px] text-[#6E7A67]/60">Wisdom carefully curated for the intentional growth network.</p>
             </div>
             <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full border border-[#D8CEBE] flex items-center justify-center text-[#6E7A67] opacity-20"><ChevronLeft size={16} /></div>
                <div className="w-8 h-8 rounded-full border border-[#D8CEBE] flex items-center justify-center text-[#6E7A67]"><ChevronRight size={16} /></div>
             </div>
           </div>
           
           <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x">
              {[
                { title: "Quiet Leadership", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600", tag: "Strategy" },
                { title: "Intentional Focus", img: "https://images.unsplash.com/photo-1506485338023-6ce5f36692df?auto=format&fit=crop&q=80&w=600", tag: "Mindset" },
                { title: "Mastery of Repetition", img: "https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=600", tag: "Discipline" },
                { title: "The Power of Reflection", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600", tag: "Wisdom" }
              ].map((card, i) => (
                <div key={i} className="flex-none w-[280px] md:w-[350px] snap-start group cursor-pointer">
                   <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 border border-[#D8CEBE]/30 shadow-sm relative">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] font-black uppercase text-white tracking-widest">{card.tag}</div>
                   </div>
                   <h4 className="text-[18px] md:text-[20px] font-bold text-[#1D1914] leading-tight group-hover:text-[#6E7A67] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h4>
                   <p className="text-[12px] text-[#6E7A67]/60 mt-1 font-medium">Click to expand insight • 5 min read</p>
                </div>
              ))}
           </div>
        </section>

        {/* Philosophical Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-0">
          <div className="bg-white rounded-[2.5rem] p-12 border border-[#D8CEBE]/30 hover:shadow-2xl transition-all duration-500 group relative">
            <Eye className="absolute top-12 right-12 w-6 h-6 text-[#6E7A67]/20" />
            <h3 className="text-[12px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-6">The Vision</h3>
            <p className="text-[28px] md:text-[34px] font-bold text-[#1D1914] leading-[1.2] tracking-tight group-hover:text-[#6E7A67] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              To build a global network of trailblazers who <span className="italic font-normal text-[#6E7A67]">model and replicate excellence</span> in diverse spheres.
            </p>
          </div>

          <div className="bg-[#6E7A67]/5 rounded-[2.5rem] p-12 border border-[#6E7A67]/10 flex flex-col justify-center">
            <h3 className="text-[12px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-6">The Mission</h3>
            <p className="text-[20px] md:text-[24px] font-medium text-[#1D1914] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ordinary persons achieving <span className="italic text-[#6E7A67]">extraordinary results</span> silently and sustainably.
            </p>
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
