import { Brain, Heart, Zap, Clock, Shield, Award, CheckCircle2, Binary } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardAssessmentsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 pb-24">
      {/* Header Panel */}
      <header className="bg-[#121812]/50 soft-blur border border-white/5 p-12 rounded-[3.5rem] inner-glow signet-glow relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-vision-blue/5 blur-[100px]" />
        <div className="absolute -bottom-10 left-1/4 w-[200px] h-[200px] bg-solar-gold/5 blur-[80px]" />
        
        <div className="relative z-10 space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ade80]/10 text-[#4ade80] text-[10px] font-bold uppercase tracking-widest border border-[#4ade80]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_8px_#4ade80]" /> Testing & Calibration
           </div>
           <div className="space-y-2">
              <h1 className="text-5xl font-extrabold tracking-tighter text-white font-heading uppercase">Baseline <span className="text-white/40 italic font-light font-sans lowercase">Assessments.</span></h1>
              <p className="max-w-md text-white/40 leading-relaxed font-outfit text-sm">
                Establish your cognitive and emotional baseline. Completing these assessments is required to unlock advanced community tiers and resource access.
              </p>
           </div>
           
           <div className="flex gap-4 pt-4">
              <div className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-vision-blue/20 text-vision-blue flex items-center justify-center font-bold text-xs">0%</div>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Global Accuracy</p>
                    <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-0 h-full bg-vision-blue" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* Protocol Modules */}
      <div className="grid md:grid-cols-2 gap-12">
        {assessments.map((test, i) => (
          <div key={i} className="group bg-[#121812]/30 soft-blur border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#4ade80]/20 transition-all duration-500 hover:-translate-y-1 p-10">
            <div className="flex justify-between items-start mb-10">
               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${test.color} text-white shadow-lg`}>
                  <test.icon size={30} />
               </div>
               <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-[#4ade80]">
                  Ready for Input
               </div>
               {/* psychology accent */}
               <div className={`absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-solar-gold shadow-[0_0_8px_#fbbf24]' : i % 3 === 1 ? 'bg-terra-soil opacity-50' : 'bg-vision-blue shadow-[0_0_8px_#0ea5e9]'}`} />
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20 font-heading">
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#4ade80]" /> {test.duration}</span>
                  <span className="flex items-center gap-1.5 text-solar-gold">{test.type}</span>
               </div>
               <h3 className="text-3xl font-bold text-white font-heading leading-tight group-hover:text-[#4ade80] transition-colors">{test.title}</h3>
               <p className="text-white/40 text-sm leading-relaxed line-clamp-3 font-outfit">
                  {test.desc}
               </p>
               
               <div className="pt-8 flex items-center justify-between border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/10">Score: ---</span>
                  <button className="px-8 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase hover:bg-[#4ade80] hover:text-white transition-all">
                     Initiate Protocol
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schema / Technical Detail Section for the dashboard */}
      <div className="p-16 rounded-[4rem] bg-[#121812]/50 border border-white/5 relative overflow-hidden">
         <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
               <h2 className="text-2xl font-bold tracking-tight text-white font-heading uppercase">Calibration Schema.</h2>
               <p className="text-white/40 text-sm leading-relaxed font-outfit">
                  Our tests use the <span className="text-[#4ade80] font-bold">Signet Calibration Schema</span> to ensure that results are adjusted for focus-decay and environmental noise.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  {['Consistency', 'Speed', 'Decay', 'Signal'].map(label => (
                     <div key={label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">{label}</p>
                     </div>
                  ))}
               </div>
            </div>
            <div className="h-64 rounded-[3rem] bg-black/40 border border-white/5 flex items-center justify-center">
               <div className="text-center space-y-4">
                  <Zap size={40} className="text-solar-gold mx-auto animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Algorithmic Tracking Active</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

const assessments = [
  { 
    title: "IQ Cognitive Baseline", 
    duration: "20 Minutes", 
    type: "Deduction", 
    color: "bg-[#0A261D]", 
    icon: Brain,
    desc: "Measures pure logic, pattern recognition, and processing efficiency. Designed to establish your logical threshold." 
  },
  { 
    title: "EQ (Emotional Quotient)", 
    duration: "15 Minutes", 
    type: "Resonance", 
    color: "bg-terra-soil", 
    icon: Heart,
    desc: "Evaluates interpersonal clarity, regulation, and emotional signal accuracy in stress-simulated environments." 
  },
];
