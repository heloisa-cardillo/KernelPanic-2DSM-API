import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeiraMigration1758028889160 implements MigrationInterface {
    name = 'PrimeiraMigration1758028889160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notificacao\` (\`notificacao_ID\` int NOT NULL AUTO_INCREMENT, \`titulo_notificacao\` varchar(100) NOT NULL, \`corpo_notificacao\` longtext NULL, \`eventoEventoID\` int NULL, PRIMARY KEY (\`notificacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notificacao_convidados\` (\`funcionario_ID\` int NOT NULL, \`evento_ID\` int NOT NULL, \`notificacao_ID\` int NOT NULL, \`status_leitura\` tinyint NOT NULL, \`data_leitura\` datetime NULL, \`prioridade\` varchar(20) NOT NULL, \`notificacaoNotificacaoID\` int NULL, \`funcionarioConvidadoFuncionarioID\` int NULL, \`funcionarioConvidadoEventoID\` int NULL, PRIMARY KEY (\`funcionario_ID\`, \`evento_ID\`, \`notificacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`presenca\` (\`presenca_ID\` int NOT NULL AUTO_INCREMENT, \`presente\` tinyint NOT NULL, \`razao_recusa\` longtext NULL, \`data_termino\` datetime NULL, \`link_feedback\` longtext NULL, \`funcionarioConvidadoFuncionarioID\` int NULL, \`funcionarioConvidadoEventoID\` int NULL, PRIMARY KEY (\`presenca_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`funcionarios_convidados\` (\`funcionario_ID\` int NOT NULL, \`evento_ID\` int NOT NULL, \`eventoEventoID\` int NULL, \`funcionarioFuncionarioID\` int NULL, PRIMARY KEY (\`funcionario_ID\`, \`evento_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`evento_treinamento\` (\`evento_ID\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`descricao\` longtext NULL, \`data_inicio\` datetime NOT NULL, \`duracao_horas\` float NOT NULL, \`evento_link\` longtext NOT NULL, \`status\` varchar(20) NOT NULL, \`organizadorFuncionarioID\` int NULL, PRIMARY KEY (\`evento_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`interacao_cliente\` (\`interacao_ID\` int NOT NULL AUTO_INCREMENT, \`data_interacao\` date NOT NULL, \`tipo_interacao\` varchar(20) NOT NULL, \`relatorio_interacao\` varchar(255) NOT NULL, \`funcionarioFuncionarioID\` int NULL, \`clienteClienteID\` int NULL, \`agendamentoAgendamentoInteracaoID\` int NULL, PRIMARY KEY (\`interacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vendas\` (\`venda_ID\` int NOT NULL AUTO_INCREMENT, \`data_venda\` date NOT NULL, \`valor_total\` decimal(10,2) NOT NULL, \`status\` varchar(20) NOT NULL, \`clienteClienteID\` int NULL, \`funcionarioFuncionarioID\` int NULL, PRIMARY KEY (\`venda_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`funcionario\` (\`funcionario_ID\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`genero\` varchar(10) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`numero_telefone\` varchar(20) NOT NULL, \`cargo\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`senha_hash\` varchar(255) NOT NULL, \`nivel_acesso\` varchar(255) NOT NULL, \`localizacao_funcionario\` varchar(100) NOT NULL, \`gerenteFuncionarioID\` int NULL, UNIQUE INDEX \`IDX_f868493b618f6780e84ea266e5\` (\`email\`), PRIMARY KEY (\`funcionario_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`historico_funil\` (\`historico_ID\` int NOT NULL AUTO_INCREMENT, \`data_movimentacao\` timestamp NOT NULL, \`clienteClienteID\` int NULL, \`funilFunilID\` int NULL, PRIMARY KEY (\`historico_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`funil_vendas\` (\`funil_ID\` int NOT NULL AUTO_INCREMENT, \`estagio_nome\` varchar(20) NOT NULL, PRIMARY KEY (\`funil_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contato_cliente\` (\`Contato_cliente_ID\` int NOT NULL AUTO_INCREMENT, \`tipo_contato\` varchar(20) NOT NULL, \`valor_contato\` varchar(255) NOT NULL, \`clienteClienteID\` int NULL, PRIMARY KEY (\`Contato_cliente_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`cliente_ID\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`funcionarioFuncionarioID\` int NULL, \`funilFunilID\` int NULL, PRIMARY KEY (\`cliente_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agendamento_interacao\` (\`agendamento_interacao_ID\` int NOT NULL AUTO_INCREMENT, \`data_marcada\` datetime NOT NULL, \`tipo_interacao\` varchar(20) NOT NULL, \`status\` varchar(20) NOT NULL, \`notas\` varchar(255) NULL, \`clienteClienteID\` int NULL, \`funcionarioFuncionarioID\` int NULL, PRIMARY KEY (\`agendamento_interacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notificacao\` ADD CONSTRAINT \`FK_c036640b3fa53956d713c92304f\` FOREIGN KEY (\`eventoEventoID\`) REFERENCES \`evento_treinamento\`(\`evento_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacao_convidados\` ADD CONSTRAINT \`FK_7abac0ff0205f4fa355f6e80bbc\` FOREIGN KEY (\`notificacaoNotificacaoID\`) REFERENCES \`notificacao\`(\`notificacao_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacao_convidados\` ADD CONSTRAINT \`FK_d37a3e93acb6926c27a6a96ba0e\` FOREIGN KEY (\`funcionarioConvidadoFuncionarioID\`, \`funcionarioConvidadoEventoID\`) REFERENCES \`funcionarios_convidados\`(\`funcionario_ID\`,\`evento_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`presenca\` ADD CONSTRAINT \`FK_7f4ccae3f678766402499ee2112\` FOREIGN KEY (\`funcionarioConvidadoFuncionarioID\`, \`funcionarioConvidadoEventoID\`) REFERENCES \`funcionarios_convidados\`(\`funcionario_ID\`,\`evento_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`funcionarios_convidados\` ADD CONSTRAINT \`FK_cb909757a06ffe3cbc43e2d2aef\` FOREIGN KEY (\`eventoEventoID\`) REFERENCES \`evento_treinamento\`(\`evento_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`funcionarios_convidados\` ADD CONSTRAINT \`FK_b8239e4be120e05e205fba11351\` FOREIGN KEY (\`funcionarioFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evento_treinamento\` ADD CONSTRAINT \`FK_2538cb6146d76e010d80cc36044\` FOREIGN KEY (\`organizadorFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interacao_cliente\` ADD CONSTRAINT \`FK_1fd040f0c522cef7402a713811d\` FOREIGN KEY (\`funcionarioFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interacao_cliente\` ADD CONSTRAINT \`FK_cfa24dfa54932d5cb42a19cd3f4\` FOREIGN KEY (\`clienteClienteID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interacao_cliente\` ADD CONSTRAINT \`FK_8cf2aff5fd5b1c7a7c380bfec2d\` FOREIGN KEY (\`agendamentoAgendamentoInteracaoID\`) REFERENCES \`agendamento_interacao\`(\`agendamento_interacao_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendas\` ADD CONSTRAINT \`FK_94d794a997649110a1e60ee4e74\` FOREIGN KEY (\`clienteClienteID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendas\` ADD CONSTRAINT \`FK_e5f68ce7f31ae94c8a5717fb3e2\` FOREIGN KEY (\`funcionarioFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD CONSTRAINT \`FK_bbadb5c892e57f26913d9e26d60\` FOREIGN KEY (\`gerenteFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historico_funil\` ADD CONSTRAINT \`FK_092b12aa2e06a050801817ca5cd\` FOREIGN KEY (\`clienteClienteID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historico_funil\` ADD CONSTRAINT \`FK_b4eb8a44f0ea5f0e5c444031bf1\` FOREIGN KEY (\`funilFunilID\`) REFERENCES \`funil_vendas\`(\`funil_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contato_cliente\` ADD CONSTRAINT \`FK_33ca32fee85ec37829d470582d7\` FOREIGN KEY (\`clienteClienteID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_36a9df1166e24db49dae4ee84a5\` FOREIGN KEY (\`funcionarioFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_d56e5eed065f2ef499e991b7e9d\` FOREIGN KEY (\`funilFunilID\`) REFERENCES \`funil_vendas\`(\`funil_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agendamento_interacao\` ADD CONSTRAINT \`FK_908f5b685312c2f1968ad214498\` FOREIGN KEY (\`clienteClienteID\`) REFERENCES \`cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agendamento_interacao\` ADD CONSTRAINT \`FK_9217f77d363b6463d24ae47dccf\` FOREIGN KEY (\`funcionarioFuncionarioID\`) REFERENCES \`funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`agendamento_interacao\` DROP FOREIGN KEY \`FK_9217f77d363b6463d24ae47dccf\``);
        await queryRunner.query(`ALTER TABLE \`agendamento_interacao\` DROP FOREIGN KEY \`FK_908f5b685312c2f1968ad214498\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_d56e5eed065f2ef499e991b7e9d\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_36a9df1166e24db49dae4ee84a5\``);
        await queryRunner.query(`ALTER TABLE \`contato_cliente\` DROP FOREIGN KEY \`FK_33ca32fee85ec37829d470582d7\``);
        await queryRunner.query(`ALTER TABLE \`historico_funil\` DROP FOREIGN KEY \`FK_b4eb8a44f0ea5f0e5c444031bf1\``);
        await queryRunner.query(`ALTER TABLE \`historico_funil\` DROP FOREIGN KEY \`FK_092b12aa2e06a050801817ca5cd\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP FOREIGN KEY \`FK_bbadb5c892e57f26913d9e26d60\``);
        await queryRunner.query(`ALTER TABLE \`vendas\` DROP FOREIGN KEY \`FK_e5f68ce7f31ae94c8a5717fb3e2\``);
        await queryRunner.query(`ALTER TABLE \`vendas\` DROP FOREIGN KEY \`FK_94d794a997649110a1e60ee4e74\``);
        await queryRunner.query(`ALTER TABLE \`interacao_cliente\` DROP FOREIGN KEY \`FK_8cf2aff5fd5b1c7a7c380bfec2d\``);
        await queryRunner.query(`ALTER TABLE \`interacao_cliente\` DROP FOREIGN KEY \`FK_cfa24dfa54932d5cb42a19cd3f4\``);
        await queryRunner.query(`ALTER TABLE \`interacao_cliente\` DROP FOREIGN KEY \`FK_1fd040f0c522cef7402a713811d\``);
        await queryRunner.query(`ALTER TABLE \`evento_treinamento\` DROP FOREIGN KEY \`FK_2538cb6146d76e010d80cc36044\``);
        await queryRunner.query(`ALTER TABLE \`funcionarios_convidados\` DROP FOREIGN KEY \`FK_b8239e4be120e05e205fba11351\``);
        await queryRunner.query(`ALTER TABLE \`funcionarios_convidados\` DROP FOREIGN KEY \`FK_cb909757a06ffe3cbc43e2d2aef\``);
        await queryRunner.query(`ALTER TABLE \`presenca\` DROP FOREIGN KEY \`FK_7f4ccae3f678766402499ee2112\``);
        await queryRunner.query(`ALTER TABLE \`notificacao_convidados\` DROP FOREIGN KEY \`FK_d37a3e93acb6926c27a6a96ba0e\``);
        await queryRunner.query(`ALTER TABLE \`notificacao_convidados\` DROP FOREIGN KEY \`FK_7abac0ff0205f4fa355f6e80bbc\``);
        await queryRunner.query(`ALTER TABLE \`notificacao\` DROP FOREIGN KEY \`FK_c036640b3fa53956d713c92304f\``);
        await queryRunner.query(`DROP TABLE \`agendamento_interacao\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP TABLE \`contato_cliente\``);
        await queryRunner.query(`DROP TABLE \`funil_vendas\``);
        await queryRunner.query(`DROP TABLE \`historico_funil\``);
        await queryRunner.query(`DROP INDEX \`IDX_f868493b618f6780e84ea266e5\` ON \`funcionario\``);
        await queryRunner.query(`DROP TABLE \`funcionario\``);
        await queryRunner.query(`DROP TABLE \`vendas\``);
        await queryRunner.query(`DROP TABLE \`interacao_cliente\``);
        await queryRunner.query(`DROP TABLE \`evento_treinamento\``);
        await queryRunner.query(`DROP TABLE \`funcionarios_convidados\``);
        await queryRunner.query(`DROP TABLE \`presenca\``);
        await queryRunner.query(`DROP TABLE \`notificacao_convidados\``);
        await queryRunner.query(`DROP TABLE \`notificacao\``);
    }

}
