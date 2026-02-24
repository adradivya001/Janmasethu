import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Navigation() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all"
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        boxShadow: isScrolled 
          ? "0 10px 30px rgba(0, 0, 0, 0.1)" 
          : "0 0 0 rgba(0, 0, 0, 0)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://janmasethu.com/logo.png" 
              alt="Janmasethu" 
              className="h-12"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=100&h=100&fit=crop';
              }}
            />
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <NavLink href="#home" delay={0.4}>Home</NavLink>
            <NavLink href="#knowledge-hub" delay={0.5}>Knowledge Hub</NavLink>
            <NavLink href="#treatments" delay={0.6}>Treatments</NavLink>
            <NavLink href="#sakhi" delay={0.7} active>Sakhi</NavLink>
            
            {/* More Dropdown */}
            <div className="relative">
              <motion.button
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} 
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children, delay, active = false }: { 
  href: string; 
  children: React.ReactNode; 
  delay: number;
  active?: boolean;
}) {
  return (
    <motion.a
      href={href}
      className={`relative transition-colors ${
        active ? 'text-purple-600 font-medium' : 'text-gray-700 hover:text-gray-900'
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
    >
      {children}
      {active && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
          layoutId="activeTab"
        />
      )}
    </motion.a>
  );
}
