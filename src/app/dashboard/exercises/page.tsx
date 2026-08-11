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
  Target,
  Award
} from "lucide-react";
import { sanityFetch } from "@/lib/sanity/client";
import { AudioLecturesSection } from "./AudioLecturesSection";

export default async function ExercisesPage() {
  const user = await currentUser();
  const { userId } = await auth();

  let audioLectures = [];
  try {
    audioLectures = await sanityFetch({
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
    }) || [];
  } catch (error) {
    console.error("Sanity fetch error in exercises page:", error);
  }

  if (!userId || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-canvas text-ink">
        <h1 className="text-2xl font-bold font-sans">Unauthorized</h1>
        <Link href="/" className="mt-4 text-seal hover:underline font-sans">
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
    <div className="min-h-screen bg-canvas text-ink selection:bg-mist selection:text-seal pb-24 md:pb-12 pt-0 md:pt-12">
      {/* Mobile Header (shown on mobile, hidden on desktop) */}
      <div className="flex md:hidden items-center justify-between px-6 py-6 border-b border-rule mb-8 bg-white/80 backdrop-blur-md sticky top-0 z-[40]">
        <div>
          <span className="text-[9px] font-bold tracking-[0.25em] text-seal uppercase block mb-1">Daily Practice</span>
          <h1 className="text-2xl font-semibold text-ink font-sans">
            Refine your <span className="italic font-light text-seal">Architecture.</span>
          </h1>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-7 w-auto object-contain" />
        </div>
      </div>

      {/* Editorial Header */}
      <header className="hidden md:flex items-center justify-between px-10 py-10 max-w-[1400px] mx-auto border-b border-rule mb-16">
        <div>
           <div className="flex items-center gap-2 text-seal mb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Daily Practice</span>
           </div>
           <h1 className="text-[42px] font-semibold tracking-tight text-ink font-sans" >
             Refine your <span className="italic font-light text-seal">Architecture.</span>
           </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              className="pl-11 pr-5 py-2.5 bg-white rounded-full text-sm border border-rule focus:border-seal outline-none shadow-sm transition-all w-72 text-ink font-sans font-medium"
            />
          </div>
          <div className="flex items-center gap-5">
             <button className="text-ink/60 hover:text-seal transition-colors"><Bell className="w-5 h-5" /></button>
             <button className="text-ink/60 hover:text-seal transition-colors"><Calendar className="w-5 h-5" /></button>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-seal/20 shadow-sm"><UserButton /></div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-16">
        
        {/* Intro */}
        <div className="max-w-3xl">
           <p className="text-[16px] sm:text-[19px] text-ink/80 leading-relaxed font-sans" >
             Don't assume mastery, <span className="font-semibold text-wax">be sure about it</span>—and that can only be possible by <strong className="font-semibold text-seal">practice and exercises</strong>. Check your <span className="font-bold text-seal hover:text-seal transition-colors cursor-pointer border-b border-dashed border-seal/20 pb-0.5">emotional intelligence quotient (EQ)</span> and <span className="font-bold text-wax hover:text-wax transition-colors cursor-pointer border-b border-dashed border-wax/20 pb-0.5">cognitive performance (IQ)</span> by taking the tests below, and also go through the <strong className="font-semibold text-seal">SIGNET guide</strong> to building a <em className="italic font-bold text-seal">sound vision</em> for your life. <span className="text-seal font-semibold">Engage with these practical modules</span> and <em className="italic font-semibold text-wax">transform your mind for impact</em>.
           </p>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: EQ Test (Large) */}
          <div className="md:col-span-6 lg:col-span-4 bg-white rounded-[2.5rem] p-8 sm:p-10 border border-rule shadow-sm hover:shadow-xl hover:border-seal/30 transition-all duration-500 flex flex-col group relative">
             <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div className="w-14 h-14 rounded-2xl bg-mist flex items-center justify-center text-seal group-hover:bg-seal group-hover:text-white transition-all duration-300">
                   <Heart size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-seal/40">
                   01
                </span>
             </div>
             
             <div className="flex-1">
                <h3 className="text-[24px] sm:text-[26px] font-semibold text-ink mb-4 font-sans">EQ Test</h3>
                <p className="text-[14.5px] sm:text-[15px] text-ink/70 leading-relaxed font-semibold font-sans">
                   Develop nuanced emotional resonance through depth-scenarios.
                </p>
             </div>

             <div className="mt-8 pt-6 sm:pt-8 border-t border-rule flex items-center justify-between">
                <div className="flex items-center gap-3 text-ink/50 uppercase tracking-widest text-[10px] font-bold">
                   <Clock size={14} className="text-seal" />
                   <span>20 Mins</span>
                </div>
                <Link href="/eq-test" className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-ink hover:text-seal transition-all group-hover:translate-x-1 font-sans">
                   Initiate <ArrowRight size={16} />
                </Link>
             </div>
          </div>

          {/* Card 2: IQ Test (Smallest) */}
          <div className="md:col-span-6 lg:col-span-3 bg-white rounded-[2.1rem] p-6 sm:p-7 border border-rule shadow-sm hover:shadow-xl hover:border-seal/30 transition-all duration-500 flex flex-col group relative">
             <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="w-11 h-11 rounded-xl bg-mist flex items-center justify-center text-seal group-hover:bg-seal group-hover:text-white transition-all duration-300">
                   <Target size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-seal/40">
                   02
                </span>
             </div>
             
             <div className="flex-1">
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-ink mb-3 font-sans">IQ Test</h3>
                <p className="text-[13.5px] text-ink/65 leading-relaxed font-semibold font-sans">
                   Test your cognitive adaptability within high-complexity systems.
                </p>
             </div>

             <div className="mt-6 pt-5 sm:pt-6 border-t border-rule flex items-center justify-between">
                <div className="flex items-center gap-3 text-ink/50 uppercase tracking-widest text-[9px] font-bold">
                   <Clock size={12} className="text-seal" />
                   <span>45 Mins</span>
                </div>
                <Link href="/iq-test" className="flex items-center gap-2 sm:gap-3 text-[11px] font-bold uppercase tracking-widest text-ink hover:text-seal transition-all group-hover:translate-x-1 font-sans">
                   Initiate <ArrowRight size={14} />
                </Link>
             </div>
          </div>

          {/* Card 3: Vision Blueprint (Medium) */}
          <div className="md:col-span-6 lg:col-span-3 bg-white rounded-[2.3rem] p-7 sm:p-8 border border-rule shadow-sm hover:shadow-xl hover:border-seal/30 transition-all duration-500 flex flex-col group relative">
             <div className="flex items-center justify-between mb-7 sm:mb-9">
                <div className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-2xl bg-mist flex items-center justify-center text-seal group-hover:bg-seal group-hover:text-white transition-all duration-300">
                   <Eye size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-seal/40">
                   03
                </span>
             </div>
             
             <div className="flex-1">
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-ink mb-3.5 font-sans">Vision Blueprint</h3>
                <p className="text-[14px] text-ink/70 leading-relaxed font-semibold font-sans">
                   Align your daily architectural actions with your legacy outcomes.
                </p>
             </div>

             <div className="mt-7 pt-6 sm:pt-7 border-t border-rule flex items-center justify-between">
                <div className="flex items-center gap-3 text-ink/50 uppercase tracking-widest text-[9.5px] font-bold">
                   <Clock size={13} className="text-seal" />
                   <span>Guided</span>
                </div>
                <Link href="/vision-guide" className="flex items-center gap-2 sm:gap-3 text-[11.5px] font-bold uppercase tracking-widest text-ink hover:text-seal transition-all group-hover:translate-x-1 font-sans">
                   Initiate <ArrowRight size={15} />
                </Link>
             </div>
          </div>

          {/* Card 4: Certificates (Compact & Green Brand Background) */}
          <div className="md:col-span-6 lg:col-span-2 bg-seal hover:bg-seal rounded-[2rem] p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col group relative text-white">
             <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-seal transition-all duration-300">
                   <Award size={18} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                   04
                </span>
             </div>
             
             <div className="flex-1">
                <h3 className="text-[19px] sm:text-[20px] font-semibold text-white mb-2 font-sans">Certificates</h3>
                <p className="text-[12.5px] text-white/80 leading-relaxed font-semibold font-sans">
                   Access and verify your Cohort Certificates.
                </p>
             </div>

             <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white/60 uppercase tracking-widest text-[9px] font-bold">
                   <Clock size={12} className="text-white/80" />
                   <span>Cohort</span>
                </div>
                <Link 
                  href="/certificates" 
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all font-sans"
                >
                  <span>Initiate</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
             </div>
          </div>

        </div>

        {/* Audio Lectures Section */}
        <section className="pt-10">
           <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 text-seal mb-2">
                   <Headphones size={14} className="animate-pulse" />
                   <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Auditory Insight</span>
                </div>
                <h2 className="text-[32px] font-semibold text-ink font-sans" >
                  The Lecture <span className="italic font-light text-seal">Series</span>
                </h2>
              </div>
           </div>
           
           <AudioLecturesSection lectures={audioLectures} />
        </section>

      </main>
    </div>
  );
}
