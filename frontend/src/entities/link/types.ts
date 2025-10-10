export interface Click {
    ip: string;
    country: string;
    region: string;
    browser: string;
    browserVersion: string;
    os: string;
    created_at: string;
}

export interface LinkCreatedResponse {
    shareUrl: string;
    statsUrl: string;
    shortCode: string;
}

export interface LinkStatsResponse {
    originalUrl: string;
    total: number;
    page: number;
    limit: number;
    Clicks: Click[];
    created_at: string;
}

export interface LinksState {
  created?: LinkCreatedResponse | null;
  loading: boolean;
  error?: string | null;
}