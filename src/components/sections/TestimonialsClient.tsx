"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Testimonial } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    dragDistance.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    container.scrollLeft = scrollLeft.current - walk;
    dragDistance.current = Math.abs(x - startX.current);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragDistance.current > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="community" className="py-0 relative z-10 overflow-hidden">
      <div>
        <div className="flex flex-col mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 1.015, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow mb-4">Community</span>
            <h2 className="h2 max-w-lg">
              Real stories from our{" "}
              <span className="text-seal">network</span>.
            </h2>
          </motion.div>
        </div>

        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center py-24 px-6 rounded-[2.5rem] border border-dashed border-rule-strong text-center"
          >
            {/* An empty screen is an invitation to act, not a mood. The old
                copy just announced absence; this one tells a member what to
                do about it. */}
            <h3 className="h3 mb-2">No stories yet</h3>
            <p className="body-sm max-w-sm">
              Members share what the program changed for them here. Yours could be the first.
            </p>
          </motion.div>
        ) : (
          <div className="relative group/testimonials">
            {/* Horizontal Scroll Container */}
            <div 
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onClickCapture={onClickCapture}
              className={`flex gap-3 overflow-x-auto no-scrollbar pb-8 px-2 md:px-0 -mx-6 md:-mx-0 no-swipe ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
            >
              {testimonials.map((t, i) => {
                const isLongText = t.content && t.content.length > 150;
                return (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="flex-none w-[310px] sm:w-[360px] md:w-[460px]"
                  >
                    <div className="h-full flex flex-col gap-5 transition-transform duration-500 hover:-translate-y-1 relative min-h-[320px] px-4 py-6">
                      {/* Decorative Quote Mark - Hide if image card exists */}
                      {!t.testimonialImage && (
                        <div className="absolute top-[-10px] right-[-5px] text-[110px] font-display italic text-ink/[0.05] pointer-events-none leading-none">
                          ”
                        </div>
                      )}

                      {t.testimonialImage ? (
                        <div className="flex-1 w-full aspect-square relative overflow-hidden bg-black/[0.02]">
                          <img 
                            src={urlFor(t.testimonialImage as any).fit('max').url()} 
                            alt={`Testimonial from ${t.name}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex-1 relative z-10">
                          <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((Star, starIdx) => (
                              <svg key={starIdx} className="w-3.5 h-3.5 text-wax fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.951-.69l1.285-3.97z" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className={`font-display leading-[1.35] text-ink ${isLongText ? "text-lg md:text-xl" : "text-2xl md:text-3xl"}`}>
                            “{t.content}”
                          </p>
                        </div>
                      )}

                      <div className="pt-6 border-t border-verdant/40 relative z-10 flex items-center gap-4">
                        {t.avatar?.asset ? (
                          <img
                            src={urlFor(t.avatar as any).fit('max').width(80).height(80).url()}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border border-rule"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center text-seal font-mono font-medium text-[11px]">
                            {getInitials(t.name)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-display text-base font-semibold tracking-tight text-ink">
                            {t.name || "Anonymous"}
                          </h4>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] mt-1 text-ink/45">
                            {t.role || "Member"}{t.company ? `, ${t.company}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll Indicator. The hint loops indefinitely, so it has to
                stop for anyone who has asked for reduced motion — a permanent
                animation is exactly what that setting is about. */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-2 pointer-events-none">
                <div className="w-12 h-1 bg-rule rounded-full overflow-hidden">
                    <motion.div
                        animate={prefersReducedMotion ? undefined : { x: [0, 24, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-verdant rounded-full"
                    />
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
