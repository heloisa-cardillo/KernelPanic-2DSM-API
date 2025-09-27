import { Request, Response } from "express"
import { FuncionarioService } from "../../Business/Services/FuncionarioService";

const funcionario = new FuncionarioService()

export const getVendedor = async (req: Request, res: Response) => {
    try {
        const venda = await funcionario.getVendedor()

        return res.json(venda)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar vendas" });
    }
}