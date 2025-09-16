import "reflect-metadata"; // necessário para TypeORM
import express from "express"
import cors from "cors"

const calendarioRoute = require("./API/Routes/calendarioRoutes")

const app = express();

app.use(cors())
app.use(express.json())

//Conexão com o banco de dados
// import { AppDataSource } from " ./DAL/ormconfig.js";

// AppDataSource.initialize()
//   .then(() => {
//     console.log("✅ Conectado ao MySQL com sucesso!");
//   })
//   .catch((err:Error) => {
//     console.error("❌ Erro ao conectar ao MySQL:", err);
//   });

app.use("/calendario", calendarioRoute)

app.get("/", (req, res) => {
    res.send("API funcionando")
})

export default app