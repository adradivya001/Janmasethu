import { useJourney } from "../../contexts/JourneyContext";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Baby, Activity, ArrowRight, Flag } from "lucide-react";
import { differenceInWeeks, differenceInDays, differenceInMonths, addWeeks, format } from "date-fns";
import { Link } from "wouter";

export default function JourneyDashboard() {
    const { journey } = useJourney();
    const { t } = useLanguage();

    if (!journey) return null;

    const renderContent = () => {
        const today = new Date();
        const journeyDate = journey.date ? new Date(journey.date) : null;

        if (journey.stage === 'PREGNANT' && journeyDate) {
            let weeksPregnant = 0;
            let dueDate = journeyDate;
            const isFuture = journeyDate > today;

            if (isFuture) {
                const lmp = addWeeks(journeyDate, -40);
                weeksPregnant = differenceInWeeks(today, lmp);
            } else {
                weeksPregnant = differenceInWeeks(today, journeyDate);
                dueDate = addWeeks(journeyDate, 40);
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

        if (journey.stage === 'PARENT' && journeyDate) {
            const monthsOld = differenceInMonths(today, journeyDate);
            const isBirthday = today.getDate() === journeyDate.getDate() && today.getMonth() === journeyDate.getMonth();

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
                                        {monthsOld < 1 ? `${differenceInDays(today, journeyDate)} Days` : `${monthsOld} Months`} Old
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
                        <Card className="bg-white/80 border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Journey Status</p>
                                    <h3 className="text-xl font-bold text-green-700">Trying to Conceive</h3>
                                    <p className="text-xs text-gray-500">Track your cycle for better chances</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-green-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/tools/ovulation-calculator">
                        <Card className="bg-white/80 border-none shadow-md hover:bg-white transition-colors cursor-pointer group">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-pink-100 p-3 rounded-full group-hover:bg-pink-200 transition-colors">
                                        <Activity className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-pink-700">Fertile Window Calculator</h3>
                                        <p className="text-xs text-muted-foreground">Know your best days</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pink-600 transition-colors" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
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
                        {/* Always show core tools */}
                        <Link href="/tools/ovulation-calculator">
                            <div className="bg-white p-4 rounded-xl border border-pink-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer">
                                <div className="bg-pink-50 p-2 rounded-lg text-pink-600"><Activity className="w-5 h-5" /></div>
                                <div className="text-sm font-semibold text-gray-700">Ovulation Calculator</div>
                            </div>
                        </Link>

                        <Link href="/tools/due-date-calculator">
                            <div className="bg-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer">
                                <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Calendar className="w-5 h-5" /></div>
                                <div className="text-sm font-semibold text-gray-700">Due Date Calculator</div>
                            </div>
                        </Link>

                        <Link href="/tools/vaccination-scheduler">
                            <div className="bg-white p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Activity className="w-5 h-5" /></div>
                                <div className="text-sm font-semibold text-gray-700">Vaccination Guide</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
