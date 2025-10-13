import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './entities';
import { ClickModule } from '../click/click.module';
import { LinkService } from './services/link.service';
import { LinkController } from './controllers/link.controller';
import { LinkRepository } from './repositories/link.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    ClickModule,
  ],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository],
  exports: [],
})
export class LinkModule {}
