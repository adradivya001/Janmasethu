import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Heart, Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Story() {
  const [, params] = useRoute("/success-stories/:slug");
  const { language } = useLanguage();
  const [story, setStory] = useState<any>(null);
  const [allStories, setAllStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get field value based on language
  const getField = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[language] || field.en || "";
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/success-stories");
        const data = await response.json();
        setAllStories(data);

        if (params?.slug) {
          const foundStory = data.find((s: any) => s.slug === params.slug);
          setStory(foundStory || null);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <Card className="max-w-md mx-auto m-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Story Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The success story you're looking for doesn't exist.
            </p>
            <Link href="/success-stories">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Success Stories
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/success-stories">
          <Button variant="ghost" className="mb-6 hover:bg-white/60">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Success Stories
          </Button>
        </Link>

        <div className="grid gap-6">
          {/* Main Story Card */}
          <Card className="rounded-3xl overflow-hidden card-shadow">
            {story.image_url && (
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={story.image_url}
                  alt={getField(story.title)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-foreground font-serif">
                {getField(story.title)}
              </CardTitle>
              <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
                {story.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{getField(story.city)}</span>
                  </div>
                )}
                {story.language && (
                  <div className="flex items-center gap-1">
                    <Languages className="w-4 h-4" />
                    <span>{getField(story.language)}</span>
                  </div>
                )}
                {story.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Story Details */}
              <div className="space-y-4">
                {story.summary && (
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border-l-4 border-pink-400">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {getField(story.summary)}
                    </p>
                  </div>
                )}

                {story.stage && (
                  <div>
                    <span className="font-medium text-foreground">Current Stage:</span>
                    <span className="ml-2 inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {getField(story.stage)}
                    </span>
                  </div>
                )}

                {story.treatment && (
                  <div>
                    <span className="font-medium text-foreground">Treatment:</span>
                    <p className="text-muted-foreground mt-1">{getField(story.treatment)}</p>
                  </div>
                )}
              </div>

              {/* Raw data fields (if available) */}
              {story.raw && (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {story.raw.duration && (
                      <div>
                        <span className="font-medium text-foreground">Journey Duration:</span>
                        <p className="text-muted-foreground">{story.raw.duration}</p>
                      </div>
                    )}
                    {story.raw.emotions && Array.isArray(story.raw.emotions) && story.raw.emotions.length > 0 && (
                      <div>
                        <span className="font-medium text-foreground">Emotions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {story.raw.emotions.map((emotion: string, idx: number) => (
                            <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                              {emotion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {story.raw.challenges && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Their Journey</h3>
                        <p className="text-muted-foreground leading-relaxed">{story.raw.challenges}</p>
                      </div>
                    )}
                    {story.raw.emotion_details && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">How They Felt</h3>
                        <p className="text-muted-foreground leading-relaxed">{story.raw.emotion_details}</p>
                      </div>
                    )}
                    {story.raw.outcome_description && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Outcome</h3>
                        <p className="text-muted-foreground leading-relaxed">{story.raw.outcome_description}</p>
                      </div>
                    )}
                    {story.raw.message_of_hope && (
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border-l-4 border-pink-400">
                        <h3 className="font-semibold text-foreground mb-2">Message of Hope</h3>
                        <p className="text-muted-foreground leading-relaxed italic">"{story.raw.message_of_hope}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
}