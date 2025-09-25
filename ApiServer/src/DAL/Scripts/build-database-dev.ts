// build-database.ts
import fs from 'fs';
import path from 'path';
import { createDatabase } from 'typeorm-extension';
import { AppDataSource } from '../ormconfig.js';

// Monta o caminho absoluto para o arquivo SQL dentro da pasta Scripts
const sqlFilePath = path.join(process.cwd(), 'src', 'DAL', 'Scripts', 'InsertsBanco.sql');

async function runSqlScript() {
  console.log('DEBUG: __dirname:', __dirname);
  console.log('DEBUG: Caminho do arquivo SQL:', sqlFilePath);

  if (!fs.existsSync(sqlFilePath)) {
    console.warn('⚠️ Arquivo InsertsBanco.sql não encontrado. Verifique o caminho acima.');
    return;
  }

  const sql = fs.readFileSync(sqlFilePath, 'utf8');
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.query(sql);
    console.log('✅ Script SQL executado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao executar script SQL:', err);
  } finally {
    await queryRunner.release();
  }
}

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

    // Roda script SQL (se existir)
    await runSqlScript();

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