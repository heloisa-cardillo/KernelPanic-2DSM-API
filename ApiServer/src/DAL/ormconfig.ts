import { DataSource } from "typeorm";
import { join } from "path";

// import dotenv from "dotenv";
// dotenv.config(); 
// (Descomente para carregar variáveis de ambiente do arquivo .env)

const host = process.env.DB_HOST || "localhost"; // Host do banco (default localhost)
const password = process.env.DB_PASSWORD || "Tomilho@0"; // Senha do banco (default 'fatec')
const username = process.env.DB_USERNAME || "root"; // Usuário do banco (default 'root')
const database = process.env.DB_DB || "api2dsm"; // Nome do banco (default 'newe_database')

export const AppDataSource = new DataSource({
  type: "mysql", // Tipo do banco de dados
  host,
  port: 3306, // Porta padrão MySQL
  username,
  password,
  database,
  // Aqui definimos onde ficam os arquivos das entidades (models) compilados ou em TS
  // Isso ajuda evitar problemas de importação circular em runtime
  entities: [
    join(__dirname, "./Models/*.{ts,js}")
  ],
  // Arquivos de migrations para controlar versões do schema
  migrations: [
    join(__dirname, "./Migrations/*.{ts,js}")
  ],
  synchronize: false, // Nunca use true em produção! Só sincroniza schema automaticamente
  // Arquivos de subscribers para eventos do TypeORM
  subscribers: [
    join(__dirname, "./Subscribers/*.{ts,js}")
  ],
  logging: true, // Ativa logs detalhados de queries e operações
});

// Comandos úteis:

// Gerar nova migration com base nas entidades atuais (apontando para arquivo JS compilado):
//// npx typeorm migration:generate src/DAL/migrations/PrimeiraMigration -d dist/DAL/ormconfig.js

// Compilar o TypeScript para JavaScript (gera a pasta dist):
//// npx tsc

// Rodar as migrations no banco usando o arquivo JS compilado:
//// npx typeorm migration:run -d dist/DAL/ormconfig.js

// Mostrar o log das alterações que o TypeORM faria no schema:
//// npx typeorm schema:log -d dist/DAL/ormconfig.js
