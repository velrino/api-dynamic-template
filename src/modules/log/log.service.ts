import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { LogEntity } from './log.entity';
import { LogRepository } from './log.repository';

@Injectable()
export class LogService extends TypeOrmCrudService<LogEntity> {
  constructor(public readonly repository: LogRepository) {
    super(repository);
  }
}
