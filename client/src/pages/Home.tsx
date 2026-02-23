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
import AnimatedButton from "../components/AnimatedButton";
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
import PopularTools from "../components/home/PopularTools";
import CinematicHero from "../components/home/CinematicHero";
import ScrollReveal from "../components/home/ScrollReveal";

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
      {/* Cinematic Hero Section - Scrollytelling Experience */}
      <CinematicHero />

      {/* Main Content Wrapper - Full Width Background to Cover Sticky Nav */}
      <div className="relative z-50 w-full bg-[#FFF1EC] shadow-2xl rounded-t-[20px] md:rounded-t-[40px] -mt-2 md:-mt-4 pt-8 pb-16">
        <div className="container mx-auto px-4">

          {/* Journey Dashboard - Show First if active */}
          <ScrollReveal delay={0.1}>
            <JourneyDashboard />
          </ScrollReveal>

          {/* Popular Tools Section - Replaces Who We Serve */}
          <ScrollReveal delay={0.2}>
            <PopularTools />
          </ScrollReveal>

          {/* Dynamic Sections based on Journey Stage */}
          <ScrollReveal delay={0.3}>
            <SakhiPreview />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <KnowledgePreview />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <TreatmentsPreview />
          </ScrollReveal>

          {/* Parenthood Journey Strip - Visual Roadmap */}
          <ScrollReveal>
            <JourneyTimeline />
          </ScrollReveal>



          <ScrollReveal>
            <FAQSection />
          </ScrollReveal>
        </div>
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