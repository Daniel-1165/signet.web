"use client";

import {
  Calendar, Award, Clock, ArrowRight,
  Target, Brain, Heart, ChevronRight
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-[#1D1914] selection:bg-[#6E7A67] selection:text-white pb-20">
      <main>
        
        {/* ── HERO SECTION: LOCKED IN ─────────────────────────────── */}
        <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden flex items-center">
            <img 
                src="/forest_hero_bg.png" 
                alt="Forest Background" 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7] grayscale-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1D1914]/40 via-transparent to-[#FDFCFB]" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
                <div className="max-w-4xl space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-[#D8CEBF]" />
                        <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D8CEBF]" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Let's grow in silence
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tighter text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Now, we are <br />
                        <span className="italic font-normal text-[#D8CEBF]">Locked In...</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        True evolution doesn't announce itself. It grows in the quiet spaces between effort and reflection.
                    </p>
                </div>
            </div>
        </section>

        {/* ── THE SIGNET STORY ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-40">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-20 md:gap-32 items-center">
                <div className="space-y-10">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] text-[#6E7A67] uppercase mb-6 block" style={{ fontFamily: "'Inter', sans-serif" }}>The Foundation</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-[#1D1914]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The <span className="italic font-normal text-[#6E7A67]">SIGNET</span> Story
                        </h2>
                    </div>
                    <div className="space-y-6 text-[16px] md:text-[18px] text-[#6E7A67] leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <p>At SIGNET, we believe that the most significant transformations happen when the world is quiet. Our "Silent Growth" philosophy isn't about isolation; it's about intentional focus. In an era of constant noise and performative achievement, we provide a sanctuary for depth.</p>
                        <p>We measure impact by depth, not decibels. Our network was founded on the principle that true leadership and emotional intelligence are forged in quiet spaces—through rigorous self-reflection and organic mentorship that values substance over status.</p>
                    </div>
                </div>

                <div className="relative group">
                    <div className="bg-white rounded-[3rem] p-4 shadow-2xl border border-[#D8CEBE]/30 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700">
                        <img 
                            src="/mission-leap.png" 
                            alt="Course Curriculum Illustration" 
                            className="w-full h-auto rounded-[2.5rem]"
                        />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6E7A67]/10 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </section>

        {/* ── COURSE CURRICULUM ────────────────────────────────────── */}
        <section className="bg-white py-24 md:py-40 border-y border-[#D8CEBE]/20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-20">
                    <div className="h-0.5 w-12 bg-[#6E7A67]" />
                    <h3 className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#6E7A67]" style={{ fontFamily: "'Inter', sans-serif" }}>Course Curriculum</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                    {[
                        "Introduction to Mentorship: Why and How?",
                        "The Power of Vision",
                        "Self-Awareness: Understanding your Self",
                        "Purpose vs Passion: The distinction",
                        "Accelerating your Productivity: Time management",
                        "Building Self-Confidence and Self-Esteem",
                        "Overcoming Fear",
                        "Mastering Resilience: The power of growth mindset",
                        "Emotional Intelligence: How to lead yourself & others",
                        "Building and Mastering Healthy Relationships",
                        "Effective Team work and Leadership",
                        "Effective Communication skills",
                        "Conflict Resolution: How to resolve ANY conflict"
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-5 py-4 border-b border-[#D8CEBE]/10 group hover:border-[#6E7A67]/30 transition-all">
                            <span className="text-[14px] font-bold text-[#6E7A67]/40 group-hover:text-[#6E7A67] transition-colors">{i + 1})</span>
                            <p className="text-[16px] md:text-[18px] font-medium text-[#1D1914] group-hover:translate-x-2 transition-transform duration-500" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── ENROLLMENT & GAINS ────────────────────────────────────── */}
        <section className="bg-[#0B3D2E] text-white py-24 md:py-40 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-full bg-white/[0.03] blur-[120px] -rotate-12 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 md:gap-32 items-start relative z-10">
                <div className="space-y-16">
                    <div>
                        <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D8CEBF]/60 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Program Duration</h4>
                        <div className="space-y-8">
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBF]">
                                    <Calendar size={20} />
                                </div>
                                <p className="text-[15px] md:text-[16px] text-white/80 leading-relaxed font-medium">
                                    The mentoring program runs from 15th March - 15th June, 2025.
                                </p>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBF]">
                                    <Clock size={20} />
                                </div>
                                <p className="text-[15px] md:text-[16px] text-white/80 leading-relaxed font-medium">
                                    General classes held every Monday by 8:30pm - 10:30pm.
                                </p>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBF]">
                                    <Target size={20} />
                                </div>
                                <p className="text-[15px] md:text-[16px] text-white/80 leading-relaxed font-medium">
                                    Weekly team review/interactive sessions (Day/time selected by team).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm">
                        <p className="text-[13px] italic font-medium leading-relaxed text-[#D8CEBF]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            "ATTEND ALL THE CLASSES TO GET THE MOST OUT OF THIS PROGRAM. ATTENDANCE WILL BE TAKEN SERIOUSLY."
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] p-10 md:p-16 text-[#1D1914] shadow-2xl space-y-10">
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#6E7A67] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Your Gains</h4>
                        <p className="text-[18px] md:text-[20px] font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            At the end of this program, you will have gained:
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="w-6 h-6 rounded-full bg-[#6E7A67]/10 flex items-center justify-center text-[#6E7A67] shrink-0 mt-1">
                                <Heart size={14} className="fill-[#6E7A67]/20" />
                            </div>
                            <div>
                                <h5 className="font-bold text-[16px] mb-2 uppercase tracking-tight">Mastery of skills</h5>
                                <p className="text-[14px] text-[#6E7A67] leading-relaxed">Requisite for success in academics, career, business, relationships, ministry, family, or leadership positions.</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-6 h-6 rounded-full bg-[#6E7A67]/10 flex items-center justify-center text-[#6E7A67] shrink-0 mt-1">
                                <Award size={14} className="fill-[#6E7A67]/20" />
                            </div>
                            <div>
                                <h5 className="font-bold text-[16px] mb-2 uppercase tracking-tight">A Certificate of Participation</h5>
                                <p className="text-[14px] text-[#6E7A67] leading-relaxed mb-4">Subject to meeting the following criteria:</p>
                                <ul className="space-y-2">
                                    {['Attendance to classes', 'Participation in team activities', 'Passing the assessment tests'].map(li => (
                                        <li key={li} className="flex items-center gap-3 text-[11px] font-bold text-[#1D1914]/60 uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 bg-[#6E7A67] rounded-full" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Link href="/join" className="group flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#6E7A67] text-white font-bold text-[14px] uppercase tracking-widest hover:bg-[#1D1914] transition-all shadow-xl shadow-[#6E7A67]/20">
                        Apply for Next Cohort <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
