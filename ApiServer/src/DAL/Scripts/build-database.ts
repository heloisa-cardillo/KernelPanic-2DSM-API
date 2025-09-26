// Importa a função para criar banco automaticamente se não existir
import { createDatabase } from 'typeorm-extension';
// Importa a configuração da fonte de dados do TypeORM
import { AppDataSource } from '../ormconfig.js';

async function main() {
  try {
    // Cria o banco com base nas opções do AppDataSource se ele ainda não existir
    await createDatabase({
      options: AppDataSource.options,
      ifNotExist: true,
    });
    console.log('✅ Banco de dados verificado/criado.');

    // Inicializa a conexão com o banco
    await AppDataSource.initialize();

    // Executa as migrations pendentes (criação/alteração de tabelas, etc)
    await AppDataSource.runMigrations();

    console.log('🎉 Banco de dados pronto!');
  } catch (err) {
    // Caso haja erro em qualquer etapa, loga e encerra processo com código 1
    console.error('❌ Erro ao construir banco:', err);
    process.exit(1);
  } finally {
    // Fecha a conexão com o banco, se estiver aberta
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

// Executa o processo
main();