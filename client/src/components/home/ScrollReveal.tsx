import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    duration?: number;
    variant?: "fade-up" | "fade-in" | "zoom-in" | "slide-left" | "slide-right" | "blur-up";
    threshold?: number;
    once?: boolean;
}

export const ScrollReveal = ({
    children,
    width = "100%",
    className = "",
    delay = 0.1,
    duration = 0.5,
    variant = "blur-up", // Default to premium blur-up
    threshold = 0.2,
    once = true
}: ScrollRevealProps) => {
    const ref = useRef(null);
    // Use margin to trigger animation when element is 10% into the viewport
    const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getVariants = () => {
        switch (variant) {
            case "fade-in":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case "zoom-in":
                return {
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 }
                };
            case "slide-left":
                return {
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 }
                };
            case "slide-right":
                return {
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 }
                };
            case "fade-up":
                return {
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                };
            case "blur-up":
            default:
                // Premium feel: subtle scale, blur, and slide
                return {
                    hidden: {
                        opacity: 0,
                        y: 30,
                        scale: 0.98,
                        filter: "blur(4px)"
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)"
                    }
                };
        }
    };

    return (
        <div ref={ref} style={{ position: "relative", width }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
                transition={{
                    duration: duration,
                    delay: delay,
                    type: "spring",
                    stiffness: 70,
                    damping: 20
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
