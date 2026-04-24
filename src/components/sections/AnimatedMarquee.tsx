"use client";

import { motion } from "framer-motion";
import { 
    Activity, 
    Crown, 
    TrendingUp, 
    Sparkles, 
    Crosshair, 
    ShieldCheck 
} from "lucide-react";

const AnimatedMarquee = () => {
    const marqueeItems = [
        { text: "Sustainability", icon: Activity },
        { text: "Mastery", icon: Crown },
        { text: "Growth", icon: TrendingUp },
        { text: "Excellence", icon: Sparkles },
        { text: "Focus", icon: Crosshair },
        { text: "Resilience", icon: ShieldCheck }
    ];

    return (
        <section className="relative w-full overflow-hidden bg-transparent py-4 md:py-6">
            <div className="flex whitespace-nowrap bg-transparent">
                {/* We double the text arrays to create a seamless loop */}
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-8 sm:gap-12 md:gap-16 pl-8 sm:pl-12 md:pl-16"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {marqueeItems.map((item, index) => {
                            const Icon = item.icon;
                            // Mimic realistic brand logos with SVG + bold text
                            return (
                                <div key={`${i}-${index}`} className="flex items-center gap-1.5 opacity-30 hover:opacity-60 transition-opacity duration-300 cursor-default min-w-[90px] sm:min-w-[130px]">
                                    <Icon className="w-3.5 h-3.5 text-foreground" strokeWidth={2} />
                                    <span className="text-[9px] sm:text-[11px] font-black tracking-tighter text-foreground uppercase truncate">
                                        {item.text}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AnimatedMarquee;
