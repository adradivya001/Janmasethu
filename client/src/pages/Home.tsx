import { Link } from 'wouter';
import { CheckCircle, Heart, Baby, Cat, Stethoscope, Users, IndianRupee, Apple, ArrowRight, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { articles } from '@/data/articles';
import { stories } from '@/data/stories';

const Home = () => {
  const { t } = useLanguage();

  const featuredArticles = articles.slice(0, 4);
  const featuredStories = stories.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 relative">
        {/* Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 card-shadow mb-8">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-foreground" data-testid="text-trust-badge">
            {t('trust_pill')}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-serif mb-6 leading-tight">
          <span dangerouslySetInnerHTML={{ 
            __html: t('hero_title').replace('<span>', '<span class="gradient-text">').replace('</span>', '</span>')
          }} data-testid="text-hero-title" />
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          {t('hero_sub')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/knowledge">
            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300" data-testid="button-cta-primary">
              {t('cta_primary')}
            </Button>
          </Link>
          <Link href="/sakhi">
            <Button variant="outline" className="bg-white text-foreground px-8 py-4 rounded-full font-semibold text-lg border-border hover:shadow-lg transition-all duration-300" data-testid="button-cta-secondary">
              {t('cta_secondary')}
            </Button>
          </Link>
        </div>

        {/* Hero Background Image */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Family moment with newborn" 
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* What & Why Section */}
      <section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* What is Janma Sethu */}
          <Card className="rounded-3xl p-8 card-shadow">
            <h2 className="text-3xl font-bold text-foreground font-serif mb-6" data-testid="text-what-title">
              {t('who_title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-what-body">
              {t('who_body')}
            </p>
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Doctor consultation with expecting parents" 
              className="rounded-xl w-full h-48 object-cover"
            />
          </Card>

          {/* Why Janma Sethu */}
          <Card className="rounded-3xl p-8 card-shadow">
            <h2 className="text-3xl font-bold text-foreground font-serif mb-6" data-testid="text-why-title">
              {t('why_title')}
            </h2>
            <ul className="space-y-4">
              {t('why_points').split(',').map((point: string, index: number) => (
                <li key={index} className="flex items-start space-x-3" data-testid={`item-why-point-${index}`}>
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{point.trim()}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Start Here - Orientation Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-orientation-title">
            {t('orient_title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* TTC Card */}
          <Link href="/life-stages/ttc" className="group">
            <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-ttc-title">
                {t('orient_ttc')}
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-ttc-desc">
                {t('orient_desc_ttc')}
              </p>
              <img 
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                alt="Couple walking together in park" 
                className="rounded-xl w-full h-32 object-cover"
              />
            </Card>
          </Link>

          {/* Pregnancy Card */}
          <Link href="/life-stages/pregnancy" className="group">
            <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Baby className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-pregnancy-title">
                {t('orient_preg')}
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-pregnancy-desc">
                {t('orient_desc_preg')}
              </p>
              <img 
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                alt="Pregnant woman in peaceful outdoor setting" 
                className="rounded-xl w-full h-32 object-cover"
              />
            </Card>
          </Link>

          {/* New Parent Card */}
          <Link href="/life-stages/newborn" className="group">
            <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cat className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-parent-title">
                {t('orient_parent')}
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-parent-desc">
                {t('orient_desc_parent')}
              </p>
              <img 
                src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                alt="Happy new parent holding newborn baby" 
                className="rounded-xl w-full h-32 object-cover"
              />
            </Card>
          </Link>
        </div>
      </section>

      {/* Explore by Lens Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-lens-title">
            {t('lens_title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Medical Lens */}
          <Link href="/knowledge?lens=medical" className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif mb-2" data-testid="text-lens-medical">
                {t('lens_medical')}
              </h3>
            </Card>
          </Link>

          {/* Social & Emotional Lens */}
          <Link href="/knowledge?lens=social" className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-pink-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif mb-2" data-testid="text-lens-social">
                {t('lens_social')}
              </h3>
            </Card>
          </Link>

          {/* Financial Lens */}
          <Link href="/knowledge?lens=financial" className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <IndianRupee className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif mb-2" data-testid="text-lens-financial">
                {t('lens_financial')}
              </h3>
            </Card>
          </Link>

          {/* Nutrition Lens */}
          <Link href="/knowledge?lens=nutrition" className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Apple className="text-orange-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif mb-2" data-testid="text-lens-nutrition">
                {t('lens_nutrition')}
              </h3>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Knowledge Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-featured-title">
            {t('featured_title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredArticles.map((article, index) => (
            <Link key={article.slug} href={`/knowledge/${article.slug}`} className="group">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300" data-testid={`card-featured-article-${index}`}>
                <img 
                  src={getArticleImage(index)} 
                  alt={article.title.en} 
                  className="rounded-xl w-full h-32 object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-article-title-${index}`}>
                  {article.title.en}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-article-summary-${index}`}>
                  {article.summary.en}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Treatments Overview Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-treatments-title">
            {t('treatments_overview_title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getTreatmentCards().map((treatment, index) => (
            <Link key={treatment.slug} href={`/treatments/${treatment.slug}`} className="group">
              <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300" data-testid={`card-treatment-${index}`}>
                <div className={`w-16 h-16 ${treatment.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <i className={`${treatment.icon} ${treatment.iconColor} text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid={`text-treatment-name-${index}`}>
                  {treatment.name}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-treatment-desc-${index}`}>
                  {treatment.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-success-title">
            {t('success_preview_title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story, index) => (
            <Link key={story.slug} href={`/success-stories/${story.slug}`} className="group">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300" data-testid={`card-success-story-${index}`}>
                <img 
                  src={getStoryImage(index)} 
                  alt={story.title} 
                  className="rounded-xl w-full h-32 object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-story-title-${index}`}>
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`text-story-summary-${index}`}>
                  {story.summary}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span data-testid={`text-story-city-${index}`}>{story.city}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Sakhi Preview Section */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-sakhi-hero">
                {t('sakhi_hero')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-sakhi-sub">
                {t('sakhi_sub')}
              </p>
              
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-sakhi-how-title">
                {t('sakhi_how_title')}
              </h3>
              <ul className="space-y-3 mb-8">
                {t('sakhi_how_list').split(',').map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3" data-testid={`item-sakhi-help-${index}`}>
                    <Heart className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item.trim()}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/sakhi/try">
                <Button className="gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center" data-testid="button-try-sakhi">
                  {t('sakhi_try')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            {/* Chat Interface Preview */}
            <Card className="rounded-3xl p-6 card-shadow">
              <div className="border-b border-border pb-4 mb-4">
                <h4 className="font-bold text-foreground" data-testid="text-chat-preview-title">
                  {t('chat_title')}
                </h4>
                <p className="text-sm text-muted-foreground" data-testid="text-chat-preview-hint">
                  {t('chat_hint')}
                </p>
              </div>
              
              <div className="space-y-4 mb-4 h-60 overflow-y-auto">
                {/* Sample Chat Messages */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl max-w-xs" data-testid="message-sample-user">
                    I'm feeling anxious about tomorrow's scan
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl max-w-xs" data-testid="message-sample-bot">
                    I understand your anxiety. It's completely normal to feel this way before scans. Try some deep breathing exercises and remember that you're taking positive steps for your journey.
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
                <Button className="gradient-button text-white rounded-full hover:shadow-lg transition-all duration-300" data-testid="button-send-preview">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2" data-testid="text-chat-preview-privacy">
                {t('chat_privacy')}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper functions
const getArticleImage = (index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  ];
  return images[index] || images[0];
};

const getStoryImage = (index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
  ];
  return images[index] || images[0];
};

const getTreatmentCards = () => [
  {
    slug: 'iui',
    name: 'IUI',
    description: 'Intrauterine insemination process, success rates, and what to expect',
    icon: 'fas fa-syringe',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    slug: 'ivf',
    name: 'IVF',
    description: 'In vitro fertilization steps, timeline, and preparation guide',
    icon: 'fas fa-microscope',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    slug: 'icsi',
    name: 'ICSI',
    description: 'Intracytoplasmic sperm injection for male factor infertility',
    icon: 'fas fa-dna',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    slug: 'donor-options',
    name: 'Donor Options',
    description: 'Egg, sperm, and embryo donation processes and considerations',
    icon: 'fas fa-hand-holding-heart',
    iconColor: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    slug: 'fertility-preservation',
    name: 'Fertility Preservation',
    description: 'Egg and sperm freezing for future family planning',
    icon: 'fas fa-snowflake',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

export default Home;
