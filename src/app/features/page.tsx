import {
  Calendar, Award, BookOpen, Clock, Users,
  CheckCircle2, Target, Brain, Activity, Shield,
  Zap, Flame, Compass, Leaf, ArrowRight, TrendingUp, Quote,
  ChevronRight
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F6F0] text-[#0D120E] selection:bg-[#1DA756] selection:text-white"
      style={{ fontFamily: "'Melbourne', system-ui, sans-serif" }}>
      <main className="pb-32">
        
        {/* ── TOP HERO: GET TO KNOW US ─────────────────────────────── */}
        <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
          <img
            src="/get-to-know-us.png"
            alt="Get To Know Us"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent"></div>
          {/* Signet logo overlaid on the hero image */}
          <div className="absolute bottom-10 left-8 z-20 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-full">
              <img src="/signet-brand-logo.svg" alt="Signet" className="w-8 h-8 object-contain" style={{filter:"brightness(10) saturate(0)"}} />
              <span className="text-white text-xs font-black tracking-widest uppercase">Signet</span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 uppercase">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756]">About Signet Platform</span>
        </div>

        {/* ── FLUID SECTION: GROWTH PHILOSOPHY ──────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                Grow in <br />
                <span className="text-[#1DA756]">Silence.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#0D120E]/60 max-w-lg leading-relaxed font-medium capitalize">
                We believe the most profound transformations happen when you stop seeking validation and start seeking results. Signet is a structured sanctuary for those ready to lead.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <Link href="/join" className="h-14 px-10 rounded-full bg-[#1DA756] text-white font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-[#1DA756]/20">
                  Begin Journey <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Fluid Image Layout inspired by insight */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                     <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600" alt="Nature" />
                   </div>
                   <div className="rounded-none overflow-hidden shadow-xl transform rotate-3 bg-[#1DA756] p-8 text-white">
                      <Quote className="opacity-40 mb-4" />
                      <p className="font-bold text-lg leading-tight capitalize">"True growth is like a tree; it doesn't make a sound as it rises."</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="rounded-none overflow-hidden shadow-2xl h-80">
                     <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" alt="Mountain" className="h-full w-full object-cover" />
                   </div>
                   <div className="rounded-3xl overflow-hidden shadow-xl transform -rotate-2">
                     <img src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600" alt="Growth" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMAGE SECTION 2: OUR PROGRAM DIRECTIVE ─────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <div className="rounded-none overflow-hidden shadow-2xl h-[300px] md:h-[450px] relative group">
                <img 
                    src="/mentorship-programme.png" 
                    alt="Our Program Directive" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
                {/* Logo Top Left */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                    <img src="/signet-brand-logo.svg" alt="Signet Logo" className="w-8 h-8 object-contain" style={{filter:"brightness(10) saturate(0)"}} />
                    <span className="text-white text-xs font-black tracking-widest uppercase">Signet</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-10 md:p-16">
                    <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight font-heading">Our Program Directive.</h2>
                </div>
            </div>
        </section>

        {/* ── PROGRAM DETAILS ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
            <div className="flex flex-col md:flex-row gap-16 md:gap-32">
                <div className="md:w-1/2">
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-6 block">Structure & Discipline</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-8">Program <br/><span className="text-[#0D120E]/30">Details.</span></h2>
                    
                    <div className="space-y-10">
                        <div className="flex gap-6">
                            <div className="w-14 h-14 rounded-none bg-white shadow-xl flex items-center justify-center shrink-0 border border-black/5">
                                <Calendar className="text-[#1DA756]" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl uppercase mb-1">Every Monday</h4>
                                <p className="text-[#0D120E]/50 font-bold uppercase text-xs tracking-wider">8:30 PM – 10:30 PM (General classes)</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-14 h-14 rounded-none bg-white shadow-xl flex items-center justify-center shrink-0 border border-black/5">
                                <Clock className="text-[#1DA756]" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl uppercase mb-1">Weekly Teams</h4>
                                <p className="text-[#0D120E]/50 font-bold uppercase text-xs tracking-wider">Interactive sessions at your convenience.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 bg-[#0D120E] rounded-none p-10 md:p-16 text-white shadow-2xl relative overflow-hidden border border-[#1DA756]/30">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1DA756]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-8 block">Active Enrollment</span>
                    <h3 className="text-4xl md:text-7xl font-black mb-8 leading-none">16 MAR <br/> <span className="text-[#1DA756]">15 JUN.</span></h3>
                    <p className="text-white/60 text-lg mb-12 font-medium capitalize">Join the next cohort of silent achievers. Enrollment is currently open for the summer session.</p>
                    <Link href="/join" className="inline-flex items-center gap-3 text-[#1DA756] font-black tracking-[0.2em] uppercase text-sm group">
                        Apply Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>

        {/* ── YOUR GAINS ────────────────────────────────────────────── */}
        <section className="bg-white py-24 border-y border-black/[0.03]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
              <div className="order-2 md:order-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-6 block font-sans">Transformation</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] mb-12">Your <br/><span className="text-[#1DA756]">Gains.</span></h2>
                
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#1DA756]/10 flex items-center justify-center shrink-0 mt-1">
                      <Target className="text-[#1DA756]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-xl uppercase mb-2">Mastery of Skills</h4>
                      <p className="text-[#0D120E]/60 leading-relaxed font-medium capitalize text-lg">Requisite for success in your academics, career, business, relationship, ministry, family or leadership position.</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#1DA756]/10 flex items-center justify-center shrink-0 mt-1">
                      <Award className="text-[#1DA756]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-xl uppercase mb-2">Certificate of Participation</h4>
                      <p className="text-[#0D120E]/60 leading-relaxed font-medium capitalize text-lg mb-6">Subject to meeting the following performance criteria:</p>
                      <ul className="space-y-4">
                         {['Attendance to classes', 'Participation in team activities', 'Passing the assessment tests'].map((crit) => (
                           <li key={crit} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0D120E]/40">
                             <div className="w-2 h-2 bg-[#1DA756]" />
                             {crit}
                           </li>
                         ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative aspect-[4/5] md:aspect-auto md:h-[650px] overflow-hidden group shadow-2xl">
                  <img 
                    src="/community_roots.png" 
                    alt="Success and Rewards" 
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                  {/* Logo Top Left */}
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                      <img src="/signet-brand-logo.svg" alt="Signet Logo" className="w-8 h-8 object-contain" style={{filter:"brightness(10) saturate(0)"}} />
                      <span className="text-white text-xs font-black tracking-widest uppercase">Signet</span>
                  </div>
                  
                  {/* Tagline */}
                  <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm md:text-base font-black uppercase tracking-wider text-center">
                        in <span className="text-[#1DA756] font-black drop-shadow-sm">Signet</span> we cultivate our mind for Growth
                      </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1DA756]/20 to-transparent mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMAGE SECTION 3: LOCKED IN ───────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] relative group bg-[#0D120E]">
                <img 
                    src="/mission-leap.png" 
                    alt="Locked In" 
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-[2s]"
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-20 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm md:text-lg font-bold italic leading-relaxed max-w-lg mx-auto text-center">
                        "raising men that walks with a sense of purpose and a vision at heart, thoroughly equiped withstand all life can throw at them"
                    </p>
                </div>
            </div>
        </section>

        {/* ── CURRICULUM ────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="max-w-2xl">
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#1DA756] uppercase mb-6 block">The Roadmap</span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase leading-none">The <br/><span className="text-[#1DA756]">Curriculum.</span></h2>
                </div>
                <p className="text-lg md:text-xl text-[#0D120E]/50 font-medium max-w-sm capitalize">
                    A multi-layered approach to building internal fortitude and external excellence.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {curriculum.map((item, index) => (
                    <div key={index} className="group bg-white rounded-none p-8 border border-black/[0.03] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="w-12 h-12 rounded-none bg-[#F7F6F0] flex items-center justify-center text-[#1DA756] mb-6 group-hover:bg-[#1DA756] group-hover:text-white transition-colors">
                            <item.icon size={20} />
                        </div>
                        <h4 className="font-black text-lg uppercase tracking-tight mb-2 group-hover:text-[#1DA756] transition-colors">
                            {item.title}
                        </h4>
                        <p className="text-xs font-bold text-[#0D120E]/40 uppercase tracking-widest">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

const curriculum = [
  { title: "Mentorship", desc: "Why and How?", icon: BookOpen },
  { title: "Vision", desc: "Your ultimate aim", icon: Target },
  { title: "Self-Awareness", desc: "Understanding yourself", icon: Brain },
  { title: "Purpose vs Passion", desc: "The crucial difference", icon: Compass },
  { title: "Productivity", desc: "Time management", icon: Zap },
  { title: "Self-Confidence", desc: "Building core esteem", icon: Shield },
  { title: "Overcoming Fear", desc: "Action despite resistance", icon: Flame },
  { title: "Resilience", desc: "The growth mindset", icon: Activity },
  { title: "EQ", desc: "Leading self & others", icon: Brain },
  { title: "Relationships", desc: "Connection networks", icon: Users },
  { title: "Teamwork", desc: "Collaborative leadership", icon: Users },
  { title: "Communication", desc: "Translating thought", icon: BookOpen },
];
