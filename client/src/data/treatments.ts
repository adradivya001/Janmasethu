export interface TreatmentSummary {
  english?: string;
  English?: string;
  hindi?: string;
  Hindi?: string;
  telugu?: string;
  Telugu?: string;
}

export interface TreatmentContent {
  english?: string[];
  English?: string[];
  hindi?: string[];
  Hindi?: string[];
  telugu?: string[];
  Telugu?: string[];
}

export interface TreatmentData {
  title?: string;
  summary?: TreatmentSummary;
  Summary?: TreatmentSummary; // For ICSI format compatibility
  reviewed_by?: string;
  'Reviewed by'?: string; // For ICSI format compatibility
  who_might_benefit?: TreatmentContent;
  'Who Might Benefit'?: TreatmentContent; // For ICSI format compatibility
  process_steps?: TreatmentContent;
  'Process Steps'?: TreatmentContent; // For ICSI format compatibility
  risks_considerations?: TreatmentContent;
  'Risks & Considerations'?: TreatmentContent; // For ICSI format compatibility
  cost_considerations?: TreatmentContent;
  'Cost Considerations'?: TreatmentContent; // For ICSI format compatibility
  questions_to_ask?: TreatmentContent;
  'Questions to Ask Your Doctor'?: TreatmentContent; // For ICSI format compatibility
  sources?: string[];
  Sources?: string[]; // For ICSI format compatibility
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  data: TreatmentData;
}

// Function to fetch treatment data from JSON files
export const fetchTreatmentData = async (treatmentId: string): Promise<TreatmentData | null> => {
  try {
    const response = await fetch(`/treatments/${treatmentId}.json`);
    if (!response.ok) return null;
    
    const jsonData = await response.json();
    // Get the first key's value (since each JSON has one main key like "IVF", "IUI", etc.)
    const data = Object.values(jsonData)[0] as TreatmentData;
    return data;
  } catch (error) {
    console.error(`Error fetching ${treatmentId} data:`, error);
    return null;
  }
};

// Helper function to get content by language
export const getContentByLanguage = (content: TreatmentContent | undefined, language: 'en' | 'hi' | 'te'): string[] => {
  if (!content) return [];
  
  const langMap = {
    'en': content.english || content.English || [],
    'hi': content.hindi || content.Hindi || [],
    'te': content.telugu || content.Telugu || []
  };
  
  return langMap[language] || langMap['en'] || [];
};

// Helper function to get summary by language
export const getSummaryByLanguage = (summary: TreatmentSummary | undefined, language: 'en' | 'hi' | 'te'): string => {
  if (!summary) return '';
  
  const langMap = {
    'en': summary.english || summary.English || '',
    'hi': summary.hindi || summary.Hindi || '',
    'te': summary.telugu || summary.Telugu || ''
  };
  
  return langMap[language] || langMap['en'] || '';
};

// Helper function to normalize treatment data (handle different key formats)
export const normalizeTreatmentData = (data: TreatmentData): TreatmentData => {
  return {
    title: data.title,
    summary: data.summary || data.Summary,
    reviewed_by: data.reviewed_by || data['Reviewed by'],
    who_might_benefit: data.who_might_benefit || data['Who Might Benefit'],
    process_steps: data.process_steps || data['Process Steps'],
    risks_considerations: data.risks_considerations || data['Risks & Considerations'],
    cost_considerations: data.cost_considerations || data['Cost Considerations'],
    questions_to_ask: data.questions_to_ask || data['Questions to Ask Your Doctor'],
    sources: data.sources || data.Sources
  };
};

// Treatment metadata (basic info for listing)
export const treatmentsList: Treatment[] = [
  {
    id: 'iui',
    slug: 'iui',
    title: 'Intrauterine Insemination (IUI)',
    data: {} // Will be populated dynamically
  },
  {
    id: 'ivf',
    slug: 'ivf',
    title: 'In Vitro Fertilization (IVF)',
    data: {} // Will be populated dynamically
  },
  {
    id: 'icsi',
    slug: 'icsi',
    title: 'Intracytoplasmic Sperm Injection (ICSI)',
    data: {} // Will be populated dynamically
  },
  {
    id: 'donor',
    slug: 'donor-options',
    title: 'Donor Options (Egg, Sperm, and Embryo Donation)',
    data: {} // Will be populated dynamically
  },
  {
    id: 'preservation',
    slug: 'fertility-preservation',
    title: 'Fertility Preservation (Egg, Sperm, and Embryo Freezing)',
    data: {} // Will be populated dynamically
  }
];

// For backward compatibility
export const treatments = treatmentsList;