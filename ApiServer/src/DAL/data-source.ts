import { DataSource } from "typeorm";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "-Templa123",
  database: "newe_database",
  entities: [join(__dirname, "../Domain/Models/*.js")], // <--- glob das entidades
  migrations: [join(__dirname, "./migrations/*.ts")],
  synchronize: false,
  logging: true
});


/// Comando pra rodar migration 
/// tsc
// npx  typeorm-ts-node-esm migration:run -d ./src/DAL/data-source.ts
