"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CalendarRange, Check, AlertCircle } from "lucide-react";

const activities = [
  "Team review sessions",
  "Periodic assignments",
  "Personal check-in sessions",
  "Assessment tests",
];

const Tick = () => (
  <span className="w-5 h-5 rounded-full bg-mist flex items-center justify-center text-seal shrink-0 mt-0.5">
    <Check size={12} strokeWidth={3} />
  </span>
);

export default function ProgramSection() {
  return (
    <section id="programs" className="relative section-py bg-canvas overflow-hidden">
      <div className="page-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow mb-5">Our Program</span>
          <h2 className="h2">
            Learn. Grow. Lead.{" "}
            <span className="display-accent text-seal">Together.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Activities */}
          <motion.div
            initial={{ opacity: 0, scale: 1.015, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card lift-hover"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-mist flex items-center justify-center text-seal">
                <ClipboardCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>

              <h3 className="h3">Beyond the training sessions</h3>

              <ul className="space-y-3.5">
                {activities.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-sm sm:text-base text-ink/75">
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 2: Schedule */}
          <motion.div
            initial={{ opacity: 0, scale: 1.015, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="card lift-hover"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-mist flex items-center justify-center text-seal">
                <CalendarRange className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>

              <h3 className="h3">When we meet</h3>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3.5 text-sm sm:text-base text-ink/75">
                  <Tick />
                  <span>
                    General classes hold every Monday,{" "}
                    {/* Mono for the time: times are data, and the utility face
                        is what carries data everywhere on this site. */}
                    <span className="font-mono text-[0.9em] font-medium text-seal whitespace-nowrap">
                      8:30–10:30pm
                    </span>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3.5 text-sm sm:text-base text-ink/75">
                  <Tick />
                  <span>
                    Each team selects a suitable day and time for their weekly review session.
                  </span>
                </li>
              </ul>

              {/* Attendance note. Previously set in full caps, which read as
                  shouting at people who had not yet done anything wrong. The
                  wax accent and the icon carry the weight instead. */}
              <div className="press p-5 flex gap-4 items-start">
                <AlertCircle className="text-wax shrink-0 mt-0.5" size={20} strokeWidth={1.7} />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-ink">
                    Attend every class to get the most out of this program — attendance is taken
                    seriously.
                  </p>
                  <p className="text-xs leading-relaxed text-ink/55">
                    Slides are not shared after class, so take personal notes during each session.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
