import { Link } from "wouter";
import { useEffect } from "react";
import { MapPin, Heart } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stories } from "@/data/stories";

const SuccessStories = () => {
  const { t, lang } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStoryImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    ];
    return images[index % images.length];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6"
          data-testid="text-success-stories-title"
        >
          {t("success_preview_title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t("success_preview_description")}
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {stories.map((story, index) => (
          <Link
            key={story.slug}
            href={`/success-stories/${story.slug}`}
            className="group h-full"
          >
            <Card
              className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 h-full cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-pink-200 relative overflow-hidden bg-gradient-to-br from-white to-pink-50/30"
              data-testid={`card-success-story-${index}`}
            >
              <CardContent className="p-0 flex flex-col h-full">
                {/* Click indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-600" />
                  </div>
                </div>

                <img
                  src={getStoryImage(index)}
                  alt={story.title[lang]}
                  className="rounded-xl w-full h-32 object-cover mb-4 group-hover:shadow-lg transition-shadow"
                />

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className="text-xs group-hover:shadow-sm transition-shadow"
                    data-testid={`badge-story-stage-${index}`}
                  >
                    {story.stage[lang]}
                  </Badge>
                  {story.treatment && (
                    <Badge
                      variant="outline"
                      className="text-xs group-hover:shadow-sm transition-shadow"
                      data-testid={`badge-story-treatment-${index}`}
                    >
                      {story.treatment[lang]}
                    </Badge>
                  )}
                </div>

                <h3
                  className="text-lg font-bold text-foreground font-serif mb-2 group-hover:text-pink-600 transition-colors"
                  data-testid={`text-story-title-${index}`}
                >
                  {story.title[lang]}
                </h3>
                <p
                  className="text-sm text-muted-foreground mb-4 flex-grow group-hover:text-pink-700 transition-colors"
                  data-testid={`text-story-summary-${index}`}
                >
                  {story.summary[lang]}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span data-testid={`text-story-city-${index}`}>
                      {story.city[lang]}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground space-x-2">
                    <span data-testid={`text-story-language-${index}`}>
                      {story.language[lang]}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-600 font-medium">
                      • Read story
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Support Section */}
      <section className="py-16">
        <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300 rounded-full blur-lg"></div>
          </div>
          
          <div className="relative z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">
              {t("share_story_title")}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {t("share_story_description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button
                  className="gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-share-story"
                >
                  {t("share_story_button")}
                </Button>
              </Link>
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full border-2 border-white"></div>
                </div>
                <span>Join {stories.length}+ families who shared</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;