
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import { navItems, type NavItem } from '../config/navItems';

const Header = () => {
  const { language } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sort nav items by priority and split into primary (first 4) and more items
  const sortedNavItems = [...navItems].sort((a, b) => a.priority - b.priority);
  const primaryNavItems = sortedNavItems.slice(0, 4);
  const moreNavItems = sortedNavItems.slice(4);

  // More label localization
  const moreLabel = {
    en: "More",
    hi: "और",
    te: "మరిన్ని"
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    };

    if (moreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [moreDropdownOpen]);

  // Handle keyboard navigation
  const handleDropdownKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMoreDropdownOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleMoreButtonClick = () => {
    setMoreDropdownOpen(!moreDropdownOpen);
  };

  const handleMoreButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setMoreDropdownOpen(!moreDropdownOpen);
    }
  };

  // Convert new config to old format for mobile menu compatibility
  const mobileNavItems = sortedNavItems.map(item => ({
    key: `nav_${item.id}`,
    href: item.href,
    label: item.label[language]
  }));

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
              {/* Primary Navigation Items */}
              {primaryNavItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`font-semibold text-sm tracking-wide transition-all duration-200 px-3 py-2 rounded-md ${
                    location === item.href 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  data-testid={`link-nav-${item.id}`}
                >
                  {item.label[language]}
                </Link>
              ))}

              {/* More Dropdown */}
              {moreNavItems.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={buttonRef}
                    onClick={handleMoreButtonClick}
                    onKeyDown={handleMoreButtonKeyDown}
                    className="font-semibold text-sm tracking-wide transition-all duration-200 px-3 py-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 flex items-center space-x-1"
                    aria-haspopup="menu"
                    aria-expanded={moreDropdownOpen}
                    data-testid="button-nav-more"
                  >
                    <span>{moreLabel[language]}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {moreDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-border py-2 min-w-48 z-50"
                      role="menu"
                      onKeyDown={handleDropdownKeyDown}
                      data-testid="dropdown-nav-more"
                    >
                      {moreNavItems.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                            location === item.href
                              ? 'text-primary bg-primary/10'
                              : 'text-foreground hover:text-primary hover:bg-primary/5'
                          }`}
                          role="menuitem"
                          onClick={() => setMoreDropdownOpen(false)}
                          data-testid={`link-nav-more-${item.id}`}
                          tabIndex={index === 0 ? 0 : -1}
                        >
                          {item.label[language]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
        navItems={mobileNavItems}
      />
    </>
  );
};

export default Header;
