import { ClickStatDto } from "src/modules/click/dto/click-stat.dto";

export class LinkStatDto {
    originalUrl: string;
    created_at: Date;
    total: number;
    page: number;
    limit: number;
    clicks: ClickStatDto[];
}