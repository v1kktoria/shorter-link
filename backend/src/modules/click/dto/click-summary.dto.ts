export class ClickSummaryItemDto {
    name: string;
    value: number;
}

export class ClickSummaryDto {
    country: ClickSummaryItemDto[] = [];
    region: ClickSummaryItemDto[] = [];
    browser: ClickSummaryItemDto[] = [];
    os: ClickSummaryItemDto[] = [];
}