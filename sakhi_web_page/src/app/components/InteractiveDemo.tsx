import { motion } from 'motion/react';
import { Send, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const demoMessages = [
  {
    user: "I'm feeling anxious about my upcoming IVF cycle",
    sakhi: "I hear you. Starting an IVF cycle brings up so many emotions. What part feels most overwhelming right now?"
  },
  {
    user: "The uncertainty of whether it will work",
    sakhi: "That uncertainty is one of the hardest parts. Many women share this exact feeling. Let's talk about ways to find moments of calm during this journey."
  }
];

const QUICK_PROMPTS = [
  "Does age really affect our chances?",
  "Healthy routines during pregnancy",
  "Explain me the IVF journey?"
];

export function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFF]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Try Sakhi - Interactive Demo
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience real-time support. Type a message below to start talking.
          </p>
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          className="bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 flex flex-col h-[700px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white shrink-0">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Sakhi — Conversation (Demo)</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Type in English/हिंदी/తెలుగు — reply mirrors your language.
              </p>
            </div>
            <motion.button
              onClick={() => setActiveDemo(0)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              whileHover={{ rotate: -180 }}
              whileTap={{ scale: 0.9 }}
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-8 space-y-6 overflow-y-auto bg-white relative">
            {activeDemo === -1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-gray-400 text-lg font-medium">Start a conversation with Sakhi...</p>
              </div>
            )}

            {demoMessages.slice(0, activeDemo + 1).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="space-y-6"
              >
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#F3F4F6] text-gray-800 px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                    <p className="text-sm md:text-base leading-relaxed">{msg.user}</p>
                  </div>
                </div>

                {/* Sakhi Response */}
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 shadow-sm text-gray-800 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                    <p className="text-sm md:text-base leading-relaxed">{msg.sakhi}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Controls Area */}
          <div className="px-8 py-6 bg-white border-t border-gray-50 shrink-0">
            {/* Quick Prompts */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <motion.button
                    key={prompt}
                    className="px-5 py-2.5 bg-[#F0F5FF] text-[#1E40AF] rounded-full text-sm font-medium hover:bg-[#E0E9FF] transition-colors border border-transparent"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDemo(prev => Math.min(prev + 1, demoMessages.length - 1))}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Fake Field */}
            <div className="relative flex items-center gap-3">
              <div className="w-full px-6 py-4 bg-[#F9FAFB] border border-transparent rounded-full text-gray-400 text-sm md:text-base">
                Type your message...
              </div>
              <motion.button
                className="p-3.5 bg-gradient-to-tr from-pink-500 to-purple-600 text-white rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveDemo(prev => Math.min(prev + 1, demoMessages.length - 1))}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
