"use client";

import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";

const VisionMission = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                <motion.div
                    className="mb-14 text-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-terra-soil/40 mb-3 font-heading">Operational Compass</p>
                    <div className="w-12 h-[1px] bg-solar-gold/30 mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[3rem] bg-[#0c120c] p-12 flex flex-col gap-8 group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-solar-gold shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                           <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-4 font-heading uppercase">The Vision</h2>
                            <p className="text-xl font-normal leading-relaxed text-white/40 font-outfit">
                                To engineer a global collective of resilient trailblazers who model and scale excellence across the digital and physical frontiers.
                            </p>
                        </div>
                        <div className="mt-auto pt-8 border-t border-white/5">
                           <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">High-Signal Collective</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[3rem] border border-black/[0.06] bg-[#F7F8F5] p-12 flex flex-col gap-8 group hover:bg-white transition-colors duration-500"
                    >
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-terra-soil/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c120c] text-white shadow-xl shadow-black/10">
                           <Activity size={24} className="text-solar-gold" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 font-heading uppercase font-heading">The Mission</h2>
                            <p className="text-xl font-normal leading-relaxed text-foreground/50 font-outfit">
                                Orchestrating the ascent of dedicated contributors to achieve extraordinary, sustainable results through iron discipline and rhythmic focus.
                            </p>
                        </div>
                        <div className="mt-auto pt-8 border-t border-black/5">
                           <span className="text-[9px] font-bold uppercase tracking-widest text-terra-soil/40">Sustained Execution</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
