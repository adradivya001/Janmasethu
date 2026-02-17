import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ValueProposition } from './components/ValueProposition';
import { HowItWorks } from './components/HowItWorks';
import { SpecificWays } from './components/SpecificWays';
import { InteractiveDemo } from './components/InteractiveDemo';
import { WhyChooseSakhi } from './components/WhyChooseSakhi';
import { SocialProof } from './components/SocialProof';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <ValueProposition />
      <HowItWorks />
      <SpecificWays />
      <InteractiveDemo />
      <WhyChooseSakhi />
      <SocialProof />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
