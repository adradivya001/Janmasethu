
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, TrendingUp, Shield, Download, Mail } from 'lucide-react';

const Investors = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-investors-title">
          {t('investors_title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto" data-testid="text-investors-intro">
          {t('investors_intro')}
        </p>

        {/* Hero Background */}
        <div className="mt-12 relative">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Healthcare innovation and investment" 
            className="w-full h-64 object-cover rounded-3xl opacity-20"
          />
        </div>
      </div>

      {/* Three Cards Section */}
      <section className="py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Platform Card */}
          <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300" data-testid="card-platform">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-platform-title">
              {t('investors_platform_title')}
            </h2>
            <p className="text-muted-foreground" data-testid="text-platform-desc">
              {t('investors_platform_desc')}
            </p>
          </Card>

          {/* Model Card */}
          <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300" data-testid="card-model">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-model-title">
              {t('investors_model_title')}
            </h2>
            <p className="text-muted-foreground" data-testid="text-model-desc">
              {t('investors_model_desc')}
            </p>
          </Card>

          {/* Defensibility Card */}
          <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300" data-testid="card-defensibility">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="text-purple-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid="text-defensibility-title">
              {t('investors_defensibility_title')}
            </h2>
            <p className="text-muted-foreground" data-testid="text-defensibility-desc">
              {t('investors_defensibility_desc')}
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground font-serif mb-8">
            Ready to Learn More?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center" data-testid="button-download-onepager">
              <Download className="mr-2 w-4 h-4" />
              {t('investors_cta_onepager')}
            </Button>
            <Button variant="outline" className="bg-white text-foreground px-8 py-4 rounded-full font-semibold text-lg border-border hover:shadow-lg transition-all duration-300 inline-flex items-center" data-testid="button-contact-us">
              <Mail className="mr-2 w-4 h-4" />
              <a href="mailto:investors@janmasethu.com" className="no-underline">
                {t('investors_cta_contact')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-disclaimer">
            {t('footer_disclaimer')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Investors;
