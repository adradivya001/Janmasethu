import { Link, useLocation } from "wouter";
import React from "react";
import {
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";
import { useLanguage } from "../i18n/LanguageProvider";
import { Button } from "../components/ui/button";
import { articles } from "../data/articles";
import { stories } from "../data/stories";
import WhoWeServe from "../components/WhoWeServe";
import Autoplay from "embla-carousel-autoplay";

import { useJourney } from "../contexts/JourneyContext";
import SakhiPreview from "../components/home/SakhiPreview";
import KnowledgePreview from "../components/home/KnowledgePreview";
import TreatmentsPreview from "../components/home/TreatmentsPreview";
import FAQSection from "../components/home/FAQSection";
import JourneyTimeline from "../components/home/JourneyTimeline";
import JourneyDashboard from "../components/home/JourneyDashboard";

const Home = () => {
  const { t, lang } = useLanguage();
  const { journey } = useJourney();
  const [, setLocation] = useLocation();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = 7;

  React.useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const featuredArticles = articles.slice(0, 4);
  const featuredStories = stories.slice(0, 3);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <>
      {/* Responsive Carousel Section - Using explicit vertical flow to prevent any overlap or collision */}
      <section className="w-full relative bg-white border-b border-gray-50 overflow-hidden">
        <div className="w-full flex flex-col">
          {/* Carousel Container - Clean heights with overflow hidden */}
          <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] overflow-hidden bg-gray-50">
            <Carousel
              plugins={[plugin.current]}
              className="w-full h-full"
              setApi={setCarouselApi}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent className="h-full">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <CarouselItem key={num} className="h-full">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={`/JS slides/${num}.png`}
                        alt={`Slide ${num}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
                <CarouselItem key={7} className="h-full">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src="/JS slides/7 new.png"
                      alt="Slide 7"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              {/* Navigation Arrows - Safely positioned */}
              <CarouselPrevious className="hidden md:flex !left-6 bg-white/30 hover:bg-white/50 backdrop-blur-sm border-none shadow-lg w-12 h-12 !top-[50%] !-translate-y-[50%]" />
              <CarouselNext className="hidden md:flex !right-6 bg-white/30 hover:bg-white/50 backdrop-blur-sm border-none shadow-lg w-12 h-12 !top-[50%] !-translate-y-[50%]" />
            </Carousel>
          </div>

          {/* Pagination Indicators - Dedicated block BELOW the carousel images in the document flow */}
          <div className="w-full py-2 md:py-3 lg:py-4 bg-[#fdf2f8] flex justify-center items-center">
            <div className="flex justify-center gap-2 md:gap-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-1 rounded-full transition-all duration-300 shadow-sm ${currentSlide === index
                    ? "bg-purple-600 w-4 md:w-6"
                    : "bg-purple-200/50 hover:bg-purple-300 w-1.5 md:w-2"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container - Minimal spacing to ensure a tight connection with the carousel section */}
      <div className="container mx-auto px-4 py-2 mt-0 md:mt-1 lg:mt-2">
        {/* Hero Section */}
        <section className="text-center py-6 md:py-12 lg:py-20 relative overflow-hidden lg:rounded-[3rem] lg:bg-gradient-to-br lg:from-white lg:via-purple-50/50 lg:to-pink-50/50">
          {/* Trust Badge - Centered at top */}
          <div className="flex justify-center mb-3 md:mb-6">
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
            className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text font-serif mb-4 md:mb-6 leading-tight md:leading-relaxed text-center"
            data-testid="text-hero-title"
          >
            <span dangerouslySetInnerHTML={{ __html: t("hero_title") }} />
          </h1>

          {/* Hero Subtitle */}
          <p
            className="text-base md:text-xl text-muted-foreground mb-4 md:mb-8 max-w-3xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            {t("hero_sub")}
          </p>

          {/* Animated Line Morphing Effect - Hidden on mobile */}
          <div className="relative mb-4 md:mb-8 hidden md:block">
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
            <a href="http://72.61.228.9:4500" className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
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
            </a>
          </div>

          {/* Hero Background Image - Visible on all screens for consistent design */}
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

        {/* Journey Dashboard - Show First if active */}
        <JourneyDashboard />

        {/* Who We Serve - Interactive Cards with Modal */}
        <WhoWeServe />

        {/* Dynamic Sections based on Journey Stage */}
        {journey?.stage === 'TTC' ? (
          <>
            <TreatmentsPreview />
            <SakhiPreview />
            <KnowledgePreview />
          </>
        ) : journey?.stage === 'PARENT' ? (
          <>
            <KnowledgePreview />
            <SakhiPreview />
            <TreatmentsPreview />
          </>
        ) : (
          // Default order for PREGNANT, None, or others
          <>
            <SakhiPreview />
            <KnowledgePreview />
            <TreatmentsPreview />
          </>
        )}

        {/* Parenthood Journey Strip - Visual Roadmap */}
        <JourneyTimeline />

        <FAQSection />
      </div>
    </>
  );
};

// Helper functions (kept for safety if referenced elsewhere, though unlikely)
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