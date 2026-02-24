import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import OnboardingQuestions from "@/components/OnboardingQuestions";

// New Sakhi Web Page Components
import { HeroSection } from "@/components/sakhi-web/HeroSection";
import { ValueProposition } from "@/components/sakhi-web/ValueProposition";
import { HowItWorks } from "@/components/sakhi-web/HowItWorks";
import { SpecificWays } from "@/components/sakhi-web/SpecificWays";
import { InteractiveDemo } from "@/components/sakhi-web/InteractiveDemo";
import { WhyChooseSakhi } from "@/components/sakhi-web/WhyChooseSakhi";
import { SocialProof } from "@/components/sakhi-web/SocialProof";
import { FAQSection } from "@/components/sakhi-web/FAQSection";


const Sakhi = () => {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrySakhiClick = () => {
    // Always show auth modal for static demonstration
    setShowAuthModal(true);
  };

  const [userRelationship, setUserRelationship] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const handleAuthSuccess = (isNewUser: boolean, relationship?: string, userId?: string) => {
    console.log("=== handleAuthSuccess called ===");
    console.log("isNewUser:", isNewUser);
    console.log("relationship:", relationship);
    console.log("userId:", userId);

    if (isNewUser) {
      // New user - show onboarding questions
      console.log("New user detected - preparing to show onboarding questions");

      const finalRelationship = relationship || "herself";
      const finalUserId = userId || "";

      console.log("Setting relationship:", finalRelationship);
      console.log("Setting userId:", finalUserId);

      // Set the user data immediately
      setUserRelationship(finalRelationship);
      setUserId(finalUserId);

      // Persist to localStorage
      localStorage.setItem("userId", finalUserId);
      localStorage.setItem("userRelationship", finalRelationship);
      // We don't have the name directly here unless we pass it, but we can set a default if needed
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", "User");
      }

      // Close auth modal
      setShowAuthModal(false);

      // Open onboarding modal after auth modal closes
      setTimeout(() => {
        console.log("Opening onboarding modal...");
        setShowOnboarding(true);
      }, 300);

    } else {
      // Existing user - redirect to /sakhi/try
      console.log("Existing user - redirecting to /sakhi/try");

      setShowAuthModal(false);

      toast({
        title: "Welcome back!",
        description: "You're all set to continue your journey.",
      });

      if (userId) localStorage.setItem("userId", userId);
      if (relationship) localStorage.setItem("userRelationship", relationship);
      // We assume userName might be set elsewhere or default to User
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", "User");
      }

      setTimeout(() => {
        setLocation("/sakhi/try");
      }, 500);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <HeroSection onCtaClick={handleTrySakhiClick} />
        <ValueProposition onCtaClick={handleTrySakhiClick} />
        <HowItWorks />
        <SpecificWays />
        <InteractiveDemo onCtaClick={handleTrySakhiClick} />
        <WhyChooseSakhi onCtaClick={handleTrySakhiClick} />
        <SocialProof />
        <FAQSection onCtaClick={handleTrySakhiClick} />

      </div>

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Onboarding Questions Modal */}
      <OnboardingQuestions
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        relationship={userRelationship}
        userId={userId}
      />
    </>
  );
};

export default Sakhi;
