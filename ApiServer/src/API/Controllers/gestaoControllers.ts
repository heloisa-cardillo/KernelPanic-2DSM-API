import { Request, Response } from "express"
import { GestaoService } from "../../Business/Services/gestaoService";
import { ClienteService } from "../../Business/Services/ClienteService";

const Service = new GestaoService()
const Clientes = new ClienteService()


export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await Clientes.listarTodos()

        return res.json(clientes)
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