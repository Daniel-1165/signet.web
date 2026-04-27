"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Star, Activity, Crown, TrendingUp, Sparkles, Crosshair, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SignUpButton, useUser } from "@clerk/nextjs";

const ModernHero = () => {
    const { isSignedIn, isLoaded } = useUser();

    return (
        <section className="relative min-h-screen flex flex-col pt-24 md:pt-32 pb-16 overflow-hidden bg-transparent">

            {/* Container */}
            <div className="mx-auto flex-1 flex flex-col xl:flex-row items-center justify-center gap-[24px] max-w-7xl px-6 w-full mt-10 z-10">
                {/* Left Content */}
                <div className="flex-1 flex flex-col items-start w-full">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="text-[#6E7A67] font-medium text-[14px] uppercase tracking-widest mb-[16px]"
                    >
                        Try it now!
                    </motion.span>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: 0.05, ease: "easeOut" }}
                        className="text-[#1D1914] text-[48px] md:text-[60px] font-semibold leading-[1.1] md:leading-[60px] tracking-[-0.025em] mb-[24px]"
                    >
                        Change the way<br />
                        you approach<br />
                        <span className="text-[#6E7A67]">your growth.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: 0.1, ease: "easeOut" }}
                        className="text-[#1F1B16] text-[14px] leading-[28px] max-w-lg mb-[32px] font-normal"
                    >
                        From your everyday habits, to planning for your future with essential resources and community, 
                        Signet helps you get more out of your life trajectory.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: 0.15, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px]"
                    >
                        {isLoaded && !isSignedIn ? (
                            <SignUpButton mode="modal">
                                <button className="bg-[#6E7A67] text-[#F8F4ED] px-[24px] py-[12px] rounded-[9999px] font-medium text-[14px] hover:bg-[#1D1914] transition-colors duration-150 ease-out shadow-sm shadow-black/5 border-0">
                                    Get Started Now
                                </button>
                            </SignUpButton>
                        ) : (
                            <Link href="/dashboard">
                                <button className="bg-[#6E7A67] text-[#F8F4ED] px-[24px] py-[12px] rounded-[9999px] font-medium text-[14px] hover:bg-[#1D1914] transition-colors duration-150 ease-out shadow-sm shadow-black/5 border-0">
                                    Go to Dashboard
                                </button>
                            </Link>
                        )}
                        
                        <div className="flex flex-col gap-[4px] ml-[8px]">
                            <div className="flex text-[#8A5A37]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-current" />
                                ))}
                                <span className="text-[#1D1914] font-medium text-[14px] ml-[8px]">5.0</span>
                            </div>
                            <span className="text-[#1F1B16] text-[12px] font-normal opacity-80">from 120+ <a href="#" className="underline decoration-[#D8CEBF] hover:text-[#6E7A67] transition-colors">reviews</a></span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - Full Bleed Composition */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    className="flex-1 w-full max-w-lg xl:max-w-none grid grid-cols-1 sm:grid-cols-2 gap-[12px]"
                >
                    {/* Top Left: Stats -> using gradient shell technique */}
                    <div className="p-[1px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.72)] via-[rgba(173,150,127,0.34)] to-[rgba(255,255,255,0.52)] relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75)]">
                        <div className="rounded-[31px] bg-[rgba(251,247,240,0.88)] backdrop-blur-[24px] h-full p-[24px] border border-[rgb(216,206,190)] flex flex-col justify-between overflow-hidden relative">
                            {/* Decorative Arch */}
                            <div className="absolute top-0 right-0 w-full h-[80%] bg-[rgba(255,255,255,0.3)] rounded-bl-[100px] border-l border-[rgba(255,255,255,0.6)]"></div>
                            
                            <div className="flex justify-end z-10 relative">
                                <div className="text-[48px] font-semibold text-[#1D1914] tracking-[-0.025em] shrink-0">56+</div>
                            </div>
                            <div className="z-10 relative mt-8">
                                <span className="text-[#1F1B16] font-medium text-[14px] block mb-[16px]">Core Resources</span>
                                <div className="w-[48px] h-[48px] border border-[#D8CEBF] rounded-[9999px] flex items-center justify-center bg-white/50 shadow-sm backdrop-blur-[12px]">
                                    <Globe className="w-5 h-5 text-[#6E7A67]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Right: Activity Profile */}
                    <div className="p-[1px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.72)] via-[rgba(173,150,127,0.34)] to-[rgba(255,255,255,0.52)] relative shadow-sm">
                        <div className="rounded-[31px] bg-[rgba(251,247,240,0.88)] backdrop-blur-[24px] h-full p-[24px] border border-[rgb(216,206,190)] flex flex-col justify-between">
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[40px] h-[40px] bg-white border border-[#D8CEBF] rounded-[16px] flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-[#6E7A67]" />
                                </div>
                                <span className="text-[#1F1B16] font-medium text-[14px]">Active Learners</span>
                            </div>
                            <div className="mt-8">
                                <div className="text-[32px] font-semibold text-[#1D1914] mb-[8px] tracking-[-0.025em]">1,240+</div>
                                <div className="flex items-center gap-[4px] text-[12px] text-[#6E7A67] font-medium px-3 py-1 bg-[#6E7A67]/10 rounded-[9999px] w-fit">
                                    <TrendingUp className="w-3 h-3" /> +12.5% this month
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: CTA/Join -> glass shell approach */}
                    <div className="sm:col-span-2 p-[1px] rounded-[32px] bg-gradient-to-br from-[rgba(255,255,255,0.72)] via-[rgba(173,150,127,0.34)] to-[rgba(255,255,255,0.52)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_1px_0_0_rgba(114,93,72,0.04)] relative hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),0_4px_12px_rgba(114,93,72,0.08)] transition-all duration-150 ease-out group">
                        <Link href="/join" className="block rounded-[31px] bg-white/40 backdrop-blur-[24px] border border-[rgb(216,206,190)] p-[24px] flex flex-col justify-between min-h-[160px] h-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <div className="flex justify-between items-start z-10">
                                <div className="w-[48px] h-[48px] bg-white border border-[#D8CEBF] rounded-[9999px] flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#8A5A37]" />
                                </div>
                                <div className="w-[32px] h-[32px] bg-[#6E7A67] text-[#F8F4ED] rounded-[9999px] flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-150 ease-out shadow-sm">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="mt-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-[12px]">
                                <div>
                                    <span className="text-[#1F1B16] block mb-[4px] font-medium text-[12px] uppercase tracking-widest opacity-60">Community</span>
                                    <h4 className="text-[20px] font-semibold tracking-[-0.025em] text-[#1D1914]">Join the network of silent achievers</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </motion.div>

            </div>

            {/* Bottom Logo Cloud - Brand Values */}
            <div className="w-full border-t border-[rgb(216,206,190)] border-opacity-40 mt-[80px] py-[32px] px-[24px] z-10 bg-[#FBF7F0]/30 backdrop-blur-[12px]">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-[24px]">
                    <div className="text-[14px] font-semibold uppercase tracking-widest text-[#1D1914] flex items-center gap-[8px] opacity-70 hover:opacity-100 hover:text-[#6E7A67] transition-colors duration-150 ease-out">
                        <Activity className="w-4 h-4" />
                        Sustainability
                    </div>
                    <div className="text-[14px] font-semibold uppercase tracking-widest text-[#1D1914] flex items-center gap-[8px] opacity-70 hover:opacity-100 hover:text-[#6E7A67] transition-colors duration-150 ease-out">
                        <Crown className="w-4 h-4" />
                        Mastery
                    </div>
                    <div className="text-[14px] font-semibold uppercase tracking-widest text-[#1D1914] flex items-center gap-[8px] opacity-70 hover:opacity-100 hover:text-[#6E7A67] transition-colors duration-150 ease-out">
                        <TrendingUp className="w-4 h-4" />
                        Growth
                    </div>
                    <div className="text-[14px] font-semibold uppercase tracking-widest text-[#1D1914] flex items-center gap-[8px] opacity-70 hover:opacity-100 hover:text-[#6E7A67] transition-colors duration-150 ease-out hidden sm:flex">
                        <Sparkles className="w-4 h-4" />
                        Excellence
                    </div>
                    <div className="text-[14px] font-semibold uppercase tracking-widest text-[#1D1914] flex items-center gap-[8px] opacity-70 hover:opacity-100 hover:text-[#6E7A67] transition-colors duration-150 ease-out hidden md:flex">
                        <Crosshair className="w-4 h-4" />
                        Focus
                    </div>
                    <div className="text-[14px] font-semibold uppercase tracking-widest text-[#1D1914] flex items-center gap-[8px] opacity-70 hover:opacity-100 hover:text-[#6E7A67] transition-colors duration-150 ease-out hidden lg:flex">
                        <ShieldCheck className="w-4 h-4" />
                        Resilience
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernHero;

