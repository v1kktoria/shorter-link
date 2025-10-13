import { Injectable } from "@nestjs/common";
import { Click } from "../entities";
import { GeoService } from "./geo.service";
import { UserAgentParserService } from "src/common/utils/user-agent-parser.service";
import { Link } from "src/modules/link/entities";
import { ClickSummaryDto } from "../dto/click-summary.dto";
import { ClickRepository } from "../repositories/click.repository";

@Injectable()
export class ClickService {
    constructor(
        private readonly clickRepo: ClickRepository,
        private readonly geoService: GeoService,
        private readonly uaParser: UserAgentParserService,
    ) {}

    async recordClick(link: Link, ip: string, userAgent: string): Promise<void> {
        const { country, region } = await this.geoService.getLocation(ip);
        const { browser, browserVersion, os} = this.uaParser.parse(userAgent);

        await this.clickRepo.createAndSave({ link, ip, country, region, browser, browserVersion, os });
    }

    async getClicksStat(linkId: string, page = 1, limit = 20): Promise<[Click[], number]> {
        return await this.clickRepo.findAndCountByLink(linkId, page, limit);
    }

    async getClicksSummary(linkId: string): Promise<ClickSummaryDto> {
        return this.clickRepo.getSummary(linkId);
    }
}