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

// Ngrok API Base URL - update this with your actual ngrok domain
const NGROK_API_BASE = 'https://zainab-sanguineous-niels.ngrok-free.dev';

// API Response Types
export interface LifeStage {
  id: string;
  name: string;
  description?: string;
}

export interface Perspective {
  id: string;
  name: string;
  description?: string;
}

export interface ArticleMetadata {
  id: string;
  slug: string;
  title: string;
  summary: string;
  topic: string;
  section: string;
  lens: string;
  life_stage: string;
  read_time_minutes: number;
  published_at: string;
}

export interface ArticleDetailResponse {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: any;
  topic: string;
  section: string;
  lens: string;
  life_stage: string;
  read_time_minutes: number;
  published_at: string;
  updated_at: string;
}

export interface ArticlesResponse {
  query?: string;
  filters: {
    life_stage?: string;
    perspective?: string;
  };
  pagination: {
    page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  };
  items: ArticleMetadata[];
}

// API Functions
export async function fetchLifeStages(): Promise<LifeStage[]> {
  try {
    const response = await fetch(`${NGROK_API_BASE}/api/knowledge/life-stages`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch life stages' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching life stages:', error);
    return [];
  }
}

export async function fetchPerspectives(): Promise<Perspective[]> {
  try {
    const response = await fetch(`${NGROK_API_BASE}/api/knowledge/perspectives`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch perspectives' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching perspectives:', error);
    return [];
  }
}

export async function fetchArticles(params?: {
  lifeStage?: number;
  perspective?: number;
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<ArticlesResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.lifeStage) queryParams.set('lifeStage', params.lifeStage.toString());
    if (params?.perspective) queryParams.set('perspective', params.perspective.toString());
    if (params?.search) queryParams.set('search', params.search);
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.perPage) queryParams.set('perPage', params.perPage.toString());

    const url = `${NGROK_API_BASE}/api/knowledge/articles${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    console.log('Fetching articles from:', url);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Error response text:', responseText);

      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { error: 'Failed to fetch articles' };
      }

      throw new Error(errorData.error || `HTTP ${response.status}: ${responseText}`);
    }

    const data = await response.json();
    console.log('Articles response data:', data);

    // Validate response structure
    if (!data) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    // Handle both array and object responses
    if (Array.isArray(data)) {
      // Backend returned direct array
      console.log('Received direct array of articles:', data.length);
      return {
        filters: {},
        pagination: {
          page: 1,
          per_page: data.length,
          total: data.length,
          has_more: false
        },
        items: data
      };
    } else if (typeof data === 'object') {
      // Backend returned object with items property
      if (!Array.isArray(data.items)) {
        console.warn('Response missing items array, returning empty array');
        data.items = [];
      }
      return data;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      filters: {},
      pagination: {
        page: 1,
        per_page: 20,
        total: 0,
        has_more: false
      },
      items: []
    };
  }
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleDetailResponse | null> {
  try {
    const response = await fetch(`${NGROK_API_BASE}/api/knowledge/articles/${encodeURIComponent(slug)}`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Article not found: ${slug}`);
        return null;
      }
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch article' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch article by slug from backend (reuses fetchArticleBySlug)
export const fetchArticleData = async (slug: string): Promise<ArticleData | null> => {
  try {
    const article = await fetchArticleBySlug(slug);
    if (!article) return null;

    // Transform API response to ArticleData format
    // Backend returns: { id, slug, title, summary, content, topic, section, lens, life_stage, read_time_minutes, published_at }
    // Frontend expects: { slug, title, overview, metadata, sections }

    const transformedArticle: ArticleData = {
      slug: article.slug,
      title: {
        en: article.title,
        hi: article.title,
        te: article.title
      },
      overview: {
        en: article.summary,
        hi: article.summary,
        te: article.summary
      },
      metadata: {
        readTime: {
          en: `${article.read_time_minutes || 5} min read`,
          hi: `${article.read_time_minutes || 5} मिनट पढ़ें`,
          te: `${article.read_time_minutes || 5} నిమిషాలు చదవండి`
        },
        reviewer: {
          en: 'Reviewed by Medical Expert',
          hi: 'चिकित्सा विशेषज्ञ द्वारा समीक्षित',
          te: 'వైద్య నిపుణులచే సమీక్షించబడింది'
        },
        sources: article.content?.sources || []
      },
      sections: []
    };

    // Parse content if it exists
    if (article.content) {
      // If content is a structured object with sections
      if (Array.isArray(article.content.sections)) {
        transformedArticle.sections = article.content.sections;
      } 
      // If content is just text, create a single section
      else if (typeof article.content === 'string') {
        transformedArticle.sections = [{
          id: 'main-content',
          title: { en: '', hi: '', te: '' },
          content: [{
            type: 'paragraph' as ArticleContentType,
            text: {
              en: article.content,
              hi: article.content,
              te: article.content
            }
          }]
        }];
      }
      // If content is an object with text/body
      else if (article.content.body || article.content.text) {
        const contentText = article.content.body || article.content.text;
        transformedArticle.sections = [{
          id: 'main-content',
          title: { en: '', hi: '', te: '' },
          content: [{
            type: 'paragraph' as ArticleContentType,
            text: {
              en: contentText,
              hi: contentText,
              te: contentText
            }
          }]
        }];
      }
    }

    // If no sections were created, add a default one with the summary
    if (transformedArticle.sections.length === 0) {
      transformedArticle.sections = [{
        id: 'overview',
        title: { en: 'Overview', hi: 'अवलोकन', te: 'అవలోకనం' },
        content: [{
          type: 'paragraph' as ArticleContentType,
          text: {
            en: article.summary,
            hi: article.summary,
            te: article.summary
          }
        }]
      }];
    }

    return transformedArticle;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};