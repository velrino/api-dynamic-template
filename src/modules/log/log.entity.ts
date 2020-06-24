import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { LogColumnEnum, LogEventColumnEnum, LogStatusColumnEnum } from '../log/log.enum';

@Entity({ name: 'log' })
export class LogEntity extends BaseEntity {
  // api
  @ApiPropertyOptional()
  // validations
  @IsEnum(LogColumnEnum)
  @IsString()
  @Length(0, 50)
  // db
  @Column({
    type: 'enum',
    enum: LogColumnEnum,
    default: LogColumnEnum.NONE,
    nullable: false
  })
  log: string;

  // api
  @ApiPropertyOptional()
  // validations
  @IsEnum(LogEventColumnEnum)
  @IsString()
  @Length(0, 50)
  // db
  @Column({
    type: 'enum',
    enum: LogEventColumnEnum,
    default: LogEventColumnEnum.GET,
    nullable: false
  })
  type: string;

  // api
  @ApiPropertyOptional()
  // validations
  @IsEnum(LogStatusColumnEnum)
  @IsString()
  @Length(0, 20)
  // db
  @Column({
    type: 'enum',
    enum: LogStatusColumnEnum,
    default: LogStatusColumnEnum.START,
    nullable: false
  })
  status: string;

  // api
  @ApiProperty()
  // validation
  @IsString()
  // db
  @Index()
  @Column({
    nullable: true
  })
  identifier: string;

  // api
  @ApiProperty()
  // validation
  @IsString()
  // db
  @Index()
  @Column({
    type: 'text',
    nullable: true
  })
  data: string;
}
