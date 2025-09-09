import { Link } from 'wouter';
import { MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { stories } from '@/data/stories';

const SuccessStories = () => {
  const { t } = useLanguage();

  const getStoryImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1559759117-4b1f2bfb2d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1548139973-03568b80edd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    ];
    return images[index % images.length];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-success-stories-title">
          {t('success_preview_title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Real stories from families across India who found their path to parenthood. 
          These journeys offer hope, practical insights, and emotional support.
        </p>

        {/* Hero Background */}
        <div className="mt-12 relative">
          <img 
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Happy families with children" 
            className="w-full h-64 object-cover rounded-3xl opacity-20"
          />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {stories.map((story, index) => (
          <Link key={story.slug} href={`/success-stories/${story.slug}`} className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-success-story-${index}`}>
              <CardContent className="p-0">
                <img 
                  src={getStoryImage(index)} 
                  alt={story.title} 
                  className="rounded-xl w-full h-32 object-cover mb-4"
                />
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-story-stage-${index}`}>
                    {story.stage}
                  </Badge>
                  {story.treatment && (
                    <Badge variant="outline" className="text-xs" data-testid={`badge-story-treatment-${index}`}>
                      {story.treatment}
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-story-title-${index}`}>
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4" data-testid={`text-story-summary-${index}`}>
                  {story.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span data-testid={`text-story-city-${index}`}>{story.city}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span data-testid={`text-story-language-${index}`}>{story.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Support Section */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground font-serif mb-4">
            Share Your Story
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Your journey could inspire and help others. If you'd like to share your experience, 
            we'd love to hear from you.
          </p>
          <Link href="/contact">
            <Button className="gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold" data-testid="button-share-story">
              Share Your Story
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
