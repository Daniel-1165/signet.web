import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Search,
  Bell,
  Calendar,
  Heart,
  Eye,
  LayoutGrid,
  Clock,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

export default async function ExercisesPage() {
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
  
  let { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  const firstName = user.firstName || profile?.first_name || "Growth";

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1914] selection:bg-[#D8CEBF]/40 selection:text-[#1D1914] pb-24 md:pb-12 pt-0 md:pt-12">
      {/* Editorial Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-10 max-w-[1400px] mx-auto border-b border-[#D8CEBE]/40 mb-16">
        <div>
           <div className="flex items-center gap-2 text-[#6E7A67] mb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Daily Practice</span>
           </div>
           <h1 className="text-[42px] font-bold tracking-tight text-[#1D1914]" style={{ fontFamily: "'Playfair Display', serif" }}>
             Refine your <span className="italic font-normal text-[#6E7A67]">Architecture.</span>
           </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7A67]/40" />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              className="pl-11 pr-5 py-2.5 bg-white rounded-full text-sm border border-[#D8CEBE]/40 focus:border-[#6E7A67] outline-none shadow-sm transition-all w-72 text-[#1D1914] font-body"
            />
          </div>
          <div className="flex items-center gap-5">
             <button className="text-[#6E7A67] hover:text-[#1D1914] transition-colors"><Bell className="w-5 h-5" /></button>
             <button className="text-[#6E7A67] hover:text-[#1D1914] transition-colors"><Calendar className="w-5 h-5" /></button>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"><UserButton /></div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-20">
        
        {/* Intro */}
        <div className="max-w-3xl">
           <p className="text-[18px] text-[#6E7A67] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Signet methodology is built on active repetition across foundational professional domains. Each module below is a curated deep-work session designed to catalyze your evolution.
           </p>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "EQ Test", duration: "20 Mins", icon: Heart, count: "01", desc: "Develop nuanced emotional resonance through depth-scenarios.", href: "/eq-test" },
             { title: "IQ Test", duration: "45 Mins", icon: Target, count: "02", desc: "Test your cognitive adaptability within high-complexity systems.", href: "/iq-test" },
             { title: "Vision Blueprint", duration: "Guided", icon: Eye, count: "03", desc: "Align your daily architectural actions with your legacy outcomes.", href: "/vision-guide" }
           ].map((test, i) => (
             <div key={i} className="bg-white rounded-[2.5rem] p-7 md:p-10 border border-[#D8CEBE]/30 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:border-[#6E7A67]/30 transition-all duration-700 flex flex-col group">
                <div className="flex items-center justify-between mb-10">
                   <div className="w-14 h-14 rounded-2xl bg-[#6E7A67]/5 flex items-center justify-center text-[#6E7A67] group-hover:bg-[#1D1914] group-hover:text-white transition-all">
                      <test.icon size={24} />
                   </div>
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D8CEBF]">
                      {test.count}
                   </span>
                </div>
                
                <div className="flex-1">
                   <h3 className="text-[26px] font-bold text-[#1D1914] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{test.title}</h3>
                   <p className="text-[15px] text-[#6E7A67] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {test.desc}
                   </p>
                </div>

                <div className="mt-10 pt-8 border-t border-[#D8CEBE]/20 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-[#D8CEBF] uppercase tracking-widest text-[10px] font-bold">
                      <Clock size={14} className="text-[#6E7A67]" />
                      <span>{test.duration}</span>
                   </div>
                   <Link href={test.href} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-[#1D1914] hover:text-[#6E7A67] transition-all group-hover:translate-x-1">
                      Initiate <ArrowRight size={16} />
                   </Link>
                </div>
             </div>
           ))}
        </div>


      </main>
    </div>
  );
}
