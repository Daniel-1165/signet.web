"use client";

import { motion } from "framer-motion";
import { Users2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunityBanner() {
  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Banner Container */}
        <div className="relative w-full rounded-[2.5rem] bg-[#114B2A] p-8 md:p-14 overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 group">
          {/* Decorative subtle background overlay */}
          <div className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-white/[0.02] blur-[80px] -rotate-12 translate-x-1/4 pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 w-full md:w-auto">
            {/* Community Icon Container */}
            <div className="w-16 h-16 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 shadow-inner">
              <Users2 size={28} strokeWidth={1.5} />
            </div>

            {/* Text details */}
            <div className="space-y-2">
              <span className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#EAF4EC]/75 block">
                COMMUNITY
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
                Real stories from our community.
              </h3>
              <p className="text-sm text-[#EAF4EC]/85 font-medium">
                Inspired by journeys. United by purpose.
              </p>
            </div>
          </div>

          {/* CTA Link Outline Button */}
          <div className="relative z-10 shrink-0 w-full sm:w-auto flex justify-start sm:justify-end">
            <Link href="/join" className="group/btn flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold text-sm bg-transparent hover:bg-white/5 transition-all w-full sm:w-auto text-center font-sans">
              <span>Join the Community</span> 
              <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
