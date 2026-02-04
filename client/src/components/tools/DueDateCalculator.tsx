
import React, { useState } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { addDays, format, differenceInWeeks } from 'date-fns';
import { Baby, CalendarRange } from 'lucide-react';
import { Card } from '../ui/card';

export default function DueDateCalculator() {
    const [lmp, setLmp] = useState<Date | undefined>(undefined);
    const [result, setResult] = useState<{
        dueDate: Date;
        weeksPregnant: number;
        trimester: number;
    } | null>(null);

    const calculate = () => {
        if (!lmp) return;

        const dueDate = addDays(lmp, 280); // 40 weeks
        const weeksPregnant = differenceInWeeks(new Date(), lmp);

        let trimester = 1;
        if (weeksPregnant >= 13 && weeksPregnant < 27) trimester = 2;
        if (weeksPregnant >= 27) trimester = 3;

        setResult({
            dueDate,
            weeksPregnant: Math.max(0, weeksPregnant),
            trimester
        });
    };

    return (
        <ToolsLayout
            title="Due Date Calculator"
            description="Find out your baby's due date and how far along you are."
            category="PREGNANT"
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>First day of your last period</Label>
                        <div className="border rounded-md p-2">
                            <Calendar
                                mode="single"
                                selected={lmp}
                                onSelect={setLmp}
                                initialFocus
                                className="rounded-md border-0 w-full"
                            />
                        </div>
                    </div>
                    <Button
                        onClick={calculate}
                        disabled={!lmp}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                        Calculate Due Date
                    </Button>
                </div>

                <div>
                    {result ? (
                        <div className="space-y-6 animate-in zoom-in-95 duration-500">
                            <Card className="p-8 bg-gradient-to-br from-purple-50 to-white border-purple-100 text-center">
                                <div className="inline-flex bg-white p-4 rounded-full shadow-sm text-purple-500 mb-4">
                                    <Baby className="w-8 h-8" />
                                </div>
                                <h3 className="text-gray-500 font-medium uppercase tracking-wide text-sm">Your Estimated Due Date</h3>
                                <div className="text-4xl md:text-5xl font-bold text-purple-700 my-4">
                                    {format(result.dueDate, 'MMMM d, yyyy')}
                                </div>
                            </Card>

                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4 bg-white border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Current Status</div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {result.weeksPregnant} <span className="text-base font-normal text-gray-500">Weeks</span>
                                    </div>
                                </Card>
                                <Card className="p-4 bg-white border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Trimester</div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {result.trimester === 1 ? '1st' : result.trimester === 2 ? '2nd' : '3rd'}
                                    </div>
                                </Card>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-xl text-sm text-purple-800 flex items-start gap-3">
                                <CalendarRange className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p>
                                    This date is an estimate. Only about 5% of babies are born exactly on their due date. Most arrive within two weeks before or after!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 border-2 border-dashed rounded-xl">
                            <CalendarRange className="w-12 h-12 mb-4 opacity-20" />
                            <p>Select a date to see when you'll meet your little one.</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolsLayout>
    );
}
