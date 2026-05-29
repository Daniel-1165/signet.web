"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck, LayoutGrid } from "lucide-react";

interface InteractiveWordProps {
  children: React.ReactNode;
}

const InteractiveWord = ({ children }: InteractiveWordProps) => (
  <span className="relative inline-block font-bold text-[#1E6B3A] cursor-pointer transition-colors duration-200 hover:text-[#0B2B26] group/word">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1E6B3A] scale-x-0 group-hover/word:scale-x-100 transition-transform origin-left duration-300" />
  </span>
);

export default function ProgramStructure() {
  return (
    <section 
      id="program-structure" 
      className="relative bg-white overflow-hidden py-16 md:py-24"
      style={{ fontFamily: "'Melbourne', sans-serif" }}
    >
      {/* Background Image / Illustration */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-15 md:opacity-95 flex items-center justify-center md:justify-end">
        <img 
          src="/program_structure.png" 
          alt="" 
          className="w-full md:w-[55%] h-full md:h-[85%] object-contain object-center md:object-right" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF4EC] text-[#1E6B3A] text-[10px] font-black uppercase tracking-widest mb-3">
            <LayoutGrid className="w-3 h-3" /> Program Overview
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2B26] tracking-tight font-sans relative inline-block">
            Program Structure
            <div className="absolute -bottom-3 left-0 w-12 h-1 bg-[#1E6B3A] rounded-full" />
          </h2>
        </div>

        {/* Content Split Layout: Text on Left (Desktop) */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Levels Timeline */}
          <div className="w-full md:w-[50%] space-y-6">
            <p className="text-base sm:text-lg text-gray-700 font-bold mb-8">
              In the course of this mentorship program,
            </p>

            {/* Timeline Wrapper - no cards, text directly on background */}
            <div className="relative pl-6 sm:pl-8 border-l border-dashed border-[#1E6B3A]/30 space-y-10">
              
              {/* Level 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#1E6B3A] border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 transition-colors duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0B2B26] mb-2">
                      Level 1: Group Mentoring
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      You will be required to attend <InteractiveWord>live classes/webinars</InteractiveWord> where the topics in the <InteractiveWord>curriculum</InteractiveWord> will be taught by the <InteractiveWord>Lead Mentor</InteractiveWord>.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Level 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#c084fc] border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#c084fc] shrink-0 transition-colors duration-300">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#4c1d95] mb-2">
                      Level 2: Peer Mentoring
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      You will be divided into <InteractiveWord>sub-teams</InteractiveWord> where you will interact with other <InteractiveWord>mentees</InteractiveWord> and learn together on your <InteractiveWord>growth journey</InteractiveWord>.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Level 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#60a5fa] border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#60a5fa] shrink-0 transition-colors duration-300">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#1e3a8a] mb-2">
                      Level 3: Personalized Mentoring
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      You will have the privilege of interacting <InteractiveWord>directly with the Mentor(s)</InteractiveWord> for <InteractiveWord>personalized help</InteractiveWord> and <InteractiveWord>support</InteractiveWord>.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          
          {/* Spacer for desktop layout so text doesn't overlap the illustration */}
          <div className="hidden md:block md:w-[50%]" />

        </div>

      </div>
    </section>
  );
}
