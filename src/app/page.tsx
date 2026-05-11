import ModernHero from "@/components/sections/ModernHero";
import Academy from "@/components/sections/Academy";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedInsights from "@/components/sections/FeaturedInsights";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <ModernHero />
      <div className="space-y-32 pb-32">
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
