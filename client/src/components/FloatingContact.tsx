import React, { useState, useCallback, useRef } from 'react';
import { UserPlus, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { cn } from '../lib/utils';

interface FloatingContactProps {
    onOpenLeadForm: () => void;
}

export default function FloatingContact({ onOpenLeadForm }: FloatingContactProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDir, setOpenDir] = useState<'down' | 'up'>('down');
    const pillRef = useRef<HTMLDivElement>(null);
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

    const handleExpand = () => {
        if (pillRef.current) {
            const rect = pillRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenDir(spaceBelow < 160 ? 'up' : 'down');
        }
        setIsExpanded(true);
    };

    const pillRounding = side === 'right' ? 'rounded-l-full' : 'rounded-r-full';
    const pillPadding = side === 'right' ? 'pl-1 pr-0' : 'pr-1 pl-0';

    return (
        <motion.div
            ref={pillRef}
            drag
            dragMomentum={false}
            dragElastic={0.05}
            onDragEnd={snapToEdge}
            style={{ x, y, touchAction: 'none', top: '83%', zIndex: 9997 }}
            className="fixed right-0 cursor-grab active:cursor-grabbing"
        >
            {/* Collapsed Pill */}
            <button
                onClick={handleExpand}
                className={cn(
                    "group relative flex items-center transition-all duration-300",
                    isExpanded && "pointer-events-none opacity-0"
                )}
            >
                <div className={cn(
                    "relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-purple-500 to-indigo-600",
                    pillRounding
                )}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={cn("relative flex items-center py-1", pillPadding)}>
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/25 backdrop-blur-sm flex items-center justify-center">
                            <UserPlus className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="w-1.5 md:w-3" />
                    </div>
                </div>
            </button>

            {/* Expanded Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="expanded-panel"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute"
                        style={{
                            ...(side === 'right' ? { right: 0 } : { left: 0 }),
                            ...(openDir === 'down' ? { top: 0 } : { bottom: 0 }),
                        }}
                    >
                        <div className="bg-white shadow-2xl border border-gray-200/80 overflow-hidden w-[180px] rounded-2xl">
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-2.5 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                                    <UserPlus className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-white font-bold text-xs flex-1">Get in Touch</span>
                                <button onClick={() => setIsExpanded(false)} className="text-white/70 hover:text-white">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="p-2.5">
                                <p className="text-[10px] text-gray-400 mb-2">Our team is here to help</p>
                                <button
                                    onClick={() => { setIsExpanded(false); onOpenLeadForm(); }}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold hover:shadow-lg transition-all"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
