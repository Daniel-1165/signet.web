"use client";

import { motion } from "framer-motion";

export default function TransformLifeSection() {
  return (
    <div className="bg-white w-full text-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <motion.section 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="relative bg-transparent overflow-hidden"
        >
          {/* Heading & Dashed Line */}
          <div className="mb-8">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#114B2A] mb-2 block">
              EMPOWER. GROW. LEAD.
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-[#0F172A] font-sans">
              Transform Your Life, <br />
              Transform Your Future.
            </h2>
            <div className="w-full border-t border-dashed border-slate-200 mt-4" />
          </div>

          {/* Floating image and wrapping text container */}
          <div className="flow-root font-sans text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
            {/* Paragraph 1 */}
            <p className="mb-6">
              A <strong className="font-extrabold text-[#114B2A]">12-month high-impact journey</strong> with <span className="font-bold text-[#114B2A]">ambitious leaders</span> unlocking <span className="font-bold text-[#114B2A]">unmatched growth</span>.
            </p>

            {/* Floated Image */}
            <div className="float-right ml-4 mb-4 sm:ml-8 sm:mb-8 w-[195px] h-[195px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] aspect-square overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
              <img
                src="/hero_collage.png"
                alt="SIGNET Journey"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Paragraph 2 */}
            <p className="mb-6">
              Together, we focus on building <span className="font-bold text-[#114B2A]">leadership capacity</span> and creating a <em className="italic font-bold text-[#114B2A]">lasting impact</em>.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
