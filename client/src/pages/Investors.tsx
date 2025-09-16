
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Mail, 
  Target, 
  Users, 
  TrendingUp, 
  Globe, 
  Shield, 
  Heart,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Lightbulb,
  Building2
} from 'lucide-react';

const Investors = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. Hero / Intro */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground font-serif mb-6" data-testid="text-hero-title">
          {t('investors_hero_title')} <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t('investors_hero_title_highlight')}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed" data-testid="text-hero-mission">
          {t('investors_hero_mission')}
        </p>
        <Button asChild className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center" data-testid="button-download-deck">
          <a href="/investor-deck.pdf" target="_blank" rel="noopener" download>
            <Download className="mr-2 w-5 h-5" />
            {t('investors_hero_download_deck')}
          </a>
        </Button>

        {/* Hero Background */}
        <div className="mt-16 relative">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Healthcare investment and business growth" 
            className="w-full h-80 object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl"></div>
        </div>
      </section>

      {/* 2. The Problem → The Solution */}
      <section className="py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Problem */}
          <Card className="p-8 border-red-200 bg-red-50/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground font-serif">{t('investors_problem_title')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">{t('investors_problem_1')}</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">{t('investors_problem_2')}</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">{t('investors_problem_3')}</p>
              </div>
            </div>
          </Card>

          {/* Solution */}
          <Card className="p-8 border-green-200 bg-green-50/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground font-serif">{t('investors_solution_title')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700 text-lg"><strong>{t('investors_solution_1')}</strong> {t('investors_solution_1_desc')}</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700 text-lg"><strong>{t('investors_solution_2')}</strong> {t('investors_solution_2_desc')}</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                <p className="text-gray-700 text-lg"><strong>{t('investors_solution_3')}</strong> {t('investors_solution_3_desc')}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Traction & Metrics */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mx-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">{t('investors_traction_title')}</h2>
          <p className="text-xl text-muted-foreground">{t('investors_traction_subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 px-8">
          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('investors_traction_languages')}</h3>
            <p className="text-gray-600">{t('investors_traction_languages_desc')}</p>
          </Card>

          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('investors_traction_faqs')}</h3>
            <p className="text-gray-600">{t('investors_traction_faqs_desc')}</p>
          </Card>

          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('investors_traction_pilot')}</h3>
            <p className="text-gray-600">{t('investors_traction_pilot_desc')}</p>
          </Card>
        </div>
      </section>

      {/* 4. Business Model */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">{t('investors_model_title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('investors_model_subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t('investors_model_phase1_title')}</h3>
            <p className="text-gray-600 mb-4">{t('investors_model_phase1_desc')}</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {t('investors_model_phase1_1')}</li>
              <li>• {t('investors_model_phase1_2')}</li>
              <li>• {t('investors_model_phase1_3')}</li>
            </ul>
          </Card>

          <Card className="p-8 relative overflow-hidden border-purple-200 bg-purple-50/30">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t('investors_model_phase2_title')}</h3>
            <p className="text-gray-600 mb-4">{t('investors_model_phase2_desc')}</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {t('investors_model_phase2_1')}</li>
              <li>• {t('investors_model_phase2_2')}</li>
              <li>• {t('investors_model_phase2_3')}</li>
            </ul>
          </Card>

          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t('investors_model_phase3_title')}</h3>
            <p className="text-gray-600 mb-4">{t('investors_model_phase3_desc')}</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {t('investors_model_phase3_1')}</li>
              <li>• {t('investors_model_phase3_2')}</li>
              <li>• {t('investors_model_phase3_3')}</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 5. Why Us (Moat & Team) */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl mx-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">{t('investors_why_title')}</h2>
          <p className="text-xl text-muted-foreground">{t('investors_why_subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 px-8">
          {/* Moat */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-purple-600" />
              {t('investors_moat_title')}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('investors_moat_data_title')}</h4>
                  <p className="text-gray-600">{t('investors_moat_data_desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('investors_moat_clinician_title')}</h4>
                  <p className="text-gray-600">{t('investors_moat_clinician_desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('investors_moat_multilingual_title')}</h4>
                  <p className="text-gray-600">{t('investors_moat_multilingual_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-pink-600" />
              {t('investors_team_title')}
            </h3>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('investors_team_desc')}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>{t('investors_team_healthcare')}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>{t('investors_team_engineers')}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>{t('investors_team_ai')}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>{t('investors_team_medical')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-20">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">{t('investors_cta_title')}</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            {t('investors_cta_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center shadow-lg" data-testid="button-download-onepager">
              <a href="/one-pager.pdf" target="_blank" rel="noopener" download>
                <Download className="mr-2 w-5 h-5" />
                {t('investors_cta_onepager')}
              </a>
            </Button>
            
            <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center" data-testid="button-contact-investors">
              <a href="mailto:investors@janmasethu.com">
                <Mail className="mr-2 w-5 h-5" />
                {t('investors_cta_contact')}
              </a>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-sm opacity-75">
            <span className="mr-2">{t('investors_cta_schedule')}</span>
            <ArrowRight className="w-4 h-4" />
            <a href="mailto:investors@janmasethu.com" className="ml-2 hover:opacity-100 transition-opacity">
              investors@janmasethu.com
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-disclaimer">
            {t('investors_disclaimer')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Investors;
