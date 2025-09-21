import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Vendas } from "../../DAL/Models/Vendas"

export class GestaoService{
    private vendasRepo: Repository<Vendas>;

    constructor(){
        this.vendasRepo = AppDataSource.getRepository(Vendas)
    }

    async listarInformacoes(): Promise<Vendas[]>{
        return this.vendasRepo.find({
            relations: ['cliente', 'funcionario']
        })
    }

    async listarPorID(id: number): Promise<Vendas | null>{
        return this.vendasRepo.findOne({
            where: {venda_ID: id},
            relations: ['cliente', 'funcionario']
        })

    }
}