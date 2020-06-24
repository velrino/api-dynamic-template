import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1592962834734 implements MigrationInterface {
    name = 'Initial1592962834734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_41bf3130d1daef8c51955bb5e18"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL DEFAULT 0, "email_validated" boolean NOT NULL DEFAULT false, "password" character varying(255) DEFAULT 0, "profile_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying, "location" character varying, "name" character varying, "title" character varying, "body" character varying, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_320e259757524e1b21cd08d0f1" ON "profile" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_83201725f7096a4ac3d4edf82b" ON "profile" ("location") `);
        await queryRunner.query(`CREATE INDEX "IDX_0046bf0859cceb5f1744df2a36" ON "profile" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1b1c4c0fd3e3eeabd3eff8b32" ON "profile" ("title") `);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "company_id"`);
        await queryRunner.query(`CREATE TYPE "template_entity_enum" AS ENUM('company', 'user')`);
        await queryRunner.query(`ALTER TABLE "template" ADD "entity" "template_entity_enum" NOT NULL DEFAULT 'company'`);
        await queryRunner.query(`ALTER TABLE "template" ADD "profile_id" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."template_type_enum" RENAME TO "template_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "template_type_enum" AS ENUM('none', 'campaign', 'FAQ', 'home', 'pledge', 'profile')`);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "type" TYPE "template_type_enum" USING "type"::"text"::"template_type_enum"`);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "type" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "template_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_75f48c22d4e52edbea19dd34a39" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_75f48c22d4e52edbea19dd34a39"`);
        await queryRunner.query(`CREATE TYPE "template_type_enum_old" AS ENUM('none', 'campaign', 'campaigns', 'FAQ', 'home')`);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "type" TYPE "template_type_enum_old" USING "type"::"text"::"template_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "type" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "template_type_enum"`);
        await queryRunner.query(`ALTER TYPE "template_type_enum_old" RENAME TO  "template_type_enum"`);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "profile_id"`);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "entity"`);
        await queryRunner.query(`DROP TYPE "template_entity_enum"`);
        await queryRunner.query(`ALTER TABLE "template" ADD "company_id" uuid`);
        await queryRunner.query(`DROP INDEX "IDX_a1b1c4c0fd3e3eeabd3eff8b32"`);
        await queryRunner.query(`DROP INDEX "IDX_0046bf0859cceb5f1744df2a36"`);
        await queryRunner.query(`DROP INDEX "IDX_83201725f7096a4ac3d4edf82b"`);
        await queryRunner.query(`DROP INDEX "IDX_320e259757524e1b21cd08d0f1"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_41bf3130d1daef8c51955bb5e18" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
