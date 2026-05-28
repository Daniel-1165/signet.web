"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck, LayoutGrid } from "lucide-react";

interface InteractiveWordProps {
  children: React.ReactNode;
}

const InteractiveWord = ({ children }: InteractiveWordProps) => (
  <span className="relative inline-block font-bold text-[#1E6B3A] cursor-pointer transition-colors duration-200 hover:text-[#114B2A] group/word">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1E6B3A] scale-x-0 group-hover/word:scale-x-100 transition-transform origin-left duration-300" />
  </span>
);

export default function ProgramStructure() {
  return (
    <section 
      id="program-structure" 
      className="relative py-16 md:py-24 bg-transparent overflow-hidden"
      style={{ fontFamily: "'Melbourne', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF4EC] text-[#1E6B3A] text-[10px] font-black uppercase tracking-widest mb-3">
            <LayoutGrid className="w-3 h-3" /> Program Overview
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-sans relative inline-block">
            Program Structure
            <div className="absolute -bottom-3 left-0 w-12 h-1 bg-[#1E6B3A] rounded-full" />
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
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white/50 p-4 sm:p-6 border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/program_structure.png" 
                alt="Program Structure Mentorship Illustration" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column: Levels Timeline (Desktop) */}
          <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
            <p className="text-base sm:text-lg text-[#0F172A]/70 font-medium mb-8">
              In the course of this mentorship program,
            </p>

            {/* Timeline Wrapper */}
            <div className="relative pl-6 sm:pl-8 border-l border-dashed border-[#1E6B3A]/20 space-y-8">
              
              {/* Level 1 Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-white rounded-3xl p-6 border border-black/[0.03] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#1E6B3A] border-4 border-[#FAFAF8] shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF4EC] flex items-center justify-center text-[#1E6B3A] shrink-0 transition-colors group-hover:bg-[#1E6B3A] group-hover:text-white duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                      Level 1: Group Mentoring
                    </h3>
                    <p className="text-sm text-[#0F172A]/70 leading-relaxed font-medium">
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
                className="relative bg-white rounded-3xl p-6 border border-black/[0.03] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#8B5CF6] border-4 border-[#FAFAF8] shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shrink-0 transition-colors group-hover:bg-[#8B5CF6] group-hover:text-white duration-300">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                      Level 2: Peer Mentoring
                    </h3>
                    <p className="text-sm text-[#0F172A]/70 leading-relaxed font-medium">
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
                className="relative bg-white rounded-3xl p-6 border border-black/[0.03] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#3B82F6] border-4 border-[#FAFAF8] shadow-sm transition-transform duration-300 group-hover:scale-125" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-[#3B82F6] shrink-0 transition-colors group-hover:bg-[#3B82F6] group-hover:text-white duration-300">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                      Level 3: Personalized Mentoring
                    </h3>
                    <p className="text-sm text-[#0F172A]/70 leading-relaxed font-medium">
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
