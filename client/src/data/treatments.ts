
export type Treatment = { 
  id: string;
  slug: string; 
  name: string; 
  overview: string; 
  who: string[]; 
  steps: string[]; 
  risks: string[]; 
  costNote: string; 
  askDoctor: string[]; 
  sources: string[]; 
  reviewedBy: string;
  benefits: string[];
};

export const treatments: Treatment[] = [
  { 
    id: 'iui',
    slug: 'iui', 
    name: 'IUI (Intrauterine Insemination)', 
    overview: 'Washed sperm placed in uterus around ovulation.', 
    who: ['Unexplained infertility','Mild male‑factor','Cervical issues'], 
    steps: ['Track ovulation','Trigger (if advised)','Lab washing','Insemination (OPD)','Two‑week wait'], 
    risks: ['Cramps/spotting','Small infection risk','Multiple pregnancy if many follicles'], 
    costNote: 'Lower cost than IVF; meds/monitoring vary by city.', 
    askDoctor: ['How many cycles before IVF?','Risk of multiples?','Trigger or natural?','When to convert/cancel?'], 
    sources: ['WHO','NHS'], 
    reviewedBy: 'Dr. Raghav Iyer',
    benefits: ['Unexplained infertility', 'Mild male-factor', 'Cervical issues']
  },
  { 
    id: 'ivf',
    slug: 'ivf', 
    name: 'IVF (In‑Vitro Fertilisation)', 
    overview: 'Eggs retrieved and fertilised in lab; embryo transferred to uterus.', 
    who: ['Tubal factor','Severe male‑factor','Failed IUI','Certain genetic reasons'], 
    steps: ['Stimulation injections 8–12 days','Monitoring & trigger','Egg retrieval','Fertilisation (IVF/ICSI)','Embryo culture','Transfer (fresh/frozen)','Beta‑hCG'], 
    risks: ['OHSS (rare)','Multiple pregnancy (avoid via SET)','Procedure discomfort'], 
    costNote: 'Plan for meds, lab, ICSI, freezing, storage.', 
    askDoctor: ['Single embryo transfer?','PGT needed?','Fresh vs frozen?','Success factors for me?'], 
    sources: ['ACOG','ESHRE','WHO'], 
    reviewedBy: 'Dr. Raghav Iyer',
    benefits: ['Tubal factor', 'Severe male-factor', 'Prior fertilisation failure']
  },
  { 
    id: 'icsi',
    slug: 'icsi', 
    name: 'ICSI (Intracytoplasmic Sperm Injection)', 
    overview: 'Single sperm injected directly into egg; used with IVF.', 
    who: ['Severe male factor','Previous fertilisation failure','Low egg numbers'], 
    steps: ['IVF stimulation','Egg retrieval','Sperm preparation','ICSI procedure','Embryo culture','Transfer'], 
    risks: ['Same as IVF','Slight increase in birth defects (very rare)','Procedure complexity'], 
    costNote: 'Additional cost over standard IVF.', 
    askDoctor: ['Do we need ICSI?','Alternative options?','Success rates for our case?','Additional costs?'], 
    sources: ['ACOG','ESHRE'], 
    reviewedBy: 'Dr. Raghav Iyer',
    benefits: ['Severe male-factor', 'Prior fertilisation failure', 'Low sperm count']
  },
  { 
    id: 'donor',
    slug: 'donor-options', 
    name: 'Donor Options', 
    overview: 'Using donated eggs, sperm, or embryos for conception.', 
    who: ['Genetic conditions','Premature ovarian failure','No sperm production','Repeated IVF failure'], 
    steps: ['Counselling','Donor selection','Medical screening','Synchronisation (if needed)','Treatment cycle'], 
    risks: ['Emotional challenges','Legal considerations','Higher multiple pregnancy rates'], 
    costNote: 'Donor fees, screening, legal costs additional.', 
    askDoctor: ['Known vs anonymous donors?','Legal requirements?','Success rates?','Counselling support?'], 
    sources: ['ACOG','ASRM'], 
    reviewedBy: 'Dr. Raghav Iyer',
    benefits: ['Single women', 'Same-sex couples', 'Genetic conditions', 'Severe male-factor']
  },
  { 
    id: 'preservation',
    slug: 'fertility-preservation', 
    name: 'Fertility Preservation', 
    overview: 'Freezing eggs, sperm, or embryos for future use.', 
    who: ['Cancer treatment','Delayed childbearing','Medical conditions','Military deployment'], 
    steps: ['Consultation','Stimulation (for eggs)','Collection','Freezing','Storage'], 
    risks: ['Procedure risks','Storage costs','No guarantee of success','Time sensitivity'], 
    costNote: 'Upfront costs plus annual storage fees.', 
    askDoctor: ['Best timing?','Success rates by age?','Storage duration?','Insurance coverage?'], 
    sources: ['ACOG','ASRM'], 
    reviewedBy: 'Dr. Raghav Iyer',
    benefits: ['Cancer patients', 'Delayed childbearing', 'Medical conditions', 'Career planning']
  }
];
