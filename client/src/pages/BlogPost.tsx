
import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Blog = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content_html: string;
  image_url?: string | null;
  source_url?: string | null;
  created_at?: string | null;
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&h=400",
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&h=400",
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&h=400",
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => window.scrollTo(0, 0), [slug]);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const r = await fetch(`/api/blogs/${slug}`);
        if (r.status === 404) {
          setErr("Not found");
          setPost(null);
          return;
        }
        if (!r.ok) throw new Error(await r.text());
        setPost(await r.json());
        setErr(null);
      } catch (e: any) {
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (err)
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto rounded-3xl p-8 card-shadow">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground font-serif mb-4">
              {err === "Not found" ? "Blog Post Not Found" : "Error"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {err === "Not found"
                ? "The blog post you're looking for doesn't exist."
                : err}
            </p>
            <Link href="/blog">
              <Button className="gradient-button text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );

  if (!post) return null;

  const hero = post.image_url || fallbackImages[post.slug.length % fallbackImages.length];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="rounded-full" data-testid="button-back-blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      {/* Post Header */}
      <Card className="rounded-3xl p-8 md:p-12 card-shadow mb-8">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">Article</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          )}

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Editorial Team</span>
            </div>
            {post.created_at && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Post Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl p-8 card-shadow">
            <CardContent className="p-0">
              {hero && <img src={hero} alt={post.title} className="rounded-xl mb-6 w-full" />}
              <div
                className="prose prose-lg max-w-none"
                data-testid="section-post-content"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">About the Author</h3>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Editorial Team</p>
                <p className="text-sm text-muted-foreground">
                  Evidence-based content for fertility and parenting guidance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-6 card-shadow">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground font-serif mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  <Tag className="w-3 h-3 mr-1" />
                  Blog
                </Badge>
              </div>
            </CardContent>
          </Card>

          {post.source_url && (
            <Card className="rounded-3xl p-6 card-shadow">
              <CardContent className="p-0">
                <h3 className="text-lg font-bold text-foreground font-serif mb-4">Source</h3>
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {post.source_url}
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
