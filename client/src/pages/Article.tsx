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

  // Load article data from JSON - re-fetch when language changes
  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Pass current language to fetch localized content
        const data = await fetchArticleData(slug, lang);
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
  }, [slug, lang]); // Re-fetch when language changes

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

  // Helper function to parse markdown-like text to formatted HTML
  const parseMarkdownText = (text: string) => {
    if (!text) return null;
    
    // Split by markdown headings and process
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph = '';
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check for ## headings
      if (trimmedLine.startsWith('## ')) {
        // Flush current paragraph
        if (currentParagraph) {
          elements.push(
            <p key={`p-${index}`} className="text-foreground/80 leading-relaxed mb-4" 
               dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(currentParagraph) }} />
          );
          currentParagraph = '';
        }
        const headingText = trimmedLine.replace(/^##\s*\d*\.?\s*/, '');
        elements.push(
          <h3 key={`h-${index}`} className="text-xl font-bold text-foreground font-serif mt-8 mb-4">
            {headingText}
          </h3>
        );
      } else if (trimmedLine.startsWith('### ')) {
        // Flush current paragraph
        if (currentParagraph) {
          elements.push(
            <p key={`p-${index}`} className="text-foreground/80 leading-relaxed mb-4"
               dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(currentParagraph) }} />
          );
          currentParagraph = '';
        }
        const headingText = trimmedLine.replace(/^###\s*/, '');
        elements.push(
          <h4 key={`h4-${index}`} className="text-lg font-semibold text-foreground mt-6 mb-3">
            {headingText}
          </h4>
        );
      } else if (trimmedLine) {
        currentParagraph += (currentParagraph ? ' ' : '') + trimmedLine;
      } else if (currentParagraph) {
        // Empty line - flush paragraph
        elements.push(
          <p key={`p-${index}`} className="text-foreground/80 leading-relaxed mb-4"
             dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(currentParagraph) }} />
        );
        currentParagraph = '';
      }
    });
    
    // Flush remaining paragraph
    if (currentParagraph) {
      elements.push(
        <p key="p-last" className="text-foreground/80 leading-relaxed mb-4"
           dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(currentParagraph) }} />
      );
    }
    
    return elements.length > 0 ? elements : (
      <p className="text-foreground/80 leading-relaxed mb-4"
         dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(text) }} />
    );
  };
  
  // Helper function to format inline markdown (bold, italic)
  const formatInlineMarkdown = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
  };

  // Helper function to render article content
  const renderContent = (content: ArticleContent) => {
    const langKey = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';
    
    switch (content.type) {
      case 'paragraph':
        const paragraphText = content.text?.[langKey] || content.text?.en || '';
        if (!paragraphText) return null;
        return parseMarkdownText(paragraphText);
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
                <li key={index} className="text-foreground/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
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

        <div className="inline-flex flex-wrap items-center gap-6 text-sm bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full px-6 py-3">
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300">
            <Clock className="w-4 h-4" />
            <span data-testid="text-read-time" className="font-medium">
              {getLocalizedContent(articleData.metadata?.readTime)}
            </span>
          </div>
          <div className="w-px h-4 bg-purple-300 dark:bg-purple-600"></div>
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300">
            <User className="w-4 h-4" />
            <span data-testid="text-reviewed-by" className="font-medium">
              {getLocalizedContent(articleData.metadata?.reviewer)}
            </span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="w-full">
        <div className="space-y-6">
          {articleData.sections.map((section, index) => (
            <div key={section.id} data-testid={`section-${index}`}>
              {getLocalizedContent(section.title) && (
                <h2 className="text-2xl font-bold text-foreground font-serif mb-4" data-testid={`text-section-title-${index}`}>
                  {getLocalizedContent(section.title)}
                </h2>
              )}
              <div className="prose prose-lg max-w-none w-full">
                {section.content.map((content, contentIndex) => (
                  <div key={contentIndex}>
                    {renderContent(content)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;