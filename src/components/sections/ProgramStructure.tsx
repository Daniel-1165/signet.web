"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck } from "lucide-react";

/**
 * The three levels are a genuine progression — group, then peer, then
 * personal — so numbering them carries real information rather than
 * decorating them. This is the only place on the site that numbers anything.
 *
 * The tone deepens toward `wax` at Level 3: the warm accent is reserved for
 * the tier where the mentor's mark is finally struck personally.
 */
const levels = [
  {
    n: "01",
    icon: Users,
    title: "Group Mentoring",
    body: "Attend live classes and webinars where the Lead Mentor teaches the topics in the curriculum.",
    dot: "bg-seal",
    chip: "bg-mist text-seal",
  },
  {
    n: "02",
    icon: UserPlus,
    title: "Peer Mentoring",
    body: "Work in sub-teams alongside other mentees, learning together on your growth journey.",
    dot: "bg-verdant",
    chip: "bg-verdant/20 text-seal",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Personalized Mentoring",
    body: "Interact directly with your mentors for personalized help and support.",
    dot: "bg-wax",
    chip: "bg-wax/12 text-wax",
  },
];

export default function ProgramStructure() {
  return (
    <section
      id="program-structure"
      className="relative bg-canvas overflow-hidden section-py"
    >
      {/* Background Illustration */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/program_structure.png"
          alt=""
          className="hidden md:block w-full h-full object-cover opacity-25"
        />
        <img
          src="/program_structure_mobile.png"
          alt=""
          className="block md:hidden w-full h-full object-cover opacity-25"
        />
      </div>

      <div className="page-container relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="eyebrow mb-5">Program Overview</span>
          <h2 className="h2">
            Program <span className="text-seal">structure</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Levels Timeline */}
          <div className="w-full md:w-[52%]">
            <p className="lede mb-10">In the course of this mentorship program:</p>

            <div className="relative pl-7 sm:pl-9 border-l border-dashed border-rule-strong space-y-10">
              {levels.map((level, i) => {
                const Icon = level.icon;
                return (
                  <motion.div
                    key={level.n}
                    initial={{ opacity: 0, scale: 1.015, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group"
                  >
                    <div
                      className={`absolute -left-[34px] sm:-left-[42px] top-1.5 w-3.5 h-3.5 rounded-full ${level.dot} ring-4 ring-canvas transition-transform duration-300 group-hover:scale-125`}
                    />

                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${level.chip} flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.6} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2.5 mb-2">
                          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-ink/40">
                            {level.n}
                          </span>
                          <h3 className="h3">{level.title}</h3>
                        </div>
                        {/* The previous copy wrapped a dozen phrases in a
                            hover-underline "InteractiveWord". They looked
                            clickable and did nothing — an interface should not
                            promise an affordance it has no intention of
                            honouring. Now plain prose. */}
                        <p className="body-sm max-w-md">{level.body}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Spacer so the text doesn't overlap the illustration on desktop */}
          <div className="hidden md:block md:w-[48%]" />
        </div>
      </div>
    </section>
  );
}
