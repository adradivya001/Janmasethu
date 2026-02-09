import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getReadinessChecklist, ReadinessCategory } from "../../api/toolsApi";

const STORAGE_KEY = "janmasethu_readiness_progress";

export default function ReadinessChecklist() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [checklistData, setChecklistData] = useState<ReadinessCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch checklist data from API on mount
    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const data = await getReadinessChecklist();
                setChecklistData(data);
            } catch (error) {
                console.error("Failed to fetch readiness checklist", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChecklist();
    }, []);

    // Load checked items from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setCheckedItems(JSON.parse(stored));
        }
    }, []);

    // Save checked items to local storage whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleItem = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const calculateProgress = () => {
        if (checklistData.length === 0) return 0;
        const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;
        if (totalItems === 0) return 0;
        return Math.round((checkedCount / totalItems) * 100);
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading checklist...</div>;
    }

    return (
        <Card className="w-full card-shadow rounded-3xl overflow-hidden border-t-4 border-t-pink-500">
            <CardHeader className="bg-pink-50 pb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <CardTitle className="text-xl font-bold text-pink-900 mb-1">Pre-Pregnancy Readiness</CardTitle>
                        <CardDescription className="text-pink-700">Track your preparation journey</CardDescription>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-pink-800">
                        <span>Your Progress</span>
                        <span>{calculateProgress()}%</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-3 bg-pink-200 [&>div]:bg-pink-500" />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {checklistData.length > 0 && (
                    <Tabs defaultValue={checklistData[0].category} className="w-full">
                        <ScrollArea className="w-full border-b bg-gray-50/50">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                                {checklistData.map((category) => (
                                    <TabsTrigger
                                        key={category.category}
                                        value={category.category}
                                        className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:text-pink-700 data-[state=active]:bg-white"
                                    >
                                        {category.category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </ScrollArea>
                        {checklistData.map((category) => (
                            <TabsContent key={category.category} value={category.category} className="p-4 m-0">
                                <div className="space-y-3">
                                    {category.items.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleItem(item.id)}
                                            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${checkedItems[item.id]
                                                ? "bg-pink-50 border-pink-200"
                                                : "bg-white border-gray-100 hover:border-pink-100 hover:shadow-sm"
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 transition-colors ${checkedItems[item.id] ? "text-pink-600" : "text-gray-300"
                                                }`}>
                                                {checkedItems[item.id] ? (
                                                    <CheckCircle2 className="w-6 h-6 fill-pink-100" />
                                                ) : (
                                                    <Circle className="w-6 h-6" />
                                                )}
                                            </div>
                                            <span className={`text-sm font-medium ${checkedItems[item.id] ? "text-pink-900 line-through opacity-70" : "text-gray-700"
                                                }`}>
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
}
