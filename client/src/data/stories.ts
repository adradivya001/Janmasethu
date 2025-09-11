export type Story = {
  slug: string;
  title: {
    en: string;
    hi: string;
    te: string;
  };
  city: {
    en: string;
    hi: string;
    te: string;
  };
  language: string;
  stage: string;
  treatment?: string;
  summary: {
    en: string;
    hi: string;
    te: string;
  };
  body: {
    en: string[];
    hi: string[];
    te: string[];
  }[]
};

export const stories: Story[] = [
  {
    slug: 'priya-ivf-mumbai',
    title: {
      en: 'Priya — first IVF, finding calm',
      hi: 'प्रिया — पहला आईवीएफ, शांति पाना',
      te: 'ప్రియా — మొదటి IVF, ప్రశాంతత పొందడం'
    },
    city: {
      en: 'Mumbai',
      hi: 'मुंबई',
      te: 'ముంబై'
    },
    language: 'Hindi',
    stage: 'stimulation',
    treatment: 'IVF',
    summary: {
      en: 'Anxious about injections; small routines helped.',
      hi: 'इंजेक्शन को लेकर चिंतित; छोटी दिनचर्या ने मदद की।',
      te: 'ఇంజెక్షన్ల గురించి ఆందోళన; చిన్న దినచర్యలు సహాయపడ్డాయి.'
    },
    body: [
      {
        en: ['Day 1 jitters…','Breathing with nurse…','Partner set up kit…','Worry windows…','Slept better before retrieval…'],
        hi: ['दिन 1 घबराहट…','नर्स के साथ साँस लेना…','साथी ने किट तैयार की…','चिंता के पल…','पुनर्प्राप्ति से पहले बेहतर नींद आई…'],
        te: ['రోజు 1 కంగారు…','నర్స్‌తో శ్వాస తీసుకోవడం…','భాగస్వామి కిట్ సిద్ధం చేసారు…','ఆందోళన విండోస్…','పునరుద్ధరణకు ముందు బాగా నిద్రపోయాను…']
      }
    ]
  },
  {
    slug: 'kavitha-tww-chennai',
    title: {
      en: 'Kavitha — two‑week wait',
      hi: 'कविता — दो सप्ताह का इंतजार',
      te: 'కవిత — రెండు వారాల నిరీక్షణ'
    },
    city: {
      en: 'Chennai',
      hi: 'चेन्नई',
      te: 'చెన్నై'
    },
    language: 'Tamil',
    stage: 'tww',
    treatment: 'IVF',
    summary: {
      en: 'Hope, fear, and coping.',
      hi: 'आशा, भय और सामना करना।',
      te: 'ఆశ, భయం మరియు ఎదుర్కోవడం.'
    },
    body: [
      {
        en: ['The waiting begins', 'Managing expectations', 'Finding support'],
        hi: ['इंतजार शुरू होता है', 'अपेक्षाओं का प्रबंधन', 'समर्थन ढूँढना'],
        te: ['నిరీక్షణ ప్రారంభమవుతుంది', 'అంచనాలను నిర్వహించడం', 'మద్దతు కనుగొనడం']
      }
    ]
  },
  {
    slug: 'ravi-diagnosis-hyd',
    title: {
      en: 'Ravi — making sense of diagnosis',
      hi: 'रवि — निदान को समझना',
      te: 'రవి — నిర్ధారణను అర్థం చేసుకోవడం'
    },
    city: {
      en: 'Hyderabad',
      hi: 'हैदराबाद',
      te: 'హైదరాబాద్'
    },
    language: 'Telugu',
    stage: 'consultation',
    summary: {
      en: 'Guilt → understanding → action.',
      hi: 'अपराधबोध → समझ → कार्य।',
      te: 'అపరాధభావన → అవగాహన → చర్య.'
    },
    body: [
      {
        en: ['Initial shock', 'Understanding the diagnosis', 'Moving forward together'],
        hi: ['प्रारंभिक सदमा', 'निदान को समझना', 'एक साथ आगे बढ़ना'],
        te: ['ప్రారంభ షాక్', 'నిర్ధారణను అర్థం చేసుకోవడం', 'కలిసి ముందుకు సాగడం']
      }
    ]
  },
  {
    slug: 'ananya-prep-delhi',
    title: {
      en: 'Ananya — starting with hope',
      hi: 'अनन्या — आशा के साथ शुरुआत',
      te: 'అనన్య — ఆశతో ప్రారంభం'
    },
    city: {
      en: 'Delhi',
      hi: 'दिल्ली',
      te: 'ఢిల్లీ'
    },
    language: 'Hindi',
    stage: 'preparation',
    summary: {
      en: 'Mixed emotions, simple plans.',
      hi: 'मिली-जुली भावनाएँ, सरल योजनाएँ।',
      te: 'మిశ్రమ భావోద్వేగాలు, సాధారణ ప్రణాళికలు.'
    },
    body: [
      {
        en: ['First consultation', 'Making plans', 'Finding hope'],
        hi: ['पहली परामर्श', 'योजनाएँ बनाना', 'आशा ढूँढना'],
        te: ['మొదటి సంప్రదింపులు', 'ప్రణాళికలు చేయడం', 'ఆశ కనుగొనడం']
      }
    ]
  },
  {
    slug: 'meera-vbac-pune',
    title: {
      en: 'Meera — VBAC journey',
      hi: 'मीरा — वीबीएसी यात्रा',
      te: 'మీరా — VBAC ప్రయాణం'
    },
    city: {
      en: 'Pune',
      hi: 'पुणे',
      te: 'పూణే'
    },
    language: 'Marathi',
    stage: 'pregnancy',
    summary: {
      en: 'Balanced risks and hopes.',
      hi: 'संतुलित जोखिम और उम्मीदें।',
      te: 'సమతుల్య నష్టాలు మరియు ఆశలు.'
    },
    body: [
      {
        en: ['Considering VBAC', 'Doctor discussions', 'Birth experience'],
        hi: ['वीबीएसी पर विचार', 'डॉक्टर की चर्चाएँ', 'जन्म का अनुभव'],
        te: ['VBAC పరిగణనలోకి తీసుకోవడం', 'డాక్టర్ చర్చలు', 'జనన అనుభవం']
      }
    ]
  },
  {
    slug: 'rahul-iui-kochi',
    title: {
      en: 'Rahul & Asha — IUI path',
      hi: 'राहुल और आशा — आईयूआई पथ',
      te: 'రాహుల్ & ఆశా — IUI మార్గం'
    },
    city: {
      en: 'Kochi',
      hi: 'कोच्चि',
      te: 'కొచ్చి'
    },
    language: 'Malayalam',
    stage: 'ttc',
    treatment: 'IUI',
    summary: {
      en: 'Choosing step‑by‑step care.',
      hi: 'कदम-दर-कदम देखभाल चुनना।',
      te: 'దశలవారీ సంరక్షణను ఎంచుకోవడం.'
    },
    body: [
      {
        en: ['Starting IUI', 'Three cycles journey', 'Success at last'],
        hi: ['आईयूआई शुरू करना', 'तीन चक्रों की यात्रा', 'आखिरकार सफलता'],
        te: ['IUI ప్రారంభించడం', 'మూడు చక్రాల ప్రయాణం', 'చివరకు విజయం']
      }
    ]
  },
  {
    slug: 'sana-postpartum-bengaluru',
    title: {
      en: 'Sana — postpartum blues to support',
      hi: 'सना — प्रसवोत्तर उदासी से समर्थन तक',
      te: 'సనా — ప్రసవానంతర నీరసం నుండి మద్దతు వరకు'
    },
    city: {
      en: 'Bengaluru',
      hi: 'बेंगलुरु',
      te: 'బెంగళూరు'
    },
    language: 'Urdu',
    stage: 'postpartum',
    summary: {
      en: 'Finding help early.',
      hi: 'जल्दी मदद ढूँढना।',
      te: 'ముందుగానే సహాయం కనుగొనడం.'
    },
    body: [
      {
        en: ['Recognizing signs', 'Seeking help', 'Recovery journey'],
        hi: ['संकेतों को पहचानना', 'मदद माँगना', 'ठीक होने की यात्रा'],
        te: ['సంకేతాలను గుర్తించడం', 'సహాయం కోరడం', 'రికవరీ ప్రయాణం']
      }
    ]
  },
  {
    slug: 'naveen-preserve-jaipur',
    title: {
      en: 'Naveen — preservation before therapy',
      hi: 'नवीन — थेरेपी से पहले संरक्षण',
      te: 'నవీన్ — చికిత్సకు ముందు సంరక్షణ'
    },
    city: {
      en: 'Jaipur',
      hi: 'जयपुर',
      te: 'జైపూర్'
    },
    language: 'Hindi',
    stage: 'pre‑treatment',
    summary: {
      en: 'Freezing with clarity.',
      hi: 'स्पष्टता के साथ फ्रीजिंग।',
      te: 'స్పష్టతతో స్తంభింపజేయడం.'
    },
    body: [
      {
        en: ['Cancer diagnosis', 'Fertility preservation', 'Hope for future'],
        hi: ['कैंसर का निदान', 'प्रजनन क्षमता संरक्षण', 'भविष्य के लिए आशा'],
        te: ['క్యాన్సర్ నిర్ధారణ', 'ఫెర్టిలిటీ ప్రిజర్వేషన్', 'భవిష్యత్తు కోసం ఆశ']
      }
    ]
  },
];