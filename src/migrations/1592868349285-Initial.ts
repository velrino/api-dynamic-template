import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1592868349285 implements MigrationInterface {
  name = 'Initial1592868349285'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "template_type_enum" AS ENUM('none', 'campaign', 'campaigns', 'FAQ', 'home')`);
    await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "route" character varying NOT NULL, "html" text NOT NULL, "type" "template_type_enum" NOT NULL DEFAULT 'none', "company_id" uuid, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_41bf3130d1daef8c51955bb5e18" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_41bf3130d1daef8c51955bb5e18"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "template"`);
    await queryRunner.query(`DROP TYPE "template_type_enum"`);
  }

}
