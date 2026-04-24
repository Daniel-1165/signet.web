"use client";

import { motion } from "framer-motion";

const VisionMission = () => {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 md:px-12 relative z-10">
                {/* Stacked layout — not side-by-side */}
                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">

                    {/* ── Vision Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#0c120c] flex flex-col group shadow-xl"
                    >
                        {/* Image */}
                        <div className="h-56 md:h-96 w-full relative overflow-hidden">
                            <img
                                src="/vision.png"
                                alt="Our Vision"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c120c] to-transparent" />
                            {/* Mini logo watermark */}
                            <img 
                                src="/logo.svg.svg" 
                                alt="Signet Logo" 
                                className="absolute top-3 left-3 h-5 md:h-8 w-auto object-contain opacity-40 grayscale brightness-0 invert"
                            />
                            {/* Text Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-sm md:text-lg font-bold italic leading-relaxed max-w-lg mx-auto text-center">
                                    "To build a global network of trailblazers who model and replicate excellence in diverse spheres."
                                </p>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="p-6 md:p-12 flex flex-col grow justify-between bg-[#0c120c] relative z-10 -mt-6">
                            <div>
                                <h2 className="text-xl md:text-4xl font-black tracking-tight text-white mb-2 md:mb-6 uppercase font-heading leading-tight">
                                    Our Vision
                                </h2>
                                <p className="text-sm md:text-xl font-medium leading-relaxed text-white/60">
                                    To build a global network of trailblazers who model and replicate excellence in diverse spheres.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-10 pt-4 md:pt-8 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1DA756]">Global Collective</span>
                                <span className="text-white/40 group-hover:text-white transition-colors text-base md:text-xl">↗</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Mission Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-black/5 bg-white flex flex-col group shadow-lg hover:shadow-xl transition-all duration-500"
                    >
                        {/* Image */}
                        <div className="h-56 md:h-96 w-full bg-[#f4f6f0] relative overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/mission-leap.png"
                                    alt="Our Mission"
                                    className="w-full h-full object-contain bg-[#0D120E] group-hover:scale-105 transition-all duration-700"
                                />
                            </div>
                            {/* Text Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-sm md:text-lg font-bold italic leading-relaxed max-w-lg mx-auto text-center">
                                    "raising men that walks with a sense of purpose and a vision at heart, thoroughly equiped withstand all life can throw at them"
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                            <img 
                                src="/logo.svg.svg" 
                                alt="Signet Logo" 
                                className="absolute top-3 left-3 h-5 md:h-8 w-auto object-contain opacity-40 grayscale"
                            />
                        </div>

                        {/* Text */}
                        <div className="p-6 md:p-12 flex flex-col grow justify-between bg-white relative z-10 -mt-6">
                            <div>
                                <h2 className="text-xl md:text-4xl font-black tracking-tight text-[#0D120E] mb-2 md:mb-6 uppercase font-heading leading-tight">
                                    Our Mission
                                </h2>
                                <p className="text-sm md:text-xl font-medium leading-relaxed text-[#0D120E]/60">
                                    Ordinary persons achieving extraordinary results, silently and sustainably.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-10 pt-4 md:pt-8 border-t border-black/5 flex items-center justify-between">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1DA756]">Sustainable Results</span>
                                <span className="text-[#0D120E]/40 group-hover:text-[#0D120E] transition-colors text-base md:text-xl">↗</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VisionMission;
