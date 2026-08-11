"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, ShieldCheck, Users2, BookOpen, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import { rise, riseAt } from "@/lib/motion";

const fadeUp: any = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
    })
};

const FeaturesGrid = () => {
    return (
        <section id="features" className="py-24 bg-canvas overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                {/* Section Header */}
                <motion.div
                    className="mb-12 flex flex-col items-center text-center px-4"
                    {...rise}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-seal/10 border border-seal/20 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-seal" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-seal">The Blueprint</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-ink max-w-2xl leading-tight mb-4">
                        A framework built for those who grow in silence.
                    </h2>
                    <p className="text-ink/60 text-sm md:text-base max-w-xl leading-relaxed">
                        Sustainable growth requires unbroken focus. Discover the elements that make Signet the premier network for high-achievers.
                    </p>
                </motion.div>

                {/* Row 1: Three equal columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group rounded-[var(--radius-lg)] border border-black/[0.05] bg-white p-6 md:p-8   transition duration-300">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-black/[0.03] text-ink mb-6 transition-transform group-hover:scale-110">
                            <Target className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-ink mb-3 tracking-tight">Deep Focus</h3>
                        <p className="text-ink/60 text-sm leading-relaxed">Cultivate unbroken attention in an evergreen environment designed strictly for high-yield execution.</p>
                    </motion.div>

                    <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group rounded-[var(--radius-lg)] border border-black/[0.05] bg-white p-6 md:p-8   transition duration-300">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-seal/10 text-seal mb-6 transition-transform group-hover:scale-110">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-ink mb-3 tracking-tight">Sustained Growth</h3>
                        <p className="text-ink/60 text-sm leading-relaxed">Compound interest in your skills, mindset, and execution every single day without burnout.</p>
                    </motion.div>

                    <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group rounded-[var(--radius-lg)] bg-ink p-6 md:p-8   transition duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-seal/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-white/10 text-white mb-6 border border-white/5 transition-transform group-hover:scale-110 relative z-10">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight relative z-10">Iron Sustainability</h3>
                        <p className="text-white/60 text-sm leading-relaxed relative z-10">Forge habits that outlast motivation. Consistency is your ultimate competitive edge.</p>
                    </motion.div>
                </div>

                {/* Row 2: Two equal columns with images/backgrounds */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative rounded-[var(--radius-lg)] overflow-hidden h-[360px] flex items-end p-6 md:p-8">
                        <div className="absolute inset-0 bg-canvas transition-colors duration-500 group-hover:bg-canvas"></div>
                        <div className="absolute inset-x-6 md:inset-x-8 top-8 bottom-32 bg-white rounded-[var(--radius-lg)] border border-black/[0.05]  flex items-center justify-center overflow-hidden">
                            <img src="/signet-nature.png" alt="Focus Area" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 mix-blend-multiply" />
                        </div>
                        <div className="relative z-10 w-full pt-4 border-t border-black/[0.05] mt-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-ink mb-1">Curated Mastermind</h3>
                                    <p className="text-ink/50 text-sm">Connect with driven individuals.</p>
                                </div>
                                <div className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors duration-300">
                                    <Users2 className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative rounded-[var(--radius-lg)] overflow-hidden h-[360px] flex items-end p-6 md:p-8 bg-seal">
                        <div className="absolute inset-0 bg-gradient-to-br from-seal to-seal"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                            <Globe className="w-64 h-64 -mx-16 -my-16 text-white group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="relative z-10 w-full mt-auto">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-white/20">
                                <BookOpen className="h-3 w-3" /> Wisdom Archive
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">Global Knowledge.</h3>
                            <p className="text-white/80 text-sm leading-relaxed max-w-sm">Timeless mental models, proven frameworks, and hard-earned experiences — accessible on demand.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    {...riseAt(4)}
                            className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[var(--radius-lg)] border border-black/[0.05] bg-white px-8 py-6 "
                >
                    <div className="text-center sm:text-left">
                        <p className="text-[10px] text-seal uppercase tracking-widest font-semibold mb-1">Ready to execute?</p>
                        <p className="text-lg font-semibold text-ink tracking-tight">Join the network. Grow without limits.</p>
                    </div>
                    <a
                        href="/join"
                        className="flex-shrink-0 flex items-center justify-center gap-2 bg-ink text-canvas px-8 py-4 rounded-xl text-sm font-semibold hover:bg-seal hover:text-white transition-colors duration-300 w-full sm:w-auto"
                    >
                        Join Network <ArrowUpRight className="h-4 w-4" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default FeaturesGrid;
