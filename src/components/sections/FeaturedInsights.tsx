import { sanityFetch } from "@/lib/sanity/client";
import { GET_CAROUSEL_SLIDES } from "@/lib/sanity/queries";
import HomeCarousel from "./HomeCarousel";

export default async function FeaturedInsights() {
  const slides = await sanityFetch({
    query: GET_CAROUSEL_SLIDES,
    tags: ["carouselSlide"],
  }) || [];

  return (
    <section className="py-20 bg-transparent overflow-hidden relative">
      {/* Decorative dot pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none -mr-32 -mt-32">
        <div className="grid grid-cols-6 gap-8">
           {[...Array(36)].map((_, i) => (
             <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1D1914]" />
           ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 pointer-events-none -ml-24 -mb-24">
        <div className="grid grid-cols-4 gap-10">
           {[...Array(16)].map((_, i) => (
             <div key={i} className="w-2 h-2 rounded-full bg-[#1D1914]" />
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <HomeCarousel slides={slides} />
      </div>
    </section>
  );
}
