export type ArticleContentType = 'paragraph' | 'subheading' | 'list';

export interface ArticleContent {
  type: ArticleContentType;
  text?: {
    en: string;
    hi: string;
    te: string;
  };
  items?: Array<{
    en: string;
    hi: string;
    te: string;
  }>;
}

export interface ArticleSection {
  id: string;
  title: {
    en: string;
    hi: string;
    te: string;
  };
  content: ArticleContent[];
}

export interface ArticleData {
  slug: string;
  title: {
    en: string;
    hi: string;
    te: string;
  };
  overview: {
    en: string;
    hi: string;
    te: string;
  };
  metadata: {
    readTime: {
      en: string;
      hi: string;
      te: string;
    };
    reviewer: {
      en: string;
      hi: string;
      te: string;
    };
    sources: string[];
  };
  sections: ArticleSection[];
}

export const fetchArticleData = async (slug: string): Promise<ArticleData | null> => {
  try {
    // Map article slugs to their corresponding JSON files
    const slugToFileMap: { [key: string]: string } = {
      'pmmvy-jsy-how-to-apply': 'pmmvy-jsy-application-guide',
      'pregnancy-foods': 'safe-pregnancy-foods-india',
      'embryo-grading-guide': 'embryo-grading-guide',
      'first-trimester-scan': 'first-trimester-scan',
      'when-to-see-fertility-specialist': 'when-to-see-fertility-specialist',
      'ivf-10-min': 'ivf-10-min',
      'second-trimester-checklist': 'second-trimester-checklist',
      'ppd-signs-support': 'ppd-signs-and-support',
      'preeclampsia-basics': 'preeclampsia-basics',
      'cervical-cerclage-basics': 'cervical-cerclage-basics',
      'cost-planning-101': 'cost-planning-101',
      'iycf-after-6-months': 'iycf-after-6-months',
      'newborn-vaccines-timeline': 'newborn-vaccines-timeline',
      'partner-playbook': 'partner-playbook',
      'post-birth-warning-signs': 'post-birth-warning-signs',
      'vbac-questions-to-ask': 'vbac-questions-to-ask'
    };

    const fileName = slugToFileMap[slug] || slug;
    const response = await fetch(`/KnowledgeHub/${fileName}.json`);

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

// List of available articles - this matches the JSON files in public/KnowledgeHub
export const availableArticles = [
  'cervical-cerclage-basics',
  'cost-planning-101',
  'embryo-grading-guide',
  'first-trimester-scan',
  'ivf-10-min',
  'iycf-after-6-months',
  'newborn-vaccines-timeline',
  'partner-playbook',
  'pmmvy-jsy-application-guide',
  'post-birth-warning-signs',
  'ppd-signs-and-support',
  'preeclampsia-basics',
  'safe-pregnancy-foods-india',
  'second-trimester-checklist',
  'vbac-questions-to-ask',
  'when-to-see-fertility-specialist'
];

// Function to fetch basic article metadata for listing pages
export const fetchAllArticlesMetadata = async (): Promise<Array<{
  slug: string;
  title: { en: string; hi: string; te: string };
  overview: { en: string; hi: string; te: string };
  readTime: { en: string; hi: string; te: string };
  reviewer: { en: string; hi: string; te: string };
}>> => {
  const articles = [];

  for (const slug of availableArticles) {
    try {
      const data = await fetchArticleData(slug);
      if (data) {
        articles.push({
          slug: data.slug,
          title: data.title,
          overview: data.overview,
          readTime: data.metadata.readTime,
          reviewer: data.metadata.reviewer
        });
      }
    } catch (error) {
      console.error(`Error fetching metadata for ${slug}:`, error);
    }
  }

  return articles;
};