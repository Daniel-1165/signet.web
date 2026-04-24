"use client";

import { motion } from "framer-motion";
import { Lock, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/MagneticButton";

const LockedInHero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-between py-12 overflow-hidden bg-[#0D120E]">
            {/* Background Gradients/Shapes */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#1DA756]/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1DA756]/10 rounded-full blur-[120px]"></div>
                
                {/* Organic Leaf-like shapes */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1DA756" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0D120E" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M-100,500 C150,200 450,800 1100,500 L1100,1100 L-100,1100 Z" fill="url(#grad1)" />
                    <path d="M-200,300 C200,600 600,0 1200,300 L1200,0 L-200,0 Z" fill="url(#grad1)" className="opacity-50" />
                    <circle cx="200" cy="200" r="150" fill="#1DA756" className="opacity-10 blur-3xl" />
                    <circle cx="800" cy="800" r="200" fill="#1DA756" className="opacity-10 blur-3xl" />
                </svg>
            </div>

            {/* Logo */}
            {/* Navbar spacer or empty space removed since Navbar is absolute */}
            <div className="h-16" />

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-md px-6">
                {/* Lock Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-12 relative"
                >
                    <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                         <Lock className="w-24 h-24 text-white" strokeWidth={1.5} />
                    </div>
                </motion.div>

                {/* Notification Cards */}
                <div className="flex flex-col gap-4 w-full relative">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer group"
                    >
                        <div className="w-14 h-14 bg-[#1DA756] rounded-2xl flex items-center justify-center flex-shrink-0">
                            <img 
                                src="/signet-brand-logo.svg" 
                                alt="Signet Logo" 
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="text-sm font-semibold text-gray-800">Now, we are</span>
                                <span className="text-[10px] text-gray-400 font-medium lowercase">now</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900 leading-tight">Locked In...</p>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform cursor-pointer group z-10"
                    >
                         <div className="w-14 h-14 bg-[#1DA756] rounded-2xl flex items-center justify-center flex-shrink-0">
                            <img 
                                src="/signet-brand-logo.svg" 
                                alt="Signet Logo" 
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="text-sm font-semibold text-gray-800">Let's Grow</span>
                                <span className="text-[10px] text-gray-400 font-medium lowercase">now</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900 leading-tight">in Silence!</p>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full"
                >
                    <Link href="/join" className="group w-full sm:flex-1">
                        <MagneticButton className="w-full h-14 bg-[#1DA756] text-white font-bold rounded-2xl shadow-lg shadow-[#1DA756]/30 flex items-center justify-center gap-2 hover:bg-[#1DA756]/90 transition-all border border-white/10">
                            Join Network <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </MagneticButton>
                    </Link>
                    <Link href="/features" className="w-full sm:flex-1">
                        <MagneticButton className="w-full h-14 bg-white/10 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                            Explore
                        </MagneticButton>
                    </Link>
                </motion.div>
            </div>

            {/* Footer Socials */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-white/60 text-xs font-medium"
            >
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4 fill-white/20" />
                    <span>Silent Growth Network</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 fill-white/20" />
                    <span>Silent Growth Network (SIGNET)</span>
                </a>
            </motion.div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </section>
    );
};

export default LockedInHero;
