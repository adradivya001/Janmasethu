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
        'Accept': 'application/json'
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
        'Accept': 'application/json'
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
  lifeStage?: string;
  perspective?: string;
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<ArticlesResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.lifeStage) queryParams.set('lifeStage', params.lifeStage);
    if (params?.perspective) queryParams.set('perspective', params.perspective);
    if (params?.search) queryParams.set('search', params.search);
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.perPage) queryParams.set('perPage', params.perPage.toString());

    const url = `${NGROK_API_BASE}/api/knowledge/articles${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch articles' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
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
        'Accept': 'application/json'
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
    
    // Transform API response to ArticleData format if needed
    return article as any;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};



