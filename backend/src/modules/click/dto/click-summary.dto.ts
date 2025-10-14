import { ApiProperty } from "@nestjs/swagger";

export class ClickSummaryItemDto {
    @ApiProperty({ example: "Windows", description: "Название категории" })
    name: string;

    @ApiProperty({ example: 25, description: "Количество кликов" })
    value: number;
}

export class ClickSummaryDto {
    @ApiProperty({ type: [ClickSummaryItemDto], description: "Распределение по странам" })
    country: ClickSummaryItemDto[] = [];

    @ApiProperty({ type: [ClickSummaryItemDto], description: "Распределение по регионам" })
    region: ClickSummaryItemDto[] = [];

    @ApiProperty({ type: [ClickSummaryItemDto], description: "Распределение по браузерам" })
    browser: ClickSummaryItemDto[] = [];

    @ApiProperty({ type: [ClickSummaryItemDto], description: "Распределение по ОС" })
    os: ClickSummaryItemDto[] = [];
}