
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Calendar, User } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- API types
type BlogCard = {
  slug: string;
  title: string;
  excerpt: string | null;
  image_url?: string | null;
  created_at?: string | null;
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=600&h=300",
];

const imgAt = (i: number) => fallbackImages[i % fallbackImages.length];

const Blog = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/blogs?limit=24");
        if (!r.ok) throw new Error(await r.text());
        setItems(await r.json());
      } catch (e: any) {
        setErr(e.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-8">Loading articles…</div>;
  if (err) return <div className="p-8 text-red-600">Error: {err}</div>;

  const featured = items[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif mb-6" data-testid="text-blog-title">
          Blogs
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("blog_subtitle")}</p>
      </div>

      {/* Featured Post */}
      {featured && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-6">{t("blog_featured_post")}</h2>
          <Link href={`/blog/${featured.slug}`}>
            <Card className="rounded-3xl p-8 card-shadow hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50" data-testid="card-featured-post">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-4" data-testid="text-featured-post-title">
                      {featured.title}
                    </h3>
                    {featured.excerpt && (
                      <p className="text-lg text-muted-foreground mb-6" data-testid="text-featured-post-summary">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Editorial Team</span>
                      </div>
                      {featured.created_at && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featured.created_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <img
                      src={featured.image_url || imgAt(0)}
                      alt={featured.title}
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
        <h2 className="text-2xl font-bold text-foreground font-serif mb-6">{t("blog_all_posts")}</h2>
      </div>

      {items.length === 0 ? (
        <div className="text-muted-foreground">No posts yet — we'll add the scraper next.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="rounded-3xl p-6 card-shadow hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-blog-post-${index}`}>
                <CardContent className="p-0">
                  <div className="rounded-xl w-full h-48 bg-gray-100 overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={post.image_url || imgAt(index)}
                      alt={post.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-serif mb-2" data-testid={`text-post-title-${index}`}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`text-post-summary-${index}`}>
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Editorial Team</span>
                    {post.created_at && <span>{new Date(post.created_at).toLocaleDateString()}</span>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow text-center">
          <h2 className="text-3xl font-bold text-foreground font-serif mb-4">{t("blog_stay_updated")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{t("blog_updates_desc")}</p>
          <Link href="/contact">
            <Button className="gradient-button text-white px-8 py-4 rounded-full font-semibold">{t("blog_get_updates")}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
