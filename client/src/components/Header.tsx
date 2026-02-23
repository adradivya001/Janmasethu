import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, X, User } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import MenuSwitch from "./MenuSwitch";
import NavButton from "./NavButton";
import AuthModal from "./AuthModal";
import AnimatedButton from "./AnimatedButton";

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation configuration
  const navConfig = [
    { key: "nav_home", href: "/" },
    { key: "nav_knowledge", href: "/knowledge-hub" },
    { key: "nav_sakhi", href: "/sakhi" },
    { key: "nav_tools", href: "/tools" },
    { key: "nav_treatments", href: "/treatments" },
    { key: "nav_success", href: "/success-stories" },
    { key: "nav_blog", href: "/blog" },
    { key: "nav_experts", href: "/experts" },
    { key: "nav_investors", href: "/investors" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAuth = (tab: "login" | "register") => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (isNewUser: boolean, relationship?: string, userId?: string) => {
    setAuthModalOpen(false);
  };

  return (
    <>
      {/* Top Bar - Sticky */}
      <header
        className={`site-header sticky top-0 z-[60] w-full bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto px-3 md:px-4 h-14 md:h-16">
          <div className="flex items-center justify-between h-full relative">

            {/* Left: Burger Menu + Language Toggle */}
            <div className="flex items-center gap-1 md:gap-4 relative z-[60]">
              <MenuSwitch
                isOpen={mobileMenuOpen}
                toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
              />

              {/* Language Toggle - Compact capsule on mobile, full on desktop */}
              <div className="bg-gray-50 p-px md:p-1 rounded-full border border-gray-200 shadow-sm inline-flex h-5 sm:h-6 md:h-9 items-center">
                <button
                  onClick={() => setLang('en')}
                  className={`px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1.5 rounded-full text-[8px] sm:text-[9px] md:text-xs font-semibold transition-all duration-200 leading-none h-full flex items-center ${lang === 'en'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-purple-600'
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('te')}
                  className={`px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1.5 rounded-full text-[8px] sm:text-[9px] md:text-xs font-semibold transition-all duration-200 leading-none h-full flex items-center ${lang === 'te'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-purple-600'
                    }`}
                >
                  <span className="md:hidden">TE</span>
                  <span className="hidden md:inline">తెలుగు</span>
                </button>
              </div>
            </div>

            {/* Center: Logo - properly sized for mobile */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-14 md:h-16 w-28 md:w-40 z-[55] pointer-events-none">
              <Link href="/" className="pointer-events-auto flex items-center justify-center w-full h-full relative">
                <img
                  src="/JanmaSethu U Logo.svg"
                  alt="JanmaSethu Logo"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-36 md:h-56 w-auto max-w-none object-contain pointer-events-none"
                />
              </Link>
            </div>

            {/* Right: Auth Buttons */}
            <div className="flex items-center gap-1.5 md:gap-3 relative z-[60]">
              {/* Desktop only: wrapped so AnimatedButton's display:flex can't override hidden */}
              <div className="hidden md:flex items-center gap-3">
                <a href="http://72.61.228.9:4500" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    className="font-medium text-slate-500 hover:text-slate-900"
                  >
                    {t('nav_for_clinics')}
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  className="font-semibold text-gray-700 hover:text-primary hover:bg-primary/5"
                  onClick={() => openAuth("login")}
                >
                  Log In
                </Button>
                <AnimatedButton
                  className="gradient-button text-white shadow-md hover:shadow-lg transition-all text-xs h-9"
                  onClick={() => openAuth("register")}
                >
                  Sign Up
                </AnimatedButton>
              </div>

              {/* Mobile: Minimal text buttons with tap animations */}
              <div className="flex md:hidden items-center gap-0.5 sm:gap-1">
                <button
                  className="px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] font-semibold text-gray-600 rounded-full transition-all duration-200 hover:text-purple-600 hover:bg-purple-50 active:scale-90 active:bg-purple-100 whitespace-nowrap"
                  onClick={() => openAuth("login")}
                >
                  Login
                </button>
                <button
                  className="px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 active:scale-90 active:shadow-none whitespace-nowrap"
                  onClick={() => openAuth("register")}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Nav Bar - Non-sticky, hidden on homepage (CinematicHero has its own) */}
      {location !== "/" && (
        <div className="hidden md:block w-full bg-white py-0.5 border-b border-gray-100/50 shadow-sm relative z-40">
          <div className="container mx-auto px-3 md:px-4">
            <nav className="w-full">
              <ul className="flex items-center justify-between w-full">
                {navConfig.map((item) => (
                  <li key={item.key} className="flex-shrink-0">
                    <Link href={item.href}>
                      <NavButton
                        label={t(item.key)}
                        isActive={location === item.href || (item.href !== "/" && location.startsWith(item.href))}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu (Drawer) - Now works on desktop too */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navConfig}
      />

      {/* Auth Modal */}
      <AuthModal
        key={authTab}
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        defaultTab={authTab}
      />
    </>
  );
};

export default Header;
