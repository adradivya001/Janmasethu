import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import AnimatedButton from "../AnimatedButton";
import {
    BookOpen, Stethoscope, Users, IndianRupee, Apple, ArrowRight,
    Clock
} from "lucide-react";
import { useJourney } from "../../contexts/JourneyContext";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { fetchRecommendations, ArticleMetadata } from "../../data/knowledgeHub";

export default function KnowledgePreview() {
    const { t, lang } = useLanguage();
    const { journey } = useJourney();
    const [categoryData, setCategoryData] = useState<Record<string, ArticleMetadata[]>>({});

    const getStageValue = () => {
        if (!journey) return undefined;
        if (journey.stage === 'TTC') return "ttc";
        if (journey.stage === 'PREGNANT') return "pregnancy";
        if (journey.stage === 'PARENT') {
            if (journey.date) {
                const dob = new Date(journey.date);
                const diffDays = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24);
                return diffDays < 90 ? "newborn" : "early-years";
            }
            return "newborn";
        }
        return undefined;
    };

    const getStageParam = () => {
        const stage = getStageValue();
        return stage ? `&stage=${stage}` : "";
    };

    const stageParam = getStageParam();

    const categories = [
        {
            id: "medical",
            title: { en: "Medical Lens", hi: "चिकित्सा दृष्टिकोण", te: "వైద్య దృక్కోణం" },
            icon: Stethoscope,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            borderColor: "border-blue-100",
            lens: "medical"
        },
        {
            id: "social",
            title: { en: "Social & Emotional Support", hi: "सामाजिक और भावनात्मक समर्थन", te: "సామాజిక మరియు భావోద్వేగ మద్దతు" },
            icon: Users,
            color: "text-pink-600",
            bgColor: "bg-pink-100",
            borderColor: "border-pink-100",
            lens: "social"
        },
        {
            id: "financial",
            title: { en: "Financial Planning", hi: "वित्तीय योजना", te: "ఆర్థిక ప్రణాళిక" },
            icon: IndianRupee,
            color: "text-green-600",
            bgColor: "bg-green-100",
            borderColor: "border-green-100",
            lens: "financial"
        },
        {
            id: "nutrition",
            title: { en: "Nutrition & Lifestyle", hi: "पोषण और जीवनशैली", te: "పోషకాహారం మరియు జీవనశైలి" },
            icon: Apple,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            borderColor: "border-orange-100",
            lens: "nutrition"
        }
    ];

    useEffect(() => {
        const fetchAllCategories = async () => {
            const stage = getStageValue();
            const newData: Record<string, ArticleMetadata[]> = {};

            for (const category of categories) {
                try {
                    const results = await fetchRecommendations({
                        stage,
                        lens: category.lens,
                        lang,
                        limit: 7
                    });
                    newData[category.id] = results;
                } catch (error) {
                    console.error(`Failed to fetch for ${category.lens}`, error);
                    newData[category.id] = [];
                }
            }
            setCategoryData(newData);
        };

        fetchAllCategories();
    }, [journey?.stage, lang]);

    return (
        <section className="py-16">
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-6 md:p-12">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 card-shadow mb-4">
                            <BookOpen className="w-4 h-4 text-pink-500" />
                            <span className="text-sm font-medium text-foreground">
                                {lang === "en" && "Knowledge Hub"}
                                {lang === "hi" && "ज्ञान केंद्र"}
                                {lang === "te" && "జ్ఞాన కేంద్రం"}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
                            {lang === "en" && "Your Trusted Guide to Parenthood"}
                            {lang === "hi" && "माता-पिता बनने के लिए आपका विश्वसनीय मार्गदर्शक"}
                            {lang === "te" && "మాతృత్వానికి మీ విశ్వసనీయ మార్గదర్శి"}
                        </h2>

                        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                            {lang === "en" && "Expert-verified articles covering every aspect of your fertility and pregnancy journey. Browse through different perspectives - medical, emotional, financial, and nutritional - to find the information you need."}
                            {lang === "hi" && "विशेषज्ञ-सत्यापित लेख जो आपकी प्रजनन और गर्भावस्था यात्रा के हर पहलू को कवर करते हैं। विभिन्न दृष्टिकोणों - चिकित्सा, भावनात्मक, वित्तीय और पोषण - के माध्यम से ब्राउज़ करें और जरूरी जानकारी प्राप्त करें।"}
                            {lang === "te" && "మీ సంతానోత్పత్తి మరియు గర్భధారణ ప్రయాణంలోని ప్రతి అంశాన్ని కవర్ చేసే నిపుణుల-ధృవీకరించబడిన వ్యాసాలు. వైద్యం, భావోద్వేగం, ఆర్థికం మరియు పోషకాహారం వంటి వివిధ దృక్పథాల ద్వారా బ్రౌజ్ చేసి మీకు అవసరమైన సమాచారాన్ని కనుగొనండి."}
                        </p>
                    </div>

                    {/* Accordion Categories */}
                    <div className="w-full mx-auto space-y-4">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {categories.map((category) => {
                                const categoryArticles = categoryData[category.id] || [];

                                return (
                                    <AccordionItem
                                        key={category.id}
                                        value={category.id}
                                        className="bg-white rounded-2xl border-none shadow-sm overflow-hidden"
                                    >
                                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center space-x-4 w-full">
                                                <div className={`w-10 h-10 ${category.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                    <category.icon className={`w-5 h-5 ${category.color}`} />
                                                </div>
                                                <span className="text-lg font-bold text-gray-800 text-left flex-1">
                                                    {lang === "en" ? category.title.en : lang === "hi" ? category.title.hi : category.title.te}
                                                </span>
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent className="bg-gray-50/50 pb-6 pt-2">
                                            <div className="px-6 relative">
                                                <div className="flex overflow-x-auto gap-4 pb-4 pt-2 snap-x scrollbar-hide -mx-6 px-6">
                                                    {categoryArticles.length > 0 ? (
                                                        categoryArticles.map((article) => (
                                                            <Link key={article.slug} href={`/knowledge-hub/${article.slug}`}>
                                                                <div className="min-w-[280px] w-[280px] bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex-shrink-0 snap-start h-72 flex flex-col group overflow-hidden relative">
                                                                    <div className="p-6 flex flex-col h-full">
                                                                        <h4 className="font-bold text-pink-600 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-pink-700 transition-colors min-h-[3.5rem] flex items-center flex-shrink-0">
                                                                            {article.title}
                                                                        </h4>
                                                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 text-justify hyphens-auto overflow-hidden">
                                                                            {article.summary}
                                                                        </p>
                                                                        <div className="mt-auto flex justify-between items-center text-xs text-gray-400 font-medium border-t border-gray-100 pt-3 w-full flex-shrink-0">
                                                                            <span>{article.read_time_minutes || 5} min read</span>
                                                                            <span>Medically Reviewed</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-sm text-gray-500 italic">
                                                            {lang === "en" ? "No articles found right now." : "अभी कोई लेख नहीं मिला।"}
                                                        </div>
                                                    )}

                                                    {/* View More Card */}
                                                    <Link href={`/knowledge-hub?lens=${category.lens}${stageParam}`}>
                                                        <div className="min-w-[140px] bg-gradient-to-br from-pink-50 to-white rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex-shrink-0 snap-start h-72 flex flex-col items-center justify-center group text-center p-6">
                                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                                                <ArrowRight className="w-5 h-5 text-pink-500" />
                                                            </div>
                                                            <span className="font-bold text-pink-600 text-xs">
                                                                {lang === "en" ? "View All" : lang === "hi" ? "सभी देखें" : "అన్నీ చూడండి"}<br />
                                                                {lang === 'en' ? category.title.en : lang === 'hi' ? category.title.hi : category.title.te}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>

                                                {/* Fade indicators for scrolling hint */}
                                                <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:hidden"></div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>

                    {/* Main Call to Action */}
                    <div className="text-center mt-12">
                        <Link href="/knowledge-hub">
                            <AnimatedButton className="gradient-button text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                                <span className="flex items-center">
                                    <BookOpen className="mr-2 w-5 h-5" />
                                    {lang === "en" && "Visit Knowledge Hub"}
                                    {lang === "hi" && "ज्ञान केंद्र पर जाएं"}
                                    {lang === "te" && "జ్ఞాన కేంద్రానికి వెళ్లండి"}
                                </span>
                            </AnimatedButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
