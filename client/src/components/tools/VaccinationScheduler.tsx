
import React, { useState } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { format } from 'date-fns';
import { Syringe, CheckCircle2, Clock } from 'lucide-react';
import { getVaccinationSchedule, VaccinationStage } from '../../api/toolsApi';

export default function VaccinationScheduler() {
    const [dob, setDob] = useState<Date | undefined>(undefined);
    const [schedule, setSchedule] = useState<VaccinationStage[] | null>(null);
    const [loading, setLoading] = useState(false);

    const generateSchedule = async () => {
        if (!dob) return;
        setLoading(true);
        try {
            const data = await getVaccinationSchedule(dob);
            setSchedule(data);
        } catch (error) {
            console.error("Failed to generate schedule", error);
        } finally {
            setLoading(false);
        }
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
                                disabled={!dob || loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold shadow-md active:scale-95 transition-all"
                            >
                                {loading ? "Generating..." : "Generate Schedule"}
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
                                                        Due: {format(new Date(slot.dueDate), 'MMMM d, yyyy')}
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
