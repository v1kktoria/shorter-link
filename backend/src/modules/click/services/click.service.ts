import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Click } from "../entities";
import { Repository } from "typeorm";
import { GeoService } from "./geo.service";
import { UserAgentParserService } from "src/common/utils/user-agent-parser.service";
import { Link } from "src/modules/link/entities";

@Injectable()
export class ClickService {
    constructor(
        @InjectRepository(Click) private readonly clickRepo: Repository<Click>,
        private readonly geoService: GeoService,
        private readonly uaParser: UserAgentParserService,
    ) {}

    async recordClick(link: Link, ip: string, userAgent: string): Promise<void> {
        const { country, region } = await this.geoService.getLocation(ip);
        const { browser, browserVersion, os} = this.uaParser.parse(userAgent);

        const click = this.clickRepo.create({ link, ip, country, region, browser, browserVersion, os });
        await this.clickRepo.save(click);
    }

    async getClicksStat(linkId: string, page = 1, limit = 20): Promise<[Click[], number]> {
        return await this.clickRepo.findAndCount({
            where: { link: { id: linkId } },
            order: { created_at: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
}