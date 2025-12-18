import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Link } from 'wouter';
import { Send, MessageCircle, Heart, Shield, Clock, Users, Play, Volume2, VolumeX, Globe, User, Bot, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { detectScript } from '@/utils/language';
import { sendChatMessage } from '@/utils/api';

// Scoped Language Context for SakhiTry page only
interface SakhiLanguageContextType {
  lang: 'en' | 'hi' | 'te';
  setLang: (lang: 'en' | 'hi' | 'te') => void;
}

const SakhiLanguageContext = createContext<SakhiLanguageContextType | undefined>(undefined);

const useSakhiLanguage = () => {
  const context = useContext(SakhiLanguageContext);
  if (!context) {
    throw new Error('useSakhiLanguage must be used within SakhiLanguageProvider');
  }
  return context;
};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: string;
  previewContent?: PreviewContent;
  intent?: string;
}

interface PreviewContent {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  infographicUrl?: string;
  shortsUrl?: string;
  tips: string[];
  resources: { title: string; description: string; }[];
  keyPoints: string[];
  replyText?: string;
  followUpQuestions?: string[];
  intent?: string;
}

// Helper function to parse follow-up questions from backend reply
const parseFollowUpQuestions = (reply: string): { mainText: string; followUps: string[] } => {
  // Look for "Follow ups :" or "Follow-ups:" pattern (case insensitive)
  const followUpPatterns = [
    /follow\s*ups?\s*:\s*/i,
    /follow-ups?\s*:\s*/i,
    /suggested\s*questions?\s*:\s*/i
  ];
  
  let splitIndex = -1;
  for (const pattern of followUpPatterns) {
    const match = reply.match(pattern);
    if (match && match.index !== undefined) {
      splitIndex = match.index;
      break;
    }
  }
  
  if (splitIndex === -1) {
    return { mainText: reply.trim(), followUps: [] };
  }
  
  const mainText = reply.substring(0, splitIndex).trim();
  const followUpSection = reply.substring(splitIndex);
  
  // Extract questions - they're typically separated by newlines or "?"
  const followUpText = followUpSection.replace(/follow\s*-?ups?\s*:\s*/i, '').trim();
  const questions = followUpText
    .split(/[\n\r]+/)
    .map(q => q.trim())
    .filter(q => q.length > 0 && q.endsWith('?'));
  
  return { mainText, followUps: questions };
};

// Helper function to detect if URL is a YouTube Shorts or Instagram link
const isNonEmbeddableVideo = (url: string): boolean => {
  if (!url) return false;
  // YouTube Shorts
  if (url.includes('youtube.com/shorts/') || url.includes('youtu.be/') && url.includes('?')) {
    return true;
  }
  // Instagram
  if (url.includes('instagram.com') || url.includes('instagr.am')) {
    return true;
  }
  return false;
};

// Helper function to convert YouTube URL to embed format (only for regular videos)
const getYouTubeEmbedUrl = (url: string): string | undefined => {
  if (!url) return undefined;
  
  // Check if this is a Shorts or Instagram link - don't embed these
  if (isNonEmbeddableVideo(url)) {
    return undefined;
  }
  
  // Already an embed URL
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  
  // youtu.be/VIDEO_ID format (but not shorts)
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)(?:[?&]|$)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }
  
  // youtube.com/watch?v=VIDEO_ID format
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  if (videoId) {
    // Remove any extra parameters from video ID
    videoId = videoId.split('?')[0].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return undefined;
};

// Language Switcher component
const LanguageSwitcher = () => {
  const { lang, setLang } = useSakhiLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang: 'en' | 'hi' | 'te') => {
    setLang(newLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:bg-white/20 flex items-center space-x-2 px-3 py-2 rounded-lg transition-all"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{lang.toUpperCase()}</span>
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
              lang === 'en' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
              lang === 'hi' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => handleLanguageChange('te')}
            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
              lang === 'te' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            తెలుగు
          </button>
        </div>
      )}
    </div>
  );
};

