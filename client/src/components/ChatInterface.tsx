import { useState } from 'react';
import { Send, X, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { detectScript } from '@/utils/language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  lang: string;
}

const ChatInterface = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    { key: 'chat_p1', text: t('chat_p1') },
    { key: 'chat_p2', text: t('chat_p2') },
    { key: 'chat_p3', text: t('chat_p3') },
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userLang = detectScript(text);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      lang: userLang,
    };

    const replyKey = `chat_reply_${userLang}` as keyof typeof import('@/i18n/dictionary').dict.en;
    const reply = t(replyKey);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: reply,
      isUser: false,
      lang: userLang,
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
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
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                data-testid={`message-${message.isUser ? 'user' : 'bot'}-${message.id}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Prompts */}
        <div className="border-t border-border p-4">
          <p className="text-sm font-medium text-foreground mb-3" data-testid="text-quick-prompts">
            {t('chat_quick')}:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickPrompts.map(({ key, text }) => (
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
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
              data-testid="input-chat-message"
            />
            <Button
              onClick={() => sendMessage(inputText)}
              className="gradient-button text-white rounded-full hover:shadow-lg transition-all duration-300"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
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
