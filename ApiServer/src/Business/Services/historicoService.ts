/*import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Vendas } from "../../DAL/Models/Vendas"
import { Cliente } from "../../DAL/Models/Cliente";


export class GestaoService{
    private vendasRepo: Repository<Vendas>;
    private clienteRepo: Repository<Cliente>;

    constructor(){
        this.vendasRepo = AppDataSource.getRepository(Vendas)
        this.clienteRepo = AppDataSource.getRepository(Cliente)
    }

    async listarInformacoes(): Promise<Vendas[]>{
        return this.vendasRepo.find({
            relations: ['cliente', 'funcionario', 'contatocliente', 'historico']
        })
    }


    async listarPorID(id: number): Promise<Vendas | null>{
        return this.vendasRepo.findOne({
            where: {venda_ID: id},
            relations: ['cliente', 'funcionario']
        })

    }

    async updatePorID(id:number, dados: Partial<Vendas>): Promise<Vendas | null>{
        await this.vendasRepo.update(id,dados)

        return this.vendasRepo.findOne({
            where: {venda_ID: id},
            relations: ['cliente', 'funcionario']
        })

    }

    async deletePorID(id: number): Promise<boolean> {
        const venda = await this.vendasRepo.findOne({
            where: { venda_ID: id },
            relations: ["cliente"],
        })

        if (!venda) {
            return false; 
        }

        await this.vendasRepo.delete(id);
        if (venda.cliente) {
            await this.clienteRepo.delete(venda.cliente.cliente_ID);
        }

        return true;
    }
}*/