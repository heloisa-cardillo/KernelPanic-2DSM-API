import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Cliente } from "../../DAL/Models/Cliente";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { FunilVendas } from "../../DAL/Models/FunilVendas";

export class ClinteService{
    private clienteRepo: Repository<Cliente>;

    constructor(){
        this.clienteRepo = AppDataSource.getRepository(Cliente)
    }

    async listarTodos(): Promise<Cliente[]>{
        return this.clienteRepo.find({
            relations: ['funcionario', 'funil', 'contatos', 'historico', 'agendamentos', 'interacoes', 'vendas']
        })
    }
   
    async buscarPorID(id: number): Promise<Cliente | null>{
        return this.clienteRepo.findOne({
            where:{cliente_ID: id},
            relations: ['funcionario', 'funil', 'contatos', 'historico', 'agendamentos', 'interacoes', 'vendas']
        })
    } 

    async criarCliente(data: {nome: string, endereco: string, funcionario_ID: number, funil_ID: number}): Promise<Cliente>{
        const funcionarioRepo = AppDataSource.getRepository(Funcionario)
        const funilRepo = AppDataSource.getRepository(FunilVendas)

        const funcionario = await funcionarioRepo.findOneBy({id_funcionario: data.funcionario_ID})
        if(!funcionario) throw new Error("Funcionario não encontrado!");

        const funil = await funilRepo.findOneBy({id_funil: data.funil_ID});
        if(!funil) throw new Error("Funil não encontrado!");

        const cliente = this.clienteRepo.create({
            nome: data.nome,
            endereco: data.endereco,
            funcionario,
            funil
        })

        return this.clienteRepo.save(cliente);
     }
}