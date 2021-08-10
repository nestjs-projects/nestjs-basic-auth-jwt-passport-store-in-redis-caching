import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1628500816456 implements MigrationInterface {
    name = 'UserMigration1628500816456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`nestjs-basic-crud-mysql\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`nestjs-basic-crud-mysql\`.\`users\``);
    }

}
