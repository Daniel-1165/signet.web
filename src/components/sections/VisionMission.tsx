"use client";

import { motion } from "framer-motion";

const VisionMission = () => {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 md:px-12 relative z-10">
                {/* Always 2-column — even on mobile */}
                <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-5xl mx-auto">

                    {/* ── Vision Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#0c120c] flex flex-col group shadow-xl"
                    >
                        {/* Image */}
                        <div className="h-28 md:h-64 w-full relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
                                alt="Mountain vision"
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c120c] to-transparent" />
                            {/* Mini logo watermark */}
                            <svg viewBox="0 0 100 80" className="absolute top-3 left-3 h-5 md:h-8 w-auto text-white/40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="25" cy="20" r="12" />
                                <circle cx="50" cy="12" r="14" />
                                <circle cx="75" cy="20" r="12" />
                                <path d="M10,65 L30,40 L50,65 L70,40 L90,65" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="p-4 md:p-10 flex flex-col grow justify-between bg-[#0c120c] relative z-10 -mt-6">
                            <div>
                                <h2 className="text-sm md:text-3xl font-black tracking-tight text-white mb-1 md:mb-4 uppercase font-heading leading-tight">
                                    Our Vision
                                </h2>
                                <p className="text-[10px] md:text-lg font-medium leading-snug md:leading-relaxed text-white/60 line-clamp-3 md:line-clamp-none">
                                    To build a global network of trailblazers who model and replicate excellence in diverse spheres.
                                </p>
                            </div>
                            <div className="mt-3 md:mt-8 pt-3 md:pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#1DA756]">Global Collective</span>
                                <span className="text-white/40 group-hover:text-white transition-colors text-xs md:text-base">↗</span>
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
                        <div className="h-28 md:h-64 w-full bg-[#f4f6f0] relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
                                alt="Forest mission"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                            <svg viewBox="0 0 100 80" className="absolute top-3 left-3 h-5 md:h-8 w-auto text-black/40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="25" cy="20" r="12" />
                                <circle cx="50" cy="12" r="14" />
                                <circle cx="75" cy="20" r="12" />
                                <path d="M10,65 L30,40 L50,65 L70,40 L90,65" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="p-4 md:p-10 flex flex-col grow justify-between bg-white relative z-10 -mt-6">
                            <div>
                                <h2 className="text-sm md:text-3xl font-black tracking-tight text-[#0D120E] mb-1 md:mb-4 uppercase font-heading leading-tight">
                                    Our Mission
                                </h2>
                                <p className="text-[10px] md:text-lg font-medium leading-snug md:leading-relaxed text-[#0D120E]/60 line-clamp-3 md:line-clamp-none">
                                    Ordinary persons achieving extraordinary results, silently and sustainably.
                                </p>
                            </div>
                            <div className="mt-3 md:mt-8 pt-3 md:pt-6 border-t border-black/5 flex items-center justify-between">
                                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#1DA756]">Sustainable Results</span>
                                <span className="text-[#0D120E]/40 group-hover:text-[#0D120E] transition-colors text-xs md:text-base">↗</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VisionMission;
