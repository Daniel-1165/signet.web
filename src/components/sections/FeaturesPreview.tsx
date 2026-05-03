import Link from 'next/link';
import { ArrowUpRight, BookOpen, Target, Clock, Shield, Brain, Zap, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const CURRICULUM_ITEMS = [
  {
    title: "Power of Vision",
    description: "Aligning with your core purpose",
    icon: Target,
    color: "text-accent",
    height: "h-[180px]",
    delay: 0.1
  },
  {
    title: "Self-Awareness",
    description: "Understanding your identity",
    icon: BookOpen,
    color: "text-emerald-500",
    height: "h-[220px]",
    delay: 0.2
  },
  {
    title: "Time Management",
    description: "High-performance productivity",
    icon: Clock,
    color: "text-blue-500",
    height: "h-[160px]",
    delay: 0.3
  },
  {
    title: "Leadership",
    description: "Leading with influence",
    icon: Shield,
    color: "text-purple-500",
    height: "h-[240px]",
    delay: 0.4
  },
  {
    title: "Emotional Intel",
    description: "Mastering your emotions",
    icon: Brain,
    color: "text-pink-500",
    height: "h-[190px]",
    delay: 0.5
  },
  {
    title: "Goal Setting",
    description: "Turning dreams into reality",
    icon: Zap,
    color: "text-orange-500",
    height: "h-[210px]",
    delay: 0.6
  },
  {
    title: "Career Growth",
    description: "Building professional value",
    icon: Briefcase,
    color: "text-indigo-500",
    height: "h-[170px]",
    delay: 0.7
  },
  {
    title: "Financial Lite",
    description: "Scaling your wealth",
    icon: TrendingUp,
    color: "text-lime-500",
    height: "h-[230px]",
    delay: 0.8
  }
];

export default function FeaturesPreview() {
  return (
    <section className="relative py-32 bg-transparent text-foreground overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-growth-green/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 space-y-8 lg:max-w-xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5 text-foreground text-[10px] font-black uppercase tracking-widest border border-black/10"
          >
             🌟 Mentoring Program
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] text-balance"
          >
            Accelerate Your <br />
            <span className="text-accent underline decoration-black/5 underline-offset-8">Personal Growth.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 text-lg max-w-lg leading-relaxed font-medium"
          >
            Join our structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life.
          </motion.p>
          
          <motion.ul 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-5 pt-4 mb-8"
          >
             <li className="flex items-center gap-4 text-foreground/80 font-bold tracking-tight md:text-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="text-accent w-5 h-5" />
                </div>
                16th March - 15th June, 2026
             </li>
             <li className="flex items-center gap-4 text-foreground/80 font-bold tracking-tight md:text-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <BookOpen className="text-accent w-5 h-5" />
                </div>
                13 Core Curriculum Modules
             </li>
             <li className="flex items-center gap-4 text-foreground/80 font-bold tracking-tight md:text-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="text-accent w-5 h-5" />
                </div>
                Certificate of Participation
             </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/features">
              <button className="h-16 px-10 rounded-2xl bg-[#0D120E] text-white font-black tracking-[0.2em] uppercase text-xs flex items-center gap-4 hover:bg-accent transition-all shadow-2xl shadow-black/10 group">
                  Explore Full Curriculum 
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
        
        {/* Horizontal Scrollable Cards with varying heights */}
        <div className="flex-1 w-full relative group/scroll overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-12 pt-4 no-scrollbar -mx-6 px-6 cursor-grab active:cursor-grabbing">
                <div className="flex gap-6 items-end">
                    {CURRICULUM_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: item.delay }}
                            className={`flex-none w-[200px] md:w-[240px] ${item.height} p-8 rounded-[2.5rem] bg-white border border-black/5 flex flex-col items-start gap-4 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden`}
                        >
                            {/* Inner ambient glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-black/[0.02] rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
                            
                            <div className={`p-3 rounded-2xl bg-black/[0.03] ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            
                            <div className="mt-auto">
                                <h3 className="font-black text-sm uppercase tracking-tight text-[#0D120E]">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] font-bold text-[#0D120E]/40 uppercase tracking-widest mt-1">
                                    {item.description}
                                </p>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-2 pointer-events-none">
                <div className="w-12 h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ x: [0, 24, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-accent/40 rounded-full"
                    />
                </div>
            </div>

            {/* Fades for scroll */}
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
