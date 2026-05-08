import ModernHero from "@/components/sections/ModernHero";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import VisionMission from "@/components/sections/VisionMission";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import Footer from "@/components/layout/Footer";
import BlogCarousel from "@/components/sections/BlogCarousel";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { sanityFetch } from "@/lib/sanity/client";
import Link from "next/link";
import { ChevronRight, Bookmark } from "lucide-react";

const DATA_QUERY = `
  {
    "writeUps": *[_type == "feedInterrupt" && interruptType == "write-up" && isActive == true] | order(_createdAt desc) {
      _id,
      headline,
      body,
      ctaLabel,
      ctaUrl,
      cardSize,
      "slug": slug.current
    },
    "slides": *[_type == "carouselSlide"] | order(order asc) {
      _id,
      "imageUrl": image.asset->url,
      caption,
      link
    }
  }
`;

export default async function Home() {
  const data = await sanityFetch({ query: DATA_QUERY, tags: ["feedInterrupt", "carouselSlide"] }) || {};
  const writeUps = data.writeUps || [];
  const slides = data.slides || [];

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <main className="flex flex-col gap-0">
        <div className="flex flex-col">
          <div className="order-1 md:order-1">
            <ModernHero />
          </div>
          <div className="order-2 md:order-2">
            <BlogCarousel slides={slides} />
          </div>
        </div>
        <VisionMission />

        {/* Global Write-ups Section */}
        {writeUps.length > 0 && (
          <section className="bg-[#FAFAFA] py-24 md:py-32 border-y border-black/[0.04]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                 <div>
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#163832] uppercase mb-4 block">Write-ups</span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase leading-none tracking-tighter">Signet <br/><span className="text-[#163832]">Briefs.</span></h2>
                 </div>
                 <p className="text-lg text-[#051F20]/50 font-medium max-w-sm capitalize">
                   Frameworks, mental models, and strategic insights curated for the network.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {writeUps.slice(0, 3).map((item: any) => (
                    <div key={item._id} className="p-10 bg-white border border-[#0B2B26]/5 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group">
                       <div className="space-y-6">
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-6 bg-[#8EB69B] rounded-full" />
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#051F20]/30">Member Exclusive</span>
                          </div>
                          <h3 className="text-3xl font-bold text-[#051F20] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                             {item.headline}
                          </h3>
                          <p className="text-[16px] text-[#051F20]/60 leading-relaxed font-medium capitalize line-clamp-5">
                             {item.body}
                          </p>
                       </div>
                       <div className="mt-10 flex items-center justify-between">
                          <Link href="/resources" className="inline-flex items-center gap-2 text-[#163832] font-black text-[12px] uppercase tracking-widest hover:translate-x-1 transition-transform">
                             Read Full Brief <ChevronRight className="w-4 h-4" />
                          </Link>
                          <div className="w-12 h-12 rounded-full bg-[#DAF1DE] flex items-center justify-center">
                             <Bookmark size={20} className="text-[#163832]" />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="mt-16 flex justify-center">
                 <Link href="/resources" className="px-10 py-5 rounded-full bg-[#163832] text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-[#163832]/20">
                    Explore All Insights
                 </Link>
              </div>
            </div>
          </section>
        )}

        <FeaturesPreview />
        <Process />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}
