import api from "../../../shared/api/axios";
import { ClickSummaryDto } from "../types/click";
import { LinkCreatedResponse, LinkStatsResponse } from "../types/link";

export const createLinkApi = async (originalUrl: string): Promise<LinkCreatedResponse> => {
    const res = await api.post("/", { originalUrl });
    return res.data;
}

export const redirectLinkApi = async (shortCode: string): Promise<Response> => {
    const res = await api.get(`/${shortCode}`, {
        headers: { "Accept": "application/json" }
    });
    return res.data;
}

export const getStatsApi = async (shortCode: string, page = 1, limit = 10): Promise<LinkStatsResponse> => {
  const res = await api.get(`/stats/${shortCode}?page=${page}&limit=${limit}`);
  return res.data;
};

export const getClicksSummaryApi = async (shortCode: string): Promise<ClickSummaryDto> => {
    const res = await api.get(`/stats/${shortCode}/summary`);
    return res.data;
};