import { motion } from 'motion/react';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

const demoMessages = [
  {
    user: "I'm feeling anxious about my upcoming IVF cycle",
    sakhi: "I hear you. Starting an IVF cycle brings up so many emotions. What part feels most overwhelming right now?"
  },
  {
    user: "The uncertainty of whether it will work",
    sakhi: "That uncertainty is one of the hardest parts. Many women share this exact feeling. Let's talk about ways to find moments of calm during this journey."
  },
  {
    user: "How do others cope with this anxiety?",
    sakhi: "Great question. Here are some approaches that help: breathing exercises before appointments, connecting with support groups, and journaling your feelings. Which resonates with you?"
  }
];

export function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Try Sakhi - Interactive Demo
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            See how Sakhi responds with empathy and guidance
          </p>
        </motion.div>

        {/* Demo Interface - Show Don't Tell */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Chat Header */}
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white"
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 100%' }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-lg">Sakhi</h3>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.span
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-sm text-white/80">Your compassionate companion</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Chat Messages */}
          <div className="p-6 md:p-8 space-y-6 min-h-[400px] bg-gray-50">
            {demoMessages.slice(0, activeDemo + 1).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                {/* User Message */}
                <div className="flex justify-end mb-3">
                  <div className="bg-purple-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                    <p className="text-sm md:text-base">{msg.user}</p>
                  </div>
                </div>

                {/* Sakhi Response */}
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                    <p className="text-sm md:text-base text-gray-800">{msg.sakhi}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Controls */}
          <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {activeDemo < demoMessages.length - 1 ? 'Click to see more' : 'Demo complete'}
              </p>
              {activeDemo < demoMessages.length - 1 && (
                <motion.button
                  onClick={() => setActiveDemo(prev => Math.min(prev + 1, demoMessages.length - 1))}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                  <Send className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* CTA Below Demo */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Real Conversation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
