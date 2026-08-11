"use client";

import { Brain, Heart, Zap, Clock, Shield, Award, CheckCircle2, Binary, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const assessments = [
  { 
    title: "IQ Cognitive Baseline", 
    duration: "20 Minutes", 
    type: "Deduction", 
    color: "bg-ink/10 text-ink", 
    icon: Brain,
    desc: "A meticulous exploration of pattern recognition and logical deduction. Designed to map the structural architecture of your processing capacity." 
  },
  { 
    title: "EQ (Emotional Quotient)", 
    duration: "15 Minutes", 
    type: "Resonance", 
    color: "bg-rule/40 text-ink", 
    icon: Heart,
    desc: "Calibrates the clarity of your emotional signals and regulation stability under simulated high-pressure relational dynamics." 
  },
];

export default function DashboardAssessmentsPage() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-20 pb-32 pt-12 px-6">
      {/* Editorial Header */}
      <header className="relative flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
           <div className="inline-flex items-center gap-3 text-ink">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Protocol 01: Calibration</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink" >
             Establish your <span className="italic font-normal text-ink">Baseline.</span>
           </h1>
           <p className="text-[16px] text-ink leading-relaxed max-w-md" >
             Your growth trajectory requires an accurate starting point. These assessments are the foundation of your curated Signet path.
           </p>
        </div>
        
        <div className="p-8 rounded-[2.5rem] bg-white border border-rule/40 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center w-64 h-64">
           <div className="w-16 h-16 rounded-2xl bg-ink/5 flex items-center justify-center text-ink font-bold text-xl mb-4">0%</div>
           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-ink/40 mb-2">Network Calibration</p>
           <div className="w-32 h-[2px] bg-ink/10 rounded-full overflow-hidden">
              <div className="w-0 h-full bg-ink" />
           </div>
        </div>
      </header>

      {/* Protocol Modules */}
      <div className="grid md:grid-cols-2 gap-8">
        {assessments.map((test, i) => (
          <div key={i} className="group bg-white rounded-[2.5rem] p-12 border border-rule/40 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:border-ink/30 hover:shadow-2xl transition-all duration-700 flex flex-col min-h-[420px]">
            <div className="flex justify-between items-start mb-12">
               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${test.color} shadow-sm group-hover:bg-ink group-hover:text-white transition-all`}>
                  <test.icon size={28} />
               </div>
               <div className="px-4 py-1.5 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-bold uppercase tracking-widest text-ink">
                  Awaiting Data
               </div>
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col">
               <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.15em] text-ink/40">
                  <span className="flex items-center gap-2"><Clock size={14} /> {test.duration}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rule" />
                  <span>{test.type}</span>
               </div>
               <h3 className="text-[32px] font-bold text-ink leading-tight group-hover:text-ink transition-colors" >{test.title}</h3>
               <p className="text-ink text-[15px] leading-relaxed line-clamp-3">
                  {test.desc}
               </p>
               
               <div className="pt-10 mt-auto flex items-center justify-between border-t border-rule/20">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-mist/75">Calibrated Status: ---</span>
                  <button className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-ink text-white text-[12px] font-bold uppercase tracking-widest hover:bg-ink hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-[0_10px_25px_rgba(110,122,103,0.3)]">
                     Begin Protocol <ArrowRight size={14} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy Callout */}
      <div className="p-16 rounded-[4rem] bg-ink text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[600px] h-full bg-ink/10 blur-[120px]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 justify-between">
            <div className="space-y-8 max-w-xl">
               <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.1] tracking-tight" >
                 The <span className="italic font-normal text-mist/75">Calibration</span> Meta-Framework.
               </h2>
               <p className="text-mist/55 text-[16px] leading-relaxed">
                 Our methodology transcends mere testing. We utilize high-fidelity environmental simulations to map the intersection of your cognitive depth and emotional resilience.
               </p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {['Consistency', 'Velocity', 'Resonance', 'Depth'].map(label => (
                     <div key={label} className="py-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mist/75">{label}</p>
                     </div>
                  ))}
               </div>
            </div>
            <div className="w-full md:w-80 h-80 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-ink/20 to-transparent" />
               <div className="text-center space-y-6 relative z-10">
                  <Zap size={52} className="text-mist/75 mx-auto animate-pulse" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/20">Pulse Tracking Active</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
