import { useParams, Link } from 'wouter';
import { ArrowLeft, Clock, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';

const Article = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/knowledge">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Knowledge Hub
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/knowledge">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-knowledge">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Hub
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.lens.map(lens => (
              <Badge key={lens} variant="secondary" data-testid={`badge-article-lens-${lens}`}>
                {lens}
              </Badge>
            ))}
            {article.stage.map(stage => (
              <Badge key={stage} variant="outline" data-testid={`badge-article-stage-${stage}`}>
                {stage}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-article-title">
            {article.title.en}
          </h1>

          <p className="text-lg text-muted-foreground mb-6" data-testid="text-article-summary">
            {article.summary.en}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span data-testid="text-read-time">{article.readMins} min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span data-testid="text-reviewed-by">Reviewed by {article.reviewedBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Article Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl p-8 card-shadow">
            <CardContent className="p-0">
              <div className="prose prose-lg max-w-none">
                {article.body.map((section, index) => (
                  <div key={index} className="mb-8" data-testid={`section-content-${index}`}>
                    <h2 className="text-2xl font-bold text-foreground font-serif mb-4">
                      {section}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      This section would contain detailed information about {section.toLowerCase()}. 
                      In a real implementation, this would be populated with comprehensive, 
                      medically-reviewed content specific to this topic.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sources */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">Sources</h3>
              <div className="space-y-2">
                {article.sources.map((source, index) => (
                  <div key={index} className="flex items-center space-x-2" data-testid={`source-${index}`}>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{source}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">Related Articles</h3>
              <div className="space-y-3">
                {articles
                  .filter(a => a.slug !== article.slug && a.lens.some(l => article.lens.includes(l)))
                  .slice(0, 3)
                  .map((relatedArticle, index) => (
                    <Link key={relatedArticle.slug} href={`/knowledge/${relatedArticle.slug}`}>
                      <div className="p-3 rounded-xl hover:bg-muted transition-colors" data-testid={`related-article-${index}`}>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {relatedArticle.title.en}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {relatedArticle.readMins} min read
                        </p>
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
