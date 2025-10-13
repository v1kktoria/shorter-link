import { InjectRepository } from "@nestjs/typeorm";
import { Click } from "../entities";
import { Repository } from "typeorm";
import { ClickSummaryDto } from "../dto/click-summary.dto";
import { Link } from "src/modules/link/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClickRepository {
    constructor(
        @InjectRepository(Click) private readonly repo: Repository<Click>,
    ) { }

    async createAndSave(data: {link: Link, ip: string, country?: string, region?: string, browser?: string; browserVersion?: string; os?: string; }): Promise<Click> {
        const click = this.repo.create(data);
        return this.repo.save(click);
    }

    async findAndCountByLink(linkId: string, page: number, limit: number) {
        return this.repo.findAndCount({
            where: { link: { id: linkId } },
            order: { created_at: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async getSummary(linkId: string): Promise<ClickSummaryDto> {
        const summary = new ClickSummaryDto();
        const fields = Object.keys(summary) as (keyof ClickSummaryDto)[];

        await Promise.all(fields.map(async (field) => {
            const raw = await this.repo
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