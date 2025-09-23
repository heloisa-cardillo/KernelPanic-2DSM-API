const { DataSource } = require("typeorm");
const dotenv = require("dotenv");

const { AgendamentoInteracao } = require("./Models/AgendamentoInteracao");
const { Cliente } = require("./Models/Cliente");
const { ContatoCliente } = require("./Models/ContatoCliente");
const { EventoTreinamento } = require("./Models/EventoTreinamento");
const { Funcionario } = require("./Models/Funcionario");
const { FuncionariosConvidados } = require("./Models/FuncionariosConvidados");
const { FunilVendas } = require("./Models/FunilVendas");
const { HistoricoFunil } = require("./Models/HistoricoFunil");
const { InteracaoCliente } = require("./Models/InteracaoCliente");
const { Notificacao } = require("./Models/Notificacao");
const { NotificacaoConvidados } = require("./Models/NotificacaoConvidados");
const { Presenca } = require("./Models/Presenca");
const { Vendas } = require("./Models/Vendas");

dotenv.config();

const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const database = process.env.DB_DB;

export const AppDataSource = new DataSource({
  type: "mysql",
  host,
  port: 3306,
  username,
  password,
  database,
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
  migrations: ["src/DAL/migrations/*.ts"],
  synchronize: false,
  logging: true
});

