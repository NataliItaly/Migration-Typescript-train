export interface LoaderInitOptions {
    apiKey?: string;
    [key: string]: unknown;
}

export interface Source {
    id: string | null;
    name: string;
}

export interface NewsItem {
    source: Source;
    author?: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage?: string | null;
    publishedAt: string;
    content?: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsItem[];
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}