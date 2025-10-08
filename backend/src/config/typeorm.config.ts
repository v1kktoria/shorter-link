import { DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const typeOrmConfig = (configService: ConfigService): DataSourceOptions => ({
  type: "postgres",
  host: configService.getOrThrow<string>("DATABASE_HOST"),
  port: configService.getOrThrow<number>("DATABASE_PORT"),
  username: configService.getOrThrow<string>("DATABASE_USER"),
  password: configService.getOrThrow<string>("DATABASE_PASSWORD"),
  database: configService.getOrThrow<string>("DATABASE_NAME"),
  entities: [join(__dirname, '../modules/**/entities/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: false,
  logging: configService.getOrThrow("NODE_ENV") !== "prod",
});