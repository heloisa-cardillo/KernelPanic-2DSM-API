import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Vendas } from "../../DAL/Models/Vendas"
import { Cliente } from "../../DAL/Models/Cliente";
import { ContatoCliente } from "../../DAL/Models/ContatoCliente";


export class GestaoService{
    private vendasRepo: Repository<Vendas>;
    private clienteRepo: Repository<Cliente>;

    constructor(){
        this.vendasRepo = AppDataSource.getRepository(Vendas)
        this.clienteRepo = AppDataSource.getRepository(Cliente)
    }

    async listarInformacoes(): Promise<Vendas[]>{
        return this.vendasRepo.find({
            relations: ['cliente','cliente.contatos' ,'funcionario']
        })
    }


    async listarPorID(id: number): Promise<Vendas | null>{
        return this.vendasRepo.findOne({
            where: {venda_ID: id},
            relations: ['cliente','cliente.contatos' ,'funcionario']
        })

    }

    async updatePorID(id: number, dados: any): Promise<Vendas | null> {
    const venda = await this.vendasRepo.findOne({
        where: { venda_ID: id },
        relations: ["cliente", "cliente.contatos", "funcionario"],
    });

    if (!venda) return null;

    await this.vendasRepo.update(id, {
        status: dados.status ?? venda.status,
        funcionario: dados.funcionario_ID ? { funcionario_ID: dados.funcionario_ID } : venda.funcionario,
    });

    if (dados.cliente) {
        await this.clienteRepo.update(venda.cliente.cliente_ID, {
        nome: dados.cliente.nome ?? venda.cliente.nome,
        endereco: dados.cliente.endereco ?? venda.cliente.endereco,
        });

        if (dados.cliente.contatos && Array.isArray(dados.cliente.contatos)) {

        await AppDataSource.getRepository(ContatoCliente).delete({ cliente: { cliente_ID: venda.cliente.cliente_ID } });
        for (const contato of dados.cliente.contatos) {
            await AppDataSource.getRepository(ContatoCliente).save({
            ...contato,
            cliente: venda.cliente,
            });
        }
        }
    }

    return this.vendasRepo.findOne({
        where: { venda_ID: id },
        relations: ["cliente", "cliente.contatos", "funcionario"],
    });
}


    async deletePorID(id: number): Promise<boolean> {
        const venda = await this.vendasRepo.findOne({
            where: { venda_ID: id },
            relations: ["cliente"],
        })

        if (!venda) {
            return false; 
        }

        if (venda.cliente) {
            await this.clienteRepo.delete(venda.cliente.cliente_ID);
        }

        return true;
    }
}