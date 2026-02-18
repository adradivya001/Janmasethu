import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Compass } from 'lucide-react';

const HeartIcon = ({ className, style }: { className?: string, style?: any }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const LanguageIcon = ({ className, style }: { className?: string, style?: any }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
    </svg>
);

const supportAreas = [
    {
        icon: HeartIcon,
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
        icon: Compass,
        title: "Family planning",
        subtitle: "decisions",
        examples: ["Treatment options explained", "Financial planning help", "Partner communication"],
        color: "#8B5CF6",
        angle: 135 // Bottom Left
    },
    {
        icon: LanguageIcon,
        title: "Language Support",
        subtitle: "language",
        examples: ["Traditional practices guidance", "Multi-language support", "Community connection"],
        color: "#F59E0B",
        angle: 225 // Top Left
    }
];

export function SpecificWays() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-32 bg-[#FAFBFF] overflow-visible min-h-[800px] flex items-center">
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
                        </motion.div>
                    </div>

                    {/* Right: The Orbital Interface */}
                    <div className="relative w-full lg:w-2/3 h-[500px] md:h-[600px] flex items-center justify-center">

                        {/* Orbiting Paths (Visual only) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-dashed border-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />
                            <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] border border-dashed border-[#EC4899]/10 rounded-full animate-[spin_40s_linear_reverse_infinite]" />
                        </div>

                        {/* Central Hub - Shows "Sakhi" or Active Info on small screens */}
                        <motion.div
                            className="relative z-20 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-primary/5"
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
                            <AnimatePresence mode="wait">
                                {hoveredIndex === null ? (
                                    <motion.span
                                        key="sakhi-text"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-primary to-[#EC4899] bg-clip-text text-transparent"
                                    >
                                        Sakhi
                                    </motion.span>
                                ) : (
                                    <motion.div
                                        key="active-info"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="text-center px-4"
                                    >
                                        <div className="text-[10px] font-bold uppercase tracking-tighter mb-1" style={{ color: supportAreas[hoveredIndex].color }}>
                                            {supportAreas[hoveredIndex].subtitle.split(' ')[0]}
                                        </div>
                                        <div className="text-xs font-bold leading-tight text-gray-800">
                                            {supportAreas[hoveredIndex].title}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Orbiting Interaction Nodes */}
                        {supportAreas.map((area, index) => {
                            const isSelected = hoveredIndex === index;
                            const distance = (window.innerWidth < 768) ? 140 : 210;
                            const rad = (area.angle * Math.PI) / 180;

                            // Determine tooltip placement: Flip to left if on the right side of the hub
                            const isRightSide = Math.cos(rad) > 0;

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute cursor-pointer"
                                    style={{ zIndex: isSelected ? 100 : 30 }}
                                    animate={{
                                        x: Math.cos(rad) * distance,
                                        y: Math.sin(rad) * distance,
                                        opacity: isSelected ? 1 : 0.6,
                                        scale: isSelected ? 1.15 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => setHoveredIndex(index)}
                                >
                                    {/* The Bubble Node */}
                                    <div className="relative group/node">
                                        <motion.div
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-2 transition-colors duration-300"
                                            style={{ borderColor: isSelected ? area.color : "transparent" }}
                                            animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                                        >
                                            <area.icon className="w-8 h-8 md:w-9 md:h-9" style={{ color: area.color }} />
                                        </motion.div>

                                        {/* Label */}
                                        <div className={`absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-center transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}`}>
                                            <p className="font-bold text-gray-900 text-sm md:text-base leading-none">{area.title}</p>
                                        </div>

                                        {/* Unified Card Tooltip (Mobile & Desktop) */}
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    className={`absolute top-1/2 -translate-y-1/2 ${window.innerWidth < 640 ? 'fixed left-1/2 -translate-x-1/2 w-[80vw] max-w-[240px] p-4 rounded-[1.25rem]' : (isRightSide ? 'right-[calc(100%+24px)]' : 'left-[calc(100%+24px)]') + ' w-72 p-6 rounded-[2rem]'} bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 pointer-events-none z-[110]`}
                                                    initial={{ opacity: 0, x: window.innerWidth < 640 ? '-50%' : (isRightSide ? 20 : -20), scale: 0.9 }}
                                                    animate={{ opacity: 1, x: window.innerWidth < 640 ? '-50%' : 0, scale: 1 }}
                                                    exit={{ opacity: 0, x: window.innerWidth < 640 ? '-50%' : (isRightSide ? 20 : -20), scale: 0.9 }}
                                                >
                                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                                        <div className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gray-50">
                                                            <area.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: area.color }} />
                                                        </div>
                                                        <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-none" style={{ color: area.color }}>
                                                            {area.subtitle}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-4 leading-tight">{area.title}</h4>
                                                    <ul className="space-y-2 md:space-y-3">
                                                        {area.examples.map((ex, i) => (
                                                            <li key={i} className="text-xs md:text-sm text-gray-600 flex items-center gap-2 leading-tight">
                                                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full shrink-0" style={{ backgroundColor: area.color }} />
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
