import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, Index, OneToMany, OneToOne } from 'typeorm';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { TemplateEntity } from '../template/template.entity';
import { UserEntity } from '../user/user.entity';
import { IsSlug } from '../../decorators/validators.decorator';
import { CampaignEntity } from '../campaign/campaign.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity {
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

    @ApiPropertyOptional()
    // validations
    // @IsString()
    @MaxLength(150)
    @IsOptional()
    // db
    @Index()
    @Column({ nullable: true })
    location: string;

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

    // api
    @ApiProperty({ type: () => UserEntity })
    // db
    @OneToOne(() => UserEntity, user => user.profile)
    user: UserEntity;

    // api
    @ApiProperty({ type: () => [TemplateEntity] })
    // validations
    @IsOptional()
    @IsArray()
    // db
    @OneToMany(() => TemplateEntity, template => template.profile)
    templates: TemplateEntity[];

    // api
    @ApiProperty({ type: () => [CampaignEntity] })
    // validations
    @IsOptional()
    @IsArray()
    // db
    @OneToMany(() => CampaignEntity, campaign => campaign.profile)
    campaigns: CampaignEntity[];
}