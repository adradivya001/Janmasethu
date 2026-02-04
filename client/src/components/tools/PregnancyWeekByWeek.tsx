
import React, { useState, useEffect } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { pregnancyWeeks, PregnancyWeek } from '../../data/pregnancyWeeks';
import { ChevronLeft, ChevronRight, Ruler, Weight } from 'lucide-react';
import { differenceInWeeks, addWeeks, subWeeks, format } from 'date-fns';
import { useJourney } from '../../contexts/JourneyContext';

export default function PregnancyWeekByWeek() {
    const { journey } = useJourney();
    const [currentWeek, setCurrentWeek] = useState<number>(4);
    const [weekData, setWeekData] = useState<PregnancyWeek>(pregnancyWeeks[0]);

    useEffect(() => {
        // If user has a pregnancy journey, auto-set the week
        if (journey?.stage === 'PREGNANT' && journey.date) {
            // journey.date is strictly typed as string in context, but logic assumes it's Due Date or LMP
            // Simplified logic: If date is in future, it's Due Date. If past, it's LMP.
            const date = new Date(journey.date);
            const now = new Date();
            let week = 4;

            if (date > now) {
                // It's a due date
                const totalWeeks = 40;
                const weeksLeft = differenceInWeeks(date, now);
                week = totalWeeks - weeksLeft;
            } else {
                // It's LMP
                week = differenceInWeeks(now, date);
            }

            // Clamp between 4 and 40
            week = Math.max(4, Math.min(40, week));
            setCurrentWeek(week);
        }
    }, [journey]);

    useEffect(() => {
        const data = pregnancyWeeks.find(w => w.week === currentWeek);
        if (data) setWeekData(data);
    }, [currentWeek]);

    const nextWeek = () => {
        if (currentWeek < 40) setCurrentWeek(w => w + 1);
    };

    const prevWeek = () => {
        if (currentWeek > 4) setCurrentWeek(w => w - 1);
    };

    return (
        <ToolsLayout
            title="Pregnancy Week by Week"
            description="Follow your baby's development with our weekly fruit and veggie size comparisons."
            category="PREGNANT"
        >
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Visual Card */}
                <div className="flex-1">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-purple-100 relative">

                        {/* Navigation Header */}
                        <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevWeek}
                                disabled={currentWeek <= 4}
                                className="text-white hover:bg-white/20"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                            <h2 className="text-2xl font-bold">Week {currentWeek}</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextWeek}
                                disabled={currentWeek >= 40}
                                className="text-white hover:bg-white/20"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="mb-6 relative w-48 h-48 md:w-64 md:h-64">
                                <img
                                    src={`https://placehold.co/400x400/purple/white?text=${weekData.fruit}`}
                                    alt={weekData.fruit}
                                    className="w-full h-full object-cover rounded-full shadow-md border-4 border-purple-50"
                                />
                            </div>

                            <h3 className="text-lg text-gray-500 font-medium mb-2">Your baby is the size of a</h3>
                            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">{weekData.fruit}</h1>

                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
                                <div className="bg-purple-50 p-3 rounded-xl flex flex-col items-center">
                                    <span className="text-xs text-purple-600 uppercase font-bold mb-1">Length</span>
                                    <span className="text-xl font-bold text-gray-800">{weekData.size}</span>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-xl flex flex-col items-center">
                                    <span className="text-xs text-purple-600 uppercase font-bold mb-1">Weight</span>
                                    <span className="text-xl font-bold text-gray-800">{weekData.weight}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed max-w-xl">
                                {weekData.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Selector */}
                <div className="w-full md:w-64 bg-gray-50 rounded-xl p-4 h-fit max-h-[600px] overflow-y-auto border border-gray-100 custom-scrollbar">
                    <h3 className="font-bold text-gray-700 mb-4 px-2">Jump to Week</h3>
                    <div className="space-y-2">
                        {pregnancyWeeks.map((week) => (
                            <button
                                key={week.week}
                                onClick={() => setCurrentWeek(week.week)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex justify-between items-center ${currentWeek === week.week
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                                    }`}
                            >
                                <span>Week {week.week}</span>
                                <span className={`text-xs ${currentWeek === week.week ? 'text-purple-200' : 'text-gray-400'}`}>
                                    {week.fruit}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </ToolsLayout>
    );
}
