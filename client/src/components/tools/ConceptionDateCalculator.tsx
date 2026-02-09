import React, { useState } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { format } from 'date-fns';
import { CalendarHeart, Info, HelpCircle, Activity, AlertCircle } from 'lucide-react';
import { calculateConception, ConceptionResult } from '../../api/toolsApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ConceptionCalculator() {
    // State
    const [method, setMethod] = useState<'DUE_DATE' | 'LMP'>('DUE_DATE');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [cycleLength, setCycleLength] = useState<number>(28);
    const [isIrregular, setIsIrregular] = useState<boolean>(false);
    const [dueDateConfidence, setDueDateConfidence] = useState<'DOCTOR' | 'ESTIMATED'>('DOCTOR');

    const [result, setResult] = useState<ConceptionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (!selectedDate) return;
        setLoading(true);
        setError(null);
        try {
            const data = await calculateConception(
                selectedDate,
                method,
                cycleLength,
                isIrregular,
                method === 'DUE_DATE' ? dueDateConfidence : null
            );
            setResult(data);
        } catch (err) {
            console.error("Failed to calculate", err);
            setError("Something went wrong. Please check your inputs and try again.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return (
        <ToolsLayout
            title="Conception Date Calculator"
            description="Estimate when your pregnancy likely began. This helpful tool gives you a probable conception window based on your cycle or due date."
            category="PREGNANT"
        >
            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <Tabs value={method} onValueChange={(val) => { setMethod(val as any); reset(); }} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="DUE_DATE">Based on Due Date</TabsTrigger>
                            <TabsTrigger value="LMP">Based on Last Period</TabsTrigger>
                        </TabsList>

                        <div className="space-y-4">
                            {method === 'DUE_DATE' ? (
                                <>
                                    <div className="space-y-2">
                                        <Label>Expected Due Date</Label>
                                        <div className="border rounded-md p-2">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                className="rounded-md border-0 w-full"
                                                initialFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>How was this date determined?</Label>
                                        <Select
                                            value={dueDateConfidence}
                                            onValueChange={(val: any) => setDueDateConfidence(val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DOCTOR">Given by Doctor (Ultrasound/Exam)</SelectItem>
                                                <SelectItem value="ESTIMATED">Self-Estimated</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">This helps us gauge the accuracy of the result.</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label>First Date of Last Period</Label>
                                        <div className="border rounded-md p-2">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                className="rounded-md border-0 w-full"
                                                initialFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label>Average Cycle Length</Label>
                                                <span className="text-sm font-medium text-purple-600">{cycleLength} Days</span>
                                            </div>
                                            <Input
                                                type="range"
                                                min="21"
                                                max="35"
                                                value={cycleLength}
                                                onChange={(e) => setCycleLength(parseInt(e.target.value))}
                                                className="cursor-pointer"
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>21 Days</span>
                                                <span>28 Days (Avg)</span>
                                                <span>35 Days</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 border p-3 rounded-lg bg-gray-50">
                                            <Switch
                                                id="irregular"
                                                checked={isIrregular}
                                                onCheckedChange={setIsIrregular}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <Label htmlFor="irregular" className="cursor-pointer">I have irregular cycles</Label>
                                                <p className="text-xs text-muted-foreground">
                                                    We'll widen the estimated window to be safe.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Tabs>

                    <Button
                        onClick={handleCalculate}
                        disabled={!selectedDate || loading}
                        className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                        size="lg"
                    >
                        {loading ? "Calculating..." : "Calculate Conception Date"}
                    </Button>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                    {result ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Main Result Card */}
                            <Card className="overflow-hidden border-rose-100 shadow-md">
                                <div className="bg-rose-50 p-6 border-b border-rose-100">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-rose-900 flex items-center gap-2">
                                            <CalendarHeart className="w-5 h-5" />
                                            Likely Conception Period
                                        </h3>
                                        <Badge variant={result.confidenceLevel === "High" ? "default" : "secondary"} className={
                                            result.confidenceLevel === "High" ? "bg-green-600 hover:bg-green-700" :
                                                result.confidenceLevel === "Medium" ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-500"
                                        }>
                                            {result.confidenceLevel} Confidence
                                        </Badge>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-3xl md:text-4xl font-bold text-rose-600">
                                            {format(new Date(result.conceptionWindowStart), 'MMM d')} – {format(new Date(result.conceptionWindowEnd), 'MMM d, yyyy')}
                                        </p>
                                        <p className="text-sm text-rose-700 mt-2 font-medium">
                                            Most probable date: {format(new Date(result.probableConceptionDate), 'MMMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <div className="flex gap-3 text-sm text-gray-700">
                                        <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                        <p>{result.explanation}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Timeline Visualization */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                                <h4 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-gray-500" />
                                    Timeline View
                                </h4>

                                {/* Simple Timeline CSS */}
                                <div className="relative pt-8 pb-4">
                                    <div className="absolute top-[2.4rem] left-0 w-full h-1 bg-gray-100 rounded-full"></div>

                                    <div className="flex justify-between items-start relative z-10 w-full">
                                        {/* Period Start (ONLY for LMP method) */}
                                        {method === 'LMP' && selectedDate && (
                                            <div className="flex flex-col items-center w-1/3">
                                                <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-sm mb-2"></div>
                                                <div className="text-xs font-semibold text-gray-500">Period Start</div>
                                                <div className="text-[10px] text-gray-400">{format(selectedDate, 'MMM d')}</div>
                                            </div>
                                        )}

                                        {/* Conception Window */}
                                        <div className="flex flex-col items-center w-1/3 mx-auto">
                                            <div className="w-full h-4 rounded-full bg-rose-200 opacity-50 absolute top-[0.6rem] -z-10 blur-sm transform scale-x-150"></div>
                                            <div className="w-6 h-6 rounded-full bg-rose-500 border-4 border-white shadow-md mb-1 flex items-center justify-center">
                                                <HeartIcon className="w-3 h-3 text-white fill-current" />
                                            </div>
                                            <div className="text-xs font-bold text-rose-600">Conception</div>
                                            <div className="text-[10px] text-rose-400 font-medium">~{format(new Date(result.probableConceptionDate), 'MMM d')}</div>
                                        </div>

                                        {/* Due Date (ONLY for Due Date Method context, but user knows this) */}
                                        {method === 'DUE_DATE' && selectedDate && (
                                            <div className="flex flex-col items-center w-1/3">
                                                <div className="w-4 h-4 rounded-full bg-purple-300 border-2 border-white shadow-sm mb-2"></div>
                                                <div className="text-xs font-semibold text-purple-500">Due Date</div>
                                                <div className="text-[10px] text-purple-400">{format(selectedDate, 'MMM d')}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div className="text-xs text-blue-800 leading-relaxed">
                                    <span className="font-semibold block mb-1">Please Note:</span>
                                    This calculator provides an estimate based on medical averages. Every pregnancy is unique. This tool is not a substitute for professional medical advice or ultrasound dating.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                                <CalendarHeart className="w-8 h-8 text-rose-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to find out?</h3>
                            <p className="text-gray-500 max-w-xs mx-auto text-sm">
                                Enter your details on the left to estimate when your little one was conceived.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ToolsLayout>
    );
}

function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}
