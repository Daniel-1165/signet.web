"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Introduction() {
  return (
    <section 
      id="about-us" 
      className="relative bg-[#FAFAF8] w-full border-y border-gray-150/40 py-12 md:py-24 overflow-hidden"
    >
      {/* Background Image (Desktop only) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none hidden md:block">
        <img 
          src="/about_us_bg.png" 
          alt="" 
          className="w-full h-full object-cover object-right opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/40 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10">
        
        {/* ========================================================================= */}
        {/* MOBILE VIEW (Hidden on desktop)                                           */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-6">
          {/* Heading */}
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-black mb-1 block">
              About Us
            </span>
            <h2 className="text-2xl font-extrabold text-black font-sans">
              SIGNET
            </h2>
            <div className="w-full border-t border-dashed border-black/10 mt-2" />
          </div>

          {/* Mobile Image just below SIGNET text with Learn More button and Logo on top of it */}
          <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden shadow-lg border border-black/5 bg-gray-100">
            <img 
              src="/about_us_mobile.jpg" 
              alt="Silent Growth Network Mentorship" 
              className="w-full h-full object-cover" 
            />
            {/* Logo on top left of the image */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-lg shadow-sm border border-white/20">
              <img 
                src="/signet-brand-logo.svg" 
                alt="Signet Logo" 
                className="h-5 w-auto object-contain" 
              />
            </div>
            {/* Learn More Button on top of the image */}
            <div className="absolute bottom-4 right-4 z-10">
              <Link href="/features">
                <button className="flex items-center gap-2 bg-[#0B2B26] hover:bg-[#1E6B3A] text-white px-5 py-3 rounded-full font-bold text-xs transition-all shadow-lg border border-white/10">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Paragraphs below the image */}
          <div className="font-sans text-black text-sm leading-relaxed font-normal space-y-4">
            <p>
              <strong className="font-extrabold text-black">Silent Growth Network (SIGNET)</strong> is a capacity building organization committed to <span className="font-bold text-black">personal development</span>, <span className="font-bold text-black">leadership development</span> and inculcation of <span className="font-bold text-black">essential life skills</span> in people, turning them into <span className="font-bold text-black">extraordinary leaders</span>.
            </p>
            <p>
              With a special interest in young people, we believe in <span className="font-bold text-black">noiseless organic growth</span>, which translates to results that are <span className="font-bold text-black">loud and sustainable</span>.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (Hidden on mobile)                                          */}
        {/* ========================================================================= */}
        <div className="hidden md:block md:max-w-[45%] lg:max-w-[48%] relative z-10">
          {/* Heading & Dashed Line */}
          <div className="mb-4">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-black mb-1 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black font-sans">
              SIGNET
            </h2>
            <div className="w-full border-t border-dashed border-black/10 mt-2" />
          </div>

          {/* Text and Button container */}
          <div className="font-sans text-black text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            <p className="mb-6">
              <strong className="font-extrabold text-black">Silent Growth Network (SIGNET)</strong> is a capacity building organization committed to <span className="font-bold text-black">personal development</span>, <span className="font-bold text-black">leadership development</span> and inculcation of <span className="font-bold text-black">essential life skills</span> in people, turning them into <span className="font-bold text-black">extraordinary leaders</span>.
            </p>
            <p className="mb-6">
              With a special interest in young people, we believe in <span className="font-bold text-black">noiseless organic growth</span>, which translates to results that are <span className="font-bold text-black">loud and sustainable</span>.
            </p>
            <div className="pt-4">
              <Link href="/features">
                <button className="flex items-center gap-3 bg-[#0B2B26] hover:bg-[#1E6B3A] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-md shadow-[#0B2B26]/5">
                  Learn More <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
