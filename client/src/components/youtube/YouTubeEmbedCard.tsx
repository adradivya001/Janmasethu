
import React from 'react';
import { Play } from 'lucide-react';
import { parseYouTubeUrl } from './YouTubeInlinePlayer';

interface YouTubeEmbedCardProps {
  url: string;
  title: string;
  thumbnailUrl?: string;
  onOpen?: () => void;
  className?: string;
}

export const YouTubeEmbedCard: React.FC<YouTubeEmbedCardProps> = ({
  url,
  title,
  thumbnailUrl,
  onOpen,
  className = '',
}) => {
  const { videoId } = parseYouTubeUrl(url);
  const thumbnail = thumbnailUrl || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpen?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative block w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-900">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
          <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="p-4 bg-white dark:bg-gray-800 text-left">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
      </div>
    </button>
  );
};
