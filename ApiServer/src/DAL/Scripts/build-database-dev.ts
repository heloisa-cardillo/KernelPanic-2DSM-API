// Importa módulos do Node para manipular arquivos e caminhos
import fs from "fs";
import path from "path";

// Importa utilitário para criação do banco caso não exista
import { createDatabase } from "typeorm-extension";

// Importa a configuração da fonte de dados do TypeORM
import { AppDataSource } from "../ormconfig.js";

// Define o caminho absoluto do arquivo SQL que contém os inserts
const sqlFilePath = path.join(
  process.cwd(),        // diretório raiz do projeto
  "src",
  "DAL",
  "Scripts",
  "InsertsBanco.sql"    // arquivo SQL com os comandos insert
);

// Função que executa o script SQL
async function runSqlScript() {
  console.log("DEBUG: Caminho do arquivo SQL:", sqlFilePath);

  // Verifica se o arquivo existe
  if (!fs.existsSync(sqlFilePath)) {
    console.warn(
      "⚠️ Arquivo InsertsBanco.sql não encontrado. Verifique o caminho acima."
    );
    return; // Sai da função se o arquivo não existir
  }

  // Lê o conteúdo do arquivo SQL como string
  const sql = fs.readFileSync(sqlFilePath, "utf8");

  // Cria um queryRunner para executar comandos SQL
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    // Conecta o queryRunner com o banco
    await queryRunner.connect();

    // Divide o script em comandos separados pelo `;`
    const statements = sql
      .split(/;\s*$/m)       // regex que quebra por ponto e vírgula no final de linha
      .map((stmt) => stmt.trim())  // remove espaços em branco
      .filter((stmt) => stmt.length > 0); // remove comandos vazios

    // Executa cada comando SQL individualmente
    for (const statement of statements) {
      console.log("▶️ Executando:", statement.substring(0, 80) + "...");
      await queryRunner.query(statement);
    }

    console.log("✅ Script SQL executado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao executar script SQL:", err);
  } finally {
    // Libera o queryRunner independente do resultado
    await queryRunner.release();
  }
}

// Função principal que orquestra o processo
async function main() {
  try {
    // Cria o banco de dados se ele não existir, baseado na config do AppDataSource
    await createDatabase({
      options: AppDataSource.options,
      ifNotExist: true,
    });
    console.log("✅ Banco de dados verificado/criado.");

    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();

    // Executa o script SQL para inserir dados iniciais
    await runSqlScript();

    // Executa eventuais migrações pendentes
    await AppDataSource.runMigrations();

    console.log("🎉 Banco de dados pronto!");
  } catch (err) {
    console.error("❌ Erro ao construir banco:", err);
    process.exit(1); // Sai do processo em caso de erro
  } finally {
    // Fecha a conexão se estiver aberta
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

// Chama a função principal
main();