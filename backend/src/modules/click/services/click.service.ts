import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Click } from "../entities";
import { Repository } from "typeorm";
import { GeoService } from "./geo.service";
import { UserAgentParserService } from "src/common/utils/user-agent-parser.service";
import { Link } from "src/modules/link/entities";
import { ClickSummaryDto } from "../dto/click-summary.dto";

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

    async getClicksSummary(linkId: string): Promise<ClickSummaryDto> {
        const summary = new ClickSummaryDto();
        const fields = Object.keys(summary) as (keyof ClickSummaryDto)[];

        await Promise.all(fields.map(async (field) => {
            const raw = await this.clickRepo
                .createQueryBuilder("click")
                .select(`click.${field}`, "name")
                .addSelect("COUNT(*)", "value")
                .where("click.linkId = :linkId", { linkId })
                .groupBy(`click.${field}`)
                .getRawMany();

            summary[field] = raw.map(r => ({ name: r.name || "Неизвестно", value: Number(r.value) }));
        }));

        return summary;
    }
}