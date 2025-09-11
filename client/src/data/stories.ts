export type Story = { 
  slug: string; 
  title: string; 
  city: string; 
  language: string; 
  stage: string; 
  treatment?: string; 
  summary: string; 
  body: string[] 
};

export const stories: Story[] = [
  { 
    slug: 'priya-ivf-mumbai', 
    title: 'Priya — first IVF, finding calm', 
    city: 'Mumbai', 
    language: 'Hindi', 
    stage: 'stimulation', 
    treatment: 'IVF', 
    summary: 'Anxious about injections; small routines helped.', 
    body: ['Day 1 jitters…','Breathing with nurse…','Partner set up kit…','Worry windows…','Slept better before retrieval…'] 
  },
  { 
    slug: 'kavitha-tww-chennai', 
    title: 'Kavitha — two‑week wait', 
    city: 'Chennai', 
    language: 'Tamil', 
    stage: 'tww', 
    treatment: 'IVF', 
    summary: 'Hope, fear, and coping.', 
    body: ['The waiting begins', 'Managing expectations', 'Finding support'] 
  },
  { 
    slug: 'ravi-diagnosis-hyd', 
    title: 'Ravi — making sense of diagnosis', 
    city: 'Hyderabad', 
    language: 'Telugu', 
    stage: 'consultation', 
    summary: 'Guilt → understanding → action.', 
    body: ['Initial shock', 'Understanding the diagnosis', 'Moving forward together'] 
  },
  { 
    slug: 'ananya-prep-delhi', 
    title: 'Ananya — starting with hope', 
    city: 'Delhi', 
    language: 'Hindi', 
    stage: 'preparation', 
    summary: 'Mixed emotions, simple plans.', 
    body: ['First consultation', 'Making plans', 'Finding hope'] 
  },
  { 
    slug: 'meera-vbac-pune', 
    title: 'Meera — VBAC journey', 
    city: 'Pune', 
    language: 'Marathi', 
    stage: 'pregnancy', 
    summary: 'Balanced risks and hopes.', 
    body: ['Considering VBAC', 'Doctor discussions', 'Birth experience'] 
  },
  { 
    slug: 'rahul-iui-kochi', 
    title: 'Rahul & Asha — IUI path', 
    city: 'Kochi', 
    language: 'Malayalam', 
    stage: 'ttc', 
    treatment: 'IUI', 
    summary: 'Choosing step‑by‑step care.', 
    body: ['Starting IUI', 'Three cycles journey', 'Success at last'] 
  },
  { 
    slug: 'sana-postpartum-bengaluru', 
    title: 'Sana — postpartum blues to support', 
    city: 'Bengaluru', 
    language: 'Urdu', 
    stage: 'postpartum', 
    summary: 'Finding help early.', 
    body: ['Recognizing signs', 'Seeking help', 'Recovery journey'] 
  },
  { 
    slug: 'naveen-preserve-jaipur', 
    title: 'Naveen — preservation before therapy', 
    city: 'Jaipur', 
    language: 'Hindi', 
    stage: 'pre‑treatment', 
    summary: 'Freezing with clarity.', 
    body: ['Cancer diagnosis', 'Fertility preservation', 'Hope for future'] 
  },
];