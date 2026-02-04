
import React, { useState } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { addWeeks, addMonths, addYears, format } from 'date-fns';
import { Syringe, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../ui/card';

// Simplified IAP Schedule
const VACCINES = [
    { age: 'Birth', offset: { days: 0 }, items: ['BCG', 'OPV Zero dose', 'Hep-B Birth dose'] },
    { age: '6 Weeks', offset: { weeks: 6 }, items: ['DTwP/DTaP-1', 'IPV-1', 'Hep-B-2', 'Hib-1', 'Rotavirus-1', 'PCV-1'] },
    { age: '10 Weeks', offset: { weeks: 10 }, items: ['DTwP/DTaP-2', 'IPV-2', 'Hib-2', 'Rotavirus-2', 'PCV-2'] },
    { age: '14 Weeks', offset: { weeks: 14 }, items: ['DTwP/DTaP-3', 'IPV-3', 'Hib-3', 'Rotavirus-3', 'PCV-3'] },
    { age: '6 Months', offset: { months: 6 }, items: ['Influenza-1', 'Typhoid Conjugate Vaccine'] },
    { age: '9 Months', offset: { months: 9 }, items: ['MMR-1', 'Meningococcal (Optional)'] },
    { age: '12 Months', offset: { months: 12 }, items: ['Hep-A-1', 'Japanese Encephalitis-1 (Endemic areas)'] },
    { age: '15 Months', offset: { months: 15 }, items: ['MMR-2', 'Varicella-1', 'PCV-Booster'] },
    { age: '18 Months', offset: { months: 18 }, items: ['DTwP/DTaP-B1', 'IPV-B1', 'Hib-B1'] },
    { age: '2 Years', offset: { years: 2 }, items: ['Typhoid Booster', 'Influenza (Annual)'] },
    { age: '4-6 Years', offset: { years: 5 }, items: ['DTwP/DTaP-Booster-2', 'MMR-3', 'Varicella-2'] },
];

export default function VaccinationScheduler() {
    const [dob, setDob] = useState<Date | undefined>(undefined);
    const [schedule, setSchedule] = useState<any[] | null>(null);

    const generateSchedule = () => {
        if (!dob) return;

        const newSchedule = VACCINES.map(stage => {
            let dueDate = dob;
            if (stage.offset.days) dueDate = addWeeks(dob, 0); // essentially same day
            if (stage.offset.weeks) dueDate = addWeeks(dob, stage.offset.weeks);
            if (stage.offset.months) dueDate = addMonths(dob, stage.offset.months);
            if (stage.offset.years) dueDate = addYears(dob, stage.offset.years);

            return {
                ...stage,
                dueDate,
                isPast: dueDate < new Date()
            };
        });

        setSchedule(newSchedule);
    };

    return (
        <ToolsLayout
            title="Vaccination Scheduler"
            description="Keep track of your child's immunizations with the IAP recommended schedule."
            category="PARENT"
        >
            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 xl:col-span-5 space-y-6 flex justify-center">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-fit h-fit">
                        <Label className="text-blue-900 font-bold text-xl text-center block mb-6">Child's Date of Birth</Label>
                        <div className="flex flex-col gap-6">
                            <Calendar
                                mode="single"
                                selected={dob}
                                onSelect={setDob}
                                className="rounded-md"
                                captionLayout="dropdown-buttons"
                                fromYear={2015}
                                toYear={2030}
                            />
                            <Button
                                onClick={generateSchedule}
                                disabled={!dob}
                                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold shadow-md active:scale-95 transition-all"
                            >
                                Generate Schedule
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    {schedule ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-xl text-gray-800">Your Personal Schedule</h3>
                                <Button variant="outline" size="sm" onClick={() => window.print()}>
                                    Print / PDF
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {schedule.map((slot, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative pl-8 pb-8 border-l-2 ${slot.isPast ? 'border-green-300' : 'border-gray-200'}`}
                                    >
                                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${slot.isPast ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                                            }`} />

                                        <div className={`p-4 rounded-xl border ${slot.isPast ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100 shadow-sm'
                                            }`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="font-bold text-lg text-gray-800">{slot.age}</div>
                                                    <div className={`text-sm font-medium ${slot.isPast ? 'text-green-700' : 'text-blue-600'}`}>
                                                        Due: {format(slot.dueDate, 'MMMM d, yyyy')}
                                                    </div>
                                                </div>
                                                {slot.isPast ? (
                                                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                        <CheckCircle2 className="w-3 h-3" /> PAST DUE
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                        <Clock className="w-3 h-3" /> UPCOMING
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-1 mt-3">
                                                {slot.items.map((v: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Syringe className="w-4 h-4 text-gray-400" />
                                                        {v}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 border-2 border-dashed rounded-xl bg-gray-50/50">
                            <Syringe className="w-12 h-12 mb-4 opacity-20" />
                            <p>Enter your child's birth date to see a customized vaccination timeline.</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolsLayout>
    );
}
