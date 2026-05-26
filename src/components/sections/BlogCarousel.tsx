"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import Image from "next/image";

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

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      scrollToIndex(nextIndex);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, [activeIndex, slides.length]);

  return (
    <section className="bg-white pt-12 md:pt-24 pb-6 md:pb-24 border-y border-black/[0.04]">

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
                  className="group block w-full h-full cursor-pointer"
                >
                  {/* Image container with 1:1 aspect ratio as requested */}
                  <div className="relative w-full aspect-square md:rounded-[2rem] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border border-[#0B2B26]/5 group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-all duration-500">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.caption || "Gallery image"}
                      fill
                      className="transition-transform duration-700 group-hover:scale-105 object-contain"
                      loading={i < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Caption overlay */}
                    {slide.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
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
      </div>
    </section>
  );
}
