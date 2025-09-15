import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { Funcionario } from "./Models/Funcionario";
import { Cliente } from "./Models/Cliente";
import { CustomerStage } from "./Models/CustomerStage.js";
import { ContatoCliente } from "./Models/ContatoCliente";
import { InteracaoCliente } from "./Models/InteracaoCliente";
import { Vendas } from "./Models/Vendas";
import { AggregatedDelivery } from "./Models/AggregatedDelivery";
import { Vehicle } from "./Models/Vehicle.js";
import { EventoTreinamento } from "./Models/EventoTreinamento";
import { Attendance } from "./Models/Attendance.js";
import { Notificacao } from "./Models/Notificacao";
import { FacilityManagement } from "./Models/FacilityManagement.js";

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
    ,
    Funcionario,
    Cliente,
    CustomerStage,
    ContatoCliente,
    InteracaoCliente,
    Vendas,
    AggregatedDelivery,
    Vehicle,
    EventoTreinamento,
    Attendance,
    Notificacao,
    FacilityManagement
  ],
  migrations: ["src/DAL/migrations/*.ts"], // <---- adicionado
  synchronize: false, // <---- desliga para usar migrations
  logging: true
});
