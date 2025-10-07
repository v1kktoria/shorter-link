import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { ConfigModule } from '@nestjs/config';
import { LinkModule } from './modules/link/link.module';
import { ClickModule } from './modules/click/click.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { createGlobalValidationPipe } from './config/validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    LinkModule,
    ClickModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: createGlobalValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
