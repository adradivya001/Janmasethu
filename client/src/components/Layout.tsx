import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import FloatingContact from './FloatingContact';
import { JourneyFloatingWidget } from './JourneyFloatingWidget';
import LeadSubmissionForm from './LeadSubmissionForm';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to Content Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />

      {/* Separate Floating Widgets — each draggable independently */}
      <JourneyFloatingWidget />
      <FloatingWhatsApp />
      <FloatingContact onOpenLeadForm={() => setShowLeadForm(true)} />

      {/* Lead Submission Form */}
      <LeadSubmissionForm
        open={showLeadForm}
        onClose={() => setShowLeadForm(false)}
      />
    </div>
  );
};

export default Layout;
