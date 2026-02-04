
import React, { useState } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { format, addDays, subDays, differenceInDays } from 'date-fns';
import { Heart, Info } from 'lucide-react';

export default function OvulationCalculator() {
    const [lastPeriod, setLastPeriod] = useState<Date | undefined>(undefined);
    const [cycleLength, setCycleLength] = useState<number>(28);
    const [result, setResult] = useState<{
        ovulationDate: Date;
        fertileWindowStart: Date;
        fertileWindowEnd: Date;
        nextPeriod: Date;
    } | null>(null);

    const calculate = () => {
        if (!lastPeriod) return;

        // Logic: Ovulation occurs 14 days BEFORE the NEXT period starts
        const nextPeriodDate = addDays(lastPeriod, cycleLength);
        const ovulationDate = subDays(nextPeriodDate, 14);
        const fertileWindowStart = subDays(ovulationDate, 5);
        const fertileWindowEnd = ovulationDate; // Peak fertility is day of ovulation

        setResult({
            ovulationDate,
            fertileWindowStart,
            fertileWindowEnd,
            nextPeriod: nextPeriodDate
        });
    };

    return (
        <ToolsLayout
            title="Ovulation Calculator"
            description="Calculate your most fertile days to increase your chances of getting pregnant."
            category="TTC"
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>First day of your last period</Label>
                        <div className="border rounded-md p-2">
                            <Calendar
                                mode="single"
                                selected={lastPeriod}
                                onSelect={setLastPeriod}
                                className="rounded-md border-0 w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Average Length of Cycles</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                min={20}
                                max={45}
                                value={cycleLength}
                                onChange={(e) => setCycleLength(parseInt(e.target.value))}
                                className="w-24"
                            />
                            <span className="text-gray-500">Days (usually 28)</span>
                        </div>
                    </div>

                    <Button
                        onClick={calculate}
                        disabled={!lastPeriod}
                        className="w-full bg-pink-600 hover:bg-pink-700"
                    >
                        Calculate My Fertile Days
                    </Button>
                </div>

                <div>
                    {result ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="p-6 bg-pink-50 border-pink-100">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-3 rounded-full shadow-sm text-pink-500">
                                        <Heart className="w-6 h-6 fill-current" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-pink-900">Most Fertile Window</h3>
                                        <p className="text-3xl font-bold text-pink-600 my-2">
                                            {format(result.fertileWindowStart, 'MMM d')} - {format(result.fertileWindowEnd, 'MMM d')}
                                        </p>
                                        <p className="text-sm text-pink-700">
                                            Having sex during these days gives you the best chance of conceiving.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Ovulation Date</div>
                                    <div className="text-xl font-bold text-gray-800">{format(result.ovulationDate, 'MMM d, yyyy')}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Next Period</div>
                                    <div className="text-xl font-bold text-gray-800">{format(result.nextPeriod, 'MMM d, yyyy')}</div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-sm text-blue-800">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p>
                                    Did you know? You're most fertile the 5 days before ovulation and on the day of ovulation itself.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 border-2 border-dashed rounded-xl">
                            <Heart className="w-12 h-12 mb-4 opacity-20" />
                            <p>Enter your details to see your personalized fertility calendar.</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolsLayout>
    );
}
