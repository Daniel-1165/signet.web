"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  { icon: MessageCircle, href: "https://wa.me/2349032387758?text=Hi%20Signet%20Network%2C%20I%20need%20help%20with...", label: "WhatsApp", color: "hover:bg-[#1E6B3A] hover:text-white" },
  { icon: Mail, href: "mailto:info@signet.org?subject=Support%20Request", label: "Email", color: "hover:bg-[#1E6B3A] hover:text-white" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-[#1E6B3A] hover:text-white" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-[#1E6B3A] hover:text-white" },
];

export default function Introduction() {
  return (
    <section 
      id="about-us" 
      className="relative bg-white md:bg-[#FAFAF8] w-full border-t border-gray-150/40 py-12 md:py-24 overflow-hidden"
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
        <motion.div 
          className="block md:hidden space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-black mb-1 block">
              About Us
            </span>
            <h2 className="text-2xl font-bold text-black font-sans">
              SIGNET
            </h2>
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
              <strong className="font-semibold text-black">Silent Growth Network (SIGNET)</strong> is a capacity building organization committed to <span className="font-semibold text-black">personal development</span>, <span className="font-semibold text-black">leadership development</span> and inculcation of <span className="font-semibold text-black">essential life skills</span> in people, turning them into <span className="font-semibold text-black">extraordinary leaders</span>.
            </p>
            <p>
              With a special interest in young people, we believe in <span className="font-semibold text-black">noiseless organic growth</span>, which translates to results that are <span className="font-semibold text-black">loud and sustainable</span>.
            </p>
          </div>

          {/* Contact Section for Mobile removed */}
        </motion.div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (Hidden on mobile)                                          */}
        {/* ========================================================================= */}
        <motion.div 
          className="hidden md:block md:max-w-[45%] lg:max-w-[48%] relative z-10"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <div className="mb-4">
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-black mb-1 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black font-sans">
              SIGNET
            </h2>
          </div>

          {/* Text and Button container */}
          <div className="font-sans text-black text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            <p className="mb-6">
              <strong className="font-semibold text-black">Silent Growth Network (SIGNET)</strong> is a capacity building organization committed to <span className="font-semibold text-black">personal development</span>, <span className="font-semibold text-black">leadership development</span> and inculcation of <span className="font-semibold text-black">essential life skills</span> in people, turning them into <span className="font-semibold text-black">extraordinary leaders</span>.
            </p>
            <p className="mb-6">
              With a special interest in young people, we believe in <span className="font-semibold text-black">noiseless organic growth</span>, which translates to results that are <span className="font-semibold text-black">loud and sustainable</span>.
            </p>

            {/* Desktop Action Row */}
            <div className="pt-6 mt-6">
              <Link href="/features">
                <button className="flex items-center gap-3 bg-[#0B2B26] hover:bg-[#1E6B3A] text-white px-7 py-3.5 rounded-full font-bold text-xs transition-all shadow-md shadow-[#0B2B26]/5">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
