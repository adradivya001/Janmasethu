export type Lens = 'medical'|'social'|'financial'|'nutrition';
export type Stage = 'ttc'|'pregnancy'|'postpartum'|'newborn'|'early-years';

export type Article = { 
  slug: string; 
  title: {en: string; hi?: string; te?: string}; 
  summary: {en: string; hi?: string; te?: string}; 
  stage: Stage[]; 
  lens: Lens[]; 
  readMins: number; 
  body: string[]; 
  sources: string[]; 
  reviewedBy: string 
};

export const articles: Article[] = [
  { 
    slug: 'ivf-10-min', 
    title: {
      en: "IVF in 10 Minutes: Steps, Choices, and Costs",
      hi: "10 मिनट में IVF: चरण, विकल्प और लागत",
      te: "10 నిమిషాల్లో IVF"
    }, 
    summary: {
      en: "Overview from testing to transfer, with typical ranges.",
      hi: "टेस्ट से ट्रांसफर तक का सरल सार।",
      te: "టెస్టింగ్ నుంచి ట్రాన్స్‌ఫర్ వరకు"
    }, 
    stage: ['ttc'], 
    lens: ['medical','financial'], 
    readMins: 6, 
    body: ['At a glance','Key steps','Choices','Recovery','Costs'], 
    sources: ['WHO','NHS','ICMR‑NIN'], 
    reviewedBy: 'Dr. Raghav Iyer, DNB' 
  },
  { 
    slug: 'first-trimester-scan', 
    title: {
      en: "First‑Trimester Scan: What It Checks",
      hi: "पहली तिमाही का स्कैन: क्या जाँचा जाता है",
      te: "ఫస్ట్ ట్రైమెస్టర్ స్కాన్"
    }, 
    summary: {
      en: "What the 12‑week scan looks for and what to expect.",
      hi: "12‑सप्ताह स्कैन के लक्ष्य।",
      te: "ఏమి చెక్ చేస్తారు"
    }, 
    stage: ['pregnancy'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['Why it matters','How it\'s done','Results'], 
    sources: ['NHS','WHO'], 
    reviewedBy: 'Dr. Ananya Sharma, MS OBGYN' 
  },
  { 
    slug: 'pmmvy-jsy-apply', 
    title: {
      en: "PMMVY & JSY: How to Apply",
      hi: "PMMVY व JSY: आवेदन कैसे करें",
      te: "PMMVY & JSY: అప్లై"
    }, 
    summary: {
      en: "Eligibility, documents, and step‑by‑step process.",
      hi: "पात्रता, दस्तावेज़, चरण।",
      te: "అర్హతలు, పత్రాలు, దశలు"
    }, 
    stage: ['pregnancy','postpartum'], 
    lens: ['financial'], 
    readMins: 7, 
    body: ['Eligibility','Documents','Steps','Follow‑up'], 
    sources: ['MoWCD','MoHFW'], 
    reviewedBy: 'Arjun Menon, Health Finance' 
  },
  { 
    slug: 'pregnancy-foods', 
    title: {
      en: "Safe Foods in Pregnancy: Eat / Limit / Avoid",
      hi: "गर्भावस्था में सुरक्षित भोजन: खाएँ/कम करें/परहेज़",
      te: "గర్భధారణలో సురక్షిత ఆహారం"
    }, 
    summary: {
      en: "Simple India‑aware table for home and outside.",
      hi: "सरल तालिका",
      te: "Eat/Limit/Avoid పట్టిక"
    }, 
    stage: ['pregnancy'], 
    lens: ['nutrition'], 
    readMins: 5, 
    body: ['Eat','Limit','Avoid'], 
    sources: ['ICMR‑NIN','WHO'], 
    reviewedBy: 'Ritu Malhotra, MSc Nutrition' 
  },
  { 
    slug: 'second-trimester-checklist', 
    title: {
      en: 'Second‑trimester checklist',
      hi: 'दूसरी तिमाही चेकलिस्ट',
      te: 'రెండవ ట్రైమెస్టర్ చెక్‌లిస్ట్'
    }, 
    summary: {
      en: 'Appointments, scans, planning.',
      hi: 'अपॉइंटमेंट, स्कैन, योजना।',
      te: 'అపాయింట్‌మెంట్లు, స్కాన్లు, ప్లానింగ్'
    }, 
    stage: ['pregnancy'], 
    lens: ['medical','social'], 
    readMins: 5, 
    body: ['Key appointments', 'Important scans', 'Planning ahead'], 
    sources: ['NHS'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'post-birth-warning-signs', 
    title: {
      en: 'Post‑birth warning signs',
      hi: 'प्रसवोत्तर चेतावनी संकेत',
      te: 'ప్రసవానంతర హెచ్చరిక సంకేతాలు'
    }, 
    summary: {
      en: 'When to seek urgent help.',
      hi: 'कब तत्काल सहायता लें।',
      te: 'ఎప్పుడు తక్షణ సహాయం తీసుకోవాలి'
    }, 
    stage: ['postpartum'], 
    lens: ['medical'], 
    readMins: 4, 
    body: ['Physical warning signs', 'Emotional concerns', 'When to call doctor'], 
    sources: ['WHO'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'partner-playbook', 
    title: {
      en: 'Partner playbook',
      hi: 'साथी मार्गदर्शिका',
      te: 'భాగస్వామి గైడ్‌బుక్'
    }, 
    summary: {
      en: 'Practical support ideas.',
      hi: 'व्यावहारिक सहायता विचार।',
      te: 'ప్రాక్టికల్ సపోర్ట్ ఐడియాలు'
    }, 
    stage: ['ttc','pregnancy','postpartum'], 
    lens: ['social'], 
    readMins: 4, 
    body: ['Communication tips', 'Practical support', 'Emotional care'], 
    sources: ['APA'], 
    reviewedBy: 'Dr. Karan Bedi, PhD' 
  },
  { 
    slug: 'iycf-6-months', 
    title: {
      en: 'IYCF after 6 months',
      hi: '6 महीने के बाद IYCF',
      te: '6 నెలల తర్వాత IYCF'
    }, 
    summary: {
      en: 'Textures, iron‑rich foods, allergies.',
      hi: 'बनावट, आयरन युक्त खाद्य पदार्थ, एलर्जी।',
      te: 'టెక్చర్లు, ఐరన్ రిచ్ ఫుడ్స్, అలర్జీలు'
    }, 
    stage: ['early-years'], 
    lens: ['nutrition'], 
    readMins: 6, 
    body: ['Starting solids', 'Texture progression', 'Allergy prevention'], 
    sources: ['WHO','UNICEF'], 
    reviewedBy: 'Ritu Malhotra' 
  },
  { 
    slug: 'when-to-see-specialist', 
    title: {
      en: 'When to see a fertility specialist',
      hi: 'प्रजनन विशेषज्ञ से कब मिलें',
      te: 'ఫెర్టిలిటీ స్పెషలిస్ట్‌ను ఎప్పుడు చూడాలి'
    }, 
    summary: {
      en: 'Timing & red‑flags.',
      hi: 'समय और चेतावनी संकेत।',
      te: 'టైమింగ్ & రెడ్ ఫ్లాగ్స్'
    }, 
    stage: ['ttc'], 
    lens: ['medical'], 
    readMins: 4, 
    body: ['Age considerations', 'Warning signs', 'Timing guidelines'], 
    sources: ['ASRM'], 
    reviewedBy: 'Dr. Raghav Iyer' 
  },
  { 
    slug: 'embryo-grading-basics', 
    title: {
      en: 'Embryo grading — lay guide',
      hi: 'भ्रूण ग्रेडिंग — सरल गाइड',
      te: 'ఎంబ్రియో గ్రేడింగ్ — లే గైడ్'
    }, 
    summary: {
      en: 'What grades mean simply.',
      hi: 'ग्रेड का सरल अर्थ।',
      te: 'గ్రేడ్లు సరళంగా అర్థం'
    }, 
    stage: ['ttc'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['Grading system', 'What it means', 'Success factors'], 
    sources: ['ESHRE'], 
    reviewedBy: 'Meera N., MSc Embryology' 
  },
  { 
    slug: 'ppd-signs-support', 
    title: {
      en: 'PPD signs & support',
      hi: 'PPD संकेत और सहायता',
      te: 'PPD సంకేతాలు & సపోర్ట్'
    }, 
    summary: {
      en: 'Recognise and act early.',
      hi: 'जल्दी पहचानें और कार्य करें।',
      te: 'ముందుగానే గుర్తించి చర్య తీసుకోండి'
    }, 
    stage: ['postpartum'], 
    lens: ['social'], 
    readMins: 5, 
    body: ['Warning signs', 'Getting help', 'Support systems'], 
    sources: ['NIMHANS'], 
    reviewedBy: 'Dr. Karan Bedi' 
  },
  { 
    slug: 'preeclampsia-basics', 
    title: {
      en: 'Preeclampsia basics',
      hi: 'प्रीक्लैम्पसिया बेसिक्स',
      te: 'ప్రీఎక్లాంప్సియా బేసిక్స్'
    }, 
    summary: {
      en: 'BP, symptoms, action.',
      hi: 'BP, लक्षण, कार्रवाई।',
      te: 'BP, లక్షణాలు, చర్య'
    }, 
    stage: ['pregnancy'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['Understanding preeclampsia', 'Symptoms to watch', 'Treatment options'], 
    sources: ['WHO'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'newborn-vaccines', 
    title: {
      en: 'Newborn vaccines timeline',
      hi: 'नवजात टीकाकरण समयरेखा',
      te: 'నవజాత వ్యాక్సిన్ టైమ్‌లైన్'
    }, 
    summary: {
      en: 'At birth to 6 weeks.',
      hi: 'जन्म से 6 सप्ताह तक।',
      te: 'జన్మ నుంచి 6 వారాల వరకు'
    }, 
    stage: ['newborn'], 
    lens: ['medical'], 
    readMins: 4, 
    body: ['Birth vaccines', 'First 6 weeks', 'Schedule tracking'], 
    sources: ['MoHFW'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'cost-planning-101', 
    title: {
      en: 'Cost planning 101',
      hi: 'लागत योजना 101',
      te: 'కాస్ట్ ప్లానింగ్ 101'
    }, 
    summary: {
      en: 'Budget & questions.',
      hi: 'बजट और प्रश्न।',
      te: 'బడ్జెట్ & ప్రశ్నలు'
    }, 
    stage: ['ttc'], 
    lens: ['financial'], 
    readMins: 5, 
    body: ['Budget planning', 'Insurance coverage', 'Cost questions'], 
    sources: ['NABH'], 
    reviewedBy: 'Arjun Menon' 
  },
  { 
    slug: 'cerclage-basics', 
    title: {
      en: 'Cervical cerclage — what/why',
      hi: 'सर्वाइकल सर्क्लेज — क्या/क्यों',
      te: 'సర్వైకల్ సర్క్లేజ్ — ఏమిటి/ఎందుకు'
    }, 
    summary: {
      en: 'Who might benefit.',
      hi: 'किसे फायदा हो सकता है।',
      te: 'ఎవరికి ప్రయోజనం ఉంటుంది'
    }, 
    stage: ['pregnancy'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['What is cerclage', 'Who needs it', 'Procedure details'], 
    sources: ['ACOG'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'vbac-questions-to-ask', 
    title: {
      en: 'VBAC: questions to ask',
      hi: 'VBAC: पूछने योग्य प्रश्न',
      te: 'VBAC: అడగవలసిన ప్రశ్నలు'
    }, 
    summary: {
      en: 'Balancing benefits/risks.',
      hi: 'लाभ/जोखिम संतुलन।',
      te: 'ప్రయోజనాలు/రిస్క్‌లను బ్యాలెన్స్ చేయడం'
    }, 
    stage: ['pregnancy'], 
    lens: ['medical','social'], 
    readMins: 5, 
    body: ['VBAC basics', 'Risk assessment', 'Decision making'], 
    sources: ['NICE'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  }
];