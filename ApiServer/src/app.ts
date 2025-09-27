import "reflect-metadata"; // necessário para TypeORM
import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())

const calendarioRoute = require("./API/Routes/calendarioRoutes"); // Rotas do calendário
const funilVendasRoute = require("./API/Routes/funilVendasRoutes"); // Rotas do funil de vendas
const cadastroCliente = require("./API/Routes/clientesRoutes"); // Rotas do cadastro de clientes
const gestaoRoute = require("./API/Routes/gestaoRoutes")
const historicoRoute = require("./API/Routes/historicoRoutes")
const pegarVendedor = require("./API/Routes/VendedorRoutes")


//Conexão com o banco de dados
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
app.use("/vendedor",pegarVendedor)
app.use("/historico",historicoRoute)
app.use("/gestao",gestaoRoute)


app.get("/", (req, res) => {
    res.send("API funcionando")
})

export default app