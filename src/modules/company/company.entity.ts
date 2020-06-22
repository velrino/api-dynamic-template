import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany } from 'typeorm';
import { IsArray, IsOptional } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { TemplateEntity } from '../template/template.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {

    @ApiProperty()
    @Column({ type: 'varchar' })
    slug: string;

    // api
    @ApiProperty({ type: () => [TemplateEntity] })
    // validations
    @IsOptional()
    @IsArray()
    // db
    @OneToMany(
        () => TemplateEntity,
        template => template.company,
    )
    templates: TemplateEntity[];

}