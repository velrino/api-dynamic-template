import {
    Controller,
    Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TemplateService } from './template.service';

@Controller('api/template')
@ApiTags('template')
export class TemplateController {
    constructor(
        public service: TemplateService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Reprocess all values in CommentVc' })
    async list() {
        return await this.service.find();
    }
}
