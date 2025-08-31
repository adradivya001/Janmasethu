export type Treatment = { 
  slug: string; 
  name: string; 
  overview: string; 
  who: string[]; 
  steps: string[]; 
  risks: string[]; 
  costNote: string; 
  askDoctor: string[]; 
  sources: string[]; 
  reviewedBy: string 
};

export const treatments: Treatment[] = [
  { 
    slug: 'iui', 
    name: 'IUI (Intrauterine Insemination)', 
    overview: 'Washed sperm placed in uterus around ovulation.', 
    who: ['Unexplained infertility','Mild male‑factor','Cervical issues'], 
    steps: ['Track ovulation','Trigger (if advised)','Lab washing','Insemination (OPD)','Two‑week wait'], 
    risks: ['Cramps/spotting','Small infection risk','Multiple pregnancy if many follicles'], 
    costNote: 'Lower cost than IVF; meds/monitoring vary by city.', 
    askDoctor: ['How many cycles before IVF?','Risk of multiples?','Trigger or natural?','When to convert/cancel?'], 
    sources: ['WHO','NHS'], 
    reviewedBy: 'Dr. Raghav Iyer' 
  },
  { 
    slug: 'ivf', 
    name: 'IVF (In‑Vitro Fertilisation)', 
    overview: 'Eggs retrieved and fertilised in lab; embryo transferred to uterus.', 
    who: ['Tubal factor','Severe male‑factor','Failed IUI','Certain genetic reasons'], 
    steps: ['Stimulation injections 8–12 days','Monitoring & trigger','Egg retrieval','Fertilisation (IVF/ICSI)','Embryo culture','Transfer (fresh/frozen)','Beta‑hCG'], 
    risks: ['OHSS (rare)','Multiple pregnancy (avoid via SET)','Procedure discomfort'], 
    costNote: 'Plan for meds, lab, ICSI, freezing, storage.', 
    askDoctor: ['Single embryo transfer?','PGT needed?','Fresh vs frozen?','Success factors for me?'], 
    sources: ['ACOG','ESHRE','WHO'], 
    reviewedBy: 'Dr. Raghav Iyer' 
  },
  { 
    slug: 'icsi', 
    name: 'ICSI', 
    overview: 'Single sperm injected into each mature egg.', 
    who: ['Severe male‑factor','Prior fertilisation failure'], 
    steps: ['Egg retrieval','Micromanipulation','Embryo culture','Transfer'], 
    risks: ['Similar to IVF','Not all embryos are normal'], 
    costNote: 'Adds a lab fee beyond IVF.', 
    askDoctor: ['Why ICSI vs IVF?','Lab expertise/outcomes?'], 
    sources: ['ESHRE'], 
    reviewedBy: 'Meera N., MSc Embryology' 
  },
  { 
    slug: 'donor-options', 
    name: 'Donor options', 
    overview: 'Donor eggs/sperm/embryos with consent & screening.', 
    who: ['Low ovarian reserve','Genetic conditions','Single/queer parents'], 
    steps: ['Counselling & consent','Matching & screening','Legal forms','Procedure as per plan'], 
    risks: ['Emotional/legal considerations','Disclosure planning'], 
    costNote: 'Includes screening, legal, treatment fees.', 
    askDoctor: ['Legal framework & consent','Donor screening','Anonymity policies'], 
    sources: ['ICMR ART Rules (summary)'], 
    reviewedBy: 'Adv. Shreya S., LLB' 
  },
  { 
    slug: 'fertility-preservation', 
    name: 'Fertility preservation', 
    overview: 'Freezing eggs/sperm/embryos for later use.', 
    who: ['Cancer therapy','Delayed parenthood','Risk of POI'], 
    steps: ['Counselling','Testing','Collection/Freezing','Storage'], 
    risks: ['Procedure risks','Uncertain future outcomes'], 
    costNote: 'Procedure + meds + annual storage.', 
    askDoctor: ['How many eggs to freeze?','Storage limits/costs?'], 
    sources: ['ASRM','NCCN (patient)'], 
    reviewedBy: 'Dr. Raghav Iyer' 
  }
];
