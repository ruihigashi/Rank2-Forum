import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1758181981798 implements MigrationInterface {
    name = 'InitialSchema1758181981798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "micro_post" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa8a29af771579d6f0d126b61b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "token" character varying NOT NULL, "expire_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "hash" character varying NOT NULL, "umail" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "micro_post"`);
    }

}
