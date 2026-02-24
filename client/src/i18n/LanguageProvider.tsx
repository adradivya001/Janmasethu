import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, dict } from './dictionary';
import LanguageTransition from '../components/LanguageTransition';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLangState] = useState<Lang>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLang, setTargetLang] = useState<Lang | null>(null);

  const setLang = (newLang: Lang) => {
    if (newLang === lang) return;

    // Start transition
    setTargetLang(newLang);
    setIsTransitioning(true);

    // Wait for cover phase (0.8s duration)
    setTimeout(() => {
      setLangState(newLang);
    }, 800); // Change content when screen is fully covered

    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
      setTargetLang(null);
    }, 1100); // Start exit phase
  };

  const t = (key: string): string => {
    return (dict[lang] as any)?.[key] || (dict.en as any)?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <LanguageTransition isTransitioning={isTransitioning} targetLang={targetLang} />
      {children}
    </LanguageContext.Provider>
  );
};
