import { Calendar, Award, BookOpen, Clock, Users, CheckCircle2, Target, Brain, Activity, Shield, Zap, Flame, Compass } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen premium-gradient bg-background">
      <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <div className="text-left space-y-8 relative">
          <div className="flex justify-start gap-1.5 mb-2">
             <span className="w-2 h-2 rounded-full bg-accent shadow-sm" />
             <span className="w-2 h-2 rounded-full bg-foreground opacity-40" />
             <span className="w-2 h-2 rounded-full bg-foreground opacity-30" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
            Mentoring <br /><span className="text-accent">Program.</span>
          </h1>
          <p className="max-w-2xl text-xl text-foreground/60 leading-relaxed">
            A comprehensive, structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life.
          </p>
          <div className="h-[2px] w-24 bg-foreground/10 mt-12 rounded-full" />
        </div>

        {/* Program Duration & Gains */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
           <div className="p-10 rounded-[3.5rem] bg-white border border-black/5 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                <Clock size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-foreground mb-6">Program Duration</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1"><Calendar className="text-accent w-6 h-6" /></div>
                  <p className="text-foreground/80 text-lg">The mentoring program runs from <span className="font-bold text-foreground">16th March - 15th June, 2026</span>.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><Users className="text-accent w-6 h-6" /></div>
                  <p className="text-foreground/80 text-lg">Our General classes hold every Monday by <span className="font-bold text-foreground">8.30pm - 10:30pm</span>.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><Target className="text-accent w-6 h-6" /></div>
                  <p className="text-foreground/80 text-lg">Each team will have to select a suitable day and time for their team review/interactive session weekly.</p>
                </li>
              </ul>
              <div className="mt-8 p-4 rounded-2xl bg-black/5 border border-black/10 text-sm font-semibold text-foreground/70">
                 Note: Attend all classes to get the most out of this program. Attendance will be taken seriously. The slides will not be shared after the class. Take personal notes.
              </div>
           </div>
           
           <div className="p-10 rounded-[3.5rem] bg-accent text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.05)_100%)] pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur text-white flex items-center justify-center mb-8 border border-white/10">
                <Award size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-8">Your Gains</h2>
              <ul className="space-y-8">
                <li className="flex gap-5">
                  <div className="mt-1 shrink-0 bg-white/20 p-1.5 rounded-full"><CheckCircle2 className="w-5 h-5" /></div>
                  <div>
                     <h3 className="text-xl font-bold mb-2">Mastery of Skills</h3>
                     <p className="text-white/80 leading-relaxed">Requisite for success in your academics, career, business, relationship, ministry, family or leadership position.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="mt-1 shrink-0 bg-white/20 p-1.5 rounded-full"><CheckCircle2 className="w-5 h-5" /></div>
                  <div>
                     <h3 className="text-xl font-bold mb-2">A Certificate of Participation</h3>
                     <p className="text-white/80 leading-relaxed mb-3">Subject to meeting the following rigorous criteria:</p>
                     <ul className="space-y-2 text-white/90">
                        <li className="flex items-center gap-2">• Attendance to classes</li>
                        <li className="flex items-center gap-2">• Participation in team activities</li>
                        <li className="flex items-center gap-2">• Passing the assessment tests</li>
                     </ul>
                  </div>
                </li>
              </ul>
           </div>
        </div>

        {/* Detailed Section: Course Curriculum */}
        <div className="pt-16 pb-16 relative">
          <div className="absolute top-0 w-24 h-1 bg-accent rounded-full mb-12" />
          <h2 className="text-5xl font-black tracking-tight text-foreground leading-none mb-16 pt-12">
            Course <br />Curriculum.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculum.map((item, index) => (
              <div key={index} className="group p-8 rounded-[2rem] bg-white border border-black/5 hover:border-black/10 hover:shadow-xl transition-all duration-300 relative">
                <div className="text-accent/20 absolute top-6 right-8 text-6xl font-black italic select-none group-hover:text-accent/30 transition-colors">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  {<item.icon size={24} strokeWidth={2} />}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 pr-8">{item.title}</h3>
                {item.desc && <p className="text-foreground/60 text-sm">{item.desc}</p>}
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
