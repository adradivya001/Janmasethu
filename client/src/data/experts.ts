
export type Expert = { 
  id: string; 
  name: string; 
  role: {
    en: string;
    hi: string;
    te: string;
  } | string;
  credentials: {
    en: string;
    hi: string;
    te: string;
  } | string;
  location: {
    en: string;
    hi: string;
    te: string;
  } | string;
  reviews: Array<{
    category: {
      en: string;
      hi: string;
      te: string;
    } | string;
  }>;
  bio: {
    en: string;
    hi: string;
    te: string;
  } | string;
};

export const experts: Expert[] = [
  { 
    id: 'ananya-obgyn', 
    name: 'Dr. Ananya Sharma', 
    role: {
      en: 'OB‑GYN — Medical Reviewer',
      hi: 'प्रसूति एवं स्त्री रोग विशेषज्ञ — चिकित्सा समीक्षक',
      te: 'ప్రసూతి మరియు స్త్రీ వైద్య నిపుణుడు — వైద్య సమీక్షకుడు'
    },
    credentials: {
      en: 'MBBS, MS (OBGYN)',
      hi: 'एमबीबीएस, एमएस (प्रसूति एवं स्त्री रोग)',
      te: 'MBBS, MS (ప్రసూతి మరియు స్త్రీ వైద్యం)'
    },
    location: {
      en: 'Delhi',
      hi: 'दिल्ली',
      te: 'ఢిల్లీ'
    },
    reviews: [
      {
        category: {
          en: 'Pregnancy care',
          hi: 'गर्भावस्था देखभाल',
          te: 'గర్భధారణ సంరక్షణ'
        }
      },
      {
        category: {
          en: 'Safety',
          hi: 'सुरक्षा',
          te: 'భద్రత'
        }
      }
    ],
    bio: {
      en: 'Respectful maternity care & patient education.',
      hi: 'सम्मानजनक प्रसूति देखभाल और रोगी शिक्षा।',
      te: 'గౌరవప్రదమైన ప్రసూతి సంరక్షణ మరియు రోగి విద్య।'
    }
  },
  { 
    id: 'raghav-repro', 
    name: 'Dr. Raghav Iyer', 
    role: {
      en: 'Reproductive Medicine',
      hi: 'प्रजनन चिकित्सा',
      te: 'ప్రజనన వైద్యం'
    },
    credentials: {
      en: 'MBBS, DNB',
      hi: 'एमबीबीएस, डीएनबी',
      te: 'MBBS, DNB'
    },
    location: {
      en: 'Bengaluru',
      hi: 'बेंगलुरु',
      te: 'బెంగళూరు'
    },
    reviews: [
      {
        category: {
          en: 'IVF',
          hi: 'आईवीएफ',
          te: 'IVF'
        }
      },
      {
        category: {
          en: 'IUI',
          hi: 'आईयूआई',
          te: 'IUI'
        }
      },
      {
        category: {
          en: 'Preservation',
          hi: 'संरक्षण',
          te: 'సంరక్షణ'
        }
      }
    ],
    bio: {
      en: 'Evidence‑based fertility treatments.',
      hi: 'साक्ष्य-आधारित प्रजनन उपचार।',
      te: 'సాక్ష్య-ఆధారిత ప్రజనన చికిత్సలు।'
    }
  },
  { 
    id: 'karan-psych', 
    name: 'Dr. Karan Bedi', 
    role: {
      en: 'Perinatal Psychology',
      hi: 'प्रसवकालीन मनोविज्ञान',
      te: 'పెరినేటల్ సైకాలజీ'
    },
    credentials: {
      en: 'PhD Clinical Psychology',
      hi: 'पीएचडी नैदानिक मनोविज्ञान',
      te: 'PhD క్లినికల్ సైకాలజీ'
    },
    location: {
      en: 'Mumbai',
      hi: 'मुंबई',
      te: 'ముంబై'
    },
    reviews: [
      {
        category: {
          en: 'Mental health',
          hi: 'मानसिक स्वास्थ्य',
          te: 'మానసిక ఆరోగ్యం'
        }
      },
      {
        category: {
          en: 'Support',
          hi: 'सहारा',
          te: 'మద్దతు'
        }
      }
    ],
    bio: {
      en: 'Fertility‑aware mental health care.',
      hi: 'प्रजनन-जागरूक मानसिक स्वास्थ्य देखभाल।',
      te: 'ప్రजనన-అవగాహనతో కూడిన మానసిక ఆరోగ్య సంరక్షణ।'
    }
  },
  { 
    id: 'ritu-nutrition', 
    name: 'Ritu Malhotra', 
    role: {
      en: 'Nutrition Specialist',
      hi: 'पोषण विशेषज्ञ',
      te: 'పోషణ నిపుణుడు'
    },
    credentials: {
      en: 'MSc Clinical Nutrition',
      hi: 'एमएससी नैदानिक पोषण',
      te: 'MSc క్లినికల్ న్యూట్రిషన్'
    },
    location: {
      en: 'Chennai',
      hi: 'चेन्नई',
      te: 'చెన్నై'
    },
    reviews: [
      {
        category: {
          en: 'Nutrition',
          hi: 'पोषण',
          te: 'పోషణ'
        }
      },
      {
        category: {
          en: 'Supplements',
          hi: 'पूरक',
          te: 'సప్లిమెంట్లు'
        }
      }
    ],
    bio: {
      en: 'Pregnancy & fertility nutrition expertise.',
      hi: 'गर्भावस्था और प्रजनन पोषण विशेषज्ञता।',
      te: 'గర్భధారణ మరియు ప్రజనన పోషణ నైపుణ్యం।'
    }
  },
  { 
    id: 'arjun-finance', 
    name: 'Arjun Menon', 
    role: {
      en: 'Health Finance Advisor',
      hi: 'स्वास्थ्य वित्त सलाहकार',
      te: 'ఆరోగ్య ఆర్థిక సలహాదారు'
    },
    credentials: {
      en: 'MBA Health Management',
      hi: 'एमबीए स्वास्थ्य प्रबंधन',
      te: 'MBA హెల్త్ మేనేజ్‌మెంట్'
    },
    location: {
      en: 'Kochi',
      hi: 'कोच्चि',
      te: 'కొచ్చి'
    },
    reviews: [
      {
        category: {
          en: 'Costs',
          hi: 'लागत',
          te: 'ఖర్చులు'
        }
      },
      {
        category: {
          en: 'Insurance',
          hi: 'बीमा',
          te: 'భీమా'
        }
      },
      {
        category: {
          en: 'Schemes',
          hi: 'योजनाएं',
          te: 'పథకాలు'
        }
      }
    ],
    bio: {
      en: 'Healthcare financing & policy specialist.',
      hi: 'स्वास्थ्य वित्तपोषण और नीति विशेषज्ञ।',
      te: 'ఆరోగ్య ఆర్థిక మరియు విధాన నిపుణుడు।'
    }
  },
  { 
    id: 'meera-embryology', 
    name: 'Meera N.', 
    role: {
      en: 'Clinical Embryologist',
      hi: 'नैदानिक भ्रूणविज्ञानी',
      te: 'క్లినికల్ ఎంబ్రియాలజిస్ట్'
    },
    credentials: {
      en: 'MSc Clinical Embryology',
      hi: 'एमएससी नैदानिक भ्रूणविज्ञान',
      te: 'MSc క్లినికల్ ఎంబ్రియాలజీ'
    },
    location: {
      en: 'Hyderabad',
      hi: 'हैदराबाद',
      te: 'హైదరాబాద్'
    },
    reviews: [
      {
        category: {
          en: 'Lab procedures',
          hi: 'प्रयोगशाला प्रक्रियाएं',
          te: 'ల్యాబ్ ప్రక్రియలు'
        }
      },
      {
        category: {
          en: 'Grading',
          hi: 'ग्रेडिंग',
          te: 'గ్రేడింగ్'
        }
      }
    ],
    bio: {
      en: 'Advanced reproductive laboratory techniques.',
      hi: 'उन्नत प्रजनन प्रयोगशाला तकनीकें।',
      te: 'అధునాతన ప్రజనన ప్రయోగశాల పద్ధతులు।'
    }
  }
];
