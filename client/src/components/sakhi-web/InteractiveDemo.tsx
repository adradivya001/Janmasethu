
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { detectScript } from '@/utils/language';
import { useJourney } from '@/contexts/JourneyContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  lang: string;
  isStreaming?: boolean;
}

interface InteractiveDemoProps {
  onCtaClick?: () => void;
}

const QUICK_PROMPTS = [
  "Does age really affect our chances?",
  "Healthy routines during pregnancy",
  "Explain me the IVF journey?"
];

export function InteractiveDemo({ onCtaClick }: InteractiveDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { journey } = useJourney();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const streamText = async (botMessageId: string, fullText: string, delay: number = 20) => {
    let displayedText = '';
    for (let i = 0; i < fullText.length; i++) {
      displayedText += fullText[i];
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: displayedText } : msg
        )
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    setMessages(prev =>
      prev.map(msg =>
        msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
      )
    );
  };

  const sendMessage = async (text: string) => {
    const textToSend = text.trim();
    if (!textToSend || isLoading) return;

    setIsLoading(true);
    const userLang = detectScript(textToSend);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      lang: userLang,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSend,
          lang: userLang,
          context: {
            stage: journey?.stage,
            date: journey?.date,
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const botMessageId = (Date.now() + 1).toString();

      const botMessage: Message = {
        id: botMessageId,
        text: '',
        isUser: false,
        lang: userLang,
        isStreaming: true,
      };

      setMessages(prev => [...prev, botMessage]);
      await streamText(botMessageId, data.botResponse);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Sorry, I had trouble responding. Please try again.',
        isUser: false,
        lang: userLang,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInputText('');
    setIsLoading(false);
  };

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
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Sakhi — Conversation (Demo)</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Type in English/हिंदी/తెలుగు — reply mirrors your language.
              </p>
            </div>
            <motion.button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              whileHover={{ rotate: -180 }}
              whileTap={{ scale: 0.9 }}
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-8 space-y-6 overflow-y-auto bg-white relative">
            {messages.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-gray-400 text-lg font-medium">Start a conversation with Sakhi...</p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl ${msg.isUser
                      ? 'bg-[#F3F4F6] text-gray-800 rounded-tr-sm'
                      : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-sm'
                      }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                    {msg.isStreaming && <span className="animate-pulse inline-block ml-1">▌</span>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts & Input Area */}
          <div className="px-8 py-6 bg-white border-t border-gray-50">
            {/* Quick Prompts */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <motion.button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="px-5 py-2.5 bg-[#F0F5FF] text-[#1E40AF] rounded-full text-sm font-medium hover:bg-[#E0E9FF] transition-colors border border-transparent"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Field */}
            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder="Type your message..."
                className="w-full px-6 py-4 bg-[#F9FAFB] border border-transparent focus:border-gray-200 focus:bg-white rounded-full focus:outline-none transition-all text-gray-700"
                disabled={isLoading}
              />
              <motion.button
                onClick={() => sendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                className="p-3.5 bg-gradient-to-tr from-pink-500 to-purple-600 text-white rounded-full shadow-lg disabled:opacity-50 disabled:grayscale transition-all shrink-0"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

