"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DotGrid = ({ className }: { className?: string }) => (
  <svg className={className} width="100" height="80" fill="none" viewBox="0 0 100 80">
    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" className="fill-[#1E6B3A]/15" />
    </pattern>
    <rect width="100" height="80" fill="url(#dot-pattern)" />
  </svg>
);

export default function Introduction() {
  return (
    <section id="about-us" className="relative py-16 md:py-24 bg-white overflow-hidden rounded-[2.5rem] border border-[#EDEDED] shadow-sm">
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
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#F26B21] mb-2 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] mb-8 font-sans">
              Signet
            </h2>
            
            <div className="space-y-6 text-[#0F172A]/80 text-base md:text-lg leading-relaxed font-normal mb-8 font-sans">
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
              <button className="flex items-center gap-3 bg-[#1E6B3A] hover:bg-[#114B2A] text-white px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-md shadow-[#1E6B3A]/10 font-sans">
                Learn More <ArrowRight className="w-5 h-5" />
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

            <div className="relative w-full max-w-[480px] aspect-square overflow-hidden rounded-l-[100%_50%] border-l border-y border-[#EDEDED] shadow-md z-10 bg-white">
              <img
                src="/mentorship_new.png"
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
