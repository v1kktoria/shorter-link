import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './entities';
import { ClickModule } from '../click/click.module';
import { LinkService } from './services/link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    ClickModule,
  ],
  providers: [LinkService],
  exports: [],
})
export class LinkModule {}
