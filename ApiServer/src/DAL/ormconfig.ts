import { DataSource } from "typeorm";
import { Funcionario } from "./Models/Funcionario";
import { Cliente } from "./Models/Cliente";
import { AgendamentoInteracao } from "./Models/AgendamentoInteracao";
import { ContatoCliente } from "./Models/ContatoCliente";
import { EventoTreinamento } from "./Models/EventoTreinamento";
import { FuncionariosConvidados } from "./Models/FuncionariosConvidados";
import { FunilVendas } from "./Models/FunilVendas";
import { HistoricoFunil } from "./Models/HistoricoFunil";
import { InteracaoCliente } from "./Models/InteracaoCliente";
import { Notificacao } from "./Models/Notificacao";
import { NotificacaoConvidados } from "./Models/NotificacaoConvidados";
import { Presenca } from "./Models/Presenca";
import { Vendas } from "./Models/Vendas";
// import dotenv from "dotenv";

// dotenv.config();

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
  entities: [
    AgendamentoInteracao, Cliente, ContatoCliente, 
    EventoTreinamento, Funcionario, FuncionariosConvidados, 
    FunilVendas, HistoricoFunil, InteracaoCliente,
    Notificacao, NotificacaoConvidados, Presenca,
    Vendas],
  migrations: ["dist/DAL/Migrations/*.ts"],
  synchronize: false,
  logging: true,
});


// comando para gerar nova migration (apontando para o arquivo TypeScript)
//// npx typeorm migration:generate -p src/DAL/migrations/PrimeiraMigration -d src/DAL/ormconfig.ts

// compilar o TypeScript para JavaScript
//// npx tsc

// depois, rodar a migration com o arquivo JavaScript compilado
//// npx typeorm migration:run -d dist/DAL/ormconfig.js
