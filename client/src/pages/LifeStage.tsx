import { useParams, Link } from 'wouter';
import { ArrowLeft, Heart, Baby, Cat, Users, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles, type Stage } from '@/data/articles';

const LifeStage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  
  const stageData = {
    'ttc': {
      title: t('orient_ttc'),
      description: t('orient_desc_ttc'),
      icon: Heart,
      color: 'bg-purple-100 text-purple-600',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    },
    'pregnancy': {
      title: t('orient_preg'),
      description: t('orient_desc_preg'),
      icon: Baby,
      color: 'bg-pink-100 text-pink-600',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    },
    'postpartum': {
      title: 'Postpartum',
      description: 'Recovery, healing, and adjustment after birth',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    },
    'newborn': {
      title: 'Newborn',
      description: 'First months with your baby',
      icon: Cat,
      color: 'bg-green-100 text-green-600',
      image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    },
    'early-years': {
      title: 'Early Years',
      description: 'Growth, development, and milestones',
      icon: Cat,
      color: 'bg-orange-100 text-orange-600',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    }
  };

  const currentStage = stageData[slug as keyof typeof stageData];
  
  if (!currentStage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Life Stage Not Found</h1>
            <p className="text-muted-foreground mb-6">The life stage you're looking for doesn't exist.</p>
            <Link href="/life-stages">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Life Stages
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = currentStage.icon;
  const stageArticles = articles.filter(article => article.stage.includes(slug as Stage));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/life-stages">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-lifestages">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Life Stages
          </Button>
        </Link>
      </div>

      {/* Stage Header */}
      <div className="text-center mb-16 relative">
        <div className={`w-20 h-20 ${currentStage.color.split(' ')[0]} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
          <Icon className={`${currentStage.color.split(' ')[1]} text-3xl`} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-stage-title">
          {currentStage.title}
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-stage-description">
          {currentStage.description}
        </p>

        {/* Background Image */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <img 
            src={currentStage.image} 
            alt={currentStage.title} 
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* Articles for this Stage */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-4">
            Articles for {currentStage.title}
          </h2>
          <p className="text-muted-foreground">
            Comprehensive guides specifically relevant to your current stage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stageArticles.map((article, index) => (
            <Link key={article.slug} href={`/knowledge/${article.slug}`}>
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-stage-article-${index}`}>
                <CardContent className="p-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.lens.map(lens => (
                      <Badge key={lens} variant="secondary" className="text-xs" data-testid={`badge-article-lens-${lens}-${index}`}>
                        {lens}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-stage-article-title-${index}`}>
                    {article.title.en}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`text-stage-article-summary-${index}`}>
                    {article.summary.en}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span data-testid={`text-stage-article-readtime-${index}`}>{article.readMins} min</span>
                    </div>
                    <span className="text-xs" data-testid={`text-stage-article-reviewer-${index}`}>
                      {article.reviewedBy.split(',')[0]}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {stageArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground" data-testid="text-no-stage-articles">
              No articles available for this life stage yet. Check back soon for new content.
            </p>
          </div>
        )}
      </section>

      {/* Stage Navigation */}
      <section className="py-8">
        <Card className="rounded-3xl p-8 card-shadow bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-0">
            <h2 className="text-2xl font-bold text-foreground font-serif mb-6 text-center">
              Explore Other Life Stages
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(stageData)
                .filter(([key]) => key !== slug)
                .map(([key, stage]) => {
                  const StageIcon = stage.icon;
                  return (
                    <Link key={key} href={`/life-stages/${key}`}>
                      <Button 
                        variant="outline" 
                        className="w-full h-auto p-4 rounded-2xl bg-white hover:shadow-md transition-all duration-300 flex flex-col items-center space-y-2"
                        data-testid={`button-navigate-stage-${key}`}
                      >
                        <StageIcon className={`w-6 h-6 ${stage.color.split(' ')[1]}`} />
                        <span className="text-sm font-medium">{stage.title}</span>
                      </Button>
                    </Link>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LifeStage;
