import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import LeadSubmissionForm from './LeadSubmissionForm';
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

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Floating Add Lead Button */}
      <button
        onClick={() => setShowLeadForm(true)}
        className="fixed bottom-24 right-4 md:right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none group"
        aria-label="Add Lead"
        data-testid="button-floating-add-lead"
      >
        <UserPlus className="w-5 h-5" />
        <span className="hidden sm:inline">Add Lead</span>
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