"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunityBanner() {
  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Banner Container - Stacked layout to match the hand-drawn sketch exactly on mobile & desktop */}
        <div className="relative w-full rounded-[2.5rem] bg-[#114B2A] p-6 sm:p-10 md:p-12 overflow-hidden shadow-sm flex flex-col justify-between group">
          {/* Decorative subtle background overlay */}
          <div className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-white/[0.02] blur-[80px] -rotate-12 translate-x-1/4 pointer-events-none" />
          
          {/* Top Section: Full Width Text */}
          <div className="relative z-10 w-full flex flex-col items-start mb-4 md:mb-6">
            <span className="font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#EAF4EC]/75 mb-2 block">
              COMMUNITY
            </span>
            <h3 className="text-[15px] sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans leading-snug max-w-2xl">
              Real stories from our community.
            </h3>
          </div>

          {/* Bottom Section: Dashed line stretching to the outline pill button on the right */}
          <div className="relative z-10 w-full flex items-center justify-between gap-4 md:gap-8 mt-2">
            {/* Dashed line as drawn in the sketch */}
            <div className="flex-grow border-t border-dashed border-white/20" />
            
            {/* Outline Button on the right */}
            <div className="shrink-0">
              <Link href="/join" className="group/btn flex items-center justify-center gap-1.5 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold text-[10px] sm:text-xs md:text-sm bg-transparent hover:bg-white/5 transition-all text-center font-sans uppercase tracking-wider">
                <span>Join the Community</span> 
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
