
import { useState, useEffect } from "react";
import { CheckCircle, Circle, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TTC_READINESS_ITEMS } from "@/data/tools_content";

const STORAGE_KEY = "janmasethu_readiness_progress";

const ReadinessChecklist = () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [progress, setProgress] = useState(0);

    // Load progress on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setCheckedItems(JSON.parse(stored));
        }
    }, []);

    // Update progress calculation whenever checks change
    useEffect(() => {
        const totalItems = TTC_READINESS_ITEMS.reduce((acc, cat) => acc + cat.items.length, 0);
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;
        const newProgress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;
        setProgress(newProgress);

        // Save to local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleItem = (id: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <Card className="w-full card-shadow rounded-3xl overflow-hidden border-t-4 border-t-pink-400">
            <CardHeader className="bg-pink-50 pb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <CardTitle className="text-xl font-bold text-pink-900">Pre-Pregnancy Readiness</CardTitle>
                        <p className="text-sm text-pink-700 mt-1">Get your body and life ready for baby.</p>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <Trophy className={`w-6 h-6 ${progress === 100 ? "text-yellow-500" : "text-gray-300"}`} />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-pink-800 uppercase tracking-wider">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-pink-200" />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full" defaultValue={TTC_READINESS_ITEMS[0].category}>
                    {TTC_READINESS_ITEMS.map((category, index) => (
                        <AccordionItem key={index} value={category.category} className="border-b border-gray-100 last:border-none">
                            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 hover:no-underline">
                                <span className="font-semibold text-gray-700">{category.category}</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 pt-1 bg-gray-50/50">
                                <div className="space-y-3">
                                    {category.items.map((item) => {
                                        const isChecked = !!checkedItems[item.id];
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleItem(item.id)}
                                                className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white transition-colors"
                                            >
                                                <div className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? "text-green-500" : "text-gray-300 group-hover:text-pink-400"}`}>
                                                    {isChecked ? <CheckCircle className="w-5 h-5 fill-current" /> : <Circle className="w-5 h-5" />}
                                                </div>
                                                <span className={`text-sm transition-all ${isChecked ? "text-gray-400 line-through" : "text-gray-700 font-medium"}`}>
                                                    {item.text}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default ReadinessChecklist;
