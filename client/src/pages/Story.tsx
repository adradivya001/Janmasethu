import { useParams, Link } from 'wouter';
import { ArrowLeft, MapPin, Heart, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stories } from '@/data/stories';

const Story = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  const story = stories.find(s => s.slug === slug);

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Story Not Found</h1>
            <p className="text-muted-foreground mb-6">The success story you're looking for doesn't exist.</p>
            <Link href="/success-stories">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Success Stories
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { lang } = useLanguage();

  const getStoryImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    ];
    return images[Math.abs(story.slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % images.length];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/success-stories">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-success-stories">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Success Stories
          </Button>
        </Link>
      </div>

      {/* Story Header */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" data-testid="badge-story-stage">
              {story.stage}
            </Badge>
            {story.treatment && (
              <Badge variant="outline" data-testid="badge-story-treatment">
                {story.treatment}
              </Badge>
            )}
            <Badge variant="outline" data-testid="badge-story-language">
              {story.language}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-story-title">
            {story.title[lang]}
          </h1>

          <p className="text-lg text-muted-foreground mb-6" data-testid="text-story-summary">
            {story.summary[lang]}
          </p>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span data-testid="text-story-city">{story.city[lang]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Shared in {story.language}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Image */}
      <div className="mb-8">
        <img
          src={getStoryImage()}
          alt={story.title[lang]}
          className="w-full h-64 md:h-80 object-cover rounded-3xl"
        />
      </div>

      {/* Story Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl p-8 card-shadow">
            <CardContent className="p-0">
              <div className="prose prose-lg max-w-none">
                {story.body.map((section, index) => (
                  <div key={index} className="mb-8" data-testid={`section-story-content-${index}`}>
                    <h2 className="text-xl font-bold text-foreground font-serif mb-4">
                      Chapter {index + 1}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {section[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Story Details */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground font-serif">Story Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-foreground">Location:</span>
                  <p className="text-muted-foreground" data-testid="text-story-detail-city">{story.city[lang]}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Stage:</span>
                  <p className="text-muted-foreground" data-testid="text-story-detail-stage">{story.stage}</p>
                </div>
                {story.treatment && (
                  <div>
                    <span className="font-medium text-foreground">Treatment:</span>
                    <p className="text-muted-foreground" data-testid="text-story-detail-treatment">{story.treatment}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium text-foreground">Language:</span>
                  <p className="text-muted-foreground" data-testid="text-story-detail-language">{story.language}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Stories */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground font-serif">Related Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stories
                  .filter(s => s.slug !== story.slug && (s.stage === story.stage || s.treatment === story.treatment))
                  .slice(0, 3)
                  .map((relatedStory, index) => (
                    <Link key={relatedStory.slug} href={`/success-stories/${relatedStory.slug}`}>
                      <div className="p-3 rounded-xl hover:bg-muted transition-colors" data-testid={`related-story-${index}`}>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {relatedStory.title[lang]}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {relatedStory.city[lang]} • {relatedStory.language}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Support CTA */}
          <Card className="rounded-3xl p-6 card-shadow bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-0 text-center">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground font-serif mb-2">
                Need Support?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Every journey is unique. Sakhi is here to support you through yours.
              </p>
              <Link href="/sakhi">
                <Button className="gradient-button-secondary text-white rounded-full w-full" data-testid="button-get-support">
                  Talk to Sakhi
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Story;