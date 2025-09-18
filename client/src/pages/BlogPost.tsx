
import { useParams, Link } from 'wouter';
import { useEffect } from 'react';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { posts } from '@/data/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  
  const post = posts.find(p => p.slug === slug);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getBlogImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400'
    ];
    return images[Math.abs(post.slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % images.length];
  };

  // Helper function to get localized content
  const getLocalizedContent = (content: string | Record<string, string>) => {
    if (typeof content === 'string') return content;
    return content[lang] || content.en || '';
  };

  const postTitle = getLocalizedContent(post.title);
  const postSummary = getLocalizedContent(post.summary);
  const postAuthor = getLocalizedContent(post.author);
  const postEditedBy = getLocalizedContent(post.editedBy);
  const postContent = post.content ? getLocalizedContent(post.content) : '';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Post Header */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" data-testid={`badge-post-tag-${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6" data-testid="text-post-title">
            {postTitle}
          </h1>

          <p className="text-lg text-muted-foreground mb-6" data-testid="text-post-summary">
            {postSummary}
          </p>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span data-testid="text-post-author">By {postAuthor}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span data-testid="text-post-editor">Edited by {postEditedBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Image */}
      <div className="mb-8">
        <img 
          src={getBlogImage()} 
          alt={postTitle} 
          className="w-full h-64 md:h-80 object-cover rounded-3xl"
        />
      </div>

      {/* Post Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl p-8 card-shadow">
            <CardContent className="p-0">
              <div 
                className="prose prose-lg max-w-none" 
                data-testid="section-post-content"
                dangerouslySetInnerHTML={{ __html: postContent }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Info */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">About the Author</h3>
              <div className="space-y-2">
                <p className="font-medium text-foreground" data-testid="text-author-name">{postAuthor}</p>
                <p className="text-sm text-muted-foreground">
                  Editorial team member focused on evidence-based content for fertility and parenting guidance.
                </p>
                <p className="text-xs text-muted-foreground" data-testid="text-post-edited-by">
                  Edited by {postEditedBy}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">Related Posts</h3>
              <div className="space-y-3">
                {posts
                  .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
                  .slice(0, 3)
                  .map((relatedPost, index) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                      <div className="p-3 rounded-xl hover:bg-muted transition-colors" data-testid={`related-post-${index}`}>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {getLocalizedContent(relatedPost.title)}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          By {getLocalizedContent(relatedPost.author)}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted" data-testid={`badge-tag-${tag}`}>
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
