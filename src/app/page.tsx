import Academy from "@/components/sections/Academy";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedInsights from "@/components/sections/FeaturedInsights";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Compact Hero */}
      <section className="pt-[85px] md:pt-20 pb-6 px-5 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6E7A67] mb-3">
          Silent Growth Network
        </p>
        <h1
          className="text-[26px] sm:text-[38px] md:text-[52px] font-bold leading-[1.1] tracking-tight text-[#1D1914] mb-4 max-w-3xl break-words"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The platform for{" "}
          <span className="text-[#6E7A67] italic font-normal">intentional</span>{" "}
          growth.
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/join"
            className="bg-[#1F3D24] text-white px-5 py-2.5 rounded-full font-bold text-[11px] tracking-widest uppercase hover:bg-[#1D1914] transition-all shadow-md"
          >
            Join the Network
          </Link>
          <Link
            href="/resources"
            className="text-[#6E7A67] font-bold text-[13px] underline decoration-[#D8CEBE] hover:text-[#1D1914] transition-colors"
          >
            Explore Resources →
          </Link>
        </div>
      </section>

      <div className="space-y-8 sm:space-y-14 md:space-y-20 pb-16">
        <FeaturedInsights />
        <Academy />
        <FeaturesGrid />
        <Process />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
