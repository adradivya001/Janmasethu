import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, User, Syringe, Microscope, Dna, HeartHandshake, Snowflake, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { treatmentsList, fetchTreatmentData, getSummaryByLanguage, getContentByLanguage, normalizeTreatmentData, type TreatmentData, type Treatment } from '@/data/treatments';

const Treatments = () => {
  const { t, lang } = useLanguage();
  const [treatmentsData, setTreatmentsData] = useState<Record<string, TreatmentData>>({});
  const [loading, setLoading] = useState(true);

  // Scroll to top and load treatment data when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    loadTreatmentData();
  }, []);

  const loadTreatmentData = async () => {
    const data: Record<string, TreatmentData> = {};

    for (const treatment of treatmentsList) {
      const treatmentData = await fetchTreatmentData(treatment.id);
      if (treatmentData) {
        data[treatment.id] = normalizeTreatmentData(treatmentData);
      }
    }

    setTreatmentsData(data);
    setLoading(false);
  };

  const pageTitle = {
    en: "Treatments at a glance",
    hi: "उपचार एक नजर में",
    te: "చికిత్సలు ఒక చూపులో"
  };

  const pageSubtitle = {
    en: "Comprehensive guides to fertility treatments, procedures, and options available in India. Each guide includes steps, costs, risks, and questions to ask your doctor.",
    hi: "भारत में उपलब्ध प्रजनन उपचार, प्रक्रियाओं और विकल्पों के लिए व्यापक गाइड। प्रत्येक गाइड में चरण, लागत, जोखिम और अपने डॉक्टर से पूछने के लिए प्रश्न शामिल हैं।",
    te: "భారతదేశంలో అందుబాటులో ఉన్న ప్రజనన చికిత్సలు, ప్రక్రియలు మరియు ఎంపికలకు సమగ్ర గైడ్‌లు. ప్రతి గైడ్‌లో దశలు, ఖర్చులు, ప్రమాదాలు మరియు మీ వైద్యుడిని అడగవలసిన ప్రశ్నలు ఉంటాయి."
  };


  const treatmentIcons = {
    'iui': { icon: Syringe, color: 'bg-blue-100 text-blue-600' },
    'ivf': { icon: Microscope, color: 'bg-purple-100 text-purple-600' },
    'icsi': { icon: Dna, color: 'bg-green-100 text-green-600' },
    'donor-options': { icon: HeartHandshake, color: 'bg-pink-100 text-pink-600' },
    'fertility-preservation': { icon: Snowflake, color: 'bg-orange-100 text-orange-600' }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-treatments-title">
          {pageTitle[lang as keyof typeof pageTitle] || pageTitle.en}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {pageSubtitle[lang as keyof typeof pageSubtitle] || pageSubtitle.en}
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
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-6 h-6 animate-spin" />
            <span className="text-lg">
              {lang === 'hi' ? 'लोड हो रहा है...' :
               lang === 'te' ? 'లోడ్ అవుతోంది...' :
               'Loading treatments...'}
            </span>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentsList.map((treatment, index) => {
            const iconData = treatmentIcons[treatment.slug as keyof typeof treatmentIcons] || treatmentIcons['iui'];
            const treatmentData = treatmentsData[treatment.id];
            const langKey = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';

            const summary = treatmentData ? getSummaryByLanguage(treatmentData.summary || treatmentData.Summary, langKey) : '';
            const benefits = treatmentData ? getContentByLanguage(treatmentData.who_might_benefit || treatmentData['Who Might Benefit'], langKey) : [];
            const reviewedBy = treatmentData?.reviewed_by || treatmentData?.['Reviewed by'] || 'Dr. Raghav Iyer';

            return (
              <Link key={treatment.slug} href={`/treatments/${treatment.slug}`} className="group h-full">
                <Card className="rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer transform hover:scale-102 border border-gray-100 hover:border-purple-200 relative overflow-hidden bg-white">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Click indicator */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-purple-600" />
                      </div>
                    </div>

                    <div className={`w-12 h-12 ${iconData.color.split(' ')[0]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                      <iconData.icon className={`${iconData.color.split(' ')[1]} w-6 h-6`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground font-serif mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                      {treatmentData?.title || treatment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-grow mb-4 leading-relaxed">
                      {summary || 'Treatment information loading...'}
                    </p>

                    {/* Call to action */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {lang === 'hi' ? 'और जानें' :
                         lang === 'te' ? 'మరింత తెలుసుకోండి' :
                         'Learn More'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Additional Resources */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground font-serif mb-4">
              {t('support_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('support_subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sakhi">
              <Button className="gradient-button-secondary text-white px-8 py-4 rounded-full font-semibold" data-testid="button-talk-sakhi">
                {t('talk_sakhi_button')}
              </Button>
            </Link>
            <Link href="/experts">
              <Button variant="outline" className="bg-white px-8 py-4 rounded-full font-semibold" data-testid="button-find-experts">
                {t('find_experts_button')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treatments;