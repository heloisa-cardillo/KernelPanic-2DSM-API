import { Request, Response } from "express"
import { GestaoService } from "../../Business/Services/gestaoService";
import { FuncionarioService } from "../../Business/Services/FuncionarioService";

const Service = new GestaoService()



export const getVendas = async (req: Request, res: Response) => {
    try {
        const vendas = await Service.listarInformacoes()

        return res.json(vendas)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar vendas" });
    }
};

export const getVendaById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const venda = await Service.listarPorID(id)
        if (!venda) {
            return res.status(404).json({ message: "Venda não encontrada" });
        }

        return res.json(venda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar venda" });
    }
};

export const UpdateVenda = async (req:Request, res:Response) =>{
    try{
        const id = Number(req.params.id)
        const dados = req.body;
        const vendaAtualizada = await Service.updatePorID(id, dados);
        if (!vendaAtualizada) {
            return res.status(404).json({ message: "Venda não encontrada" });
        }
        return res.json(vendaAtualizada);
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar venda" });
    }
};