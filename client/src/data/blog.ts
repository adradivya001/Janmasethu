export type Post = {
  slug: string;
  title: string;
  tags: string[];
  author: string;
  editedBy: string;
  summary: string;
  body: string[]
};

export const posts = [
  {
    slug: 'better-appointment-questions',
    title: {
      en: 'Ask better questions at appointments',
      hi: 'अपॉइंटमेंट में बेहतर प्रश्न पूछें',
      te: 'అపాయింట్‌మెంట్‌లలో మంచి ప్రశ్నలు అడగండి'
    },
    summary: {
      en: 'Tiny script to reduce overwhelm.',
      hi: 'घबराहट कम करने के लिए छोटी गाइड।',
      te: 'అధిక ఆందోళనను తగ్గించడానికి చిన్న గైడ్।'
    },
    author: {
      en: 'Editorial',
      hi: 'संपादकीय',
      te: 'సంపాదకీయం'
    },
    editedBy: {
      en: 'Meera Gupta',
      hi: 'मीरा गुप्ता',
      te: 'మీరా గుప్తా'
    },
    tags: ['ttc', 'social'],
    content: {
      en: `
        <h2>Preparation is key</h2>
        <p>Going into medical appointments with a clear list of questions helps reduce anxiety and ensures you get the information you need.</p>

        <h3>Before your appointment</h3>
        <ul>
          <li>Write down your main concerns</li>
          <li>List any symptoms you've noticed</li>
          <li>Prepare questions about next steps</li>
          <li>Bring a list of current medications</li>
        </ul>

        <h3>During the appointment</h3>
        <p>Don't be afraid to ask for clarification. Your doctor is there to help you understand your health and treatment options.</p>

        <h3>Sample questions to consider</h3>
        <ul>
          <li>What are our treatment options?</li>
          <li>What are the success rates?</li>
          <li>What should we expect from this process?</li>
          <li>When should we follow up?</li>
        </ul>
      `,
      hi: `
        <h2>तैयारी मुख्य है</h2>
        <p>प्रश्नों की स्पष्ट सूची के साथ चिकित्सा अपॉइंटमेंट में जाना चिंता को कम करने में मदद करता है और यह सुनिश्चित करता है कि आपको आवश्यक जानकारी मिले।</p>

        <h3>अपॉइंटमेंट से पहले</h3>
        <ul>
          <li>अपनी मुख्य चिंताएं लिख लें</li>
          <li>आपने जो भी लक्षण देखे हैं, उन्हें सूचीबद्ध करें</li>
          <li>अगले कदमों के बारे में प्रश्न तैयार करें</li>
          <li>वर्तमान दवाओं की सूची लेकर आएं</li>
        </ul>

        <h3>अपॉइंटमेंट के दौरान</h3>
        <p>स्पष्टीकरण मांगने से न डरें। आपका डॉक्टर आपकी सेहत और उपचार विकल्पों को समझने में मदद के लिए है।</p>

        <h3>विचार करने योग्य नमूना प्रश्न</h3>
        <ul>
          <li>हमारे उपचार विकल्प क्या हैं?</li>
          <li>सफलता दर क्या है?</li>
          <li>इस प्रक्रिया से हमें क्या उम्मीद करनी चाहिए?</li>
          <li>हमें कब फॉलो अप करना चाहिए?</li>
        </ul>
      `,
      te: `
        <h2>సిద్ధత ముఖ్యం</h2>
        <p>స్పష్టమైన ప్రశ్నల జాబితాతో వైద్య అపాయింట్‌మెంట్‌లకు వెళ్లడం ఆందోళనను తగ్గించడంలో సహాయపడుతుంది మరియు మీకు అవసరమైన సమాచారం పొందుతుందని నిర్ధారిస్తుంది.</p>

        <h3>మీ అపాయింట్‌మెంట్‌కు ముందు</h3>
        <ul>
          <li>మీ ప్రధాన ఆందోళనలను రాయండి</li>
          <li>మీరు గమనించిన లక్షణాలను జాబితా చేయండి</li>
          <li>తదుపరి దశల గురించి ప్రశ్నలను సిద్ధం చేయండి</li>
          <li>ప్రస్తుత మందుల జాబితాను తీసుకురండి</li>
        </ul>

        <h3>అపాయింట్‌మెంట్ సమయంలో</h3>
        <p>స్పష్టీకరణ అడగడానికి భయపడకండి. మీ ఆరోగ్యం మరియు చికిత్స ఎంపికలను అర్థం చేసుకోవడంలో మీకు సహాయం చేయడానికి మీ వైద్యుడు ఉన్నారు.</p>

        <h3>పరిగణించవలసిన నమూనా ప్రశ్నలు</h3>
        <ul>
          <li>మా చికిత్స ఎంపికలు ఏమిటి?</li>
          <li>విజయ రేట్లు ఎంత?</li>
          <li>ఈ ప్రక్రియ నుండి మేము ఏమి ఆశించాలి?</li>
          <li>మేము ఎప్పుడు ఫాలో అప్ చేయాలి?</li>
        </ul>
      `
    }
  },
  {
    slug: 'understanding-fertility-tests',
    title: {
      en: 'Understanding common fertility tests',
      hi: 'सामान्य प्रजनन परीक्षण समझना',
      te: 'సాధారణ ప్రజనన పరీక్షలను అర్థం చేసుకోవడం'
    },
    summary: {
      en: 'A guide to what tests might be recommended and why.',
      hi: 'कौन से परीक्षण सुझाए जा सकते हैं और क्यों, इसकी गाइड।',
      te: 'ఏ పరీక్షలు సిఫార్సు చేయబడతాయి మరియు ఎందుకు అనే గైడ్।'
    },
    author: {
      en: 'Dr. Sarah Chen',
      hi: 'डॉ. सारा चेन',
      te: 'డాక్టర్ సారా చెన్'
    },
    editedBy: {
      en: 'Raj Patel',
      hi: 'राज पटेल',
      te: 'రాజ్ పటేల్'
    },
    tags: ['medical', 'ttc'],
    content: {
      en: `
        <h2>Common fertility assessments</h2>
        <p>Understanding what tests your doctor might recommend can help you feel more prepared and less anxious about the process.</p>

        <h3>For women</h3>
        <ul>
          <li>Ovulation tracking</li>
          <li>Hormone level tests</li>
          <li>Ultrasound examinations</li>
          <li>Hysterosalpingography (HSG)</li>
        </ul>

        <h3>For men</h3>
        <ul>
          <li>Semen analysis</li>
          <li>Hormone testing</li>
          <li>Physical examination</li>
        </ul>

        <p>Remember, testing is about gathering information to help create the best treatment plan for your specific situation.</p>
      `,
      hi: `
        <h2>सामान्य प्रजनन मूल्यांकन</h2>
        <p>आपका डॉक्टर कौन से परीक्षण सुझा सकता है, इसे समझने से आप प्रक्रिया के लिए अधिक तैयार महसूस कर सकते हैं।</p>

        <h3>महिलाओं के लिए</h3>
        <ul>
          <li>ओव्यूलेशन ट्रैकिंग</li>
          <li>हार्मोन स्तर परीक्षण</li>
          <li>अल्ट्रासाउंड जांच</li>
          <li>हिस्टेरोसाल्पिंगोग्राफी (HSG)</li>
        </ul>

        <h3>पुरुषों के लिए</h3>
        <ul>
          <li>वीर्य विश्लेषण</li>
          <li>हार्मोन परीक्षण</li>
          <li>शारीरिक जांच</li>
        </ul>

        <p>याद रखें, परीक्षण आपकी विशिष्ट स्थिति के लिए सबसे अच्छी उपचार योजना बनाने में मदद के लिए जानकारी एकत्रित करने के बारे में है।</p>
      `,
      te: `
        <h2>సాధారణ ప్రజనన మూల్యాంకనలు</h2>
        <p>మీ వైద్యుడు ఏ పరీక్షలను సిఫార్సు చేయవచ్చో అర్థం చేసుకోవడం ప్రక్రియ కోసం మీరు మరింత సిద్ధంగా ఉండటానికి మరియు తక్కువ ఆందోళన చెందడానికి సహాయపడుతుంది.</p>

        <h3>మహిళలకు</h3>
        <ul>
          <li>అండోత్పత్తి ట్రాకింగ్</li>
          <li>హార్మోన్ స్థాయి పరీక్షలు</li>
          <li>అల్ట్రాసౌండ్ పరీక్షలు</li>
          <li>హిస్టెరోసాల్పింగోగ్రఫీ (HSG)</li>
        </ul>

        <h3>పురుషులకు</h3>
        <ul>
          <li>వీర్య విశ్లేషణ</li>
          <li>హార్మోన్ పరీక్ష</li>
          <li>శారీరక పరీక్ష</li>
        </ul>

        <p>గుర్తుంచుకోండి, పరీక్షలు మీ నిర్దిష్ట పరిస్థితికి ఉత్తమ చికిత్స ప్రణాళిక రూపొందించడంలో సహాయపడే సమాచారాన్ని సేకరించడం గురించి.</p>
      `
    }
  },
  {
    slug: 'nutrition-during-ttc',
    title: {
      en: 'Nutrition foundations for conception',
      hi: 'गर्भधारण के लिए पोषण आधार',
      te: 'గర్భధారణ కోసం పోషణ పునాదులు'
    },
    summary: {
      en: 'Evidence-based nutrition guidance for trying to conceive.',
      hi: 'गर्भधारण की कोशिश के लिए साक्ष्य-आधारित पोषण मार्गदर्शन।',
      te: 'గర్భధారణకు ప్రయత్నిస్తున్న వారికి సాక్ష్య-ఆధారిత పోషణ మార్గదర్శనం।'
    },
    author: {
      en: 'Nutritionist Priya Sharma',
      hi: 'पोषण विशेषज्ञ प्रिया शर्मा',
      te: 'పోషణ నిపుణుడు ప్రియా శర్మ'
    },
    editedBy: {
      en: 'Editorial Team',
      hi: 'संपादकीय टीम',
      te: 'సంపాదకీయ బృందం'
    },
    tags: ['nutrition', 'ttc'],
    content: {
      en: `
        <h2>Building nutritional foundations</h2>
        <p>Good nutrition supports your overall health and can play a role in fertility. Here are some key considerations.</p>

        <h3>Key nutrients</h3>
        <ul>
          <li>Folic acid - start before conception</li>
          <li>Iron - especially important for women</li>
          <li>Vitamin D - often deficient, consider testing</li>
          <li>Omega-3 fatty acids</li>
        </ul>

        <h3>Foods to emphasize</h3>
        <ul>
          <li>Colorful vegetables and fruits</li>
          <li>Whole grains</li>
          <li>Lean proteins</li>
          <li>Healthy fats like nuts and seeds</li>
        </ul>

        <p>Consider consulting with a registered dietitian who understands fertility nutrition for personalized guidance.</p>
      `,
      hi: `
        <h2>पोषण आधार बनाना</h2>
        <p>अच्छा पोषण आपके समग्र स्वास्थ्य का समर्थन करता है और प्रजनन क्षमता में भूमिका निभा सकता है। यहाँ कुछ मुख्य बातें हैं।</p>

        <h3>मुख्य पोषक तत्व</h3>
        <ul>
          <li>फोलिक एसिड - गर्भधारण से पहले शुरू करें</li>
          <li>आयरन - विशेष रूप से महिलाओं के लिए महत्वपूर्ण</li>
          <li>विटामिन डी - अक्सर कमी होती है, परीक्षण पर विचार करें</li>
          <li>ओमेगा-3 फैटी एसिड</li>
        </ul>

        <h3>जोर देने वाले खाद्य पदार्थ</h3>
        <ul>
          <li>रंगीन सब्जियां और फल</li>
          <li>साबुत अनाज</li>
          <li>लीन प्रोटीन</li>
          <li>स्वस्थ वसा जैसे नट्स और बीज</li>
        </ul>

        <p>व्यक्तिगत मार्गदर्शन के लिए प्रजनन पोषण को समझने वाले पंजीकृत आहार विशेषज्ञ से सलाह लेने पर विचार करें।</p>
      `,
      te: `
        <h2>పోషణ పునాదులను నిర్మించడం</h2>
        <p>మంచి పోషణ మీ మొత్తం ఆరోగ్యానికి మద్దతు ఇస్తుంది మరియు ప్రజననలో పాత్ర పోషించగలదు. ఇక్కడ కొన్ని ముఖ్య పరిగణనలు ఉన్నాయి.</p>

        <h3>ముఖ్య పోషకాలు</h3>
        <ul>
          <li>ఫోలిక్ యాసిడ్ - గర్భధారణకు ముందే ప్రారంభించండి</li>
          <li>ఐరన్ - ముఖ్యంగా మహిళలకు ముఖ్యం</li>
          <li>విటమిన్ డి - తరచుగా లోపం ఉంటుంది, పరీక్షను పరిగణించండి</li>
          <li>ఒమేగా-3 కొవ్వు ఆమ్లాలు</li>
        </ul>

        <h3>దృష్టి పెట్టవలసిన ఆహారాలు</h3>
        <ul>
          <li>రంగురంగుల కూరగాయలు మరియు పండ్లు</li>
          <li>పూర్తి ధాన్యాలు</li>
          <li>లీన్ ప్రోటీన్లు</li>
          <li>గుజ్జులు మరియు విత్తనాల వంటి ఆరోగ్యకరమైన కొవ్వులు</li>
        </ul>

        <p>వ్యక్తిగతీకరించిన మార్గదర్శనం కోసం ప్రజనన పోషణను అర్థం చేసుకునే నమోదిత డైటీషియన్‌ను సంప్రదించడాన్ని పరిగణించండి.</p>
      `
    }
  },
  {
    slug: 'managing-ttc-stress',
    title: {
      en: 'Managing stress while trying to conceive',
      hi: 'गर्भधारण की कोशिश के दौरान तनाव प्रबंधन',
      te: 'గర్భధారణకు ప్రయత్నించేటప్పుడు ఒత్తిడిని నిర్వహించడం'
    },
    summary: {
      en: 'Practical strategies for emotional wellbeing during TTC.',
      hi: 'TTC के दौरान भावनात्मक कल्याण के लिए व्यावहारिक रणनीतियां।',
      te: 'TTC సమయంలో భావోద్వేగ సంక్షేమం కోసం ఆచరణాత్మక వ్యూహాలు।'
    },
    author: {
      en: 'Dr. Maya Reddy',
      hi: 'डॉ. माया रेड्डी',
      te: 'డాక్టర్ మాయా రెడ్డి'
    },
    editedBy: {
      en: 'Counseling Team',
      hi: 'परामर्श टीम',
      te: 'కౌన్సెలింగ్ టీమ్'
    },
    tags: ['social', 'ttc'],
    content: {
      en: `
        <h2>Acknowledging TTC stress</h2>
        <p>Trying to conceive can be emotionally challenging. It's normal to experience a range of feelings during this time.</p>

        <h3>Common feelings</h3>
        <ul>
          <li>Anxiety about each cycle</li>
          <li>Frustration with the timeline</li>
          <li>Pressure from others</li>
          <li>Uncertainty about the future</li>
        </ul>

        <h3>Coping strategies</h3>
        <ul>
          <li>Practice mindfulness or meditation</li>
          <li>Maintain social connections</li>
          <li>Continue activities you enjoy</li>
          <li>Consider professional counseling</li>
        </ul>

        <p>Remember that seeking support is a sign of strength, not weakness.</p>
      `,
      hi: `
        <h2>TTC तनाव को स्वीकार करना</h2>
        <p>गर्भधारण की कोशिश करना भावनात्मक रूप से चुनौतीपूर्ण हो सकती है। इस समय के दौरान विभिन्न भावनाओं का अनुभव करना सामान्य है।</p>

        <h3>सामान्य भावनाएं</h3>
        <ul>
          <li>हर चक्र के बारे में चिंता</li>
          <li>समयसीमा के साथ निराशा</li>
          <li>दूसरों से दबाव</li>
          <li>भविष्य के बारे में अनिश्चितता</li>
        </ul>

        <h3>सामना करने की रणनीतियां</h3>
        <ul>
          <li>माइंडफुलनेस या ध्यान का अभ्यास करें</li>
          <li>सामाजिक संपर्क बनाए रखें</li>
          <li>उन गतिविधियों को जारी रखें जिनका आप आनंद लेते हैं</li>
          <li>पेशेवर परामर्श पर विचार करें</li>
        </ul>

        <p>याद रखें कि सहायता लेना कमजोरी नहीं, बल्कि ताकत का संकेत है।</p>
      `,
      te: `
        <h2>TTC ఒత్తిడిని గుర్తించడం</h2>
        <p>గర్భధారణకు ప్రయత్నించడం భావోద్వేగపరంగా సవాలుగా ఉండవచ్చు. ఈ సమయంలో వివిధ రకాల భావనలను అనుభవించడం సాధారణం.</p>

        <h3>సాధారణ భావనలు</h3>
        <ul>
          <li>ప్రతి చక్రం గురించి ఆందోళన</li>
          <li>సమయసీమతో నిరాశ</li>
          <li>ఇతరుల నుండి ఒత్తిడి</li>
          <li>భవిష్యత్తు గురించి అనిశ్చితత</li>
        </ul>

        <h3>దూకుడు వ్యూహాలు</h3>
        <ul>
          <li>మైండ్‌ఫుల్‌నెస్ లేదా ధ్యానం అభ్యసించండి</li>
          <li>సామాజిక కనెక్షన్లను కొనసాగించండి</li>
          <li>మీరు ఆనందించే కార్యకలాపాలను కొనసాగించండి</li>
          <li>వృత్తిపరమైన కౌన్సెలింగ్‌ను పరిగణించండి</li>
        </ul>

        <p>మద్దతు తీసుకోవడం బలహీనత కాదు, బలం అని గుర్తుంచుకోండి.</p>
      `
    }
  },
  {
    slug: 'male-factor-basics',
    title: {
      en: 'Understanding male factor infertility',
      hi: 'पुरुष कारक बांझपन को समझना',
      te: 'పురుష కారణ వంధ్యత్వాన్ని అర్థం చేసుకోవడం'
    },
    summary: {
      en: 'An overview of male fertility factors and assessments.',
      hi: 'पुरुष प्रजनन कारकों और मूल्यांकन का अवलोकन।',
      te: 'పురుష ప్రజనన కారకాలు మరియు అంచనాల అవలోకనం।'
    },
    author: {
      en: 'Dr. Arjun Malhotra',
      hi: 'डॉ. अर्जुन मल्होत्रा',
      te: 'డాక్టర్ అర్జున్ మల్హోత్రా'
    },
    editedBy: {
      en: 'Medical Review Board',
      hi: 'चिकित्सा समीक्षा बोर्ड',
      te: 'వైద్య సమీక్ష బోర్డ్'
    },
    tags: ['medical', 'ttc'],
    content: {
      en: `
        <h2>Male fertility factors</h2>
        <p>Male factors contribute to fertility challenges in about 40-50% of couples. Understanding these factors can help with treatment planning.</p>

        <h3>Common assessments</h3>
        <ul>
          <li>Semen analysis - the primary screening test</li>
          <li>Physical examination</li>
          <li>Hormone testing when indicated</li>
          <li>Genetic testing in specific situations</li>
        </ul>

        <h3>Lifestyle considerations</h3>
        <ul>
          <li>Maintaining a healthy weight</li>
          <li>Regular exercise (but not excessive)</li>
          <li>Limiting alcohol and tobacco</li>
          <li>Managing stress</li>
        </ul>

        <p>Many male fertility issues can be addressed with appropriate treatment.</p>
      `,
      hi: `
        <h2>पुरुष प्रजनन कारक</h2>
        <p>पुरुष कारक लगभग 40-50% जोड़ों में प्रजनन चुनौतियों में योगदान करते हैं। इन कारकों को समझना उपचार योजना में मदद कर सकता है।</p>

        <h3>सामान्य मूल्यांकन</h3>
        <ul>
          <li>वीर्य विश्लेषण - प्राथमिक स्क्रीनिंग परीक्षण</li>
          <li>शारीरिक जांच</li>
          <li>जब संकेत मिले तो हार्मोन परीक्षण</li>
          <li>विशिष्ट स्थितियों में आनुवंशिक परीक्षण</li>
        </ul>

        <h3>जीवनशैली विचार</h3>
        <ul>
          <li>स्वस्थ वजन बनाए रखना</li>
          <li>नियमित व्यायाम (लेकिन अत्यधिक नहीं)</li>
          <li>शराब और तंबाकू सीमित करना</li>
          <li>तनाव प्रबंधन</li>
        </ul>

        <p>कई पुरुष प्रजनन समस्याओं को उपयुक्त उपचार से संबोधित किया जा सकता है।</p>
      `,
      te: `
        <h2>పురుష ప్రజనన కారకాలు</h2>
        <p>పురుష కారకాలు దాదాపు 40-50% జంటలలో ప్రజనన సవాళ్లకు దోహదపడతాయి. ఈ కారకాలను అర్థం చేసుకోవడం చికిత్స ప్రణాళికలో సహాయపడుతుంది.</p>

        <h3>సాధారణ అంచనాలు</h3>
        <ul>
          <li>వీర్య విశ్లేషణ - ప్రాథమిక స్క్రీనింగ్ పరీక్ష</li>
          <li>శారీరక పరీక్ష</li>
          <li>సూచించినప్పుడు హార్మోన్ పరీక్ష</li>
          <li>నిర్దిష్ట పరిస్థితులలో జన్యు పరీక్ష</li>
        </ul>

        <h3>జీవనశైలి పరిగణనలు</h3>
        <ul>
          <li>ఆరోగ్యకరమైన బరువును నిర్వహించడం</li>
          <li>క్రమ తప్పకుండా వ్యాయామం (కానీ అధికంగా కాదు)</li>
          <li>మద్యం మరియు పొగాకును పరిమితం చేయడం</li>
          <li>ఒత్తిడిని నిర్వహించడం</li>
        </ul>

        <p>అనేక పురుష ప్రజనన సమస్యలను తగిన చికిత్సతో పరిష్కరించవచ్చు.</p>
      `
    }
  },
  {
    slug: 'second-trimester-guide',
    title: {
      en: 'Second trimester: What to expect',
      hi: 'दूसरी तिमाही: क्या उम्मीद करें',
      te: 'రెండవ ట్రైమెస్టర్: ఏమి ఆశించాలి'
    },
    summary: {
      en: 'A comprehensive guide to the middle months of pregnancy.',
      hi: 'गर्भावस्था के मध्य महीनों का व्यापक गाइड।',
      te: 'గర్భావస్థ మధ్య నెలల సమగ్ర గైడ్।'
    },
    author: {
      en: 'Dr. Kavitha Nair',
      hi: 'डॉ. कविता नायर',
      te: 'డాక్టర్ కవిత నాయర్'
    },
    editedBy: {
      en: 'OB-GYN Panel',
      hi: 'OB-GYN पैनल',
      te: 'OB-GYN ప్యానెల్'
    },
    tags: ['pregnancy', 'medical'],
    content: {
      en: `
        <h2>The second trimester</h2>
        <p>Often called the "golden period" of pregnancy, the second trimester typically brings relief from early pregnancy symptoms.</p>

        <h3>Common changes (weeks 13-26)</h3>
        <ul>
          <li>Decreased nausea for most women</li>
          <li>Increased energy levels</li>
          <li>Growing belly becomes more noticeable</li>
          <li>You may start feeling fetal movements</li>
        </ul>

        <h3>Important appointments</h3>
        <ul>
          <li>Anatomy scan (around 18-22 weeks)</li>
          <li>Glucose screening (around 24-28 weeks)</li>
          <li>Regular prenatal check-ups</li>
        </ul>

        <p>This is often a good time to start thinking about birth preferences and preparing for the third trimester.</p>
      `,
      hi: `
        <h2>दूसरी तिमाही</h2>
        <p>अक्सर गर्भावस्था की "स्वर्ण अवधि" कहा जाता है, दूसरी तिमाही आमतौर पर प्रारंभिक गर्भावस्था के लक्षणों से राहत लाती है।</p>

        <h3>सामान्य परिवर्तन (सप्ताह 13-26)</h3>
        <ul>
          <li>अधिकांश महिलाओं में मतली में कमी</li>
          <li>ऊर्जा के स्तर में वृद्धि</li>
          <li>बढ़ता पेट अधिक दिखाई देना</li>
          <li>आप भ्रूण की हलचल महसूस करना शुरू कर सकती हैं</li>
        </ul>

        <h3>महत्वपूर्ण अपॉइंटमेंट</h3>
        <ul>
          <li>एनाटॉमी स्कैन (लगभग 18-22 सप्ताह)</li>
          <li>ग्लूकोज स्क्रीनिंग (लगभग 24-28 सप्ताह)</li>
          <li>नियमित प्रसवपूर्व जांच</li>
        </ul>

        <p>यह अक्सर प्रसव वरीयताओं के बारे में सोचना शुरू करने और तीसरी तिमाही की तैयारी के लिए एक अच्छा समय होता है।</p>
      `,
      te: `
        <h2>రెండవ ట్రైమెస్టర్</h2>
        <p>గర్భావస్థ యొక్క "గోల్డెన్ పిరియడ్" అని పిలవబడే రెండవ ట్రైమెస్టర్ సాధారణంగా ప్రారంభ గర్భధారణ లక్షణాల నుండి ఉపశమనం తెస్తుంది.</p>

        <h3>సాధారణ మార్పులు (వారాలు 13-26)</h3>
        <ul>
          <li>చాలా మంది మహిళల్లో వికారం తగ్గడం</li>
          <li>శక్తి స్థాయిలు పెరుగుట</li>
          <li>పెరుగుతున్న కడుపు మరింత గమనించదగ్గదిగా మారడం</li>
          <li>మీరు పిండ కదలికలను అనుభవించడం ప్రారంభించవచ్చు</li>
        </ul>

        <h3>ముఖ్యమైన అపాయింట్‌మెంట్‌లు</h3>
        <ul>
          <li>అనాటమీ స్కాన్ (దాదాపు 18-22 వారాలు)</li>
          <li>గ్లూకోజ్ స్క్రీనింగ్ (దాదాపు 24-28 వారాలు)</li>
          <li>క్రమ తప్పకుండా ప్రసవానికి ముందు తనిఖీలు</li>
        </ul>

        <p>ఇది తరచుగా జన్మ ప్రాధాన్యతల గురించి ఆలోచించడం ప్రారంభించడానికి మరియు మూడవ ట్రైమెస్టర్‌కు సిద్ధం కావడానికి మంచి సమయం.</p>
      `
    }
  }
];