import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const host = process.env.DB_HOST || "localhost"
const password = process.env.DB_PASSWORD || ""
const username = process.env.DB_USERNAME || "root"
const database = process.env.DB_DB || "newe_database"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: host,
  port: 3306,
  username: username,
  password: password,
  database: database,
  entities: [path.join(__dirname, "../Domain/Models/*.js")], // <--- glob das entidades
  migrations: [path.join(__dirname, "./migrations/*.ts")],
  synchronize: false,
  logging: true
});


/// Comando pra rodar migration 
/// tsc
// npx  typeorm-ts-node-esm migration:run -d ./src/DAL/data-source.ts
