import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Send, MessageCircle, Heart, Shield, Clock, Users, Play, Volume2, VolumeX, Globe, User, Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/i18n/LanguageProvider';
import { detectScript } from '@/utils/language';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: string;
}

interface PreviewContent {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  tips: string[];
  resources: { title: string; description: string; }[];
  keyPoints: string[];
}

const SakhiTry = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('te');
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePreviewContent = (userMessage: string, language: string): PreviewContent => {
    const contentTemplates = {
      anxiety: {
        en: {
          title: "Managing Pre-Scan Anxiety",
          description: "Feeling anxious before medical appointments is completely normal during fertility journeys. Here are evidence-based techniques to help you cope.",
          tips: [
            "Practice 4-4-6 breathing: Inhale for 4 counts, hold for 4, exhale for 6",
            "Use progressive muscle relaxation starting from your toes",
            "Prepare questions in advance to feel more in control",
            "Bring a support person if possible"
          ],
          keyPoints: [
            "Anxiety is a normal response to uncertainty",
            "Breathing exercises activate your parasympathetic nervous system",
            "Preparation can reduce feelings of helplessness",
            "Your feelings are valid and acknowledged"
          ],
          resources: [
            { title: "Mindfulness Meditation Guide", description: "5-minute guided meditation for anxiety relief" },
            { title: "Questions to Ask Your Doctor", description: "Comprehensive list for fertility appointments" }
          ]
        },
        hi: {
          title: "स्कैन से पहले की चिंता का प्रबंधन",
          description: "चिकित्सा जांच से पहले चिंता महसूस करना प्रजनन यात्रा में बिल्कुल सामान्य है। यहाँ कुछ वैज्ञानिक तकनीकें हैं।",
          tips: [
            "4-4-6 सांस: 4 गिनती में सांस लें, 4 तक रोकें, 6 में छोड़ें",
            "पैर की अंगुलियों से शुरू करके प्रगतिशील मांसपेशी शिथिलता करें",
            "पहले से प्रश्न तैयार करें ताकि नियंत्रण महसूस हो",
            "यदि संभव हो तो सहारे वाले व्यक्ति को साथ लाएं"
          ],
          keyPoints: [
            "अनिश्चितता के लिए चिंता सामान्य प्रतिक्रिया है",
            "सांस की तकनीकें पैरासिम्पैथेटिक तंत्रिका तंत्र को सक्रिय करती हैं",
            "तैयारी से असहायता की भावना कम हो सकती है",
            "आपकी भावनाएं वैध हैं और स्वीकार की जाती हैं"
          ],
          resources: [
            { title: "माइंडफुलनेस मेडिटेशन गाइड", description: "चिंता राहत के लिए 5 मिनट का गाइडेड मेडिटेशन" },
            { title: "डॉक्टर से पूछने वाले प्रश्न", description: "प्रजनन अपॉइंटमेंट के लिए व्यापक सूची" }
          ]
        },
        te: {
          title: "స్కాన్ ముందు ఆత్రుత నిర్వహణ",
          description: "వైద్య పరీక్షల ముందు ఆందోళన అనుభవించడం ప్రసవ ప్రయాణంలో పూర్ణంగా సాధారణం. ఇక్కడ కొన్ని శాస్త్రీయ పద్ధతులు ఉన్నాయి.",
          tips: [
            "4-4-6 శ్వాస: 4 లెక్కలలో లోపల, 4 ఆపి, 6లో బయటకు",
            "కాలివేళ్ళ నుండి ప్రారంభించి క్రమంగా కండరాల సడలింపు చేయండి",
            "ముందుగానే ప్రశ్నలు సిద్ధం చేసుకోండి నియంత్రణ అనుభవించడానికి",
            "వీలైతే మద్దతిచ్చే వ్యక్తిని తీసుకురండి"
          ],
          keyPoints: [
            "అనిశ్చితికి ఆందోళన సాధారణ స్పందన",
            "శ్వాస వ్యాయామాలు పారాసింపథెటిక్ నరాల వ్యవస్థను సక్రియం చేస్తాయి",
            "సిద్ధత అసహాయత భావనలను తగ్గించగలదు",
            "మీ భావనలు చెల్లుబాటు అయ్యేవి మరియు గుర్తించబడుతున్నాయి"
          ],
          resources: [
            { title: "మైండ్‌ఫుల్‌నెస్ మెడిటేషన్ గైడ్", description: "ఆందోళన ఉపశమనం కోసం 5 నిమిషాల గైడెడ్ మెడిటేషన్" },
            { title: "వైద్యుడిని అడగవలసిన ప్రశ్నలు", description: "ప్రసవ అపాయింట్‌మెంట్‌ల కోసం సమగ్ర జాబితా" }
          ]
        }
      },
      wait: {
        en: {
          title: "Navigating the Two-Week Wait",
          description: "The two-week wait can be emotionally challenging. Here's how to manage this difficult period with self-compassion.",
          tips: [
            "Create daily routines to maintain structure",
            "Practice gentle activities like walking or reading",
            "Connect with trusted friends or support groups",
            "Limit excessive symptom-checking online"
          ],
          keyPoints: [
            "This waiting period tests patience in unique ways",
            "Routine helps manage uncertainty",
            "Community support provides emotional validation",
            "Self-care isn't selfish during this time"
          ],
          resources: [
            { title: "Two-Week Wait Self-Care Guide", description: "Daily activities and coping strategies" },
            { title: "Support Group Directory", description: "Find local and online fertility support groups" }
          ]
        },
        hi: {
          title: "दो सप्ताह की प्रतीक्षा का सामना",
          description: "दो सप्ताह की प्रतीक्षा भावनात्मक रूप से चुनौतीपूर्ण हो सकती है। इस कठिन अवधि को आत्म-करुणा के साथ कैसे संभालें।",
          tips: [
            "संरचना बनाए रखने के लिए दैनिक दिनचर्या बनाएं",
            "चलना या पढ़ना जैसी सौम्य गतिविधियां करें",
            "विश्वसनीय मित्रों या सहायता समूहों से जुड़ें",
            "ऑनलाइन अत्यधिक लक्षण-जांच को सीमित करें"
          ],
          keyPoints: [
            "यह प्रतीक्षा अवधि धैर्य को अनूठे तरीकों से परखती है",
            "दिनचर्या अनिश्चितता प्रबंधन में मदद करती है",
            "समुदायिक सहारा भावनात्मक मान्यता प्रदान करता है",
            "इस समय आत्म-देखभाल स्वार्थी नहीं है"
          ],
          resources: [
            { title: "दो सप्ताह प्रतीक्षा स्व-देखभाल गाइड", description: "दैनिक गतिविधियां और मुकाबला रणनीतियां" },
            { title: "सहायता समूह निर्देशिका", description: "स्थानीय और ऑनलाइन प्रजनन सहायता समूह खोजें" }
          ]
        },
        te: {
          title: "రెండు వారాల వేచిచూపును ఎదుర్కోవడం",
          description: "రెండు వారాల వేచిచూపు భావోద్వేగంగా సవాలుగా ఉంటుంది. ఈ కష్టమైన కాలాన్ని స్వీయ-కరుణతో ఎలా నిర్వహించాలి.",
          tips: [
            "నిర్మాణాన్ని కొనసాగించడానికి రోజువారీ దినచర్యలను సృష్టించండి",
            "నడక లేదా చదవడం వంటి సౌమ్య కార్యకలాపాలు చేయండి",
            "నమ్మకమైన స్నేహితులు లేదా మద్దతు గ్రూపులతో కనెక్ట్ అవండి",
            "ఆన్‌లైన్‌లో అధిక లక్షణ-తనిఖీని పరిమితం చేయండి"
          ],
          keyPoints: [
            "ఈ వేచిచూపు కాలం సహనాన్ని ప్రత్యేక మార్గాల్లో పరీక్షిస్తుంది",
            "దినచర్య అనిశ్చితత నిర్వహణలో సహాయపడుతుంది",
            "కమ్యూనిటీ మద్దతు భావోద్వేగ ధృవీకరణను అందిస్తుంది",
            "ఈ సమయంలో స్వీయ-సంరక్షణ స్వార్థం కాదు"
          ],
          resources: [
            { title: "రెండు వారాల వేచిచూపు స్వీయ-సంరక్షణ గైడ్", description: "రోజువారీ కార్యకలాపాలు మరియు సరిదిద్దడం వ్యూహాలు" },
            { title: "మద్దతు గ్రూప్ డైరెక్టరీ", description: "స్థానిక మరియు ఆన్‌లైన్ ప్రసవ మద్దతు గ్రూపులను కనుగొనండి" }
          ]
        }
      },
      partner: {
        en: {
          title: "Supporting Your Partner Through Diagnosis",
          description: "Partners often feel helpless when facing fertility challenges. Here's how to provide meaningful support while caring for yourself.",
          tips: [
            "Listen without trying to immediately solve problems",
            "Ask 'How can I support you today?' regularly",
            "Take care of your own emotional needs too",
            "Learn about the medical process together"
          ],
          keyPoints: [
            "Both partners are affected by fertility challenges",
            "Active listening is often more valuable than advice",
            "Supporting others requires self-care",
            "Shared understanding strengthens relationships"
          ],
          resources: [
            { title: "Partner Support Guide", description: "Communication strategies and emotional support techniques" },
            { title: "Couples Counseling Resources", description: "Finding specialized fertility counselors" }
          ]
        },
        hi: {
          title: "निदान के दौरान अपने साथी का समर्थन",
          description: "प्रजनन चुनौतियों का सामना करते समय साथी अक्सर असहाय महसूस करते हैं। अपनी देखभाल करते हुए अर्थपूर्ण सहारा कैसे दें।",
          tips: [
            "तुरंत समस्या सुलझाने की कोशिश किए बिना सुनें",
            "नियमित रूप से पूछें 'आज मैं आपका कैसे साथ दे सकता हूं?'",
            "अपनी भावनात्मक जरूरतों का भी ख्याल रखें",
            "चिकित्सा प्रक्रिया के बारे में साथ में सीखें"
          ],
          keyPoints: [
            "प्रजनन चुनौतियों से दोनों साथी प्रभावित होते हैं",
            "सक्रिय श्रवण अक्सर सलाह से अधिक मूल्यवान होता है",
            "दूसरों का समर्थन करने के लिए आत्म-देखभाल आवश्यक है",
            "साझा समझ रिश्तों को मजबूत बनाती है"
          ],
          resources: [
            { title: "साथी सहायता गाइड", description: "संचार रणनीतियां और भावनात्मक सहायता तकनीकें" },
            { title: "कपल काउंसलिंग संसाधन", description: "विशेषज्ञ प्रजनन सलाहकार खोजना" }
          ]
        },
        te: {
          title: "రోగ నిర్ధారణ సమయంలో మీ భాగస్వామికి మద్దతు",
          description: "ప్రసవ సవాళ్లను ఎదుర్కొంటున్నప్పుడు భాగస్వాములు తరచుగా నిస్సహాయంగా అనిపిస్తుంది. మిమ్మల్ని మీరు చూసుకుంటూ అర్థవంతమైన మద్దతు ఎలా అందించాలి.",
          tips: [
            "వెంటనే సమస్యలను పరిష్కరించడానికి ప్రయత్నించకుండా వినండి",
            "నియమితంగా 'ఈరోజు నేను మీకు ఎలా మద్దతు ఇవ్వగలను?' అని అడగండి",
            "మీ స్వంత భావోద్వేగ అవసరాలను కూడా చూసుకోండి",
            "వైద్య ప్రక్రియ గురించి కలిసి తెలుసుకోండి"
          ],
          keyPoints: [
            "ప్రసవ సవాళ్లు రెండు భాగస్వాములను ప్రభావితం చేస్తాయి",
            "చురుకైన వినికిడి తరచుగా సలహా కంటే విలువైనది",
            "ఇతరులకు మద్దతు ఇవ్వడానికి స్వీయ-సంరక్షణ అవసరం",
            "భాగస్వామ్య అవగాహన సంబంధాలను బలపరుస్తుంది"
          ],
          resources: [
            { title: "భాగస్వామి మద్దతు గైడ్", description: "కమ్యూనికేషన్ వ్యూహాలు మరియు భావోద్వేగ మద్దతు సాంకేతికతలు" },
            { title: "జంటల కౌన్సెలింగ్ వనరులు", description: "ప్రత్యేక ప్రసవ కౌన్సెలర్లను కనుగొనడం" }
          ]
        }
      }
    };

    const message = userMessage.toLowerCase();
    let category = 'anxiety';

    if (message.includes('wait') || message.includes('waiting') || message.includes('two week') || 
        message.includes('प्रतीक्षा') || message.includes('इंतज़ार') || 
        message.includes('వేచిచూపు') || message.includes('వేచి')) {
      category = 'wait';
    } else if (message.includes('partner') || message.includes('husband') || message.includes('wife') ||
               message.includes('साथी') || message.includes('पति') || message.includes('पत्नी') ||
               message.includes('భాగస్వామి') || message.includes('భర్త') || message.includes('భార్య')) {
      category = 'partner';
    }

    return contentTemplates[category as keyof typeof contentTemplates][language as keyof typeof contentTemplates.anxiety] || contentTemplates.anxiety.en;
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const detectedLanguage = detectScript(inputText);
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
      language: detectedLanguage
    };

    setMessages(prev => [...prev, newMessage]);

    // Generate preview content based on the message
    const preview = generatePreviewContent(inputText, detectedLanguage);
    setPreviewContent(preview);

    // Simulate Sakhi's response
    setTimeout(() => {
      const responses = {
        en: "I understand your feelings, and they're completely valid. Let me share some strategies that might help you through this.",
        hi: "मैं आपकी भावनाओं को समझती हूं, और वे पूर्णतः वैध हैं। मैं कुछ रणनीतियां साझा करती हूं जो इस दौरान आपकी मदद कर सकती हैं।",
        te: "నేను మీ భावనలను అర్థం చేసుకుంటున్నాను, మరియు అవి పూర్ణంగా చెల్లుబాటు అయ్యేవి. ఈ సమయంలో మీకు సహాయపడే కొన్ని వ్యూహాలను పంచుకుంటాను."
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[detectedLanguage as keyof typeof responses] || responses.en,
        isUser: false,
        timestamp: new Date(),
        language: detectedLanguage
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const quickPrompts = [
    { en: "I'm feeling anxious about tomorrow's scan", hi: "कल के स्कैन को लेकर चिंतित हूं", te: "రేపటి స్కాన్ గురించి ఆందోళన అనిపిస్తోంది" },
    { en: "The two-week wait is driving me crazy", hi: "दो सप्ताह का इंतज़ार मुझे परेशान कर रहा है", te: "రెండు వారాల వేచిచూపు నన్ను వేధిస్తోంది" },
    { en: "How can I support my partner through this?", hi: "इसमें अपने साथी का समर्थन कैसे करूं?", te: "దీనిలో నా భాగస్వామికి ఎలా మద్దతు ఇవ్వాలి?" }
  ];

  const currentPrompts = quickPrompts.map(p => p[selectedLanguage as keyof typeof p]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Close Button */}
      <div className="absolute top-4 right-4 z-50">
        <Link href="/sakhi">
          <Button variant="ghost" size="sm" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
            <X className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:block h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
              <ChatPanel 
                messages={messages}
                inputText={inputText}
                setInputText={setInputText}
                sendMessage={sendMessage}
                currentPrompts={currentPrompts}
                messagesEndRef={messagesEndRef}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <PreviewPanel 
                previewContent={previewContent}
                isVideoPlaying={isVideoPlaying}
                setIsVideoPlaying={setIsVideoPlaying}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                selectedLanguage={selectedLanguage}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout - Chat Panel Only */}
        <div className="lg:hidden h-full">
          <ChatPanel 
            messages={messages}
            inputText={inputText}
            setInputText={setInputText}
            sendMessage={sendMessage}
            currentPrompts={currentPrompts}
            messagesEndRef={messagesEndRef}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </div>
      </div>
    </div>
  );
};

