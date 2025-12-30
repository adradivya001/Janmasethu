
import { Link } from 'wouter';
import { X, ChevronRight, Home, BookOpen, Stethoscope, MessageCircle, Trophy, FileText, Users, TrendingUp, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ key: string; href: string }>;
}

const navIcons: Record<string, { icon: any; color: string; description: string }> = {
  'nav_home': { icon: Home, color: 'from-blue-500 to-blue-600', description: 'Back to main page' },
  'nav_knowledge': { icon: BookOpen, color: 'from-purple-500 to-pink-500', description: 'Articles & guides for your journey' },
  'nav_treatments': { icon: Stethoscope, color: 'from-teal-500 to-emerald-500', description: 'Medical procedures & options' },
  'nav_sakhi': { icon: MessageCircle, color: 'from-pink-500 to-rose-500', description: 'Your personal health companion' },
  'nav_success': { icon: Trophy, color: 'from-amber-500 to-orange-500', description: 'Inspiring parent stories' },
  'nav_blog': { icon: FileText, color: 'from-indigo-500 to-purple-500', description: 'Latest insights & tips' },
  'nav_experts': { icon: Users, color: 'from-cyan-500 to-blue-500', description: 'Meet our specialists' },
  'nav_investors': { icon: TrendingUp, color: 'from-green-500 to-emerald-500', description: 'Partner with us' },
};

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
      <div className={`mobile-menu fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-5 py-6 bg-gradient-to-r from-purple-600 to-pink-500 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close menu"
              data-testid="button-close-menu"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
            <div className="flex flex-col items-center justify-center pt-4">
              <img 
                src="/new JS logo BR.svg" 
                alt="JanmaSethu Logo" 
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-3 px-3" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-1">
              {navItems.map(({ key, href }, index) => {
                const navInfo = navIcons[key] || { icon: ChevronRight, color: 'from-gray-500 to-gray-600', description: '' };
                const Icon = navInfo.icon;
                
                return (
                  <Link 
                    key={href}
                    href={href} 
                    className="group block"
                    onClick={onClose}
                    data-testid={`link-mobile-${key.replace('nav_', '')}`}
                  >
                    <div 
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                      style={{
                        animation: isOpen ? `slideInLeft 0.3s ease-out ${index * 0.05}s forwards` : '',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className={`p-2.5 rounded-xl bg-gradient-to-r ${navInfo.color} shadow-md group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-[15px] text-gray-800 group-hover:text-purple-700 transition-colors block">
                          {t(key)}
                        </span>
                        {navInfo.description && (
                          <span className="text-xs text-gray-500 block truncate">
                            {navInfo.description}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
