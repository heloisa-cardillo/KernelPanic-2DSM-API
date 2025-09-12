import "reflect-metadata"; // necessário para TypeORM
import { AppDataSource } from "./DAL/ormconfig.js";

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao MySQL com sucesso!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MySQL:", err);
  });