"use client";

import { motion } from "framer-motion";

const VisionMission = () => {
    return (
        <section className="py-16 md:py-24 bg-[#FDFDFB] relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                    {/* ── Vision Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[2rem] w-full min-h-[500px] md:min-h-[600px] flex flex-col justify-between group shadow-xl"
                    >
                        {/* Background Image */}
                        <img
                            src="/vision-statement.webp"
                            alt="Our Vision"
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10" />

                        {/* Top Content */}
                        <div className="relative z-20 p-8 flex flex-col gap-4 items-start">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img 
                                    src="/signet-brand-logo.svg" 
                                    alt="Signet Logo" 
                                    className="h-full w-auto object-contain drop-shadow-xl"
                                />
                            </div>
                            <span className="inline-block bg-white text-black px-4 py-1.5 rounded-lg text-sm font-bold tracking-wide shadow-sm">
                                Vision
                            </span>
                        </div>

                        {/* Bottom Text Overlay */}
                        <div className="relative z-20 p-8 mt-auto">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                                A Global Network of Trailblazers
                            </h2>
                            <p className="text-base md:text-lg font-medium leading-relaxed text-white/80">
                                To build a global network of trailblazers who model and replicate excellence in diverse spheres.
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Mission Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative overflow-hidden rounded-[2rem] w-full min-h-[500px] md:min-h-[600px] flex flex-col justify-between group shadow-xl"
                    >
                        {/* Background Image */}
                        <img
                            src="/mission-leap.png"
                            alt="Our Mission"
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-10" />

                        {/* Top Badge */}
                        <div className="relative z-20 p-8">
                            <span className="inline-block bg-white text-black px-4 py-1.5 rounded-lg text-sm font-bold tracking-wide shadow-sm">
                                Mission
                            </span>
                        </div>

                        {/* Bottom Text Overlay */}
                        <div className="relative z-20 p-8 mt-auto">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                                Raising Men With Purpose
                            </h2>
                            <p className="text-base md:text-lg font-medium leading-relaxed text-white/80">
                                Raising men that walk with a sense of purpose and a vision at heart, thoroughly equipped to withstand all life can throw at them.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VisionMission;

