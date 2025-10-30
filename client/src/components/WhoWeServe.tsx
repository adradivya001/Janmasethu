import React, { useState, useEffect } from "react";
import { Baby, Stethoscope, Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../i18n/LanguageProvider";

interface ContentData {
  title: string;
  about: string;
  bullets: string[];
}

interface WhoWeServeData {
  patients: {
    en: ContentData;
    hi: ContentData;
    te: ContentData;
  };
  clinics: {
    en: ContentData;
    hi: ContentData;
    te: ContentData;
  };
}

type Language = "en" | "hi" | "te";
type CardType = "patients" | "clinics";

const WhoWeServe = () => {
  const { lang } = useLanguage();
  const [data, setData] = useState<WhoWeServeData | null>(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/locales/whoWeServe.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to load Who We Serve data:", error);
      }
    };

    loadData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const getCardContent = (cardType: CardType) => {
    return data[cardType][lang as Language];
  };

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground font-serif mb-4">
          {lang === "en" && "Who We Serve"}
          {lang === "hi" && "हम किसकी सेवा करते हैं"}
          {lang === "te" && "ఎవరికోసం మేము సేవలందిస్తున్నాం"}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Patients Card */}
        <div className="flip-card h-[400px]" style={{ perspective: '1000px' }}>
          <div className="flip-card-inner relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
            {/* Front */}
            <Card className="flip-card-front absolute w-full h-full rounded-3xl p-8 card-shadow backdrop-blur-sm bg-gradient-to-br from-white to-purple-50/30 border-2 border-transparent" style={{ backfaceVisibility: 'hidden' }}>
              <CardContent className="p-0 h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Baby className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
                  {getCardContent("patients").title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {getCardContent("patients").about}
                </p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card className="flip-card-back absolute w-full h-full rounded-3xl p-8 card-shadow backdrop-blur-sm bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <CardContent className="p-0 h-full overflow-y-auto">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Baby className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-serif">
                    {getCardContent("patients").title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {getCardContent("patients").bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Clinics Card */}
        <div className="flip-card h-[400px]" style={{ perspective: '1000px' }}>
          <div className="flip-card-inner relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
            {/* Front */}
            <Card className="flip-card-front absolute w-full h-full rounded-3xl p-8 card-shadow backdrop-blur-sm bg-gradient-to-br from-white to-blue-50/30 border-2 border-transparent" style={{ backfaceVisibility: 'hidden' }}>
              <CardContent className="p-0 h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Stethoscope className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
                  {getCardContent("clinics").title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {getCardContent("clinics").about}
                </p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card className="flip-card-back absolute w-full h-full rounded-3xl p-8 card-shadow backdrop-blur-sm bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <CardContent className="p-0 h-full overflow-y-auto">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-serif">
                    {getCardContent("clinics").title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {getCardContent("clinics").bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;