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
        <section className="relative pt-40 pb-20 lg:pt-60 lg:pb-32 overflow-hidden">
            {/* Interactive Parallax Orbs */}
            <motion.div 
                style={{ x: xOrb1, y: yOrb1 }}
                className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-signet-green/10 blur-[120px] rounded-full pointer-events-none -z-10" 
            />
            <motion.div 
                style={{ x: xOrb2, y: yOrb2 }}
                className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-signet-light/20 blur-[150px] rounded-full pointer-events-none -z-10" 
            />

            {/* Giant Logo Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] lg:w-[100%] opacity-[0.07] text-foreground pointer-events-none -z-10">
                <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
                    <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
                    <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
                    <path d="M6,42 L21,28 L35.5,42 L50,27 L64.5,42 L79,28 L94,42" />
                </svg>
            </div>

            <motion.div style={{ y: yHero }} className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                <motion.div
                    className="flex flex-col items-center text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 flex items-center gap-3 rounded-full border border-black/[0.05] bg-white/50 px-4 py-2 soft-blur"
                    >
                        <div className="h-2 w-2 rounded-full bg-signet-green animate-pulse" />
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/60">A New Standard for Growth</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="max-w-4xl text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
                    >
                        Grow silently,<br />
                        <span className="bg-gradient-to-r from-signet-green to-foreground/60 bg-clip-text text-transparent italic font-light">thrive sustainably.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mt-8 max-w-2xl text-lg font-normal leading-relaxed text-foreground/50 md:text-xl md:leading-relaxed"
                    >
                        A meticulously crafted sanctuary for high-performers and deep-thinkers.
                        Master your discipline in an evergreen environment.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row w-full"
                    >
                        <MagneticButton className="group relative flex h-14 items-center justify-center gap-3 rounded-full bg-foreground px-10 text-sm font-semibold text-background transition-colors hover:bg-signet-green hover:shadow-[0_8px_30px_rgb(45,106,79,0.3)]">
                            Start Your Journey
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </MagneticButton>
                        
                        <div className="group relative">
                            <button className="flex h-14 items-center text-sm font-medium tracking-wide text-foreground/60 transition-colors duration-300 hover:text-foreground">
                                View Growth Paths
                            </button>
                            <span className="absolute bottom-3 left-0 h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-28 grid w-full max-w-4xl grid-cols-2 gap-12 border-t border-black/[0.05] pt-16 md:grid-cols-4"
                    >
                        {[
                            { label: "Members", value: "10k+" },
                            { label: "Elite Mentors", value: "50+" },
                            { label: "Success Rate", value: "94%" },
                            { label: "Global Hubs", value: "12" }
                        ].map((stat) => (
                            <div key={stat.label} className="group text-center md:text-left flex flex-col items-center md:items-start gap-2 cursor-default">
                                <motion.div 
                                    whileHover={{ scale: 1.1, color: "var(--color-signet-green)" }}
                                    className="text-4xl md:text-5xl font-light tracking-tight text-foreground/80 transition-colors"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-[12px] font-medium uppercase tracking-widest text-foreground/40">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
