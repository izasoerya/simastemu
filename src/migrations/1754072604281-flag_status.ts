import { MigrationInterface, QueryRunner } from "typeorm";

export class FlagStatus1754072604281 implements MigrationInterface {
    name = 'FlagStatus1754072604281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" ADD "flagStatus" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP COLUMN "flagStatus"`);
    }

}
