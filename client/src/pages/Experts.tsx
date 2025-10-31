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
          {doctors.map((d, index) => {
            // Cycle through gradient variations for visual variety
            const gradients = [
              'from-purple-50 via-pink-50 to-blue-50',
              'from-blue-50 via-purple-50 to-pink-50',
              'from-pink-50 via-blue-50 to-purple-50'
            ];
            const cardGradient = gradients[index % gradients.length];
            
            return (
              <Link key={d.slug} href={`/experts/${d.slug}`}>
                <Card className={`rounded-3xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-purple-200/60 bg-gradient-to-br ${cardGradient}`}>
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative">
                      <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden relative">
                        <img
                          src={d.image_url || fallbackImg}
                          alt={d.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImg; }}
                        />
                      </div>
                    </div>
                    
                    {/* Content Section with Gradient */}
                    <div className="p-6 bg-gradient-to-br from-white/95 via-purple-50/60 to-pink-50/50 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-gray-900 font-serif group-hover:text-purple-700 transition-colors">
                        {d.name}
                      </h3>
                      {d.designation && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2 min-h-[2.5rem]">
                          {d.designation}
                        </p>
                      )}
                      
                      {/* View Profile Button */}
                      <div className="mt-5 flex items-center justify-between">
                        <Button 
                          variant="default" 
                          className="rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all"
                        >
                          View Profile
                          <svg 
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}