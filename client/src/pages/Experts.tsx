import { Link } from 'wouter';
import { useEffect } from 'react';
import { MapPin, GraduationCap, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { experts } from '@/data/experts';

const Experts = () => {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getExpertImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
    ];
    return images[index % images.length];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-experts-title">
          {t('nav_experts')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('experts_subtitle')}
        </p>

        {/* Hero Background */}
        <div className="mt-12 relative">
          <img 
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt={t('alt_medical_consultation')} 
            className="w-full h-64 object-cover rounded-3xl opacity-20"
          />
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {experts.map((expert, index) => (
          <Link key={expert.id} href={`/experts/${expert.id}`} className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-expert-${index}`}>
              <CardContent className="p-0">
                <div className="text-center mb-4">
                  <img 
                    src={getExpertImage(index)} 
                    alt={expert.name} 
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-foreground font-serif mb-2" data-testid={`text-expert-name-${index}`}>
                    {expert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`text-expert-role-${index}`}>
                    {expert.role}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <GraduationCap className="w-3 h-3" />
                    <span data-testid={`text-expert-credentials-${index}`}>{expert.credentials}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span data-testid={`text-expert-city-${index}`}>{expert.city}</span>
                  </div>

                  <p className="text-sm text-muted-foreground text-center" data-testid={`text-expert-bio-${index}`}>
                    {expert.bio}
                  </p>

                  <div>
                    <p className="text-xs font-medium text-foreground mb-2">Reviews:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {expert.reviewed.map(area => (
                        <Badge key={area} variant="outline" className="text-xs" data-testid={`badge-expert-review-${area}-${index}`}>
                          <CheckCircle className="w-2 h-2 mr-1" />
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground font-serif mb-4">
            Quality You Can Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            All our content is reviewed by qualified professionals to ensure accuracy and relevance. 
            However, this information is for educational purposes only and should not replace professional medical advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/knowledge">
              <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold" data-testid="button-browse-knowledge">
                Browse Knowledge Hub
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="bg-white px-8 py-4 rounded-full font-semibold" data-testid="button-contact-experts">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experts;
