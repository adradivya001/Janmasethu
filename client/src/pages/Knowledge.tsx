import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles, type Lens, type Stage } from '@/data/articles';

const Knowledge = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.summary.en.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLens = !selectedLens || article.lens.includes(selectedLens);
      const matchesStage = !selectedStage || article.stage.includes(selectedStage);
      
      return matchesSearch && matchesLens && matchesStage;
    });
  }, [searchTerm, selectedLens, selectedStage]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-4" data-testid="text-knowledge-title">
          {t('nav_knowledge')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Evidence-based guides for your parenting journey, organized by life stage and perspective
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
              data-testid="input-search-articles"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
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
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <Link key={article.slug} href={`/knowledge/${article.slug}`}>
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-article-${index}`}>
              <CardContent className="p-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {article.lens.map(lens => (
                    <Badge key={lens} variant="secondary" className="text-xs" data-testid={`badge-lens-${lens}-${index}`}>
                      {lensOptions.find(l => l.value === lens)?.label || lens}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-article-title-${index}`}>
                  {article.title.en}
                </h3>
                <p className="text-sm text-muted-foreground mb-4" data-testid={`text-article-summary-${index}`}>
                  {article.summary.en}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span data-testid={`text-read-time-${index}`}>{article.readMins} min read</span>
                  <span data-testid={`text-reviewed-by-${index}`}>by {article.reviewedBy}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="text-no-articles">
            No articles found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Knowledge;
