import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsString } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { CompanyEntity } from '../company/company.entity';
import { TemplateTypeColumnEnum } from './template.enum';

@Entity({ name: 'template' })
export class TemplateEntity extends BaseEntity {
    // api
    @ApiProperty({
        type: () => CompanyEntity,
    })
    // db
    @ManyToOne(
        () => CompanyEntity,
        (company) => company.id,
        {
            eager: true,
        },
    )
    @JoinColumn()
    company: CompanyEntity;

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
}