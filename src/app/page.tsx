import Introduction from "@/components/sections/Introduction";
import ProgramSection from "@/components/sections/ProgramSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import ProgramStructure from "@/components/sections/ProgramStructure";
import CommunityBanner from "@/components/sections/CommunityBanner";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import HomeCarousel from "@/components/sections/HomeCarousel";
import HeroJoinButton from "@/components/sections/HeroJoinButton";
import TransformLifeSection from "@/components/sections/TransformLifeSection";
import SealMark from "@/components/brand/SealMark";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { GET_CAROUSEL_SLIDES } from "@/lib/sanity/queries";

export default async function Home() {
  const slides = await sanityFetch({ 
    query: GET_CAROUSEL_SLIDES,
    tags: ['carouselSlide']
  }) || [];

  return (
    <main className="min-h-screen bg-canvas text-ink font-sans">

      {/* Hero — the thesis. The forest reads as the "silent" half of the name;
          the seal, struck over it, reads as the mark that growth leaves behind. */}
      <section className="relative w-full h-[88vh] min-h-[560px] overflow-hidden group on-ink">
        <img
          src="/forest_hero_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-[0.72] saturate-[0.85] group-hover:scale-[1.03] transition-transform duration-[3s] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {/* Green-black wash rather than neutral: the whole palette is tinted
            toward forest, and the hero is where that has to read hardest. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

        <div className="relative h-full page-container flex flex-col justify-center">
          <div className="max-w-4xl">
            <span className="eyebrow eyebrow-on-ink animate-press-in">
              Silent Growth Network
            </span>

            <h1 className="h1 text-canvas mt-7 mb-9 animate-press-in animate-delay-1">
              Become intentional about{" "}
              <span className="display-accent text-verdant">growth</span>
              <br className="hidden md:block" /> and development.
            </h1>

            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center animate-press-in animate-delay-2">
              <HeroJoinButton />
              <Link
                href="/resources"
                className="text-mist/70 hover:text-canvas transition-colors text-sm font-medium border-b border-verdant/30 hover:border-verdant pb-1"
              >
                Explore the library →
              </Link>
            </div>
          </div>
        </div>

        {/* The seal, bottom-right, quiet. Hidden on mobile where the headline
            needs the full width more than the brand needs the flourish. */}
        <div className="absolute bottom-12 right-12 hidden lg:block opacity-70 animate-press-in animate-delay-4">
          <SealMark size={148} tone="canvas" />
        </div>
      </section>

      {/* 1. About Us / Signet Introduction Section (Outside container, full bleed) */}
      <Introduction />

      {/* 2. Transform Your Life Section (Outside container, full bleed with white bg & animations) */}
      <TransformLifeSection />

      {/* Program Structure sits on the raised surface rather than the canvas —
          the one tonal step in the page, which keeps the long scroll from
          reading as a single undifferentiated sheet. */}
      <div className="bg-surface w-full border-y border-rule">
        <ProgramStructure />
      </div>

      {/* 3. Program Section (Outside the main container) */}
      <ProgramSection />

      {/* Content wrapper 2 */}
      <div className="page-container space-y-16 md:space-y-24 pb-16 md:pb-24 pt-12 md:pt-16">
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
