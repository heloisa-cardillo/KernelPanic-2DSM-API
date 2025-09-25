import "reflect-metadata"; 
import express from "express"
import cors from "cors"

const calendarioRoute = require("./API/Routes/calendarioRoutes")
const funilVendasRoute = require("./API/Routes/funilVendasRoutes")
const cadastroCliente = require("./API/Routes/clientesRoutes")

const app = express();

app.use(cors())
app.use(express.json())

import { AppDataSource } from "./DAL/ormconfig";

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao MySQL com sucesso!");
  })
  .catch((err:Error) => {
    console.error(err, "❌ Erro ao conectar ao MySQL, VERIFIQUE SE O .ENV ESTA CONFIGURADO CORRETAMENTE!!!:");
  });

app.use("/funilVendas",funilVendasRoute )
app.use("/calendario", calendarioRoute)
app.use("/clientes", cadastroCliente)

app.get("/", (req, res) => {
    res.send("API funcionando")
})

export default app