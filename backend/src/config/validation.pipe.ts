import { BadRequestException, ValidationPipe } from "@nestjs/common";

export const createGlobalValidationPipe = (): ValidationPipe => new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    forbidUnknownValues: true,
    exceptionFactory: (erros) => {
        const message = erros
            .map(err => Object.values(err.constraints ?? {}).join(", "))
            .join("; ");
        return new BadRequestException(message);
    },
});