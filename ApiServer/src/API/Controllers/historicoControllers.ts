import { Request,Response } from "express";
import { HistoricoService } from "../../Business/Services/historicoService";
import { error } from "console";

const Service = new HistoricoService()

export const teste = (req: Request, res: Response) => {
    res.send("funciona")
}

export const getHistorico = async (req: Request,res: Response) => {
    try {
        const vendas = await.Service.listarInteracoes()
        return res.json(vendas)
    } catch (error) {
        console.error(error)
        return res.status(500).json[{ message: "Erro a buscar vendas" }];
    }

}