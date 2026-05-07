"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface CarouselSlide {
  _id: string;
  imageUrl: string;
  caption?: string;
  link?: string;
}

export default function BlogCarousel({ slides }: { slides: CarouselSlide[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    setActiveIndex(clamped);
    if (scrollRef.current) {
      const child = scrollRef.current.children[clamped] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({
          left: child.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children) as HTMLElement[];
    
    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section className="bg-white py-10 md:py-24 border-y border-black/[0.04]">
      {/* Navigation arrows */}
      <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-end gap-3">
        <button
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full border border-[#0B2B26]/10 flex items-center justify-center hover:bg-[#163832] hover:text-white hover:border-transparent disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-[#0B2B26]/10 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === slides.length - 1}
          className="w-10 h-10 rounded-full border border-[#0B2B26]/10 flex items-center justify-center hover:bg-[#163832] hover:text-white hover:border-transparent disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-[#0B2B26]/10 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Carousel - full width on mobile, constrained on desktop */}
      <div className="relative md:max-w-7xl md:mx-auto md:px-6">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-0 md:gap-6 overflow-x-auto snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {slides.map((slide, i) => {
            const Wrapper = slide.link ? "a" : "div";
            const wrapperProps = slide.link
              ? { href: slide.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={slide._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex-none w-full md:w-[45%] lg:w-[400px] snap-start"
              >
                <Wrapper
                  {...wrapperProps as any}
                  className="group block h-full cursor-pointer"
                >
                  <div className="relative aspect-[4/3] md:rounded-[2rem] overflow-hidden md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border border-[#0B2B26]/5 group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-500">
                    <img
                      src={slide.imageUrl}
                      alt={slide.caption || "Gallery image"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Caption overlay */}
                    {slide.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
                        <p className="text-white text-sm font-semibold drop-shadow-lg">
                          {slide.caption}
                        </p>
                      </div>
                    )}

                    {/* Slide counter on mobile */}
                    <div className="absolute top-4 right-4 md:hidden px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                      <span className="text-white text-[11px] font-bold">
                        {i + 1}/{slides.length}
                      </span>
                    </div>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 px-6 md:px-0">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 h-2 bg-[#163832]"
                    : "w-2 h-2 bg-[#163832]/15 hover:bg-[#163832]/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
