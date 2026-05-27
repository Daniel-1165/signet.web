import Introduction from "@/components/sections/Introduction";
import ProgramSection from "@/components/sections/ProgramSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import CommunityBanner from "@/components/sections/CommunityBanner";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import HomeCarousel from "@/components/sections/HomeCarousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sanityFetch } from "@/lib/sanity/client";
import { GET_CAROUSEL_SLIDES } from "@/lib/sanity/queries";

export default async function Home() {
  const slides = await sanityFetch({ 
    query: GET_CAROUSEL_SLIDES,
    tags: ['carouselSlide']
  }) || [];

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#0F172A] font-sans selection:bg-[#EAF4EC] selection:text-[#114B2A]">
      
      {/* Premium Hero Section - Kept exactly the same as per user instruction ("landing page should remain the same") */}
      <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden group">
        <img src="/forest_hero_bg.png" alt="Forest" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:scale-[1.03] transition-transform duration-[3s]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D1914]/80 via-[#1D1914]/50 to-[#1D1914]/20" />
        
        <div className="relative h-full max-w-[1400px] mx-auto flex flex-col justify-center px-5 md:px-24 w-full">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-[1px] bg-[#D8CEBF]" />
             <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D8CEBF]" >
               Silent Growth Network
             </span>
          </div>
          <h1 className="text-[28px] sm:text-[40px] md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8 max-w-4xl break-words" >
            Become Intentional<br className="md:hidden" /> about{" "}
            <span className="italic font-normal text-[#D8CEBF]">Growth</span>
            <br className="hidden md:block" /> and Development.
          </h1>
          <div className="flex flex-wrap gap-6 items-center">
            <Link href="/join" className="flex items-center gap-3 group/btn text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full border border-white/20 backdrop-blur-md transition-all">
               <span className="text-[11px] font-bold tracking-widest uppercase" >Join the Collective</span>
               <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            <Link href="/resources" className="text-white/60 hover:text-white transition-colors text-sm font-medium border-b border-[#D8CEBF]/20 pb-1">
              Explore Library →
            </Link>
          </div>
        </div>
      </section>

      {/* Content wrapper */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 space-y-16 md:space-y-24 py-16 md:py-24">
        
        {/* 1. About Us / Signet Introduction Section */}
        <Introduction />
        
        {/* 2. Custom Transform Your Life Section (Side-by-Side row layout on all screens) */}
        <section className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-[#EDEDED] shadow-sm relative group overflow-hidden">
          <div className="flex flex-row items-center justify-between gap-6 md:gap-12">
            {/* Left Column: Text Content */}
            <div className="w-[60%] sm:w-[65%] flex flex-col items-start space-y-2 sm:space-y-4">
              <span className="font-sans font-bold text-[8px] sm:text-xs uppercase tracking-[0.25em] text-[#1E6B3A]">
                EMPOWER. GROW. LEAD.
              </span>
              <h2 className="text-sm sm:text-xl md:text-3xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight font-sans">
                Transform Your Life, <br />
                Transform Your Future.
              </h2>
              <p className="text-[10px] sm:text-sm md:text-base text-[#0F172A]/70 leading-relaxed font-sans font-medium hidden sm:block">
                A 12-month high-impact journey with ambitious leaders unlocking unmatched growth, 
                building leadership capacity and creating lasting impact.
              </p>
              <Link href="/join" className="flex items-center gap-1.5 sm:gap-3 bg-[#1E6B3A] hover:bg-[#114B2A] text-white px-3 py-1.5 sm:px-6 sm:py-3 rounded-full font-semibold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-md shadow-[#1E6B3A]/10 font-sans">
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>

            {/* Right Column: Collage Image */}
            <div className="w-[40%] sm:w-[35%] flex justify-end">
              <div className="w-full max-w-[120px] sm:max-w-[280px] md:max-w-[340px] aspect-square overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#EDEDED] shadow-sm bg-white">
                <img
                  src="/hero_collage.png"
                  alt="SIGNET Journey"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Program Section */}
        <ProgramSection />
        
        {/* 4. Vision & Mission Section */}
        <VisionMissionSection />
        
        {/* 5. Featured Insights Carousel */}
        <HomeCarousel slides={slides} />
        
        {/* 6. Community CTA Banner */}
        <CommunityBanner />
        
        {/* 7. Testimonials Section */}
        <Testimonials />
        
      </div>
      <Footer />
    </main>
  );
}
