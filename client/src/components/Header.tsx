import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown, Trophy, BookOpen, Users, TrendingUp, Calculator } from "lucide-react";
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
    { key: "nav_knowledge", href: "/knowledge-hub", priority: 2 },
    { key: "nav_treatments", href: "/treatments", priority: 3 },
    { key: "nav_sakhi", href: "/sakhi", priority: 4 },
    { key: "nav_tools", href: "/tools", priority: 4.5, icon: Calculator, description: "Calculators & Trackers" },
    { key: "nav_success", href: "/success-stories", priority: 5, icon: Trophy, description: "Read inspiring journeys" },
    { key: "nav_blog", href: "/blog", priority: 6, icon: BookOpen, description: "Latest articles & insights" },
    { key: "nav_experts", href: "/experts", priority: 7, icon: Users, description: "Meet our specialists" },
    { key: "nav_investors", href: "/investors", priority: 8, icon: TrendingUp, description: "Partner with us" },
  ];

  // Split navigation into primary (first 4) and secondary (remaining)
  const primaryNavItems = navConfig.filter((item) => item.priority <= 4);
  const secondaryNavItems = navConfig.filter((item) => item.priority > 4) as Array<{
    key: string;
    href: string;
    priority: number;
    icon: any;
    description: string;
  }>;

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
              className="flex items-center gap-0 flex-shrink-0"
              data-testid="link-home-logo"
            >
              <img
                src="/new JS logo BR.svg"
                alt="JanmaSethu Logo"
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto scale-x-150 scale-y-110 object-contain mix-blend-multiply origin-left"
              />
            </Link>

            {/* Desktop Navigation - Primary Row */}
            <div className="hidden lg:flex items-center justify-center flex-grow">
              <nav
                className="nav-primary flex items-center justify-between w-full max-w-6xl mx-auto px-8"
                role="navigation"
                aria-label="Main navigation"
              >
                {primaryNavItems.map(({ key, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`font-semibold text-sm tracking-wide transition-all duration-200 px-3 py-2 rounded-md flex-1 text-center ${location === href
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    data-testid={`link-nav-${key.replace("nav_", "")}`}
                  >
                    {t(key)}
                  </Link>
                ))}

                {/* More Dropdown Button */}
                <div
                  className="flex-1 text-center relative"
                  onMouseEnter={handleMoreButtonMouseEnter}
                  onMouseLeave={handleMoreAreaMouseLeave}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleExpanded}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-primary/5 hover:scale-105 ${isExpanded
                      ? "bg-primary/10 text-primary"
                      : "hover:text-primary"
                      }`}
                    aria-expanded={isExpanded}
                    aria-controls="header-dropdown-menu"
                    data-testid="button-nav-toggle"
                  >
                    <span className="mr-2">
                      {t("nav_more")}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 chevron transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {/* Dropdown Menu */}
                  <div
                    id="header-dropdown-menu"
                    className={`absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out z-50 ${isExpanded
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                      }
                      setIsHovering(true);
                    }}
                    onMouseLeave={handleMoreAreaMouseLeave}
                  >
                    <div className="p-2">
                      {secondaryNavItems.map(({ key, href, icon: Icon, description }, index) => (
                        <Link
                          key={href}
                          href={href}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 ${location === href
                            ? "bg-gradient-to-r from-purple-100 to-pink-100"
                            : ""
                            }`}
                          style={{
                            animationDelay: `${index * 50}ms`,
                            animation: isExpanded ? "fadeInUp 0.3s ease-out forwards" : "",
                          }}
                          data-testid={`link-nav-dropdown-${key.replace("nav_", "")}`}
                          onClick={() => setIsExpanded(false)}
                        >
                          <div className={`p-2 rounded-lg transition-all duration-200 ${location === href
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white"
                            }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold text-sm transition-colors ${location === href ? "text-purple-600" : "text-foreground group-hover:text-purple-600"
                              }`}>
                              {t(key)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
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
