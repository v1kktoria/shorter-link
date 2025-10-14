import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";
import { NormalizeUrl } from "src/common/decorators/normalize-url.decorator";

export class CreateLinkDto {
    @ApiProperty({ example: "https://example.com", description: "Оригинальный URL" })
    @NormalizeUrl()
    @IsUrl({
        require_protocol: true,
        protocols: ["http", "https"]
    }, {
        message: "Неверный формат ссылки"
    })
    originalUrl: string;
}