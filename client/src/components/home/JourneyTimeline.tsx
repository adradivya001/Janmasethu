import React from "react";
import { useLocation } from "wouter";
import {
    ArrowRight,
    Heart,
    MessageCircle,
    CheckCircle,
    ChevronDown
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function JourneyTimeline() {
    const { t } = useLanguage();
    const [, setLocation] = useLocation();

    return (
        <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl mx-4 relative overflow-hidden">
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="text-center mb-12 relative z-10 px-4">
                <h2
                    className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4 animate-fadeInUp"
                    data-testid="text-journey-title"
                >
                    {t("journey_title")}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    {t("journey_subtitle")}
                </p>
            </div>

            {/* Journey Timeline */}
            <div className="relative overflow-x-auto pb-8 px-4 md:px-6 lg:px-8 xl:px-12 z-10">
                {/* Responsive timeline - scrollable on mobile/tablet, centered on desktop */}
                <div className="flex items-center justify-start xl:justify-center gap-4 md:gap-5 lg:gap-6 xl:gap-8 min-w-max xl:min-w-0 w-full mx-auto py-8 pl-2 md:pl-4 lg:pl-6">
                    {/* Stage 1: Thinking of Parenthood */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage relative w-[140px] md:w-[160px] lg:w-[180px] bg-transparent border-none outline-none"
                                data-testid="journey-stage-thinking"
                                style={{ '--stage-index': 0 } as React.CSSProperties}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-green-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-green-300 overflow-hidden">
                                        <img
                                            src="/thinking of parenthood.png"
                                            alt="Thinking of Parenthood"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-sm lg:text-base font-bold text-foreground text-center mb-2 group-hover:text-green-700 transition-colors duration-300 leading-tight px-1">
                                    {t("journey_stage_1_title")}
                                </h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground text-center w-full group-hover:text-green-600 transition-colors duration-300 mb-2 leading-snug px-1">
                                    {t("journey_stage_1_desc")}
                                </p>
                                <span className="text-[9px] md:text-[10px] text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 whitespace-nowrap">
                                    <ArrowRight className="w-3 h-3" />
                                    Click to explore
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-green-50/30 to-purple-50/30 rounded-2xl relative">
                            <DialogHeader className="border-b border-green-100 pb-4 px-6 pt-6">
                                <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        <img src="/thinking of parenthood.png" alt="Thinking of Parenthood" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Thinking of Parenthood</span>
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    Information about the Thinking of Parenthood stage of your journey
                                </DialogDescription>
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2 animate-bounce">
                                    <ChevronDown className="w-4 h-4" />
                                    <span>Scroll for more</span>
                                </div>
                            </DialogHeader>
                            <div className="space-y-6 mt-6 px-6 pb-6">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-md border border-green-200">
                                    <h4 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-green-600" />
                                        How You Might Feel:
                                    </h4>
                                    <p className="text-green-800 leading-relaxed italic">"Hopeful, but also anxious and uncertain. Are we really ready for this?"</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                                    <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-pink-500" />
                                        Common Worries:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-green-600 text-sm font-bold">1</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Everyone keeps asking when we're going to have a baby, and the pressure is a lot</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-green-600 text-sm font-bold">2</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Worried about finances - can we actually afford a child right now?</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-green-600 text-sm font-bold">3</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Confused about what to eat or what lifestyle changes to make</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-green-600 text-sm font-bold">4</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Hard to know what's true with so many different "facts" and stories</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md border border-purple-200">
                                    <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        How Sakhi Supports You:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Safe space to ask early questions like "What should we think about before trying?"</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Clear, local info on food, age, and health from trusted sources</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Simple checklists for financial planning</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Articles and guidance that make you feel less alone</span>
                                        </li>
                                    </ul>
                                </div>

                                <Button onClick={() => setLocation("/sakhi")} className="w-full gradient-button text-white py-4 md:py-6 text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-300">
                                    <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                    Talk to Sakhi About This Stage
                                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Connection Line 1 */}
                    <div className="w-10 md:w-12 lg:w-16 mx-1 md:mx-2 lg:mx-3 relative h-2 group flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-pink-200 rounded-full transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Stage 2: Trying Naturally */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage relative w-[140px] md:w-[160px] lg:w-[180px] bg-transparent border-none outline-none"
                                data-testid="journey-stage-trying"
                                style={{ '--stage-index': 1 } as React.CSSProperties}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-pink-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-pink-300 overflow-hidden">
                                        <img
                                            src="/Trying naturally.png"
                                            alt="Trying Naturally"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-sm lg:text-base font-bold text-foreground text-center mb-2 group-hover:text-pink-700 transition-colors duration-300 leading-tight px-1">
                                    {t("journey_stage_2_title")}
                                </h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground text-center w-full group-hover:text-pink-600 transition-colors duration-300 mb-2 leading-snug px-1">
                                    {t("journey_stage_2_desc")}
                                </p>
                                <span className="text-[9px] md:text-[10px] text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 whitespace-nowrap">
                                    <ArrowRight className="w-3 h-3" />
                                    Click to explore
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-2xl relative">
                            <DialogHeader className="border-b border-pink-100 pb-4 px-6 pt-6">
                                <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        <img src="/Trying naturally.png" alt="Trying Naturally" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">Trying Naturally</span>
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    Information about the Trying Naturally stage of your journey
                                </DialogDescription>
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2 animate-bounce">
                                    <ChevronDown className="w-4 h-4" />
                                    <span>Scroll for more</span>
                                </div>
                            </DialogHeader>
                            <div className="space-y-6 mt-6 px-6 pb-6">
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-md border border-pink-200">
                                    <h4 className="font-bold text-pink-900 mb-3 text-lg flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-pink-600" />
                                        How You Might Feel:
                                    </h4>
                                    <p className="text-pink-800 leading-relaxed italic">"Optimistic at first, but with each month that passes, more and more anxious."</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                                    <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-pink-500" />
                                        Common Worries:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-pink-600 text-sm font-bold">1</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Tracking my cycle is confusing and stressful</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-pink-600 text-sm font-bold">2</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">The internet is full of conflicting advice - who do I believe?</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-pink-600 text-sm font-bold">3</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">The pressure builds up every single month</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md border border-purple-200">
                                    <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        How Sakhi Supports You:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Simple cycle tracking with helpful tips along the way</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Gentle reminders about healthy habits</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Helps turn vague worries into clear questions</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Quick tips to manage stress and stay calm</span>
                                        </li>
                                    </ul>
                                </div>

                                <Button onClick={() => setLocation("/sakhi")} className="w-full gradient-button text-white py-4 md:py-6 text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-300">
                                    <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                    Talk to Sakhi About This Stage
                                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Connection Line 2 */}
                    <div className="w-10 md:w-12 lg:w-16 mx-1 md:mx-2 lg:mx-3 relative h-2 group flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Stage 3: Exploring Options */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage w-[140px] md:w-[160px] lg:w-[180px] bg-transparent border-none outline-none"
                                data-testid="journey-stage-exploring"
                                style={{ '--stage-index': 2 } as React.CSSProperties}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-blue-300 overflow-hidden">
                                        <img
                                            src="/Exploring option.png"
                                            alt="Exploring Options"
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-sm lg:text-base font-bold text-foreground text-center mb-2 group-hover:text-blue-700 transition-colors duration-300 leading-tight px-1">
                                    {t("journey_stage_3_title")}
                                </h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground text-center w-full group-hover:text-blue-600 transition-colors duration-300 mb-2 leading-snug px-1">
                                    {t("journey_stage_3_desc")}
                                </p>
                                <span className="text-[9px] md:text-[10px] text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 whitespace-nowrap">
                                    <ArrowRight className="w-3 h-3" />
                                    Click to explore
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl relative">
                            <DialogHeader className="border-b border-blue-100 pb-4 px-6 pt-6">
                                <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        <img src="/Exploring option.png" alt="Exploring Options" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Exploring Options (IUI, IVF, Donor)</span>
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    Information about exploring fertility treatment options
                                </DialogDescription>
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2 animate-bounce">
                                    <ChevronDown className="w-4 h-4" />
                                    <span>Scroll for more</span>
                                </div>
                            </DialogHeader>
                            <div className="space-y-6 mt-6 px-6 pb-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md border border-blue-200">
                                    <h4 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-blue-600" />
                                        How You Might Feel:
                                    </h4>
                                    <p className="text-blue-800 leading-relaxed italic">"Completely overwhelmed. Sometimes ashamed, and tired of making so many decisions."</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                                    <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-pink-500" />
                                        Common Worries:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-blue-600 text-sm font-bold">1</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">When is the "right time" to see a specialist? Have we waited too long?</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-blue-600 text-sm font-bold">2</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Lost trying to understand IUI, IVF, donors - what do these mean for us?</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-blue-600 text-sm font-bold">3</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Clinics seem so complicated, no idea what to expect</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-blue-600 text-sm font-bold">4</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">This is all so expensive - the costs are scary</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md border border-purple-200">
                                    <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        How Sakhi Supports You:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Checklist of "What to ask my doctor" so you feel prepared</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Short, simple videos from real doctors explaining procedures</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Safe place to organize and keep all test reports</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Clear info about costs, success rates, and local processes</span>
                                        </li>
                                    </ul>
                                </div>

                                <Button onClick={() => setLocation("/sakhi")} className="w-full gradient-button text-white py-4 md:py-6 text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-300">
                                    <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                    Talk to Sakhi About This Stage
                                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Connection Line 3 */}
                    <div className="w-10 md:w-12 lg:w-16 mx-1 md:mx-2 lg:mx-3 relative h-2 group flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>\n          {/* Stage 4: Pregnancy */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage w-[140px] md:w-[160px] lg:w-[180px] bg-transparent border-none outline-none"
                                data-testid="journey-stage-pregnancy"
                                style={{ '--stage-index': 3 } as React.CSSProperties}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-purple-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-purple-300 overflow-hidden">
                                        <img
                                            src="/Pregnancy.png"
                                            alt="Pregnancy"
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-sm lg:text-base font-bold text-foreground text-center mb-2 group-hover:text-purple-700 transition-colors duration-300 leading-tight px-1">
                                    {t("journey_stage_4_title")}
                                </h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground text-center w-full group-hover:text-purple-600 transition-colors duration-300 mb-2 leading-snug px-1">
                                    {t("journey_stage_4_desc")}
                                </p>
                                <span className="text-[9px] md:text-[10px] text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 whitespace-nowrap">
                                    <ArrowRight className="w-3 h-3" />
                                    Click to explore
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl relative">
                            <DialogHeader className="border-b border-purple-100 pb-4 px-6 pt-6">
                                <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        <img src="/Pregnancy.png" alt="Pregnancy" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Pregnancy</span>
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    Information about the Pregnancy stage of your journey
                                </DialogDescription>
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2 animate-bounce">
                                    <ChevronDown className="w-4 h-4" />
                                    <span>Scroll for more</span>
                                </div>
                            </DialogHeader>
                            <div className="space-y-6 mt-6 px-6 pb-6">
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-md border border-purple-200">
                                    <h4 className="font-bold text-purple-900 mb-3 text-lg flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-purple-600" />
                                        How You Might Feel:
                                    </h4>
                                    <p className="text-purple-800 leading-relaxed italic">"So relieved and excited, but now you have a whole new set of anxieties."</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                                    <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-pink-500" />
                                        Common Worries:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-600 text-sm font-bold">1</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Hard to find information for my specific week of pregnancy</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-600 text-sm font-bold">2</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Family says one thing, doctor says another - it's confusing!</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-600 text-sm font-bold">3</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Need to plan and budget for hospital delivery</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md border border-purple-200">
                                    <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        How Sakhi Supports You:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Timeline of your pregnancy with helpful info for each week</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Simple nutrition checklists for each trimester</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Videos on what to expect in the coming months</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Helps prepare for doctor visits with suggested questions</span>
                                        </li>
                                    </ul>
                                </div>

                                <Button onClick={() => setLocation("/sakhi")} className="w-full gradient-button text-white py-4 md:py-6 text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-300">
                                    <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                    Talk to Sakhi About This Stage
                                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Connection Line 4 */}
                    <div className="w-10 md:w-12 lg:w-16 mx-1 md:mx-2 lg:mx-3 relative h-2 group flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-orange-200 rounded-full transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Stage 5: Post-Delivery */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage w-[140px] md:w-[160px] lg:w-[180px] bg-transparent border-none outline-none"
                                data-testid="journey-stage-postdelivery"
                                style={{ '--stage-index': 4 } as React.CSSProperties}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent hover:border-orange-300 overflow-hidden">
                                        <img
                                            src="/Post-delivery.png"
                                            alt="Post-Delivery & New Parent"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-sm lg:text-base font-bold text-foreground text-center mb-2 group-hover:text-orange-700 transition-colors duration-300 leading-tight px-1">
                                    {t("journey_stage_5_title")}
                                </h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground text-center w-full group-hover:text-orange-600 transition-colors duration-300 mb-2 leading-snug px-1">
                                    {t("journey_stage_5_desc")}
                                </p>
                                <span className="text-[9px] md:text-[10px] text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 whitespace-nowrap">
                                    <ArrowRight className="w-3 h-3" />
                                    Click to explore
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-orange-50/30 to-purple-50/30 rounded-2xl relative">
                            <DialogHeader className="border-b border-orange-100 pb-4 px-6 pt-6">
                                <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        <img src="/New baby.png" alt="New Baby" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Post-Delivery & New Parent</span>
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    Information about post-delivery care and new parent support
                                </DialogDescription>
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2 animate-bounce">
                                    <ChevronDown className="w-4 h-4" />
                                    <span>Scroll for more</span>
                                </div>
                            </DialogHeader>
                            <div className="space-y-6 mt-6 px-6 pb-6">
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-md border border-orange-200">
                                    <h4 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-orange-600" />
                                        How You Might Feel:
                                    </h4>
                                    <p className="text-orange-800 leading-relaxed italic">"Full of joy, but also completely exhausted and overwhelmed."</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                                    <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-pink-500" />
                                        Common Worries:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-orange-600 text-sm font-bold">1</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Everyone focuses on the baby, but I'm worried about my own recovery</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-orange-600 text-sm font-bold">2</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Hearing so many myths and facts - don't know what's right for baby care</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-orange-600 text-sm font-bold">3</span>
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">Feeling a bit down and weepy, scared to admit "post-partum blues"</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md border border-purple-200">
                                    <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600" />
                                        How Sakhi Supports You:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Post-delivery checklist for your recovery and baby's basic needs</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Connects you to mental health support resources</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Reminders for baby's vaccination schedule</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-purple-900 leading-relaxed">Keep asking questions about newborn care anytime</span>
                                        </li>
                                    </ul>
                                </div>

                                <Button onClick={() => setLocation("/sakhi")} className="w-full gradient-button text-white py-4 md:py-6 text-base md:text-lg font-semibold hover:shadow-xl transition-all duration-300">
                                    <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                    Talk to Sakhi About This Stage
                                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Scroll indicator for mobile and tablet */}
            <div className="flex justify-center mt-4 xl:hidden">
                <div className="flex gap-2 items-center text-xs text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <ArrowRight className="w-3 h-3 animate-bounce" style={{ animationDirection: 'alternate' }} />
                    <span>Swipe to see more</span>
                </div>
            </div>
        </section>
    );
}
