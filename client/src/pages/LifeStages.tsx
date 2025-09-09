import { Link } from 'wouter';
import { Heart, Baby, Cat, Users, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';

const LifeStages = () => {
  const { t } = useLanguage();

  const lifeStages = [
    {
      slug: 'ttc',
      title: t('orient_ttc'),
      description: t('orient_desc_ttc'),
      icon: Heart,
      color: 'bg-purple-100 text-purple-600',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    },
    {
      slug: 'pregnancy',
      title: t('orient_preg'),
      description: t('orient_desc_preg'),
      icon: Baby,
      color: 'bg-pink-100 text-pink-600',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    },
    {
      slug: 'postpartum',
      title: 'Postpartum',
      description: 'Recovery, healing, and adjustment after birth',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    },
    {
      slug: 'newborn',
      title: 'Newborn',
      description: 'First months with your baby',
      icon: Cat,
      color: 'bg-green-100 text-green-600',
      image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    },
    {
      slug: 'early-years',
      title: 'Early Years',
      description: 'Growth, development, and milestones',
      icon: Cat,
      color: 'bg-orange-100 text-orange-600',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    }
  ];

  const getStageArticles = (stage: string) => {
    return articles.filter(article => article.stage.includes(stage as any));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-lifestages-title">
          {t('nav_life')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Navigate your parenting journey stage by stage. Find relevant information, 
          checklists, and guidance tailored to exactly where you are right now.
        </p>
      </div>

      {/* Life Stages Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {lifeStages.map((stage, index) => {
          const Icon = stage.icon;
          const stageArticles = getStageArticles(stage.slug);
          
          return (
            <Link key={stage.slug} href={`/life-stages/${stage.slug}`} className="group">
              <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-lifestage-${index}`}>
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${stage.color.split(' ')[0]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`${stage.color.split(' ')[1]} text-2xl`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid={`text-stage-title-${index}`}>
                    {stage.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`text-stage-description-${index}`}>
                    {stage.description}
                  </p>

                  <img 
                    src={stage.image} 
                    alt={stage.title} 
                    className="rounded-xl w-full h-32 object-cover mb-4"
                  />

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" data-testid={`badge-article-count-${index}`}>
                      {stageArticles.length} articles
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{stageArticles.reduce((total, article) => total + article.readMins, 0)} min total</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Access */}
      <section className="py-16">
        <div className="bg-white rounded-3xl p-8 card-shadow">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-6 text-center">Quick Access by Topic</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/knowledge?lens=medical">
              <Button variant="outline" className="w-full rounded-full flex items-center justify-center space-x-2" data-testid="button-quick-medical">
                <i className="fas fa-stethoscope text-blue-600"></i>
                <span>Medical Guides</span>
              </Button>
            </Link>
            <Link href="/knowledge?lens=financial">
              <Button variant="outline" className="w-full rounded-full flex items-center justify-center space-x-2" data-testid="button-quick-financial">
                <i className="fas fa-rupee-sign text-green-600"></i>
                <span>Cost Planning</span>
              </Button>
            </Link>
            <Link href="/knowledge?lens=nutrition">
              <Button variant="outline" className="w-full rounded-full flex items-center justify-center space-x-2" data-testid="button-quick-nutrition">
                <i className="fas fa-apple-alt text-orange-600"></i>
                <span>Nutrition</span>
              </Button>
            </Link>
            <Link href="/sakhi">
              <Button variant="outline" className="w-full rounded-full flex items-center justify-center space-x-2" data-testid="button-quick-support">
                <i className="fas fa-heart text-pink-600"></i>
                <span>Emotional Support</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeStages;
