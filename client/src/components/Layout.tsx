import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import LeadSubmissionForm from './LeadSubmissionForm';
import { JourneyFloatingWidget } from './JourneyFloatingWidget';
import { UserPlus } from 'lucide-react';

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

      {/* Floating Journey Widget */}
      <JourneyFloatingWidget />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Floating Contact Button */}
      <button
        onClick={() => setShowLeadForm(true)}
        className="fixed bottom-6 left-4 md:left-6 z-50 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label="Get in Touch"
        data-testid="button-floating-add-lead"
        title="Get in Touch"
      >
        <UserPlus className="w-5 h-5" />
      </button>

      {/* Lead Submission Form */}
      <LeadSubmissionForm
        open={showLeadForm}
        onClose={() => setShowLeadForm(false)}
      />
    </div>
  );
};

export default Layout;
