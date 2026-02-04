import React, { useState } from 'react';
import { useJourney } from '../contexts/JourneyContext';
import { JourneyStage, JOURNEY_LABELS } from '../lib/journey';
import { Baby, Heart, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export function JourneyFloatingWidget() {
    const { journey, setJourney, clearJourney, showSelector, setShowSelector } = useJourney();
    const [hoveredStage, setHoveredStage] = useState<JourneyStage | null>(null);

    // Don't show if the main modal is open
    if (showSelector) return null;

    const stages: JourneyStage[] = ['TTC', 'PREGNANT', 'PARENT'];

    const getIcon = (stage: JourneyStage) => {
        switch (stage) {
            case 'TTC': return <img src="/thinking of parenthood.png" alt="TTC" className="w-full h-full object-contain p-1 rounded-full" />;
            case 'PREGNANT': return <img src="/Pregnancy.png" alt="Pregnant" className="w-full h-full object-contain p-1 rounded-full" />;
            case 'PARENT': return <img src="/Post-delivery.png" alt="Parent" className="w-full h-full object-contain p-1 rounded-full" />;
        }
    };

    const getColor = (stage: JourneyStage, isActive: boolean) => {
        if (!isActive && journey) return 'bg-gray-100 text-gray-400 hover:bg-gray-200'; // Dim others if one is selected

        switch (stage) {
            case 'TTC': return 'bg-pink-500 hover:bg-pink-600 text-white';
            case 'PREGNANT': return 'bg-purple-500 hover:bg-purple-600 text-white';
            case 'PARENT': return 'bg-blue-500 hover:bg-blue-600 text-white';
        }
    };

    const handleSelect = (stage: JourneyStage) => {
        // If clicking the already selected one, do nothing (removal is via hover button)
        if (journey?.stage === stage) return;

        // Otherwise open selector for that stage (or just set it if we want to skip date)
        // For now, let's open the selector to let them confirm date
        setShowSelector(true);
    };

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 items-end pointer-events-none">
            {/* Wrapper to allow pointer events only on buttons */}
            <div className="pointer-events-auto flex flex-col gap-4">
                {stages.map((stage, index) => {
                    const isActive = journey?.stage === stage;

                    return (
                        <motion.div
                            key={stage}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-center justify-end group"
                            onMouseEnter={() => setHoveredStage(stage)}
                            onMouseLeave={() => setHoveredStage(null)}
                        >
                            {/* Remove Button (Only for Active, on Hover) */}
                            <AnimatePresence>
                                {isActive && hoveredStage === stage && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, x: -8, scale: 1 }}
                                        exit={{ opacity: 0, x: 10, scale: 0.8 }}
                                        className="absolute right-full mr-2 z-50 pointer-events-auto"
                                    >
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearJourney();
                                            }}
                                            className="h-8 px-3 text-xs shadow-lg whitespace-nowrap rounded-full font-medium bg-red-500 hover:bg-red-600 border border-red-600"
                                        >
                                            Remove
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Label Tooltip (For inactive ones or when no selection) */}
                            <AnimatePresence>
                                {!isActive && hoveredStage === stage && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: -10 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="absolute right-full mr-2 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100 text-xs font-semibold text-gray-700 whitespace-nowrap"
                                    >
                                        {JOURNEY_LABELS[stage]}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Main Circle Button */}
                            <motion.button
                                onClick={() => handleSelect(stage)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "h-16 w-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative z-10",
                                    getColor(stage, isActive),
                                    isActive ? "h-20 w-20 ring-4 ring-white shadow-xl shadow-purple-500/20" : "opacity-80 hover:opacity-100"
                                )}
                            >
                                {getIcon(stage)}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
