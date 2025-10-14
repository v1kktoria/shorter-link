import { ApiProperty } from "@nestjs/swagger";

export class LinkResponseDto {
    @ApiProperty({ example: "abc123", description: "Уникальный короткий код" })
    shortCode: string;
    
    @ApiProperty({ example: "http://localhost:3000/abc123", description: "Сокращенная ссылка" })
    shareUrl: string;

    @ApiProperty({ example: "http://localhost:3000/stats/abc123", description: "URL статистики" })
    statsUrl: string;

    constructor(shortCode: string, baseUrl: string) {
        this.shortCode = shortCode;
        this.shareUrl = `${baseUrl}/${shortCode}`;
        this.statsUrl = `${baseUrl}/stats/${shortCode}`;
    }
}