"use client";

import { motion } from "framer-motion";
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
    <section id="community" className="py-32 bg-transparent relative z-10 overflow-hidden">
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
            className="flex flex-col items-center justify-center py-24 rounded-[3rem] border border-dashed border-black/[0.1] bg-white/50 text-center"
          >
            <div className="text-6xl mb-6 opacity-30">💬</div>
            <p className="text-[#0D120E]/40 text-lg font-black uppercase tracking-widest">
              Community voices arriving soon.
            </p>
          </motion.div>
        ) : (
          <div className="relative group/testimonials">
            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing px-2 md:px-0 -mx-6 md:-mx-0">
              {testimonials.map((t, i) => {
                const isLongText = t.content && t.content.length > 150;
                return (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="flex-none w-[320px] md:w-[420px]"
                  >
                    <div className="h-full rounded-[2.5rem] border border-black/[0.05] bg-white p-8 md:p-10 flex flex-col gap-8 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 relative overflow-hidden min-h-[350px]">
                      {/* Decorative Quote Mark - Hide if image card exists */}
                      {!t.testimonialImage && (
                        <div className="absolute top-[-10px] right-[-5px] text-[100px] font-serif text-black/[0.02] pointer-events-none group-hover:text-[#1DA756]/5 transition-colors leading-none">
                          ”
                        </div>
                      )}

                      {t.testimonialImage ? (
                        <div className="absolute inset-0 z-0">
                          <img 
                            src={t.testimonialImage.asset?.url} 
                            alt={`Testimonial from ${t.name}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Subtle overlay to ensure any text overlay would be readable, though we aim for full image cards */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="flex-1 relative z-10">
                          <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, starIdx) => (
                              <svg key={starIdx} className="w-3.5 h-3.5 text-[#1DA756] fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.951-.69l1.285-3.97z" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className={`leading-relaxed text-[#0D120E] font-medium italic ${isLongText ? "text-base md:text-lg" : "text-lg md:text-xl"}`}>
                            "{t.content}"
                          </p>
                        </div>
                      )}

                      <div className={`pt-6 border-t border-black/[0.05] relative z-10 flex items-center gap-4 ${t.testimonialImage ? "mt-auto bg-white/60 backdrop-blur-md -m-8 md:-m-10 p-6 md:p-8" : ""}`}>
                        {t.avatar?.asset?.url ? (
                          <img 
                            src={t.avatar.asset.url} 
                            alt={t.name} 
                            className="w-10 h-10 rounded-full object-cover border border-black/5"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#1DA756]/10 flex items-center justify-center text-[#1DA756] font-black text-[10px]">
                            {getInitials(t.name)}
                          </div>
                        )}
                        <div>
                          <h4 className={`text-base font-black tracking-tight ${t.testimonialImage ? "text-[#051F20]" : "text-[#0D120E]"}`}>{t.name || "Anonymous"}</h4>
                          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-2 ${t.testimonialImage ? "text-[#051F20]/60" : "text-[#0D120E]/40"}`}>
                             {t.role || "Member"}{t.company ? `, ${t.company}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-2 pointer-events-none">
                <div className="w-12 h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ x: [0, 24, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-[#1DA756]/40 rounded-full"
                    />
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
