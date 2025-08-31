export type Post = { 
  slug: string; 
  title: string; 
  tags: string[]; 
  author: string; 
  editedBy: string; 
  summary: string; 
  body: string[] 
};

export const posts: Post[] = [
  { 
    slug: 'ask-better-questions', 
    title: 'Ask better questions at appointments', 
    tags: ['social','ttc'], 
    author: 'Editorial', 
    editedBy: 'Meera Gupta', 
    summary: 'Tiny script to reduce overwhelm.', 
    body: ['Open with goals','Use teach‑back','Agree next steps'] 
  },
  { 
    slug: 'travel-in-pregnancy', 
    title: 'Is it safe to travel in pregnancy?', 
    tags: ['medical','pregnancy'], 
    author: 'Editorial', 
    editedBy: 'Dr. Ananya Sharma', 
    summary: 'When/how to travel safely.', 
    body: ['Travel guidelines', 'Safety considerations', 'Planning tips'] 
  },
  { 
    slug: 'cost-buckets-ivf', 
    title: 'IVF costs: plan by buckets', 
    tags: ['financial','ttc'], 
    author: 'Arjun Menon', 
    editedBy: 'Editorial', 
    summary: 'Meds, lab, add‑ons, storage.', 
    body: ['Basic costs', 'Additional expenses', 'Planning ahead'] 
  },
  { 
    slug: 'foods-outside-home', 
    title: 'Eating outside while pregnant', 
    tags: ['nutrition','pregnancy'], 
    author: 'Ritu Malhotra', 
    editedBy: 'Editorial', 
    summary: 'Hygiene checklist + swaps.', 
    body: ['Safety guidelines', 'Food choices', 'Restaurant tips'] 
  },
  { 
    slug: 'sleep-in-ttc', 
    title: 'Sleep while TTC', 
    tags: ['social','ttc'], 
    author: 'Dr. Karan Bedi', 
    editedBy: 'Editorial', 
    summary: 'Gentle routines that help.', 
    body: ['Sleep importance', 'Bedtime routines', 'Stress management'] 
  },
  { 
    slug: 'ppd-signs', 
    title: 'PPD signs to watch', 
    tags: ['social','postpartum'], 
    author: 'Editorial', 
    editedBy: 'Dr. Karan Bedi', 
    summary: 'Reach help early.', 
    body: ['Recognizing PPD', 'Getting support', 'Treatment options'] 
  },
  { 
    slug: 'newborn-papers', 
    title: 'Newborn paperwork 101', 
    tags: ['financial','newborn'], 
    author: 'Editorial', 
    editedBy: 'Arjun Menon', 
    summary: 'Certificates and schemes.', 
    body: ['Birth certificate', 'Government schemes', 'Documentation'] 
  },
  { 
    slug: 'vaccine-pain', 
    title: 'Reducing vaccine pain', 
    tags: ['medical','newborn'], 
    author: 'Editorial', 
    editedBy: 'Dr. Ananya Sharma', 
    summary: 'Comfort tips.', 
    body: ['Pain management', 'Comfort techniques', 'Before and after'] 
  },
  { 
    slug: 'vbac-questions', 
    title: 'VBAC: what to ask', 
    tags: ['medical','pregnancy'], 
    author: 'Editorial', 
    editedBy: 'Dr. Ananya Sharma', 
    summary: 'Shared decision prompts.', 
    body: ['Understanding VBAC', 'Risk assessment', 'Decision factors'] 
  },
];
