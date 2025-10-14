import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LinkService } from '../services';
import { ClickService } from 'src/modules/click/services';
import { LinkStatDto } from '../dto';
import { ClickSummaryDto } from 'src/modules/click/dto/click-summary.dto';

@ApiTags("stats")
@Controller("stats")
export class StatsController {
    constructor(
        private readonly linkService: LinkService,
        private readonly clickService: ClickService,
    ) { }

    @Get("stats/:shortCode")
    @ApiTags("stats")
    @ApiOperation({ summary: "Получить статистику по ссылке" })
    @ApiResponse({ status: 200, type: LinkStatDto })
    async getStats(@Param("shortCode") shortCode: string, @Query("page") page = "1", @Query("limit") limit = "20") {
        const link = await this.linkService.findByShortCode(shortCode);
        return this.linkService.getLinkStat(link.id, Number(page), Number(limit));
    }

    @Get("stats/:shortCode/summary")
    @ApiTags("stats")
    @ApiOperation({ summary: "Получить сводку по странам, регионам, бразурам и ОС" })
    @ApiResponse({ status: 200, type: ClickSummaryDto })
    async getStatsSummary(@Param("shortCode") shortCode: string) {
        const link = await this.linkService.findByShortCode(shortCode);
        return this.clickService.getClicksSummary(link.id);
    }
}
