import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1774888984911 implements MigrationInterface {
    name = 'AutoMigration1774888984911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActivated" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActivated"`);
    }

}
