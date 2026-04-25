"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Star, Activity, Crown, TrendingUp, Sparkles, Crosshair, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/MagneticButton";

const ModernHero = () => {
    return (
        <section className="relative min-h-screen flex flex-col pt-24 md:pt-32 pb-12 overflow-hidden bg-[#194342] text-white">
            
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1DA756]/10 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -z-0 -translate-x-1/2 translate-y-1/2" />

            {/* Container */}
            <div className="mx-auto flex-1 flex flex-col xl:flex-row items-center justify-center gap-16 max-w-7xl px-6 lg:px-12 w-full mt-10 relative z-10">
                {/* Left Content */}
                <div className="flex-1 flex flex-col items-start w-full">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#DAE8B3] font-bold text-xs tracking-widest uppercase mb-6"
                    >
                        Try it now!
                    </motion.span>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight"
                    >
                        Change the way<br />
                        you approach<br />
                        <span className="font-serif italic font-medium tracking-tight text-[#DAE8B3]">your growth</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-white/60 text-base md:text-lg max-w-lg mb-12 leading-relaxed"
                    >
                        From your everyday habits, to planning for your future with essential resources and community, 
                        Signet helps you get more out of your life trajectory.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                    >
                        <Link href="/join">
                            <button className="bg-[#DAE8B3] text-[#194342] px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-black/20 hover:bg-white transition-colors">
                                Get Started Now
                            </button>
                        </Link>
                        
                        <div className="flex flex-col gap-1">
                            <div className="flex text-[#DAE8B3]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-current" />
                                ))}
                                <span className="text-white font-bold text-sm ml-2">5.0</span>
                            </div>
                            <span className="text-white/40 text-xs font-medium">from 120+ <a href="#" className="underline">reviews</a></span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - 2x2 Grid */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 w-full max-w-lg xl:max-w-none grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {/* Top Left: Image */}
                    <div className="rounded-[32px] overflow-hidden aspect-square bg-white/5 relative flex items-center justify-center p-6 border border-white/10">
                        <img 
                            src="/hero-primary.png" 
                            alt="Growth app" 
                            className="w-full h-auto object-cover rounded-2xl shadow-2xl max-w-[85%] rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
                        />
                    </div>

                    {/* Top Right: Stats */}
                    <div className="rounded-[32px] bg-white/5 aspect-square p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-white/10">
                        {/* Decorative Arch */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[#DAE8B3]/5 rounded-bl-[100px] rounded-tr-[32px] -z-0 scale-[1.15] origin-top-right"></div>
                        <div className="flex justify-end z-10 relative">
                             <div className="text-4xl md:text-5xl font-medium text-white shrink-0">56+</div>
                        </div>
                        <div>
                            <span className="text-white/40 block mb-6">Resources</span>
                            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                                <Globe className="w-6 h-6 text-[#DAE8B3] stroke-[1.5]" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Left: Activity */}
                    <div className="rounded-[32px] bg-white/5 p-6 md:p-8 flex flex-col justify-between border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#DAE8B3]/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-5 h-5 text-[#DAE8B3]" />
                            </div>
                            <span className="text-white/60 font-medium">Monthly Active</span>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">1,240+</div>
                            <div className="flex items-center gap-1 text-xs text-[#DAE8B3] font-bold">
                                <TrendingUp className="w-3 h-3" /> +12.5% this month
                            </div>
                        </div>
                    </div>

                    {/* Bottom Right: CTA/Join */}
                    <Link href="/join" className="group rounded-[32px] bg-[#DAE8B3] p-6 md:p-8 flex flex-col justify-between hover:bg-white transition-all duration-500 shadow-2xl shadow-black/20">
                        <div className="flex justify-between items-start">
                             <div className="w-12 h-12 bg-[#194342]/10 rounded-full flex items-center justify-center">
                                <Activity className="w-6 h-6 text-[#194342]" />
                             </div>
                             <ArrowUpRight className="w-6 h-6 text-[#194342] group-hover:rotate-45 transition-transform" />
                        </div>
                        <div>
                            <span className="text-[#194342]/60 block mb-2 font-bold uppercase tracking-widest text-[10px]">Community</span>
                            <div className="text-2xl font-bold text-[#194342]">Join the network of silent achievers</div>
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Logo Cloud - Brand Values */}
            <div className="w-full border-t border-white/5 mt-16 py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#DAE8B3]" strokeWidth={2.5} />
                        Sustainability
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        <Crown className="w-5 h-5 text-[#DAE8B3]" strokeWidth={2.5} />
                        Mastery
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#DAE8B3]" strokeWidth={2.5} />
                        Growth
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#DAE8B3]" strokeWidth={2.5} />
                        Excellence
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2 hidden lg:flex">
                        <Crosshair className="w-5 h-5 text-[#DAE8B3]" strokeWidth={2.5} />
                        Focus
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2 hidden lg:flex">
                        <ShieldCheck className="w-5 h-5 text-[#DAE8B3]" strokeWidth={2.5} />
                        Resilience
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernHero;
