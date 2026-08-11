"use client";

import { motion } from "framer-motion";

export default function TransformLifeSection() {
  return (
    <div className="bg-canvas w-full">
      <div className="page-container section-py">
        <motion.section
          initial={{ opacity: 0, scale: 1.012, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
        >
          {/* Heading */}
          <div className="mb-10">
            <span className="eyebrow mb-4">Empower · Grow · Lead</span>
            <h2 className="h2 max-w-3xl">
              Transform your life,
              <br />
              transform your <span className="display-accent text-seal">future</span>.
            </h2>
            <div className="rule mt-8" />
          </div>

          {/* Floated image with text wrapping around it */}
          <div className="flow-root text-ink/70 text-base md:text-lg leading-[1.65]">
            {/* Emphasis is now one phrase per paragraph. Previously almost every
                other span was bolded, which flattens the hierarchy — when
                everything is emphasised, nothing is. */}
            <p className="mb-6 max-w-2xl">
              A <strong className="font-semibold text-ink">12-month high-impact journey</strong> with
              ambitious leaders unlocking unmatched growth.
            </p>

            <div className="float-right ml-5 mb-5 sm:ml-8 sm:mb-8 w-[190px] h-[190px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-rule">
              <img
                src="/hero_collage.png"
                alt="Members of the SIGNET network at work together"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mb-6">
              Together, we focus on building{" "}
              <strong className="font-semibold text-ink">leadership capacity</strong> and creating a
              lasting impact.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
