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
    <main className="min-h-screen bg-canvas text-ink font-sans">

      {/* Hero. Following the reference: the photograph is a rounded panel
          inset from the page edge rather than full-bleed, and the text sits
          low-left over it instead of centred. The inset is what makes a photo
          read as a considered object rather than a banner. */}
      <section className="px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="relative w-full h-[78vh] min-h-[520px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group on-ink">
          <img
            src="/forest_hero_bg.png"
            alt=""
            width={2400}
            height={1400}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] saturate-[0.9] scale-[1.01] group-hover:scale-[1.04] motion-reduce:group-hover:scale-[1.01]"
            style={{ transition: "transform 3s var(--ease)" }}
          />
          {/* Bottom-weighted wash: the text lives at the foot of the image, so
              that is where the darkness needs to be. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />

          {/* One orchestrated entrance for the whole block, rather than four
              elements each animating on their own schedule. */}
          <div className="relative h-full page-container flex flex-col justify-end pb-12 sm:pb-16 animate-rise">
            <div className="max-w-3xl">
              <span className="eyebrow eyebrow-on-ink">Silent Growth Network</span>

              {/* Your original copy, unchanged. What is simpler is the setting:
                  the second line drops to a lighter weight and the mist tone
                  rather than carrying a coloured span — the same two-tone
                  headline idea as the reference heroes, done with weight
                  instead of a second typeface. */}
              <h1 className="h1 text-canvas mt-5 mb-9 max-w-[18ch]">
                Become Intentional about Growth{" "}
                <span className="font-light text-mist/70">and Development.</span>
              </h1>

              <div className="flex flex-wrap gap-x-5 gap-y-4 items-center">
                <HeroJoinButton />
                {/* Circular arrow affordance from the reference, paired with a
                    plain text label rather than a second heavy button. */}
                <Link
                  href="/resources"
                  className="group/link inline-flex items-center gap-3 text-canvas/85 hover:text-canvas transition-colors"
                >
                  <span className="w-9 h-9 rounded-full border border-canvas/30 group-hover/link:border-canvas/70 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">Explore the library</span>
                </Link>
              </div>
            </div>
          </div>
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
