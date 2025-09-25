import { Request, Response } from "express";
import { criarEvento } from "../../Business/Services/eventoEmailService";

export async function postEvento(req: Request, res: Response) {
  const { email, titulo, dataHora } = req.body;

  if (!email || !titulo || !dataHora) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  try {
    const evento = await criarEvento(email, titulo, new Date(dataHora));
    return res.json({ sucesso: true, id: evento.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}