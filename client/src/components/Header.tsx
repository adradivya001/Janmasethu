
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "./ui/button";
import { navItems, moreLabels, type NavItem } from "../config/navItems";

const Header = () => {
  const { language } = useLanguage();
  const [location] = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Split navigation items by priority
  const sortedItems = [...navItems].sort((a, b) => a.priority - b.priority);
  const primaryItems = sortedItems.slice(0, 4);
  const moreItems = sortedItems.slice(4);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node) &&
        !moreButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMoreOpen) return;

      if (event.key === "Escape") {
        setIsMoreOpen(false);
        moreButtonRef.current?.focus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const menuItems = moreMenuRef.current?.querySelectorAll('a[role="menuitem"]');
        if (!menuItems?.length) return;

        const currentIndex = Array.from(menuItems).findIndex(
          (item) => item === document.activeElement
        );

        let nextIndex;
        if (event.key === "ArrowDown") {
          nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % menuItems.length;
        } else {
          nextIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
        }

        (menuItems[nextIndex] as HTMLElement).focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMoreOpen]);

  const handleMoreClick = () => {
    setIsMoreOpen(!isMoreOpen);
    if (!isMoreOpen) {
      // Focus first menu item when opening
      setTimeout(() => {
        const firstMenuItem = moreMenuRef.current?.querySelector('a[role="menuitem"]') as HTMLElement;
        firstMenuItem?.focus();
      }, 0);
    }
  };

  const handleMoreKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMoreClick();
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/JanmaSethu Logo.png"
              alt="JanmaSethu Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              JanmaSethu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Primary Navigation Items */}
            {primaryItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label[language]}
              </Link>
            ))}

            {/* More Dropdown */}
            {moreItems.length > 0 && (
              <div className="relative">
                <Button
                  ref={moreButtonRef}
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-primary p-0 h-auto font-normal"
                  onClick={handleMoreClick}
                  onKeyDown={handleMoreKeyDown}
                  aria-haspopup="menu"
                  aria-expanded={isMoreOpen}
                >
                  {moreLabels[language]}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>

                {isMoreOpen && (
                  <div
                    ref={moreMenuRef}
                    role="menu"
                    className="absolute top-full mt-2 right-0 min-w-48 bg-white rounded-xl shadow-lg border border-border py-2 z-50"
                  >
                    {moreItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        role="menuitem"
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                          isActive(item.href)
                            ? "text-primary bg-gray-50"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search */}
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search</span>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="py-4 space-y-2">
              {/* All items in mobile menu */}
              {sortedItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 ${
                    isActive(item.href)
                      ? "text-primary bg-gray-50"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label[language]}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="flex items-center space-x-2 px-4 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search</span>
              </div>

              {/* Mobile Language Switcher */}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
