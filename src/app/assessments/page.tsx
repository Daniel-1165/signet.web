"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Brain, Heart, Zap, Clock, Shield, Award, CheckCircle2, Binary } from "lucide-react";
import { motion } from "framer-motion";

export default function AssessmentsPage() {
  return (
    <div className="relative min-h-screen premium-gradient bg-background">
      <Navbar />
      
      <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-32">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end relative">
          <div className="absolute -top-10 -left-10 w-4 h-4 bg-accent rounded-full blur-[2px] opacity-20" />
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
               <Binary size={12} strokeWidth={2} /> Baseline Assessments
            </div>
            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter text-foreground leading-none">
              Assess your <br /><span className="text-accent">Signal.</span>
            </h1>
          </div>
          <p className="text-xl text-foreground/60 leading-relaxed max-w-md pb-4 border-l-2 border-accent/30 pl-8">
            Scientific assessments designed to measure cognitive architecture and emotional intelligence. High-signal members must establish their baseline.
          </p>
        </div>

        {/* Assessment Grid */}
        <section className="space-y-12">
           <div className="flex items-center justify-between border-b border-black/10 pb-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-accent rounded-full" />
                 <h2 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/40">Active Assessments</h2>
              </div>
              <span className="text-xs font-black text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">New Tests Available</span>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
              {assessments.map((test, i) => (
                <div key={i} className="group relative bg-white rounded-[3rem] border border-black/5 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 p-12">
                   <div className="flex justify-between items-start mb-8">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${test.color} text-white shadow-lg`}>
                         <test.icon size={40} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Protocol {i + 1}</span>
                         <div className="flex gap-1">
                            {[1,2,3].map(dot => (
                               <div key={dot} className={`w-1 h-1 rounded-full ${dot <= test.difficulty ? 'bg-foreground' : 'bg-black/5'}`} />
                            ))}
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                         <span className="flex items-center gap-1.5"><Clock size={12} className="text-accent" strokeWidth={2} /> {test.duration}</span>
                         <span className="flex items-center gap-1.5 text-accent">{test.type}</span>
                      </div>
                      <h3 className="text-4xl font-black text-foreground leading-tight group-hover:text-accent transition-colors">{test.title}</h3>
                      <p className="text-foreground/60 text-lg leading-relaxed">
                         {test.desc}
                      </p>
                      
                      <div className="pt-8 flex items-center justify-between border-t border-black/5">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(p => (
                               <div key={p} className="w-8 h-8 rounded-full bg-black/5 border-2 border-white ring-1 ring-black/5" />
                            ))}
                         </div>
                         <button className="px-8 py-3 rounded-full bg-foreground text-white text-sm font-black hover:bg-accent transition-all flex items-center gap-2 group/btn">
                            Begin Test <Zap size={14} className="fill-current group-hover/btn:scale-125 transition-transform" />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Schema / How it works */}
        <section className="bg-foreground rounded-[4rem] p-20 text-white relative overflow-hidden signet-glow">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
           
           <div className="relative z-10 grid md:grid-cols-2 gap-20">
              <div className="space-y-10">
                 <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">The Scoring <br /><span className="text-accent">Architecture.</span></h2>
                 <p className="text-white/40 text-lg leading-relaxed">
                    Our assessments aren't just tests; they are calibration tools. We use a proprietary schema to map your cognitive and emotional results into a unified "Signal Tier".
                 </p>
                 <div className="space-y-6">
                    {schema.map((item, i) => (
                       <div key={i} className="flex gap-6 items-start">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                             <CheckCircle2 size={20} className="text-accent" strokeWidth={2} />
                          </div>
                          <div>
                             <h4 className="font-bold text-lg text-white mb-1">{item.title}</h4>
                             <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative group">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent/20 blur-[80px] rounded-full animate-pulse" />
                 <div className="relative z-10 space-y-8">
                    <div className="text-center py-4 border-b border-white/10">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Operational Schema</span>
                    </div>
                    {[1,2,3].map(i => (
                       <div key={i} className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                             <span>Vulnerability</span>
                             <span>98.2% Accuracy</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "80%" }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className="h-full bg-accent" 
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const assessments = [
  { 
    title: "IQ Cognitive Baseline", 
    duration: "20 Minutes", 
    type: "Cognitive", 
    difficulty: 3, 
    color: "bg-foreground", 
    icon: Brain,
    desc: "A rapid identification protocol measuring logical deduction, pattern recognition, and processing speed." 
  },
  { 
    title: "Emotional Quotient (EQ)", 
    duration: "15 Minutes", 
    type: "Psychological", 
    difficulty: 2, 
    color: "bg-accent", 
    icon: Heart,
    desc: "Measuring emotional regulation, empathy-mapping, and interpersonal signal-noise ratio." 
  },
];

const schema = [
  { title: "Cognitive Load", desc: "Understanding the threshold of your logical processing under environmental stress." },
  { title: "Emotional Resonance", desc: "Mapping the stability of your decisions across varied social dynamics." },
  { title: "Signal Accuracy", desc: "Our algorithm removes the bias of luck to ensure a pure performance tier." },
];
