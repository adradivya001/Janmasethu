
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Mail, 
  Target, 
  Users, 
  TrendingUp, 
  Globe, 
  Shield, 
  Heart,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Lightbulb,
  Building2
} from 'lucide-react';

const Investors = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. Hero / Intro */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground font-serif mb-6" data-testid="text-hero-title">
          Invest in the future of <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Parenthood Care</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed" data-testid="text-hero-mission">
          Bridging trust, preparedness, and AI in healthcare to transform the fertility journey for Indian families.
        </p>
        <Button asChild className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center" data-testid="button-download-deck">
          <a href="/investor-deck.pdf" target="_blank" rel="noopener" download>
            <Download className="mr-2 w-5 h-5" />
            Download Investor Deck
          </a>
        </Button>

        {/* Hero Background */}
        <div className="mt-16 relative">
          <img 
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Healthcare innovation and investment in fertility care" 
            className="w-full h-80 object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl"></div>
        </div>
      </section>

      {/* 2. The Problem → The Solution */}
      <section className="py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Problem */}
          <Card className="p-8 border-red-200 bg-red-50/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground font-serif">The Problem</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">Parents struggle with scattered, unverified knowledge about fertility treatments</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">Clinics lose patients to cancellations and poor preparedness</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">Existing health tech focuses on lead generation only, not trust-first approach</p>
              </div>
            </div>
          </Card>

          {/* Solution */}
          <Card className="p-8 border-green-200 bg-green-50/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground font-serif">Our Solution</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700 text-lg"><strong>Curated multilingual knowledge hub</strong> with verified, culturally-aware content</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700 text-lg"><strong>Sakhi companion app</strong> providing 24/7 emotional support</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700 text-lg"><strong>Clinic portal</strong> that reduces cancellations and improves show-rates</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Traction & Metrics */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mx-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">Early Traction & Momentum</h2>
          <p className="text-xl text-muted-foreground">Building trust and scale from day one</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 px-8">
          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">3 Languages</h3>
            <p className="text-gray-600">Launched IVF knowledge hub in English, Hindi, and Telugu</p>
          </Card>

          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">100+ FAQs</h3>
            <p className="text-gray-600">Comprehensive checklists and verified content live on platform</p>
          </Card>

          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Pilot Partner</h3>
            <p className="text-gray-600">Outcome-based model with Samnada Clinic showing early results</p>
          </Card>
        </div>
      </section>

      {/* 4. Business Model */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">Scalable Business Model</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Outcome-driven approach that aligns our success with clinic success</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Phase 1: Pilot</h3>
            <p className="text-gray-600 mb-4">Outcome-based model with select clinics</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Revenue share on improved outcomes</li>
              <li>• Reduced cancellation rates</li>
              <li>• Higher patient satisfaction</li>
            </ul>
          </Card>

          <Card className="p-8 relative overflow-hidden border-purple-200 bg-purple-50/30">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Phase 2: Scale</h3>
            <p className="text-gray-600 mb-4">Subscription + per-active patient fees</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Monthly platform subscription</li>
              <li>• Usage-based patient engagement fees</li>
              <li>• Premium features and analytics</li>
            </ul>
          </Card>

          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Phase 3: Expand</h3>
            <p className="text-gray-600 mb-4">Specialty-agnostic platform</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• IVF, IUI, endometriosis coverage</li>
              <li>• Pregnancy and early parenting</li>
              <li>• Enterprise licensing for hospital chains</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 5. Why Us (Moat & Team) */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl mx-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">Why JanmaSethu?</h2>
          <p className="text-xl text-muted-foreground">Building sustainable competitive advantages</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 px-8">
          {/* Moat */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-purple-600" />
              Our Moat
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Data Asset</h4>
                  <p className="text-gray-600">Unique dataset of patient questions, FAQ gaps, and cultural insights that compounds over time</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Clinician Network</h4>
                  <p className="text-gray-600">Trusted reviewers and medical professionals ensure credibility and accuracy</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Multilingual from Day 1</h4>
                  <p className="text-gray-600">Deep cultural understanding and language support that's hard to replicate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-pink-600" />
              Our Team
            </h3>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Small, focused, multi-disciplinary team combining healthcare expertise with technical excellence.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Healthcare Domain Experts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Full-Stack Engineers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>AI/ML Specialists</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Medical Content Reviewers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-20">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Healthcare Together?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join us in building the future of parenthood care for millions of Indian families.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center shadow-lg" data-testid="button-download-onepager">
              <a href="/one-pager.pdf" target="_blank" rel="noopener" download>
                <Download className="mr-2 w-5 h-5" />
                Download 1-Pager
              </a>
            </Button>
            
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center" data-testid="button-contact-investors">
              <a href="mailto:investors@janmasethu.com">
                <Mail className="mr-2 w-5 h-5" />
                Contact Us
              </a>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-sm opacity-75">
            <span className="mr-2">Schedule a call</span>
            <ArrowRight className="w-4 h-4" />
            <a href="mailto:investors@janmasethu.com" className="ml-2 hover:opacity-100 transition-opacity">
              investors@janmasethu.com
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-disclaimer">
            This information is confidential and proprietary. All forward-looking statements are subject to risks and uncertainties.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Investors;
