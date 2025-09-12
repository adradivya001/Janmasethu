
export interface Treatment {
  id: string;
  title: {
    en: string;
    hi: string;
    te: string;
  };
  description: {
    en: string;
    hi: string;
    te: string;
  };
  overview: {
    en: string;
    hi: string;
    te: string;
  };
  whoMightBenefit: {
    en: string[];
    hi: string[];
    te: string[];
  };
  processSteps: {
    en: string[];
    hi: string[];
    te: string[];
  };
  successRates: {
    en: string;
    hi: string;
    te: string;
  };
  costs: {
    en: string;
    hi: string;
    te: string;
  };
  timeline: {
    en: string;
    hi: string;
    te: string;
  };
  sideEffects: {
    en: string[];
    hi: string[];
    te: string[];
  };
  preparationTips: {
    en: string[];
    hi: string[];
    te: string[];
  };
  reviewedBy: {
    en: string;
    hi: string;
    te: string;
  };
}

export const treatments: Treatment[] = [
  {
    id: "iui",
    title: {
      en: "IUI (Intrauterine Insemination)",
      hi: "IUI (अंतर्गर्भाशयी गर्भाधान)",
      te: "IUI (గర్భాశయంలో కృత్రిమ గర్భధారణ)"
    },
    description: {
      en: "Washed sperm placed in uterus around ovulation.",
      hi: "ओव्यूलेशन के समय धुले हुए शुक्राणु को गर्भाशय में रखा जाता है।",
      te: "అండోత్సర్గ సమయంలో శుభ్రపరచిన స్పెర్మ్‌ను గర్భాశయంలో ఉంచడం।"
    },
    overview: {
      en: "IUI is a fertility treatment where specially prepared sperm is placed directly into the uterus during ovulation to increase the chances of fertilization.",
      hi: "IUI एक प्रजनन उपचार है जहां विशेष रूप से तैयार शुक्राणु को ओव्यूलेशन के दौरान सीधे गर्भाशय में रखा जाता है ताकि निषेचन की संभावना बढ़ सके।",
      te: "IUI అనేది ఫెర్టిలిటీ చికిత్స, ఇందులో ప్రత్యేకంగా తయారు చేసిన స్పెర్మ్‌ను అండోత్సర్గ సమయంలో నేరుగా గర్భాశయంలో ఉంచి ఫెర్టిలైజేషన్ అవకాశాలను పెంచుతారు।"
    },
    whoMightBenefit: {
      en: [
        "Unexplained infertility",
        "Mild male-factor",
        "Cervical issues"
      ],
      hi: [
        "अस्पष्ट बांझपन",
        "हल्की पुरुष कारक समस्या",
        "गर्भाशय ग्रीवा की समस्याएं"
      ],
      te: [
        "అవ్యక్త వంధ్యత",
        "తేలికపాటి పురుష కారక సమస్యలు",
        "గర్భాశయ మెడ సమస్యలు"
      ]
    },
    processSteps: {
      en: [
        "Track ovulation",
        "Trigger (if advised)",
        "Lab washing",
        "Insemination (OPD)",
        "Two-week wait"
      ],
      hi: [
        "ओव्यूलेशन ट्रैक करना",
        "ट्रिगर इंजेक्शन (यदि सलाह दी गई)",
        "लैब में स्पर्म वॉशिंग",
        "इन्सेमिनेशन (OPD में)",
        "दो सप्ताह का इंतजार"
      ],
      te: [
        "అండోత్సర్గ ట్రాకింగ్",
        "ట్రిగ్గర్ ఇంజెక్షన్ (సలహా ఇస్తే)",
        "లాబ్‌లో స్పెర్మ్ వాషింగ్",
        "ఇన్సెమినేషన్ (OPD లో)",
        "రెండు వారాల వేచిచూపు"
      ]
    },
    successRates: {
      en: "15-20% per cycle for couples under 35",
      hi: "35 वर्ष से कम उम्र के जोड़ों के लिए प्रति चक्र 15-20%",
      te: "35 ఏళ్లలోపు జంటలకు చక్రానికి 15-20%"
    },
    costs: {
      en: "₹8,000-15,000 per cycle (excluding medications)",
      hi: "प्रति चक्र ₹8,000-15,000 (दवाओं को छोड़कर)",
      te: "చక్రానికి ₹8,000-15,000 (మందులు తప్ప)"
    },
    timeline: {
      en: "2-3 weeks per cycle",
      hi: "प्रति चक्र 2-3 सप्ताह",
      te: "చక్రానికి 2-3 వారాలు"
    },
    sideEffects: {
      en: [
        "Mild cramping after procedure",
        "Spotting",
        "Multiple pregnancy risk (if fertility drugs used)"
      ],
      hi: [
        "प्रक्रिया के बाद हल्की ऐंठन",
        "हल्की रक्तस्राव",
        "बहुगर्भ का जोखिम (यदि प्रजनन दवाओं का उपयोग)"
      ],
      te: [
        "ప్రక్రియ తర్వాత తేలికపాటి నొప్పులు",
        "కొద్దిగా రక్తస్రావం",
        "బహుళ గర్భం ప్రమాదం (ఫెర్టిలిటీ మందులు వాడితే)"
      ]
    },
    preparationTips: {
      en: [
        "Take folic acid supplements",
        "Maintain healthy weight",
        "Avoid smoking and excessive alcohol",
        "Track your cycles"
      ],
      hi: [
        "फोलिक एसिड सप्लीमेंट लें",
        "स्वस्थ वजन बनाए रखें",
        "धूम्रपान और अधिक शराब से बचें",
        "अपने चक्र को ट्रैक करें"
      ],
      te: [
        "ఫోలిక్ యాసిడ్ సప్లిమెంట్స్ తీసుకోండి",
        "ఆరోగ్యకరమైన బరువు కలిగి ఉండండి",
        "ధూమపానం మరియు అధిక మద్యం తప్పించండి",
        "మీ చక్రాలను ట్రాక్ చేయండి"
      ]
    },
    reviewedBy: {
      en: "Reviewed by (reviewer)",
      hi: "समीक्षाकर्ता द्वारा समीक्षित",
      te: "సమీక్షకుడు ద్వారా సమీక్షించబడింది"
    }
  },
  {
    id: "ivf",
    title: {
      en: "IVF (In Vitro Fertilization)",
      hi: "IVF (इन विट्रो फर्टिलाइजेशन)",
      te: "IVF (ఇన్ విట్రో ఫెర్టిలైజేషన్)"
    },
    description: {
      en: "Eggs and sperm combined in lab, resulting embryos transferred to uterus.",
      hi: "अंडे और शुक्राणु को लैब में मिलाया जाता है, परिणामी भ्रूण को गर्भाशय में स्थानांतरित किया जाता है।",
      te: "గుడ్లు మరియు స్పెర్మ్‌ను లాబ్‌లో కలిపి, ఫలితంగా వచ్చిన పిండాలను గర్భాశయంలో ట్రాన్స్‌ఫర్ చేస్తారు।"
    },
    overview: {
      en: "IVF is a complex fertility treatment involving egg retrieval, fertilization in a laboratory, and embryo transfer back to the uterus.",
      hi: "IVF एक जटिल प्रजनन उपचार है जिसमें अंडे का संग्रह, प्रयोगशाला में निषेचन, और भ्रूण को वापस गर्भाशय में स्थानांतरित करना शामिल है।",
      te: "IVF అనేది సంక్లిష్టమైన ఫెర్టిలిటీ చికిత్స, ఇందులో గుడ్ల తీయడం, లాబ్‌లో ఫెర్టిలైజేషన్ మరియు పిండాన్ని తిరిగి గర్భాశయంలో ట్రాన్స్‌ఫర్ చేయడం ఉంటుంది।"
    },
    whoMightBenefit: {
      en: [
        "Blocked fallopian tubes",
        "Severe male factor",
        "Endometriosis",
        "Failed IUI cycles"
      ],
      hi: [
        "बंद फैलोपियन ट्यूब",
        "गंभीर पुरुष कारक",
        "एंडोमेट्रियोसिस",
        "असफल IUI चक्र"
      ],
      te: [
        "మూసుకుపోయిన ఫెలోపియన్ ట్యూబ్స్",
        "తీవ్రమైన పురుష కారకం",
        "ఎండోమెట్రియోసిస్",
        "విఫలమైన IUI చక్రాలు"
      ]
    },
    processSteps: {
      en: [
        "Ovarian stimulation",
        "Egg retrieval",
        "Fertilization",
        "Embryo culture",
        "Embryo transfer"
      ],
      hi: [
        "अंडाशय उत्तेजना",
        "अंडे का संग्रह",
        "निषेचन",
        "भ्रूण संवर्धन",
        "भ्रूण स्थानांतरण"
      ],
      te: [
        "అండాశయ ప్రేరణ",
        "గుడ్ల తీయడం",
        "ఫెర్టిలైజేషన్",
        "పిండ కల్చర్",
        "పిండ ట్రాన్స్‌ఫర్"
      ]
    },
    successRates: {
      en: "40-45% per cycle for women under 35",
      hi: "35 वर्ष से कम उम्र की महिलाओं के लिए प्रति चक्र 40-45%",
      te: "35 ఏళ్లలోపు మహిళలకు చక్రానికి 40-45%"
    },
    costs: {
      en: "₹1,20,000-2,50,000 per cycle",
      hi: "प्रति चक्र ₹1,20,000-2,50,000",
      te: "చక్రానికి ₹1,20,000-2,50,000"
    },
    timeline: {
      en: "4-6 weeks per cycle",
      hi: "प्रति चक्र 4-6 सप्ताह",
      te: "చక్రానికి 4-6 వారాలు"
    },
    sideEffects: {
      en: [
        "Ovarian hyperstimulation syndrome (rare)",
        "Multiple pregnancy",
        "Ectopic pregnancy risk"
      ],
      hi: [
        "अंडाशय अति-उत्तेजना सिंड्रोम (दुर्लभ)",
        "बहुगर्भ",
        "अस्थानिक गर्भावस्था का जोखिम"
      ],
      te: [
        "అండాశయ హైపర్‌స్టిమ్యులేషన్ సిండ్రోమ్ (అరుదు)",
        "బహుళ గర్భం",
        "ఎక్టోపిక్ గర్భం ప్రమాదం"
      ]
    },
    preparationTips: {
      en: [
        "Start folic acid 3 months before",
        "Maintain healthy lifestyle",
        "Reduce stress",
        "Follow doctor's medication schedule"
      ],
      hi: [
        "3 महीने पहले से फोलिक एसिड शुरू करें",
        "स्वस्थ जीवनशैली बनाए रखें",
        "तनाव कम करें",
        "डॉक्टर की दवा अनुसूची का पालन करें"
      ],
      te: [
        "3 నెలల ముందుగా ఫోలిక్ యాసిడ్ ప్రారంభించండి",
        "ఆరోగ్యకరమైన జీవనశైలి కొనసాగించండి",
        "ఒత్తిడిని తగ్గించండి",
        "వైద్యుని మందుల షెడ్యూల్ అనుసరించండి"
      ]
    },
    reviewedBy: {
      en: "Reviewed by (reviewer)",
      hi: "समीक्षाकर्ता द्वारा समीक्षित",
      te: "సమీక్షకుడు ద్వారా సమీక్షించబడింది"
    }
  },
  {
    id: "icsi",
    title: {
      en: "ICSI (Intracytoplasmic Sperm Injection)",
      hi: "ICSI (इंट्रासाइटोप्लाज्मिक स्पर्म इंजेक्शन)",
      te: "ICSI (ఇంట్రాసైటోప్లాజ్మిక్ స్పెర్మ్ ఇంజెక్షన్)"
    },
    description: {
      en: "Single sperm injected directly into egg for fertilization.",
      hi: "निषेचन के लिए एक शुक्राणु को सीधे अंडे में इंजेक्ट किया जाता है।",
      te: "ఫెర్టిలైజేషన్ కోసం ఒకే స్పెర్మ్‌ను నేరుగా గుడ్డులో ఇంజెక్ట్ చేస్తారు।"
    },
    overview: {
      en: "ICSI is a specialized form of IVF where a single sperm is injected directly into an egg to overcome severe male fertility issues.",
      hi: "ICSI IVF का एक विशेष रूप है जहां गंभीर पुरुष प्रजनन समस्याओं को दूर करने के लिए एक शुक्राणु को सीधे अंडे में इंजेक्ट किया जाता है।",
      te: "ICSI అనేది IVF యొక్క ప్రత్యేక రూపం, ఇందులో తీవ్రమైన పురుష ఫెర్టిలిటీ సమస్యలను అధిగమించడానికి ఒకే స్పెర్మ్‌ను నేరుగా గుడ్డులో ఇంజెక్ట్ చేస్తారు।"
    },
    whoMightBenefit: {
      en: [
        "Severe male factor infertility",
        "Low sperm count",
        "Poor sperm motility",
        "Previous IVF fertilization failure"
      ],
      hi: [
        "गंభीर पुरुष कारक बांझपन",
        "कम शुक्राणु संख्या",
        "खराब शुक्राणु गतिशीलता",
        "पिछली IVF निषेचन विफलता"
      ],
      te: [
        "తీవ్రమైన పురుష కారక వంధ్యత",
        "తక్కువ స్పెర్మ్ కౌంట్",
        "దృష్ట స్పెర్మ్ కదలిక",
        "మునుపటి IVF ఫెర్టిలైజేషన్ వైఫల్యం"
      ]
    },
    processSteps: {
      en: [
        "Ovarian stimulation",
        "Egg retrieval",
        "Sperm preparation",
        "ICSI procedure",
        "Embryo transfer"
      ],
      hi: [
        "अंडाशय उत्तेजना",
        "अंडे का संग्रह",
        "शुक्राणु तैयारी",
        "ICSI प्रक्रिया",
        "भ्रूण स्थानांतरण"
      ],
      te: [
        "అండాశయ ప్రేరణ",
        "గుడ్ల తీయడం",
        "స్పెర్మ్ తయారీ",
        "ICSI ప్రక్రియ",
        "పిండ ట్రాన్స్‌ఫర్"
      ]
    },
    successRates: {
      en: "Similar to IVF - 40-45% per cycle for women under 35",
      hi: "IVF के समान - 35 वर्ष से कम उम्र की महिलाओं के लिए प्रति चक्र 40-45%",
      te: "IVF మాదిరిగానే - 35 ఏళ్లలోపు మహిళలకు చక్రానికి 40-45%"
    },
    costs: {
      en: "₹1,50,000-3,00,000 per cycle (higher than regular IVF)",
      hi: "प्रति चक्र ₹1,50,000-3,00,000 (नियमित IVF से अधिक)",
      te: "చక్రానికి ₹1,50,000-3,00,000 (సాధారణ IVF కంటే ఎక్కువ)"
    },
    timeline: {
      en: "4-6 weeks per cycle",
      hi: "प्रति चक्र 4-6 सप्ताह",
      te: "చక్రానికి 4-6 వారాలు"
    },
    sideEffects: {
      en: [
        "Same as IVF",
        "Slightly higher risk of genetic abnormalities",
        "Multiple pregnancy risk"
      ],
      hi: [
        "IVF के समान",
        "आनुवंशिक असामान्यताओं का थोड़ा अधिक जोखिम",
        "बहुगर्भ का जोखिम"
      ],
      te: [
        "IVF మాదిరిగానే",
        "జన్యుపరమైన అసాధారణతల ప్రమాదం కొంచెం ఎక్కువ",
        "బహుళ గర్భం ప్రమాదం"
      ]
    },
    preparationTips: {
      en: [
        "Same as IVF preparation",
        "Partner may need additional sperm analysis",
        "Consider genetic counseling if advised"
      ],
      hi: [
        "IVF तैयारी के समान",
        "साथी को अतिरिक्त शुक्राणु विश्लेषण की आवश्यकता हो सकती है",
        "यदि सलाह दी गई हो तो आनुवंशिक परामर्श पर विचार करें"
      ],
      te: [
        "IVF తయారీ మాదిరిగానే",
        "భాగస్వామికి అదనపు స్పెర్మ్ విశ్లేషణ అవసరం కావచ్చు",
        "సలహా ఇస్తే జన్యుపరమైన కౌన్సెలింగ్ పరిగణించండి"
      ]
    },
    reviewedBy: {
      en: "Reviewed by (reviewer)",
      hi: "समीक्षाकर्ता द्वारा समीक्षित",
      te: "సమీక్షకుడు ద్వారా సమీక్షించబడింది"
    }
  }
];
