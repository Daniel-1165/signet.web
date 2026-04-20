import { Calendar, Award, BookOpen, Clock, Users, CheckCircle2, Target, Brain, Activity, Shield, Zap, Flame, Compass, Leaf, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F6F0] text-[#0D120E] font-sans selection:bg-[#D3F36B] selection:text-[#0D120E]">
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-32 md:space-y-48">
        
        {/* --- MINIMAL HERO SECTION --- */}
        <div className="flex flex-col items-start gap-10 max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-[6rem] leading-[1.05] font-extrabold tracking-tighter text-[#0D120E] font-heading">
            Growth <br /> through <br /> mentorship.
          </h1>
          <p className="text-[#0D120E]/60 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
            A comprehensive, structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life.
          </p>
          <div className="flex items-center gap-6 pt-8">
             <Link href="/join" className="bg-[#1DA756] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#158C45] transition-all hover:scale-[1.02] shadow-lg shadow-[#1DA756]/20 inline-block">
               Join the program
             </Link>
             <button className="text-[#0D120E] px-8 py-5 rounded-full font-bold text-lg transition-all hover:bg-black/5 inline-block">
               Learn more
             </button>
          </div>
        </div>

        {/* --- EXTREME SIMPLICITY QUOTE SECTION --- */}
        <div className="flex justify-center items-center py-20 px-4">
          <div className="max-w-3xl text-center space-y-8">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0D120E] leading-tight font-heading">
               "Life is really simple, but we insist on making it complicated."
             </h2>
             <p className="text-2xl text-[#0D120E]/50 font-medium">- Confucius</p>
          </div>
        </div>

        {/* --- CLEAN CARD GRID (ForestDrop Style) --- */}
        <div className="space-y-16 pt-10 border-t border-[#0D120E]/5">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 font-heading">
              Master personal leadership
            </h2>
            <p className="text-[#0D120E]/60 text-lg font-medium leading-relaxed">
              Our step-by-step program helps you build solid foundations, optimize productivity, and align passion with purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Clear Vision", desc: "Discover the distinction between passion and purpose, laying out a concrete vision for your life." },
              { icon: Activity, title: "Accelerate Productivity", desc: "Master time management, overcome fear, and implement systems that drive you to your potential." },
              { icon: Leaf, title: "Healthy Relationships", desc: "Gain emotional intelligence. Build and master relationships that fuel your growth journey." }
            ].map((item, i) => (
               <div key={i} className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#0D120E]/[0.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7F6F0] flex items-center justify-center text-[#1DA756] mb-8">
                     <item.icon strokeWidth={2} className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-[#0D120E]/60 text-base font-medium leading-relaxed">{item.desc}</p>
               </div>
            ))}
          </div>
        </div>

        {/* --- PROGRAM DETAILS LIST (Ultra Clean) --- */}
        <div className="py-20 border-t border-[#0D120E]/5 flex flex-col md:flex-row gap-16 md:gap-32 justify-between">
           <div className="md:w-1/2">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 font-heading">
               Program Details
             </h2>
             <p className="text-[#0D120E]/60 text-lg font-medium mb-12 max-w-sm">
               Signet empowers individuals to achieve goals while developing a rich internal foundation.
             </p>
             <div className="space-y-8">
                <div className="flex gap-6 items-start">
                   <div className="p-3 bg-white shadow-sm rounded-xl text-[#1DA756] shrink-0 border border-black/[0.02]">
                      <Calendar className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-xl mb-1">Every Monday</h4>
                      <p className="text-[#0D120E]/60 font-medium">8:30 PM - 10:30 PM (General classes)</p>
                   </div>
                </div>
                <div className="flex gap-6 items-start">
                   <div className="p-3 bg-white shadow-sm rounded-xl text-[#1DA756] shrink-0 border border-black/[0.02]">
                      <Clock className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-xl mb-1">Interactive Sessions</h4>
                      <p className="text-[#0D120E]/60 font-medium">Weekly team sessions at your chosen time.</p>
                   </div>
                </div>
             </div>
           </div>
           
           <div className="md:w-1/2 bg-white rounded-[2rem] p-10 md:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#0D120E]/[0.02] flex flex-col justify-center">
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#1DA756] font-bold mb-4 font-heading">Next Cohort</h3>
              <h4 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#0D120E] mb-8 font-heading">
                16th Mar<br/>—<br/>15th Jun
              </h4>
              <p className="text-[#0D120E]/60 text-lg font-medium">
                Enrollment is open. Secure your spot in the upcoming transformational journey.
              </p>
           </div>
        </div>

        {/* --- MINIMAL CURRICULUM GRID --- */}
        <div className="pt-20 border-t border-[#0D120E]/5">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-heading mb-4">
              The Curriculum
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {curriculum.map((item, index) => (
              <div key={index} className="group">
                 <div className="w-12 h-12 bg-white shadow-sm border border-black/[0.02] rounded-2xl flex items-center justify-center text-[#1DA756] mb-5 group-hover:bg-[#1DA756] group-hover:text-white transition-colors duration-300">
                    <item.icon size={20} strokeWidth={2}/>
                 </div>
                 <h4 className="font-bold text-lg mb-2 text-[#0D120E] tracking-tight">{item.title}</h4>
                 <p className="text-[#0D120E]/50 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
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
