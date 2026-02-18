import React, { useState } from 'react';
import { ToolsLayout } from './ToolsLayout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { AlertCircle, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { checkPregnancyProbability, AmIPregnantRequest, AmIPregnantResult } from '../../api/toolsApi';
import { Badge } from "@/components/ui/badge";

const QUESTIONS = [
    {
        id: 'q1_period',
        question: 'Is your period late?',
        options: [
            { value: 'LATE_5_PLUS', label: 'Yes, more than 5 days late' },
            { value: 'LATE_1_4', label: 'A little late (1–4 days)' },
            { value: 'NO', label: 'No / Not yet' },
            { value: 'NOT_SURE', label: 'I’m not sure' }
        ]
    },
    {
        id: 'q2_sex',
        question: 'Did you have unprotected physical intimacy around your fertile days?',
        options: [
            { value: 'YES', label: 'Yes' },
            { value: 'NOT_SURE', label: 'Not sure' },
            { value: 'NO', label: 'No' }
        ]
    },
    {
        id: 'q3_spotting',
        question: 'Have you noticed any unusual bleeding or spotting?',
        options: [
            { value: 'YES_LIGHT', label: 'Yes, light spotting (pink/brown)' },
            { value: 'YES_HEAVY', label: 'Yes, but heavier than spotting' },
            { value: 'NO', label: 'No' }
        ]
    },
    {
        id: 'q4_symptoms',
        question: 'Have you experienced any of these symptoms recently?',
        subtext: '(Nausea, fatigue, breast tenderness, frequent urination)',
        options: [
            { value: 'NONE', label: 'None' },
            { value: 'ONE_TWO', label: 'One or two symptoms' },
            { value: 'SEVERAL', label: 'Several symptoms' }
        ]
    },
    {
        id: 'q5_test',
        question: 'Have you taken a home pregnancy test?',
        options: [
            { value: 'POSITIVE', label: 'Yes, it was positive' },
            { value: 'NEGATIVE', label: 'Yes, it was negative' },
            { value: 'UNCLEAR', label: 'Yes, result was unclear' },
            { value: 'NO', label: 'No' }
        ]
    }
];

export default function AmIPregnant() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<AmIPregnantRequest>>({});
    const [result, setResult] = useState<AmIPregnantResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnswer = (value: string) => {
        const currentQ = QUESTIONS[step];
        const newAnswers = { ...answers, [currentQ.id]: value };
        setAnswers(newAnswers);
    };

    const handleNext = async () => {
        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            // Submit
            setLoading(true);
            try {
                const res = await checkPregnancyProbability(answers as AmIPregnantRequest);
                setResult(res);
            } catch (error) {
                console.error("Failed to check pregnancy", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setResult(null);
    };

    const currentQuestion = QUESTIONS[step];
    const isLastQuestion = step === QUESTIONS.length - 1;
    const canProceed = answers[currentQuestion.id as keyof AmIPregnantRequest] !== undefined;

    return (
        <ToolsLayout
            title="Am I Pregnant?"
            description="Take this quick 5-question assessment to understand the likelihood of pregnancy based on your symptoms."
            category="TTC"
        >
            <div className="max-w-2xl mx-auto">
                {!result ? (
                    <Card className="p-6 md:p-8 bg-white border-purple-100 shadow-sm">
                        {/* Progress */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                                <span>Question {step + 1} of {QUESTIONS.length}</span>
                                <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="space-y-6 min-h-[300px] flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                                    {currentQuestion.question}
                                </h3>
                                {currentQuestion.subtext && (
                                    <p className="text-gray-500 mb-4">{currentQuestion.subtext}</p>
                                )}

                                <RadioGroup
                                    value={answers[currentQuestion.id as keyof AmIPregnantRequest] as string}
                                    onValueChange={handleAnswer}
                                    className="space-y-3 mt-6"
                                >
                                    {currentQuestion.options.map((opt) => (
                                        <div key={opt.value} className="flex items-center space-x-3 space-y-0">
                                            <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
                                            <Label
                                                htmlFor={opt.value}
                                                className="flex flex-1 items-center justify-between rounded-lg border-2 border-gray-100 bg-white p-4 hover:bg-purple-50 hover:border-purple-200 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 cursor-pointer transition-all"
                                            >
                                                {opt.label}
                                                {answers[currentQuestion.id as keyof AmIPregnantRequest] === opt.value && (
                                                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                                )}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={!canProceed || loading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                            >
                                {loading ? "Analyzing..." : isLastQuestion ? "See Result" : "Next Question"}
                                {!loading && !isLastQuestion && <ArrowRight className="ml-2 w-5 h-5" />}
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-6 animate-in zoom-in-95 duration-500">
                        <Card className={`p-8 text-center border-t-8 shadow-lg ${result.result === 'VERY_LIKELY' ? 'border-t-green-500 bg-green-50/30' :
                            result.result === 'POSSIBLY' ? 'border-t-yellow-500 bg-yellow-50/30' :
                                result.result === 'UNLIKELY' ? 'border-t-blue-500 bg-blue-50/30' :
                                    'border-t-gray-500 bg-gray-50/30'
                            }`}>
                            <div className="mb-6 flex justify-center">
                                <Badge className={`text-lg px-4 py-1 ${result.result === 'VERY_LIKELY' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                    result.result === 'POSSIBLY' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                                        result.result === 'UNLIKELY' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                            'bg-gray-100 text-gray-800 hover:bg-gray-100'
                                    }`}>
                                    {result.result.replace('_', ' ')}
                                </Badge>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                {result.copy}
                            </h3>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 text-left space-y-4 max-w-md mx-auto shadow-sm">
                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-purple-500" />
                                    Recommended Next Steps
                                </h4>
                                <ul className="space-y-3">
                                    {result.nextGuidance.map((step, i) => (
                                        <li key={i} className="flex gap-3 text-gray-700 text-sm">
                                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                                {i + 1}
                                            </div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button onClick={reset} variant="outline" className="mt-8">
                                Start Over
                            </Button>
                        </Card>

                        {/* Mandatory Disclaimer */}
                        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3 text-left border border-gray-200">
                            <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-500">
                                <strong>Important:</strong> This tool gives an estimate based on your answers and does not replace a professional pregnancy test or medical advice. If you are unsure, please consult a doctor.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolsLayout>
    );
}
