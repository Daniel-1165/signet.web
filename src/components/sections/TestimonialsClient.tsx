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
            className="flex flex-col items-center justify-center py-24 rounded-[3rem] border border-dashed border-black/[0.1] bg-white/50 text-center"
          >
            <div className="text-6xl mb-6 opacity-30">💬</div>
            <p className="text-[#0D120E]/40 text-lg font-black uppercase tracking-widest">
              Community voices arriving soon.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group flex"
              >
                <div className="w-full rounded-[2.5rem] border border-black/[0.05] bg-white p-10 md:p-12 flex flex-col gap-10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 relative overflow-hidden">
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-[-20px] right-[-10px] text-[120px] font-serif text-black/[0.02] pointer-events-none group-hover:text-[#1DA756]/5 transition-colors leading-none">
                    ”
                  </div>

                  <div className="flex-1 relative z-10">
                    <div className="flex gap-1.5 mb-8">
                      {[...Array(5)].map((_, starIdx) => (
                        <svg key={starIdx} className="w-4 h-4 text-[#1DA756] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.951-.69l1.285-3.97z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-xl md:text-2xl leading-relaxed text-[#0D120E] font-medium italic">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="pt-8 border-t border-black/[0.05] relative z-10 flex items-center gap-4">
                    {t.avatar?.asset?.url ? (
                      <img 
                        src={t.avatar.asset.url} 
                        alt={t.name} 
                        className="w-12 h-12 rounded-full object-cover border border-black/5"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">
                        {getInitials(t.name)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-black text-[#0D120E] tracking-tight">{t.name || "Anonymous"}</h4>
                      <p className="text-[10px] font-bold text-[#0D120E]/40 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                         {t.role || "Member"}{t.company ? `, ${t.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
