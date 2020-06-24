import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, Index, OneToMany, OneToOne } from 'typeorm';
import { IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { CampaignEntity } from '../campaign/campaign.entity';
import { TemplateEntity } from '../template/template.entity';

@Entity({ name: 'pledge' })
export class PledgeEntity extends BaseEntity {
    // api
    @ApiProperty()
    // validations
    @IsString()
    @MaxLength(150)
    @IsOptional()
    // db
    @Index()
    @Column({ nullable: true })
    name: string;

    // api
    @ApiPropertyOptional()
    // validations
    @IsString()
    @MaxLength(1500)
    // db
    @Column({ nullable: true })
    body: string;

    @ApiProperty({ type: () => TemplateEntity })
    // db
    @OneToOne(
        () => TemplateEntity,
        (template) => template.id,
        { eager: true })
    @JoinColumn()
    template: TemplateEntity;

    @ApiProperty({ type: () => CampaignEntity })
    // db
    @OneToOne(
        () => CampaignEntity,
        (campaign) => campaign.id,
        { eager: true })
    @JoinColumn()
    campaign: CampaignEntity;
}