import { Body, Controller, Get, Param, Post, Query, Req, Res } from "@nestjs/common";
import { LinkService } from "../services";
import { ClickService } from "src/modules/click/services";
import { CreateLinkDto } from "../dto/create-link.dto";
import { LinkResponseDto} from "../dto";
import type { Request, Response } from "express";
import { Client } from "src/common/decorators/client.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("links")
@Controller()
export class LinkController {
    constructor(
        private readonly linkService: LinkService,
        private readonly clickService: ClickService
    ) {}

    @Post()
    @ApiOperation({ summary: "Создать сокращенную ссылку" })
    @ApiResponse({ status: 200, type: LinkResponseDto })
    async createLink(@Body() createLinkDto: CreateLinkDto): Promise<LinkResponseDto> {
        return this.linkService.createShortLink(createLinkDto.originalUrl);
    }

    @Get(":shortCode")
    @ApiOperation({ summary: "Переход по сокращенной ссылке" })
    @ApiResponse({ status: 302, description: "Редирект на оригинальный URL" })
    async redirectLink(@Param("shortCode") shortCode: string, @Res() res: Response, @Req() req: Request, @Client() client: {ip: string, userAgent: string}) {
        const link = await this.linkService.findByShortCode(shortCode);
        await this.clickService.recordClick(link, client.ip, client.userAgent);

        const acceptHeader = req.headers.accept || "";
        if (acceptHeader.includes("application/json")) {
            return res.json({ url: link.originalUrl });
        } else {
            return res.redirect(link.originalUrl);
        }
    }
}