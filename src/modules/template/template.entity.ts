import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IsArray, IsEnum, IsString, IsOptional } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { CampaignsEntity } from '../campaigns/campaigns.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { TemplateTypeColumnEnum } from './template.enum';

@Entity({ name: 'template' })
export class TemplateEntity extends BaseEntity {
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
        default: TemplateTypeColumnEnum.CAMPAIGN,
        nullable: false
    })
    type: string;

    // api
    @ApiProperty({ type: () => CampaignsEntity })
    // db
    @OneToOne(() => CampaignsEntity, campaign => campaign.template)
    campaign: CampaignsEntity;

    // api
    @ApiProperty({ type: () => ProfileEntity })
    // db
    @OneToOne(() => ProfileEntity, profile => profile.templates)
    profile: ProfileEntity;
}