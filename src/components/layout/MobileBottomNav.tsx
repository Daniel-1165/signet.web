"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, FolderOpen, Users, Brain } from "lucide-react";
import { motion } from "framer-motion";

export function MobileBottomNav({ items }: { items?: any[] }) {
    const pathname = usePathname();
    
    const defaultItems = [
        { label: "Home", href: "/", icon: Home },
        { label: "Growth", href: "/features", icon: Compass },
        { label: "Library", href: "/resources", icon: FolderOpen },
        { label: "Society", href: "/community", icon: Users },
    ];

    const navItems = items || defaultItems;

    return (
        <motion.nav 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 pointer-events-none"
        >
            <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-[2rem] shadow-2xl h-16 flex items-center justify-around px-4 pointer-events-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.label} 
                            href={item.href}
                            className="relative flex flex-col items-center justify-center w-12 h-full group"
                        >
                            <div className={`transition-all duration-300 ${isActive ? "text-[#1DA756] scale-110 -translate-y-1" : "text-black/30 hover:text-black/60"}`}>
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-widest mt-1 transition-all duration-300 ${isActive ? "text-[#1DA756] opacity-100" : "opacity-0"}`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div 
                                    layoutId="bottom-nav-active"
                                    className="absolute -top-2 w-1 h-1 bg-[#1DA756] rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
