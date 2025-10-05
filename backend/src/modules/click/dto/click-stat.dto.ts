import { Exclude } from "class-transformer";

export class ClickStatDto {
    @Exclude()
    id: string;

    date: Date;

    ip: string;

    country: string;

    region: string;

    browser: string;

    browserVersion: string;

    os: string;
}