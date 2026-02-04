import { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { detectScript } from '@/utils/language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useJourney } from '@/contexts/JourneyContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  lang: string;
  isStreaming?: boolean;
}

const ChatInterface = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { key: 'chat_p1', text: t('chat_p1') },
    { key: 'chat_p2', text: t('chat_p2') },
    { key: 'chat_p3', text: t('chat_p3') },
  ];

  const { journey } = useJourney(); // Import useJourney

  // Dynamic prompts based on journey stage
  const getQuickPrompts = () => {
    if (!journey) return quickPrompts;

    if (journey.stage === 'TTC') {
      return [
        { key: 'ttc_1', text: "How do I track my ovulation?" },
        { key: 'ttc_2', text: "Best diet for fertility?" },
        { key: 'ttc_3', text: "When should I see a specialist?" }
      ];
    }
    if (journey.stage === 'PREGNANT') {
      return [
        { key: 'preg_1', text: "Is it safe to eat spicy food?" },
        { key: 'preg_2', text: "Common symptoms for my week?" },
        { key: 'preg_3', text: "How to manage morning sickness?" }
      ];
    }
    if (journey.stage === 'PARENT') {
      return [
        { key: 'par_1', text: "Baby is crying a lot" },
        { key: 'par_2', text: "Vaccination schedule?" },
        { key: 'par_3', text: "Postpartum diet tips" }
      ];
    }
    return quickPrompts;
  };

  const dynamicPrompts = getQuickPrompts();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Stream text character by character
  const streamText = async (
    botMessageId: string,
    fullText: string,
    delay: number = 20
  ) => {
    let displayedText = '';

    for (let i = 0; i < fullText.length; i++) {
      displayedText += fullText[i];

      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: displayedText }
            : msg
        )
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Remove streaming indicator
    setMessages(prev =>
      prev.map(msg =>
        msg.id === botMessageId
          ? { ...msg, isStreaming: false }
          : msg
      )
    );
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);

    const userLang = detectScript(text);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      lang: userLang,
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      // Send to backend API with journey context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          lang: userLang,
          context: {
            stage: journey?.stage,
            date: journey?.date,
            date_type: journey?.stage === 'PREGNANT' ? 'LMP' : (journey?.stage === 'PARENT' ? 'DOB' : null)
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botMessageId = (Date.now() + 1).toString();

      // Add bot message with streaming
      const botMessage: Message = {
        id: botMessageId,
        text: '',
        isUser: false,
        lang: userLang,
        isStreaming: true,
      };

      setMessages(prev => [...prev, botMessage]);

      // Stream the response text
      await streamText(botMessageId, data.botResponse);
    } catch (error) {
      console.error('Chat error:', error);

      // Show error message
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

  const clearChat = () => {
    setMessages([]);
  };

  const handleQuickPrompt = (text: string) => {
    sendMessage(text);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-foreground" data-testid="text-chat-title">
              {t('chat_title')}
            </CardTitle>
            <p className="text-sm text-muted-foreground" data-testid="text-chat-hint">
              {t('chat_hint')}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-clear-chat"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4" data-testid="container-chat-messages">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>Start a conversation with Sakhi...</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  data-testid={`message-${message.isUser ? 'user' : 'bot'}-${message.id}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {message.text}
                    {message.isStreaming && <span className="animate-pulse">▌</span>}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="border-t border-border p-4">
          <p className="text-sm font-medium text-foreground mb-3" data-testid="text-quick-prompts">
            {t('chat_quick')}:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {dynamicPrompts.map(({ key, text }) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(text)}
                className="text-xs rounded-full"
                data-testid={`button-quick-prompt-${key}`}
              >
                {text}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full"
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage(inputText)}
              disabled={isLoading}
              data-testid="input-chat-message"
            />
            <Button
              onClick={() => sendMessage(inputText)}
              disabled={isLoading}
              className="gradient-button text-white rounded-full hover:shadow-lg transition-all duration-300"
              data-testid="button-send-message"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2" data-testid="text-chat-privacy">
            {t('chat_privacy')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
