"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DotGrid = ({ className }: { className?: string }) => (
  <svg className={className} width="100" height="80" fill="none" viewBox="0 0 100 80">
    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" className="fill-[#1DA756]/15" />
    </pattern>
    <rect width="100" height="80" fill="url(#dot-pattern)" />
  </svg>
);

export default function Introduction() {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden rounded-[2.5rem] border border-[#D8CEBE]/20">
      {/* Decorative Dots - Top Left */}
      <DotGrid className="absolute top-8 left-8 opacity-75 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text and CTA (7 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#E03E00] mb-3">
              ABOUT US
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0D120E] tracking-tight mb-4">
              Introduction
            </h2>
            
            {/* Orange Underline Indicator */}
            <div className="w-24 h-1.5 bg-[#E03E00] mb-8 rounded-full" />
            
            <div className="space-y-6 text-[#1D1914]/80 text-sm md:text-base leading-relaxed font-semibold mb-8">
              <p>
                Silent Growth Network (SIGNET) is a capacity building organization committed to personal 
                development, leadership development and inculcation of essential life skills in people, 
                turning them into extraordinary leaders.
              </p>
              <p>
                With a special interest in young people, we believe in noiseless organic growth, 
                which translates to results that are loud and sustainable.
              </p>
            </div>

            <Link href="/features">
              <button className="flex items-center gap-3 bg-[#0B3D2E] hover:bg-[#1D1914] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-[#0B3D2E]/20">
                Learn More <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </Link>
          </motion.div>

          {/* Right Column: Crescent Curved Image (5 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-end"
          >
            {/* Decorative Dots - Bottom Left under the image */}
            <DotGrid className="absolute -bottom-8 -left-8 opacity-75 z-0" />

            <div className="relative w-full max-w-[480px] aspect-[4/3] lg:aspect-auto lg:h-[480px] overflow-hidden rounded-l-[100%_50%] border-l border-y border-black/[0.03] shadow-md z-10 bg-white">
              <img
                src="/get-to-know-us.png"
                alt="Silent Growth Network Mentors"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
