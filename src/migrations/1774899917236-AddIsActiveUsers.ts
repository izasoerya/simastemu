import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveUsers1774899917236 implements MigrationInterface {
    name = 'AddIsActiveUsers1774899917236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActivated" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActivated"`);
    }

}
