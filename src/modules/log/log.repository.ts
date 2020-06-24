import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { LogEntity } from './log.entity';

@EntityRepository(LogEntity)
export class LogRepository extends Repository<LogEntity> {}
