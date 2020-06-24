import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsString } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { TemplateEntityColumnEnum, TemplateTypeColumnEnum } from './template.enum';

@Entity({ name: 'template' })
export class TemplateEntity extends BaseEntity {
    // api
    @ApiProperty({
        type: () => ProfileEntity,
    })
    // db
    @ManyToOne(
        () => ProfileEntity,
        (profile) => profile.id,
        {
            eager: true
        })
    @JoinColumn()
    profile: ProfileEntity;

    @ApiProperty()
    @Column({ type: 'varchar' })
    route: string;

    @ApiProperty()
    @Column({ type: 'text' })
    html: string;

    @ApiProperty()
    // validations
    @IsEnum(TemplateTypeColumnEnum)
    @IsString()
    // db
    @Column({
        type: 'enum',
        enum: TemplateTypeColumnEnum,
        default: TemplateTypeColumnEnum.NONE,
        nullable: false
    })
    type: string;

    @ApiProperty()
    // validations
    @IsEnum(TemplateEntityColumnEnum)
    @IsString()
    // db
    @Column({
        type: 'enum',
        enum: TemplateEntityColumnEnum,
        default: TemplateEntityColumnEnum.COMPANY,
        nullable: false
    })
    entity: string;
}