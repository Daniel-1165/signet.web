"use client";

import { motion } from "framer-motion";
import { Telescope, Target as TargetIcon } from "lucide-react";

const VisionMission = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">

                    {/* ── Vision Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-48 h-48 rounded-full bg-[#1DA756] flex items-center justify-center mb-8 shadow-xl shadow-[#1DA756]/20">
                            <Telescope className="w-24 h-24 text-white" />
                        </div>
                        
                        <h2 className="text-xl font-black uppercase tracking-widest text-[#0D120E] mb-4">
                            OUR VISION:
                        </h2>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-[#0D120E]/70 max-w-sm">
                            To build a global network of trailblazers who model and replicate excellence in diverse spheres.
                        </p>
                    </motion.div>

                    {/* ── Mission Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-48 h-48 rounded-full bg-[#1DA756] flex items-center justify-center mb-8 shadow-xl shadow-[#1DA756]/20">
                            <TargetIcon className="w-24 h-24 text-white" />
                        </div>
                        
                        <h2 className="text-xl font-black uppercase tracking-widest text-[#0D120E] mb-4">
                            OUR MISSION:
                        </h2>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-[#0D120E]/70 max-w-sm">
                            Ordinary persons achieving extraordinary results, silently and sustainably.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VisionMission;


