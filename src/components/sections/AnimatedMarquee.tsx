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
                        className="flex items-center gap-12 sm:gap-20 md:gap-24 pl-12 sm:pl-20 md:pl-24"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {marqueeItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={`${i}-${index}`} className="flex items-center gap-3 text-foreground/50 hover:text-foreground transition-colors duration-300">
                                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                    <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
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
