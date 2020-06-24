import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogRepository } from './log.repository';
import { LogService } from './log.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogRepository])],
  exports: [LogService],
  providers: [LogService],
})
export class LogModule {}
