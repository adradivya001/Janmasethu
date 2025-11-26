
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Complete loading after fade out animation (3 seconds total)
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-orange-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Logo container with animations */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with scale and fade animation */}
        <div className="animate-logo-entrance">
          <img
            src="/JanmaSethu Logo.png"
            alt="JanmaSethu Logo"
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </div>

        {/* Loading text with letter-by-letter animation */}
        <div className="mt-8 flex space-x-1">
          {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
            <span
              key={index}
              className="text-2xl md:text-3xl font-bold text-purple-600 animate-letter-pop"
              style={{ animationDelay: `${1 + index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
          <span className="text-2xl md:text-3xl font-bold text-purple-600 animate-dots">...</span>
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
