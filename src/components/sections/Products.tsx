"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Book, Layout, FileText, Bookmark } from "lucide-react";

const Products = () => {
    const products = [
        {
            title: "The Signet Quarterly",
            category: "Magazine",
            description: "A deep-dive into the seasonal philosophy of focus, high-performance execution, and silent growth.",
            icon: <Book className="h-5 w-5" />,
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
            color: "bg-[#006400] text-white"
        },
        {
            title: "Habitual Architecture",
            category: "Book",
            description: "The definitive guide to forging iron sustainability through curated environmental design.",
            icon: <Bookmark className="h-5 w-5" />,
            image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
            color: "bg-[#171717] text-white"
        },
        {
            title: "Mental Models Network",
            category: "Articles",
            description: "A curated collection of frameworks for decision-making under high-stakes, pressure environments.",
            icon: <FileText className="h-5 w-5" />,
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            color: "bg-white text-black border border-black/10"
        },
        {
            title: "Focus Interface v1.0",
            category: "Designs",
            description: "Minimalist workspace templates designed for maximum cognitive clarity and sustained rhythm.",
            icon: <Layout className="h-5 w-5" />,
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
            color: "bg-[#F7F6F0] text-[#006400] border border-black/5"
        }
    ];

    return (
        <section id="products" className="py-24 bg-[#F7F6F0] overflow-hidden relative">
            {/* Background Watermark Dots */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 opacity-[0.03] pointer-events-none">
                <img 
                    src="/logo.svg.svg" 
                    alt="" 
                    className="h-[40rem] w-auto grayscale" 
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#006400] mb-3">Resources by Signet</p>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground max-w-2xl leading-tight">
                        Curated environments for silent, structural growth.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col sm:flex-row h-full rounded-3xl border border-black/[0.04] bg-white p-4 hover:shadow-2xl hover:shadow-[#006400]/5 transition-all duration-500 overflow-hidden"
                        >
                            {/* Image Section */}
                            <div className="w-full sm:w-2/5 h-48 sm:h-auto rounded-2xl overflow-hidden relative mb-4 sm:mb-0 sm:mr-6 shrink-0 bg-[#F7F8F5]">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className={`absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl ${product.color} backdrop-blur-md shadow-lg`}>
                                    {product.icon}
                                </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className="flex-1 flex flex-col justify-center py-2 pr-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#006400]/70 mb-2">{product.category}</span>
                                <h3 className="text-xl font-bold text-foreground mb-3">{product.title}</h3>
                                <p className="text-sm leading-relaxed text-foreground/60 mb-6">{product.description}</p>
                                
                                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                                    <span className="text-xs font-bold text-foreground group-hover:text-[#006400] transition-colors">Explore Resource</span>
                                    <div className="h-8 w-8 rounded-full bg-[#F7F6F0] border border-black/5 flex items-center justify-center group-hover:bg-[#006400] group-hover:text-white transition-colors">
                                        <ArrowUpRight className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
