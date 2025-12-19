
import { Link } from 'wouter';
import { X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ key: string; href: string }>;
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          data-testid="backdrop-mobile-menu"
        />
      )}

      {/* Menu */}
      <div className={`mobile-menu fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:hidden ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/JanmaSethu Logo.png" 
                  alt="JanmaSethu Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-900" style={{ lineHeight: '1', margin: 0 }}>
                    Janma <span className="text-teal-500">Sethu</span>
                  </h2>
                  <p className="text-sm text-gray-600" style={{ lineHeight: '1', margin: 0 }}>Connecting Care & Parenthood</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-white/80 rounded-lg transition-colors"
                aria-label="Close menu"
                data-testid="button-close-menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-1">
              {navItems.map(({ key, href }, index) => (
                <Link 
                  key={href}
                  href={href} 
                  className="group block"
                  onClick={onClose}
                  data-testid={`link-mobile-${key.replace('nav_', '')}`}
                >
                  <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all duration-200 hover:shadow-sm">
                    <span className="font-medium text-[15px]">{t(key)}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer Section */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
