import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Feature configuration matching the user's asset names
const features = [
    {
        title: "Maternity & Emotional Support",
        description: "Compassionate guidance through the emotional highs and lows of your journey.",
        image: "/Pregnancy.png",
        label: "ALWAYS HERE"
    },
    {
        title: "Fertility & Family Building",
        description: "Navigating your unique path with culturally-aware AI and expert insights.",
        image: "/Trying naturally.png",
        label: "FAMILY JOURNEY"
    },
    {
        title: "24/7 Companion Care",
        description: "Instant support in English, Hindi, or Telugu, whenever you need it.",
        image: "/Post-delivery.png",
        label: "LOCAL SUPPORT"
    },
    {
        title: "Private & Secure",
        description: "Confidential emotional support that stays entirely on your device.",
        image: "/thinking of parenthood.png",
        label: "DATA PRIVACY"
    }
];

interface SakhiHeroProps {
    onCtaClick?: () => void;
}

const SakhiHero = ({ onCtaClick }: SakhiHeroProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const duration = 5000; // 5 seconds per slide

    // Timer logic: Resets whenever activeIndex changes (manual or auto)
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % features.length);
        }, duration);
        return () => clearInterval(timer);
    }, [activeIndex]);

    return (
        <div className="flex flex-col md:flex-row min-h-[600px] w-full max-w-7xl mx-auto px-6 py-12 gap-16 items-start">
            {/* Left Column: Animated Text List */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 py-4">
                {features.map((feature, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div
                            key={index}
                            className="cursor-pointer group relative flex flex-col gap-2"
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Content Container */}
                            <div className="flex flex-col gap-2 relative z-10">
                                <h3
                                    className={`text-xl md:text-2xl font-serif font-bold transition-all duration-300 ${isActive
                                            ? 'text-[#2EB5A3] scale-105 origin-left'
                                            : 'text-gray-400 hover:text-gray-600 scale-100'
                                        }`}
                                >
                                    {feature.title}
                                </h3>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-600 leading-relaxed font-medium pb-2 text-sm md:text-base">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* The Thin Progress Line - Moves left to right */}
                            <div className="h-[2px] w-full bg-gray-100 relative overflow-hidden rounded-full mt-2">
                                {isActive && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: duration / 1000, ease: "linear" }}
                                        className="absolute top-0 left-0 h-full bg-[#2EB5A3]"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}

                {onCtaClick && (
                    <div className="mt-4 text-left pl-1">
                        <Button
                            onClick={onCtaClick}
                            className="text-white px-8 py-6 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center"
                            style={{ backgroundColor: '#2EB5A3' }}
                        >
                            Try Sakhi Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Right Column: Sticky Image with Background Change Effect */}
            <div className="w-full md:w-1/2 h-[550px] relative overflow-hidden rounded-[32px] shadow-2xl bg-gray-50 mt-4 md:mt-0">
                <AnimatePresence>
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.0 }} // True Cross-Fade
                        className="absolute inset-0"
                    >
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 bg-black/5 z-10" />
                        <img
                            src={features[activeIndex].image}
                            alt={features[activeIndex].title}
                            className="w-full h-full object-cover"
                        />

                        {/* Content Overlay Layer */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest shadow-sm border border-white/50 w-fit"
                                style={{ color: '#2EB5A3' }}
                            >
                                {features[activeIndex].label}
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SakhiHero;
