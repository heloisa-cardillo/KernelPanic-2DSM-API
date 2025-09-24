import { DataSource } from "typeorm";
import { join } from "path";

import dotenv from "dotenv";
dotenv.config();

const host = process.env.DB_HOST || "localhost";
const password = process.env.DB_PASSWORD || "fatec";
const username = process.env.DB_USERNAME || "root";
const database = process.env.DB_DB || "newe_database";

export const AppDataSource = new DataSource({
  type: "mysql",
  host,
  port: 3306,
  username,
  password,
  database,
  // Use os arquivos compilados JS para evitar problemas de importação circular
  // Caminho dinâmico para os arquivos .ts ou .js
  entities: [
    join(__dirname, "./Models/*.{ts,js}")
  ],
  migrations: [
    join(__dirname, "./Migrations/*.{ts,js}")
  ],
  synchronize: false,
  logging: true,
});


// comando para gerar nova migration (apontando para o arquivo TypeScript)
//// npx typeorm migration:generate src/DAL/migrations/PrimeiraMigration -d dist/DAL/ormconfig.js

// compilar o TypeScript para JavaScript
//// npx tsc

// depois, rodar a migration com o arquivo JavaScript compilado
//// npx typeorm migration:run -d dist/DAL/ormconfig.js

////// orm debug
/// npx typeorm schema:log -d dist/DAL/ormconfig.js