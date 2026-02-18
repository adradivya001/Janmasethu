import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { fetchDoctor, type DoctorDetail } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const fallbackImg =
  "https://images.unsplash.com/photo-1580281657527-47f249e8f0d1?auto=format&fit=crop&w=800&q=60";

export default function Expert() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState<DoctorDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!slug) return;
        const row = await fetchDoctor(slug);
        setDoc(row);
      } catch (e: any) {
        setError(e.message || "Failed to load expert");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/experts">
          <Button variant="ghost" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experts
          </Button>
        </Link>
      </div>

      {loading && <div className="text-muted-foreground">Loading…</div>}
      {error && <div className="text-destructive">{error}</div>}
      {!loading && !doc && !error && <div className="text-muted-foreground">Expert not found.</div>}

      {doc && (
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-foreground">{doc.name}</h1>
              {doc.designation && (
                <p className="text-muted-foreground mt-1">{doc.designation}</p>
              )}

              <div className="prose max-w-none mt-6"
                dangerouslySetInnerHTML={{ __html: doc.about_html || "" }} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}