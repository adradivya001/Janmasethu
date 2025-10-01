import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, dict } from './dictionary';

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
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('js_lang');
    return (stored === 'hi' || stored === 'te' || stored === 'en') ? stored : 'en';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('js_lang', newLang);
  };

  const t = (key: string): string => {
    return (dict[lang] as any)?.[key] || (dict.en as any)?.[key] || key;
  };

  useEffect(() => {
    localStorage.setItem('js_lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
