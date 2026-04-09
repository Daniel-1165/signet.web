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
        { text: "Discipline", icon: Activity },
        { text: "Mastery", icon: Crown },
        { text: "Growth", icon: TrendingUp },
        { text: "Excellence", icon: Sparkles },
        { text: "Focus", icon: Crosshair },
        { text: "Resilience", icon: ShieldCheck }
    ];

    return (
        <section className="relative w-full overflow-hidden bg-transparent py-10 md:py-16">
            <div className="flex whitespace-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                {/* We double the text arrays to create a seamless loop */}
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-16 sm:gap-24 md:gap-32 pl-16 sm:pl-24 md:pl-32"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {marqueeItems.map((item, index) => {
                            const Icon = item.icon;
                            // Mimic realistic brand logos with SVG + bold text
                            return (
                                <div key={`${i}-${index}`} className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
                                    <Icon className="w-8 h-8 text-foreground" fill="currentColor" strokeWidth={1.5} />
                                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-0.5" style={{ fontFamily: "Arial, sans-serif" }}>
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
