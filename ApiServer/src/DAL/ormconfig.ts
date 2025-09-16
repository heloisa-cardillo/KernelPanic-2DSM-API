import { DataSource } from "typeorm";
// import * as dotenv from "dotenv";

import { AgendamentoInteracao } from "./Models/AgendamentoInteracao";
import { Cliente } from "./Models/Cliente";
import { ContatoCliente } from "./Models/ContatoCliente";
import { EventoTreinamento} from "./Models/EventoTreinamento";
import { Funcionario } from "./Models/Funcionario";
import { FuncionariosConvidados } from "./Models/FuncionariosConvidados";
import { FunilVendas } from "./Models/FunilVendas";
import { HistoricoFunil } from "./Models/HistoricoFunil";
import { InteracaoCliente } from "./Models/InteracaoCliente";
import { Notificacao } from "./Models/Notificacao";
import { NotificacaoConvidados } from "./Models/NotificacaoConvidados";
import { Presenca } from "./Models/Presenca";
import { Vendas } from "./Models/Vendas";




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
  entities: [
    AgendamentoInteracao,
    Cliente,
    ContatoCliente,
    EventoTreinamento,
    Funcionario,
    FuncionariosConvidados,
    FunilVendas,
    HistoricoFunil,
    InteracaoCliente,
    Notificacao,
    NotificacaoConvidados,
    Presenca,
    Vendas
  ],
  migrations: ["src/DAL/migrations/*.ts"], // <---- adicionado
  synchronize: false, // <---- desliga para usar migrations
  logging: true
});
