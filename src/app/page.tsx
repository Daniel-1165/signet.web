import Academy from "@/components/sections/Academy";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
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
    <main className="min-h-screen bg-[#FDFCFB]">
      {/* Premium Hero Section - Repurposed from Dashboard for consistent high-end feel */}
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
          <h1 className="text-[28px] sm:text-[48px] md:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-8 max-w-4xl break-words" >
            Become Intentional<br className="md:hidden" /> about{" "}
            <span className="italic font-normal text-[#D8CEBF]">Growth</span>
            <br className="hidden md:block" /> and Development.
          </h1>
          <div className="flex flex-wrap gap-6 items-center">
            <Link href="/join" className="flex items-center gap-3 group/btn text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full border border-white/20 backdrop-blur-md transition-all">
               <span className="text-[11px] font-bold tracking-widest uppercase" >Join the Collective</span>
               <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            <Link href="/resources" className="text-white/60 hover:text-white transition-colors text-sm font-medium border-b border-white/20 pb-1">
              Explore Library →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 space-y-20 md:space-y-32 py-20 md:py-32">
        {/* Featured Insights Carousel */}
        <HomeCarousel slides={slides} />
        
        {/* Philosophical Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] p-7 md:p-16 border border-[#D8CEBE]/30 hover:shadow-2xl transition-all duration-500 group relative">
            <h3 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-4">The Vision</h3>
            <p className="text-[22px] md:text-[38px] font-bold text-[#1D1914] leading-[1.2] tracking-tight group-hover:text-[#6E7A67] transition-colors" >
              To build a global network of trailblazers who <span className="italic font-normal text-[#6E7A67]">model and replicate excellence</span> in diverse spheres.
            </p>
          </div>

          <div className="bg-[#6E7A67]/5 rounded-[2.5rem] p-7 md:p-16 border border-[#6E7A67]/10 flex flex-col justify-center">
            <h3 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-4">The Mission</h3>
            <p className="text-[18px] md:text-[28px] font-medium text-[#1D1914] leading-relaxed italic" >
              Ordinary persons achieving <span className="italic text-[#6E7A67]">extraordinary results</span> silently and sustainably.
            </p>
          </div>
        </div>

        <Academy />
        <FeaturesGrid />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
