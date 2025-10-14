import { ApiProperty } from "@nestjs/swagger";
import { ClickStatDto } from "src/modules/click/dto/click-stat.dto";

export class LinkStatDto {
    @ApiProperty({ example: "https://example.com", description: "Исходный URL" })
    originalUrl: string;

    @ApiProperty({ example: "2025-10-13T12:00:00Z", description: "Дата создания ссылки" })
    created_at: Date;

    @ApiProperty({ example: 42, description: "Общее количество кликов" })
    total: number;

    @ApiProperty({ example: 1, description: "Номер текущей страницы" })
    page: number;

    @ApiProperty({ example: 20, description: "Размер страницы (лимит записей)" })
    limit: number;

    @ApiProperty({ type: [ClickStatDto], description: "Список кликов" })
    clicks: ClickStatDto[];
}