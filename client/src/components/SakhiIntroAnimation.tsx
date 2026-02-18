import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SakhiIntroAnimationProps {
    isStopped?: boolean;
}

const SakhiIntroAnimation = ({ isStopped = false }: SakhiIntroAnimationProps) => {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const lines = [
        "Ask Sakhi about ovulation.",
        "Get trimester guidance.",
        "Understand IVF timelines.",
    ];

    // Timing Configuration (ms)
    const T_BREATH = 300;
    const T_GROW = 900;
    const T_PAUSE = 1200;

    // Total Active Time before switching = Breath + Grow + Pause
    // After this time, we change index, which triggers Exit animation (700ms).
    // Next cycle begins after Exit completes (AnimatePresence mode="wait").
    const ACTIVE_DURATION = T_BREATH + T_GROW + T_PAUSE;

    useEffect(() => {
        // If stopped externally or paused by hover, clear interval.
        if (isStopped || isHovered) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        // Interval to trigger the exit/switch
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % lines.length);
        }, ACTIVE_DURATION);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovered, isStopped, lines.length]);

    // Easing: cubic-bezier(0.4, 0, 0.2, 1)
    const EASE_PREMIUM = [0.4, 0, 0.2, 1];

    return (
        <div
            className="relative w-full max-w-md h-8 flex flex-col justify-center cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="region"
            aria-label="Features animation"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Text Animation */}
                    <motion.p
                        className="text-base md:text-lg font-medium text-foreground/80 block mb-2 tracking-wide"
                        variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: (T_BREATH / 1000) + (T_GROW * 0.6 / 1000), // Start after line is 60%
                                    duration: 0.4,
                                    ease: EASE_PREMIUM
                                }
                            },
                            exit: {
                                opacity: 0,
                                transition: {
                                    duration: 0.3,
                                    ease: EASE_PREMIUM
                                }
                            }
                        }}
                    >
                        {lines[index]}
                    </motion.p>

                    {/* Line Animation */}
                    <motion.div
                        className="h-[1px] bg-[#2EB5A3] rounded-full origin-left"
                        variants={{
                            hidden: { scaleX: 0 },
                            visible: {
                                scaleX: 1,
                                transition: {
                                    delay: T_BREATH / 1000,
                                    duration: 0.9,
                                    ease: EASE_PREMIUM
                                }
                            },
                            exit: {
                                scaleX: 0,
                                transition: {
                                    duration: 0.7,
                                    ease: EASE_PREMIUM
                                }
                            }
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Screen Reader Only Text */}
            <span className="sr-only">{lines[index]}</span>
        </div>
    );
};

export default SakhiIntroAnimation;
