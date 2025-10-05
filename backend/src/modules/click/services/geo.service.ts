import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GeoService {
    private readonly geoApiUrl: string;

    constructor(private readonly config: ConfigService) {
        this.geoApiUrl = this.config.getOrThrow<string>("GEO_API_URL");
    }

    async getLocation(ip: string): Promise<{ country?: string; region?: string }> {
        try {
            const res = await axios.get(`${this.geoApiUrl}/${ip}/json`);
            return { country: res.data.country_name, region: res.data.region };
        } catch {
            return { country: undefined, region: undefined };
        }
    }
}