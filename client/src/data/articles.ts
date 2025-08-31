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
    title: {en: "IVF in 10 Minutes: Steps, Choices, and Costs"}, 
    summary: {en: "Overview from testing to transfer, with typical ranges."}, 
    stage: ['ttc'], 
    lens: ['medical','financial'], 
    readMins: 6, 
    body: ['At a glance','Key steps','Choices','Recovery','Costs'], 
    sources: ['WHO','NHS','ICMR‑NIN'], 
    reviewedBy: 'Dr. Raghav Iyer, DNB' 
  },
  { 
    slug: 'first-trimester-scan', 
    title: {en: "First‑Trimester Scan: What It Checks"}, 
    summary: {en: "What the 12‑week scan looks for and what to expect."}, 
    stage: ['pregnancy'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['Why it matters','How it\'s done','Results'], 
    sources: ['NHS','WHO'], 
    reviewedBy: 'Dr. Ananya Sharma, MS OBGYN' 
  },
  { 
    slug: 'pmmvy-jsy-apply', 
    title: {en: "PMMVY & JSY: How to Apply"}, 
    summary: {en: "Eligibility, documents, and step‑by‑step process."}, 
    stage: ['pregnancy','postpartum'], 
    lens: ['financial'], 
    readMins: 7, 
    body: ['Eligibility','Documents','Steps','Follow‑up'], 
    sources: ['MoWCD','MoHFW'], 
    reviewedBy: 'Arjun Menon, Health Finance' 
  },
  { 
    slug: 'pregnancy-foods', 
    title: {en: "Safe Foods in Pregnancy: Eat / Limit / Avoid"}, 
    summary: {en: "Simple India‑aware table for home and outside."}, 
    stage: ['pregnancy'], 
    lens: ['nutrition'], 
    readMins: 5, 
    body: ['Eat','Limit','Avoid'], 
    sources: ['ICMR‑NIN','WHO'], 
    reviewedBy: 'Ritu Malhotra, MSc Nutrition' 
  },
  { 
    slug: 'second-trimester-checklist', 
    title: {en: 'Second‑trimester checklist'}, 
    summary: {en: 'Appointments, scans, planning.'}, 
    stage: ['pregnancy'], 
    lens: ['medical','social'], 
    readMins: 5, 
    body: ['Key appointments', 'Important scans', 'Planning ahead'], 
    sources: ['NHS'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'post-birth-warning-signs', 
    title: {en: 'Post‑birth warning signs'}, 
    summary: {en: 'When to seek urgent help.'}, 
    stage: ['postpartum'], 
    lens: ['medical'], 
    readMins: 4, 
    body: ['Physical warning signs', 'Emotional concerns', 'When to call doctor'], 
    sources: ['WHO'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'partner-playbook', 
    title: {en: 'Partner playbook'}, 
    summary: {en: 'Practical support ideas.'}, 
    stage: ['ttc','pregnancy','postpartum'], 
    lens: ['social'], 
    readMins: 4, 
    body: ['Communication tips', 'Practical support', 'Emotional care'], 
    sources: ['APA'], 
    reviewedBy: 'Dr. Karan Bedi, PhD' 
  },
  { 
    slug: 'iycf-6-months', 
    title: {en: 'IYCF after 6 months'}, 
    summary: {en: 'Textures, iron‑rich foods, allergies.'}, 
    stage: ['early-years'], 
    lens: ['nutrition'], 
    readMins: 6, 
    body: ['Starting solids', 'Texture progression', 'Allergy prevention'], 
    sources: ['WHO','UNICEF'], 
    reviewedBy: 'Ritu Malhotra' 
  },
  { 
    slug: 'when-to-see-specialist', 
    title: {en: 'When to see a fertility specialist'}, 
    summary: {en: 'Timing & red‑flags.'}, 
    stage: ['ttc'], 
    lens: ['medical'], 
    readMins: 4, 
    body: ['Age considerations', 'Warning signs', 'Timing guidelines'], 
    sources: ['ASRM'], 
    reviewedBy: 'Dr. Raghav Iyer' 
  },
  { 
    slug: 'embryo-grading-basics', 
    title: {en: 'Embryo grading — lay guide'}, 
    summary: {en: 'What grades mean simply.'}, 
    stage: ['ttc'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['Grading system', 'What it means', 'Success factors'], 
    sources: ['ESHRE'], 
    reviewedBy: 'Meera N., MSc Embryology' 
  },
  { 
    slug: 'ppd-signs-support', 
    title: {en: 'PPD signs & support'}, 
    summary: {en: 'Recognise and act early.'}, 
    stage: ['postpartum'], 
    lens: ['social'], 
    readMins: 5, 
    body: ['Warning signs', 'Getting help', 'Support systems'], 
    sources: ['NIMHANS'], 
    reviewedBy: 'Dr. Karan Bedi' 
  },
  { 
    slug: 'preeclampsia-basics', 
    title: {en: 'Preeclampsia basics'}, 
    summary: {en: 'BP, symptoms, action.'}, 
    stage: ['pregnancy'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['Understanding preeclampsia', 'Symptoms to watch', 'Treatment options'], 
    sources: ['WHO'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'newborn-vaccines', 
    title: {en: 'Newborn vaccines timeline'}, 
    summary: {en: 'At birth to 6 weeks.'}, 
    stage: ['newborn'], 
    lens: ['medical'], 
    readMins: 4, 
    body: ['Birth vaccines', 'First 6 weeks', 'Schedule tracking'], 
    sources: ['MoHFW'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'cost-planning-101', 
    title: {en: 'Cost planning 101'}, 
    summary: {en: 'Budget & questions.'}, 
    stage: ['ttc'], 
    lens: ['financial'], 
    readMins: 5, 
    body: ['Budget planning', 'Insurance coverage', 'Cost questions'], 
    sources: ['NABH'], 
    reviewedBy: 'Arjun Menon' 
  },
  { 
    slug: 'cerclage-basics', 
    title: {en: 'Cervical cerclage — what/why'}, 
    summary: {en: 'Who might benefit.'}, 
    stage: ['pregnancy'], 
    lens: ['medical'], 
    readMins: 5, 
    body: ['What is cerclage', 'Who needs it', 'Procedure details'], 
    sources: ['ACOG'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  },
  { 
    slug: 'vbac-questions', 
    title: {en: 'VBAC: questions to ask'}, 
    summary: {en: 'Balancing benefits/risks.'}, 
    stage: ['pregnancy'], 
    lens: ['medical','social'], 
    readMins: 5, 
    body: ['VBAC basics', 'Risk assessment', 'Decision making'], 
    sources: ['NICE'], 
    reviewedBy: 'Dr. Ananya Sharma' 
  }
];
