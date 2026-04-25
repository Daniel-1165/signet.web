import ModernHero from "@/components/sections/ModernHero";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import VisionMission from "@/components/sections/VisionMission";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main className="flex flex-col gap-24">
        <ModernHero />
        <VisionMission />
        <FeaturesPreview />
        <Process />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}
