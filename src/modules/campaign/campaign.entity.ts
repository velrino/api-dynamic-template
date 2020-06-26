import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, Index, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { TemplateEntity } from '../template/template.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { PledgeEntity } from '../pledge/pledge.entity';
import { IsSlug } from '../../decorators/validators.decorator';

@Entity({ name: 'campaign' })
export class CampaignEntity extends BaseEntity {
    // api
    @ApiProperty()
    // validations
    @IsString()
    @MaxLength(150)
    @IsSlug()
    // db
    @Index({ unique: true })
    @Column({ nullable: true })
    slug: string;

    // api
    @ApiProperty({ type: () => TemplateEntity })
    @ManyToOne(() => TemplateEntity,
        template => template.id,
        { eager: true, persistence: true })
    @JoinColumn()
    template: TemplateEntity;

    // api
    @ApiProperty({ type: () => [ProfileEntity] })
    // validations
    @IsOptional()
    @IsArray()
    // db
    @ManyToOne(() => ProfileEntity, profile => profile.campaigns)
    profile: ProfileEntity[];

    // api
    @ApiProperty({ type: () => [PledgeEntity] })
    // validations
    @IsOptional()
    @IsArray()
    // db
    @OneToMany(() => PledgeEntity, pledge => pledge.campaign)
    pledge: PledgeEntity[];
}