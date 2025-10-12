import { IsUrl } from "class-validator";
import { NormalizeUrl } from "src/common/decorators/normalize-url.decorator";

export class CreateLinkDto {
    @NormalizeUrl()
    @IsUrl({
        require_protocol: true,
        protocols: ["http", "https"]
    }, {
        message: "Неверный формат ссылки"
    })
    originalUrl: string;
}