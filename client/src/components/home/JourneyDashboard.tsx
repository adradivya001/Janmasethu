import { useState, useEffect } from 'react';
import { useJourney } from "../../contexts/JourneyContext";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Baby, Activity, ArrowRight, Flag, BookOpen } from "lucide-react";
import { differenceInWeeks, differenceInDays, differenceInMonths, addWeeks, format } from "date-fns";
import { Link } from "wouter";
import { fetchRecommendations } from "../../data/knowledgeHub"; // Assuming this path exists based on Knowledge.tsx import

export default function JourneyDashboard() {
    const { journey } = useJourney();
    const { t, lang } = useLanguage();
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        const loadArticles = async () => {
            if (journey?.stage) {
                let targetStage = 'ttc';
                if (journey.stage === 'PREGNANT') targetStage = 'pregnancy';
                if (journey.stage === 'PARENT') targetStage = 'parent';

                try {
                    const recs = await fetchRecommendations({
                        stage: targetStage,
                        lang: lang,
                        limit: 5 // Fetch 5 articles as requested
                    });
                    setArticles(recs);
                } catch (error) {
                    console.error("Failed to fetch dashboard articles", error);
                }
            }
        };
        loadArticles();
    }, [journey?.stage, lang]);

    if (!journey) return null;

    const renderContent = () => {
        const today = new Date();
        const journeyDate = journey.date ? new Date(journey.date) : null;

        if (journey.stage === 'PREGNANT') {
            const dateToUse = journeyDate || new Date();
            let weeksPregnant = 0;
            let dueDate = dateToUse;
            const isFuture = dateToUse > today;

            if (isFuture) {
                const lmp = addWeeks(dateToUse, -40);
                weeksPregnant = differenceInWeeks(today, lmp);
            } else {
                weeksPregnant = differenceInWeeks(today, dateToUse);
                dueDate = addWeeks(dateToUse, 40);
            }
            weeksPregnant = Math.max(0, Math.min(42, weeksPregnant));

            // Baby size logic (simple mock)
            const babySizes = [
                "Poppy Seed", "Sesame Seed", "Lentil", "Blueberry", "Bean",
                "Grape", "Kumquat", "Fig", "Lime", "Pea Pod",
                "Lemon", "Apple", "Avocado", "Turnip", "Bell Pepper",
                "Mango", "Artichoke", "Zucchini", "Grapefruit", "Cantaloupe",
                "Banana", "Papaya", "Eggplant", "Corn", "Squash",
                "Lettuce", "Cauliflower", "Coconut", "Pineapple", "Cabbage",
                "Kale", "Yam", "Honeydew", "Celery", "Durian",
                "Watermelon", "Pumpkin", "Jackfruit", "Watermelon", "Pumpkin"
            ];
            const babySize = babySizes[weeksPregnant - 4] || "Tiny Speck";

            return (
                <div className="grid md:grid-cols-3 gap-6">
                    <Link href={`/knowledge-hub?stage=pregnancy&search=week ${weeksPregnant}`}>
                        <Card className="bg-white/80 border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors">
                                    <Calendar className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Stage</p>
                                    <h3 className="text-xl font-bold text-purple-700">Week {weeksPregnant}</h3>
                                    <p className="text-xs text-gray-500">Trimester {weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-purple-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={`/tools/pregnancy-week-by-week`}>
                        <Card className="bg-white/80 border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-pink-100 p-3 rounded-full group-hover:bg-pink-200 transition-colors">
                                    <Baby className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Baby Size</p>
                                    <h3 className="text-xl font-bold text-pink-700">{weeksPregnant < 4 ? "Tiny Seed" : babySize}</h3>
                                    <p className="text-xs text-gray-500">View Week by Week</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-pink-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/tools/due-date-calculator">
                        <Card className="bg-white/80 border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors">
                                    <Flag className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Est. Due Date</p>
                                    <h3 className="text-xl font-bold text-orange-700">{format(dueDate, "d MMM yyyy")}</h3>
                                    <p className="text-xs text-gray-500">{differenceInDays(dueDate, today)} days to go</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-orange-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            );
        }

        if (journey.stage === 'PARENT') {
            const dateToUse = journeyDate || new Date();
            const monthsOld = differenceInMonths(today, dateToUse);
            const isBirthday = today.getDate() === dateToUse.getDate() && today.getMonth() === dateToUse.getMonth();

            return (
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/knowledge-hub?stage=newborn&search=milestones">
                        <Card className="bg-white/80 border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors">
                                    <Baby className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Baby is</p>
                                    <h3 className="text-xl font-bold text-orange-700">
                                        {monthsOld < 1 ? `${differenceInDays(today, dateToUse)} Days` : `${monthsOld} Months`} Old
                                    </h3>
                                    {isBirthday && <p className="text-xs text-pink-500 font-bold animate-pulse">🎉 Happy Birthday! 🎂</p>}
                                </div>
                                <ArrowRight className="w-4 h-4 text-orange-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/tools/vaccination-scheduler">
                        <Card className="bg-white/80 border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                                    <Activity className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Vaccination</p>
                                    <h3 className="text-xl font-bold text-blue-700">Check Schedule</h3>
                                    <p className="text-xs text-gray-500">View IAP immunization list</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-blue-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            );
        }

        if (journey.stage === 'TTC') {
            return (
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/knowledge-hub?stage=ttc">
                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-md hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <CardContent className="p-6 flex items-center gap-6 relative z-10">
                                <div className="bg-white p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Calendar className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-green-800">Trying to Conceive</h3>
                                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Active</span>
                                    </div>
                                    <p className="text-sm text-green-700/80 mb-2">Track your cycle for better chances</p>
                                    <div className="flex items-center text-xs font-medium text-green-600 group-hover:underline">
                                        View Guides <ArrowRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/tools/ovulation-calculator">
                        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100 shadow-md hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-100/50 rounded-full blur-xl -mr-5 -mb-5"></div>
                            <CardContent className="p-6 flex items-center gap-6 relative z-10">
                                <div className="bg-white p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Activity className="w-8 h-8 text-pink-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-pink-800 mb-1">Fertile Window</h3>
                                    <p className="text-sm text-pink-700/80 mb-2">Know your best days to conceive</p>
                                    <div className="flex items-center text-xs font-medium text-pink-600 group-hover:underline">
                                        Open Calculator <ArrowRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            );
        }

        return null;
    };

    // Dynamic Tools Selection
    const getRecommendedTools = () => {
        const commonTool = (
            <Link href="/sakhi">
                <div className="bg-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Baby className="w-5 h-5" /></div>
                    <div>
                        <div className="text-sm font-semibold text-gray-700">Ask Sakhi</div>
                        <div className="text-xs text-muted-foreground">AI Companion</div>
                    </div>
                </div>
            </Link>
        );

        if (journey.stage === 'TTC') {
            return (
                <>
                    <Link href="/tools/ovulation-calculator">
                        <div className="bg-white p-4 rounded-xl border border-pink-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                            <div className="bg-pink-50 p-2 rounded-lg text-pink-600"><Activity className="w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold text-gray-700">Ovulation Calculator</div>
                                <div className="text-xs text-muted-foreground">Track Fertility</div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/tools/am-i-pregnant">
                        <div className="bg-white p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Baby className="w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold text-gray-700">Am I Pregnant?</div>
                                <div className="text-xs text-muted-foreground">Check Symptoms</div>
                            </div>
                        </div>
                    </Link>
                    {commonTool}
                </>
            );
        }

        if (journey.stage === 'PREGNANT') {
            return (
                <>
                    <Link href="/tools/due-date-calculator">
                        <div className="bg-white p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Calendar className="w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold text-gray-700">Due Date Calculator</div>
                                <div className="text-xs text-muted-foreground">Estimate Arrival</div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/tools/pregnancy-week-by-week">
                        <div className="bg-white p-4 rounded-xl border border-pink-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                            <div className="bg-pink-50 p-2 rounded-lg text-pink-600"><Baby className="w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold text-gray-700">Week by Week</div>
                                <div className="text-xs text-muted-foreground">Track Growth</div>
                            </div>
                        </div>
                    </Link>
                    {commonTool}
                </>
            );
        }

        if (journey.stage === 'PARENT') {
            return (
                <>
                    <Link href="/tools/vaccination-scheduler">
                        <div className="bg-white p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Activity className="w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold text-gray-700">Vaccination Guide</div>
                                <div className="text-xs text-muted-foreground">Track Shots</div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/tools/baby-cost-calculator">
                        <div className="bg-white p-4 rounded-xl border border-yellow-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer h-full">
                            <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600"><Flag className="w-5 h-5" /></div>
                            <div>
                                <div className="text-sm font-semibold text-gray-700">Baby Cost Calculator</div>
                                <div className="text-xs text-muted-foreground">Plan Expenses</div>
                            </div>
                        </div>
                    </Link>
                    {commonTool}
                </>
            );
        }

        return null;
    };

    return (
        <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-3xl p-6 border border-purple-100/50 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {journey.stage === 'PREGNANT' ? 'Your Pregnancy Dashboard' :
                                journey.stage === 'PARENT' ? 'Parenting Dashboard' : 'Your Journey Dashboard'}
                        </h2>
                        <p className="text-gray-500 text-sm">Personalized insights for you</p>
                    </div>
                    <Link href="/sakhi">
                        <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                            Ask Sakhi for Advice
                        </Button>
                    </Link>
                </div>

                {renderContent()}

                {/* Tools & Resources Strip */}
                <div className="mt-8 border-t border-purple-100 pt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        Recommended Tools for You
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getRecommendedTools()}
                    </div>
                </div>

                {/* Recommended Articles Strip */}
                {articles.length > 0 && (
                    <div className="mt-8 border-t border-purple-100 pt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                                Recommended Articles
                            </h3>
                            <Link href="/knowledge-hub">
                                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                                    More Guides <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="flex overflow-x-auto pb-6 gap-4 snap-x pr-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                                {articles.map((article: any, index: number) => (
                                    <Link key={index} href={`/knowledge-hub/${article.slug}`}>
                                        <div className="min-w-[280px] w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex-shrink-0 snap-start h-full flex flex-col group">
                                            <div className="p-4 flex flex-col h-full">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {(article.lens || []).slice(0, 1).map((lens: string) => (
                                                        <span key={lens} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                                                            {lens}
                                                        </span>
                                                    ))}
                                                    <span className="text-[10px] text-gray-400 flex items-center ml-auto">
                                                        {article.read_time_minutes || 5} min read
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                                                    {article.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">
                                                    {article.summary}
                                                </p>
                                                <div className="mt-auto flex items-center text-xs font-medium text-purple-600">
                                                    Read Article <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
