"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
    {
        author: "Jordan Lex",
        role: "Product Designer",
        content: "Joining Signet has been the most transformative decision of my decade. The clarity, discipline, and community support are unmatched anywhere.",
        logo: "JL"
    },
    {
        author: "Elena Vance",
        role: "Software Architect",
        content: "Finally, a community that values maturity and discipline over hype. The resources here are professional-grade and intellectually honest.",
        logo: "EV"
    },
    {
        author: "Marcus Thorne",
        role: "Founder, Zenith",
        content: "Signet gives me the structure I need to lead and the community I need to stay grounded. It is absolute class from top to bottom.",
        logo: "MT"
    }
];

const Testimonials = () => {
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
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-accent mb-3">Community</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground max-w-md">Real stories from our network.</h2>
                    <p className="mt-4 text-lg text-foreground/50 font-normal">Join 10,000+ individuals committed to building their life right.</p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.author}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className="group relative rounded-2xl border border-black/[0.08] bg-white p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-lg hover:shadow-black/5"
                        >
                            <p className="text-lg leading-relaxed italic text-foreground/70 mb-8">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-semibold text-xs text-white shadow-sm">
                                    {review.logo}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold tracking-tight text-foreground">{review.author}</div>
                                    <div className="text-xs font-medium text-foreground/50">{review.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
