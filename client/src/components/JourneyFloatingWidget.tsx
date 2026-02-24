import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useJourney } from '../contexts/JourneyContext';
import { JourneyStage, JOURNEY_LABELS } from '../lib/journey';
import { X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { cn } from '../lib/utils';

// ─── Snap-to-edge hook ───
function useSnapToEdge() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [side, setSide] = useState<'right' | 'left'>('right');

    const snapToEdge = useCallback(() => {
        const currentX = x.get();
        const pillW = 52;
        const screenW = window.innerWidth;
        const centerX = screenW + currentX - pillW / 2;

        if (centerX < screenW / 2) {
            animate(x, -(screenW - pillW), { type: "spring", stiffness: 300, damping: 30 });
            setSide('left');
        } else {
            animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
            setSide('right');
        }
    }, [x]);

    return { x, y, side, snapToEdge };
}


// ─── Individual Pill Widget ───
function StagePill({ stage, index }: { stage: JourneyStage; index: number }) {
    const { journey, clearJourney, openSelector } = useJourney();
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDir, setOpenDir] = useState<'down' | 'up'>('down');
    const pillRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { x, y, side, snapToEdge } = useSnapToEdge();
    const isActive = journey?.stage === stage;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const topOffset = isMobile ? 46 + index * 8 : 28 + index * 7;

    const config = {
        TTC: {
            icon: "/thinking of parenthood.png",
            label: "Trying to Conceive",
            hoverLabel: "Conceive",
            gradient: "from-pink-400 to-rose-500",
            activeBorder: "border-pink-300",
            activeText: "text-pink-600",
            activeBg: "bg-pink-50",
            glowColor: "rgba(244, 63, 94, 0.6)" // rose-500
        },
        PREGNANT: {
            icon: "/Pregnancy.png",
            label: "Pregnant",
            hoverLabel: "Pregnant",
            gradient: "from-purple-400 to-violet-500",
            activeBorder: "border-purple-300",
            activeText: "text-purple-600",
            activeBg: "bg-purple-50",
            glowColor: "rgba(139, 92, 246, 0.6)" // violet-500
        },
        PARENT: {
            icon: "/Post-delivery.png",
            label: "Parent",
            hoverLabel: "Parent",
            gradient: "from-blue-400 to-indigo-500",
            activeBorder: "border-blue-300",
            activeText: "text-blue-600",
            activeBg: "bg-blue-50",
            glowColor: "rgba(99, 102, 241, 0.6)" // indigo-500
        },
    }[stage];

    const handleClick = () => {
        if (isActive) {
            // Check if near bottom of screen
            if (pillRef.current) {
                const rect = pillRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                setOpenDir(spaceBelow < 200 ? 'up' : 'down');
            }
            setIsExpanded(true);
        } else {
            openSelector(stage);
        }
    };

    const sideClass = side === 'right' ? 'side-right' : 'side-left';
    const pillRounding = side === 'right' ? 'rounded-l-full' : 'rounded-r-full';
    const flexDirection = side === 'right' ? 'flex-row' : 'flex-row-reverse';
    const pillPadding = side === 'right' ? 'pl-1 pr-0' : 'pr-1 pl-0';

    return (
        <motion.div
            ref={pillRef}
            drag
            dragMomentum={false}
            dragElastic={0.05}
            onDragEnd={snapToEdge}
            style={{ x, y, touchAction: 'none', top: `${topOffset}%`, zIndex: 9991 + index }}
            className="fixed right-0 cursor-grab active:cursor-grabbing"
        >
            {/* Collapsed Pill — always visible when not expanded */}
            <button
                onClick={handleClick}
                style={{ "--glow-color": config.glowColor } as React.CSSProperties}
                className={cn(
                    "group relative flex items-center transition-all duration-300 outline-none",
                    isExpanded && isActive && "pointer-events-none opacity-0"
                )}
            >
                <div className={cn(
                    "widget-pill widget-glow relative overflow-hidden shadow-lg border border-white/20",
                    "bg-gradient-to-b", config.gradient,
                    pillRounding, sideClass,
                    isActive && "ring-2 ring-white"
                )}>
                    {/* Shimmer Sweep Elements */}
                    <div className="widget-shimmer" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className={cn("relative flex items-center py-1", pillPadding, flexDirection)}>
                        {/* Icon */}
                        <div className={cn(
                            "widget-icon w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/25 backdrop-blur-sm shadow-inner",
                            isActive && "ring-2 ring-white/60"
                        )}>
                            <img src={config.icon} alt={stage} className="w-full h-full object-contain p-1" />
                        </div>

                        <div className="widget-label-container flex items-center justify-center">
                            <span className="text-white font-semibold text-[13px] md:text-[15px] leading-none tracking-normal drop-shadow-sm pb-[1px]">
                                {config.hoverLabel}
                            </span>
                        </div>

                        {/* Active Dot / Spacer */}
                        <div className="w-1.5 md:w-3 flex items-center justify-center">
                            {isActive && <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white animate-pulse" />}
                        </div>
                    </div>
                </div>
            </button>

            {/* Expanded Panel — positioned relative to pill */}
            <AnimatePresence>
                {isExpanded && isActive && (
                    <motion.div
                        key="expanded-panel"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute"
                        style={{
                            // Horizontal: on right side, panel goes left; on left side, panel goes right
                            ...(side === 'right' ? { right: 0 } : { left: 0 }),
                            // Vertical: open down normally, open up if near bottom
                            ...(openDir === 'down' ? { top: 0 } : { bottom: 0 }),
                        }}
                    >
                        <div className={cn(
                            "bg-white shadow-2xl border border-gray-200/80 overflow-hidden w-[180px]",
                            "rounded-2xl"
                        )}>
                            <div className={cn("bg-gradient-to-r", config.gradient, "px-3 py-2.5 flex items-center gap-2")}>
                                <div className="w-8 h-8 rounded-full bg-white/25 overflow-hidden flex-shrink-0">
                                    <img src={config.icon} alt={stage} className="w-full h-full object-contain p-0.5" />
                                </div>
                                <span className="text-white font-bold text-xs flex-1">{config.label}</span>
                                <button onClick={() => setIsExpanded(false)} className="text-white/70 hover:text-white">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="p-2.5 space-y-1.5">
                                <p className="text-[10px] text-gray-400">Currently active journey stage</p>
                                <button
                                    onClick={() => { clearJourney(); setIsExpanded(false); }}
                                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100"
                                >
                                    Remove Personalization
                                </button>
                                <button
                                    onClick={() => { openSelector(stage); setIsExpanded(false); }}
                                    className={cn("w-full text-xs font-semibold px-3 py-2 rounded-xl transition-colors border", config.activeBg, config.activeText, config.activeBorder)}
                                >
                                    Change Stage
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}


// ─── Main Export ───
export function JourneyFloatingWidget() {
    const { showSelector } = useJourney();
    if (showSelector) return null;
    const stages: JourneyStage[] = ['TTC', 'PREGNANT', 'PARENT'];
    return (
        <>
            {stages.map((stage, index) => (
                <StagePill key={stage} stage={stage} index={index} />
            ))}
        </>
    );
}
