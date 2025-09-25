// build-database.ts
import { createDatabase } from 'typeorm-extension';
import { AppDataSource } from '../ormconfig.js';

async function main() {
  try {
    // Cria banco se não existir
    await createDatabase({
      options: AppDataSource.options,
      ifNotExist: true,
    });
    console.log('✅ Banco de dados verificado/criado.');

    // Inicializa conexão
    await AppDataSource.initialize();
    // Roda migrations
    await AppDataSource.runMigrations();

    console.log('🎉 Banco de dados pronto!');
  } catch (err) {
    console.error('❌ Erro ao construir banco:', err);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

main();