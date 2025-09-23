import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeiraMigration1758590982688 implements MigrationInterface {
    name = 'PrimeiraMigration1758590982688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`interacao_cliente\` (
                \`interacao_ID\` int NOT NULL AUTO_INCREMENT,
                \`data_interacao\` date NOT NULL,
                \`tipo_interacao\` varchar(20) NOT NULL,
                \`relatorio_interacao\` varchar(255) NOT NULL,
                \`funcionario_ID\` int NULL,
                \`cliente_ID\` int NULL,
                \`agendamento_interacao_ID\` int NULL,
                PRIMARY KEY (\`interacao_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`agendamento_interacao\` (
                \`agendamento_interacao_ID\` int NOT NULL AUTO_INCREMENT,
                \`data_marcada\` datetime NOT NULL,
                \`tipo_interacao\` varchar(20) NOT NULL,
                \`status\` varchar(20) NOT NULL,
                \`notas\` varchar(255) NULL,
                \`cliente_ID\` int NULL,
                \`funcionario_ID\` int NULL,
                PRIMARY KEY (\`agendamento_interacao_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`notificacao\` (
                \`notificacao_ID\` int NOT NULL AUTO_INCREMENT,
                \`titulo_notificacao\` varchar(100) NOT NULL,
                \`corpo_notificacao\` longtext NULL,
                \`evento_ID\` int NULL,
                PRIMARY KEY (\`notificacao_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`notificacao_convidados\` (
                \`funcionario_ID\` int NOT NULL,
                \`evento_ID\` int NOT NULL,
                \`notificacao_ID\` int NOT NULL,
                \`status_leitura\` tinyint NOT NULL,
                \`data_leitura\` timestamp NULL,
                \`prioridade\` varchar(20) NOT NULL,
                PRIMARY KEY (\`funcionario_ID\`, \`evento_ID\`, \`notificacao_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`presenca\` (
                \`presenca_ID\` int NOT NULL AUTO_INCREMENT,
                \`presente\` tinyint NOT NULL,
                \`razao_recusa\` longtext NULL,
                \`data_termino\` timestamp NULL,
                \`link_feedback\` longtext NULL,
                \`funcionario_ID\` int NULL,
                \`evento_ID\` int NULL,
                PRIMARY KEY (\`presenca_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`funcionarios_convidados\` (
                \`funcionario_id\` int NOT NULL,
                \`evento_id\` int NOT NULL,
                PRIMARY KEY (\`funcionario_id\`, \`evento_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`evento_treinamento\` (
                \`evento_ID\` int NOT NULL AUTO_INCREMENT,
                \`titulo\` varchar(100) NOT NULL,
                \`descricao\` longtext NULL,
                \`data_inicio\` timestamp NOT NULL,
                \`duracao_horas\` float NOT NULL,
                \`evento_link\` longtext NOT NULL,
                \`status\` varchar(20) NOT NULL,
                \`organizador_ID\` int NULL,
                PRIMARY KEY (\`evento_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`Funcionario\` (
                \`funcionario_ID\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(100) NOT NULL,
                \`genero\` varchar(10) NOT NULL,
                \`endereco\` varchar(255) NOT NULL,
                \`numero_telefone\` varchar(20) NOT NULL,
                \`cargo\` varchar(50) NOT NULL,
                \`email\` varchar(50) NOT NULL,
                \`senha_hash\` varchar(255) NOT NULL,
                \`nivel_acesso\` varchar(255) NOT NULL,
                \`localizacao_funcionario\` varchar(100) NOT NULL,
                \`gerente_ID\` int NULL,
                UNIQUE INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` (\`email\`),
                PRIMARY KEY (\`funcionario_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`historico_funil\` (
                \`historico_ID\` int NOT NULL AUTO_INCREMENT,
                \`data_movimentacao\` timestamp NOT NULL,
                \`cliente_ID\` int NULL,
                \`funil_ID\` int NULL,
                PRIMARY KEY (\`historico_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`funil_vendas\` (
                \`funil_ID\` int NOT NULL AUTO_INCREMENT,
                \`estagio_nome\` varchar(20) NOT NULL,
                PRIMARY KEY (\`funil_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`contato_cliente\` (
                \`contato_cliente_ID\` int NOT NULL AUTO_INCREMENT,
                \`tipo_contato\` varchar(20) NOT NULL,
                \`valor_contato\` varchar(255) NOT NULL,
                \`cliente_ID\` int NULL,
                PRIMARY KEY (\`contato_cliente_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`cliente\` (
                \`cliente_ID\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(100) NOT NULL,
                \`endereco\` varchar(255) NOT NULL,
                \`funcionario_ID\` int NULL,
                \`funil_ID\` int NULL,
                PRIMARY KEY (\`cliente_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`vendas\` (
                \`venda_ID\` int NOT NULL AUTO_INCREMENT,
                \`data_venda\` timestamp NOT NULL,
                \`valor_total\` decimal(10, 2) NOT NULL,
                \`status\` varchar(20) NOT NULL,
                \`cliente_ID\` int NULL,
                \`funcionario_ID\` int NULL,
                PRIMARY KEY (\`venda_ID\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`interacao_cliente\`
            ADD CONSTRAINT \`FK_53b40a373b835f715ed6d27c426\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`interacao_cliente\`
            ADD CONSTRAINT \`FK_bbbc8ef8bbefbcfc50638cffbf9\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`interacao_cliente\`
            ADD CONSTRAINT \`FK_b9c7850842507cb413e70805e65\` FOREIGN KEY (\`agendamento_interacao_ID\`) REFERENCES \`agendamento_interacao\`(\`agendamento_interacao_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`agendamento_interacao\`
            ADD CONSTRAINT \`FK_19092556c9293200ce6e115b817\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`agendamento_interacao\`
            ADD CONSTRAINT \`FK_cebbf3f76219935303cea69c306\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`notificacao\`
            ADD CONSTRAINT \`FK_0fef312862a6a6763fbb84bdacc\` FOREIGN KEY (\`evento_ID\`) REFERENCES \`evento_treinamento\`(\`evento_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`notificacao_convidados\`
            ADD CONSTRAINT \`FK_8085283c00ca383828ebec0cb95\` FOREIGN KEY (\`notificacao_ID\`) REFERENCES \`notificacao\`(\`notificacao_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`notificacao_convidados\`
            ADD CONSTRAINT \`FK_075edbe303a9f9365036ed30133\` FOREIGN KEY (\`funcionario_ID\`, \`evento_ID\`) REFERENCES \`funcionarios_convidados\`(\`funcionario_id\`, \`evento_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`presenca\`
            ADD CONSTRAINT \`FK_7c40a09332d46e949bb471f8c94\` FOREIGN KEY (\`funcionario_ID\`, \`evento_ID\`) REFERENCES \`funcionarios_convidados\`(\`funcionario_id\`, \`evento_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`funcionarios_convidados\`
            ADD CONSTRAINT \`FK_fb0e384b31671a8e90ad7af57cd\` FOREIGN KEY (\`evento_id\`) REFERENCES \`evento_treinamento\`(\`evento_ID\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`funcionarios_convidados\`
            ADD CONSTRAINT \`FK_4172e186b9450269143a2b68539\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`evento_treinamento\`
            ADD CONSTRAINT \`FK_179b062aafd6bf1726edd28e5ce\` FOREIGN KEY (\`organizador_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`Funcionario\`
            ADD CONSTRAINT \`FK_b13934bb9abdb7b2f4faef99ced\` FOREIGN KEY (\`gerente_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`historico_funil\`
            ADD CONSTRAINT \`FK_725875f741386cf8629dad50cef\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`historico_funil\`
            ADD CONSTRAINT \`FK_c8ddb72acd688afa2d55b29a835\` FOREIGN KEY (\`funil_ID\`) REFERENCES \`funil_vendas\`(\`funil_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`contato_cliente\`
            ADD CONSTRAINT \`FK_d0c3540d11140ae9b7b5496027c\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`cliente\`
            ADD CONSTRAINT \`FK_8c583b796ed4eeafaad42c0573d\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`cliente\`
            ADD CONSTRAINT \`FK_b1925863511d042a4c3f27dd19e\` FOREIGN KEY (\`funil_ID\`) REFERENCES \`funil_vendas\`(\`funil_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`vendas\`
            ADD CONSTRAINT \`FK_ee8c5be2dbf5f5d14ce8b8a8994\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`vendas\`
            ADD CONSTRAINT \`FK_2e85624dea665ef2428d79ea27b\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`vendas\` DROP FOREIGN KEY \`FK_2e85624dea665ef2428d79ea27b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`vendas\` DROP FOREIGN KEY \`FK_ee8c5be2dbf5f5d14ce8b8a8994\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_b1925863511d042a4c3f27dd19e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_8c583b796ed4eeafaad42c0573d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`contato_cliente\` DROP FOREIGN KEY \`FK_d0c3540d11140ae9b7b5496027c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`historico_funil\` DROP FOREIGN KEY \`FK_c8ddb72acd688afa2d55b29a835\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`historico_funil\` DROP FOREIGN KEY \`FK_725875f741386cf8629dad50cef\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_b13934bb9abdb7b2f4faef99ced\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`evento_treinamento\` DROP FOREIGN KEY \`FK_179b062aafd6bf1726edd28e5ce\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`funcionarios_convidados\` DROP FOREIGN KEY \`FK_4172e186b9450269143a2b68539\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`funcionarios_convidados\` DROP FOREIGN KEY \`FK_fb0e384b31671a8e90ad7af57cd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`presenca\` DROP FOREIGN KEY \`FK_7c40a09332d46e949bb471f8c94\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`notificacao_convidados\` DROP FOREIGN KEY \`FK_075edbe303a9f9365036ed30133\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`notificacao_convidados\` DROP FOREIGN KEY \`FK_8085283c00ca383828ebec0cb95\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`notificacao\` DROP FOREIGN KEY \`FK_0fef312862a6a6763fbb84bdacc\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`agendamento_interacao\` DROP FOREIGN KEY \`FK_cebbf3f76219935303cea69c306\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`agendamento_interacao\` DROP FOREIGN KEY \`FK_19092556c9293200ce6e115b817\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`interacao_cliente\` DROP FOREIGN KEY \`FK_b9c7850842507cb413e70805e65\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`interacao_cliente\` DROP FOREIGN KEY \`FK_bbbc8ef8bbefbcfc50638cffbf9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`interacao_cliente\` DROP FOREIGN KEY \`FK_53b40a373b835f715ed6d27c426\`
        `);
        await queryRunner.query(`
            DROP TABLE \`vendas\`
        `);
        await queryRunner.query(`
            DROP TABLE \`cliente\`
        `);
        await queryRunner.query(`
            DROP TABLE \`contato_cliente\`
        `);
        await queryRunner.query(`
            DROP TABLE \`funil_vendas\`
        `);
        await queryRunner.query(`
            DROP TABLE \`historico_funil\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` ON \`Funcionario\`
        `);
        await queryRunner.query(`
            DROP TABLE \`Funcionario\`
        `);
        await queryRunner.query(`
            DROP TABLE \`evento_treinamento\`
        `);
        await queryRunner.query(`
            DROP TABLE \`funcionarios_convidados\`
        `);
        await queryRunner.query(`
            DROP TABLE \`presenca\`
        `);
        await queryRunner.query(`
            DROP TABLE \`notificacao_convidados\`
        `);
        await queryRunner.query(`
            DROP TABLE \`notificacao\`
        `);
        await queryRunner.query(`
            DROP TABLE \`agendamento_interacao\`
        `);
        await queryRunner.query(`
            DROP TABLE \`interacao_cliente\`
        `);
    }

}
