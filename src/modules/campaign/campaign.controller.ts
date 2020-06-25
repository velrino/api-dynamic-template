import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { CampaignEntity } from './campaign.entity';
import { CampaignService } from './campaign.service';

@Crud({
    model: {
        type: CampaignEntity,
    },
    params: {
        id: {
            primary: true,
            type: 'string',
            field: 'slug',
        },
    },
    query: {
        limit: 25,
        maxLimit: 100,
        cache: 2000,
        alwaysPaginate: true,
        join: {
            template: {
                allow: ['html'],
                eager: true,
            },
            pledge: {
                eager: true,

            },
            'pledge.template': {
                alias: 'pledgeTemplate',
                allow: ['html'],
                eager: true,
            }
        },
    },
})

@Controller('api/campaign')
@ApiTags('campaign')
export class CampaignController implements CrudController<CampaignEntity> {
    constructor(public service: CampaignService) { }
}
