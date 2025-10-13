import { Click, ClickSummaryDto } from "./click";

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
    clicks: Click[];
    created_at: string;
}

export interface LinksState {
  created?: LinkCreatedResponse | null;
  stats?: LinkStatsResponse | null;
  summary: ClickSummaryDto | null;
  loading: boolean;
  error?: string | null;
}