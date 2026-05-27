"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CalendarRange, Check, AlertCircle } from "lucide-react";

const DotGrid = ({ className }: { className?: string }) => (
  <svg className={className} width="80" height="60" fill="none" viewBox="0 0 80 60">
    <pattern id="program-dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" className="fill-[#1E6B3A]/15" />
    </pattern>
    <rect width="80" height="60" fill="url(#program-dot-pattern)" />
  </svg>
);

export default function ProgramSection() {
  return (
    <section id="programs" className="relative py-12 md:py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#1E6B3A] mb-3 block">
            OUR PROGRAM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-sans relative inline-block">
            Learn. Grow. Lead. Together.
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1E6B3A] rounded-full" />
          </h2>
        </div>

        {/* Cards Grid - Now borderless/cardless as requested, with reduced gap on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          
          {/* Column 1: Activities (Cardless) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <DotGrid className="absolute top-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity" />
            
            <div className="space-y-4 sm:space-y-8 relative z-10">
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A]">
                <ClipboardCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>
              
              <div className="space-y-2 sm:space-y-4">
                <p className="text-xs sm:text-sm font-semibold text-[#0F172A]/70 uppercase tracking-wider">
                  Beyond the training sessions, there will be:
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 sm:space-y-4">
                {[
                  "Team Review sessions",
                  "Periodic assignments",
                  "Personal check-in sessions",
                  "Assessment tests"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-[#0F172A]/80 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 2: Program Duration (Cardless) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative group"
          >
            <DotGrid className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity" />

            <div className="space-y-4 sm:space-y-8 relative z-10">
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A]">
                <CalendarRange className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>

              <div className="h-0 sm:h-2" />

              {/* Info Bullet Points */}
              <ul className="space-y-2.5 sm:space-y-4">
                <li className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base text-[#0F172A]/80 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 mt-1">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Our General classes hold every Monday by <span className="font-bold text-[#1E6B3A]">8.30pm-10:30pm</span>.</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base text-[#0F172A]/80 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 mt-1">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Each team will have to select a suitable day and time for their team review/interactive session weekly.</span>
                </li>
              </ul>

              {/* Warning/Important Banner */}
              <div className="bg-[#F6F4EE] border border-[#EDEDED] rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
                <AlertCircle className="text-[#1E6B3A] shrink-0 mt-0.5" size={20} />
                <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-semibold text-[#0F172A]/80 leading-relaxed uppercase tracking-wider">
                  <p className="text-[#1E6B3A]">
                    ATTEND ALL THE CLASSES TO GET THE MOST OUT OF THIS PROGRAM. ATTENDANCE WILL BE TAKEN SERIOUSLY.
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-[#0F172A]/50 normal-case tracking-normal font-medium leading-normal">
                    Note: The slides will not be shared after the class. Hence, ensure to take personal notes during each session.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
