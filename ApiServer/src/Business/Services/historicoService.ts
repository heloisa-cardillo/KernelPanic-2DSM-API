import { Like, Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Vendas } from "../../DAL/Models/Vendas";

export class HistoricoService {
    private vendasRepo: Repository<Vendas>;

    constructor() {
        this.vendasRepo = AppDataSource.getRepository(Vendas);
    }
    async listarInteracoes(
        termoBusca?: string,
        ordenarPor: keyof Vendas = 'venda_ID',
        direcao: 'ASC' | 'DESC' = 'DESC'
    ): Promise<Vendas[]> {
        const opcoesDeBusca: any = {
            relations: [
    'cliente',
    'cliente.interacoes',  
    'funcionario'
  ],
            order: {
                [ordenarPor]: direcao
            }
        };
        if (termoBusca) {
            opcoesDeBusca.where = {
                cliente: {
                    nome: Like(`%${termoBusca}%`) 
                }
            };
        }
        return this.vendasRepo.find(opcoesDeBusca);
    }
    async listarPorID(id: number): Promise<Vendas | null> {
        return this.vendasRepo.findOne({
            where: { venda_ID: id },
            relations: ['cliente', 'funcionario']
        });
    }
}