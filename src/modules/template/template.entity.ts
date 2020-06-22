import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { CompanyEntity } from '../company/company.entity';

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
}