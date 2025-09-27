import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cron from "node-cron";
import mysql from "mysql2";
import eventoRoutes from "../Routes/emailPostRoute";

const app = express();
app.use(bodyParser.json());

// conexao banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Grongos115935",
  database: "eventosdb",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MYSQL: ", err);
    return;
  }
  console.log("Conectado ao banco!");
});

// rotas
app.use("/", eventoRoutes(db));

//função asincrona para enviar email

async function enviarEmail(email: string, titulo: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testenewe1@gmail.com",
        pass: "lqkt hkoj vgso dlxt", // senha de app do Gmail (não é a senha verdadeira)
      },
    });

    const info = await transporter.sendMail({
      from: '"Agenda" <testenewe1@gmail.com>',
      to: email,
      subject: "Lembrete do evento",
      text: `Você tem um evento agendado para hoje! Evento: ${titulo}`,
    });

    console.log(`Email enviado para ${email}:`, info.messageId);
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
  }
}

// verifica a cada minuto
cron.schedule("* * * * *", () => {
  const agora = new Date();
  const inicio = new Date(agora.getTime() - 30000); // 30 s antes
  const fim    = new Date(agora.getTime() + 30000); // 30 s depois

  console.log("Cron rodando:", agora.toLocaleString());

  const sql = "SELECT * FROM eventos WHERE dataHora BETWEEN ? AND ?";
  db.query(sql, [inicio, fim], (err, results: any[]) => {
    if (err) {
      console.error("Erro ao buscar eventos:", err);
      return;
    }

    console.log("Eventos encontrados:", results);
    results.forEach((ev) => enviarEmail(ev.email, ev.titulo));
  });
});

// servidor
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});