"use client";

import { motion } from "framer-motion";
import { Heart, Target, TrendingUp, ListOrdered } from "lucide-react";

const pillars = [
  { title: "Emotional Intelligence", icon: Heart, label: "01" },
  { title: "Self-Awareness", icon: Target, label: "02" },
  { title: "Resilience", icon: TrendingUp, label: "03" },
  { title: "Systems Thinking", icon: ListOrdered, label: "04" }
];

export default function PillarsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {pillars.map((pillar, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group bg-white rounded-3xl p-6 md:p-12 text-left hover:bg-[#1D1914] transition-colors duration-500 border border-[#D8CEBE]/30 flex flex-col min-h-[160px] md:min-h-[280px]"
        >
          <span className="text-[10px] font-bold text-[#D8CEBF] group-hover:text-white/40 transition-colors mb-auto tracking-widest">
            {pillar.label}
          </span>
          <pillar.icon className="w-6 h-6 md:w-8 md:h-8 text-[#6E7A67] mb-4 md:mb-10 group-hover:text-white transition-colors" />
          <h4 
            className="text-[15px] md:text-[22px] font-bold text-[#1D1914] group-hover:text-white transition-colors leading-tight" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pillar.title}
          </h4>
        </motion.div>
      ))}
    </div>
  );
}
