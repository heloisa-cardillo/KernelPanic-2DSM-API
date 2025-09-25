// build-database.ts
import fs from "fs";
import path from "path";
import { createDatabase } from "typeorm-extension";
import { AppDataSource } from "../ormconfig.js";

const sqlFilePath = path.join(
  process.cwd(),
  "src",
  "DAL",
  "Scripts",
  "InsertsBanco.sql"
);

async function runSqlScript() {
  console.log("DEBUG: Caminho do arquivo SQL:", sqlFilePath);

  if (!fs.existsSync(sqlFilePath)) {
    console.warn(
      "⚠️ Arquivo InsertsBanco.sql não encontrado. Verifique o caminho acima."
    );
    return;
  }

  const sql = fs.readFileSync(sqlFilePath, "utf8");
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.connect();

    // Divide os comandos por `;` e remove espaços/linhas vazias
    const statements = sql
      .split(/;\s*$/m)
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      console.log("▶️ Executando:", statement.substring(0, 80) + "...");
      await queryRunner.query(statement);
    }

    console.log("✅ Script SQL executado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao executar script SQL:", err);
  } finally {
    await queryRunner.release();
  }
}

async function main() {
  try {
    await createDatabase({
      options: AppDataSource.options,
      ifNotExist: true,
    });
    console.log("✅ Banco de dados verificado/criado.");

    await AppDataSource.initialize();

    await runSqlScript();

    await AppDataSource.runMigrations();

    console.log("🎉 Banco de dados pronto!");
  } catch (err) {
    console.error("❌ Erro ao construir banco:", err);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

main();