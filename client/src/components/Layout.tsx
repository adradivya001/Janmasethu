import React, { ReactNode, useState, useRef, useEffect } from 'react';
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
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    // Initial height setting
    setFooterHeight(footerRef.current.clientHeight);

    // Observe for any height changes (window resize, content changes)
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.target.clientHeight);
      }
    });

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Skip to Content Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main content layer that scrolls over the footer */}
      <div
        className="relative z-10 bg-background flex flex-col min-h-screen"
        style={{ marginBottom: footerHeight }}
      >
        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>

      {/* Fixed Footer Layer underneath */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 -z-10 bg-white"
      >
        <Footer />
      </div>

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
