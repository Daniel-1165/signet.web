import { Calendar, Award, BookOpen, Clock, Users, CheckCircle2, Target, Brain, Activity, Shield, Zap, Flame, Compass } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen premium-gradient bg-background">
      <main className="pt-28 md:pt-36 pb-20 px-5 md:px-8 max-w-7xl mx-auto space-y-20 md:space-y-32">
        {/* Hero Section */}
        <div className="text-left space-y-6 relative">
          <div className="flex justify-start gap-1.5 mb-2">
             <span className="w-2 h-2 rounded-full bg-accent shadow-sm" />
             <span className="w-2 h-2 rounded-full bg-foreground opacity-40" />
             <span className="w-2 h-2 rounded-full bg-foreground opacity-30" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[1.05]">
            Mentoring <br /><span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-growth-green">Program.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-foreground/70 leading-relaxed font-medium">
            A comprehensive, structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life.
          </p>
          <div className="h-[2px] w-16 bg-foreground/10 mt-8 rounded-full" />
        </div>

        {/* Program Duration & Gains */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
           <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:bg-white/60 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full transition-transform duration-700 group-hover:scale-125" />
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-black/5 flex items-center justify-center mb-6 border border-black/5 relative z-10">
                <Clock size={28} className="text-accent" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6">Program Duration</h2>
              <ul className="space-y-6 relative z-10">
                <li className="flex gap-4">
                  <div className="mt-1"><Calendar className="text-accent w-5 h-5 md:w-6 md:h-6" /></div>
                  <p className="text-foreground/80 md:text-lg text-base">The mentoring runs from <span className="font-bold text-foreground">16th Mar - 15th Jun, 2026</span>.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><Users className="text-accent w-5 h-5 md:w-6 md:h-6" /></div>
                  <p className="text-foreground/80 md:text-lg text-base">Our General classes hold every Monday by <span className="font-bold text-foreground">8.30pm - 10:30pm</span>.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><Target className="text-accent w-5 h-5 md:w-6 md:h-6" /></div>
                  <p className="text-foreground/80 md:text-lg text-base">Each team selects a day & time for their weekly interactive session.</p>
                </li>
              </ul>
              <div className="mt-8 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-black/5 text-xs md:text-sm font-semibold text-foreground/70 leading-relaxed relative z-10">
                 <strong className="text-accent">Note:</strong> Attend all classes to get the most out of this program. Attendance will be taken seriously. The slides will not be shared after the class. Take personal notes.
              </div>
           </div>
           
           <div className="p-8 md:p-10 rounded-[2.5rem] bg-accent/95 backdrop-blur-3xl text-white shadow-[0_20px_60px_rgba(16,129,114,0.3)] relative overflow-hidden group border border-white/20">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mb-6 border border-white/30 relative z-10 shadow-lg">
                <Award size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 relative z-10">Your Gains</h2>
              <ul className="space-y-6 md:space-y-8 relative z-10">
                <li className="flex gap-4 md:gap-5">
                  <div className="mt-1 shrink-0 bg-white/20 p-1 rounded-full border border-white/20 shadow-sm"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" /></div>
                  <div>
                     <h3 className="text-lg md:text-xl font-bold mb-1">Mastery of Skills</h3>
                     <p className="text-white/80 text-sm md:text-base leading-relaxed">Requisite for success in your academics, career, business, relationship, ministry, family or leadership position.</p>
                  </div>
                </li>
                <li className="flex gap-4 md:gap-5">
                  <div className="mt-1 shrink-0 bg-white/20 p-1 rounded-full border border-white/20 shadow-sm"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" /></div>
                  <div>
                     <h3 className="text-lg md:text-xl font-bold mb-1">Certificate of Participation</h3>
                     <p className="text-white/80 text-sm md:text-base leading-relaxed mb-3">Subject to meeting the following rigorous criteria:</p>
                     <ul className="space-y-2 text-white/95 text-sm md:text-base font-medium">
                        <li className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm border border-white/5">✓ Attendance to classes</li>
                        <li className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm border border-white/5">✓ Active team participation</li>
                        <li className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm border border-white/5">✓ Passing assessment tests</li>
                     </ul>
                  </div>
                </li>
              </ul>
           </div>
        </div>

        {/* Detailed Section: Course Curriculum */}
        <div className="pt-10 pb-16 relative">
          <div className="absolute top-0 w-20 h-1 bg-accent rounded-full mb-8" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-12 pt-8">
            Course <br />Curriculum.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {curriculum.map((item, index) => (
              <div key={index} className="group p-6 md:p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(16,129,114,0.08)] hover:bg-white/60 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors" />
                <div className="text-accent/10 absolute top-5 right-6 text-5xl md:text-6xl font-black italic select-none group-hover:text-accent/20 transition-colors">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center text-accent mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {<item.icon size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />}
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5 pr-8 relative z-10 leading-snug">{item.title}</h3>
                {item.desc && <p className="text-foreground/60 text-xs md:text-sm font-medium relative z-10">{item.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const curriculum = [
  { title: "Introduction to Mentorship", desc: "Why and How?", icon: BookOpen },
  { title: "The Power of Vision", desc: "", icon: Target },
  { title: "Self-Awareness", desc: "Understanding your Self", icon: Brain },
  { title: "Purpose vs Passion", desc: "The distinction", icon: Compass },
  { title: "Accelerating your Productivity", desc: "Time management", icon: Zap },
  { title: "Building Self-Confidence", desc: "And Self-Esteem", icon: Shield },
  { title: "Overcoming Fear", desc: "", icon: Flame },
  { title: "Mastering Resilience", desc: "The power of growth mindset", icon: Activity },
  { title: "Emotional Intelligence", desc: "How to lead yourself & others", icon: Activity },
  { title: "Healthy Relationships", desc: "Building and Mastering", icon: Users },
  { title: "Effective Team work", desc: "And Leadership", icon: Users },
  { title: "Effective Communication skills", desc: "", icon: BookOpen },
  { title: "Conflict Resolution", desc: "How to resolve ANY conflict", icon: Target },
];
