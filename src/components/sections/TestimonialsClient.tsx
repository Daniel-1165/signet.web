"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Testimonial } from "@/lib/sanity/types";

interface Props {
  testimonials: Testimonial[];
}

function getInitials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialsClient({ testimonials }: Props) {
  return (
    <section id="community" className="py-32 bg-transparent relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-accent mb-3">
              Community
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground max-w-md">
              Real stories from our network.
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-foreground/50 font-normal max-w-sm"
          >
            Join 10,000+ individuals committed to building their life right.
          </motion.p>
        </div>

        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center py-20 rounded-2xl border border-black/[0.08] bg-white text-center"
          >
            <div className="text-5xl mb-4">💬</div>
            <p className="text-foreground/40 text-base font-medium">
              Testimonials coming soon.
            </p>
            <p className="text-foreground/25 text-sm mt-1">
              Add them in Sanity Studio under{" "}
              <span className="font-semibold">Testimonials</span>.
            </p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Horizontal Scroll Menu */}
            <div className="flex overflow-x-auto pb-10 gap-6 snap-x snap-mandatory hide-scrollbar group/scroll">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex-shrink-0 w-full md:w-[600px] lg:w-[800px] snap-center"
                >
                  <div className="group relative rounded-[32px] border border-black/[0.08] bg-white p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 min-h-[400px]">
                    
                    {/* Testimonial Image (Large & Focused) */}
                    {t.avatar?.asset?.url ? (
                      <div className="relative w-full md:w-1/2 aspect-video md:aspect-square rounded-2xl overflow-hidden border border-black/5 shadow-inner bg-[#F9F9F9]">
                        <Image
                          src={t.avatar.asset.url}
                          alt={t.name || "Testimonial media"}
                          fill
                          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    ) : (
                      <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-accent/5 flex items-center justify-center">
                         <span className="text-6xl text-accent/20 font-black">{getInitials(t.name)}</span>
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-6">
                        <span className="text-[#1DA756] text-4xl font-serif">“</span>
                        <p className="text-xl md:text-2xl leading-relaxed italic text-[#0D120E] font-medium -mt-2">
                          {t.content || "Testimonial content"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-auto">
                        {!t.avatar?.asset?.url && (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-semibold text-sm text-white shadow-sm flex-shrink-0">
                            {getInitials(t.name)}
                          </div>
                        )}
                        <div>
                          <div className="text-base font-bold tracking-tight text-[#0D120E]">
                            {t.name || "Anonymous User"}
                          </div>
                          <div className="text-sm font-medium text-[#0D120E]/50">
                            {t.role || "Member"}
                            {t.company ? `, ${t.company}` : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Hint (Mobile) / Desktop Visuals */}
            <div className="flex justify-center gap-2 mt-4">
               {testimonials.map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10 shrink-0" />
               ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
