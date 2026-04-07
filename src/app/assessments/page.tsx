import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Brain, Heart, Zap, Clock, Shield, Award, CheckCircle2, Binary } from "lucide-react";
import { motion } from "framer-motion";

export default function AssessmentsPage() {
  return (
    <div className="relative min-h-screen premium-gradient bg-[#F8F9F5]">
      <Navbar />
      
      <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-32">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end relative">
          <div className="absolute -top-10 -left-10 w-4 h-4 bg-solar-gold rounded-full blur-[2px] opacity-20" />
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vision-blue/10 text-vision-blue text-[10px] font-bold uppercase tracking-widest border border-vision-blue/20">
               <Binary size={12} /> Baseline Assessments
            </div>
            <h1 className="text-6xl lg:text-9xl font-extrabold tracking-tighter text-[#0A261D] font-heading leading-none">
              Assess your <br /><span className="text-[#4C7D4D]">Signal.</span>
            </h1>
          </div>
          <p className="text-xl text-[#0A261D]/60 leading-relaxed font-outfit max-w-md pb-4 border-l-2 border-solar-gold/30 pl-8">
            Scientific assessments designed to measure cognitive architecture and emotional intelligence. High-signal members must establish their baseline.
          </p>
        </div>

        {/* Assessment Grid */}
        <section className="space-y-12">
           <div className="flex items-center justify-between border-b border-[#0A261D]/10 pb-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-terra-soil rounded-full" />
                 <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#0A261D]/40 font-heading">Active Assessments</h2>
              </div>
              <span className="text-xs font-bold text-[#4C7D4D] bg-[#4C7D4D]/5 px-3 py-1 rounded-full">New Tests Available</span>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
              {assessments.map((test, i) => (
                <div key={i} className="group relative bg-white rounded-[3rem] border border-[#0A261D]/5 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-12">
                   <div className="flex justify-between items-start mb-8">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${test.color} text-white shadow-lg`}>
                         <test.icon size={40} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Protocol {i + 1}</span>
                         <div className="flex gap-1">
                            {[1,2,3].map(dot => (
                               <div key={dot} className={`w-1 h-1 rounded-full ${dot <= test.difficulty ? 'bg-terra-soil' : 'bg-black/5'}`} />
                            ))}
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#0A261D]/40 font-heading">
                         <span className="flex items-center gap-1.5"><Clock size={12} className="text-vision-blue" /> {test.duration}</span>
                         <span className="flex items-center gap-1.5 text-solar-gold">{test.type}</span>
                      </div>
                      <h3 className="text-4xl font-bold text-[#0A261D] font-heading leading-tight group-hover:text-[#4C7D4D] transition-colors">{test.title}</h3>
                      <p className="text-[#0A261D]/60 text-lg leading-relaxed font-outfit">
                         {test.desc}
                      </p>
                      
                      <div className="pt-8 flex items-center justify-between border-t border-black/5">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(p => (
                               <div key={p} className="w-8 h-8 rounded-full bg-black/5 border-2 border-white ring-1 ring-black/5" />
                            ))}
                         </div>
                         <button className="px-8 py-3 rounded-2xl bg-black text-white text-sm font-bold hover:bg-signet-green transition-all flex items-center gap-2 group/btn">
                            Begin Test <Zap size={14} className="fill-current group-hover/btn:scale-125 transition-transform" />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Schema / How it works */}
        <section className="bg-[#0A261D] rounded-[4rem] p-20 text-white relative overflow-hidden signet-glow">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
           
           <div className="relative z-10 grid md:grid-cols-2 gap-20">
              <div className="space-y-10">
                 <h2 className="text-5xl font-extrabold font-heading tracking-tighter uppercase leading-none">The Scoring <br /><span className="text-solar-gold">Architecture.</span></h2>
                 <p className="text-white/40 font-outfit text-lg leading-relaxed">
                    Our assessments aren't just tests; they are calibration tools. We use a proprietary schema to map your cognitive and emotional results into a unified "Signal Tier".
                 </p>
                 <div className="space-y-6">
                    {schema.map((item, i) => (
                       <div key={i} className="flex gap-6 items-start">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                             <CheckCircle2 size={20} className="text-[#4ade80]" />
                          </div>
                          <div>
                             <h4 className="font-bold font-heading text-lg text-white">{item.title}</h4>
                             <p className="text-white/30 text-sm font-outfit">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative group">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-solar-gold/10 blur-[80px] rounded-full animate-pulse" />
                 <div className="relative z-10 space-y-8">
                    <div className="text-center py-4 border-b border-white/10">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Operational Schema</span>
                    </div>
                    {[1,2,3].map(i => (
                       <div key={i} className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                             <span>Vulnerability</span>
                             <span>98.2% Accuracy</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "80%" }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className="h-full bg-vision-blue" 
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
    color: "bg-[#0A261D]", 
    icon: Brain,
    desc: "A rapid identification protocol measuring logical deduction, pattern recognition, and processing speed." 
  },
  { 
    title: "Emotional Quotient (EQ)", 
    duration: "15 Minutes", 
    type: "Psychological", 
    difficulty: 2, 
    color: "bg-terra-soil", 
    icon: Heart,
    desc: "Measuring emotional regulation, empathy-mapping, and interpersonal signal-noise ratio." 
  },
];

const schema = [
  { title: "Cognitive Load", desc: "Understanding the threshold of your logical processing under environmental stress." },
  { title: "Emotional Resonance", desc: "Mapping the stability of your decisions across varied social dynamics." },
  { title: "Signal Accuracy", desc: "Our algorithm removes the bias of luck to ensure a pure performance tier." },
];
