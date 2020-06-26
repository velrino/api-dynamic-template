import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1593051576512 implements MigrationInterface {
    name = 'Initial1593051576512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_9448e42b62ffbcf0da2719b5bb7"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP CONSTRAINT "REL_9448e42b62ffbcf0da2719b5bb"`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_9448e42b62ffbcf0da2719b5bb7" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_9448e42b62ffbcf0da2719b5bb7"`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD CONSTRAINT "REL_9448e42b62ffbcf0da2719b5bb" UNIQUE ("template_id")`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_9448e42b62ffbcf0da2719b5bb7" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
