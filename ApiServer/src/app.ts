import "reflect-metadata"; // necessário para TypeORM
import express from "express"
import cors from "cors"
import gestaoRoute from "./API/Routes/gestaoRoutes"
import historicoRoute from "./API/Routes/historicoRoutes";

/*const calendarioRoute = require("./API/Routes/calendarioRoutes")*/

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

/*app.use("/calendario", calendarioRoute)*/
app.use("/historico",historicoRoute)
app.use("/gestao",gestaoRoute)

app.get("/", (req, res) => {
    res.send("API funcionando")
})

export default app