// Custom hook for floating player
const useFloatingPlayer = () => {
  const [isFloating, setIsFloating] = useState(false);
  const [showFloating, setShowFloating] = useState(true);

  // This hook is no longer used as the video is always in mini player mode.
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!videoRef.current) return;

  //     const rect = videoRef.current.getBoundingClientRect();
  //     const isOutOfView = rect.bottom < 0;

  //     setIsFloating(isOutOfView);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   handleScroll(); // Check initial state

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [videoRef]);

  return { isFloating, showFloating, setShowFloating };
};

const SakhiTry = () => {
  // Scoped language state for this page only
  const [sakhiLang, setSakhiLang] = useState<'en' | 'hi' | 'te'>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  // Scroll to top when component mounts and get username and userId
  useEffect(() => {
    window.scrollTo(0, 0);
    // Retrieve username and userId from localStorage
    const storedUserName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'Anonymous';
    const storedUserId = localStorage.getItem('userId') || '';
    setUserName(storedUserName);
    setUserId(storedUserId);
    console.log('📋 Retrieved from localStorage:', { userName: storedUserName, userId: storedUserId });
  }, []);

  const [inputText, setInputText] = useState('');
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(true);
  
  // Drag state for mini player
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Regenerate preview content when language changes
  useEffect(() => {
    if (lastUserMessage) {
      const newContent = generatePreviewContent(lastUserMessage, sakhiLang);
      setPreviewContent(newContent);

      setMessages(prevMessages => 
        prevMessages.map(msg => {
          if (!msg.isUser && msg.previewContent) {
            const responses = {
              en: "I understand your feelings, and they're completely valid. Let me share some strategies that might help you through this.",
              hi: "मैं आपकी भावनाओं को समझती हूं, और वे पूर्णतः वैध हैं। मैं कुछ रणनीतियां साझा करती हूं जो इस दौरान आपकी मदद कर सकती हैं।",
              te: "నేను మీ భావనలను అర్థం చేసుకుంటున్నాను, మరియు అవి పూర్ణంగా చెల్లుబాటు అయ్యేవి. ఈ సమయంలో మీకు సహాయపడే కొన్ని వ్యూహాలను పంచుకుంటాను."
            };

            return {
              ...msg,
              text: responses[sakhiLang] || responses.en,
              previewContent: newContent
            };
          }
          return msg;
        })
      );
    }
  }, [sakhiLang, lastUserMessage]);

  // Drag handlers for mini player
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - playerPosition.x,
      y: e.clientY - playerPosition.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPlayerPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const scrollToBottom = () => {
    // Use setTimeout to ensure DOM has updated before scrolling
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
          videoUrl: "https://www.youtube.com/embed/jq_MxKVlDCU?si=D-TE7Ewsb1CCUJfS&start=10",
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
          videoUrl: "https://www.youtube.com/embed/jq_MxKVlDCU?si=D-TE7Ewsb1CCUJfS&start=10",
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
          videoUrl: "https://www.youtube.com/embed/jq_MxKVlDCU?si=D-TE7Ewsb1CCUJfS&start=10",
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
          videoUrl: "https://www.youtube.com/embed/g9WZwXSRcRU?si=ntMXZN6F7KO0i9M9&start=14",
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
          videoUrl: "https://www.youtube.com/embed/g9WZwXSRcRU?si=ntMXZN6F7KO0i9M9&start=14",
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
          videoUrl: "https://www.youtube.com/embed/g9WZwXSRcRU?si=ntMXZN6F7KO0i9M9&start=14",
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
          videoUrl: "https://www.youtube.com/embed/BseFS_zSXLw?si=ZgfqXLf2rZxyLzfB",
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
          videoUrl: "https://www.youtube.com/embed/BseFS_zSXLw?si=ZgfqXLf2rZxyLzfB",
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
          videoUrl: "https://www.youtube.com/embed/BseFS_zSXLw?si=ZgfqXLf2rZxyLzfB",
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

  // Function to send a message (can be called with text directly or uses inputText)
  const sendMessageWithText = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userQuestion = messageText.trim();
    const detectedLanguage = detectScript(userQuestion);
    
    // Add user message to chat immediately
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userQuestion,
      isUser: true,
      timestamp: new Date(),
      language: detectedLanguage
    };

    setMessages(prev => [...prev, newMessage]);
    setLastUserMessage(userQuestion);
    setInputText('');

    console.log('🔵 Send button clicked - sending to backend API:', userQuestion);

    // Call the backend API with the user's question
    try {
      console.log('🔵 Sending POST request to backend /sakhi/chat');
      
      const response = await sendChatMessage(userId, userQuestion, sakhiLang);

      console.log('📤 Sent to backend:', { 
        message: userQuestion, 
        language: sakhiLang, 
        user_id: userId 
      });

      console.log('✅ Backend response:', response);

      const botResponseText = response.reply || "I'm here to support you.";
      
      // Parse follow-up questions from the reply
      const { mainText, followUps } = parseFollowUpQuestions(botResponseText);

      // Handle video URL - separate embeddable from non-embeddable
      let embedUrl: string | undefined;
      let shortsUrl: string | undefined;
      
      if (response.youtube_link) {
        if (isNonEmbeddableVideo(response.youtube_link)) {
          // Shorts or Instagram link - show below infographic
          shortsUrl = response.youtube_link;
        } else {
          // Regular YouTube video - embed at top
          embedUrl = getYouTubeEmbedUrl(response.youtube_link);
        }
      }

      // Create preview content from backend response
      const backendPreview: PreviewContent = {
        title: response.mode ? `${response.mode.charAt(0).toUpperCase() + response.mode.slice(1)} Information` : "Sakhi Response",
        description: "",
        videoUrl: embedUrl,
        shortsUrl: shortsUrl,
        infographicUrl: response.infographic_url,
        replyText: mainText,
        followUpQuestions: followUps,
        tips: [],
        resources: [],
        keyPoints: [],
        intent: response.intent
      };
      
      setPreviewContent(backendPreview);

      // Add bot response to chat (show only intent, full content in preview)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.intent || mainText,
        isUser: false,
        timestamp: new Date(),
        language: detectedLanguage,
        previewContent: backendPreview,
        intent: response.intent
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('❌ Error calling backend API:', error);
      console.error('❌ Error details:', {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      
      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
        language: detectedLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Wrapper function that uses inputText state
  const sendMessage = () => {
    sendMessageWithText(inputText);
  };

  const quickPrompts = [
    { en: "Does age really affect our chances?", hi: "क्या उम्र वाकई हमारी संभावनाओं को प्रभावित करती है?", te: "వయస్సు నిజంగా మా సంభావ్యతలను ప్రభావితం చేస్తుందా?" },
    { en: "Healthy routines during pregnancy", hi: "गर्भावस्था के दौरान स्वस्थ दिनचर्या", te: "గర్భధారణ సమయంలో ఆరోగ్యకరమైన దినచర్య" },
    { en: "Explain me the IVF journey?", hi: "मुझे IVF यात्रा समझाएं", te: "IVF ప్రయాణాన్ని నాకు వివరించండి" }
  ];

  const currentPrompts = quickPrompts.map(p => p[sakhiLang]);

  const translations = {
    en: {
      welcome: "Welcome to Sakhi",
      intro: "I'm here to provide compassionate support for your fertility journey. Type in any language - I'll respond in the same language.",
      askAbout: "Try asking about:",
      typeMessage: "Type your message...",
      privateSecure: "All conversations are private and stay on your device",
      startConversation: "Start a Conversation",
      previewDesc: "Send a message to Sakhi and see personalized support content, tips, and resources appear here.",
      keyPoints: "Key Points to Remember",
      practicalTips: "Practical Tips",
      additionalResources: "Additional Resources",
      importantNotice: "Important Notice",
      emergencyText: "If you're experiencing severe distress, thoughts of self-harm, or emergency symptoms, please contact a healthcare professional immediately.",
      learnMore: "Learn More"
    },
    hi: {
      welcome: "सखी में आपका स्वागत है",
      intro: "मैं आपकी प्रजनन यात्रा के लिए करुणामय सहायता प्रदान करने यहाँ हूँ। किसी भी भाषा में लिखें - मैं उसी भाषा में जवाब दूंगी।",
      askAbout: "इनके बारे में पूछें:",
      typeMessage: "अपना संदेश लिखें...",
      privateSecure: "सभी बातचीत निजी हैं और आपके डिवाइस पर रहती हैं",
      startConversation: "बातचीत शुरू करें",
      previewDesc: "सखी को संदेश भेजें और यहाँ व्यक्तिगत सहायता सामग्री, सुझाव और संसाधन देखें।",
      keyPoints: "याद रखने योग्य मुख्य बातें",
      practicalTips: "व्यावहारिक सुझाव",
      additionalResources: "अतिरिक्त संसाधन",
      importantNotice: "महत्वपूर्ण सूचना",
      emergencyText: "यदि आप गंभीर संकट, आत्म-हानि के विचार, या आपातकालीन लक्षणों का अनुभव कर रहे हैं, तो कृपया तुरंत स्वास्थ्य पेशेवर से संपर्क करें।",
      learnMore: "और जानें"
    },
    te: {
      welcome: "సఖికి స్వాగతం",
      intro: "మీ ప్రసవ ప్రయాణానికి దయగల మద్దతు అందించడానికి నేను ఇక్కడ ఉన్నాను। ఏ భాషలోనైనా టైప్ చేయండి - అదే భాషలో ప్రతిస్పందిస్తాను.",
      askAbout: "వీటి గురించి అడగండి:",
      typeMessage: "మీ సందేశాన్ని టైప్ చేయండి...",
      privateSecure: "అన్ని సంభాషణలు ప్రైవేట్ మరియు మీ పరికరంలోనే ఉంటాయి",
      startConversation: "సంభాషణ ప్రారంభించండి",
      previewDesc: "సఖికి సందేశం పంపండి మరియు వ్యక్తిగత మద్దతు కంటెంట్, చిట్కాలు మరియు వనరులను ఇక్కడ చూడండి.",
      keyPoints: "గుర్తుంచుకోవలసిన ముఖ్య విషయాలు",
      practicalTips: "ఆచరణాత్మక చిట్కాలు",
      additionalResources: "అదనపు వనరులు",
      importantNotice: "ముఖ్యమైన నోటీసు",
      emergencyText: "మీరు తీవ్రమైన బాధ, స్వీయ-హాని ఆలోచనలు లేదా అత్యవసర లక్షణాలను అనుభవిస్తుంటే, దయచేసి వెంటనే ఆరోగ్య నిపుణుడిని సంప్రదించండి।",
      learnMore: "మరింత తెలుసుకోండి"
    }
  };

  const t = translations[sakhiLang];

  return (
    <SakhiLanguageContext.Provider value={{ lang: sakhiLang, setLang: setSakhiLang }}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Enhanced Header */}
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white px-6 py-2 flex items-center justify-between z-40 shadow-2xl border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">Sakhi</h3>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                try {
                  const response = await fetch("https://n8n.ottobon.in/webhook/sakhibot", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json"
                    }
                  });

                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                  const data = await response.json();
                  console.log('Webhook response:', data);
                  
                  // After successful webhook call, redirect to sakhi page
                  window.location.href = "/sakhi";
                } catch (error) {
                  console.error('Error calling webhook:', error);
                  // Still redirect even if webhook fails
                  window.location.href = "/sakhi";
                }
              }}
              className="text-white hover:bg-white/20 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all"
            >
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </div>
        </div>

        {/* Chat Panel */}
        <div className={`fixed top-20 left-0 bg-white shadow-2xl transition-all duration-300 ease-in-out z-30 ${
          isChatOpen ? 'w-full md:w-[420px]' : 'w-0'
        } overflow-hidden border-r border-gray-100 flex flex-col`}
        style={{ height: 'calc(100vh - 5rem)' }}>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-5 pt-6 pb-24" style={{ minHeight: 0 }}>
            {messages.length === 0 && (
              <div className="text-center py-8 px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.welcome}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
                  {t.intro}
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.askAbout}</p>
                  {currentPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(prompt)}
                      className="block w-full text-left p-3 text-sm bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all border border-purple-100 hover:border-purple-200 hover:shadow-md"
                    >
                      <span className="text-gray-700">"{prompt}"</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end sakhi-message-user' : 'justify-start sakhi-message-bot'} px-1`}>
                <div className={`max-w-[95%] lg:max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                      message.isUser 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                        : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600'
                    }`}>
                      {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className={`px-4 py-3 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                        message.isUser
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-purple-300/50'
                          : 'bg-white border border-gray-100 text-gray-800 shadow-md hover:shadow-gray-300/50'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-1.5 ${message.isUser ? 'text-white/80' : 'text-gray-400'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {/* Mobile Preview Content */}
                      {!message.isUser && message.previewContent && (
                        <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl border border-purple-100 p-5 space-y-5 hover:shadow-2xl transition-shadow duration-300 w-[95%] max-w-full">
                          <div className="border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-1.5">{message.previewContent.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{message.previewContent.description}</p>
                          </div>

                          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border border-purple-100">
                            <div className="aspect-video">
                              <iframe
                                width="100%"
                                height="100%"
                                src={message.previewContent.videoUrl || "https://www.youtube.com/embed/jq_MxKVlDCU?si=D-TE7Ewsb1CCUJfS&start=10"}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-full h-full"
                              ></iframe>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
                              <Heart className="w-4 h-4 text-pink-500 mr-2" />
                              {t.keyPoints}
                            </h4>
                            <div className="space-y-2.5">
                              {message.previewContent.keyPoints.map((point, index) => (
                                <div key={index} className="flex items-start space-x-2.5">
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-xs text-gray-700 leading-relaxed">{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
                              <Shield className="w-4 h-4 text-green-500 mr-2" />
                              {t.practicalTips}
                            </h4>
                            <div className="space-y-2.5">
                              {message.previewContent.tips.map((tip, index) => (
                                <div key={index} className="p-3 bg-green-50 rounded-lg border-l-3 border-green-400">
                                  <p className="text-xs text-gray-700 leading-relaxed">{tip}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
                              <Users className="w-4 h-4 text-blue-500 mr-2" />
                              {t.additionalResources}
                            </h4>
                            <div className="space-y-2.5">
                              {message.previewContent.resources.map((resource, index) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                                  <h5 className="font-semibold text-gray-900 text-xs mb-1">{resource.title}</h5>
                                  <p className="text-xs text-gray-600 leading-relaxed">{resource.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                            <div className="flex items-start space-x-2.5">
                              <Shield className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold text-orange-900 text-xs mb-1.5">{t.importantNotice}</h5>
                                <p className="text-xs text-orange-800 leading-relaxed">
                                  {t.emergencyText}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 lg:p-6 border-t border-gray-100 bg-white flex-shrink-0">
            <div className="flex space-x-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.typeMessage}
                className="flex-1 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm h-11"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                data-testid="input-message"
              />
              <Button
                onClick={sendMessage}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-11 w-11 shadow-md hover:shadow-lg transition-all"
                data-testid="button-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area - Now contains only the PreviewPanel which will render the mini-player */}
        <div className={`transition-all duration-300 pt-12 ${isChatOpen ? 'md:ml-[420px]' : 'ml-0'}`}>
          <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
            <PreviewPanel
              previewContent={previewContent}
              isVideoPlaying={isVideoPlaying}
              setIsVideoPlaying={setIsVideoPlaying}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              translations={t}
              showFloating={showFloating}
              setShowFloating={setShowFloating}
              playerPosition={playerPosition}
              onMouseDown={handleMouseDown}
              isDragging={isDragging}
              onFollowUpClick={(question) => {
                // Directly send the follow-up question
                sendMessageWithText(question);
              }}
            />
          </div>
        </div>

        {/* Mobile Chat Toggle */}
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 md:hidden gradient-button text-white rounded-full w-14 h-14 shadow-2xl z-30 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>
    </SakhiLanguageContext.Provider>
  );
};

// Preview Panel Component
interface PreviewPanelProps {
  previewContent: PreviewContent | null;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (value: boolean) => void;
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
  translations: any;
  showFloating: boolean;
  setShowFloating: (value: boolean) => void;
  playerPosition: { x: number; y: number };
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
  onFollowUpClick?: (question: string) => void;
}

const PreviewPanel = ({ previewContent, isVideoPlaying, setIsVideoPlaying, isMuted, setIsMuted, translations: t, showFloating, setShowFloating, playerPosition, onMouseDown, isDragging, onFollowUpClick }: PreviewPanelProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!previewContent) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 flex items-center justify-center p-8 lg:p-12">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{t.startConversation}</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t.previewDesc}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl border border-gray-100">
              <Shield className="w-6 h-6 text-green-500" />
              <span className="text-gray-700 font-medium">Private & Secure</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl border border-gray-100">
              <Clock className="w-6 h-6 text-blue-500" />
              <span className="text-gray-700 font-medium">24/7 Available</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl border border-gray-100">
              <Users className="w-6 h-6 text-purple-500" />
              <span className="text-gray-700 font-medium">Partner Support</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl border border-gray-100">
              <Globe className="w-6 h-6 text-pink-500" />
              <span className="text-gray-700 font-medium">Multi-language</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
        
        {/* Single Column Flow: Video → Reply → Infographic → Shorts/Instagram → Follow-ups */}
        <div className="space-y-6">
            
          {/* 1. Embedded YouTube Video (Regular Videos Only) */}
          {previewContent.videoUrl && (
            <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border border-purple-100">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={previewContent.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* 2. Reply Text */}
          {previewContent.replyText && (
            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line">
                      {previewContent.replyText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 3. Infographic Image - No separate card, just the image */}
          {previewContent.infographicUrl && (
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={previewContent.infographicUrl}
                alt="Infographic"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* 4. YouTube Shorts / Instagram Links - As clickable card */}
          {previewContent.shortsUrl && (
            <Card className="border border-blue-100 shadow-sm bg-gradient-to-br from-blue-50/50 to-purple-50/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {previewContent.shortsUrl.includes('instagram') ? 'View on Instagram' : 'Watch on YouTube'}
                    </span>
                  </div>
                  <a
                    href={previewContent.shortsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Open
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 5. Follow-up Question Buttons */}
          {previewContent.followUpQuestions && previewContent.followUpQuestions.length > 0 && (
            <Card className="border border-purple-100 shadow-sm bg-gradient-to-br from-purple-50/50 to-pink-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <span>Continue the conversation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {previewContent.followUpQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => onFollowUpClick?.(question)}
                    className="w-full text-left p-4 bg-white hover:bg-purple-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200 group shadow-sm hover:shadow-md"
                    data-testid={`button-followup-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-purple-700 font-medium">
                        {question}
                      </span>
                      <Send className="w-4 h-4 text-purple-400 group-hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Legacy sections - only show if they have content */}
        {previewContent.keyPoints && previewContent.keyPoints.length > 0 && (
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Heart className="w-6 h-6 text-pink-500" />
                <span>{t.keyPoints}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {previewContent.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {previewContent.tips && previewContent.tips.length > 0 && (
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Shield className="w-6 h-6 text-green-500" />
                <span>{t.practicalTips}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {previewContent.tips.map((tip, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                  <p className="text-gray-700 leading-relaxed">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {previewContent.resources && previewContent.resources.length > 0 && (
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Users className="w-6 h-6 text-blue-500" />
                <span>{t.additionalResources}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {previewContent.resources.map((resource, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:bg-purple-50/50 hover:border-purple-200 transition-all cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-1.5">{resource.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{resource.description}</p>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                    {t.learnMore}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SakhiTry;