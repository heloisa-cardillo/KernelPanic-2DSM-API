import "reflect-metadata"; // necessário para TypeORM
import express from "express"
import cors from "cors"
import dotenv from "dotenv";

import eventoRoutes from "./API/Routes/eventoEmailRoutes";
import { iniciarCron } from "./API/Jobs/emailCron";

dotenv.config()

const calendarioRoute = require("./API/Routes/calendarioRoutes")
const funilVendasRoute = require("./API/Routes/funilVendasRoutes")
const cadastroCliente = require("./API/Routes/clientesRoutes")

const app = express();

app.use(cors())
app.use(express.json())

//Conexão com o banco de dados
import { AppDataSource } from "./DAL/ormconfig";

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao MySQL com sucesso!");

  })
  .catch((err:Error) => {
    console.error(err, "❌ Erro ao conectar ao MySQL, VERIFIQUE SE O .ENV ESTA CONFIGURADO CORRETAMENTE!!!:");
  });

app.use("/eventos", eventoRoutes);
iniciarCron();
app.use("/funilVendas",funilVendasRoute )
app.use("/calendario", calendarioRoute)
app.use("/clientes", cadastroCliente)

app.get("/", (req, res) => {
    res.send("API funcionando")
})

export default app