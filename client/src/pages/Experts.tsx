import { useEffect, useState } from "react";
import { Link } from "wouter";
import { fetchDoctors, type DoctorCard } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fallbackImg =
  "https://images.unsplash.com/photo-1580281657527-47f249e8f0d1?auto=format&fit=crop&w=800&q=60"; // neutral doctor-like image

export default function Experts() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<DoctorCard[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const rows = await fetchDoctors();
        setDoctors(rows);
      } catch (e: any) {
        setError(e.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Our Experts</h1>
        <p className="text-muted-foreground mt-3">
          Meet fertility specialists from Medcy IVF.
        </p>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="rounded-3xl p-4 animate-pulse">
              <div className="w-full h-44 rounded-xl bg-muted mb-4" />
              <div className="h-4 bg-muted rounded w-2/3 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-destructive">{error}</div>
      )}

      {!loading && !error && doctors.length === 0 && (
        <div className="text-center text-muted-foreground">No experts found.</div>
      )}

      {!loading && !error && doctors.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((d) => (
            <Link key={d.slug} href={`/experts/${d.slug}`}>
              <Card className="rounded-3xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <img
                    src={d.image_url || fallbackImg}
                    alt={d.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImg; }}
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-foreground">{d.name}</h3>
                    {d.designation && (
                      <p className="text-sm text-muted-foreground mt-1">{d.designation}</p>
                    )}
                    <Button variant="secondary" className="mt-4 rounded-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}