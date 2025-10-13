export interface Click {
    ip: string;
    country: string;
    region: string;
    browser: string;
    browserVersion: string;
    os: string;
    created_at: string;
}

export interface ClickSummaryItem {
    name: string;
    value: number;
}

export interface ClickSummaryDto {
    country: ClickSummaryItem[];
    region: ClickSummaryItem[];
    browser: ClickSummaryItem[];
    os: ClickSummaryItem[];
}

export type ChartDatum = { 
  name: string;
  value: number;
};