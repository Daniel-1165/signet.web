"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Introduction() {
  return (
    <section id="about-us" className="relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading & Dashed Line */}
        <div className="mb-4">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#1E6B3A] mb-1 block">
            About Us
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0B2B26] font-sans">
            SIGNET
          </h2>
          <div className="w-full border-t border-dashed border-[#0B2B26]/10 mt-2" />
        </div>

        {/* Floating image and wrapping text container */}
        <div className="flow-root font-sans text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
          {/* Paragraph 1 - Spans full width on mobile because it's before the floated image */}
          <p className="mb-6">
            <strong className="font-extrabold text-[#0B2B26]">Silent Growth Network (SIGNET)</strong> is a capacity building organization committed to <span className="font-bold text-[#1E6B3A]">personal development</span>, <span className="font-bold text-[#1E6B3A]">leadership development</span> and inculcation of <span className="font-bold text-[#1E6B3A]">essential life skills</span> in people, turning them into <span className="font-bold text-[#1E6B3A]">extraordinary leaders</span>.
          </p>

          {/* Floated Image - Restructured to sit after Paragraph 1 and float right of Paragraph 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="float-right ml-4 mb-4 sm:ml-8 sm:mb-8 w-[195px] h-[195px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] aspect-square overflow-hidden rounded-l-[100%_50%] border border-[#0B2B26]/10 shadow-2xl"
          >
            <img
              src="/mentorship_new.png"
              alt="Silent Growth Network Mentors"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Paragraph 2 - Wraps around the floated image */}
          <p className="mb-6">
            With a special interest in young people, we believe in <span className="font-bold text-[#1E6B3A]">noiseless organic growth</span>, which translates to results that are <span className="font-bold text-[#1E6B3A]">loud and sustainable</span>.
          </p>

          {/* Learn More Button - Clears floated content to span full width below */}
          <div className="pt-4 clear-left sm:clear-none">
            <Link href="/features">
              <button className="flex items-center gap-3 bg-[#0B2B26] hover:bg-[#1E6B3A] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-md shadow-[#0B2B26]/5">
                Learn More <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
