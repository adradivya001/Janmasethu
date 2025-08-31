import { Link } from 'wouter';
import { Heart, ArrowRight, Shield, Clock, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/ChatInterface';

const Sakhi = () => {
  const { t } = useLanguage();

  const sakhiFeatures = [
    {
      icon: Heart,
      title: 'Emotional Support',
      description: 'Compassionate responses for anxiety, fear, and overwhelming moments',
      color: 'text-pink-600'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Support whenever you need it, day or night',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'All conversations stay on your device - completely private',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Partner Support',
      description: 'Guidance for both partners navigating the journey together',
      color: 'text-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Multi-language',
      description: 'Responds in English, Hindi, or Telugu based on your input',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-serif mb-6 leading-tight" data-testid="text-sakhi-hero-title">
            <span dangerouslySetInnerHTML={{ __html: t('sakhi_hero') }} />
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-sakhi-hero-subtitle">
            {t('sakhi_sub')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sakhi/try">
              <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center" data-testid="button-try-sakhi-hero">
                {t('sakhi_try')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/knowledge">
              <Button variant="outline" className="bg-white text-foreground px-8 py-4 rounded-full font-semibold text-lg border-border hover:shadow-lg transition-all duration-300" data-testid="button-browse-knowledge">
                Browse Knowledge Hub
              </Button>
            </Link>
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
              alt="Peaceful meditation and wellness" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* How Sakhi Helps */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-sakhi-how-title">
            {t('sakhi_how_title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sakhi understands the emotional challenges of fertility journeys and provides culturally-aware support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sakhiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 text-center" data-testid={`card-sakhi-feature-${index}`}>
                <CardContent className="p-0">
                  <Icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Help List */}
        <Card className="rounded-3xl p-8 card-shadow">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold text-foreground font-serif mb-6 text-center">
              Specific Ways Sakhi Supports You
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {t('sakhi_how_list').split(',').map((item: string, index: number) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`item-sakhi-help-${index}`}>
                  <Heart className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{item.trim()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Try Sakhi Preview */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground font-serif mb-6" data-testid="text-sakhi-demo-title">
                {t('sakhi_demo_title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience how Sakhi can provide emotional support and practical guidance. 
                Try the interactive demo to see how conversations work.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Responds in your preferred language</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Completely private - no data stored</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Available 24/7 for support</span>
                </div>
              </div>
              
              <Link href="/sakhi/try">
                <Button className="gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center" data-testid="button-try-sakhi-full">
                  Try Full Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            {/* Chat Interface Preview */}
            <div>
              <ChatInterface />
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16">
        <Card className="rounded-3xl p-8 card-shadow bg-blue-50 border border-blue-200">
          <CardContent className="p-0 text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground font-serif mb-4">
              Important Notice
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Sakhi provides emotional support and general guidance but is not a replacement for professional medical or mental health care. 
              If you're experiencing thoughts of self-harm or severe distress, please contact a healthcare professional or emergency services immediately.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Sakhi;
