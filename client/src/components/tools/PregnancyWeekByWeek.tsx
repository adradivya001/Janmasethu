import React, { useState, useEffect } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useJourney } from '../../contexts/JourneyContext';
import { getPregnancyWeek, getAllPregnancyWeeks, PregnancyWeekData } from '../../api/toolsApi';

export default function PregnancyWeekByWeek() {
    const { journey } = useJourney();
    const [currentWeek, setCurrentWeek] = useState<number>(4);
    const [allWeeks, setAllWeeks] = useState<PregnancyWeekData[]>([]);
    const [weekData, setWeekData] = useState<PregnancyWeekData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all weeks data on mount
        const fetchWeeks = async () => {
            try {
                const data = await getAllPregnancyWeeks();
                setAllWeeks(data);
                // Default to first week if available
                if (data.length > 0) setWeekData(data[0]);
            } catch (error) {
                console.error("Failed to fetch pregnancy weeks", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeeks();
    }, []);

    useEffect(() => {
        // If user has a pregnancy journey, auto-set the week using backend calculation
        const determineWeek = async () => {
            if (journey?.stage === 'PREGNANT' && journey.date) {
                try {
                    // Assuming journey.date is what we used before (LMP or Due Date)
                    // We need to know if it is LMP or Due Date. 
                    // Previous logic guessed based on date > now.
                    // Let's rely on the same logic in backend or pass explicit type if we knew it.
                    // For now, pass 'LMP' or 'DUE_DATE' based on simple check or journey.date_type if available.
                    // Journey context/type might not have date_type readily available in top level type? 
                    // Let's assume we pass date and let backend or logic decide.
                    // Actually my backend API requires 'type'.

                    const dateObj = new Date(journey.date);
                    const isFuture = dateObj > new Date();
                    const type = (journey as any).date_type === 'DUE_DATE' || isFuture ? 'DUE_DATE' : 'LMP';

                    const result = await getPregnancyWeek(dateObj, type);
                    setCurrentWeek(result.currentWeek);
                } catch (error) {
                    console.error("Failed to calculate pregnancy week", error);
                }
            }
        };

        if (journey) {
            determineWeek();
        }
    }, [journey]);

    useEffect(() => {
        if (allWeeks.length > 0) {
            const data = allWeeks.find(w => w.week === currentWeek);
            if (data) setWeekData(data);
        }
    }, [currentWeek, allWeeks]);

    const nextWeek = () => {
        if (currentWeek < 40) setCurrentWeek(w => w + 1);
    };

    const prevWeek = () => {
        if (currentWeek > 4) setCurrentWeek(w => w - 1);
    };

    if (loading) {
        return <ToolsLayout title="Pregnancy Week by Week" description="Loading..." category="PREGNANT"><div>Loading...</div></ToolsLayout>;
    }

    if (!weekData) {
        return <ToolsLayout title="Pregnancy Week by Week" description="Error loading data." category="PREGNANT"><div>Error loading data.</div></ToolsLayout>;
    }

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
                        {allWeeks.map((week) => (
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
