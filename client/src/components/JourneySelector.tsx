import React, { useState } from 'react';
import { useJourney } from '../contexts/JourneyContext';
import { JourneyStage, JOURNEY_LABELS } from '../lib/journey';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Baby, Heart, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function JourneySelector() {
    const { showSelector, setShowSelector, setJourney, clearJourney } = useJourney();
    const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null);
    const [date, setDate] = useState('');

    const handleStageSelect = (stage: JourneyStage) => {
        setSelectedStage(stage);
        setDate(''); // Reset date on stage switch
    };

    const handleSave = () => {
        if (selectedStage) {
            setJourney(selectedStage, date || undefined);
        }
    };

    // Icons for stages
    const getIcon = (stage: JourneyStage) => {
        switch (stage) {
            case 'TTC': return <img src="/thinking of parenthood.png" alt="TTC" className="w-12 h-12 object-contain" />;
            case 'PREGNANT': return <img src="/Pregnancy.png" alt="Pregnant" className="w-12 h-12 object-contain" />;
            case 'PARENT': return <img src="/Post-delivery.png" alt="Parent" className="w-12 h-12 object-contain" />;
        }
    };

    return (
        <Dialog open={showSelector} onOpenChange={setShowSelector}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-gray-800">
                        Current Stage of your Journey?
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        We'll personalize your experience based on this.
                    </DialogDescription>
                </DialogHeader>

                {!selectedStage ? (
                    <div className="grid grid-cols-1 gap-4 py-4">
                        {(Object.keys(JOURNEY_LABELS) as JourneyStage[]).map((stage) => (
                            <Card
                                key={stage}
                                className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
                                onClick={() => handleStageSelect(stage)}
                            >
                                <CardContent className="flex items-center p-4 gap-4">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        {getIcon(stage)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{JOURNEY_LABELS[stage]}</h3>
                                        <p className="text-sm text-gray-500">
                                            {stage === 'TTC' ? 'Planning & preparing' :
                                                stage === 'PREGNANT' ? 'Expecting a baby' : 'Raising a child'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="py-4 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedStage(null)}>
                                ← Back
                            </Button>
                            <h3 className="font-semibold">{JOURNEY_LABELS[selectedStage]}</h3>
                        </div>

                        <div className="space-y-4">
                            <Label>
                                {selectedStage === 'TTC'
                                    ? 'When did you start trying? (Optional)'
                                    : selectedStage === 'PREGNANT'
                                        ? 'Due Date or Last Period Date'
                                        : 'Baby\'s Date of Birth'}
                            </Label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="pl-10"
                                />
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
                                    Confirm & Personalize
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        clearJourney();
                                        setShowSelector(false);
                                    }}
                                    className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    Remove Personalization
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export function JourneyStickyHeader() {
    const { journey, setShowSelector } = useJourney();

    if (!journey) return null;

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-40 px-4 py-2 flex justify-between items-center shadow-sm"
        >
            <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-600">Your Journey:</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold text-xs">
                    {JOURNEY_LABELS[journey.stage]}
                </span>
                {journey.date && (
                    <span className="text-gray-500 text-xs hidden sm:inline">
                        • {journey.stage === 'PREGNANT' ? 'Due: ' : 'Since: '} {new Date(journey.date).toLocaleDateString()}
                    </span>
                )}
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => setShowSelector(true)}
            >
                Change
            </Button>
        </motion.div>
    );
}
