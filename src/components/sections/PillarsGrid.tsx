"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Target, TrendingUp, ListOrdered } from "lucide-react";

const pillars = [
  { title: "Emotional Intelligence", icon: Heart, label: "01" },
  { title: "Self-Awareness", icon: Target, label: "02" },
  { title: "Resilience", icon: TrendingUp, label: "03" },
  { title: "Systems Thinking", icon: ListOrdered, label: "04" }
];

export default function PillarsGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {pillars.map((pillar, i) => (
        <div
          key={i}
          style={{ 
            opacity: isVisible ? 1 : 0,
            transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
            willChange: 'opacity'
          }}
          className="group bg-white rounded-3xl p-6 md:p-12 text-left hover:bg-[#1D1914] transition-colors duration-500 border border-[#D8CEBE]/30 flex flex-col min-h-[160px] md:min-h-[280px]"
        >
          <span className="text-[10px] font-bold text-[#D8CEBF] group-hover:text-white/40 transition-colors mb-auto tracking-widest">
            {pillar.label}
          </span>
          <pillar.icon className="w-6 h-6 md:w-8 md:h-8 text-[#6E7A67] mb-4 md:mb-10 group-hover:text-white transition-colors" />
          <h4 
            className="text-[15px] md:text-[22px] font-bold text-[#1D1914] group-hover:text-white transition-colors leading-tight" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pillar.title}
          </h4>
        </div>
      ))}
    </div>
  );
}
