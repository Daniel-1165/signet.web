"use client";

import { motion } from "framer-motion";
import { Eye, Flag } from "lucide-react";

export default function VisionMissionSection() {
  return (
    <section id="purpose" className="relative section-py overflow-hidden">
      <div className="relative z-10">
        {/* Section Header. The underline rule that used to sit under the
            heading is gone — the eyebrow already marks the section, and two
            devices doing one job is one too many. */}
        <div className="text-center mb-14 md:mb-20">
          <span className="eyebrow mb-5">Our Purpose</span>
          <h2 className="h2">
            Vision &amp; <span className="display-accent text-seal">Mission</span>
          </h2>
          <p className="lede pt-5 max-w-xl mx-auto">
            Guided by a clear purpose. Driven by meaningful impact.
          </p>
        </div>

        {/* Vision is pressed into the paper, Mission is struck in ink. The pair
            carries the contrast that the rest of the page keeps quiet. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 1.015, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card-press flex flex-col justify-between"
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-mist flex items-center justify-center text-seal">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>

              <div className="space-y-4">
                <span className="eyebrow">Our Vision</span>
                <p className="font-display text-lg sm:text-xl md:text-2xl leading-[1.35] text-ink">
                  To build a global network of trailblazers who{" "}
                  <span className="display-accent text-seal">model and replicate excellence</span> in
                  diverse spheres.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.015, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card-ink flex flex-col justify-between md:p-10"
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-verdant/15 flex items-center justify-center text-verdant">
                <Flag className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>

              <div className="space-y-4">
                <span className="eyebrow eyebrow-on-ink">Our Mission</span>
                {/* The uppercase treatment came off as shouting next to the
                    Vision card. Sentence case in the display face carries the
                    same weight without raising its voice — which is rather the
                    point of a network called Silent. */}
                <p className="font-display text-lg sm:text-xl md:text-2xl leading-[1.35] text-canvas">
                  Ordinary persons achieving{" "}
                  <span className="display-accent text-verdant">extraordinary results</span> —
                  silently and sustainably.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
