"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const VisionMission = () => {
    const sections = [
        {
            title: "Our Vision",
            statement: "To build a global network of trailblazers who model and replicate excellence in diverse spheres.",
            image: "/vision-statement.webp",
            href: "/vision-guide"
        },
        {
            title: "Our Mission",
            statement: "Ordinary persons achieving extraordinary results, silently and sustainably.",
            image: "/mission-statement.webp",
            href: "/features"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {sections.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 transition-all duration-500 hover:shadow-black/20 hover:-translate-y-2"
                        >
                            {/* Background Image */}
                            <img 
                                src={item.image} 
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Content Overlaid at Bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-start gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h2 className="text-white text-2xl md:text-3xl font-semibold uppercase tracking-tight italic">
                                    {item.title}
                                </h2>
                                <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed max-w-sm">
                                    {item.statement}
                                </p>
                                <Link 
                                    href={item.href} 
                                    className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-widest mt-4 group/link"
                                >
                                    Read more <ArrowRight className="w-3 h-3 group-hover/link:translate-x-2 transition-transform" />
                                </Link>
                            </div>

                            {/* Border Glow on Hover */}
                            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-[2.5rem] transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisionMission;


