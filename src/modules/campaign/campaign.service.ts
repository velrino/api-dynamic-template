import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { CampaignEntity } from './campaign.entity';

@Injectable()
export class CampaignService extends TypeOrmCrudService<CampaignEntity> {
  constructor(@InjectRepository(CampaignEntity) repository) {
    super(repository);
  }
}
