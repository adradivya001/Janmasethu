import { Link } from 'wouter';
import { useLanguage } from '@/i18n/LanguageProvider';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Janma Sethu Logo" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-bold text-foreground font-serif">Janma Sethu</h3>
            </div>
            <p className="text-muted-foreground text-sm">{t('brand_tag')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/knowledge" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-knowledge">
                {t('nav_knowledge')}
              </Link>
              <Link href="/treatments" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-treatments">
                {t('nav_treatments')}
              </Link>
              <Link href="/success-stories" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-success">
                {t('nav_success')}
              </Link>
              <Link href="/sakhi" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-sakhi">
                {t('nav_sakhi')}
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <div className="space-y-2">
              <Link href="/experts" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-experts">
                {t('nav_experts')}
              </Link>
              <Link href="/tools" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-tools">
                {t('nav_tools')}
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-blog">
                {t('nav_blog')}
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-privacy">
                {t('footer_privacy')}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <Link href="/sources" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-sources">
                {t('footer_sources')}
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-contact">
                {t('footer_contact')}
              </Link>
              <p className="text-xs text-muted-foreground" data-testid="text-disclaimer">
                {t('footer_disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;