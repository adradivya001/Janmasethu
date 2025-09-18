import { useParams, Link } from 'wouter';
import { useEffect } from 'react';
import { ArrowLeft, Clock, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';

const Article = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();

  const article = articles.find(a => a.slug === slug);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">
              {lang === 'hi' ? 'लेख नहीं मिला' : lang === 'te' ? 'వ్యాసం కనుగొనబడలేదు' : 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {lang === 'hi' ? 'आप जो लेख खोज रहे हैं वह मौजूद नहीं है।' : 
               lang === 'te' ? 'మీరు వెతుకుతున్న వ్యాసం ఉనికిలో లేదు।' : 
               'The article you\'re looking for doesn\'t exist.'}
            </p>
            <Link href="/knowledge">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {lang === 'hi' ? 'ज्ञान केंद्र में वापस जाएं' : 
                 lang === 'te' ? 'నాలెడ్జ్ హబ్‌కు తిరిగి వెళ్లండి' : 
                 'Back to Knowledge Hub'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.slug !== article.slug && a.lens.some(l => article.lens.includes(l)))
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/knowledge">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-knowledge">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {lang === 'hi' ? 'ज्ञान केंद्र में वापस जाएं' : 
             lang === 'te' ? 'నాలెడ్జ్ హబ్‌కు తిరిగి వెళ్లండి' : 
             'Back to Knowledge Hub'}
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.lens.map(lens => (
            <Badge key={lens} variant="secondary" className="rounded-full" data-testid={`badge-lens-${lens}`}>
              {lens === 'medical' ? t('lens_medical') :
               lens === 'social' ? t('lens_social') :
               lens === 'financial' ? t('lens_financial') :
               lens === 'nutrition' ? t('lens_nutrition') : lens}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-article-title">
          {article.title[lang as keyof typeof article.title] || article.title.en}
        </h1>

        <p className="text-xl text-muted-foreground mb-8" data-testid="text-article-summary">
          {article.summary[lang as keyof typeof article.summary] || article.summary.en}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span data-testid="text-read-time">
              {article.readMins} {lang === 'hi' ? 'मिनट पढ़ना' : lang === 'te' ? 'నిమిషాల రీడ్' : 'min read'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span data-testid="text-reviewed-by">
              {lang === 'hi' ? 'द्वारा समीक्षित' : lang === 'te' ? 'సమీక్షించినవారు' : 'Reviewed by'} {article.reviewedBy}
            </span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {article.body.map((section, index) => (
              <Card key={index} className="rounded-3xl p-8 card-shadow" data-testid={`card-section-${index}`}>
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid={`text-section-title-${index}`}>
                    {lang === 'hi' && section === 'At a glance' ? 'एक नज़र में' :
                     lang === 'hi' && section === 'Key steps' ? 'मुख्य चरण' :
                     lang === 'hi' && section === 'Choices' ? 'विकल्प' :
                     lang === 'hi' && section === 'Recovery' ? 'रिकवरी' :
                     lang === 'hi' && section === 'Costs' ? 'लागत' :
                     lang === 'hi' && section === 'Why it matters' ? 'यह क्यों महत्वपूर्ण है' :
                     lang === 'hi' && section === 'How it\'s done' ? 'यह कैसे किया जाता है' :
                     lang === 'hi' && section === 'Results' ? 'परिणाम' :
                     lang === 'hi' && section === 'Eligibility' ? 'पात्रता' :
                     lang === 'hi' && section === 'Documents' ? 'दस्तावेज़' :
                     lang === 'hi' && section === 'Steps' ? 'चरण' :
                     lang === 'hi' && section === 'Follow‑up' ? 'फॉलो-अप' :
                     lang === 'hi' && section === 'Eat' ? 'खाएं' :
                     lang === 'hi' && section === 'Limit' ? 'सीमित करें' :
                     lang === 'hi' && section === 'Avoid' ? 'बचें' :
                     lang === 'te' && section === 'At a glance' ? 'ఒక చూపులో' :
                     lang === 'te' && section === 'Key steps' ? 'ముఖ్య దశలు' :
                     lang === 'te' && section === 'Choices' ? 'ఎంపికలు' :
                     lang === 'te' && section === 'Recovery' ? 'రికవరీ' :
                     lang === 'te' && section === 'Costs' ? 'ఖర్చులు' :
                     lang === 'te' && section === 'Why it matters' ? 'ఇది ఎందుకు ముఖ్యం' :
                     lang === 'te' && section === 'How it\'s done' ? 'ఇది ఎలా చేయబడుతుంది' :
                     lang === 'te' && section === 'Results' ? 'ఫలితాలు' :
                     lang === 'te' && section === 'Eligibility' ? 'అర్హత' :
                     lang === 'te' && section === 'Documents' ? 'పత్రాలు' :
                     lang === 'te' && section === 'Steps' ? 'దశలు' :
                     lang === 'te' && section === 'Follow‑up' ? 'ఫాలో-అప్' :
                     lang === 'te' && section === 'Eat' ? 'తినండి' :
                     lang === 'te' && section === 'Limit' ? 'పరిమితం చేయండి' :
                     lang === 'te' && section === 'Avoid' ? 'నివారించండి' :
                     section}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-section-content-${index}`}>
                    {lang === 'hi' ? 
                      `इस खंड में ${section.toLowerCase()} के बारे में विस्तृत जानकारी होगी। वास्तविक कार्यान्वयन में, यह इस विषय के लिए व्यापक, चिकित्सकीय रूप से समीक्षित सामग्री से भरा होगा।` :
                     lang === 'te' ? 
                      `ఈ విభాగంలో ${section.toLowerCase()} గురించి వివరణాత్మక సమాచారం ఉంటుంది। వాస్తవ అమలులో, ఇది ఈ అంశానికి సంబంధించిన సమగ్ర, వైద్యపరంగా సమీక్షించిన కంటెంట్‌తో నిండి ఉంటుంది।` :
                      `This section would contain detailed information about ${section.toLowerCase()}. In a real implementation, this would be populated with comprehensive, medically-reviewed content specific to this topic.`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Sources */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">
                {lang === 'hi' ? 'स्रोत' : lang === 'te' ? 'మూలాలు' : 'Sources'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {article.sources.map((source, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{source}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">
                {lang === 'hi' ? 'संबंधित लेख' : lang === 'te' ? 'సంబంధిత వ్యాసాలు' : 'Related Articles'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle, index) => (
                  <Link key={relatedArticle.slug} href={`/knowledge/${relatedArticle.slug}`}>
                    <div className="p-4 rounded-2xl bg-background hover:bg-muted transition-colors cursor-pointer" data-testid={`link-related-article-${index}`}>
                      <h4 className="font-semibold text-foreground mb-1" data-testid={`text-related-title-${index}`}>
                        {relatedArticle.title[lang as keyof typeof relatedArticle.title] || relatedArticle.title.en}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-related-summary-${index}`}>
                        {relatedArticle.summary[lang as keyof typeof relatedArticle.summary] || relatedArticle.summary.en}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span data-testid={`text-related-readtime-${index}`}>
                          {relatedArticle.readMins} {lang === 'hi' ? 'मिनट' : lang === 'te' ? 'నిమిషాలు' : 'min'}
                        </span>
                      </div>
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
};

export default Article;