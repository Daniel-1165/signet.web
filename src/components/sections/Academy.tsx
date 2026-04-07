"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Layers, Target, ShieldCheck, Zap, ArrowRight, Star } from "lucide-react";

const courses = [
    {
        title: "Iron Discipline Architecture",
        category: "Module 01",
        description: "A foundational breakdown of environmental design and habit stacking. We replace motivation with systems that function automatically.",
        icon: <ShieldCheck className="h-5 w-5" />,
        duration: "4 Weeks",
        stats: "Level: Foundation",
        accent: "bg-signet-green/10 text-signet-green"
    },
    {
        title: "Deep Focus Protocols",
        category: "Module 02",
        description: "The mechanics of non-linear performance. Learn to access and sustain high-output flow states in an age of constant noise.",
        icon: <Target className="h-5 w-5" />,
        duration: "6 Weeks",
        stats: "Level: Advanced",
        accent: "bg-[#6B4E31]/10 text-[#6B4E31]"
    },
    {
        title: "Mental Model Synthesis",
        category: "Module 03",
        description: "Building an internal library of decision frameworks. Learn to deconstruct complex problems and identify the singular lever that matters.",
        icon: <Layers className="h-5 w-5" />,
        duration: "持续 Weeks",
        stats: "Level: Mastery",
        accent: "bg-blue-500/10 text-blue-600"
    },
    {
        title: "Adaptive Leadership",
        category: "Module 04",
        description: "Sustaining growth while managing teams or systems. Practical application of discipline within high-pressure environments.",
        icon: <Zap className="h-5 w-5" />,
        duration: "8 Weeks",
        stats: "Level: Expert",
        accent: "bg-purple-500/10 text-purple-600"
    }
];

const Academy = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <section id="academy" className="py-32 overflow-hidden relative bg-[#F7F8F5]/30">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-signet-green/[0.03] rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/4" />
            
            <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-[40%] flex flex-col justify-center"
                >
                    <div className="sticky top-40">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-signet-green/10 text-signet-green text-[10px] font-bold uppercase tracking-widest mb-6">
                            <GraduationCap className="h-3 w-3" /> Signet Academy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-8 leading-[1.1]">
                            The Growth <br /><span className="italic font-light text-foreground/40">Curriculum.</span>
                        </h2>
                        <p className="text-xl font-normal text-foreground/50 leading-relaxed mb-12 max-w-md">
                            Education at Signet is not passive consumption. It's a structured escalation of your internal capabilities.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                "Cohort-based learning",
                                "Direct mentor feedback",
                                "Quantifiable progress metrics",
                                "Post-completion certification"
                            ].map((item, id) => (
                                <div key={id} className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                                    <div className="h-1.5 w-1.5 rounded-full bg-signet-green" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <button className="mt-12 group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-signet-green hover:text-foreground transition-colors duration-300">
                            Apply for next Cohort <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-[60%] flex flex-col gap-6"
                >
                    {courses.map((course, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <div 
                                key={i} 
                                onClick={() => setActiveIndex(i)}
                                className={`group cursor-pointer rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${
                                    isActive 
                                    ? "bg-white border-black/[0.08] shadow-[0_30px_60px_rgb(0,0,0,0.04)] ring-1 ring-black/[0.01]"
                                    : "bg-transparent border-transparent hover:bg-white/50"
                                }`}
                            >
                                <div className="p-8 md:p-10 flex items-center gap-6">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${isActive ? course.accent : 'bg-black/[0.04] text-foreground/30'}`}>
                                        {course.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${isActive ? course.accent.split(' ')[1] : 'text-foreground/30'}`}>
                                                {course.category}
                                            </span>
                                            {isActive && (
                                                <div className="flex items-center gap-1 text-[9px] font-bold text-signet-green uppercase tracking-tighter">
                                                    <Star className="h-2 w-2 fill-current" /> Active Enrollment
                                                </div>
                                            )}
                                        </div>
                                        <h3 className={`text-2xl font-medium transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/60"}`}>
                                            {course.title}
                                        </h3>
                                    </div>
                                    <div className={`hidden md:block text-right transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-0.5">Duration</div>
                                        <div className="text-sm font-semibold text-foreground">{course.duration}</div>
                                    </div>
                                </div>
                                
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-10 pb-10 flex flex-col md:flex-row gap-10 items-start">
                                                <div className="flex-1">
                                                    <p className="text-lg text-foreground/50 leading-relaxed font-normal mb-8">
                                                        {course.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-4">
                                                        <div className="px-4 py-2 rounded-xl bg-black/5 text-[11px] font-bold uppercase tracking-widest text-foreground/60">
                                                            {course.stats}
                                                        </div>
                                                        <div className="px-4 py-2 rounded-xl bg-black/5 text-[11px] font-bold uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                                                            <BookOpen className="h-3 w-3" /> Digital Copy Incl.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-32 flex flex-col gap-2">
                                                    <button className="w-full py-3 rounded-2xl bg-foreground text-white text-[11px] font-bold uppercase tracking-widest hover:bg-signet-green transition-colors">
                                                        Explore
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {!isActive && (
                                    <div className="mx-10 border-b border-black/[0.04] group-last:border-none" />
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Academy;

