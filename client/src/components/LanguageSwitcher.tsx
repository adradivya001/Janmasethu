import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { Lang } from '@/i18n/dictionary';

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useLanguage();

  const languages: Array<{ code: Lang; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 card-shadow">
      <span className="text-sm text-muted-foreground">{t('lang_label')}:</span>
      {languages.map(({ code, label }) => (
        <Button
          key={code}
          variant={lang === code ? "default" : "ghost"}
          size="sm"
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            lang === code 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:bg-muted'
          }`}
          data-testid={`button-language-${code}`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
