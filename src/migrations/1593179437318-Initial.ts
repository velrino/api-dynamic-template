import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1593179437318 implements MigrationInterface {
    name = 'Initial1593179437318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" ADD "script" text`);
        await queryRunner.query(`ALTER TABLE "template" ADD "css" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "css"`);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "script"`);
    }

}
