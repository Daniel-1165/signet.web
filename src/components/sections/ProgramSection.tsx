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
    <section id="programs" className="relative py-16 md:py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#1E6B3A] mb-3 block">
            OUR PROGRAM
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-sans relative inline-block">
            Learn. Grow. Lead. Together.
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1E6B3A] rounded-full" />
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Card 1: Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#EDEDED] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
          >
            <DotGrid className="absolute top-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity" />
            
            <div className="space-y-8 relative z-10">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A]">
                <ClipboardCheck size={26} strokeWidth={1.5} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-[#0F172A] font-sans">
                  Activities
                </h3>
                <div className="w-12 h-[2px] bg-[#1E6B3A]" />
                <p className="text-sm font-semibold text-[#0F172A]/70 uppercase tracking-wider">
                  Beyond the training sessions, there will be:
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-4">
                {[
                  "Team Review sessions",
                  "Periodic assignments",
                  "Personal check-in sessions",
                  "Assessment tests"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-base text-[#0F172A]/80 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Program Duration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#EDEDED] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
          >
            <DotGrid className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity" />

            <div className="space-y-8 relative z-10">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A]">
                <CalendarRange size={26} strokeWidth={1.5} />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-[#0F172A] font-sans">
                  Program Duration
                </h3>
                <div className="w-12 h-[2px] bg-[#1E6B3A]" />
              </div>

              {/* Info Bullet Points */}
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-base text-[#0F172A]/80 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 mt-1">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Our General classes hold every Monday by <span className="font-bold text-[#1E6B3A]">8.30pm-10:30pm</span>.</span>
                </li>
                <li className="flex items-start gap-4 text-base text-[#0F172A]/80 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 mt-1">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Each team will have to select a suitable day and time for their team review/interactive session weekly.</span>
                </li>
              </ul>

              {/* Warning/Important Banner */}
              <div className="bg-[#F6F4EE] border border-[#EDEDED] rounded-2xl p-5 flex gap-4 items-start">
                <AlertCircle className="text-[#1E6B3A] shrink-0 mt-0.5" size={20} />
                <div className="space-y-2 text-xs font-semibold text-[#0F172A]/80 leading-relaxed uppercase tracking-wider">
                  <p className="text-[#1E6B3A]">
                    ATTEND ALL THE CLASSES TO GET THE MOST OUT OF THIS PROGRAM. ATTENDANCE WILL BE TAKEN SERIOUSLY.
                  </p>
                  <p className="text-[10px] text-[#0F172A]/50 normal-case tracking-normal font-medium leading-normal">
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
