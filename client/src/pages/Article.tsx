import { useParams, Link } from 'wouter';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, User, Share2, Bookmark, CheckCircle, Calendar, Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchArticleData, fetchRecommendations, type ArticleData, type ArticleContent, type ArticleMetadata } from '@/data/knowledgeHub';
import { format } from 'date-fns';

const Article = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  // Get language from URL query parameter, fallback to 'en'
  const urlParams = new URLSearchParams(window.location.search);
  const lang = (urlParams.get('lang') as 'en' | 'te') || 'en';

  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [recommendations, setRecommendations] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'te' : 'en';
    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    window.location.search = params.toString();
  };

  // Load article data from JSON
  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchArticleData(slug, lang);
        if (data) {
          setArticleData(data);

          // Fetch recommendations based on current article data
          const recs = await fetchRecommendations({
            stage: data.lifeStage,
            lens: data.lens,
            lang: lang,
            limit: 3
          });
          setRecommendations(recs);
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
  }, [slug, lang]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Helper function to get content in the current language
  const getLocalizedContent = (content: any, fallback: string = '') => {
    if (!content) return fallback;
    if (typeof content === 'string') return content;

    const langKey = lang === 'te' ? 'te' : 'en';
    return content[langKey] || content.en || fallback;
  };

  // Enhanced markdown formatter handling blocks
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    // Split by double newlines to separate paragraphs/blocks
    const blocks = text.split(/\n\n+/);

    return blocks.map((block, index) => {
      const cleanBlock = block.trim();
      if (!cleanBlock) return null;

      // 1. Standard Markdown Headings
      if (cleanBlock.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 font-serif mt-8 mb-4">
            {formatInlineText(cleanBlock.replace('### ', ''))}
          </h3>
        );
      }
      if (cleanBlock.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 font-serif mt-10 mb-6">
            {formatInlineText(cleanBlock.replace('## ', ''))}
          </h2>
        );
      }

      // 2. Numbered Lists acting as Headings (e.g., "3. Abandon 'Dietary Rigidity'")
      // Pattern: Starts with number + dot, no newlines inside, length acceptable for header
      if (/^\d+\.\s+/.test(cleanBlock) && cleanBlock.length < 100 && !cleanBlock.includes('\n')) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 font-serif mt-8 mb-4">
            {formatInlineText(cleanBlock)}
          </h3>
        );
      }

      // 3. Fallback: Paragraph with inline formatting
      return (
        <p key={index} className="mb-6 text-lg leading-relaxed text-gray-700/90 text-pretty"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanBlock) }} />
      );
    });
  };

  const formatInlineText = (text: string): React.ReactNode => {
    return <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(text) }} />;
  };

  // Helper function to format inline markdown (bold, italic) + Keyword Highlighting
  const formatInlineMarkdown = (text: string): string => {
    if (!text) return '';

    let formatted = text
      // Standard Markdown
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic text-gray-800">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-purple-700 font-mono">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-800 hover:underline font-medium transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

    // Auto-bolding common structural phrases (Case sensitiveish)
    const keywords = [
      "The Barrier:", "The Fix:", "The Rule:", "The Benefit:",
      "What to include:", "Step [0-9]:", "Section [0-9]:",
      "The Facilitator:", "Note:", "Hydration is Mandatory:",
      "Folic Acid \\(Folate\\):", "No Self-Medication:"
    ];

    // dynamically replace known structural prefixes with bold versions
    keywords.forEach(keyword => {
      // safe regex construction
      const regex = new RegExp(`(${keyword})`, 'g');
      formatted = formatted.replace(regex, '<strong class="font-bold text-gray-900">$1</strong>');
    });

    return formatted;
  };



  // Helper function to parse table content from text
  // Assuming backend might send markdown tables or a specific structure, 
  // but here handling standard markdown table syntax or structured object if updated
  const renderTable = (content: any) => {
    // If content is already structured as rows/cols (ideal backend format)
    if (content.headers && content.rows) {
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-bold uppercase tracking-wider text-xs">
              <tr>
                {content.headers.map((header: string, i: number) => (
                  <th key={i} className="px-6 py-4 border-b border-gray-100">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {content.rows.map((row: string[], i: number) => (
                <tr key={i} className="bg-white hover:bg-gray-50/50 transition-colors">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className="px-6 py-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };


  // Helper function to render article content
  const renderContent = (content: ArticleContent) => {
    const langKey = lang === 'te' ? 'te' : 'en';

    // Check if it's a table content type (custom extension)
    if (content.type === 'table' || (content as any).table) {
      return renderTable((content as any).table || content);
    }

    switch (content.type) {
      case 'paragraph':
        const paragraphText = content.text?.[langKey] || content.text?.en || '';
        if (!paragraphText) return null;

        return (
          <div className="mb-2">
            {renderMarkdown(paragraphText)}
          </div>
        );
      case 'subheading':
        const subheadingText = content.text?.[langKey] || content.text?.en || '';
        if (!subheadingText) return null;
        return (
          <h3 className="text-2xl font-bold text-gray-900 font-serif mt-10 mb-4 tracking-tight flex items-baseline gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 transform -translate-y-1"></span>
            {subheadingText}
          </h3>
        );
      case 'list':
        if (!content.items || content.items.length === 0) return null;
        return (
          <ul className="space-y-3 mb-8 ml-2">
            {content.items.map((item, index) => {
              const itemText = typeof item === 'object' ? (item[langKey] || item.en || '') : item;
              return (
                <li key={index} className="flex items-start gap-3 text-lg text-gray-700/90 leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
                </li>
              );
            })}
          </ul>
        );
      default:
        return null;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded-full w-32 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-96 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !articleData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50 px-4">
        <div className="text-center max-w-md">
          <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4 border border-gray-100">
            <div className="bg-purple-50 p-3 rounded-full">
              <ArrowLeft className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif mb-2">
            {lang === 'te' ? 'వ్యాసం కనుగొనబడలేదు' : 'Article Not Found'}
          </h1>
          <p className="text-gray-500 mb-8">
            {error || (lang === 'te' ? 'మీరు వెతుకుతున్న వ్యాసం ఉనికిలో లేదు।' : 'The article you\'re looking for doesn\'t exist or has been moved.')}
          </p>
          <Link href="/knowledge-hub">
            <Button className="rounded-full px-8 bg-gray-900 text-white hover:bg-gray-800">
              {lang === 'te' ? 'నాలెడ్జ్ హబ్‌కు తిరిగి వెళ్లండి' : 'Back to Knowledge Hub'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-16 lg:top-24 z-30 bg-white border-b border-gray-100 mb-8 md:mb-12 shadow-sm transition-all">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/knowledge-hub">
            <Button variant="ghost" className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-2 gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Back to Knowledge Hub</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1 rounded-full border border-gray-200 shadow-sm inline-flex h-9 items-center">
              <button
                onClick={() => {
                  if (lang !== 'en') toggleLanguage();
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${lang === 'en'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-purple-600'
                  }`}
              >
                Eng
              </button>
              <button
                onClick={() => {
                  if (lang !== 'te') toggleLanguage();
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${lang === 'te'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-purple-600'
                  }`}
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-4xl">
        {/* Article Container */}
        <article className="bg-white rounded-[2.5rem] shadow-sm ring-1 ring-black/5 overflow-hidden">

          {/* Header Section */}
          <div className="px-6 md:px-12 pt-10 md:pt-16 pb-10 bg-gradient-to-br from-white via-purple-50/30 to-white relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10">
              {/* Badges / Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Guide
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 font-serif leading-[1.2] mb-6 tracking-tight">
                {getLocalizedContent(articleData.title)}
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light mb-8 max-w-2xl">
                {getLocalizedContent(articleData.overview)}
              </p>

              {/* Author/Meta Strip */}
              <div className="flex items-center gap-4 py-6 border-y border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                    <User className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="font-semibold text-gray-900 text-sm">
                    {getLocalizedContent(articleData.metadata?.reviewer) || 'Medical Review Team'}
                  </div>
                  <div className="text-gray-500 text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Medically Reviewed &bull; {getLocalizedContent(articleData.metadata?.readTime)} read
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 md:px-12 py-10">
            <div className="prose prose-lg prose-purple max-w-none 
                            prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 
                            prose-p:text-gray-700 prose-p:leading-8 
                            prose-strong:text-gray-900 prose-strong:font-semibold
                            prose-ul:list-none prose-ul:pl-0">

              {articleData.sections.map((section, index) => (
                <div key={section.id} className="mb-12 last:mb-0 group">
                  {getLocalizedContent(section.title) && (
                    <h2 className="text-3xl font-bold text-gray-900 font-serif mb-6 mt-8 pb-4 border-b border-gray-100">
                      {getLocalizedContent(section.title)}
                    </h2>
                  )}
                  <div className="">
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
        </article>


        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-16 md:mt-24 border-t border-gray-100 pt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-8 text-center">
              {lang === 'te' ? 'మీ కోసం సిఫార్సు చేయబడింది' : 'Recommended for You'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <Link key={rec.id} href={`/knowledge-hub/${rec.slug}?lang=${lang}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-gray-100 bg-white/50 hover:bg-white group">
                    <CardContent className="p-6">
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                          {rec.topic}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center">{rec.read_time_minutes} min read</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 font-serif mb-2 group-hover:text-purple-700 transition-colors">
                        {rec.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {rec.summary}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer / Disclaimer */}
        <div className="mt-12 text-center max-w-2xl mx-auto px-6">
          <p className="text-xs text-gray-400 leading-relaxed">
            Disclaimer: The content provided here is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Article;