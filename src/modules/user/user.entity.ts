import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { IsPassword } from '../../decorators/validators.decorator';
import { ProfileEntity } from '../profile/profile.entity';
import { PasswordTransformer } from './password.transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    // api
    @ApiProperty()
    // validations
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    // eslint-disable-next-line camelcase
    @IsEmail({ require_tld: false }, { always: true })
    // db
    @Index()
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        default: 0,
        unique: true,
    })
    email: string;

    // api
    @ApiProperty()
    // validations
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsBoolean({ always: true })
    // db
    @Column({ nullable: false, type: 'boolean', default: false })
    emailValidated: boolean;

    // api
    @ApiProperty()
    // validations
    @IsOptional()
    @IsString()
    @MaxLength(255)
    @IsPassword()
    @Exclude({ toPlainOnly: true }) // do not serialize this
    // db
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        transformer: new PasswordTransformer(),
        default: 0,
    })
    password: string;

    // api
    @ApiProperty({ type: () => ProfileEntity })
    @OneToOne(() => ProfileEntity,
        profile => profile.user,
        { eager: true, persistence: true })
    @JoinColumn()
    profile: ProfileEntity;
}
