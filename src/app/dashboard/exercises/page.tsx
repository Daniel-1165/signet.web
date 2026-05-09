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
  Sparkles
} from "lucide-react";

export default async function ExercisesPage() {
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
  
  let { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  const firstName = user.firstName || profile?.first_name || "Guest";
  const lastName = user.lastName || profile?.last_name || "";

  return (
    <div className="min-h-screen bg-[#fff] text-[#191c1d] selection:bg-[#83fba5]/30 selection:text-[#005746] pb-24">
      {/* Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-6 max-w-[1400px] mx-auto bg-white border-b border-[#f2f4f5]">
        <h1 className="text-2xl font-bold tracking-tight text-[#005746]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Exercises
        </h1>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bec9c4]" />
            <input 
              type="text" 
              placeholder="Search modules..." 
              className="pl-12 pr-4 py-2.5 bg-[#f8fafb] rounded-full text-sm border border-transparent focus:border-[#83fba5] outline-none transition-all w-72 text-[#3e4945] font-body"
            />
          </div>
          <button className="w-10 h-10 rounded-full border border-[#f2f4f5] flex items-center justify-center text-[#6e7975] hover:text-[#005746] hover:border-[#005746] transition-colors relative">
             <Bell className="w-4 h-4" />
             <span className="absolute top-2.5 right-2 w-1.5 h-1.5 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <button className="w-10 h-10 rounded-full border border-[#f2f4f5] flex items-center justify-center text-[#6e7975] hover:text-[#005746] hover:border-[#005746] transition-colors">
             <Calendar className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-[14px] font-bold text-[#191c1d]" style={{ fontFamily: "'Inter', sans-serif" }}>{firstName} {lastName}</p>
                <p className="text-[12px] font-medium text-[#005746]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Level 4 Growth</p>
             </div>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#83fba5] shadow-sm"><UserButton /></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 space-y-10">
        
        {/* Title Section */}
        <div>
           <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006b58] mb-3 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Active Assessments
           </span>
           <h2 className="text-4xl md:text-[42px] font-bold text-[#191c1d] mb-4 tracking-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Refine Your Architecture
           </h2>
           <p className="text-[15px] text-[#6e7975] leading-relaxed max-w-3xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Your growth path is built on three core pillars: empathy, logic, and vision. These deep-work sessions are designed to facilitate profound breakthroughs in your personal development.
           </p>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Card 1 */}
           <div className="bg-white rounded-[2rem] p-8 border border-[#f2f4f5] shadow-[0_8px_30px_rgba(13,113,93,0.03)] hover:shadow-[0_12px_40px_rgba(13,113,93,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 rounded-full bg-[#f2f4f5] border border-[#e1e3e4] flex items-center justify-center text-[#005746] group-hover:bg-[#e6fcf2] group-hover:border-[#83fba5] transition-colors">
                    <Heart size={22} className="fill-current opacity-80" />
                 </div>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-[#6e7975]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Module 01
                 </span>
              </div>
              
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>EQ Assessment</h3>
                 <p className="text-[14px] text-[#6e7975] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Deepen self-awareness through silent observation. Develop emotional resonance through nuanced interactive scenarios.
                 </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#f2f4f5] flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[#6e7975]">
                    <Clock size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>20<br/>Mins</span>
                 </div>
                 <Link href="/dashboard/exercises/eq" className="flex items-center gap-2 text-[13px] font-bold text-[#005746] hover:text-[#006d36] transition-colors">
                    Start Now <ArrowRight size={16} />
                 </Link>
              </div>
           </div>

           {/* Card 2 */}
           <div className="bg-white rounded-[2rem] p-8 border border-[#f2f4f5] shadow-[0_8px_30px_rgba(13,113,93,0.03)] hover:shadow-[0_12px_40px_rgba(13,113,93,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 rounded-full bg-[#f2f4f5] border border-[#e1e3e4] flex items-center justify-center text-[#3e4945] group-hover:bg-[#ECEEEF] transition-colors">
                    <LayoutGrid size={22} />
                 </div>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-[#6e7975]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Module 02
                 </span>
              </div>
              
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>IQ Profiler</h3>
                 <p className="text-[14px] text-[#6e7975] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Strategic logic and pattern recognition in complex systems. Test your cognitive adaptability with non-linear modules.
                 </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#f2f4f5] flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[#6e7975]">
                    <Clock size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>45<br/>Mins</span>
                 </div>
                 <Link href="/dashboard/exercises/iq" className="flex items-center gap-2 text-[13px] font-bold text-[#005746] hover:text-[#006d36] transition-colors">
                    Start Now <ArrowRight size={16} />
                 </Link>
              </div>
           </div>

           {/* Card 3 */}
           <div className="bg-white rounded-[2rem] p-8 border border-[#f2f4f5] shadow-[0_8px_30px_rgba(13,113,93,0.03)] hover:shadow-[0_12px_40px_rgba(13,113,93,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 rounded-full bg-[#f2f4f5] border border-[#e1e3e4] flex items-center justify-center text-[#006b58] group-hover:bg-[#e6fcf2] group-hover:border-[#83fba5] transition-colors">
                    <Eye size={22} className="fill-current opacity-70" />
                 </div>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-[#6e7975]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Module 03
                 </span>
              </div>
              
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Vision Mapping</h3>
                 <p className="text-[14px] text-[#6e7975] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Defining long-term impact through deep-work. Align your daily actions with generational legacy outcomes.
                 </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#f2f4f5] flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[#6e7975]">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Guided<br/>Session</span>
                 </div>
                 <Link href="/dashboard/exercises/vision" className="flex items-center gap-2 text-[13px] font-bold text-[#005746] hover:text-[#006d36] transition-colors">
                    Begin Guide <ArrowRight size={16} />
                 </Link>
              </div>
           </div>
        </div>

        {/* Lower Grid (Map & Tip) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Ecosystem Map */}
           <div className="md:col-span-2 bg-[#fcfdfd] rounded-[2.5rem] p-10 border border-[#f2f4f5] shadow-[0_4px_30px_rgba(13,113,93,0.02)] relative overflow-hidden">
             
              <div className="relative z-10">
                 <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006b58] mb-2 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Ecosystem Overview
                 </span>
                 <h3 className="text-xl font-bold text-[#191c1d] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Growth Ecosystem Map</h3>
                 <p className="text-[14px] text-[#3e4945] leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Visualize the organic connections between your core professional domains.
                 </p>
              </div>

              <div className="mt-16 h-[280px] relative flex flex-col items-center justify-center">
                 {/* Venn CSS Drawing */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    
                    {/* Left - Empathy */}
                    <div className="absolute left-1/2 -translate-x-[110%] w-48 h-48 rounded-full border border-[#83fba5] bg-[#e6fcf2]/60 mix-blend-multiply flex flex-col items-center justify-center pt-8 hover:-translate-x-[115%] transition-transform duration-700">
                       <Heart size={14} className="text-[#005746] mb-1" />
                       <span className="text-[9px] font-bold tracking-widest text-[#005746]">EMPATHY</span>
                    </div>

                    {/* Right - Intuition */}
                    <div className="absolute left-1/2 translate-x-[10%] w-48 h-48 rounded-full border border-[#bec9c4] bg-[#f8fafb]/60 mix-blend-multiply flex flex-col items-center justify-center pt-8 hover:translate-x-[15%] transition-transform duration-700">
                       <Sparkles size={14} className="text-[#3e4945] mb-1" />
                       <span className="text-[9px] font-bold tracking-widest text-[#3e4945]">INTUITION</span>
                    </div>

                    {/* Tiers vertical stack */}
                    <div className="absolute flex flex-col items-center gap-1 z-10 w-full mb-12">
                       {/* Vision (Top) */}
                       <div className="w-36 h-36 rounded-full border border-[#005746]/20 bg-[#ECEEEF]/80 backdrop-blur-sm -mb-20 mix-blend-multiply flex flex-col items-center pt-10 hover:-translate-y-2 transition-transform duration-700">
                          <Eye size={12} className="text-[#191c1d] mb-1" />
                          <span className="text-[8px] font-bold tracking-wider text-[#191c1d]">VISION</span>
                       </div>
                       
                       {/* Resilience (Center) */}
                       <div className="w-40 h-40 rounded-full border border-[#0d715d]/30 bg-[#c5e6da]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-700">
                           <span className="text-[12px] font-black tracking-[0.2em] text-[#005746]">RESILIENCE</span>
                       </div>

                       {/* Logic (Bottom) */}
                       <div className="w-36 h-36 rounded-full border border-[#6e7975]/20 bg-[#f2f4f5]/80 backdrop-blur-sm -mt-20 mix-blend-multiply flex flex-col items-end justify-center pb-8 z-10 hover:translate-y-2 transition-transform duration-700">
                          <div className="w-full text-center mt-auto mb-6">
                            <span className="block text-[#6e7975] text-[10px] mb-1">Λ</span>
                            <span className="text-[8px] font-bold tracking-wider text-[#6e7975]">LOGIC</span>
                          </div>
                       </div>
                    </div>

                 </div>

                 {/* Legend */}
                 <div className="absolute bottom-4 right-4 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-[#6e7975]"></span>
                       <span className="text-[8px] font-bold uppercase tracking-widest text-[#6e7975]">Core Competency</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-[#83fba5]"></span>
                       <span className="text-[8px] font-bold uppercase tracking-widest text-[#6e7975]">Soft Resonance</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Tip Card */}
           <div className="bg-white rounded-[2.5rem] p-10 border border-[#f2f4f5] shadow-[0_4px_30px_rgba(13,113,93,0.03)] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#f8fafb] border border-[#e1e3e4] flex items-center justify-center text-[#005746] mb-8">
                 <BrainCircuit size={28} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006b58] mb-6 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                 Mindfulness Tip
              </span>
              <p className="text-[18px] text-[#3e4945] italic leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                 "Silence is not the absence of sound, but the presence of focus."
              </p>
           </div>
        </div>

        {/* Progress Footer */}
        <div className="bg-white rounded-[2rem] p-10 border border-[#f2f4f5] shadow-[0_4px_30px_rgba(13,113,93,0.02)]">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                 <h4 className="text-[15px] font-bold text-[#191c1d] mb-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Curated Path Progress</h4>
                 <p className="text-[13px] text-[#6e7975]" style={{ fontFamily: "'Inter', sans-serif" }}>You've unlocked 5 of 8 advanced modules this month.</p>
              </div>
              <div className="text-right">
                 <span className="text-[14px] font-bold text-[#005746] block mb-1">62%</span>
                 <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6e7975]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Complete</span>
              </div>
           </div>

           <div className="w-full bg-[#f2f4f5] rounded-full h-3 mb-6 overflow-hidden">
              <div className="bg-[#005746] h-full rounded-full" style={{ width: '62%' }} />
           </div>

           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#e6fcf2] text-[#005746] font-bold flex items-center justify-center text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>E</div>
                 <div className="w-8 h-8 rounded-full bg-[#e6fcf2] text-[#005746] font-bold flex items-center justify-center text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>L</div>
                 <div className="w-8 h-8 rounded-full bg-[#e6fcf2] text-[#005746] font-bold flex items-center justify-center text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>V</div>
              </div>
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#005746]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                 Next Breakthrough: The Observer Protocol
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
