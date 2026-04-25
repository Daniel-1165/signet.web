"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Star, Activity, Crown, TrendingUp, Sparkles, Crosshair, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/MagneticButton";

const ModernHero = () => {
    return (
        <section className="relative min-h-screen flex flex-col pt-24 md:pt-32 pb-16 overflow-hidden bg-white">

            {/* Container */}
            <div className="mx-auto flex-1 flex flex-col xl:flex-row items-center justify-center gap-16 max-w-7xl px-6 lg:px-12 w-full mt-10">
                {/* Left Content */}
                <div className="flex-1 flex flex-col items-start w-full">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-6"
                    >
                        Try it now!
                    </motion.span>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0D120E] leading-[1.1] mb-6 md:mb-8 tracking-tight"
                    >
                        Change the way<br />
                        you approach<br />
                        <span className="font-serif italic font-medium tracking-tight text-[#113123]">your growth</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-gray-500 text-base md:text-lg max-w-lg mb-12 leading-relaxed"
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
                            <button className="bg-[#113123] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#113123]/20 hover:bg-[#1DA756] transition-colors">
                                Get Started Now
                            </button>
                        </Link>
                        
                        <div className="flex flex-col gap-1">
                            <div className="flex text-[#F5B50A]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-current" />
                                ))}
                                <span className="text-[#0D120E] font-bold text-sm ml-2">5.0</span>
                            </div>
                            <span className="text-gray-400 text-xs font-medium">from 120+ <a href="#" className="underline">reviews</a></span>
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
                    <div className="rounded-[32px] overflow-hidden aspect-square bg-[#F4F1ED] relative flex items-center justify-center p-6">
                        <img 
                            src="/hero-primary.png" 
                            alt="Growth app" 
                            className="w-full h-auto object-cover rounded-2xl shadow-xl max-w-[85%] rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
                        />
                    </div>

                    {/* Top Right: Stats */}
                    <div className="rounded-[32px] bg-[#F4F1ED] aspect-square p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative Arch */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[#EAE5DF] rounded-bl-[100px] rounded-tr-[32px] -z-0 scale-[1.15] origin-top-right"></div>
                        <div className="flex justify-end z-10 relative">
                             <div className="text-4xl md:text-5xl font-medium text-[#0D120E] shrink-0">56+</div>
                        </div>
                        <div>
                            <span className="text-gray-600 block mb-6">Resources</span>
                            <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                                <Globe className="w-6 h-6 text-gray-500 stroke-[1.5]" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Left: Users Active */}
                    <div className="rounded-[32px] bg-[#EAF2ED] aspect-square p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative Arch */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[#DCEEE3] rounded-tl-[32px] rounded-br-[100px] -z-0 scale-110 origin-top-left"></div>
                        <div className="flex gap-2 relative z-10 text-[#113123]">
                            ✦ ✦
                        </div>
                        <div className="relative z-10">
                            <span className="text-[#113123] block mb-4 font-medium text-base md:text-lg">Members Active</span>
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-[#EAF2ED] overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#113123] flex items-center justify-center text-white shrink-0 shadow-lg cursor-pointer hover:bg-[#1DA756] transition-colors">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Right: Chart */}
                    <div className="rounded-[32px] bg-[#113123] aspect-square p-6 md:p-8 flex flex-col justify-between text-white relative overflow-hidden">
                        <div className="flex justify-between items-start z-10 relative">
                            <span className="text-2xl lg:text-3xl font-medium">$196k+</span>
                            <ArrowUpRight className="w-5 h-5 text-white/70" />
                        </div>
                        
                        {/* Fake Line Chart */}
                        <div className="flex-1 w-full flex items-center justify-center relative mt-4">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <path 
                                    d="M0,45 L10,35 L20,40 L30,25 L40,30 L50,15 L60,25 L70,10 L80,15 L90,0 L100,5" 
                                    fill="none" 
                                    stroke="#1DA756" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </div>

                        <div className="text-right text-sm text-gray-300 mt-2 z-10 relative">Generated Value</div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Logo Cloud - Brand Values */}
            <div className="w-full border-t border-gray-100 mt-24 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-lg md:text-xl font-black tracking-tight text-gray-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#1DA756]" strokeWidth={2.5} />
                        Sustainability
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-gray-800 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-[#1DA756]" strokeWidth={2.5} />
                        Mastery
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#1DA756]" strokeWidth={2.5} />
                        Growth
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-gray-800 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#1DA756]" strokeWidth={2.5} />
                        Excellence
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-gray-800 flex items-center gap-2 hidden lg:flex">
                        <Crosshair className="w-5 h-5 text-[#1DA756]" strokeWidth={2.5} />
                        Focus
                    </div>
                    <div className="text-lg md:text-xl font-black tracking-tight text-gray-800 flex items-center gap-2 hidden lg:flex">
                        <ShieldCheck className="w-5 h-5 text-[#1DA756]" strokeWidth={2.5} />
                        Resilience
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernHero;
