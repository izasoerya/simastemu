import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1754070148783 implements MigrationInterface {
    name = 'InitDB1754070148783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "ownerName" character varying NOT NULL, "spptNumber" character varying NOT NULL, "certificateNumber" character varying NOT NULL, "latitude" numeric(9,6) NOT NULL, "longitude" numeric(9,6) NOT NULL, "sizeArea" numeric NOT NULL, "landPrice" numeric NOT NULL, "njopPrice" numeric NOT NULL, "zonePrice" numeric NOT NULL, "imageURLs" text array NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userUid" uuid NOT NULL, CONSTRAINT "PK_7b1946392ffdcb50cfc6ac78c0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password_hashed" text NOT NULL, "password_salt" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_6e20ce1edf0678a09f1963f9587" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_23abd87a863e00caf5f5bc20f29" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_23abd87a863e00caf5f5bc20f29"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "inventories"`);
    }

}
