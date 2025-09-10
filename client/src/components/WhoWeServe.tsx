
import React, { useState, useEffect } from 'react';
import { Heart, Stethoscope, X, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

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

type Language = 'en' | 'hi' | 'te';
type CardType = 'patients' | 'clinics';

const WhoWeServe = () => {
  const [data, setData] = useState<WhoWeServeData | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('te');
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data and sync with global language preference
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/locales/whoWeServe.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Failed to load Who We Serve data:', error);
      }
    };

    // Sync with global language preference
    const savedLang = localStorage.getItem('js_lang') as Language;
    if (savedLang && ['en', 'hi', 'te'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }

    loadData();
  }, []);

  // Listen for global language changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLang = localStorage.getItem('js_lang') as Language;
      if (savedLang && ['en', 'hi', 'te'].includes(savedLang)) {
        setCurrentLang(savedLang);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle card click
  const handleCardClick = (cardType: CardType) => {
    setSelectedCard(cardType);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const getCardContent = (cardType: CardType) => {
    return data[cardType][currentLang];
  };

  const selectedContent = selectedCard ? getCardContent(selectedCard) : null;

  return (
    <>
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground font-serif mb-4">
            {currentLang === 'en' && 'Who We Serve'}
            {currentLang === 'hi' && 'हम किसकी सेवा करते हैं'}
            {currentLang === 'te' && 'మేము ఎవరికి సేవ చేస్తాము'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Patients Card */}
          <Card 
            className="rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 group backdrop-blur-sm bg-white/80 cursor-pointer transform hover:scale-104"
            onClick={() => handleCardClick('patients')}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick('patients')}
            tabIndex={0}
            role="button"
            aria-label={`Open ${getCardContent('patients').title} details`}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
              {getCardContent('patients').title}
            </h3>
            <p className="text-muted-foreground">
              {getCardContent('patients').about}
            </p>
          </Card>

          {/* Clinics Card */}
          <Card 
            className="rounded-3xl p-8 card-shadow hover:shadow-2xl transition-all duration-500 group backdrop-blur-sm bg-white/80 cursor-pointer transform hover:scale-104"
            onClick={() => handleCardClick('clinics')}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick('clinics')}
            tabIndex={0}
            role="button"
            aria-label={`Open ${getCardContent('clinics').title} details`}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Stethoscope className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
              {getCardContent('clinics').title}
            </h3>
            <p className="text-muted-foreground">
              {getCardContent('clinics').about}
            </p>
          </Card>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedContent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                {selectedCard === 'patients' ? (
                  <Heart className="text-purple-600 text-xl" />
                ) : (
                  <Stethoscope className="text-blue-600 text-xl" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-2">
                {selectedContent.title}
              </h3>
              <p className="text-muted-foreground">
                {selectedContent.about}
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3">
              {selectedContent.bullets.map((bullet, index) => (
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

            {/* Action Button */}
            <div className="mt-8">
              <Button 
                className="w-full gradient-button text-white rounded-full font-semibold"
                onClick={closeModal}
              >
                {currentLang === 'en' && 'Got it'}
                {currentLang === 'hi' && 'समझ गया'}
                {currentLang === 'te' && 'అర్థమైంది'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default WhoWeServe;
