import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { Lang } from '@/i18n/dictionary';

const FloatingLanguage = () => {
  const { lang, setLang } = useLanguage();

  const languages: Array<{ code: Lang; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' },
    { code: 'te', label: 'తె' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <div className="flex flex-col space-y-3">
        {languages.map(({ code, label }) => (
          <Button
            key={code}
            variant="ghost"
            size="sm"
            onClick={() => setLang(code)}
            className={`w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center text-sm font-bold transition-all duration-200 hover:scale-105 ${
              lang === code 
                ? 'text-primary bg-primary/10 border-primary/20 shadow-primary/20' 
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
            data-testid={`button-floating-language-${code}`}
          >
            <span className="text-center leading-none">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloatingLanguage;
