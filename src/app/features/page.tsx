import { Calendar, Award, BookOpen, Clock, Users, CheckCircle2, Target, Brain, Activity, Shield, Zap, Flame, Compass, Leaf, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#F7FBF7] text-[#062412] font-sans selection:bg-[#D3F36B] selection:text-[#062412]">
      <main className="pt-24 md:pt-32 pb-20 px-5 md:px-8 max-w-7xl mx-auto space-y-24 md:space-y-40">
        
        {/* --- HERO SECTION --- (NextGreen Style) */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between relative px-2">
          {/* Left Text */}
          <div className="lg:w-[45%] space-y-8 z-10">
            <h1 className="text-5xl md:text-[5.5rem] leading-[1.05] font-bold tracking-tight text-[#0A2613]">
              Growth <br /> through <br /> mentorship
            </h1>
            <p className="text-[#0A2613]/80 text-lg md:text-xl font-medium leading-relaxed max-w-md">
              A comprehensive, structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life.
            </p>
            <div className="flex items-center gap-4 pt-4">
               <Link href="/join" className="bg-[#D3F36B] hover:bg-[#bceb34] text-[#062412] px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 inline-block">
                 Join program
               </Link>
               <button className="bg-black/5 hover:bg-black/10 text-[#062412] px-8 py-4 rounded-full font-bold text-sm transition-all inline-block hover:scale-105">
                 Learn more
               </button>
            </div>
          </div>

          {/* Right Image Structure */}
          <div className="lg:w-[50%] relative">
             <div className="absolute top-0 right-10 w-full h-full bg-[#D3F36B] rounded-[2.5rem] rounded-tl-[10rem] -z-10 translate-x-4 translate-y-4 md:translate-x-12 md:translate-y-8"></div>
             <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px] md:h-[550px] w-full border-4 border-white">
                <div className="absolute inset-0 bg-[#0A2613]/10 z-10 mix-blend-multiply" />
                <Image
                   src="/images/growing_plant.png"
                   alt="Growth and planting"
                   fill
                   className="object-cover object-center"
                   priority
                   unoptimized
                />
             </div>
          </div>
        </div>


        {/* --- THREE COLUMN INFO & IMAGES --- (Like "Integrate our software seamlessly...") */}
        <div className="space-y-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Master the art of <br /> personal leadership
            </h2>
            <p className="text-[#0A2613]/70 text-lg font-medium">
              Our step-by-step program will help you build solid foundations, optimize your productivity, and align your passion with true purpose. Let's make an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="space-y-6">
               <div className="w-12 h-12 rounded-2xl bg-[#D3F36B]/30 flex items-center justify-center text-[#1DA756]">
                  <Target strokeWidth={2} className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-3">Clear Vision</h3>
                  <p className="text-[#0A2613]/70 text-sm font-medium leading-relaxed">We help you discover the distinction between passion and purpose, laying out a concrete vision for your life.</p>
               </div>
               <div className="h-48 md:h-64 rounded-2xl overflow-hidden relative shadow-lg">
                  <Image src="/images/serene_nature.png" alt="Clear vision" fill className="object-cover" unoptimized/>
               </div>
            </div>

            {/* Card 2 */}
            <div className="space-y-6">
               <div className="w-12 h-12 rounded-2xl bg-[#D3F36B]/30 flex items-center justify-center text-[#1DA756]">
                  <Activity strokeWidth={2} className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-3">Accelerate Productivity</h3>
                  <p className="text-[#0A2613]/70 text-sm font-medium leading-relaxed">Master time management, overcome fear, and implement systems that drive you towards your highest potential.</p>
               </div>
               <div className="h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg bg-[#061E0A] p-6 relative flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DA756] blur-[60px] opacity-40 rounded-full"></div>
                  <h4 className="text-white font-bold text-2xl relative z-10 mt-auto">"Success is not final, failure is not fatal: it is the courage to continue that counts."</h4>
               </div>
            </div>

            {/* Card 3 */}
            <div className="space-y-6">
               <div className="w-12 h-12 rounded-2xl bg-[#D3F36B]/30 flex items-center justify-center text-[#1DA756]">
                  <Leaf strokeWidth={2} className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-3">Healthy Relationships</h3>
                  <p className="text-[#0A2613]/70 text-sm font-medium leading-relaxed">Gain high emotional intelligence. Build, master, and maintain relationships that fuel your growth journey.</p>
               </div>
               <div className="h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg relative bg-[#E1F1DD]">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full border-4 border-[#1DA756]/20 animate-pulse flex items-center justify-center">
                     <Users className="w-10 h-10 text-[#1DA756]" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>


        {/* --- DURATION AND GAINS --- (NextGreen "Transforming businesses" alternating block) */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-8 justify-between">
          <div className="lg:w-[45%] relative">
             <div className="absolute -bottom-6 -left-6 w-full h-[80%] bg-[#D3F36B] rounded-[2rem] rounded-bl-[10rem] -z-10"></div>
             <div className="relative rounded-[2rem] bg-[#0A2613] text-white p-10 md:p-14 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D3F36B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 space-y-10">
                   <div>
                       <h3 className="text-sm tracking-widest uppercase text-[#D3F36B] font-bold mb-3">Program Details</h3>
                       <h4 className="text-4xl font-bold">16th Mar - 15th Jun</h4>
                   </div>
                   <ul className="space-y-6">
                     <li className="flex gap-4">
                       <Calendar className="text-[#D3F36B] w-6 h-6 shrink-0" />
                       <p className="font-medium text-white/80">Every Monday, 8.30pm - 10:30pm (General classes)</p>
                     </li>
                     <li className="flex gap-4">
                       <Clock className="text-[#D3F36B] w-6 h-6 shrink-0" />
                       <p className="font-medium text-white/80">Weekly interactive team sessions at your chosen time.</p>
                     </li>
                     <li className="flex gap-4">
                       <Award className="text-[#D3F36B] w-6 h-6 shrink-0" />
                       <p className="font-medium text-white/80">Certificates awarded upon meeting rigorous criteria.</p>
                     </li>
                   </ul>
                </div>
             </div>
          </div>

          <div className="lg:w-[45%] space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transforming lives with <br /> sustainable growth
            </h2>
            <p className="text-[#0A2613]/70 text-lg font-medium">
              Signet empowers individuals to achieve their goals while developing a rich internal foundation. With our structured solutions, you drive lifelong growth.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
               <div>
                  <div className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-xl mb-4 text-[#1DA756]">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Efficiency</h4>
                  <p className="text-[#0A2613]/60 text-sm">Streamline your operations and reduce time-waste.</p>
               </div>
               <div>
                  <div className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-xl mb-4 text-[#1DA756]">
                    <Compass size={20} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Clarity</h4>
                  <p className="text-[#0A2613]/60 text-sm">Increase your focus and make a positive impact.</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- CURRICULUM GRID --- (NextGreen "Why NextGreen template" Style) */}
        <div className="pt-10 border-t border-[#0A2613]/10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              The Signet Curriculum
            </h2>
            <p className="text-[#0A2613]/70 text-lg font-medium">
              Master the foundational elements needed to achieve your goals in academics, career, business, or relationships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[1.5rem] hover:shadow-xl transition-all duration-300 border border-black/5 group cursor-default">
                 <div className="w-10 h-10 bg-[#F4FAED] rounded-xl flex items-center justify-center text-[#1DA756] mb-6 group-hover:scale-110 transition-transform">
                    {<item.icon size={18} strokeWidth={2.5}/>}
                 </div>
                 <h4 className="font-bold text-[17px] mb-2 text-[#0A2613]">{item.title}</h4>
                 <p className="text-[#0A2613]/60 text-sm font-medium">{item.desc || "Mastery module"}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

const curriculum = [
  { title: "Intro to Mentorship", desc: "Why and How?", icon: BookOpen },
  { title: "Power of Vision", desc: "Your ultimate aim", icon: Target },
  { title: "Self-Awareness", desc: "Understanding yourself", icon: Brain },
  { title: "Purpose vs Passion", desc: "The crucial difference", icon: Compass },
  { title: "Productivity", desc: "Time & resource management", icon: Zap },
  { title: "Self-Confidence", desc: "Building core esteem", icon: Shield },
  { title: "Overcoming Fear", desc: "Action despite resistance", icon: Flame },
  { title: "Resilience", desc: "The growth mindset", icon: Activity },
  { title: "Emotional Intelligence", desc: "Leading self & others", icon: Brain },
  { title: "Healthy Relationships", desc: "Connection networks", icon: Users },
  { title: "Effective Team work", desc: "Collaborative leadership", icon: Users },
  { title: "Communication", desc: "Translating thought to word", icon: BookOpen },
];
