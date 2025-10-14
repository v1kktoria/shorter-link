import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class ClickStatDto {
    @Exclude()
    id: string;

    @ApiProperty({ example: "2025-10-13T14:25:00Z", description: "Дата клика" })
    date: Date;

    @ApiProperty({ example: "8.8.8.8", description: "IP адрес пользователя" })
    ip: string;

    @ApiProperty({ example: "Беларусь", description: "Страна" })
    country: string;

    @ApiProperty({ example: "Минск", description: "Регион" })
    region: string;

    @ApiProperty({ example: "Chrome", description: "Браузер" })
    browser: string;

    @ApiProperty({ example: "129.0.666", description: "Версия браузера" })
    browserVersion: string;

    @ApiProperty({ example: "Windows", description: "Операционная система" })
    os: string;
}