
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

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

export function InteractiveDemo({ onCtaClick }: InteractiveDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Namaste! I am Sakhi. How can I support you on your journey today?",
      isUser: false,
      lang: 'en'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { journey } = useJourney();

  // Auto-scroll to bottom when new messages arrive
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

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    const userLang = detectScript(inputText);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      lang: userLang,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText; // Capture input for API call
    setInputText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: currentInput.trim(),
          lang: userLang,
          context: {
            stage: journey?.stage,
            date: journey?.date,
            date_type: journey?.stage === 'PREGNANT' ? 'LMP' : (journey?.stage === 'PARENT' ? 'DOB' : null)
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F5F7FF] via-white to-white">
      <div className="max-w-5xl mx-auto px-6">
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
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[600px]"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Chat Header */}
          <motion.div
            className="bg-gradient-to-r from-primary to-[#EC4899] p-6 text-white shrink-0"
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
                  <p className="text-sm text-white/80">Online & Ready to Help</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto bg-gray-50 scroll-smooth">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* User Message */}
                {msg.isUser ? (
                  <div className="flex justify-end mb-3">
                    <div className="bg-primary text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-md">
                      <p className="text-sm md:text-base">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  /* Sakhi Response */
                  <div className="flex justify-start mb-3">
                    <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                      <p className="text-sm md:text-base text-gray-800">
                        {msg.text}
                        {msg.isStreaming && <span className="animate-pulse inline-block ml-1">▌</span>}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question here (e.g., 'I feel anxious about IVF')..."
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-full focus:outline-none focus:border-primary/50 focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <motion.button
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
                className="absolute right-2 p-3 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-gray-400">
                Sakhi provides support, not medical advice.
              </p>
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
            onClick={onCtaClick}
            className="px-8 py-4 bg-gradient-to-r from-primary to-[#EC4899] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Get Full Access to Sakhi
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

