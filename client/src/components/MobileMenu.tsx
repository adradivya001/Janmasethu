import { Link } from 'wouter';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ key: string; href: string; label: string }>;
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          data-testid="backdrop-mobile-menu"
        />
      )}
      
      {/* Menu */}
      <div className={`mobile-menu fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden ${isOpen ? 'open' : ''}`}>
        <div className="p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="mb-6 p-2"
            aria-label="Close menu"
            data-testid="button-close-menu"
          >
            <X className="text-xl" />
          </Button>
          
          <nav className="space-y-4" role="navigation" aria-label="Mobile navigation">
            {navItems.map(({ key, href, label }) => (
              <Link 
                key={href}
                href={href} 
                className="block py-2 text-foreground hover:text-primary font-medium"
                onClick={onClose}
                data-testid={`link-mobile-${key.replace('nav_', '')}`}
              >
                {label}
              </Link>
            ))}</nav>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
