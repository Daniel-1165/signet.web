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
            <h2 className="text-[22px] sm:text-[28px] md:text-7xl font-bold text-white leading-[1.2] tracking-tight mb-6 md:mb-8 max-w-full md:max-w-4xl px-2 md:px-0" style={{ fontFamily: "'Playfair Display', serif" }}>
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


        {/* Philosophical Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-[#D8CEBE]/30 hover:shadow-2xl transition-all duration-500 group relative">
            <Eye className="absolute top-6 right-6 md:top-12 md:right-12 w-5 h-5 text-[#6E7A67]/20" />
            <h3 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-3">The Vision</h3>
            <p className="text-[18px] sm:text-[20px] md:text-[34px] font-bold text-[#1D1914] leading-[1.3] tracking-tight group-hover:text-[#6E7A67] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              To build a global network of trailblazers who <span className="italic font-normal text-[#6E7A67]">model and replicate excellence</span> in diverse spheres.
            </p>
          </div>

          <div className="bg-[#6E7A67]/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-[#6E7A67]/10 flex flex-col justify-center">
            <h3 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-3">The Mission</h3>
            <p className="text-[16px] sm:text-[18px] md:text-[24px] font-medium text-[#1D1914] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ordinary persons achieving <span className="italic text-[#6E7A67]">extraordinary results</span> silently and sustainably.
            </p>
          </div>
        </div>

        {/* Growth Architecture */}
        <div className="space-y-8">
           <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-[26px] md:text-[44px] font-bold text-[#1D1914] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Growth Architecture</h3>
              <p className="text-[14px] md:text-[16px] text-[#6E7A67]">The pillars of the Signet methodology.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { title: "Emotional Intelligence", icon: Heart, label: "01" },
                { title: "Self-Awareness", icon: Target, label: "02" },
                { title: "Resilience", icon: TrendingUp, label: "03" },
                { title: "Systems Thinking", icon: ListOrdered, label: "04" }
              ].map((pillar, i) => (
                <div key={i} className="group bg-white rounded-2xl md:rounded-3xl p-5 md:p-10 text-left hover:bg-[#1D1914] transition-all duration-500 border border-[#D8CEBE]/30 flex flex-col min-h-[160px] md:min-h-[220px]">
                   <span className="text-[10px] font-bold text-[#D8CEBF] group-hover:text-white/40 transition-colors mb-auto tracking-widest">{pillar.label}</span>
                   <pillar.icon className="w-6 h-6 md:w-8 md:h-8 text-[#6E7A67] mb-3 md:mb-6 group-hover:text-white transition-colors" />
                   <h4 className="text-[14px] md:text-[18px] font-bold text-[#1D1914] group-hover:text-white transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{pillar.title}</h4>
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
