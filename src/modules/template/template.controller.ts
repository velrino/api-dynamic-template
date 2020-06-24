import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { TemplateEntity } from './template.entity';
import { TemplateService } from './template.service';

@Crud({
    model: {
        type: TemplateEntity,
    },
    params: {
        id: {
            primary: true,
            type: 'string',
            field: 'id',
        },
    },
    dto: {
        create: TemplateEntity,
        update: TemplateEntity,
        replace: TemplateEntity,
    },
    query: {
        limit: 25,
        maxLimit: 100,
        cache: 2000,
        alwaysPaginate: true,
        join: {
            profile: {
                eager: true,
            },
        },
    },
})

@Controller('api/template')
@ApiTags('template')
export class TemplateController implements CrudController<TemplateEntity> {
    constructor(public service: TemplateService) { }
}
