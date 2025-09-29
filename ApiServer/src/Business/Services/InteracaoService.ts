import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { InteracaoCliente } from "../../DAL/Models/InteracaoCliente";

export class InteracaoService{
    private interacaoRepo: Repository<InteracaoCliente>;

    constructor(){
        this.interacaoRepo = AppDataSource.getRepository(InteracaoCliente);
    }

    async getInteracoes(){
        return this.interacaoRepo.find({
            relations: ["clientes", "agendamentos", "interacoes", "vendas"],
        });
    }

}