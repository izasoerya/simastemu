import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1774889094889 implements MigrationInterface {
    name = 'AutoMigration1774889094889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActivated"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActivated" boolean NOT NULL`);
    }

}
