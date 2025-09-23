// build-database.ts
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { AppDataSource } from '../ormconfig.js';

const DB_NAME = process.env.DB_NAME || 'newe_database';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USERNAME || 'root';
const DB_PASS = process.env.DB_PASSWORD || 'fatec';

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  });

  const [rows] = await connection.query(`SHOW DATABASES LIKE ?`, [DB_NAME]);

  if ((rows as any[]).length === 0) {
    console.log(`Banco "${DB_NAME}" não existe. Criando...`);
    await connection.query(`CREATE DATABASE \`${DB_NAME}\``);
    console.log(`Banco "${DB_NAME}" criado com sucesso.`);
  } else {
    console.log(`Banco "${DB_NAME}" já existe.`);
  }

  await connection.end();
}

async function runSqlScript() {
  const sqlFilePath = path.join('./script.sql');
  const sql = fs.readFileSync(sqlFilePath, 'utf8');

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    multipleStatements: true,
  });

  await connection.query(sql);
  await connection.end();
  console.log('Script SQL executado com sucesso!');
}

async function runMigrations() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  await AppDataSource.destroy();
  console.log('Migrations aplicadas com sucesso!');
}

async function main() {
  try {
    await ensureDatabaseExists();
    await runSqlScript();
    await runMigrations();
    console.log('✅ Banco de dados pronto!');
  } catch (err) {
    console.error('❌ Erro ao construir banco:', err);
    process.exit(1);
  }
}

main();