"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Introduction() {
  return (
    <section 
      id="about-us" 
      className="relative bg-canvas w-full border-t border-rule section-py overflow-hidden"
    >
      {/* Background Image (Desktop only) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none hidden md:block">
        <img
          src="/about_us_bg.png"
          alt=""
          className="w-full h-full object-cover object-right opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/40 to-transparent" />
      </div>

      <div className="page-container relative z-10">
        
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
            <span className="eyebrow mb-3">About Us</span>
            <h2 className="h2">SIGNET</h2>
          </div>

          {/* Mobile Image just below SIGNET text with Learn More button and Logo on top of it */}
          <div className="relative w-full aspect-[4/3] rounded-[var(--radius-seal)] overflow-hidden border border-rule bg-mist/30">
            <img 
              src="/about_us_mobile.jpg" 
              alt="Silent Growth Network Mentorship" 
              className="w-full h-full object-cover" 
            />
            {/* Logo on top left of the image */}
            <div className="absolute top-4 left-4 z-10 bg-canvas/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-rule">
              <img
                src="/signet-brand-logo.svg"
                alt="SIGNET"
                className="h-5 w-auto object-contain"
              />
            </div>
            {/* Learn More Button on top of the image */}
            <div className="absolute bottom-4 right-4 z-10">
              <Link href="/features" className="btn-primary text-xs px-5 py-3">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Paragraphs below the image */}
          <div className="body-sm space-y-4">
            <p>
              <strong className="font-semibold text-ink">Silent Growth Network (SIGNET)</strong> is a
              capacity building organization committed to personal development, leadership
              development and inculcation of essential life skills in people, turning them into
              extraordinary leaders.
            </p>
            <p>
              With a special interest in young people, we believe in{" "}
              <span className="display-accent text-seal">noiseless organic growth</span> — which
              translates to results that are loud and sustainable.
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
          <div className="mb-6">
            <span className="eyebrow mb-3">About Us</span>
            <h2 className="h2">SIGNET</h2>
          </div>

          {/* Text and Button container */}
          <div className="lede">
            <p className="mb-6">
              <strong className="font-semibold text-ink">Silent Growth Network (SIGNET)</strong> is a
              capacity building organization committed to personal development, leadership
              development and inculcation of essential life skills in people, turning them into
              extraordinary leaders.
            </p>
            <p className="mb-6">
              With a special interest in young people, we believe in{" "}
              <span className="display-accent text-seal">noiseless organic growth</span> — which
              translates to results that are loud and sustainable.
            </p>

            {/* Desktop Action Row */}
            <div className="pt-6 mt-6">
              <Link href="/features" className="btn-primary">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
