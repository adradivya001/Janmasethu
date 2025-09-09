import { useParams, Link } from 'wouter';
import { ArrowLeft, MapPin, GraduationCap, CheckCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { experts } from '@/data/experts';
import { articles } from '@/data/articles';

const Expert = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  
  const expert = experts.find(e => e.id === id);

  if (!expert) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Expert Not Found</h1>
            <p className="text-muted-foreground mb-6">The expert profile you're looking for doesn't exist.</p>
            <Link href="/experts">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Experts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getExpertImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400'
    ];
    const index = Math.abs(expert.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % images.length;
    return images[index];
  };

  const reviewedArticles = articles.filter(article => 
    article.reviewedBy.toLowerCase().includes(expert.name.toLowerCase().split(' ')[1]) ||
    article.reviewedBy.toLowerCase().includes(expert.name.toLowerCase().split(' ')[0])
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/experts">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-experts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experts
          </Button>
        </Link>
      </div>

      {/* Expert Profile */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src={getExpertImage()} 
                alt={expert.name} 
                className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
              />
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span data-testid="text-expert-city">{expert.city}</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-expert-name">
                {expert.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4" data-testid="text-expert-role">
                {expert.role}
              </p>

              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium" data-testid="text-expert-credentials">
                  {expert.credentials}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-expert-bio">
                {expert.bio}
              </p>

              <div>
                <h3 className="text-lg font-bold text-foreground font-serif mb-3">Areas of Review</h3>
                <div className="flex flex-wrap gap-2">
                  {expert.reviewed.map(area => (
                    <Badge key={area} variant="secondary" data-testid={`badge-expert-area-${area}`}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviewed Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground font-serif">
                Content Reviewed by {expert.name.split(' ')[1] || expert.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reviewedArticles.length > 0 ? (
                <div className="space-y-4">
                  {reviewedArticles.map((article, index) => (
                    <Link key={article.slug} href={`/knowledge/${article.slug}`}>
                      <div className="p-4 rounded-xl border border-border hover:bg-muted transition-colors" data-testid={`reviewed-article-${index}`}>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {article.lens.map(lens => (
                            <Badge key={lens} variant="outline" className="text-xs">
                              {lens}
                            </Badge>
                          ))}
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {article.title.en}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {article.summary.en}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8" data-testid="text-no-reviewed-content">
                  No content reviews found for this expert yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Professional Info */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground font-serif">Professional Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-foreground">Specialization:</span>
                  <p className="text-muted-foreground" data-testid="text-expert-specialization">{expert.role}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Credentials:</span>
                  <p className="text-muted-foreground" data-testid="text-expert-credentials-detail">{expert.credentials}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Location:</span>
                  <p className="text-muted-foreground" data-testid="text-expert-location">{expert.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Experts */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground font-serif">Other Experts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {experts
                  .filter(e => e.id !== expert.id)
                  .slice(0, 3)
                  .map((otherExpert, index) => (
                    <Link key={otherExpert.id} href={`/experts/${otherExpert.id}`}>
                      <div className="p-3 rounded-xl hover:bg-muted transition-colors" data-testid={`other-expert-${index}`}>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {otherExpert.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {otherExpert.role} • {otherExpert.city}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="rounded-3xl p-6 card-shadow bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-0 text-center">
              <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-foreground mb-2">
                Quality Assurance
              </h3>
              <p className="text-xs text-muted-foreground">
                All content is reviewed for accuracy but should not replace professional medical consultation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Expert;
