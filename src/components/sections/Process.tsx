"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
    {
        num: "01",
        title: "Baseline Assessment",
        tag: "Inquiry",
        description: "We begin by analyzing your current baseline—removing noise and establishing clear, actionable goals."
    },
    {
        num: "02",
        title: "Systems Integration",
        tag: "Architecture",
        description: "Focus on establishing sustainable routines. No shortcuts, just steady integration of proven habits."
    },
    {
        num: "03",
        title: "Rhythmic Execution",
        tag: "Expansion",
        description: "Iterate with the community. Weekly check-ins ensure you stay on course while adapting to challenges."
    }
];

const ProcessStep = ({ step, i }: any) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className="group relative flex flex-col pt-16 pb-16 md:pb-32"
        >
            <div className="flex items-start gap-8">
                <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-2xl bg-white border border-black/[0.04] flex items-center justify-center text-xl font-medium text-solar-gold shadow-sm shadow-black/5 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        {step.num}
                    </div>
                    {i < steps.length - 1 && (
                        <div className="w-px h-full bg-black/[0.04] mt-4" />
                    )}
                </div>
                
                <div className="flex-1 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-terra-soil/40 mb-2 block">{step.tag}</span>
                    <h3 className="mb-6 text-3xl font-medium tracking-tight text-foreground transition-all duration-500 group-hover:text-solar-gold">
                        {step.title}
                    </h3>
                    <p className="text-foreground/50 leading-relaxed font-normal text-lg max-w-sm">
                        {step.description}
                    </p>
                </div>
            </div>

            {/* Giant Background Number */}
            <motion.div 
                style={{ y }} 
                className="absolute top-0 right-0 text-[12rem] lg:text-[16rem] font-medium tracking-tighter text-foreground/[0.02] transition-colors duration-700 pointer-events-none -z-10 group-hover:text-solar-gold/5"
            >
                {step.num}
            </motion.div>
        </motion.div>
    );
};

const Process = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        <section id="growth" className="relative py-40 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-20">
                    
                    {/* Left Sticky Header */}
                    <div className="lg:col-span-12 xl:col-span-5">
                        <div className="lg:sticky lg:top-40">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terra-soil/50 mb-4 italic">The Architecture of Progress</p>
                                <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground mb-8 leading-[1.1]">
                                    A calculated <br />pathway to <br /><span className="text-solar-gold italic font-light">supremacy.</span>
                                </h2>
                                <p className="text-xl text-foreground/40 font-medium leading-relaxed max-w-sm mb-12">
                                    Sustainable growth is not accidental. It is engineered through precise, rhythmic escalation.
                                </p>
                                
                                <div className="flex items-center gap-4 text-foreground/40 font-bold text-xs uppercase tracking-widest">
                                    <div className="h-10 w-10 rounded-full border border-black/[0.06] flex items-center justify-center animate-bounce">
                                        <ArrowDown className="h-4 w-4" />
                                    </div>
                                    Scroll to deconstruct
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Scrollable Steps */}
                    <div ref={containerRef} className="lg:col-span-12 xl:col-span-7 relative">
                        {/* Dynamic Progress Line */}
                        <div className="absolute left-[27px] top-40 w-px h-[calc(100%-320px)] bg-black/[0.04] hidden md:block" />
                        <motion.div 
                            style={{ height: lineHeight }}
                            className="absolute left-[27px] top-40 w-px bg-solar-gold hidden md:block origin-top z-10" 
                        />

                        <div className="space-y-0 md:pl-0">
                            {steps.map((step, i) => (
                                <ProcessStep key={step.num} step={step} i={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Abstract Background Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-full bg-solar-gold/[0.01] border-l border-black/[0.04] -z-10" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-signet-light/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        </section>
    );
};

export default Process;

