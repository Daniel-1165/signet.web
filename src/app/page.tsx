import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import AnimatedMarquee from "@/components/sections/AnimatedMarquee";
import Process from "@/components/sections/Process";
import VisionMission from "@/components/sections/VisionMission";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import Products from "@/components/sections/Products";

export default function Home() {
  return (
    <div className="relative min-h-screen premium-gradient">
      <main className="flex flex-col gap-24 pb-24">
        <Hero />
        <AnimatedMarquee />
        <VisionMission />
        <FeaturesPreview />
        <Products />
        <Process />
        <Testimonials />
      </main>
    </div>
  );
}
