"use client";

import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";

const VisionMission = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                {/* Removed Operational Compass header per user instructions */}

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Vision Bento Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-[#0c120c] flex flex-col group shadow-2xl"
                    >
                        {/* Illustration Container */}
                        <div className="h-64 w-full bg-black relative overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                                alt="Realistic plant growing representing ecosystem growth" 
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c120c] to-transparent"></div>
                            {/* Watermark Logo Dots Integration */}
                            <svg viewBox="0 0 100 50" className="absolute top-6 left-6 h-8 w-auto text-white/50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
                                <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
                                <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
                                <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
                            </svg>
                        </div>
                        
                        {/* Text Container */}
                        <div className="p-10 flex flex-col grow justify-between bg-[#0c120c] relative z-10 -mt-10">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-white mb-4 font-heading uppercase">The Vision</h2>
                                <p className="text-lg font-medium leading-relaxed text-white/70">
                                    To architect an uncompromising ecosystem of elite performers operating with absolute synchronization and boundless emotional intelligence.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                               <span className="text-[10px] font-bold uppercase tracking-widest text-[#16a34a]">High-Signal Collective</span>
                               <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mission Bento Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white flex flex-col group shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
                    >
                        {/* Illustration Container */}
                        <div className="h-64 w-full bg-[#f4f6f0] relative overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1552674605-15cdd193e62f?auto=format&fit=crop&q=80&w=1200" 
                                alt="Athlete running dynamically representing execution and mission" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 block"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                             {/* Watermark Logo Dots Integration */}
                            <svg viewBox="0 0 100 50" className="absolute top-6 left-6 h-8 w-auto text-black/50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
                                <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
                                <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
                                <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
                            </svg>
                        </div>

                        {/* Text Container */}
                        <div className="p-10 flex flex-col grow justify-between bg-white relative z-10 -mt-10">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 font-heading uppercase">The Mission</h2>
                                <p className="text-lg font-medium leading-relaxed text-foreground/70">
                                    Creating and deploying highly integrated, actionable growth protocols that elevate ordinary potential into unparalleled mastery.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                               <span className="text-[10px] font-bold uppercase tracking-widest text-[#16a34a]">Sustained Execution</span>
                               <span className="text-foreground/40 group-hover:text-foreground transition-colors">↗</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
