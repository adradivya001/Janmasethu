
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { Lang } from '@/i18n/dictionary';

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  const languages: Array<{ code: Lang; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' },
    { code: 'te', label: 'తె' },
  ];

  const currentIndex = languages.findIndex(l => l.code === lang);
  const nextLanguage = languages[(currentIndex + 1) % languages.length];

  const handleLanguageSwitch = () => {
    setLang(nextLanguage.code);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLanguageSwitch}
      className="h-10 px-4 bg-white hover:bg-gray-50 border-2 rounded-full font-semibold text-sm transition-all duration-200 card-shadow"
      data-testid={`button-language-switch`}
    >
      {languages.find(l => l.code === lang)?.label}
    </Button>
  );
};

export default LanguageSwitcher;
