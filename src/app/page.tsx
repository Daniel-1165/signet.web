import Academy from "@/components/sections/Academy";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Eye, Heart, Target, TrendingUp, ListOrdered } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCFB]">
      {/* Premium Hero Section - Repurposed from Dashboard for consistent high-end feel */}
      <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden group">
        <img src="/forest_hero_bg.png" alt="Forest" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:scale-[1.03] transition-transform duration-[3s]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D1914]/80 via-[#1D1914]/50 to-[#1D1914]/20" />
        
        <div className="relative h-full max-w-[1400px] mx-auto flex flex-col justify-center px-6 md:px-24 w-full">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-[1px] bg-[#D8CEBF]" />
             <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D8CEBF]" style={{ fontFamily: "'Inter', sans-serif" }}>
               Silent Growth Network
             </span>
          </div>
          <h1 className="text-[32px] sm:text-[48px] md:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-8 max-w-4xl break-words" style={{ fontFamily: "'Playfair Display', serif" }}>
            Become Intentional<br className="md:hidden" /> about{" "}
            <span className="italic font-normal text-[#D8CEBF]">Growth</span>
            <br className="hidden md:block" /> and Development.
          </h1>
          <div className="flex flex-wrap gap-6 items-center">
            <Link href="/join" className="flex items-center gap-3 group/btn text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full border border-white/20 backdrop-blur-md transition-all">
               <span className="text-[11px] font-bold tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Join the Collective</span>
               <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            <Link href="/resources" className="text-white/60 hover:text-white transition-colors text-sm font-medium border-b border-white/20 pb-1">
              Explore Library →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 space-y-20 md:space-y-32 py-20 md:py-32">
        {/* Philosophical Foundations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-[#D8CEBE]/30 hover:shadow-2xl transition-all duration-500 group relative">
            <Eye className="absolute top-12 right-12 w-6 h-6 text-[#6E7A67]/20" />
            <h3 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-4">The Vision</h3>
            <p className="text-[24px] md:text-[38px] font-bold text-[#1D1914] leading-[1.2] tracking-tight group-hover:text-[#6E7A67] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              To build a global network of trailblazers who <span className="italic font-normal text-[#6E7A67]">model and replicate excellence</span> in diverse spheres.
            </p>
          </div>

          <div className="bg-[#6E7A67]/5 rounded-[2.5rem] p-10 md:p-16 border border-[#6E7A67]/10 flex flex-col justify-center">
            <h3 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.3em] mb-4">The Mission</h3>
            <p className="text-[20px] md:text-[28px] font-medium text-[#1D1914] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ordinary persons achieving <span className="italic text-[#6E7A67]">extraordinary results</span> silently and sustainably.
            </p>
          </div>
        </div>

        {/* Growth Architecture */}
        <div className="space-y-12">
           <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-[32px] md:text-[52px] font-bold text-[#1D1914] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Growth Architecture</h3>
              <p className="text-[16px] text-[#6E7A67]">The four pillars of the Signet methodology.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: "Emotional Intelligence", icon: Heart, label: "01" },
                { title: "Self-Awareness", icon: Target, label: "02" },
                { title: "Resilience", icon: TrendingUp, label: "03" },
                { title: "Systems Thinking", icon: ListOrdered, label: "04" }
              ].map((pillar, i) => (
                <div key={i} className="group bg-white rounded-3xl p-8 md:p-12 text-left hover:bg-[#1D1914] transition-all duration-500 border border-[#D8CEBE]/30 flex flex-col min-h-[200px] md:min-h-[280px]">
                   <span className="text-[11px] font-bold text-[#D8CEBF] group-hover:text-white/40 transition-colors mb-auto tracking-widest">{pillar.label}</span>
                   <pillar.icon className="w-8 h-8 text-[#6E7A67] mb-6 md:mb-10 group-hover:text-white transition-colors" />
                   <h4 className="text-[18px] md:text-[22px] font-bold text-[#1D1914] group-hover:text-white transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{pillar.title}</h4>
                </div>
              ))}
           </div>
        </div>

        <Academy />
        <FeaturesGrid />
        <Process />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
