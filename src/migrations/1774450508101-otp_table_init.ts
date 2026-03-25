import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1774450508101 implements MigrationInterface {
    name = 'AutoMigration1774450508101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "hashedOtp" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_463cf01e0ea83ad57391fd4e1d7" UNIQUE ("email"), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
