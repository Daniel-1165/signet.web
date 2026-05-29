"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck, LayoutGrid } from "lucide-react";

interface InteractiveWordProps {
  children: React.ReactNode;
}

const InteractiveWord = ({ children }: InteractiveWordProps) => (
  <span className="relative inline-block font-bold text-[#8EB69B] cursor-pointer transition-colors duration-200 hover:text-white group/word">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8EB69B] scale-x-0 group-hover/word:scale-x-100 transition-transform origin-left duration-300" />
  </span>
);

export default function ProgramStructure() {
  return (
    <section 
      id="program-structure" 
      className="relative bg-transparent overflow-hidden"
      style={{ fontFamily: "'Melbourne', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#DAF1DE] text-[10px] font-black uppercase tracking-widest mb-3">
            <LayoutGrid className="w-3 h-3" /> Program Overview
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans relative inline-block">
            Program Structure
            <div className="absolute -bottom-3 left-0 w-12 h-1 bg-[#DAF1DE] rounded-full" />
          </h2>
        </div>

        {/* Content Split Layout: Image on Left (Desktop), Text on Right */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Illustration (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center order-2 md:order-1"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white/10 p-4 sm:p-6 border border-white/10 shadow-2xl transition-all duration-300">
              <img 
                src="/program_structure.png" 
                alt="Program Structure Mentorship Illustration" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column: Levels Timeline (Desktop) */}
          <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
            <p className="text-base sm:text-lg text-white/80 font-medium mb-8">
              In the course of this mentorship program,
            </p>

            {/* Timeline Wrapper */}
            <div className="relative pl-6 sm:pl-8 border-l border-dashed border-[#DAF1DE]/25 space-y-8">
              
              {/* Level 1 Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#DAF1DE] border-4 border-[#1E3D1E] shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#DAF1DE] shrink-0 transition-colors group-hover:bg-[#DAF1DE] group-hover:text-[#1E3D1E] duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Level 1: Group Mentoring
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      You will be required to attend <InteractiveWord>live classes/webinars</InteractiveWord> where the topics in the <InteractiveWord>curriculum</InteractiveWord> will be taught by the <InteractiveWord>Lead Mentor</InteractiveWord>.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Level 2 Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#c084fc] border-4 border-[#1E3D1E] shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#c084fc] shrink-0 transition-colors group-hover:bg-[#c084fc] group-hover:text-[#1E3D1E] duration-300">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Level 2: Peer Mentoring
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      You will be divided into <InteractiveWord>sub-teams</InteractiveWord> where you will interact with other <InteractiveWord>mentees</InteractiveWord> and learn together on your <InteractiveWord>growth journey</InteractiveWord>.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Level 3 Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#60a5fa] border-4 border-[#1E3D1E] shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#60a5fa] shrink-0 transition-colors group-hover:bg-[#60a5fa] group-hover:text-[#1E3D1E] duration-300">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Level 3: Personalized Mentoring
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      You will have the privilege of interacting <InteractiveWord>directly with the Mentor(s)</InteractiveWord> for <InteractiveWord>personalized help</InteractiveWord> and <InteractiveWord>support</InteractiveWord>.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
