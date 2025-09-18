import { DataSource } from "typeorm";
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
  entities: ["dist/DAL/Models/*.js"],
  migrations: ["dist/DAL/Migrations/*.js"],
  synchronize: false,
  logging: true,
});


// comando para gerar nova migration (apontando para o arquivo TypeScript)
//// npx typeorm migration:generate -p src/DAL/migrations/PrimeiraMigration -d src/DAL/ormconfig.ts

// compilar o TypeScript para JavaScript
//// npx tsc

// depois, rodar a migration com o arquivo JavaScript compilado
//// npx typeorm migration:run -d dist/DAL/ormconfig.js
