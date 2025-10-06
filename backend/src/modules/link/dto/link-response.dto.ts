export class LinkResponseDto {
    shortCode: string;
    shareUrl: string;
    statsUrl: string;

    constructor(shortCode: string, baseUrl: string) {
        this.shortCode = shortCode;
        this.shareUrl = `${baseUrl}/${shortCode}`;
        this.statsUrl = `${baseUrl}/stats/${shortCode}`;
    }
}