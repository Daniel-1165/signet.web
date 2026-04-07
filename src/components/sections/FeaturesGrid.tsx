"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, ShieldCheck, Users2, BookOpen, Globe, ArrowUpRight } from "lucide-react";

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
        <section id="features" className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                {/* Section Header */}
                <motion.div
                    className="mb-14"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-signet-green mb-3">The Blueprint</p>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground max-w-xl leading-tight">
                        A framework built for those who grow in silence.
                    </h2>
                </motion.div>

                {/* Row 1: Large image left + 2 stacked cards right */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Large image block */}
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="md:col-span-2 relative rounded-2xl overflow-hidden h-[380px] md:h-[460px] group"
                    >
                        <img
                            src="/signet-nature.png"
                            alt="Deep Focus"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <div className="inline-flex items-center gap-2 bg-signet-green/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                                <Target className="h-3 w-3" /> Deep Focus
                            </div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-white leading-snug max-w-sm">
                                Cultivate unbroken attention in an evergreen environment.
                            </h3>
                        </div>
                    </motion.div>

                    {/* Right stacked cards */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group flex-1 rounded-2xl border border-black/[0.06] bg-[#F7F8F5] p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-black/5 transition-all duration-500"
                        >
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-signet-green shadow-sm mb-4">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground mb-1">Sustained Growth</h3>
                                <p className="text-foreground/55 text-sm leading-relaxed">Compound interest in your skills, mindset, and execution every single day.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group flex-1 rounded-2xl bg-foreground p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-black/10 transition-all duration-500"
                        >
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white mb-4">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white mb-1">Iron Discipline</h3>
                                <p className="text-white/50 text-sm leading-relaxed">Forge habits that outlast motivation. Consistency is your competitive edge.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Row 2: 2 text cards left + large image right */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Left stacked cards */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group flex-1 rounded-2xl bg-signet-green p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-signet-green/20 transition-all duration-500"
                        >
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white mb-4">
                                <Users2 className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white mb-1">Curated Mastermind</h3>
                                <p className="text-white/70 text-sm leading-relaxed">Exclusively connect with high-performers who share your relentless drive.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            custom={4}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group flex-1 rounded-2xl border border-black/[0.06] bg-[#F7F8F5] p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-black/5 transition-all duration-500"
                        >
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-signet-green shadow-sm mb-4">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground mb-1">Wisdom Archive</h3>
                                <p className="text-foreground/55 text-sm leading-relaxed">Timeless mental models, proven frameworks, and hard-earned experiences — always accessible.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Large image block */}
                    <motion.div
                        custom={5}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="md:col-span-2 relative rounded-2xl overflow-hidden h-[380px] md:h-[460px] group"
                    >
                        <img
                            src="/community_roots.png"
                            alt="Global Network"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 flex items-end justify-between w-full">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-white/20">
                                    <Globe className="h-3 w-3" /> Global Network
                                </div>
                                <h3 className="text-2xl md:text-3xl font-semibold text-white leading-snug max-w-sm">
                                    Connect and accelerate with hyper-achievers worldwide.
                                </h3>
                            </div>
                            <button className="hidden md:flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-full bg-white text-foreground hover:bg-signet-green hover:text-white transition-colors duration-300 shadow-lg">
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-black/[0.06] bg-[#F7F8F5] px-8 py-6"
                >
                    <div>
                        <p className="text-sm text-foreground/50 uppercase tracking-widest font-semibold mb-1">Ready to begin?</p>
                        <p className="text-xl font-medium text-foreground tracking-tight">Join the network. Grow without limits.</p>
                    </div>
                    <a
                        href="/join"
                        className="flex-shrink-0 flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-signet-green transition-colors duration-300"
                    >
                        Join Network <ArrowUpRight className="h-4 w-4" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default FeaturesGrid;
