import { Link } from 'wouter';
import { useLanguage } from '../i18n/LanguageProvider';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-border py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-4 md:gap-6">
          {/* Brand */}
          <div>
            <div className="flex flex-col items-center md:items-start mb-2 md:mb-4">
              <img
                src="/new JS logo BR.svg"
                alt="Janma Sethu Logo"
                className="h-16 md:h-20 w-auto object-contain scale-x-125 scale-y-110 origin-center md:origin-left mix-blend-multiply"
              />
            </div>
            <p className="text-muted-foreground text-xs text-center md:text-left">{t('brand_tag')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1 md:mb-2">Quick Links</h4>
            <div className="space-y-1">
              <Link href="/knowledge-hub" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-knowledge">
                {t('nav_knowledge')}
              </Link>
              <Link href="/treatments" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-treatments">
                {t('nav_treatments')}
              </Link>
              <Link href="/success-stories" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-success">
                {t('nav_success')}
              </Link>
              <Link href="/sakhi" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-sakhi">
                {t('nav_sakhi')}
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1 md:mb-2">Resources</h4>
            <div className="space-y-1">
              <Link href="/experts" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-experts">
                {t('nav_experts')}
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-blog">
                {t('nav_blog')}
              </Link>
            </div>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1 md:mb-2">{t('footer_professional')}</h4>
            <div className="space-y-1">
              <a href="http://72.61.228.9:4500" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary text-xs">
                {t('nav_for_clinics')}
              </a>
            </div>
          </div>

          {/* Contact & Disclaimer */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground text-sm mb-1 md:mb-2">Contact</h4>
            <div className="space-y-1">
              <Link href="/contact" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-contact">
                {t('footer_contact')}
              </Link>
              <Link href="/sources" className="block text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-sources">
                {t('footer_sources')}
              </Link>
              <p className="text-xs text-muted-foreground mt-1 md:mt-2 leading-tight" data-testid="text-disclaimer">
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