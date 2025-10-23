
import React, { useEffect, useRef, useState } from 'react';

// Extend Window type for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubeInlinePlayerProps {
  videoId?: string;
  url?: string;
  title?: string;
  start?: number;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onPlay?(t: number): void;
  onPause?(t: number): void;
  onEnded?(): void;
}

// Parse YouTube URL to extract videoId and start time
export const parseYouTubeUrl = (url: string): { videoId: string | null; start: number } => {
  let videoId: string | null = null;
  let start = 0;

  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    // Handle different YouTube URL formats
    if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
      const tParam = urlObj.searchParams.get('t') || urlObj.searchParams.get('start');
      if (tParam) {
        // Parse time formats like "90", "90s", "1m30s"
        const match = tParam.match(/(?:(\d+)m)?(?:(\d+)s?)?/);
        if (match) {
          const minutes = parseInt(match[1] || '0');
          const seconds = parseInt(match[2] || '0');
          start = minutes * 60 + seconds;
        } else {
          start = parseInt(tParam) || 0;
        }
      }
    } else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
      const tParam = urlObj.searchParams.get('t');
      if (tParam) {
        start = parseInt(tParam) || 0;
      }
    }
  } catch (e) {
    // If URL parsing fails, try direct videoId
    videoId = url;
  }

  return { videoId, start };
};

// Load YouTube IFrame API script
let apiLoaded = false;
let apiLoadingPromise: Promise<void> | null = null;

const loadYouTubeAPI = (): Promise<void> => {
  if (apiLoaded) return Promise.resolve();
  if (apiLoadingPromise) return apiLoadingPromise;

  apiLoadingPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      apiLoaded = true;
      resolve();
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      resolve();
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });

  return apiLoadingPromise;
};

export const YouTubeInlinePlayer: React.FC<YouTubeInlinePlayerProps> = ({
  videoId: propVideoId,
  url,
  title = 'YouTube video',
  start: propStart,
  autoplay = true,
  controls = true,
  muted: propMuted,
  loop = false,
  className = '',
  onPlay,
  onPause,
  onEnded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Determine videoId and start time
  const { videoId: parsedVideoId, start: parsedStart } = url ? parseYouTubeUrl(url) : { videoId: propVideoId, start: 0 };
  const videoId = parsedVideoId || propVideoId;
  const startTime = propStart ?? parsedStart;

  // Auto-mute if autoplay is enabled (browser policy)
  const muted = propMuted ?? (autoplay ? true : false);

  useEffect(() => {
    if (!videoId) {
      setError('Invalid video ID');
      setIsLoading(false);
      return;
    }

    let player: any = null;

    const initPlayer = async () => {
      try {
        await loadYouTubeAPI();

        if (!containerRef.current) return;

        // Create a div for the player
        const playerDiv = document.createElement('div');
        containerRef.current.appendChild(playerDiv);

        player = new window.YT.Player(playerDiv, {
          videoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: controls ? 1 : 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
            enablejsapi: 1,
            start: startTime,
            mute: muted ? 1 : 0,
            loop: loop ? 1 : 0,
            playlist: loop ? videoId : undefined,
          },
          events: {
            onReady: (event: any) => {
              playerRef.current = event.target;
              setIsLoading(false);
              if (startTime > 0) {
                event.target.seekTo(startTime, true);
              }
            },
            onStateChange: (event: any) => {
              const currentTime = event.target.getCurrentTime();
              if (event.data === window.YT.PlayerState.PLAYING && onPlay) {
                onPlay(currentTime);
              } else if (event.data === window.YT.PlayerState.PAUSED && onPause) {
                onPause(currentTime);
              } else if (event.data === window.YT.PlayerState.ENDED && onEnded) {
                onEnded();
              }
            },
            onError: () => {
              setError('Failed to load video');
              setIsLoading(false);
            },
          },
        });
      } catch (err) {
        setError('Failed to initialize player');
        setIsLoading(false);
      }
    };

    initPlayer();

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Player already destroyed
        }
      }
    };
  }, [videoId, startTime, autoplay, controls, muted, loop, onPlay, onPause, onEnded]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 text-white p-8 rounded-2xl ${className}`}>
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[16/9] ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full rounded-2xl overflow-hidden" />
    </div>
  );
};
