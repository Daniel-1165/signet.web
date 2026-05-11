'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CarouselSlide {
  _id: string;
  image?: { asset?: { url: string } };
  caption?: string;
  link?: string;
  order?: number;
}

interface HomeCarouselProps {
  slides: CarouselSlide[];
}

// Fallback slides shown when Sanity has no content yet
const FALLBACK_SLIDES: CarouselSlide[] = [
  {
    _id: 'fb-1',
    image: { asset: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' } },
    caption: 'Leadership & Strategy',
  },
  {
    _id: 'fb-2',
    image: { asset: { url: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?auto=format&fit=crop&q=80&w=800' } },
    caption: 'Intentional Focus',
  },
  {
    _id: 'fb-3',
    image: { asset: { url: 'https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=800' } },
    caption: 'Growth Sessions',
  },
  {
    _id: 'fb-4',
    image: { asset: { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' } },
    caption: 'Deep Reflection',
  },
];

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const displaySlides = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, displaySlides.length - 1));
    setActiveIndex(clamped);
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[clamped] as HTMLElement;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 260;
    const index = Math.round(scrollLeft / (cardWidth + 16)); // 16 = gap
    setActiveIndex(index);
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <div>
          <h2
            className="text-[22px] md:text-[28px] font-bold text-[#1D1914] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Insights
          </h2>
        </div>
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-5 h-2 bg-[#1D1914]'
                  : 'w-2 h-2 bg-[#D8CEBE]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-2"
      >
        {displaySlides.map((slide, i) => {
          const img = slide.image?.asset?.url;
          const isActive = i === activeIndex;

          return (
            <div
              key={slide._id}
              className="flex-none w-[70vw] max-w-[280px] md:w-[340px] md:max-w-none snap-start"
            >
              {slide.link ? (
                <Link href={slide.link} className="block h-full">
                  <SlideCard img={img} caption={slide.caption} isActive={isActive} />
                </Link>
              ) : (
                <SlideCard img={img} caption={slide.caption} isActive={isActive} />
              )}
            </div>
          );
        })}
      </div>

      {/* Arrow Navigation (desktop) */}
      <div className="hidden md:flex items-center justify-end gap-2 mt-4">
        <button
          onClick={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-9 h-9 rounded-full border border-[#D8CEBE]/60 flex items-center justify-center text-[#6E7A67] disabled:opacity-30 hover:bg-[#1D1914] hover:text-white hover:border-[#1D1914] transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex === displaySlides.length - 1}
          className="w-9 h-9 rounded-full border border-[#D8CEBE]/60 flex items-center justify-center text-[#6E7A67] disabled:opacity-30 hover:bg-[#1D1914] hover:text-white hover:border-[#1D1914] transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* ── Individual Slide Card ─────────────────────────────────── */
function SlideCard({
  img,
  caption,
  isActive,
}: {
  img?: string;
  caption?: string;
  isActive: boolean;
}) {
  return (
    <div
      className={`relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden cursor-pointer group transition-all duration-500 ${
        isActive ? 'shadow-2xl shadow-[#1D1914]/20 scale-[1.01]' : 'shadow-md shadow-[#1D1914]/10'
      }`}
    >
      {/* Background image */}
      {img ? (
        <img
          src={img}
          alt={caption || 'Carousel slide'}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D1914] to-[#6E7A67]" />
      )}

      {/* Dark gradient overlay (always present for readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D1914]/80 via-[#1D1914]/30 to-transparent" />

      {/* Top label — only if caption exists */}
      {caption && (
        <div className="absolute top-4 left-4 right-4">
          <span
            className="text-[9px] font-black uppercase tracking-[0.25em] text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Growth Series
          </span>
        </div>
      )}

      {/* Bottom text — only if caption exists */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="text-white font-bold text-[18px] leading-tight mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {caption}
          </h3>
          <div className="flex items-center gap-1.5 text-white/70 group-hover:text-white transition-colors">
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View Collection
            </span>
            <ArrowRight size={12} />
          </div>
        </div>
      )}
    </div>
  );
}
