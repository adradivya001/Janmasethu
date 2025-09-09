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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text font-serif mb-6 leading-tight" data-testid="text-hero-title">
          <span dangerouslySetInnerHTML={{ __html: t('hero_title') }} />
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          {t('hero_sub')}
        </p>

        {/* Animated Line Morphing Effect */}
        <div className="relative mb-8">
          <svg 
            className="w-full h-24 mx-auto animated-line" 
            viewBox="0 0 400 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
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
            <circle className="morph-symbol couple" cx="60" cy="50" r="8" fill="url(#lineGradient)" opacity="0" />
            <circle className="morph-symbol couple" cx="80" cy="50" r="6" fill="url(#lineGradient)" opacity="0" />

            {/* Pregnancy symbol */}
            <ellipse className="morph-symbol pregnancy" cx="200" cy="50" rx="12" ry="15" fill="url(#lineGradient)" opacity="0" />

            {/* Cradle symbol */}
            <path className="morph-symbol cradle" d="M320,45 Q340,35 360,45 Q340,65 320,55 Z" fill="url(#lineGradient)" opacity="0" />
          </svg>
        </div>

        {/* CTA Buttons - Updated to match blueprint exactly */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/sakhi/try">
            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300" data-testid="button-cta-primary">
              Meet Sakhi
            </Button>
          </Link>
          <Link href="/knowledge">
            <Button variant="outline" className="bg-white text-foreground px-8 py-4 rounded-full font-semibold text-lg border-border hover:shadow-lg transition-all duration-300" data-testid="button-cta-secondary">
              For Clinics
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

      {/* About JanmaSethu - 3 Cards as per blueprint */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-about-title">
            {t('who_title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Patients Card */}
          <Card className="rounded-3xl p-8 card-shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group backdrop-blur-sm bg-white/80" data-testid="card-about-patients">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-patients-title">
              <span className="group-hover:hidden">Patients</span>
              <span className="hidden group-hover:block">{t('about_patients_title')}</span>
            </h3>
            <p className="text-muted-foreground" data-testid="text-patients-desc">
              <span className="group-hover:hidden">Simplified fertility guidance, India-aware and judgment-free.</span>
              <span className="hidden group-hover:block">{t('about_patients_desc')}</span>
            </p>
          </Card>

          {/* Clinics Card */}
          <Card className="rounded-3xl p-8 card-shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group backdrop-blur-sm bg-white/80" data-testid="card-about-clinics">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Stethoscope className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-clinics-title">
              <span className="group-hover:hidden">Clinics</span>
              <span className="hidden group-hover:block">{t('about_clinics_title')}</span>
            </h3>
            <p className="text-muted-foreground" data-testid="text-clinics-desc">
              <span className="group-hover:hidden">Evidence-based resources to support your patient conversations.</span>
              <span className="hidden group-hover:block">{t('about_clinics_desc')}</span>
            </p>
          </Card>

          {/* Investors Card */}
          <Card className="rounded-3xl p-8 card-shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group backdrop-blur-sm bg-white/80" data-testid="card-about-investors">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <IndianRupee className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-investors-title">
              <span className="group-hover:hidden">Investors</span>
              <span className="hidden group-hover:block">{t('about_investors_title')}</span>
            </h3>
            <p className="text-muted-foreground" data-testid="text-investors-desc">
              <span className="group-hover:hidden">Scalable healthcare infrastructure for underserved communities.</span>
              <span className="hidden group-hover:block">{t('about_investors_desc')}</span>
            </p>
          </Card>
        </div>
      </section>

      {/* Parenthood Journey Strip */}
      <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl mx-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-journey-title">
            {t('journey_title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('journey_subtitle')}
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative overflow-x-auto pb-8">
          <div className="journey-timeline-mobile flex items-center justify-between min-w-[800px] px-8">
            {/* Stage 1: Thinking of Parenthood */}
            <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300" data-testid="journey-stage-thinking">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-sm font-bold text-foreground text-center mb-2">
                {t('journey_stage_1_title')}
              </h3>
              <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                {t('journey_stage_1_desc')}
              </p>
              <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                <p className="text-xs text-center whitespace-nowrap">{t('journey_stage_tooltip')}</p>
              </div>
            </div>

            {/* Connection Line 1 */}
            <div className="flex-1 h-1 bg-gradient-to-r from-green-200 to-pink-200 mx-4 rounded-full min-w-[40px]"></div>

            {/* Stage 2: Trying Naturally */}
            <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300" data-testid="journey-stage-trying">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors shadow-lg">
                <span className="text-2xl">💖</span>
              </div>
              <h3 className="text-sm font-bold text-foreground text-center mb-2">
                {t('journey_stage_2_title')}
              </h3>
              <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                {t('journey_stage_2_desc')}
              </p>
              <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                <p className="text-xs text-center whitespace-nowrap">{t('journey_stage_tooltip')}</p>
              </div>
            </div>

            {/* Connection Line 2 */}
            <div className="flex-1 h-1 bg-gradient-to-r from-pink-200 to-blue-200 mx-4 rounded-full min-w-[40px]"></div>

            {/* Stage 3: Exploring Options */}
            <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300" data-testid="journey-stage-exploring">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors shadow-lg">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-sm font-bold text-foreground text-center mb-2">
                {t('journey_stage_3_title')}
              </h3>
              <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                {t('journey_stage_3_desc')}
              </p>
              <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                <p className="text-xs text-center whitespace-nowrap">{t('journey_stage_tooltip')}</p>
              </div>
            </div>

            {/* Connection Line 3 */}
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-200 to-purple-200 mx-4 rounded-full min-w-[40px]"></div>

            {/* Stage 4: Pregnancy */}
            <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300" data-testid="journey-stage-pregnancy">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors shadow-lg">
                <span className="text-2xl">🤰</span>
              </div>
              <h3 className="text-sm font-bold text-foreground text-center mb-2">
                {t('journey_stage_4_title')}
              </h3>
              <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                {t('journey_stage_4_desc')}
              </p>
              <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                <p className="text-xs text-center whitespace-nowrap">{t('journey_stage_tooltip')}</p>
              </div>
            </div>

            {/* Connection Line 4 */}
            <div className="flex-1 h-1 bg-gradient-to-r from-purple-200 to-orange-200 mx-4 rounded-full min-w-[40px]"></div>

            {/* Stage 5: Post-Delivery */}
            <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300" data-testid="journey-stage-postdelivery">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors shadow-lg">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="text-sm font-bold text-foreground text-center mb-2">
                {t('journey_stage_5_title')}
              </h3>
              <p className="text-xs text-muted-foreground text-center max-w-[120px]">
                {t('journey_stage_5_desc')}
              </p>
              <div className="hidden group-hover:block absolute top-20 bg-white rounded-lg shadow-lg p-2 z-10 mt-4">
                <p className="text-xs text-center whitespace-nowrap">{t('journey_stage_tooltip')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA under strip */}
        <div className="text-center mt-12">
          <Link href="/sakhi">
            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center" data-testid="button-sakhi-support">
              {t('journey_cta')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
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
                <span className="group-hover:hidden">Trying to conceive (TTC)</span>
                <span className="hidden group-hover:block">{t('orient_ttc')}</span>
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-ttc-desc">
                <span className="group-hover:hidden">Basics, tests, timelines, costs</span>
                <span className="hidden group-hover:block">{t('orient_desc_ttc')}</span>
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
                <span className="group-hover:hidden">Pregnancy</span>
                <span className="hidden group-hover:block">{t('orient_preg')}</span>
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-pregnancy-desc">
                <span className="group-hover:hidden">Trimester hubs, week‑by‑week</span>
                <span className="hidden group-hover:block">{t('orient_desc_preg')}</span>
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
                <span className="group-hover:hidden">New parent</span>
                <span className="hidden group-hover:block">{t('orient_parent')}</span>
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-parent-desc">
                <span className="group-hover:hidden">Feeding, sleep, paperwork</span>
                <span className="hidden group-hover:block">{t('orient_desc_parent')}</span>
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
                <span className="group-hover:hidden">Medical</span>
                <span className="hidden group-hover:block">{t('lens_medical')}</span>
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
                <span className="group-hover:hidden">Social & Emotional</span>
                <span className="hidden group-hover:block">{t('lens_social')}</span>
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
                <span className="group-hover:hidden">Financial</span>
                <span className="hidden group-hover:block">{t('lens_financial')}</span>
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
                <span className="group-hover:hidden">Nutrition</span>
                <span className="hidden group-hover:block">{t('lens_nutrition')}</span>
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
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
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