'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';

interface CarouselSlide {
  _id: string;
  image?: any;
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
    image: { asset: { _ref: 'image-1' }, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
    tag: 'GROWTH SERIES',
    title: 'Featured Growth Sessions',
  },
  {
    _id: 'fb-2',
    image: { asset: { _ref: 'image-2' }, url: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?auto=format&fit=crop&q=80&w=800' },
    tag: 'NETWORK',
    title: 'Intentional Focus',
  },
  {
    _id: 'fb-3',
    image: { asset: { _ref: 'image-3' }, url: 'https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=800' },
    tag: 'LEARNING',
    title: 'Growth Sessions',
  },
];

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const displaySlides = slides && slides.length > 0 ? slides : FALLBACK_SLIDES;
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
      <div className="flex items-center justify-between mb-8 px-4 md:px-0">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-[1px] bg-[#6E7A67]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6E7A67]">Featured Insights</span>
           </div>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-[#1D1914] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Growth Archives
          </h2>
        </div>
        {/* Dot indicators */}
        <div className="hidden md:flex items-center gap-2 bg-white border border-[#D8CEBE]/30 px-4 py-2 rounded-full shadow-sm">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-500 ease-out ${
                i === activeIndex
                  ? 'w-6 h-1.5 bg-[#1D1914]'
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
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-10"
      >
        {displaySlides.map((slide, i) => {
          const isActive = i === activeIndex;

          return (
            <div
              key={slide._id}
              className="flex-none w-[85vw] max-w-[320px] md:w-[450px] md:max-w-none snap-start"
            >
              <SlideCard slide={slide} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Desktop) */}
      <div className="hidden md:flex items-center justify-end gap-3 mt-4">
        <button
          onClick={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-12 h-12 rounded-full border border-[#D8CEBE] flex items-center justify-center text-[#1D1914] disabled:opacity-20 hover:bg-[#1D1914] hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex === displaySlides.length - 1}
          className="w-12 h-12 rounded-full border border-[#D8CEBE] flex items-center justify-center text-[#1D1914] disabled:opacity-20 hover:bg-[#1D1914] hover:text-white transition-all shadow-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

/* ── Individual Slide Card ─────────────────────────────────── */
function SlideCard({
  slide,
  isActive,
}: {
  slide: CarouselSlide;
  isActive: boolean;
}) {
  const { title, tag, image, link } = slide;
  const hasText = title || tag;

  const content = (
    <div
      className={`relative w-full aspect-[16/10] md:aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer group transition-all duration-700 ${
        isActive ? 'shadow-2xl shadow-[#1D1914]/15 scale-[1.02]' : 'shadow-lg shadow-black/5 opacity-60 scale-[0.98]'
      }`}
    >
      {/* Background image */}
      {image?.asset ? (
        <img
          src={urlFor(image).width(1200).auto('format').url()}
          alt={title || 'Carousel slide'}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          loading="lazy"
        />
      ) : image?.url ? (
          <img
            src={image.url}
            alt={title || 'Carousel slide'}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            loading="lazy"
          />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D1914] via-[#6E7A67] to-[#1D1914]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

      {/* Content Overlay */}
      {hasText && (
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
          {tag && (
            <span
              className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D8CEBF] mb-3 block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          )}
          {title && (
            <h3
              className="text-white font-bold text-[24px] md:text-[30px] leading-[1.1] mb-6 max-w-[90%]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h3>
          )}
          
          <div className="flex items-center gap-3 text-white transition-all translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Explore Narrative</span>
            <div className="w-8 h-[1px] bg-white/50 group-hover:w-12 transition-all" />
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}
