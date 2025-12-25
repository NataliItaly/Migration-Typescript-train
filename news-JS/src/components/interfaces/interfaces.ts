export interface Source {
    id: string | null;
    name: string;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}