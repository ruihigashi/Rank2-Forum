"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1758875909121 = void 0;
class InitialSchema1758875909121 {
    name = 'InitialSchema1758875909121';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "hash" character varying NOT NULL, "umail" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "micro_post" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa8a29af771579d6f0d126b61b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "token" character varying NOT NULL, "expire_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "micro_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.InitialSchema1758875909121 = InitialSchema1758875909121;
//# sourceMappingURL=1758875909121-initial_schema.js.map