"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Shield, Zap, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function JoinPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        objective: "",
    });

    const benefits = [
        { icon: <Shield className="h-5 w-5" />, title: "Private Sanctuary", desc: "Access to a high-signal environment restricted from the generic noise of the public web." },
        { icon: <Zap className="h-5 w-5" />, title: "Elite Network", desc: "Collaborate directly with researchers, entrepreneurs, and high-performance athletes." },
        { icon: <Globe className="h-5 w-5" />, title: "Global Hubs", desc: "Priority access to physical coworking sanctuaries in over 12 cities worldwide." },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    return (
        <div className="min-h-screen bg-[#F8F9F5] text-foreground font-sans selection:bg-signet-green selection:text-white overflow-hidden relative">
            
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-signet-green/[0.03] to-transparent -z-10" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-signet-green/[0.05] blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-earth-brown/[0.02] blur-[150px] rounded-full -z-10" />

            {/* Navigation */}
            <nav className="p-8 lg:p-12">
                <Link href="/" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 hover:text-signet-green transition-colors">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Return to Network
                </Link>
            </nav>

            <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24 grid lg:grid-cols-2 gap-24 items-center">
                
                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-signet-green/10 text-signet-green text-[10px] font-bold uppercase tracking-widest mb-8">
                        <Sparkles className="h-3 w-3" /> Membership Invitation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.05]">
                        Begin your <br /><span className="italic font-light text-foreground/40">escalation.</span>
                    </h1>
                    <p className="text-xl text-foreground/50 leading-relaxed mb-12 max-w-lg">
                        Signet is not for everyone. We prioritize high-signal contributors who are committed to sustained, rhythmic growth.
                    </p>

                    <div className="space-y-10">
                        {benefits.map((benefit, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-white border border-black/[0.04] flex items-center justify-center text-signet-green shadow-sm shrink-0">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1 tracking-tight">{benefit.title}</h3>
                                    <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="bg-white rounded-[3rem] border border-black/[0.06] p-10 lg:p-14 shadow-2xl shadow-black/5 relative overflow-hidden">
                        
                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-black/[0.02]">
                            <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: step === 1 ? "50%" : "100%" }}
                                className="h-full bg-signet-green"
                            />
                        </div>

                        {step === 1 ? (
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold tracking-tight mb-2">Network Application</h2>
                                <p className="text-sm text-foreground/40 mb-10">Step 1 of 2: Baseline Assessment</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2D4B39]">Identity Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Enter your name" 
                                            className="w-full bg-transparent border-b border-black/[0.08] py-3 text-lg outline-none focus:border-signet-green transition-colors placeholder:text-foreground/20 font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2D4B39]">Secure Email</label>
                                        <input 
                                            required
                                            type="email" 
                                            placeholder="you@domain.com" 
                                            className="w-full bg-transparent border-b border-black/[0.08] py-3 text-lg outline-none focus:border-signet-green transition-colors placeholder:text-foreground/20 font-medium"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2D4B39]">Primary Objective</label>
                                        <select 
                                            className="w-full bg-transparent border-b border-black/[0.08] py-3 text-lg outline-none focus:border-signet-green transition-colors appearance-none font-medium text-foreground"
                                            value={formData.objective}
                                            onChange={(e) => setFormData({...formData, objective: e.target.value})}
                                        >
                                            <option value="" disabled>Select your focus</option>
                                            <option value="focus">Deep Focus & Productivity</option>
                                            <option value="discipline">Iron Discipline & Habits</option>
                                            <option value="wisdom">Wisdom & Frameworks</option>
                                            <option value="performance">Elite Performance</option>
                                        </select>
                                    </div>

                                    <div className="pt-6">
                                        <MagneticButton className="w-full h-16 bg-foreground text-white font-bold uppercase tracking-widest hover:bg-signet-green transition-all rounded-2xl shadow-xl shadow-black/10">
                                            Request Entry
                                        </MagneticButton>
                                    </div>

                                    <p className="text-[10px] text-center text-foreground/30 font-medium leading-relaxed">
                                        Submitting this application does not guarantee membership. <br /> Our selection committee reviews all entries manually.
                                    </p>
                                </form>
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="h-24 w-24 bg-signet-green/10 rounded-full flex items-center justify-center text-signet-green mx-auto mb-8">
                                    <CheckCircle2 className="h-12 w-12" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Application Received.</h2>
                                <p className="text-foreground/50 leading-relaxed mb-10 max-w-xs mx-auto">
                                    Your profile has been added to our assessment queue. You will receive a secure communication within 48 hours.
                                </p>
                                <Link href="/">
                                    <MagneticButton className="inline-flex h-14 px-10 bg-white border border-black/[0.06] text-foreground font-bold uppercase tracking-widest hover:bg-[#F7F8F5] transition-all rounded-2xl">
                                        Return Home
                                    </MagneticButton>
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* Decorative Watermark */}
                    <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-foreground">
                        <svg viewBox="0 0 100 50" className="h-32 w-auto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="21" cy="18" r="8" fill="currentColor" stroke="none" />
                            <circle cx="50" cy="12" r="10" fill="currentColor" stroke="none" />
                            <circle cx="79" cy="18" r="8" fill="currentColor" stroke="none" />
                        </svg>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="w-full text-center py-12 border-t border-black/[0.04]">
                <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-[0.2em]">
                    Signet Network © 2026 — Decidedly Selective.
                </p>
            </footer>
        </div>
    );
}
