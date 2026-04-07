"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    // Position of the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics-based trailing cursor
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };
        
        const handleMouseSelect = () => {
             // Handle selection states if needed
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-signet-green w-3 h-3 -ml-1.5 -mt-1.5 mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full border border-signet-green/40 w-12 h-12 -ml-6 -mt-6"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
        </>
    );
};
