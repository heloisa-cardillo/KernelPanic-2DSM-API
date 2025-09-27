import { Router, Request, Response } from "express";
import mysql from 'mysql2';

interface Evento {
  email: string;
  titulo: string;
  dataHora: string;
}

export default function (db: mysql.Connection) {
  const router = Router();

  router.post("/eventos", (req: Request, res: Response):void => {
    console.log("req.body:", req.body);
    const { email, titulo, dataHora } = req.body as Evento;

    if (!email || !titulo || !dataHora) {
       res.status(400).json({ erro: "Preencha todos os campos" });
       return;
    }

    const sql = "INSERT INTO eventos (email, titulo, datahora) VALUES (?,?,?)";
    db.query(sql, [email, titulo, dataHora], (err, result): void  => {
      if (err) {
        console.log("Erro ao salvar evento no Banco", err);
        res.status(500).json({ erro: "Erro ao salvar evento!" });
        return;
      }

      res.json({ sucesso: true, id: (result as any).insertId });
    });

    
  });

  return router;
}


