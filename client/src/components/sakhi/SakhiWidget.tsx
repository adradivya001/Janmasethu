
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  type: 'user' | 'sakhi';
  message: string;
}

interface PreviewCard {
  type: 'checklist' | 'video' | 'info';
  title: string;
  content: string[] | string;
  source?: string;
  thumbnail?: string;
}

interface LocaleData {
  header_title: string;
  chat_placeholder: string;
  disclaimer: string;
  chat_messages: ChatMessage[];
  preview_cards: PreviewCard[];
}

const SakhiWidget: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'te'>('te');
  const [localeData, setLocaleData] = useState<Record<string, LocaleData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('sakhi_lang') as 'en' | 'te' | null;
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  useEffect(() => {
    // Load locale data
    const loadLocales = async () => {
      try {
        const [enData, teData] = await Promise.all([
          fetch('/sakhi/locales/en.json').then(res => res.json()),
          fetch('/sakhi/locales/te.json').then(res => res.json())
        ]);
        
        setLocaleData({
          en: enData,
          te: teData
        });
      } catch (error) {
        console.error('Failed to load locale data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLocales();
  }, []);

  const handleLanguageChange = (lang: 'en' | 'te') => {
    setCurrentLang(lang);
    localStorage.setItem('sakhi_lang', lang);
  };

  const t = (key: string) => {
    return localeData[currentLang]?.[key] || localeData['en']?.[key] || key;
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading Sakhi...</p>
        </div>
      </div>
    );
  }

  const currentData = localeData[currentLang] || localeData['en'];

  return (
    <div className="sakhi-widget w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-3xl p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className={`text-xl font-bold text-foreground ${currentLang === 'te' ? 'font-noto-sans-telugu' : ''}`}>
            {currentData?.header_title || 'Sakhi — Your Parenthood Companion'}
          </h3>
          
          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-full p-1">
            <Button
              variant={currentLang === 'en' ? 'default' : 'ghost'}
              size="sm"
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                currentLang === 'en' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </Button>
            <Button
              variant={currentLang === 'te' ? 'default' : 'ghost'}
              size="sm"
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                currentLang === 'te' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleLanguageChange('te')}
            >
              TE
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-3xl shadow-lg overflow-hidden">
        <div className="grid lg:grid-cols-5 gap-0 min-h-[600px]">
          {/* Chat Panel - Left 30% */}
          <div className="lg:col-span-2 border-r border-gray-100 flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-4">
                {currentData?.chat_messages?.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white shadow-md'
                    } ${currentLang === 'te' ? 'font-noto-sans-telugu leading-relaxed' : ''}`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder={currentData?.chat_placeholder || 'Type your message...'}
                  className={`w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    currentLang === 'te' ? 'font-noto-sans-telugu' : ''
                  }`}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Preview Panel - Right 70% */}
          <div className="lg:col-span-3 p-6">
            <div className="grid gap-6">
              {currentData?.preview_cards?.map((card, index) => (
                <Card key={index} className="rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h4 className={`text-lg font-bold text-foreground mb-4 ${
                      currentLang === 'te' ? 'font-noto-sans-telugu leading-relaxed' : ''
                    }`}>
                      {card.title}
                    </h4>
                    
                    {card.type === 'checklist' && Array.isArray(card.content) && (
                      <ul className={`space-y-2 ${currentLang === 'te' ? 'font-noto-sans-telugu leading-relaxed' : ''}`}>
                        {card.content.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {card.type === 'video' && (
                      <div className="space-y-3">
                        <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex items-center justify-center">
                          <Play className="w-16 h-16 text-purple-600" />
                        </div>
                        <p className={`text-sm text-muted-foreground ${
                          currentLang === 'te' ? 'font-noto-sans-telugu leading-relaxed' : ''
                        }`}>
                          {card.content}
                        </p>
                      </div>
                    )}
                    
                    {card.type === 'info' && Array.isArray(card.content) && (
                      <div className={`space-y-2 ${currentLang === 'te' ? 'font-noto-sans-telugu leading-relaxed' : ''}`}>
                        {card.content.map((line, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm">{line}</p>
                        ))}
                        {card.source && (
                          <p className="text-xs text-gray-400 mt-3 border-t border-gray-100 pt-2">
                            {card.source}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-orange-50 border-t border-orange-100">
          <div className="flex items-start space-x-2 max-w-4xl mx-auto">
            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className={`text-sm text-orange-800 ${
              currentLang === 'te' ? 'font-noto-sans-telugu leading-relaxed' : ''
            }`}>
              {currentData?.disclaimer || 'General guidance only. Not a diagnosis. Please consult your doctor.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SakhiWidget;
