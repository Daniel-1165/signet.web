"use client";

import { motion } from "framer-motion";
import { Eye, Flag } from "lucide-react";

const DotGrid = ({ className }: { className?: string }) => (
  <svg className={className} width="100" height="80" fill="none" viewBox="0 0 100 80">
    <pattern id="purpose-dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" className="fill-[#1E6B3A]/15" />
    </pattern>
    <rect width="100" height="80" fill="url(#purpose-dot-pattern)" />
  </svg>
);

export default function VisionMissionSection() {
  return (
    <section id="purpose" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#1E6B3A] mb-3 block">
            OUR PURPOSE
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-sans relative inline-block">
            Vision & Mission
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1E6B3A] rounded-full" />
          </h2>
          <p className="text-base md:text-lg text-[#0F172A]/60 font-medium pt-3 max-w-xl mx-auto">
            Guided by a clear purpose. Driven by meaningful impact.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Card 1: Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#EDEDED] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
          >
            <DotGrid className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity" />
            
            <div className="space-y-8 relative z-10">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A]">
                <Eye size={24} strokeWidth={1.5} />
              </div>
              
              <div className="space-y-4">
                <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#1E6B3A] block">
                  OUR VISION
                </span>
                <p className="text-lg md:text-2xl font-bold text-[#0F172A] leading-snug font-sans">
                  To build a global network of trailblazers who <span className="italic font-medium text-[#1E6B3A]">model and replicate excellence</span> in diverse spheres.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F6F4EE] rounded-[2.5rem] p-8 md:p-12 border border-[#EDEDED] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
          >
            <DotGrid className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity" />

            <div className="space-y-8 relative z-10">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A]">
                <Flag size={22} strokeWidth={1.5} />
              </div>

              <div className="space-y-4">
                <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#1E6B3A] block">
                  OUR MISSION
                </span>
                <p className="text-lg md:text-2xl font-extrabold text-[#0F172A] leading-snug uppercase tracking-wide font-sans">
                  Ordinary persons achieving <span className="italic font-medium text-[#1E6B3A]">extraordinary results</span> silently and sustainably.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
