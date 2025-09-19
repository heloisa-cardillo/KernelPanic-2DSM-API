import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
/*import { Cliente } from "../../DAL/Models/Cliente";
import { Funcionario } from "../../DAL/Models/Funcionario";*/ 
import { Vendas } from "../../DAL/Models/Vendas"

export class ClienteGestao{
    private clienteRepo: Repository<Vendas>;

    constructor(){
        this.clienteRepo = AppDataSource.getRepository(Vendas)
    }

    async listarInformacoes(): Promise<Vendas[]>{
        return this.clienteRepo.find({
            relations: ['funcionario', 'cliente', 'vendas', 'historico', 'agendamentos', 'interacoes']
        })
    }
}