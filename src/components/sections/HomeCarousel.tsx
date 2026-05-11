'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CarouselSlide {
  _id: string;
  image?: { asset?: { url: string } };
  title?: string;
  tag?: string;
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
    tag: 'GROWTH SERIES',
    title: 'Featured Growth Sessions',
  },
  {
    _id: 'fb-2',
    image: { asset: { url: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?auto=format&fit=crop&q=80&w=800' } },
    tag: 'NETWORK',
    title: 'Intentional Focus',
  },
  {
    _id: 'fb-3',
    image: { asset: { url: 'https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=800' } },
    tag: 'LEARNING',
    title: 'Growth Sessions',
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
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <div>
          <h2
            className="text-[20px] md:text-[24px] font-bold text-[#1D1914] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Insights
          </h2>
        </div>
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 bg-[#F6F1EA] px-3 py-1.5 rounded-full">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-500 ease-out ${
                i === activeIndex
                  ? 'w-4 h-1.5 bg-[#1D1914]'
                  : 'w-1.5 h-1.5 bg-[#D8CEBE]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-6"
      >
        {displaySlides.map((slide, i) => {
          const img = slide.image?.asset?.url;
          const isActive = i === activeIndex;

          return (
            <div
              key={slide._id}
              className="flex-none w-[80vw] max-w-[300px] md:w-[380px] md:max-w-none snap-start"
            >
              {slide.link ? (
                <Link href={slide.link} className="block h-full">
                  <SlideCard img={img} title={slide.title} tag={slide.tag} isActive={isActive} />
                </Link>
              ) : (
                <SlideCard img={img} title={slide.title} tag={slide.tag} isActive={isActive} />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Desktop) */}
      <div className="hidden md:flex items-center justify-end gap-3 mt-4">
        <button
          onClick={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full border border-[#D8CEBE] flex items-center justify-center text-[#1D1914] disabled:opacity-20 hover:bg-[#1D1914] hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex === displaySlides.length - 1}
          className="w-10 h-10 rounded-full border border-[#D8CEBE] flex items-center justify-center text-[#1D1914] disabled:opacity-20 hover:bg-[#1D1914] hover:text-white transition-all shadow-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* ── Individual Slide Card ─────────────────────────────────── */
function SlideCard({
  img,
  title,
  tag,
  isActive,
}: {
  img?: string;
  title?: string;
  tag?: string;
  isActive: boolean;
}) {
  const hasText = title || tag;

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer group transition-all duration-700 ${
        isActive ? 'shadow-2xl shadow-[#1D1914]/20 scale-[1.02]' : 'shadow-lg shadow-black/5 opacity-80 scale-[0.98]'
      }`}
    >
      {/* Background image */}
      {img ? (
        <img
          src={img}
          alt={title || 'Carousel slide'}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D1914] via-[#6E7A67] to-[#1D1914]" />
      )}

      {/* Overlay - only if text exists or always to ensure premium feel */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${hasText ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />

      {/* Content Overlay */}
      {hasText && (
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          {tag && (
            <span
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2 block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          )}
          {title && (
            <h3
              className="text-white font-bold text-[20px] md:text-[24px] leading-tight mb-4 max-w-[90%]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h3>
          )}
          
          <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-all translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">Learn More</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}
    </div>
  );
}

