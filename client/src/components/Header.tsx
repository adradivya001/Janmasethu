import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Navigation configuration with priority for two-row layout
  const navConfig = [
    { key: 'nav_home', href: '/', priority: 1 },
    { key: 'nav_knowledge', href: '/knowledge', priority: 2 },
    { key: 'nav_treatments', href: '/treatments', priority: 3 },
    { key: 'nav_sakhi', href: '/sakhi', priority: 4 },
    { key: 'nav_life', href: '/life-stages', priority: 5 },
    { key: 'nav_success', href: '/success-stories', priority: 6 },
    { key: 'nav_blog', href: '/blog', priority: 7 },
    { key: 'nav_experts', href: '/experts', priority: 8 },
    { key: 'nav_investors', href: '/investors', priority: 10 },
  ];

  // Split navigation into primary (first 4) and secondary (remaining)
  const primaryNavItems = navConfig.filter(item => item.priority <= 4);
  const secondaryNavItems = navConfig.filter(item => item.priority > 4);

  // Mobile menu gets all items
  const allNavItems = navConfig.map(({ key, href }) => ({ key, href, label: t(key) }));

  // Handle ESC key to collapse when focus is in secondary nav
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);

  return (
    <>
      <header className={`site-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-border transition-all duration-300 ${isExpanded ? 'is-expanded' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          {/* Primary Row */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center" data-testid="link-home-logo">
              <img 
                src="/JanmaSethu Logo.png" 
                alt="JanmaSethu Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </Link>

            {/* Desktop Navigation - Primary Row */}
            <div className="hidden lg:flex items-center justify-center">
              <nav className="nav-primary flex items-center justify-center space-x-12" role="navigation" aria-label="Main navigation">
                {primaryNavItems.map(({ key, href }) => (
                  <Link 
                    key={href}
                    href={href} 
                    className={`font-semibold text-base tracking-wide transition-all duration-200 px-4 py-3 rounded-md ${
                      location === href 
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    data-testid={`link-nav-${key.replace('nav_', '')}`}
                  >
                    {t(key)}
                  </Link>
                ))}

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-4 py-3 rounded-md text-base font-semibold transition-all duration-200 hover:bg-primary/5"
                  aria-expanded={isExpanded}
                  aria-controls="header-secondary-row"
                  data-testid="button-nav-toggle"
                >
                  <span className="mr-2">{isExpanded ? t('nav_less') : t('nav_more')}</span>
                  <ChevronDown className={`w-4 h-4 chevron transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </nav>
            </div>

            {/* Search & Language & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Input
                  type="search"
                  placeholder={t('search_placeholder')}
                  className="pl-10 pr-4 py-2 rounded-full border-border bg-background/50 focus:ring-ring w-64"
                  data-testid="input-search"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>

              {/* Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Toggle menu"
                data-testid="button-mobile-menu"
              >
                <Menu className="text-xl" />
              </Button>
            </div>
          </div>

          {/* Secondary Row - Expandable */}
          <div 
            id="header-secondary-row"
            className={`nav-secondary hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded 
                ? 'max-h-24 opacity-100 pointer-events-auto' 
                : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <nav className="flex items-center justify-between w-full max-w-6xl mx-auto pt-6 pb-4 px-8" role="navigation" aria-label="Secondary navigation">
              {secondaryNavItems.map(({ key, href }) => (
                <Link 
                  key={href}
                  href={href} 
                  className={`font-semibold text-base tracking-wide transition-all duration-200 px-4 py-3 rounded-md flex-1 text-center ${
                    location === href 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  data-testid={`link-nav-secondary-${key.replace('nav_', '')}`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navItems={allNavItems}
      />
    </>
  );
};

export default Header;