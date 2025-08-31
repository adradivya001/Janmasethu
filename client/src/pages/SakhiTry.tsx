import { Link } from 'wouter';
import { ArrowLeft, Shield, Heart, MessageCircle, Globe, Lock, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/ChatInterface';

const SakhiTry = () => {
  const { t } = useLanguage();

  const privacyFeatures = [
    {
      icon: Lock,
      title: 'Private & Local',
      description: 'All conversations stay on your device',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Responds in English, Hindi, or Telugu',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Support whenever you need it',
      color: 'text-purple-600'
    }
  ];

  const quickScenarios = [
    {
      title: 'Pre-scan Anxiety',
      prompt: t('chat_p1'),
      description: 'Get support before medical appointments'
    },
    {
      title: 'Two-week Wait',
      prompt: t('chat_p2'),
      description: 'Manage anticipation and worry during waiting periods'
    },
    {
      title: 'Partner Support',
      prompt: t('chat_p3'),
      description: 'Help for partners dealing with diagnosis emotions'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/sakhi">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-sakhi">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sakhi
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-sakhi-try-title">
          Try Sakhi - Interactive Demo
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-sakhi-try-subtitle">
          Experience compassionate, culturally-aware support for your fertility journey. 
          Type in any language and Sakhi will respond accordingly.
        </p>
      </div>

      {/* Privacy Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {privacyFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="rounded-3xl p-4 card-shadow text-center" data-testid={`card-privacy-feature-${index}`}>
              <CardContent className="p-0">
                <Icon className={`w-8 h-8 ${feature.color} mx-auto mb-3`} />
                <h3 className="font-bold text-foreground mb-1" data-testid={`text-privacy-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-privacy-description-${index}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>

        {/* Sidebar with Quick Scenarios */}
        <div className="space-y-6">
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground font-serif flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-pink-500" />
                Try These Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickScenarios.map((scenario, index) => (
                  <div key={index} className="p-3 rounded-xl border border-border hover:bg-muted transition-colors" data-testid={`scenario-${index}`}>
                    <h4 className="font-semibold text-foreground text-sm mb-1" data-testid={`text-scenario-title-${index}`}>
                      {scenario.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2" data-testid={`text-scenario-description-${index}`}>
                      {scenario.description}
                    </p>
                    <p className="text-xs text-primary font-medium italic" data-testid={`text-scenario-prompt-${index}`}>
                      "{scenario.prompt}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground font-serif">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-muted-foreground">Type your message in English, Hindi, or Telugu</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-muted-foreground">Sakhi detects your language automatically</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm text-muted-foreground">Receive compassionate, culturally-aware support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-6 card-shadow bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-0 text-center">
              <Shield className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Privacy First</h3>
              <p className="text-xs text-muted-foreground mb-4" data-testid="text-privacy-notice">
                {t('chat_privacy')}
              </p>
              <p className="text-xs text-muted-foreground">
                No account needed, no data collected, completely anonymous.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Important Disclaimer */}
      <Card className="rounded-3xl p-8 card-shadow bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
        <CardContent className="p-0 text-center">
          <Heart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground font-serif mb-4">
            Important: When to Seek Professional Help
          </h3>
          <div className="max-w-3xl mx-auto text-muted-foreground space-y-3">
            <p>
              Sakhi provides emotional support and coping strategies, but cannot replace professional medical or mental health care.
            </p>
            <p className="font-medium text-foreground">
              Please contact a healthcare professional or emergency services immediately if you experience:
            </p>
            <ul className="text-left max-w-xl mx-auto space-y-1">
              <li>• Thoughts of self-harm or suicide</li>
              <li>• Severe depression or anxiety that interferes with daily life</li>
              <li>• Panic attacks or overwhelming distress</li>
              <li>• Any medical symptoms or concerns</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Continue Exploring */}
      <section className="py-16">
        <div className="bg-white rounded-3xl p-8 card-shadow text-center">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-4">
            Continue Your Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our comprehensive knowledge hub for evidence-based information on fertility, pregnancy, and parenting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/knowledge">
              <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold" data-testid="button-explore-knowledge">
                Explore Knowledge Hub
              </Button>
            </Link>
            <Link href="/treatments">
              <Button variant="outline" className="px-8 py-4 rounded-full font-semibold" data-testid="button-learn-treatments">
                Learn About Treatments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SakhiTry;
