import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { CampaignEntity } from './campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  providers: [CampaignService],
  controllers: [CampaignController],
  exports: []
})
export class CampaignModule { }