import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1592970806936 implements MigrationInterface {
    name = 'Initial1592970806936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL DEFAULT 0, "email_validated" boolean NOT NULL DEFAULT false, "password" character varying(255) DEFAULT 0, "profile_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying, "location" character varying, "name" character varying, "body" character varying, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_320e259757524e1b21cd08d0f1" ON "profile" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_83201725f7096a4ac3d4edf82b" ON "profile" ("location") `);
        await queryRunner.query(`CREATE INDEX "IDX_0046bf0859cceb5f1744df2a36" ON "profile" ("name") `);
        await queryRunner.query(`CREATE TYPE "template_type_enum" AS ENUM('campaign', 'email', 'faq', 'pledge', 'profile')`);
        await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "html" text NOT NULL, "type" "template_type_enum" NOT NULL DEFAULT 'campaign', CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pledge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "body" character varying, "template_id" uuid, "campaign_id" uuid, CONSTRAINT "REL_97079aed95ee0801b1dfcbbcea" UNIQUE ("template_id"), CONSTRAINT "REL_76ff8eaf9d19710d28a63b3986" UNIQUE ("campaign_id"), CONSTRAINT "PK_45ccbbcda634f9a57e8b9c41fee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eac5487e4f5a272c4d874e84e3" ON "pledge" ("name") `);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying, "template_id" uuid, "profile_id" uuid, CONSTRAINT "REL_e7710203c0b031e01de765c25e" UNIQUE ("template_id"), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a0d1755d181035fa13ffb64307" ON "campaigns" ("slug") `);
        await queryRunner.query(`CREATE TYPE "log_log_enum" AS ENUM('none')`);
        await queryRunner.query(`CREATE TYPE "log_type_enum" AS ENUM('create', 'delete', 'get', 'update')`);
        await queryRunner.query(`CREATE TYPE "log_status_enum" AS ENUM('fail', 'start', 'success')`);
        await queryRunner.query(`CREATE TABLE "log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "log" "log_log_enum" NOT NULL DEFAULT 'none', "type" "log_type_enum" NOT NULL DEFAULT 'get', "status" "log_status_enum" NOT NULL DEFAULT 'start', "identifier" character varying, "data" text, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_919f652e0f6b907aa845d3e49b" ON "log" ("identifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f374d703b27856b9d43e79279" ON "log" ("data") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pledge" ADD CONSTRAINT "FK_97079aed95ee0801b1dfcbbceac" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pledge" ADD CONSTRAINT "FK_76ff8eaf9d19710d28a63b39866" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_e7710203c0b031e01de765c25e7" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_ddbab30c6ef9eb267ffa2e5056d" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_ddbab30c6ef9eb267ffa2e5056d"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_e7710203c0b031e01de765c25e7"`);
        await queryRunner.query(`ALTER TABLE "pledge" DROP CONSTRAINT "FK_76ff8eaf9d19710d28a63b39866"`);
        await queryRunner.query(`ALTER TABLE "pledge" DROP CONSTRAINT "FK_97079aed95ee0801b1dfcbbceac"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`DROP INDEX "IDX_4f374d703b27856b9d43e79279"`);
        await queryRunner.query(`DROP INDEX "IDX_919f652e0f6b907aa845d3e49b"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TYPE "log_status_enum"`);
        await queryRunner.query(`DROP TYPE "log_type_enum"`);
        await queryRunner.query(`DROP TYPE "log_log_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_a0d1755d181035fa13ffb64307"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP INDEX "IDX_eac5487e4f5a272c4d874e84e3"`);
        await queryRunner.query(`DROP TABLE "pledge"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TYPE "template_type_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_0046bf0859cceb5f1744df2a36"`);
        await queryRunner.query(`DROP INDEX "IDX_83201725f7096a4ac3d4edf82b"`);
        await queryRunner.query(`DROP INDEX "IDX_320e259757524e1b21cd08d0f1"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
