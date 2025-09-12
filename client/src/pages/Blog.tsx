import { Link } from 'wouter';
import { Calendar, User, Tag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { posts } from '@/data/blog';

const Blog = () => {
  const { t, lang } = useLanguage();

  const getBlogImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      'https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    ];
    return images[index % images.length];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-blog-title">
          {t('nav_blog')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('blog_subtitle')}
        </p>

        {/* Hero Background */}
        <div className="mt-12 relative">
          <img 
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt={t('alt_reading_parenting')} 
            className="w-full h-64 object-cover rounded-3xl opacity-20"
          />
        </div>
      </div>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-6">{t('blog_featured_post')}</h2>
          <Link href={`/blog/${posts[0].slug}`}>
            <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50" data-testid="card-featured-post">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {posts[0].tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs" data-testid={`badge-featured-tag-${tag}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-4" data-testid="text-featured-post-title">
                      {typeof posts[0].title === 'string' ? posts[0].title : posts[0].title[lang]}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6" data-testid="text-featured-post-summary">
                      {typeof posts[0].summary === 'string' ? posts[0].summary : posts[0].summary[lang]}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span data-testid="text-featured-post-author">
                          {typeof posts[0].author === 'string' ? posts[0].author : posts[0].author[lang]}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{t('blog_edited_by')} {typeof posts[0].editedBy === 'string' ? posts[0].editedBy : posts[0].editedBy[lang]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <img 
                      src={getBlogImage(0)} 
                      alt={typeof posts[0].title === 'string' ? posts[0].title : posts[0].title[lang]} 
                      className="rounded-xl w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      {/* All Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground font-serif mb-6">{t('blog_all_posts')}</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-blog-post-${index}`}>
              <CardContent className="p-0">
                <img 
                  src={getBlogImage(index)} 
                  alt={typeof post.title === 'string' ? post.title : post.title[lang]} 
                  className="rounded-xl w-full h-32 object-cover mb-4"
                />
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs" data-testid={`badge-post-tag-${tag}-${index}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-post-title-${index}`}>
                  {typeof post.title === 'string' ? post.title : post.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground mb-4" data-testid={`text-post-summary-${index}`}>
                  {typeof post.summary === 'string' ? post.summary : post.summary[lang]}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span data-testid={`text-post-author-${index}`}>
                    {typeof post.author === 'string' ? post.author : post.author[lang]}
                  </span>
                  <span data-testid={`text-post-editor-${index}`}>
                    {t('blog_edited_by')} {typeof post.editedBy === 'string' ? post.editedBy : post.editedBy[lang]}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow text-center">
          <h2 className="text-3xl font-bold text-foreground font-serif mb-4">
            {t('blog_stay_updated')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('blog_updates_desc')}
          </p>
          <Link href="/contact">
            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold" data-testid="button-newsletter-signup">
              {t('blog_get_updates')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
