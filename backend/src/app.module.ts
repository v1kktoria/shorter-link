import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { ConfigModule } from '@nestjs/config';
import { LinkModule } from './modules/link/link.module';
import { ClickModule } from './modules/click/click.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    LinkModule,
    ClickModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
