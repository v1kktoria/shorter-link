import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './entities';
import { ClickService, GeoService} from './services';
import { UserAgentParserService } from 'src/common/utils/user-agent-parser.service';
import { ClickRepository } from './repositories/click.repository';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Entities))],
  providers: [ClickService, GeoService, UserAgentParserService, ClickRepository],
  exports: [ClickService],
})
export class ClickModule {}
