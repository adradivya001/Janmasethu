import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flower2 } from 'lucide-react';

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-12 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 40, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}

            {/* Main Heading */}
            <motion.h1
              className="mt-2.5 text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">Meet Sakhi - Your</span>
              <motion.span
                className="block bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0% center', '200% center', '0% center'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Compassionate Companion
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-1.5 text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Sakhi understands the emotional challenges of fertility journeys and provides culturally-aware support
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-4 flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(139, 92, 246, 0.3)",
                    "0 15px 35px rgba(139, 92, 246, 0.4)",
                    "0 10px 30px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  Try Sakhi Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full font-medium border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                whileHover={{ scale: 1.05, borderColor: "rgb(216, 180, 254)" }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Knowledge Hub
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-10 flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <StatItem icon={<CommunityIcon className="w-6 h-6" />} value="10k+" label="Users Supported" delay={1.2} />
              <StatItem icon={<HeartIcon className="w-6 h-6" />} value="95%" label="Satisfaction Rate" delay={1.3} />
              <StatItem icon={<MessageIcon className="w-6 h-6" />} value="24/7" label="Available Support" delay={1.4} />
            </motion.div>
          </div>

          {/* Right Side - Floating Icons */}
          <div className="hidden lg:block flex-1 relative h-[600px]">
            {/* Main Illustration Placeholder */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }} // smooth back-out easing
            >
              <div className="image-circle-wrapper w-full h-full shadow-2xl">
                <img
                  src="/sakhi.png"
                  alt="Sakhi"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Floating Feature Icons */}
            <FloatingIcon
              icon={<HeartIcon className="w-8 h-8 text-pink-600" />}
              bgColor="bg-pink-100"
              position="top-20 right-20"
              delay={1}
              duration={3}
            />
            <FloatingIcon
              icon={<CommunityIcon className="w-8 h-8 text-purple-600" />}
              bgColor="bg-purple-100"
              position="top-60 right-0"
              delay={1.5}
              duration={4}
            />
            <FloatingIcon
              icon={<MessageIcon className="w-8 h-8 text-blue-600" />}
              bgColor="bg-blue-100"
              position="bottom-40 right-12"
              delay={2}
              duration={3.5}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            className="text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <motion.div
            className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center"
            whileHover={{ borderColor: "rgb(168, 85, 247)" }}
          >
            <motion.div
              className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Chat Trigger (Fixed Bottom Right) */}
      <motion.div
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer z-50 hover:bg-[#20b85a]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageIcon className="w-8 h-8 fill-current" />
      </motion.div>
    </section>
  );
}

function StatItem({ icon, value, label, delay }: {
  icon: ReactNode;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.08, x: 5 }}
    >
      <motion.div
        className="p-3 bg-purple-100 rounded-full text-purple-600"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <div>
        <motion.div
          className="text-2xl font-bold text-gray-900"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: "spring" }}
        >
          {value}
        </motion.div>
        <motion.div
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
}

function FloatingIcon({ icon, bgColor, position, delay, duration }: {
  icon: ReactNode;
  bgColor: string;
  position: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className={`absolute ${position} ${bgColor} p-6 rounded-2xl shadow-lg`}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.6, delay, type: "spring" },
        rotate: { duration: 0.6, delay },
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }
      }}
      whileHover={{
        scale: 1.2,
        rotate: [0, -10, 10, -10, 0],
        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
        transition: { duration: 0.5 }
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
