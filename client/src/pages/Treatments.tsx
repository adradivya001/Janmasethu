import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { treatments } from '@/data/treatments';

const Treatments = () => {
  const { t } = useLanguage();

  const treatmentIcons = {
    'iui': { icon: 'fas fa-syringe', color: 'bg-blue-100 text-blue-600' },
    'ivf': { icon: 'fas fa-microscope', color: 'bg-purple-100 text-purple-600' },
    'icsi': { icon: 'fas fa-dna', color: 'bg-green-100 text-green-600' },
    'donor-options': { icon: 'fas fa-hand-holding-heart', color: 'bg-pink-100 text-pink-600' },
    'fertility-preservation': { icon: 'fas fa-snowflake', color: 'bg-orange-100 text-orange-600' }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-treatments-title">
          {t('treatments_overview_title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive guides to fertility treatments, procedures, and options available in India. 
          Each guide includes steps, costs, risks, and questions to ask your doctor.
        </p>
        
        {/* Hero Background Image */}
        <div className="mt-12 relative">
          <img 
            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Medical consultation scene" 
            className="w-full h-64 object-cover rounded-3xl opacity-20"
          />
        </div>
      </div>

      {/* Treatments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {treatments.map((treatment, index) => {
          const iconData = treatmentIcons[treatment.slug as keyof typeof treatmentIcons] || treatmentIcons['iui'];
          
          return (
            <Link key={treatment.slug} href={`/treatments/${treatment.slug}`} className="group">
              <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-treatment-${index}`}>
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${iconData.color.split(' ')[0]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <i className={`${iconData.icon} ${iconData.color.split(' ')[1]} text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid={`text-treatment-name-${index}`}>
                    {treatment.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`text-treatment-overview-${index}`}>
                    {treatment.overview}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Who might benefit:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {treatment.who.slice(0, 2).map((item, idx) => (
                          <li key={idx} data-testid={`text-treatment-who-${index}-${idx}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-muted-foreground">Reviewed by {treatment.reviewedBy}</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Additional Resources */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground font-serif mb-4">Need Support?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navigating treatment options can be overwhelming. Sakhi is here to provide emotional support and guidance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sakhi">
              <Button className="gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold" data-testid="button-talk-sakhi">
                Talk to Sakhi
              </Button>
            </Link>
            <Link href="/experts">
              <Button variant="outline" className="bg-white px-8 py-4 rounded-full font-semibold" data-testid="button-find-experts">
                Find Experts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treatments;
