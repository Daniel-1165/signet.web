"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Book, Layout, FileText, Bookmark } from "lucide-react";

const Products = () => {
    const products = [
        {
            title: "The Signet Quarterly",
            category: "Magazine",
            description: "A deep-dive into the seasonal philosophy of focus and high-performance execution.",
            icon: <Book className="h-6 w-6" />,
            image: "/community_roots.png",
            color: "bg-signet-green/10"
        },
        {
            title: "Habitual Architecture",
            category: "Book",
            description: "The definitive guide to forging iron discipline through environmental design.",
            icon: <Bookmark className="h-6 w-6" />,
            color: "bg-orange-500/10"
        },
        {
            title: "Mental Models Archive",
            category: "Articles",
            description: "A curated collection of frameworks for decision-making under high-stakes pressure.",
            icon: <FileText className="h-6 w-6" />,
            color: "bg-blue-500/10"
        },
        {
            title: "Focus Interface v1.0",
            category: "Designs",
            description: "Minimalist workspace templates designed for maximum cognitive clarity.",
            icon: <Layout className="h-6 w-6" />,
            color: "bg-purple-500/10"
        }
    ];

    return (
        <section id="products" className="py-24 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-signet-green mb-3">Resources & Materials</p>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground max-w-2xl leading-tight">
                        Tools for the Modern Architect of Self.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col h-full rounded-3xl border border-black/[0.06] bg-[#F7F8F5] p-8 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                        >
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${product.color} text-foreground group-hover:scale-110 transition-transform duration-500`}>
                                {product.icon}
                            </div>
                            
                            <div className="flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-signet-green">{product.category}</span>
                                <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-signet-green transition-colors">{product.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-foreground/50">{product.description}</p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-black/[0.03] flex items-center justify-between">
                                <span className="text-xs font-bold text-foreground">Explore Material</span>
                                <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-signet-green transition-colors">
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </div>

                            {/* Hover Image Peak */}
                            {product.image && (
                                <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                    <img src={product.image} alt="" className="w-full h-full object-cover rounded-3xl" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
