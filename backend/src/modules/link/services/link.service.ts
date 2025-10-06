import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link } from "../entities";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { ClickService } from "src/modules/click/services";
import { LinkResponseDto, LinkStatDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { ClickStatDto } from "src/modules/click/dto/click-stat.dto";
import { nanoid } from "nanoid";

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link) private readonly linkRepo: Repository<Link>,
        private readonly config: ConfigService,
        private readonly clickService: ClickService,
    ) {}

    async createShortLink(originalUrl: string): Promise<LinkResponseDto> {
        const shortCode = await this.generateUniqueShortCode();
        const link = this.linkRepo.create({ originalUrl, shortCode });

        await this.linkRepo.save(link);
        
        const baseUrl = this.config.getOrThrow<string> ('APP_BASE_URL');
        return new LinkResponseDto(link.shortCode, baseUrl);
    }

    async findByShortCode(shortCode: string): Promise<Link> {
        const link = await this.linkRepo.findOne({ where: {shortCode} });
        if (!link) throw new NotFoundException("Ссылка не найдена");
        return link;
    }

    async getLinkStat(linkId: string, page = 1, limit = 20): Promise<LinkStatDto> {
        const link = await this.linkRepo.findOne({ where: {id: linkId} });
        if (!link) throw new NotFoundException("Ссылка не найдена");

        const [clicks, total] = await this.clickService.getClicksStat(linkId, page, limit);

        return {
            originalUrl: link.originalUrl,
            created_at: link.created_at,
            total,
            page,
            limit,
            clicks: plainToInstance(ClickStatDto, clicks),
        };
    }

    private async generateUniqueShortCode(length = 6): Promise<string> {
        let code: string;
        let exists: boolean = true;

        do {
            code = nanoid(length);
            exists = await this.linkRepo.exists( {where: {shortCode: code} });
        } while(exists);

        return code;
    }
}