// Chat Panel Component
const ChatPanel = ({ messages, inputText, setInputText, sendMessage, currentPrompts, messagesEndRef, selectedLanguage, setSelectedLanguage }: any) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-3 lg:p-4 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-sm lg:text-base">Chat with Sakhi</h2>
              <p className="text-xs opacity-90">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></span>
                Online and ready to help
              </p>
            </div>
          </div>
          {/* Language Selector */}
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 lg:px-3 py-1 lg:py-2 border border-white/30">
            <Globe className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border-none bg-transparent text-xs lg:text-sm text-white focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option value="en" className="text-gray-900 bg-white">EN</option>
              <option value="hi" className="text-gray-900 bg-white">हि</option>
              <option value="te" className="text-gray-900 bg-white">తె</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-4 lg:py-8 px-4">
            <Heart className="w-8 h-8 lg:w-12 lg:h-12 text-purple-300 mx-auto mb-3 lg:mb-4" />
            <h3 className="text-base lg:text-lg font-semibold text-gray-700 mb-2">Welcome to Sakhi</h3>
            <p className="text-gray-500 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed">
              I'm here to provide compassionate support for your fertility journey. 
              Type in any language - I'll respond in the same language.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-gray-400">Try asking about:</p>
              {currentPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(prompt)}
                  className="block w-full text-left p-2 lg:p-3 text-xs lg:text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} px-2 lg:px-0`}>
            <div className={`max-w-[85%] lg:max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser ? 'bg-purple-500 text-white' : 'bg-pink-100 text-pink-600'
                }`}>
                  {message.isUser ? <User className="w-3 h-3 lg:w-4 lg:h-4" /> : <Bot className="w-3 h-3 lg:w-4 lg:h-4" />}
                </div>
                <div className={`px-3 lg:px-4 py-2 rounded-2xl ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-white opacity-70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 lg:p-4 border-t border-gray-200 bg-gray-50 safe-area-padding-bottom">
        <div className="flex space-x-2 mb-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full text-sm lg:text-base h-10 lg:h-auto"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button 
            onClick={sendMessage}
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-10 w-10 lg:h-auto lg:w-auto lg:px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          <Shield className="w-3 h-3 inline mr-1" />
          All conversations are private and stay on your device
        </p>
      </div>
    </div>
  );
};

// Preview Panel Component
const PreviewPanel = ({ previewContent, isVideoPlaying, setIsVideoPlaying, isMuted, setIsMuted, selectedLanguage }: any) => {
  if (!previewContent) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Start a Conversation</h3>
          <p className="text-gray-500">
            Send a message to Sakhi and see personalized support content, tips, and resources appear here.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Partner Support</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Globe className="w-4 h-4 text-pink-500" />
              <span>Multi-language</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{previewContent.title}</h1>
          <p className="text-gray-600">{previewContent.description}</p>
        </div>

        {/* Video Section */}
        <Card className="overflow-hidden">
          <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center">
            <div className="text-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all mb-4"
              >
                <Play className={`w-6 h-6 text-purple-600 ${isVideoPlaying ? 'hidden' : 'block'}`} />
                <div className={`w-4 h-4 bg-purple-600 ${isVideoPlaying ? 'block' : 'hidden'}`} />
              </button>
              <p className="text-sm text-gray-600">
                {isVideoPlaying ? 'Playing: Breathing Exercise Video' : 'Click to play: Guided Breathing Exercise'}
              </p>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </Card>

        {/* Key Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span>Key Points to Remember</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {previewContent.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Practical Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Practical Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {previewContent.tips.map((tip, index) => (
              <div key={index} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>Additional Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {previewContent.resources.map((resource, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
                <Badge variant="secondary" className="mt-2">Learn More</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-900 mb-1">Important Notice</h4>
                <p className="text-sm text-orange-800">
                  If you're experiencing severe distress, thoughts of self-harm, or emergency symptoms, 
                  please contact a healthcare professional or emergency services immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SakhiTry;