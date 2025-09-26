import { AppDataSource } from "../../DAL/ormconfig";
import { Evento } from "../../DAL/Models/EventoEmail";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// ===== Configura dotenv para carregar variáveis do .env na raiz do projeto =====
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const eventoRepo = AppDataSource.getRepository(Evento);

// ===== Cria e salva um novo evento no banco =====
export async function criarEvento(email: string, titulo: string, dataHora: Date, categoria: string) {
  const evento = eventoRepo.create({ email, titulo, dataHora, categoria });
  return await eventoRepo.save(evento);
}

// ===== Envia email de lembrete do evento =====
export async function enviarEmail(email: string, titulo: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Agenda" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Lembrete do evento",
      text: `Você tem um evento agendado para hoje! Evento: ${titulo}`,
    });

    console.log(`Email enviado para ${email}`);
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
  }
}