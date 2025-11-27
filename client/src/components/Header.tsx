import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation configuration with priority for two-row layout
  const navConfig = [
    { key: "nav_home", href: "/", priority: 1 },
    { key: "nav_knowledge", href: "/knowledge", priority: 2 },
    { key: "nav_treatments", href: "/treatments", priority: 3 },
    { key: "nav_sakhi", href: "/sakhi", priority: 4 },
    { key: "nav_success", href: "/success-stories", priority: 5 },
    { key: "nav_blog", href: "/blog", priority: 6 },
    { key: "nav_experts", href: "/experts", priority: 7 },
    { key: "nav_investors", href: "/investors", priority: 8 },
  ];

  // Split navigation into primary (first 4) and secondary (remaining)
  const primaryNavItems = navConfig.filter((item) => item.priority <= 4);
  const secondaryNavItems = navConfig.filter((item) => item.priority > 4);

  // Mobile menu gets all items
  const allNavItems = navConfig.map(({ key, href }) => ({
    key,
    href,
    label: t(key),
  }));

  // Handle ESC key to collapse when focus is in secondary nav
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (isExpanded || isHovering)) {
        setIsExpanded(false);
        setIsHovering(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isExpanded, isHovering]);

  // Handle mouse enter only for the More button
  const handleMoreButtonMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(true);
    setIsExpanded(true);
  };

  // Handle mouse leave from the More button and secondary nav area
  const handleMoreAreaMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 300); // Increased delay to allow moving to secondary nav
  };

  // Toggle function for click interaction
  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setIsHovering(!isExpanded); // Sync hover state with click state
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header
        className={`site-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-border transition-all duration-300 ${isExpanded ? "is-expanded" : ""}`}
      >
        <div className="container mx-auto px-3 md:px-4 py-2">
          {/* Primary Row */}
          <div className="flex items-center justify-between">
            {/* Logo with Brand Text */}
            <Link
              href="/"
              className="flex flex-col items-start gap-0 flex-shrink-0"
              data-testid="link-home-logo"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src="/JanmaSethu Logo.png"
                  alt="JanmaSethu Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                />
                <div className="flex items-baseline gap-1">
                  <span className="text-black font-bold text-base sm:text-lg md:text-xl lg:text-1xl font-serif mt-2 sm:mt-3">
                    Janma
                  </span>
                  <span className="font-bold text-base sm:text-lg md:text-xl lg:text-1xl font-serif mt-2 sm:mt-3" style={{ color: '#60c4b8' }}>
                    Sethu
                  </span>
                </div>
              </div>
              <p className="text-[0.6rem] sm:text-[0.65rem] md:text-xs text-muted-foreground font-small text-left w-full pl-0 sm:pl-2 -mt-2 sm:-mt-3">
                Connecting Care & Parenthood
              </p>
            </Link>

            {/* Desktop Navigation - Primary Row */}
            <div className="hidden lg:flex items-center justify-center flex-grow">
              <nav
                className="nav-primary flex items-center justify-center space-x-6 xl:space-x-12"
                role="navigation"
                aria-label="Main navigation"
              >
                {primaryNavItems.map(({ key, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`font-semibold text-sm tracking-wide transition-all duration-200 px-3 py-2 rounded-md ${
                      location === href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid={`link-nav-${key.replace("nav_", "")}`}
                  >
                    {t(key)}
                  </Link>
                ))}

                {/* Expand/Collapse Button */}
                <div
                  onMouseEnter={handleMoreButtonMouseEnter}
                  onMouseLeave={handleMoreAreaMouseLeave}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleExpanded}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-primary/5 hover:scale-105 ${
                      isExpanded
                        ? "bg-primary/10 text-primary"
                        : "hover:text-primary"
                    }`}
                    aria-expanded={isExpanded}
                    aria-controls="header-secondary-row"
                    data-testid="button-nav-toggle"
                  >
                    <span className="mr-2">
                      {isExpanded ? t("nav_less") : t("nav_more")}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 chevron transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>
              </nav>
            </div>

            {/* Language & Mobile Menu */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              {/* Language Switcher - Only shown on Try Sakhi page */}
              {location === "/sakhi/try" && (
                <div>
                  <LanguageSwitcher />
                </div>
              )}

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
            className={`nav-secondary hidden lg:block overflow-hidden transition-all duration-400 ease-in-out ${
              isExpanded
                ? "max-h-24 opacity-100 pointer-events-auto transform translate-y-0"
                : "max-h-0 opacity-0 pointer-events-none transform -translate-y-2"
            }`}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
              setIsHovering(true);
            }}
            onMouseLeave={handleMoreAreaMouseLeave}
          >
            <nav
              className="flex items-center justify-between w-full max-w-6xl mx-auto pt-2 pb-3 px-8"
              role="navigation"
              aria-label="Secondary navigation"
            >
              {secondaryNavItems.map(({ key, href }, index) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-semibold text-sm tracking-wide transition-all duration-300 px-3 py-2 flex-1 text-center transform hover:scale-105 hover:-translate-y-1 ${
                    location === href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isExpanded
                      ? "slideInUp 0.3s ease-out forwards"
                      : "",
                  }}
                  data-testid={`link-nav-secondary-${key.replace("nav_", "")}`}
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
