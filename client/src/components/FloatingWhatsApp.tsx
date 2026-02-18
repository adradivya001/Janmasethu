import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

const FloatingWhatsApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDir, setOpenDir] = useState<'down' | 'up'>('down');
  const pillRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [side, setSide] = useState<'right' | 'left'>('right');

  const snapToEdge = useCallback(() => {
    const currentX = x.get();
    const pillW = 52;
    const screenW = window.innerWidth;
    const centerX = screenW + currentX - pillW / 2;
    if (centerX < screenW / 2) {
      animate(x, -(screenW - pillW), { type: "spring", stiffness: 300, damping: 30 });
      setSide('left');
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      setSide('right');
    }
  }, [x]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919281011683?text=HELLO', '_blank');
  };

  const handleExpand = () => {
    if (pillRef.current) {
      const rect = pillRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenDir(spaceBelow < 160 ? 'up' : 'down');
    }
    setIsExpanded(true);
  };

  const pillRounding = side === 'right' ? 'rounded-l-full' : 'rounded-r-full';
  const pillPadding = side === 'right' ? 'pl-1 pr-0' : 'pr-1 pl-0';

  return (
    <motion.div
      ref={pillRef}
      drag
      dragMomentum={false}
      dragElastic={0.05}
      onDragEnd={snapToEdge}
      style={{ x, y, touchAction: 'none', top: '73%', zIndex: 9995 }}
      className="fixed right-0 cursor-grab active:cursor-grabbing"
    >
      {/* Collapsed Pill */}
      <button
        onClick={handleExpand}
        className={cn(
          "group relative flex items-center transition-all duration-300",
          isExpanded && "pointer-events-none opacity-0"
        )}
      >
        <div className={cn(
          "relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-green-500 to-emerald-600",
          pillRounding
        )}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className={cn("relative flex items-center py-1", pillPadding)}>
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/25 backdrop-blur-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="w-1.5 md:w-3" />
          </div>
        </div>
      </button>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded-panel"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute"
            style={{
              ...(side === 'right' ? { right: 0 } : { left: 0 }),
              ...(openDir === 'down' ? { top: 0 } : { bottom: 0 }),
            }}
          >
            <div className="bg-white shadow-2xl border border-gray-200/80 overflow-hidden w-[180px] rounded-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-2.5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-xs flex-1">Chat with Sakhi</span>
                <button onClick={() => setIsExpanded(false)} className="text-white/70 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-[10px] text-gray-400 mb-2">Get instant support on WhatsApp</p>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold hover:shadow-lg transition-all"
                >
                  Open WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingWhatsApp;
