import { Request, Response } from "express";

export const getLembrete = (req: Request, res: Response) => {
  // ===== Responde com mensagem padrão =====
  res.json({ message: "deu bom" });
};

export const postLembrete = (req: Request, res: Response) => {
  // ===== Responde com mensagem padrão =====
  res.json({ message: "deu bom" });
};