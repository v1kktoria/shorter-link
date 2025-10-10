import api from "../../../shared/api/axios";
import { LinkCreatedResponse } from "../types";

export const createLinkApi = async (originalUrl: string): Promise<LinkCreatedResponse> => {
    const res = await api.post("/", { originalUrl });
    return res.data;
}