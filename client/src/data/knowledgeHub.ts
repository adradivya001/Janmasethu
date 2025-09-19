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
    const response = await fetch(`/KnowledgeHub/${slug}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
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