"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Testimonial } from "@/lib/sanity/types";

interface Props {
  testimonials: Testimonial[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialsClient({ testimonials }: Props) {
  return (
    <section id="community" className="py-32 bg-transparent relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          className="mb-14"
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
          <p className="mt-4 text-lg text-foreground/50 font-normal">
            Join 10,000+ individuals committed to building their life right.
          </p>
        </motion.div>

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
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative rounded-2xl border border-black/[0.08] bg-white p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-lg hover:shadow-black/5"
              >
                <p className="text-lg leading-relaxed italic text-foreground/70 mb-8">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  {/* Avatar: real image if provided, otherwise initials */}
                  {t.avatar?.asset?.url ? (
                    <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                      <Image
                        src={t.avatar.asset.url}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-semibold text-xs text-white shadow-sm flex-shrink-0">
                      {getInitials(t.name)}
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-semibold tracking-tight text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs font-medium text-foreground/50">
                      {t.role}
                      {t.company ? `, ${t.company}` : ""}
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
