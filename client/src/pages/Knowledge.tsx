import { useState, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles, type Lens, type Stage } from '@/data/articles';
import { fetchArticles } from '@/data/knowledgeHub';

interface WebhookArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  topic: string;
  section: string;
  lens: string;
  life_stage: string;
  published_at: string;
}

interface WebhookResponse {
  query: string;
  filters: {
    lenses: string[];
    stages: string[];
  };
  pagination: {
    page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  };
  items: WebhookArticle[];
}

const Knowledge = () => {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [jsonArticles, setJsonArticles] = useState<Array<{
    slug: string;
    title: { en: string; hi: string; te: string };
    overview: { en: string; hi: string; te: string };
    readTime: { en: string; hi: string; te: string };
    reviewer: { en: string; hi: string; te: string };
  }>>([]);
  const [webhookResults, setWebhookResults] = useState<WebhookResponse | null>(null);
  const [loading, setLoading] = useState(false); // Start with false for instant skeleton display
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Load articles from ngrok API
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const lensParam = urlParams.get('lens');
        const stageParam = urlParams.get('stage');
        
        if (searchParam) {
          setSearchTerm(searchParam);
        }
        
        if (lensParam && ['medical', 'social', 'financial', 'nutrition'].includes(lensParam)) {
          setSelectedLens(lensParam as Lens);
        }
        
        if (stageParam && ['ttc', 'pregnancy', 'postpartum', 'newborn', 'early-years'].includes(stageParam)) {
          setSelectedStage(stageParam as Stage);
        }

        // Fetch articles from ngrok API using the correct endpoint
        const response = await fetchArticles({ perPage: 100 });
        
        console.log('Articles API response:', response);
        
        // Validate response structure
        if (!response || !response.items || !Array.isArray(response.items)) {
          console.error('Invalid response structure:', response);
          setJsonArticles([]);
          return;
        }
        
        // Transform backend data to match frontend structure
        const transformedArticles = response.items.map(article => ({
          slug: article.slug || '',
          title: {
            en: article.title || '',
            hi: article.title || '',
            te: article.title || ''
          },
          overview: {
            en: article.summary || '',
            hi: article.summary || '',
            te: article.summary || ''
          },
          readTime: {
            en: `${article.read_time_minutes || 5} min`,
            hi: `${article.read_time_minutes || 5} मिनट`,
            te: `${article.read_time_minutes || 5} నిమిషాలు`
          },
          reviewer: {
            en: 'Reviewed by Expert',
            hi: 'विशेषज्ञ द्वारा समीक्षित',
            te: 'నిపుణులచే సమీక్షించబడింది'
          }
        }));
        
        console.log('Transformed articles:', transformedArticles.length);
        setJsonArticles(transformedArticles);
      } catch (error) {
        console.error('Error loading articles from ngrok API:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Auto-trigger search if URL has search parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam && searchParam.trim()) {
      // Trigger search automatically when component mounts with search param
      handleSearch();
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [jsonArticles]); // Trigger when articles are loaded

  // Helper function to get localized content
  const getLocalizedContent = (content: any) => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    
    const langKey = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';
    return content[langKey] || content.en || '';
  };

  // Show webhook results if available, otherwise show JSON articles
  const displayArticles = useMemo(() => {
    console.log('displayArticles recalculating:', {
      hasWebhookResults: !!webhookResults,
      webhookItemsCount: webhookResults?.items?.length || 0,
      jsonArticlesCount: jsonArticles.length
    });

    if (webhookResults && webhookResults.items) {
      // Use webhook results - prioritize webhook data
      console.log('Using webhook results:', webhookResults.items.length);
      return webhookResults.items.map((article, index) => {
        console.log(`Webhook article ${index}:`, {
          title: article.title,
          summary: article.summary,
          slug: article.slug
        });

        // Map lens from webhook to our format
        let mappedLens: Lens[] = [];
        if (article.lens) {
          const lensLower = article.lens.toLowerCase();
          if (['medical', 'social', 'financial', 'nutrition'].includes(lensLower)) {
            mappedLens = [lensLower as Lens];
          }
        }

        // Map life_stage from webhook to our format
        let mappedStages: Stage[] = [];
        if (article.life_stage) {
          const stageLower = article.life_stage.toLowerCase();
          const stageMapping: Record<string, Stage> = {
            'ttc': 'ttc',
            'pregnancy': 'pregnancy',
            'postpartum': 'postpartum',
            'newborn': 'newborn',
            'early years': 'early-years',
            'early-years': 'early-years'
          };
          if (stageMapping[stageLower]) {
            mappedStages = [stageMapping[stageLower]];
          }
        }

        return {
          slug: article.slug,
          title: article.title, // Use webhook title directly
          summary: article.summary, // Use webhook summary directly
          lens: mappedLens,
          stage: mappedStages,
          readMins: 5,
          reviewedBy: 'Reviewed by Expert',
          isLegacy: false,
          isWebhookResult: true,
          key: `webhook-${article.slug}-${index}`
        };
      });
    } else {
      // Fallback to JSON articles only when no webhook results
      console.log('Using fallback JSON articles:', jsonArticles.length);
      
      // Map article slugs to their lens and stage data from the articles.ts file
      const articleMetaMap = new Map(articles.map(a => [a.slug, { lens: a.lens, stage: a.stage }]));
      
      return jsonArticles.map((article, index) => {
        const meta = articleMetaMap.get(article.slug) || { lens: [], stage: [] };
        return {
          slug: article.slug,
          title: getLocalizedContent(article.title),
          summary: getLocalizedContent(article.overview),
          lens: meta.lens as Lens[],
          stage: meta.stage as Stage[],
          readMins: parseInt(getLocalizedContent(article.readTime).replace(/\D/g, '')) || 5,
          reviewedBy: getLocalizedContent(article.reviewer),
          isLegacy: false,
          isWebhookResult: false,
          key: `json-${article.slug}-${index}`
        };
      });
    }
  }, [webhookResults, jsonArticles, lang, getLocalizedContent]);

  // For webhook results, use them directly since API already filtered
  const filteredArticles = useMemo(() => {
    console.log('filteredArticles recalculating:', {
      hasWebhookResults: !!webhookResults,
      webhookItemsCount: webhookResults?.items?.length || 0,
      displayArticlesCount: displayArticles.length
    });

    if (webhookResults && webhookResults.items) {
      console.log('Displaying webhook articles directly:', displayArticles.length);
      // Log each article title and summary for debugging
      displayArticles.forEach((article, i) => {
        console.log(`Article ${i}: "${article.title}" - "${article.summary}"`);
      });
      return displayArticles; // Webhook already filtered, use as-is - no local filtering
    }
    
    // Apply local filters only for JSON articles when no webhook results
    if (!searchTerm && !selectedLens && !selectedStage) {
      // No filters applied, show all local articles
      return displayArticles;
    }
    
    return displayArticles.filter(article => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLens = !selectedLens || article.lens.includes(selectedLens);
      const matchesStage = !selectedStage || article.stage.includes(selectedStage);
      
      return matchesSearch && matchesLens && matchesStage;
    });
  }, [displayArticles, webhookResults, searchTerm, selectedLens, selectedStage]);

  // Map frontend lens values to backend perspective IDs
  const lensToIdMap: Record<Lens, number> = {
    'medical': 1,
    'social': 2,  // Emotional in backend
    'nutrition': 3,
    'financial': 4
  };

  // Map frontend stage values to backend life stage IDs
  const stageToIdMap: Record<Stage, number> = {
    'ttc': 1,           // Fertility
    'pregnancy': 2,
    'postpartum': 3,
    'newborn': 4,       // Newborn Care
    'early-years': 5    // Early Parenting
  };

  const lensOptions: Array<{value: Lens; label: string; icon: string; color: string}> = [
    { value: 'medical', label: t('lens_medical'), icon: 'fas fa-stethoscope', color: 'bg-blue-100 text-blue-600' },
    { value: 'social', label: t('lens_social'), icon: 'fas fa-users', color: 'bg-pink-100 text-pink-600' },
    { value: 'financial', label: t('lens_financial'), icon: 'fas fa-rupee-sign', color: 'bg-green-100 text-green-600' },
    { value: 'nutrition', label: t('lens_nutrition'), icon: 'fas fa-apple-alt', color: 'bg-orange-100 text-orange-600' },
  ];

  const stageOptions: Array<{value: Stage; label: string}> = [
    { value: 'ttc', label: t('orient_ttc') },
    { value: 'pregnancy', label: t('orient_preg') },
    { value: 'postpartum', label: 'Postpartum' },
    { value: 'newborn', label: 'Newborn' },
    { value: 'early-years', label: 'Early Years' },
  ];

  // Handle search button click
  const handleSearch = async () => {
    setSearching(true);
    setSearchError(null);
    
    // Update URL with current search parameters
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedLens) params.set('lens', selectedLens);
    if (selectedStage) params.set('stage', selectedStage);
    
    const newUrl = params.toString() ? `/knowledge?${params.toString()}` : '/knowledge';
    window.history.replaceState({}, '', newUrl);
    
    // If no search term and no filters, just clear results to show all articles
    if (!searchTerm && !selectedLens && !selectedStage) {
      setWebhookResults(null);
      setSearching(false);
      return;
    }
    
    try {
      // Fetch from ngrok API with numeric IDs
      const response = await fetchArticles({
        search: searchTerm || undefined,
        lifeStage: selectedStage ? stageToIdMap[selectedStage] : undefined,
        perspective: selectedLens ? lensToIdMap[selectedLens] : undefined
      });

      // Transform to webhook format for compatibility
      setWebhookResults({
        query: searchTerm || '',
        filters: {
          lenses: selectedLens ? [selectedLens] : [],
          stages: selectedStage ? [selectedStage] : []
        },
        pagination: response.pagination,
        items: response.items.map(item => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          topic: item.topic,
          section: item.section,
          lens: item.lens,
          life_stage: item.life_stage,
          published_at: item.published_at
        }))
      });

      console.log(`Found ${response.items.length} articles from ngrok API`);
    } catch (error) {
      console.error('Error during search:', error);
      setSearchError('Search failed. Please try again.');
      setWebhookResults(null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-4" data-testid="text-knowledge-title">
          {t('nav_knowledge')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {lang === 'hi' ? 'जीवन चरण और दृष्टिकोण के अनुसार व्यवस्थित, आपकी पेरेंटिंग यात्रा के लिए साक्ष्य-आधारित गाइड' : 
           lang === 'te' ? 'జీవిత దశ మరియు దృక్పథం ఆధారంగా నిర్వహించబడిన, మీ పేరెంటింగ్ ప్రయాణానికి సాక్ష్యాధార గైడ్లు' :
           'Evidence-based guides for your parenting journey, organized by life stage and perspective'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}>
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 rounded-full"
                data-testid="input-search-articles"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </form>
          </div>
          <Button 
            className="rounded-full px-6"
            data-testid="button-search"
            onClick={handleSearch}
          >
            Search
          </Button>
          {(webhookResults || selectedLens || selectedStage || searchTerm) && (
            <Button 
              variant="outline"
              className="rounded-full px-6"
              onClick={() => {
                setSearchTerm('');
                setSelectedLens(null);
                setSelectedStage(null);
                setWebhookResults(null);
                // Clear URL parameters
                window.history.replaceState({}, '', '/knowledge');
              }}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Lens Filters */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">Filter by Lens</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLens === null ? "default" : "outline"}
              onClick={() => setSelectedLens(null)}
              className="rounded-full"
              data-testid="button-filter-all-lens"
            >
              All
            </Button>
            {lensOptions.map(({ value, label, icon, color }) => (
              <Button
                key={value}
                variant={selectedLens === value ? "default" : "outline"}
                onClick={() => setSelectedLens(selectedLens === value ? null : value)}
                className="rounded-full flex items-center space-x-2"
                data-testid={`button-filter-lens-${value}`}
              >
                <i className={`${icon} text-sm`}></i>
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Stage Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Filter by Life Stage</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStage === null ? "default" : "outline"}
              onClick={() => setSelectedStage(null)}
              className="rounded-full"
              data-testid="button-filter-all-stage"
            >
              All
            </Button>
            {stageOptions.map(({ value, label }) => (
              <Button
                key={value}
                variant={selectedStage === value ? "default" : "outline"}
                onClick={() => setSelectedStage(selectedStage === value ? null : value)}
                className="rounded-full"
                data-testid={`button-filter-stage-${value}`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count and error */}
        {webhookResults && (
          <div className="mb-4 text-sm text-muted-foreground">
            Found {webhookResults.pagination.total} articles
          </div>
        )}
        
        {searchError && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {searchError}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {(loading || searching) ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="rounded-3xl p-6 card-shadow animate-pulse">
              <CardContent className="p-0">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <Link key={article.key || `article-${article.slug}-${index}`} href={`/knowledge/${article.slug}`} className="group h-full">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-2xl transition-all duration-500 h-full cursor-pointer transform hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30" data-testid={`card-article-${index}`}>
                <CardContent className="p-0">
                  {/* Click indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Search className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.lens.map((lens: Lens) => (
                      <Badge key={lens} variant="secondary" className="text-xs group-hover:shadow-sm transition-shadow" data-testid={`badge-lens-${lens}-${index}`}>
                        {lensOptions.find(l => l.value === lens)?.label || lens}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground font-serif mb-2 group-hover:text-purple-600 transition-colors" data-testid={`text-article-title-${index}`}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`text-article-summary-${index}`}>
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <span data-testid={`text-read-time-${index}`}>{article.readMins} min read</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600 font-medium">
                        • Click to read
                      </span>
                    </div>
                    <span data-testid={`text-reviewed-by-${index}`}>
                      {article.isWebhookResult ? 'Reviewed by Expert' : `by ${article.reviewedBy}`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {filteredArticles.length === 0 && !loading && !searching && (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="text-no-articles">
            {webhookResults ? 'No articles found for your search.' : 'No articles found matching your criteria. Try adjusting your filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Knowledge;
