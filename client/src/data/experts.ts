export type Expert = { 
  id: string; 
  name: string; 
  role: string; 
  credentials: string; 
  city: string; 
  reviewed: string[]; 
  bio: string 
};

export const experts: Expert[] = [
  { 
    id: 'ananya-obgyn', 
    name: 'Dr. Ananya Sharma', 
    role: 'OB‑GYN — Medical Reviewer', 
    credentials: 'MBBS, MS (OBGYN)', 
    city: 'Delhi', 
    reviewed: ['Pregnancy care','Safety'], 
    bio: 'Respectful maternity care & patient education.' 
  },
  { 
    id: 'raghav-repro', 
    name: 'Dr. Raghav Iyer', 
    role: 'Reproductive Medicine', 
    credentials: 'MBBS, DNB', 
    city: 'Bengaluru', 
    reviewed: ['IVF','IUI','Preservation'], 
    bio: 'Evidence‑based fertility treatments.' 
  },
  { 
    id: 'karan-psych', 
    name: 'Dr. Karan Bedi', 
    role: 'Perinatal Psychology', 
    credentials: 'PhD Clinical Psychology', 
    city: 'Mumbai', 
    reviewed: ['Mental health','Support'], 
    bio: 'Fertility‑aware mental health care.' 
  },
  { 
    id: 'ritu-nutrition', 
    name: 'Ritu Malhotra', 
    role: 'Nutrition Specialist', 
    credentials: 'MSc Clinical Nutrition', 
    city: 'Chennai', 
    reviewed: ['Nutrition','Supplements'], 
    bio: 'Pregnancy & fertility nutrition expertise.' 
  },
  { 
    id: 'arjun-finance', 
    name: 'Arjun Menon', 
    role: 'Health Finance Advisor', 
    credentials: 'MBA Health Management', 
    city: 'Kochi', 
    reviewed: ['Costs','Insurance','Schemes'], 
    bio: 'Healthcare financing & policy specialist.' 
  },
  { 
    id: 'meera-embryology', 
    name: 'Meera N.', 
    role: 'Clinical Embryologist', 
    credentials: 'MSc Clinical Embryology', 
    city: 'Hyderabad', 
    reviewed: ['Lab procedures','Grading'], 
    bio: 'Advanced reproductive laboratory techniques.' 
  }
];
