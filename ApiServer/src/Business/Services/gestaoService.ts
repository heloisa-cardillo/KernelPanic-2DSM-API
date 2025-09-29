import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Vendas } from "../../DAL/Models/Vendas";
import { Cliente } from "../../DAL/Models/Cliente";
import { ContatoCliente } from "../../DAL/Models/ContatoCliente";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { FunilVendas } from "../../DAL/Models/FunilVendas";

export class GestaoService {
    private vendasRepo: Repository<Vendas>;
    private clienteRepo: Repository<Cliente>;
    private funcionarioRepo: Repository<Funcionario>;
    private funilRepo: Repository<FunilVendas>;

    constructor() {
        this.vendasRepo = AppDataSource.getRepository(Vendas);
        this.clienteRepo = AppDataSource.getRepository(Cliente);
        this.funcionarioRepo = AppDataSource.getRepository(Funcionario);
        this.funilRepo = AppDataSource.getRepository(FunilVendas);
    }

    async listarInformacoes(): Promise<Vendas[]> {
        return this.vendasRepo.find({
            relations: ["cliente", "cliente.contatos", "funcionario"],
        });
    }

    async listarPorID(id: number): Promise<Vendas | null> {
        return this.vendasRepo.findOne({
            where: { venda_ID: id },
            relations: ["cliente", "cliente.contatos", "funcionario"],
        });
    }

    async updatePorID(id: number, dados: any): Promise<Vendas | null> {
        const venda = await this.vendasRepo.findOne({
            where: { venda_ID: id },
            relations: ["cliente", "cliente.contatos", "funcionario"],
        });

        if (!venda) return null;

        await this.vendasRepo.update(id, {
            status: dados.status ?? venda.status,
        });

        if (dados.cliente) {
            const segmento =
                dados.cliente.segmentoAtuacao ??
                dados.cliente.segmento ??
                dados.cliente.segmento_atuacao ??
                venda.cliente.segmentoAtuacao ??
                "Não informado";

            await this.clienteRepo.update(venda.cliente.cliente_ID, {
                nome: dados.cliente.nome ?? venda.cliente.nome,
                endereco: dados.cliente.endereco ?? venda.cliente.endereco,
                segmentoAtuacao: segmento,
            });

            if (
                dados.cliente.contatos &&
                Array.isArray(dados.cliente.contatos)
            ) {
                await AppDataSource.getRepository(ContatoCliente).delete({
                    cliente: { cliente_ID: venda.cliente.cliente_ID },
                });
                for (const contato of dados.cliente.contatos) {
                    await AppDataSource.getRepository(ContatoCliente).save({
                        ...contato,
                        cliente: venda.cliente,
                    });
                }
            }
        }

        if (dados.funcionario?.cargo) {
            await this.funcionarioRepo.update(
                venda.funcionario.funcionario_ID,
                {
                    cargo: dados.funcionario.cargo ?? venda.funcionario?.cargo,
                }
            );
        }

        return this.vendasRepo.findOne({
            where: { venda_ID: id },
            relations: ["cliente", "cliente.contatos", "funcionario"],
        });
    }

    async moverClienteParaNovoFunil(
        clienteId: number,
        novoFunilId: number
    ): Promise<Cliente | null> {
        const cliente = await this.clienteRepo.findOne({
            where: { cliente_ID: clienteId },
            relations: ["funil", "vendas"],
        });
        if (!cliente) return null;

        const funilNovo = await this.funilRepo.findOneBy({
            funil_ID: novoFunilId,
        });
        if (!funilNovo) throw new Error("Estágio do funil não encontrado");

        cliente.funil = funilNovo;
        await this.clienteRepo.save(cliente);

        await this.vendasRepo
            .createQueryBuilder()
            .update(Vendas)
            .set({ status: funilNovo.estagio_nome })
            .where("cliente_ID = :clienteId", { clienteId })
            .execute();

        return await this.clienteRepo.findOne({
            where: { cliente_ID: clienteId },
            relations: ["funil", "vendas"],
        });
    }
}
