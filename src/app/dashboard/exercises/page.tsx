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
  Clock,
  ArrowRight,
  Headphones,
  Target
} from "lucide-react";
import { sanityFetch } from "@/lib/sanity/client";
import { AudioLecturesSection } from "./AudioLecturesSection";

export default async function ExercisesPage() {
  const user = await currentUser();
  const { userId } = await auth();

  const audioLectures = await sanityFetch({
    query: `*[_type == "audioLecture"] | order(_createdAt desc) {
      _id,
      title,
      duration,
      description,
      author,
      "audioUrl": audioFile.asset->url,
      "coverImageUrl": coverImage.asset->url
    }`,
    tags: ["audioLecture"]
  });

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAF8] text-[#0F172A]">
        <h1 className="text-2xl font-bold font-sans">Unauthorized</h1>
        <Link href="/" className="mt-4 text-[#1E6B3A] hover:underline font-sans">
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
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] selection:bg-[#EAF4EC] selection:text-[#114B2A] pb-24 md:pb-12 pt-0 md:pt-12">
      {/* Editorial Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-10 max-w-[1400px] mx-auto border-b border-[#EDEDED] mb-16">
        <div>
           <div className="flex items-center gap-2 text-[#1E6B3A] mb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Daily Practice</span>
           </div>
           <h1 className="text-[42px] font-extrabold tracking-tight text-[#0F172A] font-sans" >
             Refine your <span className="italic font-light text-[#1E6B3A]">Architecture.</span>
           </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/40" />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              className="pl-11 pr-5 py-2.5 bg-white rounded-full text-sm border border-[#EDEDED] focus:border-[#1E6B3A] outline-none shadow-sm transition-all w-72 text-[#0F172A] font-sans font-medium"
            />
          </div>
          <div className="flex items-center gap-5">
             <button className="text-[#0F172A]/60 hover:text-[#1E6B3A] transition-colors"><Bell className="w-5 h-5" /></button>
             <button className="text-[#0F172A]/60 hover:text-[#1E6B3A] transition-colors"><Calendar className="w-5 h-5" /></button>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1E6B3A]/20 shadow-sm"><UserButton /></div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-16">
        
        {/* Intro */}
        <div className="max-w-3xl">
           <p className="text-[18px] text-[#0F172A]/90 leading-relaxed italic font-light font-sans" >
              The <span className="text-[#1E6B3A] font-semibold hover:text-[#114B2A] transition-colors duration-300 cursor-pointer border-b border-dashed border-[#1E6B3A]/40 pb-0.5">Signet methodology</span> is built on <span className="text-[#1E6B3A] font-semibold hover:text-[#114B2A] transition-colors duration-300 cursor-pointer border-b border-dashed border-[#1E6B3A]/40 pb-0.5">active repetition</span> across <span className="text-[#1E6B3A] font-semibold hover:text-[#114B2A] transition-colors duration-300 cursor-pointer border-b border-dashed border-[#1E6B3A]/40 pb-0.5">foundational professional domains</span>. Each module below is a <span className="text-[#1E6B3A] font-semibold hover:text-[#114B2A] transition-colors duration-300 cursor-pointer border-b border-dashed border-[#1E6B3A]/40 pb-0.5">curated deep-work session</span> designed to <span className="text-[#1E6B3A] font-semibold hover:text-[#114B2A] transition-colors duration-300 cursor-pointer border-b border-dashed border-[#1E6B3A]/40 pb-0.5">catalyze your evolution</span>.
           </p>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "EQ Test", duration: "20 Mins", icon: Heart, count: "01", desc: "Develop nuanced emotional resonance through depth-scenarios.", href: "/eq-test" },
             { title: "IQ Test", duration: "45 Mins", icon: Target, count: "02", desc: "Test your cognitive adaptability within high-complexity systems.", href: "/iq-test" },
             { title: "Vision Blueprint", duration: "Guided", icon: Eye, count: "03", desc: "Align your daily architectural actions with your legacy outcomes.", href: "/vision-guide" }
           ].map((test, i) => (
             <div key={i} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#EDEDED] shadow-sm hover:shadow-xl hover:border-[#1E6B3A]/30 transition-all duration-500 flex flex-col group relative">
                <div className="flex items-center justify-between mb-10">
                   <div className="w-14 h-14 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] group-hover:bg-[#1E6B3A] group-hover:text-white transition-all duration-300">
                      <test.icon size={24} strokeWidth={1.5} />
                   </div>
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E6B3A]/40">
                      {test.count}
                   </span>
                </div>
                
                <div className="flex-1">
                   <h3 className="text-[26px] font-extrabold text-[#0F172A] mb-4 font-sans" >{test.title}</h3>
                   <p className="text-[15px] text-[#0F172A]/70 leading-relaxed font-semibold font-sans" >
                      {test.desc}
                   </p>
                </div>

                <div className="mt-10 pt-8 border-t border-[#EDEDED] flex items-center justify-between">
                   <div className="flex items-center gap-3 text-[#0F172A]/50 uppercase tracking-widest text-[10px] font-bold">
                      <Clock size={14} className="text-[#1E6B3A]" />
                      <span>{test.duration}</span>
                   </div>
                   <Link href={test.href} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-[#0F172A] hover:text-[#1E6B3A] transition-all group-hover:translate-x-1 font-sans">
                      Initiate <ArrowRight size={16} />
                   </Link>
                </div>
             </div>
           ))}
        </div>

        {/* Audio Lectures Section */}
        <section className="pt-10">
           <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 text-[#1E6B3A] mb-2">
                   <Headphones size={14} className="animate-pulse" />
                   <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Auditory Insight</span>
                </div>
                <h2 className="text-[32px] font-extrabold text-[#0F172A] font-sans" >
                  The Lecture <span className="italic font-light text-[#1E6B3A]">Series</span>
                </h2>
              </div>
           </div>
           
           <AudioLecturesSection lectures={audioLectures} />
        </section>

      </main>
    </div>
  );
}
