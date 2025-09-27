import "reflect-metadata"; // Necessário para decorators funcionarem no TypeORM e outras libs
import express from "express"; // Framework web para Node.js
import cors from "cors"; // Middleware para habilitar CORS (compartilhamento de recursos entre origens)
import dotenv from "dotenv"; // Carrega variáveis de ambiente do arquivo .env

import { iniciarCron } from "./API/Jobs/emailCron"; // Importa função para iniciar tarefas agendadas
const eventoRoute = require("./API/Routes/eventoEmailRoutes"); // Importa rotas para eventos de email

dotenv.config(); // Carrega configurações do .env para process.env

const calendarioRoute = require("./API/Routes/calendarioRoutes"); // Rotas do calendário
const funilVendasRoute = require("./API/Routes/funilVendasRoutes"); // Rotas do funil de vendas
const cadastroCliente = require("./API/Routes/clientesRoutes"); // Rotas do cadastro de clientes
const gestaoRoute = require("./API/Routes/gestaoRoutes")
const historicoRoute = require("./API/Routes/historicoRoutes")
const pegarVendedor = require("./API/Routes/VendedorRoutes")


const app = express(); // Cria instância do Express

app.use(cors()); // Ativa CORS para todas as rotas
app.use(express.json()); // Middleware para interpretar JSON nas requisições

import { AppDataSource } from "./DAL/ormconfig"; // Configuração do TypeORM / banco

// Inicializa conexão com banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao MySQL com sucesso!");
  })
  .catch((err: Error) => {
    // Caso falhe conexão, mostra erro e alerta sobre .env
    console.error(err, "❌ Erro ao conectar ao MySQL, VERIFIQUE SE O .ENV ESTA CONFIGURADO CORRETAMENTE!!!:");
  });

// Define as rotas da aplicação
app.use("/eventos", eventoRoute); // Rota para eventos relacionados a email
iniciarCron(); // Inicia tarefas agendadas (jobs)
app.use("/funilVendas", funilVendasRoute); // Rotas para funil de vendas
app.use("/calendario", calendarioRoute); // Rotas do calendário
app.use("/clientes", cadastroCliente); // Rotas para clientes

app.use("/vendedor",pegarVendedor)
app.use("/historico",historicoRoute)
app.use("/gestao",gestaoRoute)

// Rota raiz para teste rápido da API
app.get("/", (req, res) => {
  res.send("API funcionando");
});

export default app; // Exporta o app para ser usado em outro lugar (ex: server.ts)