import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav_home', href: '/' },
    { key: 'nav_knowledge', href: '/knowledge' },
    { key: 'nav_treatments', href: '/treatments' },
    { key: 'nav_life', href: '/life-stages' },
    { key: 'nav_success', href: '/success-stories' },
    { key: 'nav_blog', href: '/blog' },
    { key: 'nav_experts', href: '/experts' },
    { key: 'nav_tools', href: '/tools' },
    { key: 'nav_sakhi', href: '/sakhi' },
    { key: 'nav_investors', href: '/investors' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center" data-testid="link-home-logo">
              <img 
                src="/JanmaSethu Logo.png" 
                alt="Janma Sethu Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
              {navItems.map(({ key, href }) => (
                <Link 
                  key={href}
                  href={href} 
                  className={`font-semibold text-sm tracking-wide transition-all duration-200 px-3 py-2 rounded-md ${
                    location === href 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  data-testid={`link-nav-${key.replace('nav_', '')}`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            {/* Search & Language & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Input
                  type="search"
                  placeholder="Search articles, treatments..."
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
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navItems={navItems}
      />
    </>
  );
};

export default Header;