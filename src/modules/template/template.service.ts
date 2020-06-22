import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { TemplateEntity } from './template.entity';

@Injectable()
export class TemplateService extends TypeOrmCrudService<TemplateEntity> {
  constructor(@InjectRepository(TemplateEntity) repository) {
    super(repository);
  }
}
