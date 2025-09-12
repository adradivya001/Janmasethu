import { Link } from 'wouter';
import { ArrowRight, CheckCircle, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { treatments } from '@/data/treatments';

const Treatments = () => {
  const { t, lang } = useLanguage();

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
                    {t(`treatment_${treatment.id}_title` as any)}
                  </h3>

                  <p className="text-muted-foreground mb-6" data-testid={`text-treatment-overview-${index}`}>
                    {t(`treatment_${treatment.id}_desc` as any)}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {lang === 'hi' ? 'किसे फायदा हो सकता है:' :
                         lang === 'te' ? 'ఎవరికి ప్రయోజనం ఉంటుంది:' :
                         'Who might benefit:'}
                      </h3>
                      <ul className="space-y-2">
                        {treatment.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {lang === 'hi' && benefit === 'Unexplained infertility' ? 'अस्पष्ट बांझपन' :
                               lang === 'hi' && benefit === 'Mild male-factor' ? 'हल्का पुरुष कारक' :
                               lang === 'hi' && benefit === 'Cervical issues' ? 'गर्भाशय ग्रीवा समस्याएं' :
                               lang === 'hi' && benefit === 'Tubal factor' ? 'नलिका कारक' :
                               lang === 'hi' && benefit === 'Severe male-factor' ? 'गंभीर पुरुष कारक' :
                               lang === 'hi' && benefit === 'Prior fertilisation failure' ? 'पूर्व निषेचन विफलता' :
                               lang === 'hi' && benefit === 'Single women' ? 'अकेली महिलाएं' :
                               lang === 'hi' && benefit === 'Same-sex couples' ? 'समलिंगी जोड़े' :
                               lang === 'hi' && benefit === 'Cancer patients' ? 'कैंसर रोगी' :
                               lang === 'hi' && benefit === 'Delayed childbearing' ? 'देर से संतान' :
                               lang === 'te' && benefit === 'Unexplained infertility' ? 'వివరించలేని వంధ్యత' :
                               lang === 'te' && benefit === 'Mild male-factor' ? 'తేలిక పురుష కారణం' :
                               lang === 'te' && benefit === 'Cervical issues' ? 'గర్భాశయ మెడ సమస్యలు' :
                               lang === 'te' && benefit === 'Tubal factor' ? 'ట్యూబల్ కారణం' :
                               lang === 'te' && benefit === 'Severe male-factor' ? 'తీవ్రమైన పురుష కారణం' :
                               lang === 'te' && benefit === 'Prior fertilisation failure' ? 'మునుపటి ఫెర్టిలైజేషన్ విఫలత' :
                               lang === 'te' && benefit === 'Single women' ? 'ఒంటరి మహిళలు' :
                               lang === 'te' && benefit === 'Same-sex couples' ? 'స్వలింగ జంటలు' :
                               lang === 'te' && benefit === 'Cancer patients' ? 'కాన్సర్ రోగులు' :
                               lang === 'te' && benefit === 'Delayed childbearing' ? 'ఆలస్యంగా పిల్లలు' :
                               benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>
                          {lang === 'hi' ? 'द्वारा समीक्षित' :
                           lang === 'te' ? 'సమీక్షించినవారు' :
                           'Reviewed by'} {treatment.reviewedBy}
                        </span>
                      </div>
                      <Button className="gradient-button text-white rounded-full">
                        {lang === 'hi' ? 'और जानें' :
                         lang === 'te' ? 'మరింత తెలుసుకోండి' :
                         'Learn More'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
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