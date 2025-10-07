import { IsUrl } from "class-validator";

export class CreateLinkDto {
    @IsUrl({}, { message: "Неверный формат ссылки" })
    originalUrl: string;
}