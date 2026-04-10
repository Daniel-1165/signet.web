"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

const Hero = () => {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 400]);

    // Mouse movement for parallax subtle orbs
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const xOrb1 = useTransform(smoothMouseX, [0, 2000], [50, -50]);
    const yOrb1 = useTransform(smoothMouseY, [0, 1000], [50, -50]);
    
    const xOrb2 = useTransform(smoothMouseX, [0, 2000], [-30, 30]);
    const yOrb2 = useTransform(smoothMouseY, [0, 1000], [-30, 30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-background">
            {/* Subtle Grid / Dotted Background */}
            <div className="absolute inset-0 max-w-7xl mx-auto -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Signet Logo Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-[0.03] pointer-events-none -z-10">
                <svg viewBox="0 0 100 50" className="w-full h-auto text-black" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
                    <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
                    <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
                    <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
                </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background -z-10"></div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
                
                {/* Central Logo Box / Watermark */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-20 h-20 mb-8 flex items-center justify-center"
                >
                    <svg viewBox="0 0 100 50" className="w-full h-auto text-[#16a34a]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="18" r="8" />
                        <circle cx="50" cy="12" r="10" />
                        <circle cx="79" cy="18" r="8" />
                        <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>

                {/* Vast Centered Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-4xl text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-foreground"
                >
                    Growth, maturity, and discipline <span className="text-foreground/40 font-normal">all in one protocol</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-8 max-w-2xl text-lg font-medium text-foreground/60"
                >
                    Efficiently manage your personal development, forge lasting habits, and meticulously track your journey to mastery.
                </motion.p>

                {/* Call To Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4 relative z-20"
                >
                    <MagneticButton>
                        <button className="h-14 px-8 rounded-full bg-[#16a34a] text-white font-bold tracking-wide flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(22,163,74,0.3)] border border-[#16a34a]/20">
                            Join Us <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </MagneticButton>
                    <MagneticButton>
                        <button className="h-14 px-8 rounded-full bg-white text-foreground font-bold tracking-wide flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-black/10 hover:bg-black/5 hover:border-black/20">
                            Explore Network
                        </button>
                    </MagneticButton>
                </motion.div>



                {/* Floating Cards (Absolute Positioned) */}
                
                {/* Top Left: Sticky Note / Protocol */}
                <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: -15 }}
                    animate={{ opacity: 1, x: 0, rotate: -6 }}
                    transition={{ duration: 1, delay: 0.8, type: "spring" }}
                    className="hidden lg:flex absolute top-[10%] left-0 xl:-left-12 flex-col w-56 bg-[#FFF9C4] rounded-tr-3xl rounded-b-xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] -z-5"
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-inner"></div>
                    <p className="mt-4 font-[Gloria_Hallelujah,sans-serif] text-sm leading-relaxed text-black/80 font-medium transform rotate-1">
                        Solidify morning protocol, review daily metrics before deep work sessions. 🚀
                    </p>
                    <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-white rounded-2xl shadow-xl border border-black/5 flex items-center justify-center transform rotate-12">
                        <svg className="w-6 h-6 text-[#0055FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </motion.div>

                {/* Top Right: Reminder / Clock */}
                <motion.div 
                    initial={{ opacity: 0, x: 50, rotate: 15 }}
                    animate={{ opacity: 1, x: 0, rotate: 4 }}
                    transition={{ duration: 1, delay: 0.9, type: "spring" }}
                    className="hidden lg:flex absolute top-[15%] right-0 xl:-right-12 flex-col w-64 bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.04] -z-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-sm">Deep Work</span>
                        <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Session</span>
                    </div>
                    <div className="bg-[#F9FBF4] rounded-2xl p-4 border border-black/5 flex flex-col items-center">
                        <div className="text-3xl font-extrabold tracking-tighter mb-1 font-mono">02:45:00</div>
                        <div className="text-xs font-semibold text-accent">Focused</div>
                    </div>
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-2xl border border-black/5 flex items-center justify-center transform -rotate-12">
                        <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </motion.div>

                {/* Bottom Left: Progress Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 1, delay: 1, type: "spring" }}
                    className="hidden lg:flex absolute bottom-[5%] left-10 xl:left-0 flex-col w-72 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.04] -z-5"
                >
                    <h4 className="font-extrabold text-sm mb-4">Milestones</h4>
                    
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-2">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div> Physical Protocol</span>
                                <span className="text-foreground/50">80%</span>
                            </div>
                            <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                                <div className="h-full bg-accent w-[80%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-2">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#0055FF]"></div> Identity Assessment</span>
                                <span className="text-foreground/50">45%</span>
                            </div>
                            <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0055FF] w-[45%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Right: Integrations / Ecosystem */}
                <motion.div 
                    initial={{ opacity: 0, y: 50, rotate: 5 }}
                    animate={{ opacity: 1, y: 0, rotate: 2 }}
                    transition={{ duration: 1, delay: 1.1, type: "spring" }}
                    className="hidden lg:flex absolute bottom-[10%] right-10 xl:right-0 flex-col w-64 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.04] -z-5 justify-center items-center h-48"
                >
                    <span className="font-bold text-sm mb-6 w-full text-left">Ecosystem Growth</span>
                    <div className="flex justify-center -space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-lg flex items-center justify-center z-30 transform hover:-translate-y-2 transition-transform">
                             <div className="w-8 h-8 rounded-full bg-black"></div>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-lg flex items-center justify-center z-20 transform hover:-translate-y-2 transition-transform">
                             <div className="w-8 h-8 rounded-full bg-accent"></div>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-lg flex items-center justify-center z-10 transform hover:-translate-y-2 transition-transform">
                             <div className="w-8 h-8 rounded-full bg-[#0055FF]"></div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
