import { useParams, Link } from 'wouter';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';
import { fetchArticleData, type ArticleData, type ArticleContent } from '@/data/knowledgeHub';

const Article = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load article data from JSON
  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchArticleData(slug);
        if (data) {
          setArticleData(data);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state or article not found
  if (error || !articleData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">
              {lang === 'hi' ? 'लेख नहीं मिला' : lang === 'te' ? 'వ్యాసం కనుగొనబడలేదు' : 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error || (lang === 'hi' ? 'आप जो लेख खोज रहे हैं वह मौजूद नहीं है।' : 
               lang === 'te' ? 'మీరు వెతుకుతున్న వ్యాసం ఉనికిలో లేదు।' : 
               'The article you\'re looking for doesn\'t exist.')}
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

  // Helper function to get content in the current language
  const getLocalizedContent = (content: any, fallback: string = '') => {
    if (!content) return fallback;
    if (typeof content === 'string') return content;
    
    const langKey = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';
    return content[langKey] || content.en || fallback;
  };

  // Helper function to render article content
  const renderContent = (content: ArticleContent) => {
    const langKey = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';
    
    switch (content.type) {
      case 'paragraph':
        const paragraphText = content.text?.[langKey] || content.text?.en || '';
        if (!paragraphText) return null;
        return (
          <p className="text-muted-foreground leading-relaxed mb-4">
            {paragraphText}
          </p>
        );
      case 'subheading':
        const subheadingText = content.text?.[langKey] || content.text?.en || '';
        if (!subheadingText) return null;
        return (
          <h3 className="text-xl font-bold text-foreground font-serif mb-3 mt-6">
            {subheadingText}
          </h3>
        );
      case 'list':
        if (!content.items || content.items.length === 0) return null;
        return (
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {content.items.map((item, index) => {
              const itemText = typeof item === 'object' ? (item[langKey] || item.en || '') : item;
              return (
                <li key={index} className="text-muted-foreground leading-relaxed">
                  {itemText}
                </li>
              );
            })}
          </ul>
        );
      default:
        return null;
    }
  };

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
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-article-title">
          {getLocalizedContent(articleData.title)}
        </h1>

        <p className="text-xl text-muted-foreground mb-8" data-testid="text-article-summary">
          {getLocalizedContent(articleData.overview)}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span data-testid="text-read-time">
              {getLocalizedContent(articleData.metadata?.readTime)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span data-testid="text-reviewed-by">
              {getLocalizedContent(articleData.metadata?.reviewer)}
            </span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {articleData.sections.map((section, index) => (
              <Card key={section.id} className="rounded-3xl p-8 card-shadow" data-testid={`card-section-${index}`}>
                <CardContent className="p-0">
                  {/* Only show title if it's not empty */}
                  {getLocalizedContent(section.title) && (
                    <h2 className="text-2xl font-bold text-foreground font-serif mb-6" data-testid={`text-section-title-${index}`}>
                      {getLocalizedContent(section.title)}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {section.content.map((content, contentIndex) => (
                      <div key={contentIndex}>
                        {renderContent(content)}
                      </div>
                    ))}
                  </div>
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
                {(articleData.metadata?.sources || []).map((source: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{source}</span>
                  </div>
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