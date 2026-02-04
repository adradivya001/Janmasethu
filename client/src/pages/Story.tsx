import { useParams, Link } from 'wouter';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Heart, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stories as staticStories } from '@/data/stories';

const Story = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const [story, setStory] = useState<any>(null);
  const [allStories, setAllStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all stories and current story
  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Fetch backend stories
        const response = await fetch("/api/proxy/stories", {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });

        if (response.ok) {
          const backendStories = await response.json();
          const backendData = Array.isArray(backendStories) ? backendStories : [];

          // Combine all stories (backend first)
          const normalizedBackend = backendData.map(normalizeStory);
          const combined = [...normalizedBackend, ...staticStories];
          setAllStories(combined);

          // Find the current story by slug
          const foundStory = combined.find((s: any) => s.slug === slug);
          setStory(foundStory || null);
        } else {
          // If backend fails, use static stories
          setAllStories(staticStories);
          const staticStory = staticStories.find(s => s.slug === slug);
          setStory(staticStory || null);
        }
      } catch (error) {
        console.error("Error fetching backend stories:", error);
        // Fallback to static stories on error
        setAllStories(staticStories);
        const staticStory = staticStories.find(s => s.slug === slug);
        setStory(staticStory || null);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [slug]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Helper to get multilingual field (handles both static and backend stories)
  const getField = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['en'] || '';
  };

  // Normalize backend story data to match frontend expectations
  const normalizeStory = (story: any) => {
    if (!story) return null;
    // If it's already in the correct format (static stories), return as is
    if (story.title && typeof story.title === 'object') return story;

    // Map backend fields to frontend fields
    return {
      ...story,
      slug: story.slug || `story-${story.id}`,
      title: {
        en: story.title || story.name || "Untitled Story",
        hi: story.title || story.name || "शीर्षकहीन कहानी",
        te: story.title || story.name || "శీర్షిక లేని కథ"
      },
      summary: {
        en: story.summary || story.challenges || "No summary available.",
        hi: story.summary || story.challenges || "कोई सारांश उपलब्ध नहीं है।",
        te: story.summary || story.challenges || "సారాంశం అందుబాటులో లేదు."
      },
      stage: {
        en: story.stage || story.outcome || "Journey",
        hi: story.stage || story.outcome || "यात्रा",
        te: story.stage || story.outcome || "ప్రయాణం"
      },
      city: {
        en: story.city || "Unknown City",
        hi: story.city || "अज्ञात शहर",
        te: story.city || "తెలియని నగరం"
      },
      language: {
        en: story.language || "English",
        hi: story.language || "English",
        te: story.language || "English"
      },
      longStory: story.generated_story || story.outcome_description || story.challenges || ""
    };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <p className="text-center text-muted-foreground">Loading story...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const getStoryImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    ];
    return images[Math.abs(story.slug.split('').reduce((a: number, b: string) => a + b.charCodeAt(0), 0)) % images.length];
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
              {getField(story.stage)}
            </Badge>
            {story.treatment && (
              <Badge variant="outline" data-testid="badge-story-treatment">
                {getField(story.treatment)}
              </Badge>
            )}
            <Badge variant="outline" data-testid="badge-story-language">
              {getField(story.language)}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-story-title">
            {getField(story.title)}
          </h1>

          <p className="text-lg text-muted-foreground mb-6" data-testid="text-story-summary">
            {getField(story.summary)}
          </p>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span data-testid="text-story-city">{getField(story.city)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Shared in {getField(story.language)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl p-8 card-shadow">
            <CardContent className="p-0">
              <div className="prose prose-lg max-w-none">
                {story.body ? (
                  // Static story with chapters
                  story.body.map((section: any, index: number) => (
                    <div key={index} className="mb-8" data-testid={`section-story-content-${index}`}>
                      <h2 className="text-xl font-bold text-foreground font-serif mb-4">
                        Chapter {index + 1}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {getField(section)}
                      </p>
                    </div>
                  ))
                ) : (
                  // Backend story - display longStory (full narrative)
                  <div className="mb-8" data-testid="section-story-content-0">
                    <h2 className="text-xl font-bold text-foreground font-serif mb-4">
                      Their Story
                    </h2>
                    {story.longStory ? (
                      // Display the full 3-4 paragraph narrative from longStory
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {getField(story.longStory)}
                      </div>
                    ) : (
                      // Fallback to structured content if longStory not available
                      <div className="space-y-4">
                        {story.challenges && (
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Challenges</h3>
                            <p className="text-muted-foreground leading-relaxed">{story.challenges}</p>
                          </div>
                        )}
                        {story.emotion_details && (
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">How They Felt</h3>
                            <p className="text-muted-foreground leading-relaxed">{story.emotion_details}</p>
                          </div>
                        )}
                        {story.outcome_description && (
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Outcome</h3>
                            <p className="text-muted-foreground leading-relaxed">{story.outcome_description}</p>
                          </div>
                        )}
                        {story.message_of_hope && (
                          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border-l-4 border-pink-400">
                            <h3 className="font-semibold text-foreground mb-2">Message of Hope</h3>
                            <p className="text-muted-foreground leading-relaxed italic">"{story.message_of_hope}"</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
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
                  <p className="text-muted-foreground" data-testid="text-story-detail-city">{getField(story.city)}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Stage:</span>
                  <p className="text-muted-foreground" data-testid="text-story-detail-stage">{getField(story.stage)}</p>
                </div>
                {story.treatment && (
                  <div>
                    <span className="font-medium text-foreground">Treatment:</span>
                    <p className="text-muted-foreground" data-testid="text-story-detail-treatment">{getField(story.treatment)}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium text-foreground">Language:</span>
                  <p className="text-muted-foreground" data-testid="text-story-detail-language">{getField(story.language)}</p>
                </div>
                {story.duration && (
                  <div>
                    <span className="font-medium text-foreground">Journey Duration:</span>
                    <p className="text-muted-foreground">{story.duration}</p>
                  </div>
                )}
                {story.emotions && Array.isArray(story.emotions) && story.emotions.length > 0 && (
                  <div>
                    <span className="font-medium text-foreground">Emotions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {story.emotions.map((emotion: string, idx: number) => (
                        <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                {allStories
                  .filter(s => s.slug !== story.slug && (getField(s.stage) === getField(story.stage) || getField(s.treatment) === getField(story.treatment)))
                  .slice(0, 3)
                  .map((relatedStory, index) => (
                    <Link key={relatedStory.slug} href={`/success-stories/${relatedStory.slug}`}>
                      <div className="p-3 rounded-xl hover:bg-muted transition-colors" data-testid={`related-story-${index}`}>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {getField(relatedStory.title)}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {getField(relatedStory.city)} • {getField(relatedStory.language)}
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