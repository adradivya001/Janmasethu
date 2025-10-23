
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface YouTubeModalProps {
  open: boolean;
  onClose: () => void;
  playerProps: React.ComponentProps<typeof import('./YouTubeInlinePlayer').YouTubeInlinePlayer>;
}

export const YouTubeModal: React.FC<YouTubeModalProps> = ({ open, onClose, playerProps }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={playerProps.title || 'Video player'}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl mx-auto"
        style={{ maxWidth: 'clamp(320px, 92vw, 1024px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200"
          aria-label="Close video player"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Player Container */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <YouTubeInlinePlayer {...playerProps} className="w-full" />
        </div>
      </div>
    </div>
  );
};

// Re-export for convenience
export { YouTubeInlinePlayer } from './YouTubeInlinePlayer';
