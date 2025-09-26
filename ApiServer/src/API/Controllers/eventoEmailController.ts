import { Request, Response } from "express";
import { criarEvento, listarEventos } from "../../Business/Services/eventoEmailService";

export async function postEvento(req: Request, res: Response) {
  const { email, titulo, dataHora, categoria } = req.body;

  if (!email || !titulo || !dataHora || !categoria) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  try {
    const evento = await criarEvento(email, titulo, new Date(dataHora), categoria);
    return res.json({ sucesso: true, id: evento.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}

export async function getEventos(req: Request, res: Response){
  try{
    const evento = await listarEventos()
    return res.json({ sucesso: true, evento: evento})
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}