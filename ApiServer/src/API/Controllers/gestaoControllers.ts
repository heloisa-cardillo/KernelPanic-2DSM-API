import { Request, Response } from "express"
import { AppDataSource } from "../../DAL/ormconfig"
import { Vendas } from "../../DAL/Models/Vendas"

export class GestaoController{
    async listarVendas(req: Request, res: Response){
    try{
        const vendasRepo = AppDataSource.getRepository(Vendas);

        const vendas = await vendasRepo.find({
            relations: ["cliente", "funcionario"],
        })

        return res.json(vendas);
    } catch(error){
        console.error(error);
      return res.status(500).json({ message: "Erro ao buscar vendas" });
    }
  }

  
  async buscarVenda(req: Request, res: Response){
    try{
        const vendasRepo = AppDataSource.getRepository(Vendas);

        const venda = await vendasRepo.findOne({
            where:{venda_ID: Number(req.params.id)},
            relations: ["cliente", "funcionario"],
        });

        if(!venda){
            return res.status(404).json({message:"Venda não encontrada"});
        }

        return res.json(venda);

        
    }catch (error){
        console.log(error);
        return res.status(500).json({message:"Error ao buscar venda"});
    }
  }
}