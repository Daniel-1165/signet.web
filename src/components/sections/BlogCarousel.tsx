"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

interface CarouselSlide {
  _id: string;
  imageUrl: string;
  caption?: string;
  link?: string;
}

export default function BlogCarousel({ slides }: { slides: CarouselSlide[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!slides || slides.length === 0) return null;

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    setActiveIndex(clamped);
    if (scrollRef.current) {
      const child = scrollRef.current.children[clamped] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({
          left: child.offsetLeft - 24,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current || isDragging) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children) as HTMLElement[];
    
    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - 24 - scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section className="bg-white py-16 md:py-24 border-y border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black tracking-[0.3em] text-[#163832] uppercase mb-4 block">
            Curated Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter">
            Signet <br />
            <span className="text-[#163832]">Spotlight.</span>
          </h2>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-[#0B2B26]/10 flex items-center justify-center hover:bg-[#163832] hover:text-white hover:border-transparent disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-[#0B2B26]/10 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === slides.length - 1}
            className="w-12 h-12 rounded-full border border-[#0B2B26]/10 flex items-center justify-center hover:bg-[#163832] hover:text-white hover:border-transparent disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-[#0B2B26]/10 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex-none w-[85%] md:w-[45%] lg:w-[400px] snap-start"
              >
                <Wrapper
                  {...wrapperProps as any}
                  className="group block h-full cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0B2B26]/5 group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                    <img
                      src={slide.imageUrl}
                      alt={slide.caption || "Gallery image"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Caption overlay */}
                    {slide.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
                        <p className="text-white text-sm font-semibold drop-shadow-lg">
                          {slide.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
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
