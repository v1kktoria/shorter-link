import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export interface ClientInfo {
    ip: string;
    userAgent: string;
}

export const Client = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): ClientInfo => {
        const req = ctx.switchToHttp().getRequest<Request>();
        const forwarded = req.headers["x-forwarded-for"];
        let ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.ip ?? "";
        const userAgent = req.headers["user-agent"] ?? "";

        if (process.env.NODE_ENV !== "prod" && process.env.DEV_CLIENT_IP) {
            ip = process.env.DEV_CLIENT_IP;
        }

        return { ip, userAgent };
    },
);