import React, { ReactNode } from 'react';
import { useLocation } from "wouter";
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, MessageCircle } from 'lucide-react';
import '../../styles/sakhi-hero.css';

interface HeroSectionProps {
    onCtaClick?: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
    const [, setLocation] = useLocation();

    return (
        <section className="relative pt-2 pb-0 overflow-hidden bg-gradient-to-br from-[#F5F7FF] via-[#FFECEF] to-[#EDF2FF]">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-96 h-96 bg-[#EC4899]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/40 rounded-full opacity-40"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + (i % 3) * 20}%`,
                        }}
                        animate={{
                            y: [-20, 40, -20],
                            x: [-10, 10, -10],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl text-center lg:text-left">
                        {/* Badge */}

                        {/* Main Heading */}
                        <motion.h1
                            className="mt-0.5 text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight font-serif"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <span className="block">Meet Sakhi - Your</span>
                            <motion.span
                                className="block bg-gradient-to-r from-primary via-[#EC4899] to-[#F97316] bg-clip-text text-transparent bg-[length:200%_auto] pb-2"
                                animate={{
                                    backgroundPosition: ['0% center', '200% center', '0% center'],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                Compassionate Companion
                            </motion.span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="mt-1.5 text-xl text-gray-600 leading-relaxed font-sans"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Sakhi understands the emotional challenges of fertility journeys and provides culturally-aware support, 24/7.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="mt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.button
                                onClick={onCtaClick}
                                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-[#EC4899] text-white rounded-full font-medium shadow-lg overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                animate={{
                                    boxShadow: [
                                        "0 10px 30px rgba(139, 92, 246, 0.3)",
                                        "0 15px 35px rgba(139, 92, 246, 0.4)",
                                        "0 10px 30px rgba(139, 92, 246, 0.3)"
                                    ]
                                }}
                                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#EC4899] to-primary"
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        ease: "easeInOut"
                                    }}
                                />
                                <span className="relative flex items-center justify-center gap-2">
                                    Try Sakhi Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </motion.button>

                            <motion.button
                                onClick={() => setLocation("/knowledge-hub")}
                                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full font-medium border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center block cursor-pointer"
                                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Browse Knowledge Hub
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="mt-8 flex items-center justify-center lg:justify-start gap-8 flex-wrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <StatItem icon={<Users />} value="10k+" label="Users Supported" delay={1.2} />
                            <StatItem icon={<Heart />} value="95%" label="Satisfaction Rate" delay={1.3} />
                            <StatItem icon={<MessageCircle />} value="24/7" label="Available Support" delay={1.4} />
                        </motion.div>
                    </div>

                    {/* Right Side - Floating Icons */}
                    <div className="hidden lg:flex flex-1 relative h-[600px] items-center justify-center">
                        <motion.div
                            className="w-full max-w-[600px] h-auto relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <div className="image-circle-wrapper w-full h-full shadow-2xl">
                                <img
                                    src="/sakhi.png"
                                    alt="Sakhi Illustration"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Floating Feature Icons */}
                        <FloatingIcon
                            icon={<Heart className="w-8 h-8 text-[#EC4899]" />}
                            bgColor="bg-pink-100"
                            position="top-20 right-20"
                            delay={1}
                            duration={3}
                        />
                        <FloatingIcon
                            icon={<Users className="w-8 h-8 text-primary" />}
                            bgColor="bg-purple-100"
                            position="top-60 right-0"
                            delay={1.5}
                            duration={4}
                        />
                        <FloatingIcon
                            icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
                            bgColor="bg-blue-100"
                            position="bottom-24 right-12"
                            delay={2}
                            duration={3.5}
                        />
                    </div>
                </div>
            </div>


        </section>
    );
}

function StatItem({ icon, value, label, delay }: {
    icon: ReactNode;
    value: string;
    label: string;
    delay: number;
}) {
    return (
        <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.08, x: 5 }}
        >
            <motion.div
                className="p-3 bg-primary/10 rounded-full text-primary"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
            >
                {icon}
            </motion.div>
            <div className="text-left">
                <motion.div
                    className="text-2xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.2, type: "spring" }}
                >
                    {value}
                </motion.div>
                <motion.div
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.3 }}
                >
                    {label}
                </motion.div>
            </div>
        </motion.div>
    );
}

function FloatingIcon({ icon, bgColor, position, delay, duration }: {
    icon: ReactNode;
    bgColor: string;
    position: string;
    delay: number;
    duration: number;
}) {
    return (
        <motion.div
            className={`absolute ${position} ${bgColor} p-4 rounded-2xl shadow-lg z-20`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -20, 0],
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.6, delay, type: "spring" },
                rotate: { duration: 0.6, delay },
                y: {
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }
            }}
            whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                transition: { duration: 0.5 }
            }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + 1
                }}
            >
                {icon}
            </motion.div>
        </motion.div>
    );
}
