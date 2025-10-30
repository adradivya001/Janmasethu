import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Heart,
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  Send,
  Star,
  Shield,
  Clock,
  User,
  Stethoscope,
  Building2,
  PlayCircle,
  CheckCircle,
  Award,
  Target,
  TrendingUp,
  IndianRupee,
  Baby,
  Cat,
  Apple,
  Syringe,
  Microscope,
  Dna,
  HeartHandshake,
  Snowflake,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useLanguage } from "../i18n/LanguageProvider";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { articles } from "../data/articles";
import { stories } from "../data/stories";
import WhoWeServe from "../components/WhoWeServe";

const Home = () => {
  const { t, lang } = useLanguage();
  const [, setLocation] = useLocation();

  const featuredArticles = articles.slice(0, 4);
  const featuredStories = stories.slice(0, 3);

  const getTreatmentCards = () => [
    {
      slug: "iui",
      name: t("treatment_iui_title"),
      description: t("treatment_iui_desc"),
      icon: Syringe,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      slug: "ivf",
      name: t("treatment_ivf_title"),
      description: t("treatment_ivf_desc"),
      icon: Microscope,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      slug: "icsi",
      name: t("treatment_icsi_title"),
      description: t("treatment_icsi_desc"),
      icon: Dna,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      slug: "donor-options",
      name: t("treatment_donor_title"),
      description: t("treatment_donor_desc"),
      icon: HeartHandshake,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      slug: "fertility-preservation",
      name: t("treatment_preservation_title"),
      description: t("treatment_preservation_desc"),
      icon: Snowflake,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
  ];

  return (
    <>
      {/* Responsive Video Section */}
      <section className="w-full py-4 px-2 sm:px-4 lg:py-8 lg:px-8">
        <div className="relative w-full mx-auto overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/babyFeet.jpg"
              webkit-playsinline="true"
              x5-playsinline="true"
              onLoadStart={() => console.log("Video loading started...")}
              onLoadedData={() => console.log("Video data loaded")}
              onCanPlay={() => console.log("Video can play")}
              onPlay={() => console.log("Video started playing")}
            >
              <source src="/Janmasethu1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 relative">
          {/* Trust Badge - Centered at top */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 card-shadow">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span
                className="text-sm font-medium text-foreground"
                data-testid="text-trust-badge"
              >
                {t("trust_pill")}
              </span>
            </div>
          </div>

          {/* Hero Title - On its own line below */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text font-serif mb-6 leading-relaxed"
            data-testid="text-hero-title"
          >
            <span dangerouslySetInnerHTML={{ __html: t("hero_title") }} />
          </h1>

          {/* Hero Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            {t("hero_sub")}
          </p>

          {/* Animated Line Morphing Effect */}
          <div className="relative mb-8">
            <svg
              className="w-full h-24 mx-auto animated-line"
              viewBox="0 0 400 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main morphing line */}
              <path
                className="morphing-line"
                d="M20,50 Q100,30 200,50 Q300,70 380,50"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
              />

              {/* Couple symbol */}
              <circle
                className="morph-symbol couple"
                cx="60"
                cy="50"
                r="8"
                fill="url(#lineGradient)"
                opacity="0"
              />
              <circle
                className="morph-symbol couple"
                cx="80"
                cy="50"
                r="6"
                fill="url(#lineGradient)"
                opacity="0"
              />

              {/* Pregnancy symbol */}
              <ellipse
                className="morph-symbol pregnancy"
                cx="200"
                cy="50"
                rx="12"
                ry="15"
                fill="url(#lineGradient)"
                opacity="0"
              />

              {/* Cradle symbol */}
              <path
                className="morph-symbol cradle"
                d="M320,45 Q340,35 360,45 Q340,65 320,55 Z"
                fill="url(#lineGradient)"
                opacity="0"
              />
            </svg>
          </div>

          {/* CTA Buttons - Mobile Responsive */}
          <div className="flex flex-col gap-4 items-center max-w-md mx-auto px-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
            <Link href="/sakhi" className="w-full sm:w-auto">
              <Button
                className="gradient-button text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 group overflow-hidden relative w-full sm:w-auto min-w-0 sm:min-w-[200px]"
                data-testid="button-cta-primary"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2 truncate">
                  {t("cta_primary")}
                </span>
                <ArrowRight className="absolute right-3 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10" />
              </Button>
            </Link>
            <Link href="/clinic" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="bg-white/90 backdrop-blur-sm text-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-white/30 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group overflow-hidden relative w-full sm:w-auto min-w-0 sm:min-w-[200px]"
                data-testid="button-cta-secondary"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2 truncate">
                  {t("cta_secondary")}
                </span>
                <ArrowRight className="absolute right-3 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10" />
              </Button>
            </Link>
          </div>

          {/* Hero Background Image */}
          <div className="absolute inset-0 -z-10">
            <div className="relative w-full h-full">
              <img
                src="/babyFeet.jpg"
                alt="Baby feet - nurturing parenthood journey"
                className="w-full h-full object-cover rounded-3xl opacity-60"
              />
              {/* Light gradient overlay to maintain text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-purple-50/70 to-pink-50/70 rounded-3xl"></div>
            </div>
          </div>
        </section>

        {/* Who We Serve - Interactive Cards with Modal */}
        <WhoWeServe />

        {/* Parenthood Journey Strip */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl mx-4 relative overflow-hidden">
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-5">
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
          <div className="relative overflow-x-auto pb-8 px-4">
            {/* Centered and aligned timeline for all screens */}
            <div className="flex items-center justify-start md:justify-center gap-3 md:gap-4 min-w-max md:min-w-0 max-w-4xl mx-auto py-8">
              {/* Stage 1: Thinking of Parenthood */}
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage relative"
                    data-testid="journey-stage-thinking"
                    style={{ '--stage-index': 0 } as React.CSSProperties}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-green-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-green-300">
                        <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">🌱</span>
                      </div>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground text-center mb-2 group-hover:text-green-700 transition-colors duration-300">
                      {t("journey_stage_1_title")}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center max-w-[100px] md:max-w-[110px] group-hover:text-green-600 transition-colors duration-300 mb-2">
                      {t("journey_stage_1_desc")}
                    </p>
                    <span className="text-[10px] text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      Click to explore
                    </span>
                  </div>
                </DialogTrigger>
                {/* Changed DialogContent to be full-screen on mobile */}
                <DialogContent className="sm:max-w-2xl sm:max-h-[80vh] max-h-screen max-w-screen h-screen m-0 p-0 overflow-y-auto bg-gradient-to-br from-white via-green-50/30 to-purple-50/30">
                  <DialogHeader className="border-b border-green-100 pb-4 px-6 pt-6">
                    <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🌱</span>
                      </div>
                      <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Thinking of Parenthood</span>
                    </DialogTitle>
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

              {/* Connection Line 1 with animated gradient */}
              <div className="w-10 md:w-12 mx-1 md:mx-2 relative h-2 group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-pink-200 rounded-full transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Stage 2: Trying Naturally */}
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage relative"
                    data-testid="journey-stage-trying"
                    style={{ '--stage-index': 1 } as React.CSSProperties}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-pink-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-pink-300">
                        <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">💖</span>
                      </div>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground text-center mb-2 group-hover:text-pink-700 transition-colors duration-300">
                      {t("journey_stage_2_title")}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center max-w-[100px] md:max-w-[110px] group-hover:text-pink-600 transition-colors duration-300 mb-2">
                      {t("journey_stage_2_desc")}
                    </p>
                    <span className="text-[10px] text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      Click to explore
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl sm:max-h-[80vh] max-h-screen max-w-screen h-screen m-0 p-0 overflow-y-auto bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30">
                  <DialogHeader className="border-b border-pink-100 pb-4 px-6 pt-6">
                    <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl">💖</span>
                      </div>
                      <span className="bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">Trying Naturally</span>
                    </DialogTitle>
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

              {/* Connection Line 2 with animated gradient */}
              <div className="w-10 md:w-12 mx-1 md:mx-2 relative h-2 group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Stage 3: Exploring Options */}
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage"
                    data-testid="journey-stage-exploring"
                    style={{ '--stage-index': 2 } as React.CSSProperties}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-blue-300">
                        <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">🔬</span>
                      </div>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground text-center mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {t("journey_stage_3_title")}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center max-w-[100px] md:max-w-[110px] group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {t("journey_stage_3_desc")}
                    </p>
                    <span className="text-[10px] text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      Click to explore
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl sm:max-h-[80vh] max-h-screen max-w-screen h-screen m-0 p-0 overflow-y-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
                  <DialogHeader className="border-b border-blue-100 pb-4 px-6 pt-6">
                    <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🔬</span>
                      </div>
                      <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Exploring Options (IUI, IVF, Donor)</span>
                    </DialogTitle>
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

              {/* Connection Line 3 with animated gradient */}
              <div className="w-10 md:w-12 mx-1 md:mx-2 relative h-2 group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Stage 4: Pregnancy */}
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage"
                    data-testid="journey-stage-pregnancy"
                    style={{ '--stage-index': 3 } as React.CSSProperties}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-purple-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-purple-300">
                        <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">🤰</span>
                      </div>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground text-center mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {t("journey_stage_4_title")}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center max-w-[100px] md:max-w-[110px] group-hover:text-purple-600 transition-colors duration-300 mb-2">
                      {t("journey_stage_4_desc")}
                    </p>
                    <span className="text-[10px] text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      Click to explore
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl sm:max-h-[80vh] max-h-screen max-w-screen h-screen m-0 p-0 overflow-y-auto bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
                  <DialogHeader className="border-b border-purple-100 pb-4 px-6 pt-6">
                    <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🤰</span>
                      </div>
                      <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Pregnancy</span>
                    </DialogTitle>
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

              {/* Connection Line 4 with animated gradient */}
              <div className="w-10 md:w-12 mx-1 md:mx-2 relative h-2 group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-orange-200 rounded-full transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Stage 5: Post-Delivery */}
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex flex-col items-center group cursor-pointer transition-all duration-500 ease-out journey-stage"
                    data-testid="journey-stage-postdelivery"
                    style={{ '--stage-index': 4 } as React.CSSProperties}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative z-10 border-2 border-transparent group-hover:border-orange-300">
                        <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">👶</span>
                      </div>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-foreground text-center mb-2 group-hover:text-orange-700 transition-colors duration-300">
                      {t("journey_stage_5_title")}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center max-w-[100px] md:max-w-[110px] group-hover:text-orange-600 transition-colors duration-300 mb-2">
                      {t("journey_stage_5_desc")}
                    </p>
                    <span className="text-[10px] text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      Click to explore
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl sm:max-h-[80vh] max-h-screen max-w-screen h-screen m-0 p-0 overflow-y-auto bg-gradient-to-br from-white via-orange-50/30 to-purple-50/30">
                  <DialogHeader className="border-b border-orange-100 pb-4 px-6 pt-6">
                    <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl font-serif">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl">👶</span>
                      </div>
                      <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Post-Delivery & New Parent</span>
                    </DialogTitle>
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

          {/* Scroll indicator for mobile */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex gap-2 items-center text-xs text-muted-foreground">
              <ArrowRight className="w-3 h-3 animate-bounce" style={{ animationDirection: 'alternate' }} />
              <span>Swipe to see more</span>
            </div>
          </div>

          </section>

        {/* Sakhi Preview Section */}
        <section className="py-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
            <div className="sakhi-preview-mobile grid lg:grid-cols-2 gap-12 items-center">
              <div className="mobile-text-center lg:text-left">
                <h2
                  className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-6"
                  data-testid="text-sakhi-hero"
                  dangerouslySetInnerHTML={{ __html: t("sakhi_hero") }}
                ></h2>
                <p
                  className="text-base lg:text-lg text-muted-foreground mb-8"
                  data-testid="text-sakhi-sub"
                >
                  {t("sakhi_sub")}
                </p>

                <h3
                  className="text-xl lg:text-2xl font-bold text-foreground font-serif mb-4"
                  data-testid="text-sakhi-how-title"
                >
                  {t("sakhi_how_title")}
                </h3>
                <ul className="space-y-3 mb-8 text-left">
                  {t("sakhi_how_list")
                    .split("|")
                    .filter((item: string) => item.trim().length > 0)
                    .map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3"
                        data-testid={`item-sakhi-help-${index}`}
                      >
                        <Heart className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm lg:text-base">
                          {item.trim()}
                        </span>
                      </li>
                    ))}
                </ul>

                <div className="flex justify-center lg:justify-start">
                  <Button
                    onClick={() => setLocation("/sakhi")}
                    className="mobile-cta-fix lg:inline-flex gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 items-center"
                    data-testid="button-try-sakhi"
                  >
                    {t("sakhi_try")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Interface Preview */}
              <Card className="rounded-3xl p-6 card-shadow">
                <div className="border-b border-border pb-4 mb-4">
                  <h4
                    className="font-bold text-foreground"
                    data-testid="text-chat-preview-title"
                  >
                    Chat with Sakhi
                  </h4>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-chat-preview-hint"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    Sakhi is online and ready to help
                  </p>
                </div>

                <div className="space-y-4 mb-4 h-60 overflow-y-auto">
                  {/* Sample Chat Messages */}
                  <div className="flex justify-end">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl max-w-xs shadow-md"
                      data-testid="message-sample-user"
                    >
                      I'm feeling anxious about tomorrow's scan
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-2xl max-w-xs shadow-md"
                      data-testid="message-sample-bot"
                    >
                      I understand your anxiety. It's completely normal to feel
                      this way before scans.
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="animate-pulse">
                          💭 Try some deep breathing exercises...
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-full focus:ring-ring"
                    data-testid="input-chat-preview"
                  />
                  <Button
                    className="gradient-button text-white rounded-full hover:shadow-lg transition-all duration-300"
                    data-testid="button-send-preview"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <p
                  className="text-xs text-muted-foreground mt-2"
                  data-testid="text-chat-preview-privacy"
                >
                  {t("chat_privacy")}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Explore by Lens Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-lens-title"
            >
              {t("lens_title")}
            </h2>
          </div>

          {/* Horizontal scrollable container */}
          <div className="relative -mx-4 md:mx-0">
            <div className="overflow-x-auto scrollbar-hide py-6 px-4 md:px-0">
              <div className="flex gap-6 md:gap-8 min-w-min lg:grid lg:grid-cols-4 lg:gap-6">
                {/* Medical Lens */}
                <Link href="/knowledge?lens=medical" className="group flex-shrink-0 lg:flex-shrink">
                  <Card className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-full rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-blue-200 relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 h-full">
                    <CardContent className="p-0 flex flex-col h-full justify-center">
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </div>
                      </div>

                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Stethoscope className="text-blue-600 text-2xl" />
                      </div>
                      <h3
                        className="text-xl font-bold text-foreground font-serif mb-4 group-hover:text-blue-600 transition-colors"
                        data-testid="text-lens-medical"
                      >
                        {t("lens_medical")}
                      </h3>

                      {/* Call to action */}
                      <div className="flex items-center justify-center mt-auto">
                        <span className="text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {lang === "en" && "Browse topics"}
                          {lang === "hi" && "विषय ब्राउज़ करें"}
                          {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Social & Emotional Lens */}
                <Link href="/knowledge?lens=social" className="group flex-shrink-0 lg:flex-shrink">
                  <Card className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-full rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-pink-200 relative overflow-hidden bg-gradient-to-br from-white to-pink-50/30 h-full">
                    <CardContent className="p-0 flex flex-col h-full justify-center">
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-pink-600" />
                        </div>
                      </div>

                      <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Users className="text-pink-600 text-2xl" />
                      </div>
                      <h3
                        className="text-xl font-bold text-foreground font-serif mb-4 group-hover:text-pink-600 transition-colors"
                        data-testid="text-lens-social"
                      >
                        {t("lens_social")}
                      </h3>

                      {/* Call to action */}
                      <div className="flex items-center justify-center mt-auto">
                        <span className="text-sm text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {lang === "en" && "Browse topics"}
                          {lang === "hi" && "विषय ब्राउज़ करें"}
                          {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Financial Lens */}
                <Link href="/knowledge?lens=financial" className="group flex-shrink-0 lg:flex-shrink">
                  <Card className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-full rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-green-200 relative overflow-hidden bg-gradient-to-br from-white to-green-50/30 h-full">
                    <CardContent className="p-0 flex flex-col h-full justify-center">
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-green-600" />
                        </div>
                      </div>

                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <IndianRupee className="text-green-600 text-2xl" />
                      </div>
                      <h3
                        className="text-xl font-bold text-foreground font-serif mb-4 group-hover:text-green-600 transition-colors"
                        data-testid="text-lens-financial"
                      >
                        {t("lens_financial")}
                      </h3>

                      {/* Call to action */}
                      <div className="flex items-center justify-center mt-auto">
                        <span className="text-sm text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {lang === "en" && "Browse topics"}
                          {lang === "hi" && "विषय ब्राउज़ करें"}
                          {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Nutrition Lens */}
                <Link href="/knowledge?lens=nutrition" className="group flex-shrink-0 lg:flex-shrink">
                  <Card className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-full rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-orange-200 relative overflow-hidden bg-gradient-to-br from-white to-orange-50/30 h-full">
                    <CardContent className="p-0 flex flex-col h-full justify-center">
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-orange-600" />
                        </div>
                      </div>

                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Apple className="text-orange-600 text-2xl" />
                      </div>
                      <h3
                        className="text-xl font-bold text-foreground font-serif mb-4 group-hover:text-orange-600 transition-colors"
                        data-testid="text-lens-nutrition"
                      >
                        {t("lens_nutrition")}
                      </h3>

                      {/* Call to action */}
                      <div className="flex items-center justify-center mt-auto">
                        <span className="text-sm text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {lang === "en" && "Browse topics"}
                          {lang === "hi" && "विषय ब्राउज़ करें"}
                          {lang === "te" && "విషయాలను బ్రౌజ్ చేయండి"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="flex justify-center mt-4 lg:hidden">
              <div className="flex gap-2 items-center text-xs text-muted-foreground">
                <ArrowRight className="w-3 h-3 animate-bounce" style={{ animationDirection: 'alternate' }} />
                <span>Swipe to see more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Knowledge Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-featured-title"
            >
              {t("featured_title")}
            </h2>
          </div>

          {/* Horizontal scrollable container */}
          <div className="relative -mx-4 md:mx-0">
            <div className="overflow-x-auto scrollbar-hide py-6 px-4 md:px-0">
              <div className="flex gap-6 md:gap-8 min-w-min lg:grid lg:grid-cols-4 lg:gap-8">
                {featuredArticles.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/knowledge/${article.slug}`}
                    className="group flex-shrink-0 lg:flex-shrink"
                  >
                    <Card
                      className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-full rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30 h-full"
                      data-testid={`card-featured-article-${index}`}
                    >
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Click indicator */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-purple-600" />
                          </div>
                        </div>

                        <img
                          src={getArticleImage(index)}
                          alt={article.title.en}
                          className="rounded-xl w-full h-32 object-cover mb-4 group-hover:shadow-lg transition-shadow"
                        />
                        <h3
                          className="text-lg font-bold text-foreground font-serif mb-2 group-hover:text-purple-600 transition-colors"
                          data-testid={`text-article-title-${index}`}
                        >
                          {article.title[lang as keyof typeof article.title] ||
                            article.title.en}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground flex-grow mb-4"
                          data-testid={`text-article-summary-${index}`}
                        >
                          {article.summary[lang as keyof typeof article.summary] ||
                            article.summary.en}
                        </p>

                        {/* Call to action */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {lang === "en" && "Read article"}
                            {lang === "hi" && "लेख पढ़ें"}
                            {lang === "te" && "వ్యాసం చదవండి"}
                          </span>
                          <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="flex justify-center mt-4 lg:hidden">
              <div className="flex gap-2 items-center text-xs text-muted-foreground">
                <ArrowRight className="w-3 h-3 animate-bounce" style={{ animationDirection: 'alternate' }} />
                <span>Swipe to see more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Treatments Overview Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-treatments-title"
            >
              {t("treatments_overview_title")}
            </h2>
          </div>

          {/* Horizontal scrollable container */}
          <div className="relative -mx-4 md:mx-0">
            <div className="overflow-x-auto scrollbar-hide py-8 px-6 md:px-4">
              <div className="flex gap-6 md:gap-8 min-w-min">
                {getTreatmentCards().map((treatment, index) => (
                  <Link
                    key={treatment.slug}
                    href={`/treatments/${treatment.slug}`}
                    className="group flex-shrink-0"
                  >
                    <Card
                      className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30 h-full"
                      data-testid={`card-treatment-${index}`}
                    >
                      <CardContent className="p-0 flex flex-col h-full">
                        <div
                          className={`w-16 h-16 ${treatment.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}
                        >
                          <treatment.icon
                            className={`${treatment.iconColor} w-8 h-8`}
                          />
                        </div>
                        <h3
                          className="text-2xl font-bold text-foreground font-serif mb-4 group-hover:text-purple-600 transition-colors"
                          data-testid={`text-treatment-name-${index}`}
                        >
                          {treatment.name}
                        </h3>
                        <p
                          className="text-muted-foreground flex-grow mb-6"
                          data-testid={`text-treatment-desc-${index}`}
                        >
                          {treatment.description}
                        </p>

                        {/* Call to action */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {lang === "en" && "Learn more"}
                            {lang === "hi" && "और जानें"}
                            {lang === "te" && "మరింత తెలుసుకోండి"}
                          </span>
                          <ArrowRight className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="flex justify-center mt-4 md:hidden">
              <div className="flex gap-2 items-center text-xs text-muted-foreground">
                <ArrowRight className="w-3 h-3 animate-bounce" style={{ animationDirection: 'alternate' }} />
                <span>Swipe to see more</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-4">
          <div className="text-center mb-3">
            <h2
              className="text-xl md:text-2xl font-bold text-foreground font-serif mb-1"
              data-testid="text-faq-title"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about JanmaSethu
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="rounded-xl p-2 card-shadow bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-0">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-1"
                >
                  <AccordionItem
                    value="item-1"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        What is JanmaSethu?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      JanmaSethu is a digital guide that supports you through
                      your journey to parenthood — from planning to pregnancy
                      and beyond. It brings together trusted medical
                      information, local language support, and personal guidance
                      through our companion, Sakhi.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        Is JanmaSethu a hospital or fertility clinic?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      No. JanmaSethu is not a clinic — we don't provide medical
                      treatment directly. We help you understand your options,
                      prepare for appointments, and connect you to verified
                      clinics and experts when you're ready.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        Is Sakhi free to use?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      Yes. Reading articles, using checklists, or chatting with
                      Sakhi is completely free for everyone.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        What is Sakhi?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      Sakhi is your AI-powered health companion inside
                      JanmaSethu. You can chat with her anytime for fertility or
                      pregnancy guidance in your own language — she's friendly,
                      quick, and always ready to help.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        How does JanmaSethu get its medical information?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      All our content is written and reviewed by real doctors
                      and nurses. Each article clearly mentions the reviewer's
                      name and date, so you know it's verified and updated.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        Will my personal details be safe?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      Absolutely. We never share your personal data with anyone.
                      Your chats and health questions stay private and secure.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-7"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        What languages can I use JanmaSethu in?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      You can switch between English, Hindi, and Telugu anytime
                      — and more Indian languages are coming soon.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8" className="border-b-0">
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors py-3">
                      <span className="font-semibold text-foreground text-sm">
                        What makes JanmaSethu different from other health
                        websites?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      Most sites just give you articles. JanmaSethu actually
                      guides you step-by-step — with localized content, verified
                      doctors, reminders, and a personal companion that
                      understands your journey.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

// Helper functions
const getArticleImage = (index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  ];
  return images[index] || images[0];
};

const getStoryImage = (index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  ];
  return images[index] || images[0];
};

export default Home;