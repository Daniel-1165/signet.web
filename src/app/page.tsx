import Introduction from "@/components/sections/Introduction";
import ProgramSection from "@/components/sections/ProgramSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import ProgramStructure from "@/components/sections/ProgramStructure";
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
    <main className="min-h-screen bg-[#FAFAF8] text-[#0F172A] font-sans selection:bg-[#EAF4EC] selection:text-[#114B2A] homepage-container">
      
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

      {/* 1. About Us / Signet Introduction Section (Outside container, full bleed) */}
      <div className="bg-[#1E3D1E] w-full border-y border-[#EFF3F4]/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24">
          <Introduction />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 space-y-16 md:space-y-24 py-16 md:py-24">
        {/* 2. Custom Transform Your Life Section (Floated layout on all screens) */}
        <section className="relative py-12 bg-transparent overflow-hidden">
          {/* Heading & Dashed Line */}
          <div className="mb-8">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#1E6B3A] mb-2 block">
              EMPOWER. GROW. LEAD.
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-[#0F172A] font-sans">
              Transform Your Life, <br />
              Transform Your Future.
            </h2>
            <div className="w-full border-t border-dashed border-[#EDEDED] mt-4" />
          </div>

          {/* Floating image and wrapping text container */}
          <div className="flow-root font-sans text-[#0F172A]/85 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
            {/* Paragraph 1 - Spans full width on mobile because it's before the floated image */}
            <p className="mb-6">
              A <strong className="font-extrabold text-[#1E6B3A]">12-month high-impact journey</strong> with <span className="font-bold text-[#1E6B3A]">ambitious leaders</span> unlocking <span className="font-bold text-[#1E6B3A]">unmatched growth</span>.
            </p>

            {/* Floated Image - Restructured to sit after Paragraph 1 and float right of Paragraph 2 */}
            <div className="float-right ml-4 mb-4 sm:ml-8 sm:mb-8 w-[195px] h-[195px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] aspect-square overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
              <img
                src="/hero_collage.png"
                alt="SIGNET Journey"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Paragraph 2 - Wraps around the floated image */}
            <p className="mb-6">
              Together, we focus on building <span className="font-bold text-[#1E6B3A]">leadership capacity</span> and creating a <em className="italic font-bold text-[#1E6B3A]">lasting impact</em>.
            </p>
          </div>
        </section>
      </div>

      {/* 2.5. Program Structure Section (Outside container, full bleed) */}
      <div className="bg-white w-full border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <ProgramStructure />
        </div>
      </div>

      {/* 3. Program Section (Outside the main container) */}
      <ProgramSection />

      {/* Content wrapper 2 */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 space-y-16 md:space-y-24 pb-16 md:pb-24 pt-12 md:pt-16">
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
