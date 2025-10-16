import { Link } from "wouter";
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
import { useLanguage } from "../i18n/LanguageProvider";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { articles } from "../data/articles";
import { stories } from "../data/stories";
import WhoWeServe from "../components/WhoWeServe";

const Home = () => {
  const { t, lang } = useLanguage();

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
              className="absolute top-0 left-0 w-full h-full object-contain md:object-cover"
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
        <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl mx-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-journey-title"
            >
              {t("journey_title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("journey_subtitle")}
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative overflow-x-auto pb-8">
            <div className="journey-timeline-mobile flex items-center justify-between min-w-[800px] px-8">
              {/* Stage 1: Thinking of Parenthood */}
              <div
                className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300"
                data-testid="journey-stage-thinking"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors shadow-lg">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-sm font-bold text-foreground text-center mb-2">
                  {t("journey_stage_1_title")}
                </h3>
                <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                  {t("journey_stage_1_desc")}
                </p>
                <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                  <p className="text-xs text-center whitespace-nowrap">
                    {t("journey_stage_tooltip")}
                  </p>
                </div>
              </div>

              {/* Connection Line 1 */}
              <div className="flex-1 h-1 bg-gradient-to-r from-green-200 to-pink-200 mx-4 rounded-full min-w-[40px]"></div>

              {/* Stage 2: Trying Naturally */}
              <div
                className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300"
                data-testid="journey-stage-trying"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors shadow-lg">
                  <span className="text-2xl">💖</span>
                </div>
                <h3 className="text-sm font-bold text-foreground text-center mb-2">
                  {t("journey_stage_2_title")}
                </h3>
                <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                  {t("journey_stage_2_desc")}
                </p>
                <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                  <p className="text-xs text-center whitespace-nowrap">
                    {t("journey_stage_tooltip")}
                  </p>
                </div>
              </div>

              {/* Connection Line 2 */}
              <div className="flex-1 h-1 bg-gradient-to-r from-pink-200 to-blue-200 mx-4 rounded-full min-w-[40px]"></div>

              {/* Stage 3: Exploring Options */}
              <div
                className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300"
                data-testid="journey-stage-exploring"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors shadow-lg">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-sm font-bold text-foreground text-center mb-2">
                  {t("journey_stage_3_title")}
                </h3>
                <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                  {t("journey_stage_3_desc")}
                </p>
                <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                  <p className="text-xs text-center whitespace-nowrap">
                    {t("journey_stage_tooltip")}
                  </p>
                </div>
              </div>

              {/* Connection Line 3 */}
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-200 to-purple-200 mx-4 rounded-full min-w-[40px]"></div>

              {/* Stage 4: Pregnancy */}
              <div
                className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300"
                data-testid="journey-stage-pregnancy"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors shadow-lg">
                  <span className="text-2xl">🤰</span>
                </div>
                <h3 className="text-sm font-bold text-foreground text-center mb-2">
                  {t("journey_stage_4_title")}
                </h3>
                <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                  {t("journey_stage_4_desc")}
                </p>
                <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                  <p className="text-xs text-center whitespace-nowrap">
                    {t("journey_stage_tooltip")}
                  </p>
                </div>
              </div>

              {/* Connection Line 4 */}
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-200 to-orange-200 mx-4 rounded-full min-w-[40px]"></div>

              {/* Stage 5: Post-Delivery */}
              <div
                className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300"
                data-testid="journey-stage-postdelivery"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors shadow-lg">
                  <span className="text-2xl">👶</span>
                </div>
                <h3 className="text-sm font-bold text-foreground text-center mb-2">
                  {t("journey_stage_5_title")}
                </h3>
                <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                  {t("journey_stage_5_desc")}
                </p>
                <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                  <p className="text-xs text-center whitespace-nowrap">
                    {t("journey_stage_tooltip")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA under strip - Mobile Responsive */}
          <div className="journey-mobile-cta text-center mt-12">
            <Link href="/sakhi" className="inline-block w-full sm:w-auto">
              <Button
                className="mobile-cta-fix gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center"
                data-testid="button-sakhi-support"
              >
                {t("journey_cta")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
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
                  <Link href="/sakhi">
                    <Button
                      className="mobile-cta-fix lg:inline-flex gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 items-center"
                      data-testid="button-try-sakhi"
                    >
                      {t("sakhi_try")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
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

        {/* Start Here - Orientation Section */}
        <section className="mobile-section-spacing py-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-orientation-title"
            >
              {t("orient_title")}
            </h2>
          </div>

          <div className="mobile-grid-fix grid md:grid-cols-3 gap-8">
            {/* TTC Card */}
            <Link href="/life-stages/ttc" className="group h-full">
              <Card className="mobile-card-spacing rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Click indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>

                  <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <Heart className="text-white text-2xl" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-foreground font-serif mb-4 group-hover:text-purple-600 transition-colors"
                    data-testid="text-ttc-title"
                  >
                    {t("orient_ttc")}
                  </h3>
                  <p
                    className="text-muted-foreground mb-6 flex-grow"
                    data-testid="text-ttc-desc"
                  >
                    {t("orient_desc_ttc")}
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Couple walking together in park"
                    className="rounded-xl w-full h-32 object-cover mt-auto group-hover:shadow-lg transition-shadow"
                  />

                  {/* Call to action */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {lang === "en" && "Explore this stage"}
                      {lang === "hi" && "इस चरण का अन्वेषण करें"}
                      {lang === "te" && "ఈ దశను అన్వేషించండి"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pregnancy Card */}
            <Link href="/life-stages/pregnancy" className="group h-full">
              <Card className="rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-pink-200 relative overflow-hidden bg-gradient-to-br from-white to-pink-50/30">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Click indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-pink-600" />
                    </div>
                  </div>

                  <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <Baby className="text-white text-2xl" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-foreground font-serif mb-4 group-hover:text-pink-600 transition-colors"
                    data-testid="text-pregnancy-title"
                  >
                    {t("orient_preg")}
                  </h3>
                  <p
                    className="text-muted-foreground mb-6 flex-grow"
                    data-testid="text-pregnancy-desc"
                  >
                    {t("orient_desc_preg")}
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1544787215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Pregnant woman in peaceful outdoor setting"
                    className="rounded-xl w-full h-32 object-cover mt-auto group-hover:shadow-lg transition-shadow"
                  />

                  {/* Call to action */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {lang === "en" && "Explore this stage"}
                      {lang === "hi" && "इस चरण का अन्वेषण करें"}
                      {lang === "te" && "ఈ దశను అన్వేషించండి"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* New Parent Card */}
            <Link href="/life-stages/newborn" className="group h-full">
              <Card className="rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-orange-200 relative overflow-hidden bg-gradient-to-br from-white to-orange-50/30">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Click indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>

                  <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <Cat className="text-white text-2xl" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-foreground font-serif mb-4 group-hover:text-orange-600 transition-colors"
                    data-testid="text-parent-title"
                  >
                    {t("orient_parent")}
                  </h3>
                  <p
                    className="text-muted-foreground mb-6 flex-grow"
                    data-testid="text-parent-desc"
                  >
                    {t("orient_desc_parent")}
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Happy new parent holding newborn baby"
                    className="rounded-xl w-full h-32 object-cover mt-auto group-hover:shadow-lg transition-shadow"
                  />

                  {/* Call to action */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {lang === "en" && "Explore this stage"}
                      {lang === "hi" && "इस चरण का अन्वेषण करें"}
                      {lang === "te" && "ఈ దశను అన్వేషించండి"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-orange-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Medical Lens */}
            <Link href="/knowledge?lens=medical" className="group h-full">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-blue-200 relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
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
            <Link href="/knowledge?lens=social" className="group h-full">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-pink-200 relative overflow-hidden bg-gradient-to-br from-white to-pink-50/30">
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
            <Link href="/knowledge?lens=financial" className="group h-full">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-green-200 relative overflow-hidden bg-gradient-to-br from-white to-green-50/30">
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
            <Link href="/knowledge?lens=nutrition" className="group h-full">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 text-center h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-orange-200 relative overflow-hidden bg-gradient-to-br from-white to-orange-50/30">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/knowledge/${article.slug}`}
                className="group h-full"
              >
                <Card
                  className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getTreatmentCards().map((treatment, index) => (
              <Link
                key={treatment.slug}
                href={`/treatments/${treatment.slug}`}
                className="group h-full"
              >
                <Card
                  className="rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30"
                  data-testid={`card-treatment-${index}`}
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Click indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>

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
        </section>

        {/* Success Stories Preview */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-success-title"
            >
              {t("success_preview_title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <Link
                key={story.slug}
                href={`/success-stories/${story.slug}`}
                className="group h-full"
              >
                <Card
                  className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-pink-200 relative overflow-hidden bg-gradient-to-br from-white to-pink-50/30"
                  data-testid={`card-success-story-${index}`}
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Click indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-pink-600" />
                      </div>
                    </div>

                    <img
                      src={getStoryImage(index)}
                      alt={story.title}
                      className="rounded-xl w-full h-32 object-cover mb-4 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                    />
                    <h3
                      className="text-lg font-bold text-foreground font-serif mb-2 group-hover:text-pink-600 transition-colors"
                      data-testid={`text-story-title-${index}`}
                    >
                      {story.title[lang]}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground mb-4 flex-grow"
                      data-testid={`text-story-summary-${index}`}
                    >
                      {story.summary[lang]}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        <span data-testid={`text-story-city-${index}`}>
                          {story.city[lang]}
                        </span>
                      </div>

                      {/* Call to action */}
                      <div className="flex items-center">
                        <span className="text-xs text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">
                          {lang === "en" && "Read story"}
                          {lang === "hi" && "कहानी पढ़ें"}
                          {lang === "te" && "కథ చదవండి"}
                        </span>
                        <ArrowRight className="w-4 h-4 text-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-foreground font-serif mb-4"
              data-testid="text-faq-title"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about JanmaSethu and how we support
              your journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="rounded-3xl p-8 card-shadow bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-0">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  <AccordionItem
                    value="item-1"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        What is JanmaSethu?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
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
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        Is JanmaSethu a hospital or fertility clinic?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
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
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        Is JanmaSethu free to use?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes. Reading articles, using checklists, or chatting with
                      Sakhi is completely free for everyone.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        What is Sakhi?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
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
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        How does JanmaSethu get its medical information?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      All our content is written and reviewed by real doctors
                      and nurses. Each article clearly mentions the reviewer's
                      name and date, so you know it's verified and updated.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        Will my personal details be safe?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Absolutely. We never share your personal data with anyone.
                      Your chats and health questions stay private and secure.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-7"
                    className="border-b border-purple-100"
                  >
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        What languages can I use JanmaSethu in?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      You can switch between English, Hindi, and Telugu anytime
                      — and more Indian languages are coming soon.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8" className="border-b-0">
                    <AccordionTrigger className="text-left hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-foreground">
                        What makes JanmaSethu different from other health
                        websites?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
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
