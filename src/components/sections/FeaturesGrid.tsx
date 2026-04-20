"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, ShieldCheck, Users2, BookOpen, Globe, ArrowUpRight, Sparkles } from "lucide-react";

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
                    className="mb-12 flex flex-col items-center text-center px-4"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">The Blueprint</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight mb-4">
                        A framework built for those who grow in silence.
                    </h2>
                    <p className="text-foreground/60 text-sm md:text-base max-w-xl leading-relaxed">
                        Sustainable growth requires unbroken focus. Discover the elements that make Signet the premier network for high-achievers.
                    </p>
                </motion.div>

                {/* Row 1: Three equal columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group rounded-3xl border border-black/[0.05] bg-white p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.03] text-foreground mb-6 transition-transform group-hover:scale-110">
                            <Target className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Deep Focus</h3>
                        <p className="text-foreground/60 text-sm leading-relaxed">Cultivate unbroken attention in an evergreen environment designed strictly for high-yield execution.</p>
                    </motion.div>

                    <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group rounded-3xl border border-black/[0.05] bg-white p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1DA756]/10 text-[#1DA756] mb-6 transition-transform group-hover:scale-110">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Sustained Growth</h3>
                        <p className="text-foreground/60 text-sm leading-relaxed">Compound interest in your skills, mindset, and execution every single day without burnout.</p>
                    </motion.div>

                    <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group rounded-3xl bg-[#0D120E] p-8 shadow-xl shadow-black/10 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DA756]/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white mb-6 border border-white/5 transition-transform group-hover:scale-110 relative z-10">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">Iron Sustainability</h3>
                        <p className="text-white/60 text-sm leading-relaxed relative z-10">Forge habits that outlast motivation. Consistency is your ultimate competitive edge.</p>
                    </motion.div>
                </div>

                {/* Row 2: Two equal columns with images/backgrounds */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative rounded-3xl overflow-hidden h-[360px] flex items-end p-8">
                        <div className="absolute inset-0 bg-[#F7F6F0] transition-colors duration-500 group-hover:bg-[#EBEBE6]"></div>
                        <div className="absolute inset-x-8 top-8 bottom-32 bg-white rounded-2xl border border-black/[0.05] shadow-sm flex items-center justify-center overflow-hidden">
                            <img src="/signet-nature.png" alt="Focus Area" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 mix-blend-multiply" />
                        </div>
                        <div className="relative z-10 w-full pt-4 border-t border-black/[0.05] mt-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Curated Mastermind</h3>
                                    <p className="text-foreground/50 text-sm">Connect with driven individuals.</p>
                                </div>
                                <div className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-white transition-colors duration-300">
                                    <Users2 className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative rounded-3xl overflow-hidden h-[360px] flex items-end p-8 bg-[#1DA756]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1DA756] to-[#0f6c35]"></div>
                        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                            <Globe className="w-64 h-64 -mx-16 -my-16 text-white group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="relative z-10 w-full mt-auto">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-white/20">
                                <BookOpen className="h-3 w-3" /> Wisdom Archive
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Global Knowledge.</h3>
                            <p className="text-white/80 text-sm leading-relaxed max-w-sm">Timeless mental models, proven frameworks, and hard-earned experiences — accessible on demand.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-black/[0.05] bg-white px-8 py-6 shadow-sm"
                >
                    <div className="text-center sm:text-left">
                        <p className="text-[10px] text-accent uppercase tracking-widest font-bold mb-1">Ready to execute?</p>
                        <p className="text-lg font-bold text-foreground tracking-tight">Join the network. Grow without limits.</p>
                    </div>
                    <a
                        href="/join"
                        className="flex-shrink-0 flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-colors duration-300 w-full sm:w-auto"
                    >
                        Join Network <ArrowUpRight className="h-4 w-4" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default FeaturesGrid;
