import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Heart, Users, Sparkles } from 'lucide-react';

const supportAreas = [
    {
        icon: Heart,
        title: "Emotional guidance",
        subtitle: "through IVF cycles",
        examples: ["Managing treatment anxiety", "Handling failed cycles", "Celebrating small wins"],
        color: "#EC4899",
        angle: -45 // Top Right
    },
    {
        icon: Baby,
        title: "Pregnancy support",
        subtitle: "& parenting",
        examples: ["Trimester-specific advice", "Postpartum care", "Early parenting questions"],
        color: "#3B82F6",
        angle: 45 // Bottom Right
    },
    {
        icon: Users,
        title: "Family planning",
        subtitle: "decisions",
        examples: ["Treatment options explained", "Financial planning help", "Partner communication"],
        color: "#8B5CF6",
        angle: 135 // Bottom Left
    },
    {
        icon: Sparkles,
        title: "Cultural care",
        subtitle: "& language",
        examples: ["Traditional practices guidance", "Multi-language support", "Community connection"],
        color: "#F59E0B",
        angle: 225 // Top Left
    }
];

export function SpecificWays() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-32 bg-[#FAFBFF] overflow-hidden min-h-[800px] flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Left: Content Header */}
                    <div className="w-full lg:w-1/3 text-center lg:text-left z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
                                Specific ways <br />
                                <span className="text-primary">Sakhi supports you</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 max-w-md">
                                Explore how Sakhi becomes part of your journey through every milestone and emotion.
                                <span className="hidden md:inline"> Hover over the icons to see more.</span>
                            </p>

                            {/* Detail Panel - Mobile/Fallback */}
                            <div className="lg:hidden mt-8 text-left space-y-4">
                                {supportAreas.map((area, i) => (
                                    <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <area.icon className="w-5 h-5" style={{ color: area.color }} />
                                            <span className="font-bold">{area.title}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{area.examples.join(" • ")}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: The Orbital Interface */}
                    <div className="relative w-full lg:w-2/3 h-[500px] md:h-[600px] flex items-center justify-center">

                        {/* Orbiting Paths (Visual only) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-dashed border-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />
                            <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] border border-dashed border-[#EC4899]/10 rounded-full animate-[spin_40s_linear_reverse_infinite]" />
                        </div>

                        <motion.div
                            className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-primary/5"
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 20px 50px rgba(139, 92, 246, 0.1)",
                                    "0 20px 50px rgba(139, 92, 246, 0.2)",
                                    "0 20px 50px rgba(139, 92, 246, 0.1)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary opacity-80" />
                        </motion.div>

                        {/* Orbiting Interaction Nodes */}
                        {supportAreas.map((area, index) => {
                            const isHovered = hoveredIndex === index;
                            const isAnyHovered = hoveredIndex !== null;
                            const distance = 160; // Mobile distance
                            const desktopDistance = 220; // Desktop distance

                            // Calculate positioning
                            const rad = (area.angle * Math.PI) / 180;

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute z-30 cursor-pointer"
                                    initial={false}
                                    animate={{
                                        x: Math.cos(rad) * (window.innerWidth < 768 ? distance : desktopDistance),
                                        y: Math.sin(rad) * (window.innerWidth < 768 ? distance : desktopDistance),
                                        opacity: isAnyHovered && !isHovered ? 0.3 : 1,
                                        scale: isHovered ? 1.15 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* The Bubble */}
                                    <div className="relative">
                                        <motion.div
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-2"
                                            style={{ borderColor: isHovered ? area.color : "transparent" }}
                                            animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                                        >
                                            <area.icon className="w-8 h-8" style={{ color: area.color }} />
                                        </motion.div>

                                        {/* Label */}
                                        <div className={`absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
                                            <p className="font-bold text-gray-900 text-sm md:text-base">{area.title}</p>
                                        </div>

                                        {/* Details Tooltip (Desktop) */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+20px)] w-64 p-6 bg-white rounded-3xl shadow-2xl border border-gray-100 pointer-events-none hidden lg:block z-50"
                                                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                                >
                                                    <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: area.color }}>
                                                        {area.subtitle}
                                                    </div>
                                                    <ul className="space-y-3">
                                                        {area.examples.map((ex, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: area.color }} />
                                                                {ex}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
